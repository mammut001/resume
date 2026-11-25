import type { Metadata } from "next";
import {
  AppDocPage,
  ExternalLink,
  List,
  MailLink,
  Section,
  TextLink,
} from "@/components/app-docs";
import { RESUME_DATA } from "@/data/resume-data";

const EFFECTIVE_DATE = "2026-11-25";

export const metadata: Metadata = {
  title: "PhotoAgent Privacy Policy",
  description:
    "Privacy policy for PhotoAgent for iPhone: on-device photo search and cleanup with no account, no server, and no data collection.",
  alternates: {
    canonical: "/photoagent/privacy",
  },
};

const applePrivacyUrl = "https://www.apple.com/legal/privacy/";

export default function PhotoAgentPrivacyPage() {
  const email = RESUME_DATA.contact.email;

  return (
    <AppDocPage
      date={EFFECTIVE_DATE}
      title="PhotoAgent Privacy Policy"
      intro="PhotoAgent is an iPhone app that finds photos from a typed or spoken request and helps you delete, save to albums, favorite or hide the ones you confirm. There is no account, no developer server, and no analytics, advertising or tracking SDKs. The developer receives no data from the app."
      zhTitle="PhotoAgent 隐私政策（中文）"
      zhIntro="PhotoAgent 是一款 iPhone 应用，可根据输入或语音请求查找照片，并协助你删除、存入相簿、收藏或隐藏经你确认的照片。应用没有账号，没有开发者服务器，不含任何统计分析、广告或追踪 SDK。开发者不会从应用中接收任何数据。"
      zhChildren={
        <>
          <Section title="照片与本地分析">
            <List
              items={[
                "应用在获得你的授权后，在设备本地读取照片。",
                "缩略图生成与照片分析均在设备本地运行（使用 Apple Vision，以及在受支持设备上使用 Apple Intelligence 本地模型）。",
                "“画面理解”使用 SigLIP 图像模型（约 172 MB）。该模型以 Apple 托管资源包（Background Assets）的形式从 Apple 的服务器下载，下载过程不包含你的任何照片。照片的图像向量在设备上生成，并且只保存在设备上。",
                "为了能按照片描述搜索，PhotoAgent 可能会一次性下载 Apple 的英文或中文本机语言模型。下载来自 Apple，不包含你的任何照片或文字。",
                "只有开启了 Apple Intelligence 的 iPhone 才会生成照片描述；可在“设置”中关闭，关闭后会删除这些描述。",
                "照片内容、缩略图和分析结果绝不会上传。",
                "分析结果（如“截图”或“猫”等标签、简短描述和搜索向量）仅保存在设备上的应用本地存储中。你可以在“设置”中删除这些数据，卸载应用时它们也会被一并移除。",
              ]}
            />
          </Section>

          <Section title="对照片图库的修改">
            <List
              items={[
                "PhotoAgent 只会删除、存入相簿、收藏或取消收藏、隐藏你本人选中并确认的照片，并通过系统 Photos 框架完成这些操作。",
                "删除需要两次确认（先在应用内确认，再在系统弹窗中确认）。被删除的照片会移入系统“照片”应用的“最近删除”相簿。",
                "隐藏照片时系统会弹窗请你确认；被隐藏的照片会移入“照片”应用的“已隐藏”相簿，该相簿可能已被锁定。",
                "这些操作都不会把照片发送到设备之外。",
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

          <Section title="Apple 地图">
            <List
              items={[
                "“搜索你输入的地点”默认开启：当需要查找请求中提及但不在内置列表中的地点时，应用只会将输入的地点名称（不含照片、不含位置信息）发送给 Apple 地图。你可以在“设置”中关闭此功能。",
                "“显示街道和地标名称”默认开启：开启时，应用会把每个照片地点（约 200 米范围）的坐标发送给 Apple 地图以获取地址，与系统“照片”应用为地点命名的方式相同。照片及其内容绝不会被发送。你可以在“设置”中关闭此功能，关闭后会删除已保存的地址。",
                "“家”和“公司”的位置只在设备上根据照片推断，只保存在内存中，绝不会发送到任何地方。",
                <>
                  Apple 对这些请求的处理适用{" "}
                  <ExternalLink href={applePrivacyUrl}>
                    Apple 隐私政策
                  </ExternalLink>
                  。
                </>,
              ]}
            />
          </Section>

          <Section title="PhotoAgent Pro（App 内购买）">
            <List
              items={[
                "PhotoAgent 可免费下载。修改照片图库的操作（删除、存入相簿、收藏、隐藏）每天合计可免费处理 30 张照片。",
                "PhotoAgent Pro 提供按年订阅（含免费试用）和一次性买断两种方式。",
                "付款由 Apple 通过 App Store 处理，开发者不会收到任何付款信息或个人数据。",
                "Pro 权益由 StoreKit 在设备上验证；每天已用的免费次数只保存在设备上。",
                "你可以在 iOS“设置”中你的 Apple 账户下的“订阅”里管理或取消订阅。",
              ]}
            />
          </Section>

          <Section title="iCloud 照片">
            <p>
              当你全屏打开单张照片时，系统 Photos
              框架可能会像系统“照片”应用一样，从你自己的 iCloud
              照片图库下载用于显示的副本。
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
              对本政策有疑问，请发邮件至 <MailLink email={email} />
              ，或访问{" "}
              <TextLink href="/photoagent/support">
                PhotoAgent 支持页面
              </TextLink>
              。
            </p>
          </Section>
        </>
      }
    >
      <Section title="Photos and On-Device Analysis">
        <List
          items={[
            "Photos are read on your device with your permission.",
            "Thumbnails and analysis run on your device using Apple Vision and, where available, Apple Intelligence's on-device model.",
            '"Image understanding" uses the SigLIP image model (about 172 MB). It is downloaded from Apple\'s servers as an Apple-hosted asset pack (Background Assets), and the download carries none of your photos. Image embeddings of your photos are made and stored only on your device.',
            "To make photo descriptions searchable, PhotoAgent may download Apple's on-device language model for English or Chinese once. The download comes from Apple and carries none of your photos or text.",
            "Photo descriptions are written only on iPhones with Apple Intelligence turned on, and can be turned off in Settings, which deletes them.",
            "Photo content, thumbnails and analysis results are never uploaded.",
            'Analysis results (labels such as "screenshot" or "cat", short descriptions, and search vectors) are stored only in the app\'s own storage on your device. You can delete them in Settings, and they are removed when the app is deleted.',
          ]}
        />
      </Section>

      <Section title="Changes to Your Library">
        <List
          items={[
            "PhotoAgent deletes, saves to albums, favorites or unfavorites, and hides only the photos you pick and confirm, through Apple's Photos framework.",
            "Deleting needs two confirmations (once in the app and once in the iOS system prompt). Deleted photos go to Recently Deleted in the Photos app.",
            "Hiding asks for your confirmation in a system prompt. Hidden photos move to the Hidden album in the Photos app, which may be locked.",
            "None of these actions sends photos off your device.",
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

      <Section title="Apple Maps">
        <List
          items={[
            '"Search places you type" is on by default: to find a place named in a request that is not in the built-in lists, only the typed place name (no photos, no location) is sent to Apple Maps. You can turn this off in Settings.',
            '"Show street and landmark names" (Chinese UI name: 显示街道和地标名称) is on by default: while it is on, the coordinates of each photo spot (an area of about 200 m) are sent to Apple Maps to get an address, the way the Photos app names places. Photos and their content are never sent. You can turn it off in Settings, which deletes the saved addresses.',
            "Home and work are worked out on your device from your photos, kept in memory only, and never sent anywhere.",
            <>
              {"Apple's handling of these requests is covered by "}
              <ExternalLink href={applePrivacyUrl}>
                {"Apple's Privacy Policy"}
              </ExternalLink>
              .
            </>,
          ]}
        />
      </Section>

      <Section title="PhotoAgent Pro (In-App Purchases)">
        <List
          items={[
            "PhotoAgent is a free download. Actions that change your library (delete, save to album, favorite, hide) are free for 30 photos a day in total.",
            "PhotoAgent Pro is available as a yearly subscription with a free trial, or as a one-time lifetime purchase.",
            "Payments are handled by Apple through the App Store. The developer receives no payment details or personal data.",
            "Your Pro entitlement is checked on your device with StoreKit. The daily count of free actions is stored only on your device.",
            "You can manage or cancel a subscription in iOS Settings under your Apple Account, in Subscriptions.",
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
          PhotoAgent does not collect any data from anyone, including children.
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
          Questions about this policy: <MailLink email={email} />. For common
          questions, visit{" "}
          <TextLink href="/photoagent/support">PhotoAgent Support</TextLink>.
        </p>
      </Section>
    </AppDocPage>
  );
}
