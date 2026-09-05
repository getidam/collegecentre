import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "@/lib/router";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchCatalog } from "@/lib/search";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [q, setQ] = useState("");
  const { navigate } = useRouter();
  const hits = useMemo(() => searchCatalog(q), [q]);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-lg bg-card border-border">
        <DialogHeader className="sr-only">
          <DialogTitle>Search CollegeCentre</DialogTitle>
          <DialogDescription>Jump to notes, jobs, or pages</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search className="size-4 text-muted-foreground" />
          <Input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search notes, jobs, exams…"
            className="h-12 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {hits.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-muted-foreground">
              Nothing matches that.
            </li>
          ) : (
            hits.map((hit) => (
              <li key={hit.id}>
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                    navigate(hit.to);
                  }}
                  className="flex w-full flex-col rounded-xl px-3 py-2.5 text-left hover:bg-secondary transition-colors"
                >
                  <span className="text-sm font-medium">{hit.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {hit.group} · {hit.hint}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
