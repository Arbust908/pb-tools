"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { ThemeToggle } from "../theme-toggle";

const TOOLS: { label: string; href: string }[] = [
  { label: "Dollar Stats", href: "/tools/dollar" },
  { label: "Salary Calculator", href: "/tools/salary-calculator" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-zinc-900 dark:bg-zinc-950 px-4 h-12 flex items-center justify-between gap-6">
      <Link href="/" className="font-semibold text-white shrink-0">
        pb-tools
      </Link>

      <ul className="flex items-center gap-1 flex-1">
        {TOOLS.map(({ label, href }) => {
          const active = pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm transition-colors",
                  active
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      <ThemeToggle />
    </nav>
  );
}
