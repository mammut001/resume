import type { Metadata } from "next";
import { TextLink } from "@/components/app-docs";
import { RESUME_DATA } from "@/data/resume-data";

export const metadata: Metadata = {
  title: "Apps",
  description: `Privacy policies and support pages for the apps by ${RESUME_DATA.name}: PhotoAgent, LifeMint, Dogether and Kanjo.`,
  alternates: {
    canonical: "/apps",
  },
};

const APPS: {
  name: string;
  summary: string;
  privacy: string;
  support?: string;
}[] = [
  {
    name: "PhotoAgent",
    summary: "On-device photo search and cleanup for iPhone. 照片搜索与整理。",
    privacy: "/photoagent/privacy",
    support: "/photoagent/support",
  },
  {
    name: "LifeMint",
    summary:
      "Tips, shifts and pay tracker for iPhone and Apple Watch. 小费、排班与工资记录。",
    privacy: "/lifemint/privacy",
    support: "/lifemint/support",
  },
  {
    name: "Dogether",
    summary:
      "Local-first shared plans for iPhone and iPad. 本地优先的共享计划。",
    privacy: "/dogether/privacy",
    support: "/dogether/support",
  },
  {
    name: "Kanjo",
    summary: "AI coding cost ledger for iPhone and Mac. AI 编码成本账本。",
    privacy: "/kanjo/privacy",
  },
];

export default function AppsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[720px] bg-background px-4 py-8 font-sans text-foreground antialiased sm:px-6 sm:py-12">
      <header className="space-y-3 border-b border-border/60 pb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">Apps</h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          Privacy policies and support pages for my apps.
          应用的隐私政策与支持页面。
        </p>
      </header>

      <ul className="mt-8 space-y-6">
        {APPS.map((app) => (
          <li key={app.name} className="space-y-1">
            <h2 className="text-lg font-semibold tracking-tight">{app.name}</h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              {app.summary}
            </p>
            <p className="text-sm text-muted-foreground sm:text-base">
              <TextLink href={app.privacy}>Privacy Policy · 隐私政策</TextLink>
              {app.support ? (
                <>
                  {" · "}
                  <TextLink href={app.support}>Support · 支持</TextLink>
                </>
              ) : null}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-12 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:text-sm">
        <TextLink href="/">Résumé</TextLink>
      </p>
    </main>
  );
}
