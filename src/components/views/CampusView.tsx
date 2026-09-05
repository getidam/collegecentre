import React, { useEffect, useState } from "react";
import { ArrowBigUp, Plus, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/select-field";
import { Textarea } from "@/components/ui/textarea";
import { COLLEGES } from "@/lib/data/colleges";
import { usePrefs } from "@/lib/stores/prefs";
import { useSaved } from "@/lib/stores/saved";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export const CATEGORIES = ["confession", "rant", "advice", "lost", "event"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABEL: Record<Category, string> = {
  confession: "Confession",
  rant: "Rant",
  advice: "Advice",
  lost: "Lost + found",
  event: "Event",
};

type ConfessionItem = {
  id: string | number;
  college: string;
  category: Category;
  body: string;
  upvotes: number;
  created_at?: string;
};

const SEED_CONFESSIONS: ConfessionItem[] = [
  {
    id: 1,
    college: "Anna University",
    category: "advice",
    body: "CS8592 OS end-sem: they reused the 2022 16-mark on demand paging almost word for word. If you only do one PYQ paper, do Nov 2022.",
    upvotes: 84,
  },
  {
    id: 2,
    college: "IIT Delhi",
    category: "confession",
    body: "I have been studying in the 24-hour library for three weeks and I still cannot tell you where the water cooler on the second floor is. I just never leave my seat.",
    upvotes: 61,
  },
  {
    id: 3,
    college: "BITS Pilani",
    category: "rant",
    body: "Comprehensive exam week and the mess decided this is the moment to experiment with a new paneer recipe. It is not paneer. I do not know what it is.",
    upvotes: 112,
  },
  {
    id: 4,
    college: "NIT Trichy",
    category: "event",
    body: "Informal GATE CSE group in Lecture Hall 3, 8–10 pm, weekdays. Bring a notebook, not a laptop. We only do previous papers.",
    upvotes: 47,
  },
  {
    id: 5,
    college: "VIT Vellore",
    category: "lost",
    body: "Black HP laptop sleeve with a cracked badge left in SJT 4th floor lab around 6 pm Friday. Ask the lab assistant if you picked it up — DSA notes inside.",
    upvotes: 19,
  },
  {
    id: 6,
    college: "Mumbai University",
    category: "advice",
    body: "If your CN paper is next week: skip the OSI history essay and drill subnetting. Last two years, 10 marks straight from a /16 split.",
    upvotes: 73,
  },
  {
    id: 7,
    college: "IIIT Hyderabad",
    category: "confession",
    body: "I took the open elective because the reviews said it was light. It is not light. It is a second core disguised as a TED talk.",
    upvotes: 96,
  },
  {
    id: 8,
    college: "NIT Surathkal",
    category: "rant",
    body: "Attendance is being taken in a 70-person class with a paper sheet that starts at the front. By the time it reaches the back, the lecture is over. This is not a system. This is a sport.",
    upvotes: 128,
  },
  {
    id: 9,
    college: "Any campus",
    category: "advice",
    body: "National Scholarship Portal: your college nodal officer is the actual deadline, not the date on the website. If they go on leave in October you are done. Submit this week.",
    upvotes: 201,
  },
];

export function CampusView() {
  const collegePref = usePrefs((s) => s.college);
  const [college, setCollege] = useState("all");
  const [category, setCategory] = useState<Category | "all">("all");
  const [items, setItems] = useState<ConfessionItem[]>(SEED_CONFESSIONS);
  const [loading, setLoading] = useState(false);
  const voted = useSaved((s) => s.voted);
  const markVoted = useSaved((s) => s.markVoted);

  // Load from Supabase on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("confessions")
          .select("id, content, college_name, category, upvotes, created_at")
          .order("upvotes", { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped: ConfessionItem[] = data.map((d: any) => ({
            id: d.id,
            college: d.college_name || "Any campus",
            category: (d.category as Category) || "general",
            body: d.content,
            upvotes: d.upvotes || 0,
            created_at: d.created_at,
          }));
          setItems([...mapped, ...SEED_CONFESSIONS]);
        }
      } catch {
        // use fallback seed
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = items.filter((post) => {
    if (college !== "all" && post.college !== college && post.college !== "Any campus") return false;
    if (category !== "all" && post.category !== category) return false;
    return true;
  });

  const handleUpvote = async (id: string | number, currentUpvotes: number) => {
    const numId = typeof id === "number" ? id : 9999;
    if (voted.includes(numId)) return;
    markVoted(numId);

    setItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, upvotes: currentUpvotes + 1 } : c)),
    );

    if (typeof id === "string") {
      await supabase.from("confessions").update({ upvotes: currentUpvotes + 1 }).eq("id", id);
    }
  };

  return (
    <div className="stagger-in mx-auto flex max-w-2xl flex-col gap-6">
      <header>
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Anonymous Vault
        </p>
        <h1 className="mt-1 font-display text-4xl font-medium tracking-tight">
          Campus Board
        </h1>
        <p className="mt-2 text-muted-foreground">
          No names. No student profiles. Advice, rants, lost property, and the real talk that never makes the official college group chat. Default campus: {collegePref}.
        </p>
      </header>

      {/* Composer */}
      <Composer
        defaultCollege={collegePref}
        onPosted={(newPost) => {
          setItems((prev) => [newPost, ...prev]);
        }}
      />

      {/* Filters */}
      <div className="grid gap-2 sm:grid-cols-2">
        <SelectField value={college} onChange={(e) => setCollege(e.target.value)}>
          <option value="all">All campuses</option>
          {COLLEGES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </SelectField>
        <SelectField
          value={category}
          onChange={(e) => setCategory(e.target.value as Category | "all")}
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABEL[c]}
            </option>
          ))}
        </SelectField>
      </div>

      {loading ? (
        <p className="py-12 text-center text-sm text-muted-foreground">Loading board…</p>
      ) : filtered.length === 0 ? (
        <p className="rounded-3xl bg-card px-5 py-12 text-center text-sm text-muted-foreground shadow-card">
          Quiet so far on this board. Post the first anonymous note.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {filtered.map((post) => {
            const numId = typeof post.id === "number" ? post.id : 9999;
            const hasVoted = voted.includes(numId);
            return (
              <li
                key={post.id}
                className="flex items-start gap-4 rounded-3xl bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <button
                  type="button"
                  onClick={() => handleUpvote(post.id, post.upvotes)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 rounded-2xl p-2 transition-colors",
                    hasVoted
                      ? "bg-primary text-primary-foreground font-bold"
                      : "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                  aria-label="Upvote"
                >
                  <ArrowBigUp className="size-5" />
                  <span className="font-mono text-xs tabular-nums font-semibold">{post.upvotes}</span>
                </button>
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{CATEGORY_LABEL[post.category] || post.category}</Badge>
                    <span className="text-xs text-faint">@{post.college}</span>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Composer({
  defaultCollege,
  onPosted,
}: {
  defaultCollege: string;
  onPosted: (item: ConfessionItem) => void;
}) {
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<Category>("advice");
  const [college, setCollege] = useState(defaultCollege);
  const [submitting, setSubmitting] = useState(false);
  const [showDone, setShowDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim() || body.trim().length < 15) return;

    setSubmitting(true);
    const newPost: ConfessionItem = {
      id: "cf-" + Date.now(),
      college,
      category,
      body: body.trim(),
      upvotes: 1,
    };

    try {
      await supabase.from("confessions").insert({
        content: body.trim(),
        college_name: college,
        category,
        upvotes: 1,
        is_approved: true,
      });
    } catch {
      // offline fallback
    }

    setSubmitting(false);
    onPosted(newPost);
    setBody("");
    setShowDone(true);
    setTimeout(() => setShowDone(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-card p-5 shadow-card space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold">Post Anonymously</h3>
        <span className="text-[11px] text-faint flex items-center gap-1">
          <ShieldCheck className="size-3 text-good" /> Zero tracking
        </span>
      </div>

      <Textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Share exam tip, mess food review, campus advice, or secret... (Min 15 chars)"
        className="min-h-24 bg-background resize-none text-sm"
      />

      <div className="grid grid-cols-2 gap-2">
        <SelectField value={college} onChange={(e) => setCollege(e.target.value)} className="h-10 text-xs">
          {COLLEGES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </SelectField>
        <SelectField value={category} onChange={(e) => setCategory(e.target.value as Category)} className="h-10 text-xs">
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABEL[c]}
            </option>
          ))}
        </SelectField>
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-muted-foreground">
          {body.length} characters {body.length < 15 && `(need ${15 - body.length} more)`}
        </span>
        <Button type="submit" size="sm" disabled={submitting || body.trim().length < 15}>
          {submitting ? "Posting..." : "Post to board"}
        </Button>
      </div>

      {showDone && (
        <p className="text-xs text-good font-medium text-center pt-1 animate-fade-in">
          ✓ Posted anonymously to {college}!
        </p>
      )}
    </form>
  );
}
