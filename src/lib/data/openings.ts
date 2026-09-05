export type OpeningKind = "internship" | "fresher";

export type Opening = {
  id: string;
  title: string;
  company: string;
  kind: OpeningKind;
  location: string;
  remote: boolean;
  pay: string;
  batch: string;
  deadline: string;
  tags: string[];
  eligibility: string;
  description: string;
};

export const OPENINGS: Opening[] = [
  {
    id: "razorpay-sde-intern",
    title: "SDE Intern — Summer 2027",
    company: "Razorpay",
    kind: "internship",
    location: "Bengaluru",
    remote: false,
    pay: "₹1.0 L / month",
    batch: "2027, 2028",
    deadline: "2026-09-28",
    tags: ["Backend", "Go", "Java"],
    eligibility: "CSE / ECE, CGPA ≥ 7.0, available May–July 2027.",
    description:
      "Eight-week internship on payments infrastructure. You will own a small service, sit in on design reviews, and ship behind a feature flag. Conversion to a PPO is common if the summer project lands.",
  },
  {
    id: "flipkart-swe-intern",
    title: "Software Engineering Intern",
    company: "Flipkart",
    kind: "internship",
    location: "Bengaluru",
    remote: false,
    pay: "₹80,000 / month",
    batch: "2027",
    deadline: "2026-10-12",
    tags: ["Java", "React", "System design"],
    eligibility: "B.Tech 2027 batch. Online assessment + two interviews.",
    description:
      "Work with a pod on search, supply-chain, or app-experience. Expect a DSA round, then a machine-coding round that is closer to work than leetcode.",
  },
  {
    id: "amazon-sde-intern",
    title: "SDE Intern",
    company: "Amazon",
    kind: "internship",
    location: "Hyderabad / Bengaluru",
    remote: false,
    pay: "₹1.2 L / month",
    batch: "2027",
    deadline: "2026-09-18",
    tags: ["DSA", "Leadership principles"],
    eligibility: "All engineering branches, no active backlogs.",
    description:
      "Classic Amazon intern loop: OA (DSA + work simulation), then two interviews. Internships run May–July; return offers depend on the bar-raiser equivalent for interns.",
  },
  {
    id: "freshworks-intern",
    title: "Product Engineering Intern",
    company: "Freshworks",
    kind: "internship",
    location: "Chennai",
    remote: true,
    pay: "₹40,000 / month",
    batch: "2027, 2028",
    deadline: "2026-10-30",
    tags: ["Ruby", "React", "SaaS"],
    eligibility: "Chennai / remote-friendly. Strong web fundamentals.",
    description:
      "Build on Freshdesk or Freshservice. Hybrid from Chennai; outstation interns can stay remote with a mid-point demo in office.",
  },
  {
    id: "zerodha-intern",
    title: "Backend Intern — Kite",
    company: "Zerodha",
    kind: "internship",
    location: "Bengaluru",
    remote: false,
    pay: "₹50,000 / month",
    batch: "2027",
    deadline: "2026-11-08",
    tags: ["Go", "Postgres", "Markets"],
    eligibility: "Small cohort. A public GitHub with boring, correct code helps more than a CGPA.",
    description:
      "Market-hours systems, not a toy dashboard. You will read a lot of existing Go and be asked to make one thing faster or simpler.",
  },
  {
    id: "google-step",
    title: "STEP Intern (2nd year)",
    company: "Google",
    kind: "internship",
    location: "Bengaluru / Hyderabad",
    remote: false,
    pay: "₹1.2 L / month",
    batch: "2028",
    deadline: "2026-09-22",
    tags: ["STEP", "2nd year"],
    eligibility: "First or second year only. Women and under-represented groups preferred as per programme rules.",
    description:
      "A 10–12 week intern with extra mentoring. Apply early — the portal closes as soon as the volume cap is hit.",
  },
  {
    id: "tcs-nqt",
    title: "TCS NQT — Ninja / Digital / Prime",
    company: "Tata Consultancy Services",
    kind: "fresher",
    location: "Pan India",
    remote: false,
    pay: "₹3.3–9 LPA",
    batch: "2026, 2027",
    deadline: "2026-09-30",
    tags: ["Mass hiring", "NQT"],
    eligibility: "All degrees, 60% throughout, up to 1 backlog at the time of applying.",
    description:
      "National Qualifier Test. Ninja, Digital, and Prime bands from the same paper. Keep 2026–27 hall tickets; many campuses still route through NQT even when they also have a TPO drive.",
  },
  {
    id: "infosys-specialist",
    title: "Specialist Programmer",
    company: "Infosys",
    kind: "fresher",
    location: "Bengaluru / Pune / Hyderabad",
    remote: false,
    pay: "₹9.5 LPA",
    batch: "2027",
    deadline: "2026-10-20",
    tags: ["HackWithInfy", "SP"],
    eligibility: "HackWithInfy finalists and campus SP drive. Strong DSA.",
    description:
      "The higher Infosys band. Expect a tough OA and a design-flavoured interview. Role is closer to product engineering than Infosys SES.",
  },
  {
    id: "atlassian-grad",
    title: "Graduate Software Engineer",
    company: "Atlassian",
    kind: "fresher",
    location: "Bengaluru",
    remote: true,
    pay: "₹21 LPA + bonus",
    batch: "2027",
    deadline: "2026-11-15",
    tags: ["Java", "Kotlin", "Full-time"],
    eligibility: "2027 graduates. Intern conversions are separate.",
    description:
      "Jira / Confluence / Atlas teams. Interview loop is values + DSA + a system-design lite round. Hybrid Bengaluru with a real remote option.",
  },
  {
    id: "cred-sde",
    title: "SDE-1",
    company: "CRED",
    kind: "fresher",
    location: "Bengaluru",
    remote: false,
    pay: "₹18–24 LPA",
    batch: "2026, 2027",
    deadline: "2026-10-05",
    tags: ["Kotlin", "Android", "Backend"],
    eligibility: "Off-campus. Referral helps. Two DSA rounds, one tech, one culture.",
    description:
      "Small hiring window. If you have Android or JVM backend internships, lead with that rather than a generic resume.",
  },
  {
    id: "nvidia-intern",
    title: "Systems Software Intern",
    company: "NVIDIA",
    kind: "internship",
    location: "Pune / Bengaluru",
    remote: false,
    pay: "₹1.25 L / month",
    batch: "2027",
    deadline: "2026-12-01",
    tags: ["C++", "CUDA", "OS"],
    eligibility: "Strong C/C++, OS, and computer architecture. ECE welcome.",
    description:
      "Driver, compiler, or CUDA runtime adjacent work. Interviews go deep on pointers, memory, and concurrency — not framework trivia.",
  },
  {
    id: "groww-intern",
    title: "Intern — Consumer",
    company: "Groww",
    kind: "internship",
    location: "Bengaluru",
    remote: false,
    pay: "₹60,000 / month",
    batch: "2027, 2028",
    deadline: "2026-09-25",
    tags: ["Android", "iOS", "Fintech"],
    eligibility: "App-dev internships or shipped side projects.",
    description:
      "Consumer squad internships. You will pair with an SDE on a quarterly OKR, not a throwaway intern tool.",
  },
];

export function getOpening(id: string): Opening | undefined {
  return OPENINGS.find((o) => o.id === id);
}
