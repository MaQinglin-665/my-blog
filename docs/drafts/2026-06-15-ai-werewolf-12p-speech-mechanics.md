# AI 狼人杀 6 月大更新：我怎样把 12 人局 AI 发言从“会说话”推到“可验证”

> Notion 发布建议  
> Slug: `ai-werewolf-12p-speech-mechanics`  
> Tags: `AI 狼人杀`, `LLM 评估`, `TypeScript`, `AI 游戏`  
> Summary: 这篇复盘记录 AI 狼人杀 6 月更新：12 人局发言硬门、预言家查验归因、fallback / validationFailure 评估、首页游戏大厅和 Public Alpha 验证链路。  
> Cover suggestion: `public/images/projects/ai-werewolf-lobby-table.webp`

## 先给普通访客的结论

这次更新不是“给 AI 多写几句 prompt”，而是把 AI 狼人杀往更像真实产品的方向推了一步。

以前的目标是：规则能跑、AI 能发言、真人能加入、房间能开起来。  
这次的目标变成：当牌桌进入 12 人局，出现预言家对跳、死亡遗言、多人引用和多轮发言后，AI 仍然不能乱认信息来源，也不能用半截话、越界话或模板话混过去。

最终我把这轮更新拆成两条线：

1. AI 发言机制：让模型发言前有明确的公开事实、私密边界、身份声明、查验归属和输出校验。
2. 前端体验：把首页从表单式入口改造成游戏大厅，让用户一进来就能看到推荐板子、圆桌预览、AI 池和开局动作。

这让 AI 狼人杀从“能玩”更接近“可以被别人试玩、反馈、复盘”的 Public Alpha。

## 真正的问题：AI 不只是要会说，还要知道“这句话是谁的”

狼人杀里的 AI 发言难点不在文采，而在信息边界。

比如 12 人局里经常出现这种情况：

- 2 号玩家声称自己是预言家，并报过 9 号查杀；
- 7 号玩家死亡前也留下过一条查验；
- 8 号玩家后面跳预言家，同时引用了前面两个人的话；
- 另一个玩家又在投票前复述这些信息。

如果只是把所有发言文本塞给模型，它可能会把“别人报过的查验”当成“自己已经报过的查验”。这会直接污染 `publicClaimBoard`，让后续 AI 和评估器都以为某个玩家拥有不该属于他的结构化 `checks`。

所以这轮更新的核心不是让 AI 说得更花，而是让系统能回答几个硬问题：

- 这条查验是当前发言者自己的，还是引用别人的？
- 非预言家身份声明能不能携带结构化查验？
- 模型发言是否泄露了隐藏身份或夜晚私密信息？
- 这句话是不是被截断，只剩一个无法落地的半句？
- fallback 是 provider 噪声，还是机制边界失败？

这些问题必须能被测试、样本和 hard scan 证明，不能只靠我主观读一遍觉得还行。

## 机制一：从 prompt 堆叠转向发言合约

这轮发言层继续保留 `tableRead`、座位记忆和发言计划，但重点是把输出边界做得更硬。

发言前会整理出几类输入：

- 公开事实：最近发言、票型、死亡信息、公开身份声明；
- 私密边界：当前座位能知道但不能泄露的夜晚信息；
- 发言计划：这轮要表达的立场、追问、票口或保留；
- `speechContract`：必须说什么、可以问什么、不能问什么；
- 候选动作：当前阶段能合法提交的动作。

模型可以负责自然表达，但不能绕过这些边界。发言出来后，还要经过校验、修复、重试或 fallback。换句话说，LLM 是表达层，不是裁判层。

## 机制二：预言家查验归因必须可证明

这次最关键的技术点是 structured Seer-check attribution。

早期的修法更像“发现一种坏句式，就挡一种坏句式”。这种方式在 12 人局里不够，因为中文发言可以有很多变体：

- “他之前报过 1 号金水”
- “2 号刚才给的金水”
- “我昨晚验的你，查杀”
- “Claude 和 GLM 两个预言家遗言都锁着 9 号”

后来的修法转向 bounded verb ownership：只有当句子里的主语和查验动词能证明这是当前发言者自己的查验时，才把它写入当前发言者的 `checks`。如果句子是在引用、复述、报告另一个玩家的查验，就不能污染当前发言者。

这条规则看起来细，但对狼人杀很重要。AI 不能把“我听见别人说过”自动升级成“我自己验过”。

## 机制三：hard scan、evaluator 和真实样本分工

我把验证拆成几层，而不是只看一个总分。

Hard scan 负责硬门：

- private leak 是否为 0；
- accepted fragment 是否为 0；
- 非预言家 claimBoard checks 是否为 0；
- claimed-Seer same-target contradiction 是否为 0；
- 关键 D3 触发句是否真的出现。

