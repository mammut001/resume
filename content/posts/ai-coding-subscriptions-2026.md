---
title: 562 亿 Token 实测：2026 年主流 AI 编程订阅到底值不值？
description: 用 5 个月 562 亿 tokens、按公开 API 折算 $13,437 的本地账单数据，逐家拆解 Claude Code、Google Antigravity、OpenAI Codex / Computer Use、Grok、StepFun Step 5、MiniMax、Cursor 等主流 AI 编程订阅的真实倍率、撞墙上限与各自短板（截至 2026 年 11 月）。
date: 2026-11-23
lang: zh-CN
cover: /posts/ai-coding-subscriptions-2026/cover.png
tags: [AI 编程, 订阅评测, Claude Code, Codex, Antigravity, Kanjo]
---

> 先说结论：截至 2026 年 11 月，对重度编程用户来说，订阅制相对按量 API 依然是巨大的套利窗口——我手头几家主力订阅，每花 **$1** 大多能换回 **$13 – $56** 的 API 等价用量，学生价的 Antigravity 甚至超过 **100 倍**。具体怎么买：**Claude Opus 5.5（Max 5x）** 是目前指哪打哪的最强规划大脑；**OpenAI ChatGPT Plus（$20）** 是性价比最容易被低估的一档，光 Codex CLI 就值回 20 倍，真正的杀手锏是目前独一档的 **Computer Use / Browser Use**；**Google Antigravity** 单独打主力一般，但拿来给 Claude 当写代码干杂活的 Subagent 极香；**Grok 4.7** 体验还行，但周额度太矮；国产里 **Step 5** 能力不错，但国内定价（¥99）竟然比国外同档（$9.99）贵了近一半，吃相实在难看。

这篇文章不靠"体感玄学"，全部基于我从 **2026 年 6 月 28 日到 11 月 21 日**（147 天）的本地真实用量账单，共 **562.18 亿 tokens**，按公开 API 单价折算约 **$13,437.44**，外加阶跃星辰控制台截至 **11 月 23 日**的实账截图数据。

## 先把口径、局限和利益相关说清楚

在看数字之前，先把边界摆在台面上：

