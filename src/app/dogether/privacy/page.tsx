import type { Metadata } from "next";
import { AppDocPage, Section, TextLink } from "@/components/app-docs";

const UPDATED_DATE = "2026-11-21";

export const metadata: Metadata = {
  title: "Dogether Privacy Policy",
  description:
    "Privacy policy for Dogether for iPhone and iPad: local-first shared plans that sync through your own iCloud, with no account and no developer server.",
  alternates: {
    canonical: "/dogether/privacy",
  },
};

export default function DogetherPrivacyPage() {
  return (
    <AppDocPage
      date={UPDATED_DATE}
      dateLabel="Last updated"
      zhDateLabel="最近更新"
      title="Dogether Privacy Policy"
      intro="Dogether is a local-first app for shared plans and tasks on iPhone and iPad. It works offline and syncs through iCloud when you invite someone. There is no Dogether account and no developer server."
      zhTitle="Dogether 隐私政策（中文）"
      zhIntro="Dogether 是一款本地优先的共享计划与任务应用，支持 iPhone 和 iPad。离线可用，邀请别人时通过 iCloud 同步。没有 Dogether 账号，也没有开发者服务器。"
      zhChildren={
        <>
          <Section title="适用范围">
            <p>
              本政策说明 Dogether 的 iOS / iPadOS App 以及这些网页。Dogether
              没有自己的账号系统，也没有内容服务器。
            </p>
          </Section>

          <Section title="留在你设备上的内容">
            <p>
              计划、任务、备注、分配、动态和显示名称保存在你的设备上。使用
              iCloud 时，它们也在你的私人 CloudKit
              数据库里。分享某份计划后，被邀请的人可以通过 Apple 的共享 iCloud
              看到这份计划的任务、显示名称和动态。Dogether
              不会在开发者服务器上收到一份副本。
            </p>
          </Section>

          <Section title="主屏幕和锁定屏幕小组件">
            <p>
              小组件读取本机 App Group
              快照，其中可能包含计划标题、时间、进度、协作者名称、未完成任务标题，以及指派给你的任务和指派人。“我的空间”中的日常事项只保存在你的设备上，也会出现在小组件（包括锁定屏幕小组件）中。
            </p>
          </Section>

          <Section title="购买">
            <p>
              Apple 通过 StoreKit 处理购买。Dogether
              验证购买权益并在本机缓存解锁状态。App 不会收到支付卡信息。
            </p>
          </Section>

          <Section title="我们不收集的内容">
            <p>
              App 不含分析、广告或追踪 SDK，也不要求创建 Dogether
              账号。我们不出售个人信息。
            </p>
          </Section>

          <Section title="通知">
            <p>
              App
              启动时不会请求通知权限。设置截止日期或为“我的空间”中的日常事项设置提醒之后，才会提供可选的提醒。共享计划可以选全部动态、只看与我相关、只看重要，或静音。通知由
              Apple 送达。Dogether 没有一台会读取你的计划再推送的服务器。
            </p>
          </Section>

          <Section title="你可以做什么">
            <p>
              删除自己拥有的计划会请求移除本机内容及对应 CloudKit
              区域。共享协作者和 Apple 的保留策略可能影响剩余副本。卸载 App
              不一定会删除 iCloud 中的数据。
            </p>
          </Section>

          <Section title="这些网页">
            <p>
              这些页面托管在 cv.paytonpei.top，不要求登录。网站使用 Vercel Web
              Analytics 统计页面访问量，不设置 Cookie。
            </p>
          </Section>

          <Section title="联系">
            <p>
              关于本政策的问题，请看{" "}
              <TextLink href="/dogether/support">支持页面</TextLink>。
            </p>
          </Section>
        </>
      }
    >
      <Section title="Who This Covers">
        <p>
          This policy describes the Dogether iOS and iPadOS app and these web
          pages. Dogether does not operate its own account system or content
          server.
        </p>
      </Section>

      <Section title="What Stays on Your Devices">
        <p>
          Plans, tasks, notes, assignments, activity, and your display name are
          stored on your device. When you use iCloud, they also live in your
          private CloudKit database. When you share a plan, that plan&apos;s
          tasks, display names, and activity are visible to the people you
          invite through Apple&apos;s shared iCloud database. Dogether does not
          receive a copy of that content on a developer server.
        </p>
      </Section>

      <Section title="Home Screen and Lock Screen Widgets">
        <p>
          Widgets read a local App Group snapshot on your device that can
          include plan titles, schedules, progress, collaborator names, open
          task titles, and tasks assigned to you with who assigned them. My
          Space routines stay on your device and also appear in widgets,
          including the Lock Screen widgets.
        </p>
      </Section>

      <Section title="Purchases">
        <p>
          Apple processes purchases through StoreKit. Dogether verifies
          entitlements and caches the unlock state locally. The app does not
          receive payment card details.
        </p>
      </Section>

      <Section title="What We Do Not Collect">
        <p>
          The app does not include analytics, advertising, or tracking SDKs. It
          does not ask you to create a Dogether account. We do not sell personal
          information.
        </p>
      </Section>

      <Section title="Notifications">
        <p>
          The app does not ask for notification permission at launch. Optional
          reminders are offered after you set a due date or turn on a reminder
          for a My Space routine. For shared
          plans you can choose All activity, Relevant only, Important only, or
          Muted. Apple delivers those notifications. Dogether does not run a
          server that reads your plans in order to push them.
        </p>
      </Section>

      <Section title="Your Choices">
        <p>
          Deleting a plan you own requests its removal from this device and from
          its CloudKit zone. Shared collaborators and Apple retention may affect
          remaining copies. Uninstalling the app does not necessarily delete
          your iCloud data.
        </p>
      </Section>

      <Section title="These Web Pages">
        <p>
          These pages are hosted on cv.paytonpei.top and do not ask you to sign
          in. The site uses Vercel Web Analytics to count page visits, without
          cookies.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about this policy: use the{" "}
          <TextLink href="/dogether/support">Support page</TextLink>.
        </p>
      </Section>
    </AppDocPage>
  );
}
