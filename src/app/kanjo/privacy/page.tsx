import type { Metadata } from "next";
import { RESUME_DATA } from "@/data/resume-data";

const EFFECTIVE_DATE = "2026-11-09";

export const metadata: Metadata = {
  title: "Kanjo Privacy Policy",
  description:
    "Privacy policy for Kanjo for iPhone and Kanjo for Mac: no account, no server, no data collection.",
  alternates: {
    canonical: "/kanjo/privacy",
  },
};

function Section({
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

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default function KanjoPrivacyPage() {
  const email = RESUME_DATA.contact.email;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[720px] bg-background px-4 py-8 font-sans text-foreground antialiased sm:px-6 sm:py-12">
      <article lang="en" className="space-y-8">
        <header className="space-y-3 border-b border-border/60 pb-8">
          <p className="text-xs text-muted-foreground sm:text-sm">
            Effective <time dateTime={EFFECTIVE_DATE}>{EFFECTIVE_DATE}</time>
          </p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
            Kanjo Privacy Policy
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Kanjo for iPhone and Kanjo for Mac do not collect any data. There is
            no account, no server operated by the developer, no analytics and no
            advertising.
          </p>
        </header>

        <Section title="Kanjo for iPhone">
          <List
            items={[
              "The app reads a usage snapshot from your own iCloud private database (CloudKit). That snapshot is written by Kanjo for Mac on a Mac signed in to the same Apple ID. The developer cannot access your iCloud private database.",
              "The snapshot contains usage totals: costs, token counts, session counts, dates, and the names of your projects, AI tools and models. It does not contain conversation text.",
              "Data stored in iCloud is handled by Apple under Apple's privacy policy. Settings such as your language choice are stored only on your device.",
              "The app contains no analytics, crash reporting or advertising SDKs, and does not track you across apps or websites.",
            ]}
          />
        </Section>

        <Section title="Kanjo for Mac">
          <List
            items={[
              "Kanjo reads the log files that AI coding tools (such as Claude Code, Codex CLI and Antigravity) keep on your Mac, and computes usage from token counts, file paths and timestamps. It never stores conversation text.",
              "To show subscription quotas, Kanjo can request your usage directly from the provider of each tool (for example Anthropic, OpenAI or xAI), using the sign-in credentials those tools already keep on your Mac. Credentials are held in memory only and are sent only to that provider. This can be turned off with no_network = true in the configuration or the KANJO_NO_NETWORK=1 environment variable.",
              "iCloud sync is optional and off by default. When you turn it on, Kanjo uploads a usage snapshot to your own iCloud private database so Kanjo for iPhone can read it. You can choose to replace project names with generic labels.",
              "Publishing to a website is optional and off by default. When you turn it on, Kanjo commits an aggregate summary (totals by month, week, provider, tool and model, with no project names or paths) to a git repository that you choose, using your own git credentials.",
            ]}
          />
        </Section>

        <Section title="Children">
          <p>
            Kanjo is a developer tool and is not directed to children. It does
            not knowingly collect information from anyone, including children.
          </p>
        </Section>

        <Section title="Changes">
          <p>
            If this policy changes, the new version will be posted on this page
            with a new effective date.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this policy:{" "}
            <a
              className="font-medium text-foreground underline underline-offset-4"
              href={`mailto:${email}`}
            >
              {email}
            </a>
            , or open an issue at{" "}
            <a
              className="font-medium text-foreground underline underline-offset-4"
              href="https://github.com/mammut001/kanjo/issues"
              rel="noopener noreferrer"
              target="_blank"
            >
              github.com/mammut001/kanjo
            </a>
            .
          </p>
        </Section>
      </article>

      <article
        lang="zh-CN"
        className="mt-12 space-y-8 border-t border-border/60 pt-12"
      >
        <header className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Kanjo 隐私政策（中文）
          </h2>
          <p className="text-base text-muted-foreground">
            Kanjo iPhone 版和 Mac 版不收集任何数据：没有账号，开发者不运营任何服务器，没有统计分析，也没有广告。
          </p>
        </header>

        <Section title="iPhone 版">
          <List
            items={[
              "App 从你自己的 iCloud 私有数据库（CloudKit）读取用量快照。快照由登录同一 Apple ID 的 Mac 上的 Kanjo 写入，开发者无法访问你的 iCloud 私有数据库。",
              "快照包含用量汇总：费用、token 数、会话数、日期，以及项目、AI 工具和模型的名称，不包含任何对话内容。",
              "存放在 iCloud 中的数据由 Apple 按其隐私政策处理。语言等设置只保存在你的设备上。",
              "App 不含任何统计、崩溃上报或广告 SDK，也不会跨 App 或网站追踪你。",
            ]}
          />
        </Section>

        <Section title="Mac 版">
          <List
            items={[
              "Kanjo 读取 AI 编程工具（如 Claude Code、Codex CLI、Antigravity）保存在你 Mac 上的日志，只根据 token 数、文件路径和时间戳计算用量，从不保存对话内容。",
              "为了显示订阅额度，Kanjo 可以使用这些工具已保存在你 Mac 上的登录凭据，直接向对应的服务商（如 Anthropic、OpenAI、xAI）查询用量。凭据只保存在内存中，只发送给对应的服务商。可以在配置中设置 no_network = true 或使用环境变量 KANJO_NO_NETWORK=1 关闭。",
              "iCloud 同步是可选功能，默认关闭。开启后，Kanjo 会把用量快照上传到你自己的 iCloud 私有数据库，供 iPhone 版读取；你可以选择把项目名替换为通用名称。",
              "发布到网站是可选功能，默认关闭。开启后，Kanjo 会用你自己的 git 凭据，把汇总数据（按月、周、服务商、工具和模型的合计，不含项目名和路径）提交到你指定的 git 仓库。",
            ]}
          />
        </Section>

        <Section title="联系方式">
          <p>
            对本政策有疑问，请发邮件至{" "}
            <a
              className="font-medium text-foreground underline underline-offset-4"
              href={`mailto:${email}`}
            >
              {email}
            </a>
            ，或在{" "}
            <a
              className="font-medium text-foreground underline underline-offset-4"
              href="https://github.com/mammut001/kanjo/issues"
              rel="noopener noreferrer"
              target="_blank"
            >
              github.com/mammut001/kanjo
            </a>{" "}
            提交 issue。
          </p>
        </Section>
      </article>
    </main>
  );
}
