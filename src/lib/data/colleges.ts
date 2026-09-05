export const COLLEGES = [
  "Any campus",
  "IIT Bombay",
  "IIT Delhi",
  "IIT Madras",
  "NIT Trichy",
  "NIT Surathkal",
  "BITS Pilani",
  "IIIT Hyderabad",
  "Anna University",
  "VTU",
  "Mumbai University",
  "Delhi University",
  "VIT Vellore",
  "Jadavpur University",
  "NSUT Delhi",
] as const;

export type College = (typeof COLLEGES)[number];

export const COURSES = [
  "B.Tech CSE",
  "B.Tech ECE",
  "B.Tech Mechanical",
  "B.Com",
  "B.A. Economics",
] as const;

export type Course = (typeof COURSES)[number];
