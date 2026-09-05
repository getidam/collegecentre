import React, { type ReactNode, useState } from "react";
import { Link, useRouterState } from "@/lib/router";
import {
  Bell,
  BookOpen,
  Briefcase,
  CalendarDays,
  House,
  MessagesSquare,
  Search,
} from "lucide-react";
import { LogoMark } from "@/components/logo";
import { CommandPalette } from "@/components/command-palette";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SelectField } from "@/components/ui/select-field";
import { upcomingDeadlines } from "@/lib/data/deadlines";
import { COLLEGES } from "@/lib/data/colleges";
import { useHydrateStores } from "@/lib/hydrate";
import { usePrefs } from "@/lib/stores/prefs";
import { cn, relativeDeadline } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home", icon: House },
  { to: "/notes", label: "Notes", icon: BookOpen },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/planner", label: "Planner", icon: CalendarDays },
  { to: "/campus", label: "Campus", icon: MessagesSquare },
] as const;

const MOBILE_NAV = NAV.filter((n) => n.to !== "/alerts");

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  useHydrateStores();
  const pathname = useRouterState((s) => s.location.pathname);
  const college = usePrefs((s) => s.college);
  const setCollege = usePrefs((s) => s.setCollege);
  const [searchOpen, setSearchOpen] = useState(false);
  const soon = upcomingDeadlines(21);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-sidebar px-4 py-6 md:flex">
        <Link to="/" className="mb-8 flex items-center gap-2.5 px-2">
          <LogoMark className="size-8 text-primary" />
          <span className="font-display text-2xl font-medium tracking-tight">
            College<span className="text-primary font-bold">Centre</span>
          </span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors duration-150",
                  active
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <Icon className="size-4" strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="rounded-2xl bg-card/60 border border-border/60 p-3 text-xs leading-relaxed text-faint">
          <p className="font-medium text-foreground mb-0.5">Indian Student Vault</p>
          Notes, jobs, scholarships, and campus board in one unified workspace.
        </div>
      </aside>

      <div className="md:pl-60">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-border bg-background/90 px-4 backdrop-blur-sm md:h-16 md:px-8">
          <Link to="/" className="flex items-center gap-2 md:hidden">
            <LogoMark className="size-7 text-primary" />
            <span className="font-display text-xl font-medium">CollegeCentre</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <SelectField
              aria-label="Your campus"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="hidden h-9 max-w-44 text-xs md:block"
            >
              {COLLEGES.filter((c) => c !== "Any campus").map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </SelectField>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="hidden min-w-48 justify-start gap-2 text-muted-foreground md:inline-flex"
            >
              <Search className="size-4" />
              Search
              <kbd className="ml-auto rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-faint">
                Ctrl K
              </kbd>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="md:hidden"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="size-4" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  className="relative"
                  aria-label="Upcoming deadlines"
                >
                  <Bell className="size-4" />
                  {soon.length > 0 ? (
                    <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destructive" />
                  ) : null}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <p className="mb-2 px-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Next 3 weeks
                </p>
                <ul className="flex flex-col gap-1">
                  {soon.slice(0, 6).map((d) => (
                    <li key={d.id}>
                      <Link
                        to="/alerts"
                        className="flex items-start justify-between gap-3 rounded-xl px-2 py-2 hover:bg-secondary"
                      >
                        <span className="text-sm leading-snug">{d.title}</span>
                        <Badge variant="outline">{relativeDeadline(d.date)}</Badge>
                      </Link>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="mx-auto w-full max-w-6xl px-4 py-6 pb-28 md:px-8 md:py-8 md:pb-12">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-2 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
        <ul className="grid grid-cols-5">
          {MOBILE_NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex min-h-11 flex-col items-center justify-center gap-0.5 text-[10px] font-medium",
                    active ? "text-primary font-bold" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" strokeWidth={active ? 2 : 1.6} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
