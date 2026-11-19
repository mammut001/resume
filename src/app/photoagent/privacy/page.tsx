import type { Metadata } from "next";
import Link from "next/link";
import { RESUME_DATA } from "@/data/resume-data";

const EFFECTIVE_DATE = "2026-11-19";

export const metadata: Metadata = {
  title: "PhotoAgent Privacy Policy",
  description:
    "Privacy policy for PhotoAgent for iPhone: on-device photo search and cleanup with no account, no server, and no data collection.",
  alternates: {
    canonical: "/photoagent/privacy",
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

export default function PhotoAgentPrivacyPage() {
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
            PhotoAgent Privacy Policy
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            PhotoAgent is an iPhone app that finds photos from a typed or spoken
            request and helps delete the ones you confirm. There is no account,
            no developer server, and no analytics, advertising or tracking SDKs.
            The developer receives no data from the app.
          </p>
        </header>

        <Section title="Photos and On-Device Analysis">
          <List
            items={[
              "Photos are read on your device with your permission.",
              "Thumbnails and analysis run on your device using Apple Vision and, where available, Apple Intelligence's on-device model.",
              "Photo content, thumbnails and analysis results are never uploaded.",
              'Analysis results (labels such as "screenshot" or "cat", short descriptions, and search vectors) are stored only in the app\'s own storage on your device. You can delete them in Settings, and they are removed when the app is deleted.',
            ]}
          />
        </Section>

        <Section title="Deletion">
          <List
            items={[
              "PhotoAgent deletes only the photos you select and confirm twice (once in the app and once in the iOS system prompt).",
              "Deleted photos go to Recently Deleted in the Photos app.",
            ]}
          />
        </Section>

        <Section title="Voice">
          <List
            items={[
              "The microphone is used only while you tap the microphone button.",
              "Speech is turned into text on your device with Apple's on-device dictation model. Audio is not recorded, saved or sent.",
              "The first use of a language may download Apple's speech model, which carries no audio.",
            ]}
          />
        </Section>

        <Section title="Apple Maps (Optional)">
          <List
            items={[
              "To find a place named in a request that is not in the built-in lists, only the typed place name (no photos, no location) is sent to Apple Maps. You can turn this off in Settings.",
              'A second, off-by-default setting "Name photo places with Apple Maps" (Chinese UI name: 用 Apple 地图识别照片地点) sends the coordinates of photo locations (never photos) to Apple Maps to get addresses. Turning it off deletes the saved addresses.',
              <>
                {"Apple's handling of these requests is covered by "}
                <a
                  className="font-medium text-foreground underline underline-offset-4"
                  href="https://www.apple.com/legal/privacy/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {"Apple's Privacy Policy"}
                </a>
                .
              </>,
            ]}
          />
        </Section>

        <Section title="iCloud Photos">
          <p>
            When you open a single photo full screen, the Photos framework may
            download a display copy from your own iCloud Photos, just as the
            Photos app does.
          </p>
        </Section>

        <Section title="Children">
          <p>
            PhotoAgent does not collect any data from anyone, including
            children.
          </p>
        </Section>

        <Section title="Changes">
          <p>
            Changes to this policy are posted on this page with an updated
            effective date.
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
            . For common questions, visit{" "}
            <Link
              className="font-medium text-foreground underline underline-offset-4"
              href="/photoagent/support"
            >
              PhotoAgent Support
            </Link>
            .
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
            PhotoAgent 隐私政策（中文）
          </h2>
          <p className="text-base text-muted-foreground">
            PhotoAgent 是一款 iPhone
            应用，可根据输入或语音请求查找照片，并协助删除经你确认的照片。应用没有账号，没有开发者服务器，不含任何统计分析、广告或追踪
            SDK。开发者不会从应用中接收任何数据。
          </p>
        </header>

        <Section title="照片与本地分析">
          <List
            items={[
              "应用在获得你的授权后，在设备本地读取照片。",
              "缩略图生成与照片分析均在设备本地运行（使用 Apple Vision，以及在受支持设备上使用 Apple Intelligence 本地模型）。",
              "照片内容、缩略图和分析结果绝不会上传。",
              "分析结果（如“截图”或“猫”等标签、简短描述和搜索向量）仅保存在设备上的应用本地存储中。你可以在“设置”中删除这些数据，卸载应用时它们也会被一并移除。",
            ]}
          />
        </Section>

        <Section title="删除照片">
          <List
            items={[
              "应用只会删除你本人选中并经过两次确认（先在应用内确认，再在系统弹窗中确认）的照片。",
              "被删除的照片会移入系统“照片”应用的“最近删除”相簿。",
            ]}
          />
        </Section>

        <Section title="语音输入">
          <List
            items={[
              "麦克风仅在你点击麦克风按钮时使用。",
              "语音通过 Apple 的设备端听写模型在本地转换为文字；音频不会被录音、保存或发送。",
              "首次使用某种语言时，系统可能会下载 Apple 的语音模型，该过程不会传输任何音频。",
            ]}
          />
        </Section>

        <Section title="Apple 地图（可选）">
          <List
            items={[
              "当需要查找请求中提及但不在内置列表中的地点时，应用只会将输入的地点名称（不含照片、不含位置信息）发送给 Apple 地图。你可以在“设置”中关闭此功能。",
              "另一项默认关闭的设置“用 Apple 地图识别照片地点”（英文名称：Name photo places with Apple Maps）会将照片地点的坐标（绝不包含照片）发送给 Apple 地图以获取地址；关闭该设置会删除已保存的地址。",
              <>
                Apple 对这些请求的处理适用{" "}
                <a
                  className="font-medium text-foreground underline underline-offset-4"
                  href="https://www.apple.com/legal/privacy/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Apple 隐私政策
                </a>
                。
              </>,
            ]}
          />
        </Section>

        <Section title="iCloud 照片">
          <p>
            当你全屏打开单张照片时，系统 Photos 框架可能会像系统“照片”应用一样，从你自己的
            iCloud 照片图库下载用于显示的副本。
          </p>
        </Section>

        <Section title="儿童隐私">
          <p>PhotoAgent 不收集包括儿童在内的任何人的任何数据。</p>
        </Section>

        <Section title="政策变更">
          <p>本政策的变更将发布在此页面，并更新生效日期。</p>
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
            ，或访问{" "}
            <Link
              className="font-medium text-foreground underline underline-offset-4"
              href="/photoagent/support"
            >
              PhotoAgent 支持页面
            </Link>
            。
          </p>
        </Section>
      </article>
    </main>
  );
}
