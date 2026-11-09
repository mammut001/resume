import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function PostsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-[720px] items-center justify-between gap-4 px-4 sm:px-6">
        <nav aria-label="Posts Navigation" className="flex items-center gap-2.5 text-sm">
          <Link
            href="/"
            className="font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Payton Pei
          </Link>
          <span className="text-border">/</span>
          <Link
            href="/posts"
            className="font-medium text-foreground transition-colors hover:text-foreground"
          >
            Posts
          </Link>
        </nav>
        <div className="flex items-center gap-1">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
