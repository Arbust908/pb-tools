import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export const Card = React.forwardRef<HTMLElement, CardProps>(
  ({ children, className, ...props }, ref) => {
    const baseStyles = "rounded-lg border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900";

    return (
      <article
        ref={ref}
        className={cn(baseStyles, className)}
        {...props}
      >
        {children}
      </article>
    );
  }
);

Card.displayName = "Card";