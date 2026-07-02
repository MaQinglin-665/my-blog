export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  slug: string;
  summary: string;
  description: string;
  detailSections: {
    title: string;
    body: string;
  }[];
  modules: {
    title: string;
    body: string;
  }[];
  timeline: {
    date: string;
    title: string;
    body: string;
  }[];
  challenges: {
    problem: string;
    solution: string;
  }[];
  aiSystem?: {
    intro: string;
    points: {
      title: string;
      body: string;
      terms: string[];
    }[];
    flow: {
      label: string;
      body: string;
    }[];
  };
  category: string;
  year: string;
  status: string;
  language: string;
  updatedAt: string;
  accentHue: number;
  coverUrl: string;
  demoImageUrl?: string;
  demoImageVariant?: "phone" | "wide";
  gallery?: {
    title: string;
    body: string;
    imageUrl: string;
  }[];
  tags: string[];
  highlights: string[];
  nextSteps: string[];
  links: ProjectLink[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "AI Daily",
    slug: "ai-daily",
    summary: "面向个人使用的 AI 日报发布系统，已上线 Public Preview，把每日 AI 新闻生成、导入、封面、音频和阅读体验串成一条可验证流水线。",
    description:
      "AI Daily 是一个 Next.js / TypeScript 项目，用来收集、生成、导入和浏览每日 AI 新闻摘要。它不只是新闻列表，而是把内容生成、SQLite 写入、封面任务、音频播放、Minecraft 风格阅读界面和自托管部署脚本放进同一个个人发布系统里。",
    detailSections: [
      {
        title: "它解决什么",
        body: "每天关注 AI 新闻时，真正耗时的部分不是打开页面，而是筛选来源、写成可读摘要、补齐封面和音频，再把内容稳定发布到一个自己能长期维护的地方。AI Daily 把这些动作做成可重复的本地到线上流程。"
      },
      {
        title: "自动化主线",
        body: "项目通过生成脚本、导入脚本和 SQLite 状态管理，把候选新闻、正文、来源 URL、分类、封面状态和音频资产组织起来。内容进入站点前要符合固定字段和基础质量约束，避免只停留在一次性的手工整理。"
      },
      {
        title: "阅读体验",
        body: "前端使用 Minecraft 风格的视觉语言来承载日报阅读：分类、编号、封面、详情页和音频入口都有统一的像素化质感。这个风格不是单纯装饰，而是让每日信息流更像一个可持续打开的个人产品。"
      }
    ],
    modules: [
      {
        title: "日报生成与导入",
        body: "用脚本生成每日候选内容，再通过 import:codex-issue 写入 SQLite，让同一天内容可以被校验、更新和重新导入。"
      },
      {
        title: "内容状态模型",
        body: "围绕日期、分类、来源、正文、封面和音频维护结构化状态，支持首页、归档页、新闻详情页和公开预览。"
      },
      {
        title: "封面与音频流水线",
        body: "提供 cover:list、cover:apply、cover:status 和 TTS 相关脚本，把文章从纯文本扩展成带封面和可听版本的内容单元。"
      },
      {
        title: "自托管部署",
        body: "保留 Docker、上传和同步脚本，让本地生成的内容能够发布到自己的服务器，并通过公开地址进行预览。"
      }
    ],
    timeline: [
      {
        date: "2026-06",
        title: "本地日报系统成型",
        body: "完成 Next.js、SQLite、生成脚本、导入脚本和基础阅读页面，把 AI 新闻整理从手工流程推进到可重复执行。"
      },
      {
        date: "2026-06",
        title: "封面与音频链路补齐",
        body: "增加封面任务状态、图片应用验证和文章音频播放能力，让每条日报不只是一段文本。"
      },
      {
        date: "2026-06",
        title: "Public Preview 上线",
        body: "通过自托管服务器开放预览地址，开始把本地日报工具作为可访问的个人 AI 内容系统展示。"
      }
    ],
    challenges: [
      {
        problem: "AI 新闻生成容易变成一次性文本，缺少可追踪的发布状态。",
        solution: "把日期、来源、正文长度、分类、封面和音频状态写入结构化数据，并用导入脚本和状态命令反复校验。"
      },
      {
        problem: "生成封面和音频后，如果不回写状态，前端很难知道哪些内容已经可展示。",
        solution: "用 cover:list、cover:apply、cover:status 管理封面任务，把生成资产和 SQLite 内容记录重新对齐。"
      },
      {
        problem: "本地 SQLite 项目部署到服务器时，代码能启动不等于内容可持续存在。",
        solution: "用明确的数据库路径、Docker 配置和内容同步脚本，把运行环境和生成内容分开处理。"
      }
    ],
    category: "AI 内容系统",
    year: "2026",
    status: "Public Preview",
    language: "TypeScript",
    updatedAt: "2026-06-24",
    accentHue: 118,
    coverUrl: "images/projects/ai-daily-home-desktop.png",
    demoImageUrl: "images/projects/ai-daily-mobile.png",
    demoImageVariant: "phone",
    gallery: [
      {
        title: "公开预览首页",
        body: "真实部署页面展示每日 AI 新闻、分类、编号和 Minecraft 风格阅读入口。",
        imageUrl: "images/projects/ai-daily-home-desktop.png"
      },
      {
        title: "文章阅读与媒体状态",
        body: "详情页展示封面、正文组织、来源信息和音频相关体验。",
        imageUrl: "images/projects/ai-daily-detail-desktop.png"
      },
      {
        title: "移动端阅读",
        body: "390px 左右视口下检查内容、图片和交互入口是否适合手机阅读。",
        imageUrl: "images/projects/ai-daily-mobile.png"
      }
    ],
    tags: ["AI 日报", "Next.js", "SQLite", "内容自动化", "TTS"],
    highlights: ["Public Preview 已上线，可通过服务器地址访问", "生成、导入、封面和音频状态形成可验证流水线", "Minecraft 风格阅读界面已覆盖首页和详情体验"],
    nextSteps: ["继续稳定每日内容生成和来源筛选质量", "补齐更长期的归档检索和运营状态面板", "完善服务器持久化和内容同步的部署记录"],
    links: [
      {
        label: "Live Preview",
        href: "http://175.178.199.245/ai-daily"
      },
      {
        label: "GitHub",
        href: "https://github.com/MaQinglin-665/ai-daily"
      }
    ],
    featured: true
  },
  {
    title: "AI 狼人杀 Alpha",
    slug: "ai-werewolf",
    summary: "面向公开 Alpha 的 AI 狼人杀实验场，已完成 12 人局发言硬门、首页游戏大厅和线上试玩链路升级。",
    description:
      "AI 狼人杀 Alpha 是一个 Next.js / TypeScript 项目。最新一轮更新把重点从“能跑完整局”推进到“复杂 12 人局中 AI 发言、身份归因、公开信息边界和前端游戏大厅都可验证”：普通局发言层拆出更清楚的上下文、玩家口吻、校验和评估边界，首页也从表单式入口改造成可操作的狼人杀大厅。",
    detailSections: [
      {
        title: "这次更新解决什么",
        body: "之前的重点是让规则、房间、AI 和复盘串起来。6 月这轮更新开始处理更难的问题：当牌桌进入 12 人局、预言家对跳、死亡遗言和多轮引用后，AI 不能把别人的查验说成自己的，也不能用截断、越界或模板化发言混过去。"
      },
      {
        title: "技术主线",
        body: "核心改动集中在普通局 AI 发言机制：把 publicClaimBoard、speechContract、tableRead、claim attribution、hard scan、fallback 和 evaluator calibration 串成闭环。每一次真实模型样本暴露出的错误，都先变成可复现测试，再进入下一轮 bounded proof。"
      },
      {
        title: "前端体验",
        body: "首页从普通配置表单改成桌面游戏大厅：推荐板子、圆桌预览、AI 池、最近对局和开局动作被放到同一个首屏。它不是营销页，而是一个能直接选择板子、进入联机房间或开始单人局的可操作入口。"
      }
    ],
    modules: [
      {
        title: "对局规则引擎",
        body: "维护身份、阶段、发言、投票和胜负条件，让每一局能按狼人杀规则完整推进。"
      },
      {
        title: "AI 发言硬门",
        body: "用 speechContract、公开事实边界、发言片段检查和结构化归因校验，拦住隐藏信息泄露、错误查验归属、半截发言和不合法身份信息。"
      },
      {
        title: "12 人局评估闭环",
        body: "通过 bounded live proof、mock full-game、hard scan 和本地 evaluator 复盘样本，把主观“像不像玩家”拆成能回放和能复测的证据。"
      },
      {
        title: "试玩与反馈链路",
        body: "公网 Alpha 保留房间、健康面板、反馈模板和 owner sample 导出路径，让玩家反馈能回到具体对局样本。"
      }
    ],
    timeline: [
      {
        date: "2026-05",
        title: "Alpha 试玩版成型",
        body: "完成本地可玩的核心流程，把 AI 对局、真人参与和基础复盘串到同一个体验里。"
      },
      {
        date: "2026-05",
        title: "多人房间与公网分享",
        body: "补齐朋友试玩需要的房间入口和临时分享路径，让项目不只停留在本机演示。"
      },
      {
        date: "2026-06",
        title: "12 人局发言机制硬门",
        body: "围绕 Mimo / DeepSeek 真实样本修正预言家查验归因、非预言家公开查验边界、截断发言和 evaluator 误判，最终在 DeepSeek D3 proof 中通过结构化硬门。"
      },
      {
        date: "2026-06",
        title: "首页游戏大厅与 Alpha 反馈闭环",
        body: "桌面首页改造成暗色圆桌大厅；同时补齐反馈模板、单人局样本导出和 Tencent Cloud 线上 smoke 记录。"
      }
    ],
    challenges: [
      {
        problem: "AI 在 12 人局中容易把别人报过的查验吸收到自己的身份声明里。",
        solution: "把查验归因从文本黑名单改成 bounded verb ownership：只有自有查验动词和合法主语才写入当前发言者的结构化 checks。"
      },
      {
        problem: "LLM 发言质量不能只靠人工感觉判断。",
        solution: "把真实样本、hard scan、fallback/error、validationFailure 和本地 evaluator 放到同一条验收链路里，区分硬门失败、评估误判和 report-only 体验问题。"
      },
      {
        problem: "首页入口像表单，不能体现狼人杀游戏大厅的临场感。",
        solution: "用推荐板子图卡、圆桌预览和右侧状态栏重排桌面首屏，同时保留真实开局、联机房间和 AI 池入口。"
      }
    ],
    aiSystem: {
      intro:
        "这次更新的重点不是给 prompt 多加几句要求，而是把“谁说过什么、谁能知道什么、谁能把哪个查验算作自己的”做成可测试的结构化边界。模型仍然负责表达，但发言进入牌桌前必须通过规则、身份、公开事实和格式硬门。",
      points: [
        {
          title: "规则引擎兜底",
          body:
            "游戏状态由 src/game 里的规则引擎统一裁判。AI、UI 和 API 只能提交命令或候选动作，夜晚技能、白天投票、身份结算和胜负判断都必须经过合法性校验。",
          terms: ["src/game", "候选动作", "合法动作校验"]
        },
        {
          title: "局势阅读 tableRead",
          body:
            "tableRead 会把最近发言、票型、身份声明、查验、倒牌和座位记忆转成怀疑值、信任值、焦点位和公开压力，让 AI 不是凭感觉选人，而是带着当前牌桌结构做判断。",
          terms: ["tableRead", "座位记忆", "票型"]
        },
        {
          title: "结构化推理层",
          body:
            "advancedReasoning、reasoningFrame、rolePlaybook、claimAudit 和 debateAgenda 会把证据硬度、身份坑、预言家线、票型复盘、反面解释和本轮追问拆成可复用线索，同时供行动和发言使用。",
          terms: ["advancedReasoning", "claimAudit", "debateAgenda"]
        },
        {
          title: "行动候选与连续性",
          body:
            "buildConstrainedActionInput 只把当前阶段允许的候选动作交给模型；decisionSummary 和 speechVoteContinuity 会要求 AI 解释上一轮怎么聊、本轮为什么这样投，减少发言和投票脱节。",
          terms: ["buildConstrainedActionInput", "decisionSummary", "speechVoteContinuity"]
        },
        {
          title: "发言合约 speechContract",
          body:
            "每次发言前都会生成 speechContract，明确 mustSay、mayAsk、mustNotAsk 和票口边界。它会限制 AI 只能评价当前已发生的信息，不能把未发言的人说成已经回应，也不能随便越权拍身份。",
          terms: ["speechContract", "mustSay", "mustNotAsk"]
        },
        {
          title: "查验归因硬门",
          body:
            "12 人局里最危险的问题是把引用、遗言或别人报过的查验写进当前发言者的 publicClaimBoard。现在 claim extraction 会按主语和动词所有权决定 checks 归属，非预言家声明也不会携带结构化查验。",
          terms: ["publicClaimBoard", "claim attribution", "bounded verb ownership"]
        },
        {
          title: "输出校验与回退",
          body:
            "LLM 生成后的台词会经过 validateRenderedSpeech 检查，拦截私密信息泄漏、计划外身份结论、编造死因和不符合当前发言计划的内容；失败时会重试或回退到安全发言。",
          terms: ["validateRenderedSpeech", "fallback", "私密信息边界"]
        },
        {
          title: "样本评估与校准",
          body:
            "真实模型 proof 会输出 report、cases、hardscan 和 eval。硬门看 private leak、accepted fragment、非预言家 checks 和同目标矛盾；evaluator 只在误判被具体样本证明后校准。",
          terms: ["hardscan", "eval:ordinary-ai", "validationFailure"]
        }
      ],
      flow: [
        {
          label: "读取局势",
          body: "从规则状态、公开发言、票型、身份声明和私人视角中生成 AI 可见信息。"
        },
        {
          label: "形成判断",
          body: "用 tableRead 和结构化推理层整理怀疑对象、保护对象、票口和验证问题。"
        },
        {
          label: "限制行动",
          body: "只允许 AI 在当前阶段合法候选动作里选择，最终仍由规则引擎落盘。"
        },
        {
          label: "生成发言",
          body: "用 speechContract 把观点、公开依据、追问边界和不能说的内容压进同一个发言约束里。"
        },
        {
          label: "校验输出",
          body: "对模型台词做解析、校验、重试和 fallback，确保它既像玩家，也不越过规则和信息边界。"
        },
        {
          label: "复盘样本",
          body: "用真实对局样本和本地回放把问题拆成硬门失败、provider 噪声、评估误判或仅需继续观察的体验问题。"
        }
      ]
    },
    category: "AI 游戏",
    year: "2026",
    status: "Public Alpha",
    language: "TypeScript",
    updatedAt: "2026-06-15",
    accentHue: 42,
    coverUrl: "images/projects/ai-werewolf-lobby-table.webp",
    demoImageUrl: "images/projects/ai-werewolf-lobby-table.webp",
    demoImageVariant: "wide",
    gallery: [
      {
        title: "6 人新手局",
        body: "低压入门板子，适合快速验证真人入座、AI 补位和第一轮夜晚/白天流程。",
        imageUrl: "images/projects/ai-werewolf-board-6p.webp"
      },
      {
        title: "9 人预女猎",
        body: "更接近传统核心身份结构，用来观察预言家、女巫、猎人和票型信息的交互。",
        imageUrl: "images/projects/ai-werewolf-board-9p.webp"
      },
      {
        title: "12 人标准警长局",
        body: "本轮 AI 发言机制验证的主战场，覆盖警长竞选、预言家对跳、多轮引用和复杂归因。",
        imageUrl: "images/projects/ai-werewolf-board-12p-standard.webp"
      },
      {
        title: "12 人白狼王骑士局",
        body: "高压进阶板子，为后续复杂身份技能、公开信息边界和局势解释留出空间。",
        imageUrl: "images/projects/ai-werewolf-board-12p-white-wolf.webp"
      }
    ],
    tags: ["AI 狼人杀", "Next.js", "TypeScript", "12 人局", "LLM 评估"],
    highlights: ["12 人局结构化发言硬门通过 DeepSeek D3 proof", "桌面首页升级为可操作游戏大厅", "Tencent Cloud Public Alpha 已完成生产预检和房间烟测"],
    nextSteps: ["把技术深挖草稿发布到 Notion 博客", "继续做 Mimo-specific full-game 主观读感验证", "组织真实手机和电脑小范围试玩并记录 P0/P1 问题"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/MaQinglin-665/ai-werewolf"
      }
    ],
    featured: true
  },
  {
    title: "AI-chat",
    slug: "ai-chat",
    summary: "桌面 AI 伙伴与 AI VTuber 实验项目，探索陪伴式聊天、记忆片段和情绪反馈。",
    description:
      "AI-chat 以桌面 AI 伙伴为核心，尝试把对话、角色设定、记忆片段和小工具整合到更有陪伴感的交互体验里。后续可以继续补充模型接入、桌宠状态和复盘文章。",
    detailSections: [
      {
        title: "项目目标",
        body: "探索一个更像“长期陪伴对象”的桌面 AI 伙伴，而不是一次性问答窗口。重点放在角色感、状态反馈、记忆片段和日常可见性。"
      },
      {
        title: "核心实现",
        body: "项目围绕桌面交互、角色表达和对话体验展开，适合作为 AI VTuber、桌宠、个人助理等方向的实验底座。"
      },
      {
        title: "作品价值",
        body: "这个项目展示的是情绪化交互和产品形态探索：把 AI 放进更贴近日常的入口里，观察它如何从工具变成陪伴式体验。"
      }
    ],
    modules: [
      {
        title: "角色设定",
        body: "围绕桌面伙伴的人设、语气和互动边界做实验，让对话更像一个持续存在的角色。"
      },
      {
        title: "记忆片段",
        body: "把对话中的偏好、状态和阶段性信息沉淀成可复用线索，为长期陪伴体验打底。"
      },
      {
        title: "桌面入口",
        body: "尝试让 AI 不只停留在网页或命令行，而是作为更容易被看见、被唤起的桌面对象。"
      },
      {
        title: "AI VTuber 方向",
        body: "保留向虚拟主播、情绪反馈和更丰富表达形态扩展的空间。"
      }
    ],
    timeline: [
      {
        date: "2026-05",
        title: "桌面 AI 伙伴方向确定",
        body: "从普通聊天项目转向更有陪伴感的桌面形态，明确角色感和长期互动是重点。"
      },
      {
        date: "2026-05",
        title: "项目展示入口整理",
        body: "把项目作为博客作品集的一部分展示，先补齐说明、封面和外部链接。"
      },
      {
        date: "下一阶段",
        title: "补齐真实使用场景",
        body: "继续完善截图、模型接入、记忆策略和可演示流程。"
      }
    ],
    challenges: [
      {
        problem: "陪伴式 AI 容易只剩聊天窗口，缺少持续存在感。",
        solution: "把桌面形态、角色状态和记忆片段放到同一个方向里，让它更像一个可持续互动的产品。"
      },
      {
        problem: "项目还处在实验阶段，容易显得抽象。",
        solution: "先用作品页明确目标、模块和下一步，再逐步补充截图和实际交互案例。"
      }
    ],
    category: "AI 伙伴",
    year: "2026",
    status: "进行中",
    language: "JavaScript",
    updatedAt: "2026-05-11",
    accentHue: 224,
    coverUrl: "images/projects/ai-chat-cover.png",
    tags: ["AI 桌宠", "AI VTuber", "JavaScript"],
    highlights: ["桌面陪伴式聊天体验", "角色状态与记忆片段", "AI VTuber 交互实验"],
    nextSteps: ["补充更完整的截图和使用场景", "整理模型接入和记忆设计方案", "把阶段复盘写成文章"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/MaQinglin-665/AI-chat"
      }
    ],
    featured: true
  }
];

export const featuredProjects = projects.filter((project) => project.featured);