1. **核心指标是"每 $1 订阅费换来多少 API 等价用量"**。不是"我实际花了 $13,437"，而是"如果把这些 token 按各家公开 API 价格结算，大概要付多少钱"——这和简历首页 [AI Usage](https://cv.paytonpei.top/#ai-usage) 的统计说明保持一致。
2. **样本只有我一个人，而且偏重度编程**。这 562.2 亿 tokens 里，**Cache Read 占了 96.68%**（543.5 亿），真正的 Input 是 12.9 亿、Output 是 2.45 亿。重度 Coding Agent 的账单大头就是超长上下文反复命中缓存，所以 API 折算价对各家缓存定价极度敏感。如果你只是偶尔网页聊天，这些倍数参考意义不大。
3. **只评价我真金白银付费用过（或实际深度白嫖过）的订阅**。像 Kimi Code 和智谱 GLM Coding Plan，我没付过费（本地只有不到 1 亿 token 的零散测试），就不装懂打分，放在文末附表里只列官方公开定价。
4. **时效与汇率**：所有价格、额度规则与实测数据均**截至 2026 年 11 月 23 日**。AI 订阅的定价和限额几乎按月在变，下单前请以各家官网为准。汇率按 2026 年 11 月均价估算：`1 USD ≈ 1.43 CAD ≈ 6.67 CNY`。
5. **利益相关披露**：文中的本地账单来自我自己开发的开源工具 [Kanjo](https://github.com/mammut001/kanjo)（macOS 菜单栏应用 + Python CLI，读取本机 Claude Code、Codex、Antigravity、Grok CLI、Pi 等日志按项目汇总成本，不保存任何对话内容）。它只覆盖本地 CLI 日志，**网页聊天、桌面端 Computer Use 和 Cursor IDE 内部消耗不会进入 Kanjo 账本**，遇到这些地方我会在下文单独注明。
6. **国内读者注意地区限制**：文中排名靠前的 Claude、Google Antigravity 和 OpenAI 官方都**不支持在中国大陆使用**，限制按使用地区，不按国籍。三家里 **Anthropic 管得最严**：除了地区限制，它从 2025 年 9 月起还禁止中资控股企业使用，风控也最敏感，IP、支付方式、手机号对不上都可能直接封号。

## 总账：5 个月 562 亿 Token，钱都烧在了哪里

先看四大主力 Agent 从 2026 年 7 月到 11 月的每周走势。这四家合计占了我总 token 的 **95.6%** 和总 API 等价金额的 **98.6%**。

![四大主力 Agent 每周 API 等价费用走势，2026-W27 至 W47](/posts/ai-coding-subscriptions-2026/weekly-cost.png)
*图 1：Kanjo 记录的四大主力 Agent 单周 API 等价费用。W43 那条几乎垂直的跳升，就是 Claude 从 Pro 升级到 Max 5x 的分界线。*

按月汇总更直观（注意 11 月本地账本只截至 11 月 21 日，共 21 天）：

| 月份 | 全站合计 | Claude Code | Antigravity CLI | Codex CLI | Grok CLI |
|---|---|---|---|---|---|
| 2026-07 | $755（4.16B） | — | $362（1.6B） | $328（2.1B） | — |
| 2026-08 | $633（2.88B） | — | $67（0.6B） | $292（1.8B） | $260（0.4B） |
| 2026-09 | $957（5.80B） | $139（0.4B） | $170（1.2B） | $317（3.1B） | $323（0.5B） |
| 2026-10 | **$4,702**（19.49B） | **$3,081**（9.1B） | **$782**（5.9B） | **$407**（3.3B） | **$424**（0.8B） |
| 2026-11（前 21 天） | **$6,388**（23.88B） | **$4,531**（15.3B） | **$1,116**（5.5B） | **$294**（1.5B） | **$348**（0.6B） |
| *11 月按 30 天推算* | *~$9,125* | *~$6,472* | *~$1,595* | *~$420* | *~$497* |

把实际订阅月费摆上来，就能算出这篇文章最核心的一张图——**每 $1 订阅费，到底换回了多少 API 等价用量**。

![每 $1 订阅费换来多少 API 等价用量（倍数）](/posts/ai-coding-subscriptions-2026/value-multiplier.png)
*图 2：各家按近期稳态月或实际账单周期折算的"每 $1 换回倍数"。Antigravity 同时标出了我的学生实付价与美区官方原价参照；StepFun 虚线部分是同额度国外版 $9.99/月 对应的倍数。*

汇总成一张主对照表，方便直接对照自己的档位：

| 订阅产品 | 我的档位与实付月费 | 统计周期内 API 等价用量 | 每 $1 换回倍数 | 官方限额机制 | 一句话结论 |
|---|---|---|---|---|---|
| **Claude Code** | 先 Pro（$20），W43 升 **Max 5x（$100/月）** | 近 4 周 W44–W47：**$5,574**（18.5B） | **55.7x**（11 月推算 ~65x） | 5 小时滚动窗口 + 周上限，与网页端共享池 | 指哪打哪的绝对主力，Plan 大脑首选 |
| **Google Antigravity** | **2×学生 Pro**，单号约 CA$7.5/月（合计 CA$15 ≈ **$10.5/月**） | 10 月 $782；11 月前 21 天 **$1,116**（5.5B） | 实付 **75x – 106x**（按原价 2×$19.99 约 **20x – 28x**） | 5 小时刷新 + 周上限 | 单打主力一般，当 Subagent 干杂活无敌 |
| **OpenAI（ChatGPT + Codex）** | **ChatGPT Plus（$20/月）** | 7–10 月均 $336；10 月 **$407**（仅含 Codex CLI） | **16.8x – 20.4x**（不含桌面 CU） | 5 小时滚动 + 周上限，Codex 与 ChatGPT 共享池 | 被账单低估的全能王，Computer Use 独一档 |
| **xAI Grok** | 原 SuperGrok / Premium 年付（$300/年 ≈ **$25/月**） | 8–10 月均 $336；10 月 **$424**（0.8B） | **13.4x – 17.0x** | 共享周额度池（Chat/CLI/Cursor 互通） | 模型还行，但周上限 1–2 亿 token 太卡脖子 |
| **阶跃星辰 Step 5** | 国内 Step Plan Flash Plus（**¥99/月 ≈ $14.84**） | 控制台 18 天用掉 97%（1,540M Credits）≈ **$267** | 国内 **18.0x**（同档国外 $9.99 为 **26.8x**） | 1,600M 月度 Credits + 5h/周限流 | 模型搭配 Pi 好用，但国内比国外贵近 49% |
| **MiniMax** | M2.5 年付 **¥29/月** + M3 年付 **¥49/月** | 2 月起累计约 **3B tokens**（多在 Kanjo 记账前） | 未入统一月倍率 | 套餐包月/包年额度 | 代码后期幻觉太重；语音模型反而是真香 |
| **Cursor** | 1 年免费学生 Pro + 叠加 Grok 订阅 | 未入 Kanjo CLI 账本 | 实付 $0（现官网 Premium $30/月） | 已并入 The X Subscription 周额度池 | 慢速跑 Composer 2.5 非常顺手 |
| **Command Code** | Go（**$1/月**，支持支付宝） | 累计 **$13.57**（0.82B，跑 Muse Spark 1.3） | **13.6x** | 低门槛 $1 尝鲜额度池 | 一美元支持支付宝，尝鲜给好评 |

*说明：各家统计周期长短不一（Claude 为 27 天、Antigravity 11 月为 21 天、Step 为 18 天），倍数都是拿这段时间的用量直接对比一个月的月费，周期越短越偏保守，横向比较时请留意。*

下面逐家展开，讲清楚数字背后的真实体验和踩坑点。

---

## 逐家实测锐评

### 1. Claude Code（Anthropic）：目前最顺手的大脑，Max 5x 跑出 55 倍

- **数据**：W39（9 月下旬）从 Pro（$20/月）起步，前几周单周上限大概卡在 $207 – $369；**W43 升级到 Max 5x（$100/月）之后，单周直接跳到 $1,225，随后四周连续稳定在 $1,179 – $1,600**。最近四周（W44–W47，共 27 天）实跑 **$5,574（18.50B tokens）**，每 $1 订阅费换回 **$55.7**，和我在本地"大概 55 倍"的体感严丝合缝。整个 9 周累计 $7,751 里，**84% 都烧在了最贵的 `claude-opus-5.5`**（$6,598）。
- **额度机制**：Pro 和 Max 都是 **5 小时滚动窗口 + 周上限**，而且 Claude Code 和网页/桌面端共享同一个额度池；只有 $200/月的 Ultra（原 Max 20x）才对认证账号取消了 5 小时窗口限制。升级 Max 5x 后，5 小时窗口从"写一半就撞墙"变成了基本够支撑全天高强度推进。
- **真实体验**：**Opus 5.5 是目前最好用的编码模型，指哪打哪**。不管是拆复杂架构、定位深层 bug 还是写清晰的实现计划，它极少偷懒、也很少自作主张改歪方向。我现在的整套主力工作流，核心就是拿 Opus 5.5 当总控（Orchestrator）做 Plan 和代码审查。
- **短板**：价格门槛高（想不频繁撞墙至少 $100/月起步）；桌面端 Claude Desktop 做 Computer Use 时偶尔会直接抢占你的本机鼠标光标，不如 OpenAI 顺手。
- **适合谁**：每天高强度写代码、愿意为"一次做对"付费的全职开发者。如果预算只够买一个高价订阅，优先把钱给 Claude Max。

### 2. Google Antigravity：单打主力一般，但给 Claude 当 Subagent 香疯了

- **数据**：我开了 **两个学生 Pro 账号**，单号约 CA$7.5/月，合计 CA$15/月（约 US$10.5/月）。10 月跑了 **$782（5.92B tokens）**，11 月前 21 天已经跑了 **$1,116（5.53B tokens）**。按实付学生价算，10 月是 **75x**、11 月前 21 天高达 **106x**；就算你是没有学生折扣的普通用户，按两个美区原价 Pro（2 × $19.99 ≈ $40/月）折算，依然有 **20x – 28x**（11 月按 30 天推算接近 40x）。模型分布非常鲜明：`gemini-3.8-flash` 一家就吃了 **106.9 亿 tokens（$1,364）**，其次是 `gemini-4-hydrogen`（10.5 亿 / $427）和 `gemini-4-argon`（5.7 亿 / $168）。
- **额度机制**：Antigravity CLI（`agy`）没有独立订阅，额度直接挂在 Google AI 订阅档位下（AI Pro 为 $19.99/月，5 小时刷新 + 周上限；重度还有 $99.99 的 Ultra 5x 和 $199.99 的 Ultra 20x）。学生价本身就便宜，额度对我的用法来说基本够用。
- **真实体验**：说句实在话，**单拿 Antigravity 从头到尾扛一个复杂项目，效果一般**——规划深度和边界把控明显不如 Opus 5.5。但一旦换个用法，把它的定位摆在 **Orchestrator 模式里的执行层**，体验立刻反转：我让 Opus 5.5 写好详细的修改计划，再派 Antigravity 的 `gemini-4-hydrogen` 或 `gemini-3.8-flash` 这类快模型去写样板代码、跑批量改动和干杂活，速度快、额度厚、不心疼。11 月 18 日刚发布的 `gemini-4-neon` 定位在 Hydrogen 和 Carbon 之间，号称"Carbon 的质量、Flash 的速度"，AI Pro 订阅里直接替换了 Argon。按 Google 自己的 model card，它和 Opus 5.5、GPT-6.2 Sol 对比 19 项里领先 16 项（厂商自测）。但它的 API 价格是 $3/$15 每百万 token，明显比 Hydrogen 贵，算倍数时会更"值"，额度也可能烧得更快。我账本里才跑了 4,600 万 tokens，下次更新再给实测结论。
- **国内能不能用**：官方不支持中国大陆，但实际风控比 Claude 宽松得多。
- **适合谁**：有学生价或者需要大量便宜、高速 Subagent 算力的开发者。**最佳拍档是作为 Claude 的副手**，而不是单独替代它。

### 番外：Gemini 4 Neon 号称打赢 Opus 5.5，我为什么还是用 Opus

11 月 18 日 Google 发布 Gemini 4 Neon，宣传里最响的一句是"19 项跑分里 16 项领先 Opus 5.5 和 GPT-6.2 Sol"。我翻了一圈 model card 和第三方评测，结论是：**纸面上略胜，实际体验互有输赢，"打赢 Opus 5.5"并不成立。**

![Gemini 4 Neon 与 Claude Opus 5.5 主要跑分对比](/posts/ai-coding-subscriptions-2026/neon-vs-opus-benchmarks.png)
*图 4：最贴近 Coding Agent 日常的 Terminal-Bench 4.1，Opus 5.5 仍以 65.8% 对 65.2% 小幅领先。Neon 在 SWE-sweep 上的大比分，很大一部分来自 Google 自家工具链，换成中立工具链后差距明显缩小。*

- **跑分**：Artificial Analysis 智能指数 Neon（最高档）61、Opus 5.5（最高档）58，Neon 确实高一点，但两者前面还有 GPT-6.2 Astra 和 Claude Fable 5.2。"16 项领先"是 Google 自己报的数字，目前没有第三方完整复现。
- **价格**：API 单价 Neon $3/$15，Opus 5.5 $4/$20，便宜约 25%。但 Neon 默认思考得很"长"，Flavio Copes 拿同一个短编码任务实测，Neon 用了约 49 秒、$0.091，Opus 只用了约 12 秒、$0.029。

![Neon 与 Opus 5.5 的单价、单任务耗时与幻觉率](/posts/ai-coding-subscriptions-2026/neon-cost-reality.png)
*图 5：单价便宜不等于每个任务更便宜。幻觉率一栏没有 Opus 同口径数据，用同门的 Argon 做对照。*

- **幻觉**：eesel.ai 测到 Neon 高思考档的幻觉率约 14%，比 Argon 的 4% 高出不少。它更敢答，答对的多，编的也多，这对要连续改几十个文件的 Agent 是实打实的风险。

所以我的选择没变：**规划、架构和 Code Review 继续交给 Opus 5.5**。Neon 已经包含在我现有的 AI Pro 里，我会把它当成比 Hydrogen 更强一档的执行层试一试，但不会为它单独加订阅，也不建议你因为这波宣传换掉 Claude。

### 3. OpenAI（ChatGPT Plus $20/月）：账单只拍到了它一半的价值

- **数据**：Codex CLI 是我连用最久的工具——整整 **22 周不断档**，累计 11.75B tokens / $1,641。每个月的 API 等价用量异常稳定：7 月 $328、8 月 $292、9 月 $317、10 月 $407、11 月前 21 天 $294（折合全月 ~$420）。按 ChatGPT Plus **$20/月** 算，单看本地 Codex CLI 就是稳稳的 **17x – 21x**。
- **额度机制**：Codex（CLI / IDE / Web）和 ChatGPT 网页/桌面端共享同一个额度池。Plus 档有 5 小时滚动窗口和周上限，从我连续 5 个月卡在 $300 – $420/月也能看出来，Plus 的月度天花板大概就在这个区间（想去掉 5 小时限制得上 $100/$200 的 Pro 档）。
- **真实体验**：Kanjo 账本其实**严重低估了我的 OpenAI Plus 订阅**。因为我最近大部分时候拿 OpenAI 并不是写纯代码，而是用它的 **Computer Use 和 Browser Use**。实话实说，**OpenAI 的 Computer Use 和 Browser Use 是目前当之无愧的 Top 1**——精准度第一、速度第一，最关键的是**它跑在沙盒和后台浏览器里，不占用你自己的鼠标光标**。对比之下，Claude Desktop 跑桌面操作时偶尔会直接抢走你前台鼠标，打断手头正在干的活。这个体验差距，用过一次就回不去。
- **适合谁**：几乎所有开发者都值得留一张 $20 的 Plus 门票——Codex 稳稳保底 20 倍，附赠目前最好用的 Computer Use / Browser Use。

### 4. xAI Grok（原 SuperGrok 年付 $300/年）：倍率看着不低，为什么老撞墙？

- **数据**：我买的是之前的年费订阅（Premium / 原 SuperGrok，$300/年，折合 **$25/月**）。Kanjo 记录显示，8 月 $260、9 月 $323、10 月 $424、11 月前 21 天 $348，算下来也有 **13x – 17x** 的倍率。主力是 `grok-4.7`（1.59B / $841）和 `grok-4.6`（0.80B / $498）。
- **为什么数据看着 17 倍，用起来却觉得"额度太少"？** 把单价和周吞吐摊开一看就懂了：

![每 10 亿 Token 的 API 折算单价，以及 Grok CLI 连续 14 周的单周 Token 柱状图](/posts/ai-coding-subscriptions-2026/grok-ceiling.png)
*图 3：左图是各家按全周期总费用除以总 Token 算出的折算单价；右图是 Grok CLI 从 W34 到 W47 连续 14 周的真实周吞吐量，均值 1.69 亿/周。*

- **数据直接印证了撞墙感**：Grok 4.7 的公开 API 单价偏高（$2/M 输入、$6/M 输出，长上下文还加倍），导致 Grok CLI 每 10 亿 token 的折算单价高达 **$560**，是 Codex（$140/B）的 **4 倍**、Antigravity（$169/B）的 **3.3 倍**。再加上 xAI 现在把 Grok Chat、Grok CLI 和 Cursor 全部合并进 **The X Subscription** 的**共享周额度池**里，折算下来我连续 14 周每周只能跑出 **1.04 亿 – 2.43 亿 tokens（均值 1.69 亿/周）**——和我记忆里"一周就一两亿 token"完全吻合。对动辄几十万上下文的 Coding Agent 来说，1–2 亿 token 真不够烧两天。
- **真实体验**：Grok 4.7 模型本身写代码"还可以"，没有硬伤，唯一的问题就是**周额度实在太少**。不过这个订阅有个意外红利：它和 Cursor 打通了，配合我的 Cursor 学生号用慢速 Composer 2.5 还挺顺手。
- **适合谁**：同时重度用 X/Grok 且顺带在 Cursor 里写代码的人；纯冲着 CLI 重度写代码买 Premium 档，每周撞墙会很憋屈。

### 5. 阶跃星辰 Step 5（国内 ¥99/月）：能力在线，但国内比国外贵近一半

- **真实控制台账单**：我买的是国内版 **Step Plan Flash Plus（¥99/月，含 1,600M Credits）**，主要搭配轻量开源终端 **Pi Agent** 写代码。套餐到期日是 `2026-12-05 17:20:44`，也就是 11 月 5 日开通——**截至 11 月 23 日只用了 18 天，1,600M Credits 就已经吃掉 97%，只剩 3%**。

| 模型 | 调用次数 | 输入 Token | 输出 Token | 缓存 Token | Credit 用量 |
|---|---:|---:|---:|---:|---:|
| `step-5-preview` | 19,790 | 1,597,600,063 | 17,640,688 | 1,531,288,064 | 1,538.78M |
| `step-3.7-flash` | 146 | 210,874 | 175,037 | 83,648 | 1.62M |
| **合计** | **19,936** | **15.98 亿** | **1,782 万** | **15.31 亿** | **1,540.40M（剩余 3%）** |

*(注：Kanjo 本地账本截至 11 月 21 日记录到的 Pi 日志为 0.82B tokens / $97.29；后两天有大量冲量，且本地日志与服务端缓存计费口径略有出入，此处以阶跃官方控制台的 1,540.40M 实账为准。)*

- **账算下来有多值？又有多气人？**
  - 按 `step-5-preview` 官方公开 API 价格（非缓存输入 $1.00/M、缓存读取 $0.10/M、输出 $2.70/M）核算，上面这 18 天的真实消耗折合 API 费用约 **$267.3（约 ¥1,783）**。
  - 哪怕按国内标准价 **¥99/月（约 $14.84）** 算，这 18 天也跑出了 **18.0x** 的倍率，搭配 Pi Agent 写代码速度与完成度都不错。
  - **但我必须专门点名批评它的内外盘定价**：同样 **1,600M Credits** 的 Plus 档，阶跃国内站标准价卖 **¥99/月**，而国际站（`platform.stepfun.ai`）同额度 Plus 档只卖 **$9.99/月**——按 2026 年 11 月汇率 6.67 折算，国际版只要 **¥66.6/月**！也就是说，**同一家中国大模型厂商的同档位订阅，国内开发者竟然比海外贵了 48.6%**（若按国际版算，同样这批用量能跑到 **26.8x**）。就算国内偶尔放 ¥49 限时促销，把常规标价定得比美元区贵近一半，怎么看都很劝退。
- **适合谁**：想低成本配 Pi / OpenClaw 跑国产旗舰长上下文 Agent 的人——但下单前先看一眼国际站美元价和国内促销价，**别原价当冤大头**。

### 6. MiniMax（M2.5 / M3）：代码幻觉太重，语音真香

- **订阅与用量**：今年 2 月冲着性价比订了 **M2.5 年费（¥29/月那一档）**，后来 M3 发布又买了个 **年费（¥49/月那一档）**，前前后后大概跑了 **30 亿 tokens**（大部分在 6 月底我写 Kanjo 之前，Kanjo 账本只抓到了后期的 3.3 亿 tokens / $18.76）。
- **真实体验**：
  - **代码场景高开低走**：刚上手那阵觉得便宜、速度快、够用，但随着项目变复杂，**代码幻觉太重**的问题越来越明显——编造不存在的 API、改错上下文细节，修它挖的坑比自己写还累，后来基本撤出我的主力 coding 栈。
  - **语音模型反而是真香**：MiniMax 的语音/声音合成模型目前依然非常能打，效果自然，属于它真正拿得出手的差异化能力。
- **利益相关**（不构成投资建议）：我持有 MiniMax（`00100.HK`）股票，买入价 HK$177，目前处于亏损。上面的评价只基于我自己的使用体验。
- **适合谁**：有高质量语音合成/多模态音频需求的用户；纯写代码的话，现在同样预算有更好的选择。

### 7. Cursor（一年学生套餐）：慢速 Composer 2.5 依然好用

- **订阅情况**：我用的是之前申请到的 **1 年免费学生 Pro 套餐**（官方现已关闭免费学生年卡的新申领，存量老号到期前照常履约）。如今 Cursor 的个人付费体系已和 Grok 合并进 **The X Subscription**（老 $20 Pro 被 $30/月的 Premium 取代，改用周额度池，且第三方前沿模型改为按 API 原价单独扣费）。
- **真实体验**：因为手头本来就有 Grok 订阅，我在 Cursor 里日常就是**慢速队列用 Composer 2.5**，多文件改代码非常顺手、几乎没有心理负担。由于 Cursor 在 IDE 内部完成调用、不走本地 CLI 日志，没有进入 Kanjo 账本，所以不参与倍率排行，但体验上依然给好评。

### 8. 顺手测过的三个低价 / 免费工具

这三个都没花大钱，简单给一句实测结论：

- **Command Code（Go $1/月，支持支付宝）**：**给好评**。一美元就能上车、还支持支付宝，非常照顾国内开发者。我在里面跑 `muse-spark-1.3-contributor`，Kanjo 记到了 **0.82B tokens / $13.57 API 等价（13.6x）**，一块钱买个轻巧好用的终端 Agent 体验很值。
- **小米 MiMo**：4–6 月官方激励与限免期间蹭了两个月免费额度，7 月 26 日转入常规收费订阅后没再续。
- **OpenCode**：免费跑过 0.49B tokens / $38.64，**最大硬伤是连接老是断开**，体验很碎，没付过费也没动力为它掏钱。

---

## 我的真实组合：怎么花钱最划算

把上面这些踩坑和账单揉在一起，我目前跑得最顺的不是"押宝某一家"，而是 **Orchestrator 混搭流**：

1. **大脑 / 架构 / Plan**：**Claude Opus 5.5（Max 5x，$100/月）** —— 复杂设计、拆任务、Code Review 全交给它，指哪打哪。
2. **执行 / 样板代码 / 杂活 Subagent**：**Google Antigravity（Hydrogen / 3.8 Flash）** —— 按 Opus 写好的计划批量干活，吞吐大、便宜、不心疼 Claude 额度。
3. **GUI / 浏览器自动化 + 备胎 CLI**：**OpenAI ChatGPT Plus（$20/月）** —— 凡是要点网页、测前端、操作桌面软件，全扔给 OpenAI Computer Use / Browser Use，不抢鼠标；顺带白拿每月 $300–$400 等价的 Codex CLI。
4. **编辑器内日常微调**：**Cursor（慢速 Composer 2.5）** —— 随手改几行代码最省事。

如果你按预算来抄作业：

- **月预算 $20 以内**：无脑先买 **OpenAI ChatGPT Plus（$20）**，同时拥有 Codex CLI + 目前最强的 Computer Use；有学生邮箱再把 **Google AI Pro 学生价**（或国内促销期 Step Plan / $1 Command Code）配成副手。
- **月预算 $120 – $150（重度全职开发）**：**Claude Max 5x（$100）+ OpenAI Plus（$20）+ Google AI Pro（$20，学生更便宜）**。这三张卡加起来 $120 – $140/月，我实测单月能撬动 **$5,000 – $8,000** 的 API 等价算力，基本告别额度焦虑。

---

## 附表：两家没付费用过的国产订阅（仅看官方定价，不参与打分）

你可能会问为什么没评 **Kimi Code** 和 **智谱 GLM Coding Plan**。原因很简单：这两家我都没付过费（Kanjo 账本里 Kimi 只有 0.07B、GLM 只有 0.07B，纯属随手测了几次），没资格锐评体验。下面只整理截至 **2026 年 11 月** 的官方公开价格与额度规则，方便读者横向对照：

| 产品 | 计费结构 | 公开月费参考（人民币） | 额度与限流机制 |
|---|---|---|---|
| **Kimi Code**（月之暗面） | 挂在 Kimi 会员下，Plus 起支持 Kimi Code | Plus ¥99/月（年付折 ¥79）· Pro ¥199/月 · Max ¥699/月 · Ultra ¥1,399/月 | 取消了每周硬上限，改用 **5 小时滚动频率窗口**；与网页端 / Kimi Claw 共享月度额度池 |
| **智谱 GLM Coding Plan** | 2026 年中改版为透明积分制，定价向海外看齐 | Lite 约 ¥94–118/月 · Pro 约 ¥430–538/月 · Max 约 ¥862–1,078/月 | **5 小时 + 7 天双积分上限**（Lite：2,000/10,000；Pro：12,000/60,000）；每日 14:00–18:00 高峰全额扣分，非高峰享 5 折 |

---

## 小结

- 2026 年底的重度 AI 编程依然是订阅制的红利期：我 147 天跑了 562.2 亿 tokens（96.68% 是 Cache Read），按 API 折算 $13,437，主流订阅每 $1 大多能换回 **13x – 56x**。
- **Claude Opus 5.5（Max 5x）** 是绝对的规划主力（近 4 周 55.7x），**Antigravity** 当它的执行 Subagent 性价比拉满，**OpenAI Plus（$20）** 靠 Codex + 独一档不抢鼠标的 Computer Use 坐稳必买席位。
- **Grok 4.7** 胜在生态顺手但败在每周 1–2 亿 token 的矮天花板（单位 token 折算太贵）。
- 国产里 **Step 5** 搭 Pi 写代码体验不错，但国内 ¥99 卖得比国外 $9.99 还贵近 49% 实在不地道；**MiniMax** 代码后期幻觉重，更值得买单的是它的语音模型。
- 如果你也想算清楚自己每个月到底烧了多少 API 等价费用，可以试试我自己写的开源账本工具 [Kanjo](https://github.com/mammut001/kanjo)，本地统计，不上传任何对话。

## 资料来源与说明

- 本人实测用量数据：Kanjo 导出的公开汇总 [token-usage.json](https://cv.paytonpei.top/#ai-usage)（统计区间 2026-06-28 至 2026-11-21，`kanjo 0.6.10`），以及阶跃星辰开放平台控制台实账（2026-10-24 至 2026-11-23）。
- 官方定价与额度参考（截至 2026 年 11 月）：[Anthropic Claude 定价](https://claude.com/pricing)、[Google Antigravity](https://antigravity.google/)、[OpenAI ChatGPT / Codex](https://openai.com/chatgpt/pricing/)、[Cursor / The X Subscription](https://cursor.com/pricing)、[StepFun 国际站 Step Plan](https://platform.stepfun.ai/)、[Command Code](https://commandcode.ai/)、[Kimi 会员](https://www.kimi.com/)、[智谱开放平台 GLM Coding Plan](https://bigmodel.cn/)。
- 地区限制与新模型：[Anthropic 支持地区政策](https://www.anthropic.com/supported-countries)、[Anthropic 对不支持地区的销售限制更新（2025-09）](https://www.anthropic.com/news/updating-restrictions-of-sales-to-unsupported-regions)、[Google Antigravity FAQ](https://antigravity.google/docs/faq)、[Introducing Gemini 4 Neon（Google 官方博客）](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/)。
- Neon 评测：[DataCamp：Neon vs Opus 5.5](https://www.datacamp.com/blog/gemini-4-neon-vs-claude-opus-5-5)、[Creole Studios](https://www.creolestudios.com/gemini-4-neon-vs-claude-opus-5-5/)、[Artificial Analysis：Gemini 4 Neon](https://artificialanalysis.ai/models/gemini-4-neon)、[Flavio Copes：I tested it against Opus 5.5](https://flaviocopes.com/gemini-4-neon/)、[eesel.ai 评测](https://www.eesel.ai/blog/gemini-4-neon-review)。
