export type ResourceKind = "notes" | "pyq" | "syllabus" | "lab";

export type ResourceUnit = {
  title: string;
  topics: string[];
};

export type PyqItem = {
  year: number;
  marks: number;
  question: string;
};

export type Formula = {
  name: string;
  body: string;
};

export type Resource = {
  id: string;
  title: string;
  kind: ResourceKind;
  college: string;
  course: string;
  subject: string;
  semester: number;
  year: number;
  pages: number;
  downloads: number;
  tags: string[];
  summary: string;
  units: ResourceUnit[];
  pyqs: PyqItem[];
  formulas: Formula[];
};

export const KIND_LABEL: Record<ResourceKind, string> = {
  notes: "Notes",
  pyq: "PYQ",
  syllabus: "Syllabus",
  lab: "Lab",
};

export const RESOURCES: Resource[] = [
  {
    id: "os-anna-5",
    title: "Operating Systems — unit notes mapped to Anna University",
    kind: "notes",
    college: "Anna University",
    course: "B.Tech CSE",
    subject: "Operating Systems",
    semester: 5,
    year: 2025,
    pages: 86,
    downloads: 18420,
    tags: ["Galvin", "CSE", "mid-sem"],
    summary:
      "Lecture-density notes for CS8592. Scheduling worked examples, deadlock avoidance, and paging numericals written the way the end-sem actually asks them.",
    units: [
      {
        title: "System structures",
        topics: [
          "Kernel vs user mode",
          "System calls",
          "Monolithic, layered, microkernel",
          "Virtual machines",
        ],
      },
      {
        title: "Processes and threads",
        topics: [
          "PCB and context switch",
          "Process states",
          "User vs kernel threads",
          "Multithreading models",
        ],
      },
      {
        title: "CPU scheduling",
        topics: ["FCFS, SJF, SRTF", "Round robin", "Priority and aging", "Multilevel queues"],
      },
      {
        title: "Synchronisation and deadlocks",
        topics: [
          "Critical section",
          "Semaphores and monitors",
          "Banker's algorithm",
          "Detection and recovery",
        ],
      },
      {
        title: "Memory and files",
        topics: ["Paging and TLB", "Segmentation", "Page replacement", "Directory structures"],
      },
    ],
    pyqs: [
      {
        year: 2024,
        marks: 16,
        question:
          "For the processes (A:0/7, B:2/4, C:3/1, D:5/4) draw Gantt charts for SJF and RR (q=2). Compute average waiting time for both.",
      },
      {
        year: 2023,
        marks: 8,
        question: "Explain the dining philosophers problem and give a deadlock-free solution using semaphores.",
      },
      {
        year: 2022,
        marks: 13,
        question:
          "A system has 5 processes and 3 resource types (10, 5, 7). Given Allocation and Max, apply Banker's algorithm and state if the state is safe.",
      },
    ],
    formulas: [
      { name: "Turnaround", body: "TAT = completion − arrival" },
      { name: "Waiting", body: "WT = TAT − burst" },
      { name: "CPU utilisation", body: "U = (busy time / total time) × 100" },
      { name: "Effective access time", body: "EAT = h × cache + (1 − h) × memory" },
    ],
  },
  {
    id: "dbms-vtu-5",
    title: "DBMS — ER, normalisation, SQL drills",
    kind: "notes",
    college: "VTU",
    course: "B.Tech CSE",
    subject: "Database Management Systems",
    semester: 5,
    year: 2025,
    pages: 72,
    downloads: 15310,
    tags: ["Navathe", "SQL", "GATE"],
    summary:
      "ER-to-relational mapping, 1NF through BCNF with the classic supplier-parts examples, plus the SQL queries that keep showing up in VTU and GATE.",
    units: [
      {
        title: "ER model",
        topics: ["Entities and weak entities", "Cardinality", "Aggregation", "Extended ER"],
      },
      {
        title: "Relational algebra and SQL",
        topics: ["Select, project, join", "Nested queries", "Triggers", "Views"],
      },
      {
        title: "Normalisation",
        topics: ["FDs and closures", "2NF, 3NF, BCNF", "Lossless join", "Dependency preservation"],
      },
      {
        title: "Transactions",
        topics: ["ACID", "Conflict serialisability", "2PL", "Deadlock in databases"],
      },
    ],
    pyqs: [
      {
        year: 2024,
        marks: 10,
        question:
          "Find a canonical cover for F = {A→BC, B→C, A→B, AB→C} and decompose into 3NF.",
      },
      {
        year: 2023,
        marks: 8,
        question: "Write SQL to list departments whose average salary exceeds the company average.",
      },
    ],
    formulas: [
      { name: "Closure", body: "X+ is the set of attributes functionally determined by X" },
      { name: "BCNF", body: "For every FD X → Y, X is a superkey" },
    ],
  },
  {
    id: "dsa-iitd-3",
    title: "Data structures — IIT Delhi tutorial sheets, annotated",
    kind: "notes",
    college: "IIT Delhi",
    course: "B.Tech CSE",
    subject: "Data Structures",
    semester: 3,
    year: 2025,
    pages: 64,
    downloads: 22104,
    tags: ["COL106", "trees", "graphs"],
    summary:
      "Tutorial problems with the expected proof-style answers: amortised analysis of splay, Dijkstra vs Bellman-Ford, and the recursion-tree method.",
    units: [
      {
        title: "Arrays, lists, stacks",
        topics: ["Amortised append", "Infix to postfix", "Stock span", "Circular queues"],
      },
      {
        title: "Trees and heaps",
        topics: ["BST vs AVL", "Heap operations", "Huffman", "B-trees (intro)"],
      },
      {
        title: "Hashing and graphs",
        topics: ["Chaining vs probing", "BFS/DFS", "MST", "Shortest paths"],
      },
    ],
    pyqs: [
      {
        year: 2025,
        marks: 10,
        question: "Insert 8, 3, 10, 1, 6, 14, 4, 7, 13 into an AVL tree. Show rotations.",
      },
      {
        year: 2024,
        marks: 12,
        question: "Run Dijkstra from s on a graph with a negative edge (no cycle). Where does it fail? Show the trace.",
      },
    ],
    formulas: [
      { name: "Heap height", body: "h = ⌊log₂ n⌋" },
      { name: "Master theorem", body: "T(n) = a T(n/b) + n^k → compare k with log_b a" },
    ],
  },
  {
    id: "cn-mu-6",
    title: "Computer Networks — Forouzan mapped to MU",
    kind: "notes",
    college: "Mumbai University",
    course: "B.Tech CSE",
    subject: "Computer Networks",
    semester: 6,
    year: 2025,
    pages: 91,
    downloads: 12880,
    tags: ["TCP", "subnetting", "CN"],
    summary:
      "Layer-wise notes with subnetting worksheets, TCP congestion graphs, and the sliding-window numericals MU recycles every other year.",
    units: [
      {
        title: "Physical and data link",
        topics: ["Encoding", "CRC and Hamming", "Stop-and-wait", "Go-Back-N, SR"],
      },
      {
        title: "Network layer",
        topics: ["IPv4 addressing", "CIDR", "OSPF vs RIP", "NAT"],
      },
      {
        title: "Transport and application",
        topics: ["UDP vs TCP", "3-way handshake", "DNS, HTTP", "TLS at a glance"],
      },
    ],
    pyqs: [
      {
        year: 2024,
        marks: 10,
        question: "A network 172.16.0.0/16 is split into 64 subnets. Give mask, hosts/subnet, and the 5th subnet range.",
      },
      {
        year: 2023,
        marks: 8,
        question: "Explain slow start and congestion avoidance. Sketch cwnd vs transmission number.",
      },
    ],
    formulas: [
      { name: "Efficiency (stop-and-wait)", body: "η = 1 / (1 + 2a), a = Tp / Tx" },
      { name: "CRC", body: "Append degree(G) zeros, divide by generator, remainder is the code" },
    ],
  },
  {
    id: "em-gate",
    title: "Engineering Mathematics — GATE CSE crash notes",
    kind: "notes",
    college: "IIT Bombay",
    course: "B.Tech CSE",
    subject: "Engineering Mathematics",
    semester: 4,
    year: 2026,
    pages: 48,
    downloads: 31002,
    tags: ["GATE", "linear algebra", "probability"],
    summary:
      "The 12–15 marks that GATE always takes: eigenvalues, Bayes, Poisson, and graph-theory counting, with the shortcuts that survive negative marking.",
    units: [
      {
        title: "Linear algebra",
        topics: ["Rank and consistency", "Eigenvalues", "Positive definite", "Orthogonality"],
      },
      {
        title: "Probability",
        topics: ["Bayes", "Random variables", "Binomial / Poisson / Normal", "Expectation tricks"],
      },
      {
        title: "Calculus and discrete",
        topics: ["Maxima-minima", "Taylor", "Pigeonhole", "Generating functions (light)"],
      },
    ],
    pyqs: [
      {
        year: 2025,
        marks: 2,
        question: "The eigenvalues of a 3×3 matrix are 1, 1, 2. Trace and det?",
      },
      {
        year: 2024,
        marks: 2,
        question: "Two fair dice. Probability that the sum is 8 given that at least one die is 3.",
      },
    ],
    formulas: [
      { name: "Trace", body: "tr(A) = Σ λi" },
      { name: "Bayes", body: "P(A|B) = P(B|A) P(A) / P(B)" },
      { name: "Poisson", body: "P(k) = e^(−λ) λ^k / k!" },
    ],
  },
  {
    id: "pyq-gate-cse-2025",
    title: "GATE CSE 2025 — official paper with short solutions",
    kind: "pyq",
    college: "IIT Roorkee",
    course: "B.Tech CSE",
    subject: "GATE CSE",
    semester: 8,
    year: 2025,
    pages: 36,
    downloads: 54011,
    tags: ["GATE", "set 1", "solutions"],
    summary:
      "Set 1 reconstructed with one-line reasons. Useful as a timed mock: 65 questions, 3 hours, then grade against the key in the last section.",
    units: [
      {
        title: "How to sit the paper",
        topics: ["NAT rounding", "MSQ strategy", "When to skip aptitude", "Section order"],
      },
      {
        title: "Topic map",
        topics: ["Algo 8 Q", "OS 6 Q", "DB 5 Q", "CN 5 Q", "TOC/CD 7 Q"],
      },
    ],
    pyqs: [
      {
        year: 2025,
        marks: 2,
        question:
          "A 32-bit processor has a 2-way set-associative cache of 8 KB, 32 B lines. Number of bits in the set index?",
      },
      {
        year: 2025,
        marks: 1,
        question: "Which of the following is/are undecidable? (MSQ on emptiness of CFG / regularity of CFL)",
      },
    ],
    formulas: [],
  },
  {
    id: "pyq-os-anna-2024",
    title: "CS8592 Operating Systems — Nov 2024 end-sem paper",
    kind: "pyq",
    college: "Anna University",
    course: "B.Tech CSE",
    subject: "Operating Systems",
    semester: 5,
    year: 2024,
    pages: 8,
    downloads: 9021,
    tags: ["end-sem", "regulation 2021"],
    summary:
      "The actual November 2024 paper with a marking scheme and a note on which 16-mark questions were repeats from 2022.",
    units: [
      {
        title: "Part A (10 × 2)",
        topics: ["System calls", "Thrashing", "Wait-for graph", "Internal fragmentation"],
      },
      {
        title: "Part B (5 × 16)",
        topics: ["Scheduling numerical", "Deadlock", "Demand paging", "File allocation"],
      },
    ],
    pyqs: [
      {
        year: 2024,
        marks: 16,
        question:
          "Explain demand paging. A process of 4 pages, page size 1 KB, memory of 2 frames. Trace FIFO and LRU for the reference string 1,2,3,4,1,2,5,1,2.",
      },
    ],
    formulas: [],
  },
  {
    id: "syllabus-cse5-anna",
    title: "Anna University CSE — semester 5 full syllabus",
    kind: "syllabus",
    college: "Anna University",
    course: "B.Tech CSE",
    subject: "Semester map",
    semester: 5,
    year: 2021,
    pages: 14,
    downloads: 6402,
    tags: ["R2021", "credits"],
    summary:
      "Official credit map for 5th semester: OS, DBMS, Computer Networks, Software Engineering, and the professional elective list, with exam hours and internal split.",
    units: [
      {
        title: "Core papers",
        topics: [
          "CS8591 — Computer Networks (3 0 0 3)",
          "CS8592 — Operating Systems (3 0 0 3)",
          "CS8501 — Theory of Computation (3 0 0 3)",
          "CS8492 / PE — Software Engineering",
        ],
      },
      {
        title: "Labs",
        topics: ["OS lab", "Networks lab", "Mini project"],
      },
    ],
    pyqs: [],
    formulas: [],
  },
  {
    id: "de-nitw-3",
    title: "Digital Electronics — Morris Mano problem set",
    kind: "notes",
    college: "NIT Warangal",
    course: "B.Tech ECE",
    subject: "Digital Electronics",
    semester: 3,
    year: 2025,
    pages: 55,
    downloads: 7340,
    tags: ["K-map", "flip-flops", "ECE"],
    summary:
      "Boolean simplification, K-maps up to 5 variables, and sequential circuit design with the timing diagrams the lab viva always asks.",
    units: [
      {
        title: "Combinational",
        topics: ["Canonical forms", "K-map", "Adders, mux, decoder", "Hazards"],
      },
      {
        title: "Sequential",
        topics: ["Latches vs flip-flops", "Counters", "Shift registers", "State machines"],
      },
    ],
    pyqs: [
      {
        year: 2024,
        marks: 10,
        question: "Design a mod-6 synchronous counter using JK flip-flops. Show the state table and excitation.",
      },
    ],
    formulas: [{ name: "Max terms", body: "n variables → 2^n minterms / maxterms" }],
  },
  {
    id: "fa-du-bcom",
    title: "Financial Accounting — SRCC tutorial pack",
    kind: "notes",
    college: "Delhi University",
    course: "B.Com",
    subject: "Financial Accounting",
    semester: 1,
    year: 2025,
    pages: 70,
    downloads: 11204,
    tags: ["journal", "final accounts", "DU"],
    summary:
      "Journal through final accounts, depreciation, and the company-accounts problems that SRCC internals are built on.",
    units: [
      {
        title: "Books of original entry",
        topics: ["Journal", "Cash book", "Ledger posting", "Trial balance"],
      },
      {
        title: "Final accounts",
        topics: ["Adjustments", "Trading A/c", "P&L", "Balance sheet"],
      },
    ],
    pyqs: [
      {
        year: 2024,
        marks: 12,
        question:
          "From the trial balance and adjustments (outstanding rent, prepaid insurance, depreciation 10% on machinery), prepare the trading and P&L account.",
      },
    ],
    formulas: [
      { name: "Accounting equation", body: "Assets = Liabilities + Capital" },
      { name: "SLM depreciation", body: "(Cost − scrap) / life" },
    ],
  },
  {
    id: "coa-bits-4",
    title: "Computer Architecture — Hamacher notes, BITS Pilani",
    kind: "notes",
    college: "BITS Pilani",
    course: "B.Tech CSE",
    subject: "Computer Architecture",
    semester: 4,
    year: 2025,
    pages: 58,
    downloads: 8900,
    tags: ["pipeline", "cache", "CS F342"],
    summary:
      "Instruction pipelining, hazards, and cache mapping with the numericals from BITS comprehensive exams.",
    units: [
      {
        title: "ISA and ALU",
        topics: ["Addressing modes", "Single vs multi-bus", "Booth", "IEEE 754"],
      },
      {
        title: "Pipeline and memory",
        topics: ["Data hazards", "Forwarding", "Cache mapping", "Virtual memory"],
      },
    ],
    pyqs: [
      {
        year: 2024,
        marks: 10,
        question:
          "A 4-stage pipeline with 2 ns clock has a load-use hazard every 5th instruction. Speedup over a 8 ns non-pipelined datapath?",
      },
    ],
    formulas: [
      { name: "Speedup", body: "S = t_nonpipe / t_pipe" },
      { name: "AMAT", body: "hit time + miss rate × miss penalty" },
    ],
  },
  {
    id: "python-lab-vit",
    title: "Python lab record — VIT winter semester",
    kind: "lab",
    college: "VIT Vellore",
    course: "B.Tech CSE",
    subject: "Programming in Python",
    semester: 2,
    year: 2026,
    pages: 32,
    downloads: 5408,
    tags: ["lab", "pandas", "numpy"],
    summary:
      "12 experiments with expected output screenshots described in text: file I/O, numpy broadcasting, a tiny pandas EDA, and the mini-project spec.",
    units: [
      {
        title: "Experiments 1–6",
        topics: ["Conditionals", "Functions", "Files", "Exceptions"],
      },
      {
        title: "Experiments 7–12",
        topics: ["NumPy", "Pandas", "Matplotlib", "Mini project: attendance CSV"],
      },
    ],
    pyqs: [],
    formulas: [],
  },
  {
    id: "toc-nitk-5",
    title: "Theory of Computation — lecture notes, NITK",
    kind: "notes",
    college: "NIT Surathkal",
    course: "B.Tech CSE",
    subject: "Theory of Computation",
    semester: 5,
    year: 2025,
    pages: 61,
    downloads: 6701,
    tags: ["DFA", "Pumping", "undecidability"],
    summary:
      "DFA/NFA conversions, pumping lemma templates you can reuse in the exam hall, and a clean map of decidable vs undecidable problems.",
    units: [
      {
        title: "Regular languages",
        topics: ["DFA, NFA, ε-NFA", "Regex", "Pumping lemma", "Myhill–Nerode"],
      },
      {
        title: "CFL and TM",
        topics: ["CFG and PDA", "Chomsky hierarchy", "TM variants", "Rice's theorem"],
      },
    ],
    pyqs: [
      {
        year: 2024,
        marks: 8,
        question: "Prove that {a^n b^n c^n | n ≥ 0} is not context-free using the pumping lemma.",
      },
    ],
    formulas: [],
  },
  {
    id: "se-iiith-6",
    title: "Software Engineering — IIIT-H project course pack",
    kind: "notes",
    college: "IIIT Hyderabad",
    course: "B.Tech CSE",
    subject: "Software Engineering",
    semester: 6,
    year: 2025,
    pages: 40,
    downloads: 4102,
    tags: ["agile", "testing", "UML"],
    summary:
      "Requirements through testing, with the UML diagrams and testing metrics the project evaluations actually grade.",
    units: [
      {
        title: "Process and design",
        topics: ["Waterfall vs Agile", "User stories", "Class diagrams", "Design patterns (subset)"],
      },
      {
        title: "Quality",
        topics: ["Unit vs integration", "Cyclomatic complexity", "CI basics", "Code review checklist"],
      },
    ],
    pyqs: [
      {
        year: 2024,
        marks: 6,
        question: "For the CFG of a module with 4 predicates, compute cyclomatic complexity and the minimum number of tests.",
      },
    ],
    formulas: [{ name: "Cyclomatic complexity", body: "V(G) = E − N + 2P" }],
  },
  {
    id: "eco-du-2",
    title: "Introductory Macroeconomics — DU BA notes",
    kind: "notes",
    college: "Delhi University",
    course: "B.A. Economics",
    subject: "Macroeconomics",
    semester: 2,
    year: 2025,
    pages: 44,
    downloads: 3880,
    tags: ["IS-LM", "national income", "DU"],
    summary:
      "National income identities, Keynesian cross, and IS-LM drawn the way Hindu College tutorials expect.",
    units: [
      {
        title: "Measurement",
        topics: ["GDP vs GNP", "Nominal vs real", "CPI vs GDP deflator", "Limitations"],
      },
      {
        title: "Income-expenditure",
        topics: ["Consumption function", "Multiplier", "IS-LM", "Fiscal vs monetary"],
      },
    ],
    pyqs: [
      {
        year: 2024,
        marks: 10,
        question: "If MPC = 0.8 and tax rate t = 0.25, find the government-expenditure multiplier.",
      },
    ],
    formulas: [
      { name: "Multiplier", body: "k = 1 / (1 − MPC)" },
      { name: "Taxed multiplier", body: "k = 1 / (1 − MPC(1 − t))" },
    ],
  },
  {
    id: "thermo-nit-3",
    title: "Engineering Thermodynamics — NIT Trichy notes",
    kind: "notes",
    college: "NIT Trichy",
    course: "B.Tech Mechanical",
    subject: "Thermodynamics",
    semester: 3,
    year: 2025,
    pages: 78,
    downloads: 5200,
    tags: ["Otto", "Rankine", "ME"],
    summary:
      "First and second law numericals, Otto/Diesel/Rankine cycles, and the steam-table problems that eat time in the end-sem.",
    units: [
      {
        title: "Laws",
        topics: ["SFEE", "Entropy", "Availability", "T-ds relations"],
      },
      {
        title: "Cycles",
        topics: ["Otto", "Diesel", "Dual", "Rankine with reheat"],
      },
    ],
    pyqs: [
      {
        year: 2024,
        marks: 12,
        question:
          "An Otto cycle with r = 8, γ = 1.4, heat addition 800 kJ/kg. Find efficiency and mean effective pressure if vs = 0.1 m³/kg.",
      },
    ],
    formulas: [
      { name: "Otto efficiency", body: "η = 1 − 1 / r^(γ−1)" },
      { name: "SFEE", body: "h1 + c1²/2 + g z1 + q = h2 + c2²/2 + g z2 + w" },
    ],
  },
];

export function getResource(id: string): Resource | undefined {
  return RESOURCES.find((r) => r.id === id);
}

export const SUBJECTS = [...new Set(RESOURCES.map((r) => r.subject))].sort();
