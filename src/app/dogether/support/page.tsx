import type { Metadata } from "next";
import { RESUME_DATA } from "@/data/resume-data";
import {
  AppDocPage,
  ExternalLink,
  List,
  MailLink,
  Question,
  Section,
  TextLink,
} from "@/components/app-docs";

const issuesUrl = "https://github.com/mammut001/dogether/issues";

export const metadata: Metadata = {
  title: "Dogether Support",
  description:
    "Support for Dogether: sharing, sync, purchases and contact. Dogether is a local-first shared list with no account.",
  alternates: {
    canonical: "/dogether/support",
  },
};

export default function DogetherSupportPage() {
  const email = RESUME_DATA.contact.email;

  return (
    <AppDocPage
      title="Dogether Support"
      intro="Dogether is a local-first shared list. Most issues are about sharing or sync, not an account."
      zhTitle="Dogether 支持（中文）"
      zhIntro="Dogether 是本地优先的共享清单。常见问题在分享和同步，不在账号。"
      zhChildren={
        <>
          <Section title="常见问题">
            <List
              items={[
                <Question key="login" q="没有登录">
                  没有 Dogether 账号。分享使用设备上已经登录的 Apple ID /
                  iCloud。
                </Question>,
                <Question key="share" q="分享没收到">
                  双方都需要安装 Dogether 并登录
                  iCloud。在要加入计划的那台设备上打开邀请。
                </Question>,
                <Question key="offline" q="离线">
                  没有网络也可以继续改。设备再次连上 iCloud 后会同步。
                </Question>,
                <Question key="purchase" q="购买与恢复">
                  三份已保存计划免费，归档计划也计入额度。无限计划为一次性购买。使用购买时的
                  Apple ID，在设置或购买页面选择恢复购买。价格暂不可用时，检查
                  App Store 价格只会重新加载价格，不会发起购买。
                </Question>,
                <Question key="privacy" q="隐私问题">
                  请阅读 <TextLink href="/dogether/privacy">隐私政策</TextLink>
                  。App 内的隐私说明也可在设置中查看。
                </Question>,
              ]}
            />
          </Section>

          <Section title="联系">
            <p>
              产品问题或错误报告请发邮件至 <MailLink email={email} />
              ，也可以通过开发者 GitHub 仓库的 Issues 提交：
              <ExternalLink href={issuesUrl}>
                通过 GitHub Issues 联系
              </ExternalLink>
              。
            </p>
          </Section>
        </>
      }
    >
      <Section title="Frequently Asked Questions">
        <List
          items={[
            <Question key="login" q="No login.">
              There is no Dogether account. Sharing uses the Apple ID already
              signed into iCloud on the device.
            </Question>,
            <Question key="share" q="A share did not arrive.">
              Both people need Dogether installed and iCloud signed in. Open the
              invitation on the device that should join the plan.
            </Question>,
            <Question key="offline" q="Offline.">
              You can keep editing without a network. Changes sync when that
              device can reach iCloud again.
            </Question>,
            <Question key="purchase" q="Purchases and restoration.">
              Three saved plans are free, including archived plans. Unlimited
              plans is a one-time purchase. Restore purchases from Settings or
              the purchase screen using the Apple ID that bought it. If the
              price is unavailable, Check App Store price retries without making
              a purchase.
            </Question>,
            <Question key="privacy" q="Privacy questions.">
              Read the{" "}
              <TextLink href="/dogether/privacy">Privacy Policy</TextLink>. The
              in-app privacy notice is also available in Settings.
            </Question>,
          ]}
        />
      </Section>

      <Section title="Contact">
        <p>
          For product questions or bug reports, email <MailLink email={email} />
          , or open an issue in the developer&apos;s GitHub repository:{" "}
          <ExternalLink href={issuesUrl}>
            Contact via GitHub Issues
          </ExternalLink>
          .
        </p>
      </Section>
    </AppDocPage>
  );
}
