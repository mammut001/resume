import { cn } from "@/lib/utils";
import React from "react";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {}

export function Section({ className, ...props }: SectionProps) {
  return (
    <section
      className={cn("flex min-h-0 scroll-mt-20 flex-col gap-y-3", className)}
      {...props}
    />
  );
}

export function SectionHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "border-b pb-2 text-xl font-bold tracking-tight md:text-2xl print:text-lg",
        className,
      )}
      {...props}
    />
  );
}