Evaluator 负责样本评分和风险标注。它会发现 `logic_boundary_error`、`malformed_output_fragment`、`speech_vote_discontinuity` 等问题。但 evaluator 本身也可能误判，所以只有当误判能被具体样本证明时才校准。

真实 provider proof 负责告诉我：这些机制在真实模型输出里是否还能站住。

这轮最终的 DeepSeek D3 proof 达到了结构化硬门目标：

- 100 次调用，32 条 speech，68 条 action；
- 运行到 day 3 `DAY_VOTE`；
- non-Seer claimBoard checks: 0；
- claimed-Seer same-target contradictions: 0；
- private leak hits: 0；
- accepted fragment hard-shape hits: 0；
- 最终本地 eval 平均分 99.8，highRiskCaseIds 为空。

但这里不能过度宣传。这个 proof 的 provider path 仍然有噪声：fallback/error 是 9/100，validationFailure 是 4/100。它证明的是当前 DeepSeek 路径下的结构化查验归因硬门，不等于 Mimo-specific full-game 主观读感已经彻底完成。

## 前端：从“配置入口”改成“游戏大厅”

AI 发言机制之外，这次还改了首页。

之前首页更像表单：选择板子、选择座位、配置 AI，然后进入游戏。功能存在，但不像一个游戏。

新的桌面首页改成了游戏大厅：

- 左侧推荐 4 个板子：6 人新手局、9 人预女猎、12 人标准警长局、12 人白狼王骑士局；
- 中间是暗色圆桌预览，突出当前选择和牌桌氛围；
- 右侧放 AI 池、座位预览和最近对局；
- 主动作仍然是真实功能：进入联机房间、进入牌桌；
- 没有添加金币、等级、排行榜、商城这些不存在的占位系统。

这次视觉改造的原则是：让首页更像游戏，但不伪装成已经有运营系统的游戏。它仍然是 Alpha，只是把真实能力包装得更接近用户预期。

## Public Alpha 验证链路

这次更新已经部署到 Tencent Cloud 主路径，当前公开入口是：

- Primary Tencent Cloud Alpha: `https://175.178.199.245`
- Render free mirror: `https://ai-werewolf-free.onrender.com`

截至 2026-06-15 16:20 左右，Tencent Cloud 主路径通过了：

- production preflight；
- room SSE smoke；
- room action vote smoke；
- main game smoke；
- 桌面和 390px 移动端 UI smoke。

另外，反馈链路也更清楚了：

- `/alpha-report` 生成可复制反馈文本；
- 单人局会带出反馈编号；
- owner sample endpoint 可以按最近样本或 gameId 导出公开 AI 样本；
- 未授权请求返回 404，避免把样本接口做成公共泄露面。

这让后续玩家反馈不只是“某局 AI 说得奇怪”，而是可以回到具体样本、具体阶段、具体 AI call。

## 这次更新带来的工程判断

我觉得这轮最大的收获有三个。

第一，AI 游戏里的 LLM 不是一个孤立能力。它必须嵌在规则引擎、阶段状态、公开信息、私密边界、UI 反馈和复盘样本之间。

第二，越复杂的 AI 行为，越不能只靠 prompt。prompt 可以指导表达，但不能承担所有裁判、归因和验收工作。

第三，Public Alpha 不等于“公开运营”。当前阶段最重要的是小范围试玩、收集 P0/P1 问题、保证每次反馈都能定位，而不是急着做账号、匹配、商业化或大规模推广。

## 附：证据和来源

主要源文件和记录：

- `D:\ai-werewolf\docs\tasks\2026-06-12p-mimo-speech-mechanics.md`
- `D:\ai-werewolf\docs\evaluations\2026-06-14-12p-deepseek-final-acceptance-proof.md`
- `D:\ai-werewolf\docs\superpowers\specs\2026-06-12-ai-speech-layer-structure-design.md`
- `D:\ai-werewolf\docs\superpowers\specs\2026-06-14-homepage-game-lobby-redesign.md`
- `D:\ai-werewolf\docs\current-release.md`
- `D:\ai-werewolf\docs\alpha-feedback-ops.md`

关键验证命令记录：

```powershell
npm.cmd run test -- src/ai/llmEvaluation.test.ts
npx.cmd tsc --noEmit --pretty false
npm.cmd run lint
git diff --check
npm run preflight:production -- --base-url=https://175.178.199.245
$env:ROOM_SMOKE_BASE_URL="https://175.178.199.245"; npm run smoke:room-sse
$env:ROOM_SMOKE_BASE_URL="https://175.178.199.245"; npm run smoke:room-action:vote
npm run smoke:main-game -- --base-url=https://175.178.199.245
```

后续仍要继续做：

- Mimo-specific full-game 主观读感验证；
- 真实手机和电脑小范围试玩；
- 把 P0/P1 反馈继续变成可复现样本和修复任务；
- 将这篇草稿发布到 Notion 数据库并设为 `Published`。
