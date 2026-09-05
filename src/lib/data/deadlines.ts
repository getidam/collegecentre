export type DeadlineKind = "scholarship" | "exam";

export type Deadline = {
  id: string;
  kind: DeadlineKind;
  title: string;
  org: string;
  date: string;
  amount?: string;
  tags: string[];
  summary: string;
  href?: string;
};

export const DEADLINES: Deadline[] = [
  {
    id: "nsp-2026",
    kind: "scholarship",
    title: "National Scholarship Portal — all central schemes",
    org: "Ministry of Education",
    date: "2026-10-31",
    amount: "Varies by scheme",
    tags: ["NSP", "Central"],
    summary:
      "One form covers post-matric, merit-cum-means, and several minority schemes. Institute verification is the slow step — submit two weeks before the portal date.",
  },
  {
    id: "inspire-she",
    kind: "scholarship",
    title: "INSPIRE-SHE 2026",
    org: "DST",
    date: "2026-11-15",
    amount: "₹80,000 / year",
    tags: ["Science", "BSc"],
    summary:
      "For students in natural and basic sciences within the top 1% of class XII boards, or JEE/NEET rank holders who chose a BSc over professional degrees.",
  },
  {
    id: "reliance-ug",
    kind: "scholarship",
    title: "Reliance Foundation Undergraduate Scholarships",
    org: "Reliance Foundation",
    date: "2026-10-08",
    amount: "Up to ₹2 L / year",
    tags: ["Merit", "Need"],
    summary:
      "First-year undergraduates. Aptitude test plus household-income cap. Engineering and liberal arts both eligible.",
  },
  {
    id: "aditya-birla",
    kind: "scholarship",
    title: "Aditya Birla Scholarship",
    org: "Aditya Birla Group",
    date: "2026-09-20",
    amount: "Fee cover, selected campuses",
    tags: ["IIT", "IIM", "BITS"],
    summary:
      "By invitation from partner campuses (IITs, BITS, XLRI, law schools). Essay plus interview. Do not wait for the TPO mail — check the portal this week.",
  },
  {
    id: "pm-usp",
    kind: "scholarship",
    title: "PM-USP YASASVI (OBC/EBC/DNT)",
    org: "Ministry of Social Justice",
    date: "2026-10-18",
    amount: "Up to ₹75,000",
    tags: ["OBC", "EBC"],
    summary:
      "Class 9–12 and undergraduate. Income cap applies. Keep caste and income certificates in the NSP format.",
  },
  {
    id: "gate-stipend",
    kind: "scholarship",
    title: "M.Tech GATE stipend (AICTE)",
    org: "AICTE / MoE",
    date: "2027-07-31",
    amount: "₹12,400 / month",
    tags: ["GATE", "M.Tech"],
    summary:
      "Paid to GATE-qualified students on AICTE-approved M.Tech seats. Not a separate application — it rides on your admission. Mark this if you are targeting 2027 M.Tech.",
  },
  {
    id: "tata-trusts",
    kind: "scholarship",
    title: "Tata Trusts — higher education",
    org: "Tata Trusts",
    date: "2026-12-12",
    amount: "Need-based",
    tags: ["Need", "UG/PG"],
    summary:
      "Rolling-ish window with a hard close in December. Strong for students who already hold an admission letter and a fee demand.",
  },
  {
    id: "karnataka-e-pass",
    kind: "scholarship",
    title: "SSP / e-pass Karnataka",
    org: "Government of Karnataka",
    date: "2026-11-30",
    amount: "Fee reimbursement",
    tags: ["State", "Karnataka"],
    summary:
      "For students with Karnataka eligibility studying in the state. College Nodal Officer has to push the application — chase them, do not just upload.",
  },
  {
    id: "gate-2027-reg",
    kind: "exam",
    title: "GATE 2027 registration (without late fee)",
    org: "IIT Madras",
    date: "2026-10-03",
    tags: ["GATE", "M.Tech", "PSU"],
    summary:
      "Organising institute for GATE 2027 is IIT Madras. Paper is in February 2027. CSE, DA, EE, ME, CE, and the new combined papers all sit on this window.",
  },
  {
    id: "gate-2027-exam",
    kind: "exam",
    title: "GATE 2027 — exam window",
    org: "IIT Madras",
    date: "2027-02-06",
    tags: ["GATE"],
    summary:
      "Two weekends in early February (indicative). Treat 6 Feb as the planning date until the official timetable drops.",
  },
  {
    id: "cat-2026",
    kind: "exam",
    title: "CAT 2026",
    org: "IIM",
    date: "2026-11-29",
    tags: ["MBA", "IIM"],
    summary:
      "Last Sunday of November. Registration usually closes in mid-September — if you are even 20% sure about an MBA, register; you can skip later.",
  },
  {
    id: "cat-2026-reg",
    kind: "exam",
    title: "CAT 2026 registration close",
    org: "IIM",
    date: "2026-09-18",
    tags: ["MBA"],
    summary:
      "The form closes before most campus mid-sems end. Keep scanned photos, category certificates, and a working ID ready.",
  },
  {
    id: "ugcnet-dec",
    kind: "exam",
    title: "UGC NET December 2026",
    org: "NTA",
    date: "2026-12-18",
    tags: ["NET", "JRF", "PhD"],
    summary:
      "For lectureship / JRF. December cycle registration typically opens in September. Paper 1 is the easy mark-bank if you start now.",
  },
  {
    id: "upsc-cse-2027",
    kind: "exam",
    title: "UPSC CSE 2027 prelims",
    org: "UPSC",
    date: "2027-05-23",
    tags: ["UPSC", "Civil services"],
    summary:
      "Notification in February 2027. If this is your first attempt, the current semester is when optional-subject sampling should happen — not April.",
  },
  {
    id: "ssc-cgl-2026",
    kind: "exam",
    title: "SSC CGL 2026 Tier-1",
    org: "SSC",
    date: "2026-10-24",
    tags: ["SSC", "Jobs"],
    summary:
      "Indicative window. Quant + English decide the cutoff. Useful parallel track if you want a government backup beside campus placements.",
  },
  {
    id: "anna-endsem",
    kind: "exam",
    title: "Anna University Nov/Dec 2026 end-sem",
    org: "Anna University",
    date: "2026-11-20",
    tags: ["Semester", "Anna"],
    summary:
      "Theory exams typically from the third week of November. Practicals and project viva sit in the two weeks before that — block them on the planner.",
  },
];

export function upcomingDeadlines(withinDays = 45): Deadline[] {
  return DEADLINES.filter((d) => {
    const days =
      (new Date(d.date + "T23:59:59").getTime() - Date.now()) / 86_400_000;
    return days >= -1 && days <= withinDays;
  }).sort((a, b) => a.date.localeCompare(b.date));
}
