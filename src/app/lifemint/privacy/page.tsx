import type { Metadata } from "next";
import {
  AppDocPage,
  List,
  MailLink,
  Section,
  TextLink,
} from "@/components/app-docs";
import { RESUME_DATA } from "@/data/resume-data";

const EFFECTIVE_DATE = "2026-11-25";

export const metadata: Metadata = {
  title: "LifeMint Privacy Policy",
  description:
    "Privacy policy for LifeMint for iPhone and Apple Watch: your tips, shifts and pay stay on your device, with no account, no server, and no data collection.",
  alternates: {
    canonical: "/lifemint/privacy",
  },
};

export default function LifeMintPrivacyPage() {
  const email = RESUME_DATA.contact.email;

  return (
    <AppDocPage
      date={EFFECTIVE_DATE}
      title="LifeMint Privacy Policy"
      intro="LifeMint is an iPhone and Apple Watch app for tracking tips, shifts, pay, expenses, workouts and focus time. There is no account, no developer server, and no analytics, advertising or tracking SDKs. The developer does not collect any data from the app."
      zhTitle="LifeMint 隐私政策（中文）"
      zhIntro="LifeMint 是一款 iPhone 和 Apple Watch 应用，用于记录小费、排班、工资、支出、训练和专注时间。应用没有账号，没有开发者服务器，不含任何统计分析、广告或追踪 SDK。开发者不会从应用中收集任何数据。"
      zhChildren={
        <>
          <Section title="你的数据保存在哪里">
            <List
              items={[
                "你输入的内容（工作记录、排班、小费、发薪日、工资对账、支出、固定账单、预算、目标、训练记录和设置）只保存在设备上的应用本地存储中，即应用与其小组件和 Apple Watch 应用共享的 App Group。",
                "LifeMint 不通过 iCloud 或任何服务器同步数据，也不会把数据发送给开发者。",
                "与其他应用数据一样，如果你使用 iCloud 云备份或在电脑上备份 iPhone，这些数据会包含在你自己的设备备份中。",
              ]}
            />
          </Section>

          <Section title="Apple Watch、小组件与实时活动">
            <List
              items={[
                "Apple Watch 应用通过 Apple 的 WatchConnectivity 直接与你的 iPhone 交换计时和工作时段信息，不经过开发者的服务器。",
                "主屏幕小组件、手表复杂功能和实时活动只读取设备上的数据。",
              ]}
            />
          </Section>

          <Section title="Apple 健康（可选）">
            <List
              items={[
                "只有在你于“设置”中连接“Apple 健康”并授权后，LifeMint 才会读取你已完成的体能训练（类型、开始时间、时长和活动能量），用于显示在训练记录和每周总结中。",
                "LifeMint 只读取体能训练，不会向 Apple 健康写入任何数据。",
                "导入的训练只保存在设备上的 LifeMint 中。你可以随时在 iOS“设置”中撤销访问权限。",
              ]}
            />
          </Section>

          <Section title="通知">
            <p>
              排班、发薪日、账单、每周和每月回顾以及专注计时等提醒都是在设备上安排的本地通知。LifeMint
              没有推送服务器。
            </p>
          </Section>

          <Section title="购买">
            <List
              items={[
                "LifeMint Pro 为一次性买断；“支持 LifeMint”中的打赏是可选的 App 内购买。",
                "付款由 Apple 通过 App Store 处理，开发者不会收到任何付款信息或个人数据。",
                "购买权益由 StoreKit 在设备上验证。",
              ]}
            />
          </Section>

          <Section title="导出、分享与反馈">
            <List
              items={[
                "只有在你主动操作时，导出的 CSV 文件或每周分享卡片才会通过系统分享面板发送到你选择的地方。分享卡片上的二维码指向 LifeMint 的 App Store 页面。",
                "如果你点按“意见反馈”，系统“邮件”会打开一封写给开发者的草稿，其中包含应用版本、iOS 版本和设备类型。只有你本人发送后邮件才会发出，开发者只用它来回复你。",
              ]}
            />
          </Section>

          <Section title="删除数据">
            <p>
              在“设置”的“数据管理”中点按“重置所有数据”，可以清除工作记录，或清除包括目标和设置在内的全部数据。删除应用也会从设备上移除这些数据（你自己的设备备份除外）。
            </p>
          </Section>

          <Section title="儿童隐私">
            <p>LifeMint 不收集包括儿童在内的任何人的任何数据。</p>
          </Section>

          <Section title="政策变更">
            <p>本政策的变更将发布在此页面，并更新生效日期。</p>
          </Section>

          <Section title="联系方式">
            <p>
              对本政策有疑问，请发邮件至 <MailLink email={email} />
              ，或访问{" "}
              <TextLink href="/lifemint/support">LifeMint 支持页面</TextLink>。
            </p>
          </Section>
        </>
      }
    >
      <Section title="Where Your Data Is Stored">
        <List
          items={[
            "What you enter (work sessions, shifts, tips, paydays, paycheck reconciliations, expenses, fixed bills, budgets, goals, workouts and settings) is stored only in the app's own storage on your device: an App Group shared with its widgets and its Apple Watch app.",
            "LifeMint does not sync through iCloud or any server, and does not send your data to the developer.",
            "Like other app data, it is included in your own device backups if you use iCloud Backup or back up your iPhone to a computer.",
          ]}
        />
      </Section>

      <Section title="Apple Watch, Widgets and Live Activities">
        <List
          items={[
            "The Apple Watch app exchanges timer and session information directly with your iPhone through Apple's WatchConnectivity, without any developer server.",
            "Home Screen widgets, watch complications and Live Activities read data on your device only.",
          ]}
        />
      </Section>

      <Section title="Apple Health (Optional)">
        <List
          items={[
            "Only if you connect Apple Health in Settings and allow access, LifeMint reads your completed workouts (type, start time, duration and active energy) to show them in Train history and weekly summaries.",
            "LifeMint only reads workouts. It does not write anything to Apple Health.",
            "Imported workouts are kept only in LifeMint on your device. You can revoke access at any time in iOS Settings.",
          ]}
        />
      </Section>

      <Section title="Notifications">
        <p>
          Reminders for shifts, paydays, bills, weekly and monthly reviews and
          focus timers are local notifications scheduled on your device.
          LifeMint has no push server.
        </p>
      </Section>

      <Section title="Purchases">
        <List
          items={[
            "LifeMint Pro is a one-time purchase. Tips in Support LifeMint are optional in-app purchases.",
            "Payments are handled by Apple through the App Store. The developer receives no payment details or personal data.",
            "Your purchases are checked on your device with StoreKit.",
          ]}
        />
      </Section>

      <Section title="Export, Sharing and Feedback">
        <List
          items={[
            "A CSV export or a weekly share card leaves the app only when you choose to share it, through the iOS share sheet, to the place you pick. The QR code on the share card links to LifeMint's App Store page.",
            "If you tap Send Feedback, Mail opens a draft to the developer with the app version, iOS version and device type. Nothing is sent unless you send it, and the developer uses it only to reply to you.",
          ]}
        />
      </Section>

      <Section title="Deleting Your Data">
        <p>
          In Settings, under Data Management, Reset All Data clears your work
          records, or all data including goals and settings. Deleting the app
          also removes the data from your device (apart from your own device
          backups).
        </p>
      </Section>

      <Section title="Children">
        <p>
          LifeMint does not collect any data from anyone, including children.
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
          <TextLink href="/lifemint/support">LifeMint Support</TextLink>.
        </p>
      </Section>
    </AppDocPage>
  );
}
