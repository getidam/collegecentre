import React from "react";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <rect x="7" y="15" width="18" height="11" rx="2" fill="#f3efe6" />
      <path d="M7 16C7 12.2 11.2 10 16 10s9 2.2 9 6" fill="#fffaf3" />
      <rect x="7" y="14.6" width="18" height="2.4" fill="#ddd6c8" />
      <rect x="14.2" y="13.8" width="3.6" height="5.2" rx="1" fill="#2d4a3e" />
      <circle cx="16" cy="16.1" r="0.75" fill="#f3efe6" />
    </svg>
  );
}
