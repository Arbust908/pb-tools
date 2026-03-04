"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils/cn";

export const selectVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm placeholder:text-slate-500 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-slate-950 dark:focus:ring-zinc-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
  {
    variants: {
      variant: {
        default: "border-slate-300 bg-white text-slate-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100",
        outline: "border-2 border-slate-300 bg-transparent dark:border-zinc-700",
        secondary: "bg-slate-100 border-transparent text-slate-900 dark:bg-zinc-800 dark:text-zinc-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <select
        className={cn(selectVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = "Select";

export const SelectTrigger = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <select
        className={cn(selectVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  },
);

SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("relative", className)}>{children}</div>;
};

export const SelectItem = ({
  children,
  className,
  ...props
}: React.OptionHTMLAttributes<HTMLOptionElement>) => {
  return (
    <option
      className={cn("py-2 px-4 hover:bg-slate-100", className)}
      {...props}
    >
      {children}
    </option>
  );
};

SelectContent.displayName = "SelectContent";
SelectItem.displayName = "SelectItem";
