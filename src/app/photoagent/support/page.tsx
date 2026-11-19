import type { Metadata } from "next";
import Link from "next/link";
import { RESUME_DATA } from "@/data/resume-data";

const EFFECTIVE_DATE = "2026-11-19";

export const metadata: Metadata = {
  title: "PhotoAgent Support",
  description:
    "Support, FAQ and contact information for PhotoAgent for iPhone.",
  alternates: {
    canonical: "/photoagent/support",
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

export default function PhotoAgentSupportPage() {
  const email = RESUME_DATA.contact.email;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[720px] bg-background px-4 py-8 font-sans text-foreground antialiased sm:px-6 sm:py-12">
      <article id="en" lang="en" className="space-y-8">
        <header className="space-y-3 border-b border-border/60 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground sm:text-sm">
            <p>
              Effective <time dateTime={EFFECTIVE_DATE}>{EFFECTIVE_DATE}</time>
            </p>
            <nav aria-label="Language">
              <a
                href="#en"
                className="font-medium text-foreground underline underline-offset-4"
              >
                English
              </a>
              {" · "}
              <a
                href="#zh"
                className="font-medium text-foreground underline underline-offset-4"
              >
                中文
              </a>
            </nav>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
            PhotoAgent Support
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            PhotoAgent is an iPhone app that finds photos from a typed or spoken
            request and helps delete the ones you confirm, with all photo
            analysis running on your device.
          </p>
        </header>

        <Section title="Contact">
          <p>
            For questions, bug reports or feedback, email{" "}
            <a
              className="font-medium text-foreground underline underline-offset-4"
              href={`mailto:${email}`}
            >
              {email}
            </a>
            .
          </p>
        </Section>

        <Section title="Frequently Asked Questions">
          <List
            items={[
              <>
                <strong className="font-medium text-foreground">
                  Does PhotoAgent upload my photos?
                </strong>{" "}
                No. Photo content, thumbnails and analysis results stay on your
                device and are never uploaded.
              </>,
              <>
                <strong className="font-medium text-foreground">
                  Can I undo a deletion?
                </strong>{" "}
                Yes. Deleted photos move to Recently Deleted in the Photos app,
                where you can recover them for up to 30 days.
              </>,
              <>
                <strong className="font-medium text-foreground">
                  Why does it need full photo access?
                </strong>{" "}
                Full access lets PhotoAgent search your whole photo library.
                Limited access also works, using only the photos you select.
              </>,
              <>
                <strong className="font-medium text-foreground">
                  Why are some photos not matched yet?
                </strong>{" "}
                On-device analysis is still running. It continues while the app
                is open, and in the background while your iPhone charges.
              </>,
            ]}
          />
        </Section>

        <Section title="Privacy">
          <p>
            Read the{" "}
            <Link
              className="font-medium text-foreground underline underline-offset-4"
              href="/photoagent/privacy"
            >
              PhotoAgent Privacy Policy
            </Link>{" "}
            for details on how PhotoAgent handles data on your device.
          </p>
        </Section>
      </article>

      <article
        id="zh"
        lang="zh-Hans"
        className="mt-12 space-y-8 border-t border-border/60 pt-12"
      >
        <header className="space-y-3">
          <p className="text-xs text-muted-foreground sm:text-sm">
            生效日期 <time dateTime={EFFECTIVE_DATE}>{EFFECTIVE_DATE}</time>
          </p>
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            PhotoAgent 支持（中文）
          </h2>
          <p className="text-base text-muted-foreground">
            PhotoAgent 是一款 iPhone
            应用，可根据输入或语音请求查找照片，并协助删除经你确认的照片，所有照片分析均在设备本地完成。
          </p>
        </header>

        <Section title="联系方式">
          <p>
            如有问题、反馈或错误报告，请发邮件至{" "}
            <a
              className="font-medium text-foreground underline underline-offset-4"
              href={`mailto:${email}`}
            >
              {email}
            </a>
            。
          </p>
        </Section>

        <Section title="常见问题">
          <List
            items={[
              <>
                <strong className="font-medium text-foreground">
                  PhotoAgent 会上传我的照片吗？
                </strong>{" "}
                不会。照片内容、缩略图和分析结果都保留在你的设备上，绝不会上传。
              </>,
              <>
                <strong className="font-medium text-foreground">
                  删除后可以撤销吗？
                </strong>{" "}
                可以。被删除的照片会移入系统“照片”应用的“最近删除”相簿，在 30
                天内可以恢复。
              </>,
              <>
                <strong className="font-medium text-foreground">
                  为什么需要完整照片访问权限？
                </strong>{" "}
                完整访问权限用于搜索整个照片图库；受限访问同样可用，应用只会在你所选的照片中搜索。
              </>,
              <>
                <strong className="font-medium text-foreground">
                  为什么有些照片还没有被匹配到？
                </strong>{" "}
                本地分析仍在进行中。分析会在应用打开期间继续运行，也会在 iPhone
                充电时于后台继续进行。
              </>,
            ]}
          />
        </Section>

        <Section title="隐私政策">
          <p>
            请查看{" "}
            <Link
              className="font-medium text-foreground underline underline-offset-4"
              href="/photoagent/privacy"
            >
              PhotoAgent 隐私政策
            </Link>{" "}
            了解应用如何在设备本地处理数据。
          </p>
        </Section>
      </article>
    </main>
  );
}
