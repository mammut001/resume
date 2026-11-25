import Link from "next/link";
import type React from "react";

// Shared building blocks for the app privacy and support pages
// (/photoagent, /lifemint, /dogether): an English article followed by a
// Chinese one, with the same section and list styles on every page.

const linkClassName =
  "font-medium text-foreground underline underline-offset-4";

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {children}
      </div>
    </section>
  );
}

export function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function Question({
  q,
  children,
}: {
  q: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <strong className="font-medium text-foreground">{q}</strong> {children}
    </>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className={linkClassName} href={href}>
      {children}
    </Link>
  );
}

export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className={linkClassName}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

export function MailLink({ email }: { email: string }) {
  return (
    <a className={linkClassName} href={`mailto:${email}`}>
      {email}
    </a>
  );
}

export function AppDocPage({
  date,
  dateLabel = "Effective",
  zhDateLabel = "生效日期",
  title,
  intro,
  zhTitle,
  zhIntro,
  children,
  zhChildren,
}: {
  date?: string;
  dateLabel?: string;
  zhDateLabel?: string;
  title: string;
  intro: React.ReactNode;
  zhTitle: string;
  zhIntro: React.ReactNode;
  children: React.ReactNode;
  zhChildren: React.ReactNode;
}) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[720px] bg-background px-4 py-8 font-sans text-foreground antialiased sm:px-6 sm:py-12">
      <article id="en" lang="en" className="space-y-8">
        <header className="space-y-3 border-b border-border/60 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground sm:text-sm">
            <p>
              {date ? (
                <>
                  {dateLabel} <time dateTime={date}>{date}</time>
                </>
              ) : null}
            </p>
            <nav aria-label="Language">
              <a href="#en" className={linkClassName}>
                English
              </a>
              {" · "}
              <a href="#zh" className={linkClassName}>
                中文
              </a>
            </nav>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">{intro}</p>
        </header>

        {children}
      </article>

      <article
        id="zh"
        lang="zh-Hans"
        className="mt-12 space-y-8 border-t border-border/60 pt-12"
      >
        <header className="space-y-3">
          {date ? (
            <p className="text-xs text-muted-foreground sm:text-sm">
              {zhDateLabel} <time dateTime={date}>{date}</time>
            </p>
          ) : null}
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            {zhTitle}
          </h2>
          <p className="text-base text-muted-foreground">{zhIntro}</p>
        </header>

        {zhChildren}
      </article>

      <p className="mt-12 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:text-sm">
        <Link className={linkClassName} href="/apps">
          All apps · 全部应用
        </Link>
      </p>
    </main>
  );
}
