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
  title: "LifeMint Support",
  description:
    "Support, FAQ and contact information for LifeMint for iPhone and Apple Watch.",
  alternates: {
    canonical: "/lifemint/support",
  },
};

export default function LifeMintSupportPage() {
  const email = RESUME_DATA.contact.email;

  return (
    <AppDocPage
      date={EFFECTIVE_DATE}
      title="LifeMint Support"
      intro="LifeMint is an iPhone and Apple Watch app for servers and hourly workers: track tips, shifts and pay, plan paydays, bills and budgets, and log workouts and focus time. Everything stays on your device."
      zhTitle="LifeMint 支持（中文）"
      zhIntro="LifeMint 是一款面向服务员和小时工的 iPhone 和 Apple Watch 应用：记录小费、排班和工资，规划发薪日、账单和预算，并记录训练和专注时间。所有数据都保留在你的设备上。"
      zhChildren={
        <>
          <Section title="联系方式">
            <p>
              如有问题、反馈或错误报告，请发邮件至 <MailLink email={email} />
              ，或在应用内点按“意见反馈”。
            </p>
          </Section>

          <Section title="常见问题">
            <List
              items={[
                <Question key="sync" q="我的数据会同步到 iCloud 吗？">
                  不会。LifeMint 不通过 iCloud
                  或任何服务器同步数据，数据只保存在这台 iPhone 上（Apple Watch
                  直接与 iPhone 同步）。如果你使用 iCloud 云备份或在电脑上备份
                  iPhone，数据会包含在你的设备备份中。
                </Question>,
                <Question key="move" q="如何把数据转移到新 iPhone？">
                  从设备备份恢复新 iPhone
                  即可。你也可以在“设置”的“数据管理”中使用“导出数据
                  (CSV)”，再在新设备上使用“导入数据 (CSV)”（导入为 Pro
                  功能）。CSV
                  包含工作记录、发薪日、小费、工资对账、排班、支出、固定账单、预算和训练记录，但不包含目标或应用设置，因此不是完整备份。
                </Question>,
                <Question key="delete" q="如何删除我的数据？">
                  在“设置”的“数据管理”中点按“重置所有数据”，可以只清除工作记录，或清除包括目标和设置在内的全部数据。此操作不可撤销。
                </Question>,
                <Question key="health" q="LifeMint 会读取 Apple 健康吗？">
                  只有在你于“设置”中连接“Apple 健康”后，LifeMint
                  才会读取已完成的体能训练并显示在训练记录中，不会写入任何数据。
                </Question>,
                <Question key="restore" q="如何恢复购买？">
                  LifeMint Pro 为一次性买断。打开 LifeMint Pro
                  购买页面，点按“恢复购买”，并使用购买时的 Apple 账户登录。
                </Question>,
              ]}
            />
          </Section>

          <Section title="隐私政策">
            <p>
              请查看{" "}
              <TextLink href="/lifemint/privacy">LifeMint 隐私政策</TextLink>{" "}
              了解应用如何在设备本地处理数据。
            </p>
          </Section>
        </>
      }
    >
      <Section title="Contact">
        <p>
          For questions, bug reports or feedback, email{" "}
          <MailLink email={email} />, or tap Send Feedback in the app.
        </p>
      </Section>

      <Section title="Frequently Asked Questions">
        <List
          items={[
            <Question key="sync" q="Does my data sync to iCloud?">
              No. LifeMint does not sync through iCloud or any server. Your data
              stays on this iPhone (the Apple Watch app syncs directly with it).
              It is included in your device backups if you use iCloud Backup or
              back up your iPhone to a computer.
            </Question>,
            <Question key="move" q="How do I move my data to a new iPhone?">
              Restore the new iPhone from a device backup. You can also use
              Export Data (CSV) in Settings, under Data Management, and Import
              Data (CSV) on the new device (import is a Pro feature). The CSV
              covers work sessions, paydays, tips, paycheck reconciliations,
              shifts, expenses, fixed bills, budgets and workouts. It does not
              include goals or app settings, so it is not a complete backup.
            </Question>,
            <Question key="delete" q="How do I delete my data?">
              In Settings, under Data Management, tap Reset All Data to clear
              your work records, or all data including goals and settings. This
              cannot be undone.
            </Question>,
            <Question key="health" q="Does LifeMint read Apple Health?">
              Only if you connect Apple Health in Settings. LifeMint then reads
              your completed workouts to show them in Train history, and writes
              nothing.
            </Question>,
            <Question key="restore" q="How do I restore a purchase?">
              LifeMint Pro is a one-time purchase. Open the LifeMint Pro screen
              and tap Restore Purchases while signed in with the Apple Account
              that made the purchase.
            </Question>,
          ]}
        />
      </Section>

      <Section title="Privacy">
        <p>
          Read the{" "}
          <TextLink href="/lifemint/privacy">LifeMint Privacy Policy</TextLink>{" "}
          for details on how LifeMint handles data on your device.
        </p>
      </Section>
    </AppDocPage>
  );
}
