import type { Metadata } from "next";
import {
  AppDocPage,
  List,
  MailLink,
  Question,
  Section,
  TextLink,
} from "@/components/app-docs";
import { RESUME_DATA } from "@/data/resume-data";

const EFFECTIVE_DATE = "2026-11-25";

export const metadata: Metadata = {
  title: "PhotoAgent Support",
  description:
    "Support, FAQ and contact information for PhotoAgent for iPhone.",
  alternates: {
    canonical: "/photoagent/support",
  },
};

export default function PhotoAgentSupportPage() {
  const email = RESUME_DATA.contact.email;

  return (
    <AppDocPage
      date={EFFECTIVE_DATE}
      title="PhotoAgent Support"
      intro="PhotoAgent is an iPhone app that finds photos from a typed or spoken request and helps you delete, save to albums, favorite or hide the ones you confirm, with all photo analysis running on your device."
      zhTitle="PhotoAgent 支持（中文）"
      zhIntro="PhotoAgent 是一款 iPhone 应用，可根据输入或语音请求查找照片，并协助你删除、存入相册、收藏或隐藏经你确认的照片，所有照片分析均在设备本地完成。"
      zhChildren={
        <>
          <Section title="联系方式">
            <p>
              如有问题、反馈或错误报告，请发邮件至 <MailLink email={email} />。
            </p>
          </Section>

          <Section title="常见问题">
            <List
              items={[
                <Question key="upload" q="PhotoAgent 会上传我的照片吗？">
                  不会。照片内容、缩略图和分析结果都保留在你的设备上，绝不会上传。
                </Question>,
                <Question key="undo" q="删除后可以撤销吗？">
                  可以。被删除的照片会移入系统“照片”应用的“最近删除”相簿，在 30
                  天内可以恢复。
                </Question>,
                <Question key="access" q="为什么需要完整照片访问权限？">
                  完整访问权限用于搜索整个照片图库；受限访问同样可用，应用只会在你所选的照片中搜索。
                </Question>,
                <Question key="pending" q="为什么有些照片还没有被匹配到？">
                  本地分析仍在进行中。分析会在应用打开期间继续运行，也会在
                  iPhone 充电时于后台继续进行。
                </Question>,
                <Question key="model" q="如何下载图像模型？">
                  在“设置”中保持“画面理解”开启。如果模型还没有下载，下方会出现“下载模型”按钮，点按即可（约
                  172 MB，来自 Apple
                  的服务器）。使用蜂窝网络或开启了“低数据模式”时，应用会先询问你。
                </Question>,
                <Question key="streets" q="如何关闭街道和地标名称？">
                  在“设置”中关闭“显示街道和地标名称”。关闭后不再向 Apple
                  地图发送照片地点的坐标，已保存的地址也会被删除。
                </Question>,
                <Question key="restore" q="如何恢复购买或管理订阅？">
                  在“设置”的 PhotoAgent Pro 部分点按“恢复购买”，并使用购买时的
                  Apple 账户登录。订阅可以在同一部分点按“管理订阅”，或在
                  iOS“设置”中你的 Apple 账户下的“订阅”里管理或取消。
                </Question>,
              ]}
            />
          </Section>

          <Section title="隐私政策">
            <p>
              请查看{" "}
              <TextLink href="/photoagent/privacy">
                PhotoAgent 隐私政策
              </TextLink>{" "}
              了解应用如何在设备本地处理数据。
            </p>
          </Section>
        </>
      }
    >
      <Section title="Contact">
        <p>
          For questions, bug reports or feedback, email{" "}
          <MailLink email={email} />.
        </p>
      </Section>

      <Section title="Frequently Asked Questions">
        <List
          items={[
            <Question key="upload" q="Does PhotoAgent upload my photos?">
              No. Photo content, thumbnails and analysis results stay on your
              device and are never uploaded.
            </Question>,
            <Question key="undo" q="Can I undo a deletion?">
              Yes. Deleted photos move to Recently Deleted in the Photos app,
              where you can recover them for up to 30 days.
            </Question>,
            <Question key="access" q="Why does it need full photo access?">
              Full access lets PhotoAgent search your whole photo library.
              Limited access also works, using only the photos you select.
            </Question>,
            <Question key="pending" q="Why are some photos not matched yet?">
              On-device analysis is still running. It continues while the app is
              open, and in the background while your iPhone charges.
            </Question>,
            <Question key="model" q="How do I download the image model?">
              In Settings, keep Image understanding on. If the model is not
              downloaded yet, a Download Model button appears under it: tap it
              (about 172 MB, from Apple&apos;s servers). On cellular or with Low
              Data Mode on, the app asks first.
            </Question>,
            <Question
              key="streets"
              q="How do I turn off street and landmark names?"
            >
              Turn off Show street and landmark names in Settings. Photo spot
              coordinates are then no longer sent to Apple Maps, and the saved
              addresses are deleted.
            </Question>,
            <Question
              key="restore"
              q="How do I restore a purchase or manage my subscription?"
            >
              In Settings, under PhotoAgent Pro, tap Restore Purchases while
              signed in with the Apple Account that made the purchase. Manage
              Subscription in the same section, or Subscriptions under your
              Apple Account in iOS Settings, lets you change or cancel it.
            </Question>,
          ]}
        />
      </Section>

      <Section title="Privacy">
        <p>
          Read the{" "}
          <TextLink href="/photoagent/privacy">
            PhotoAgent Privacy Policy
          </TextLink>{" "}
          for details on how PhotoAgent handles data on your device.
        </p>
      </Section>
    </AppDocPage>
  );
}
