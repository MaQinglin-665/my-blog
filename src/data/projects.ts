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
  category: string;
  year: string;
  status: string;
  language: string;
  updatedAt: string;
  accentHue: number;
  coverUrl: string;
  demoImageUrl?: string;
  demoImageVariant?: "phone" | "wide";
  tags: string[];
  highlights: string[];
  nextSteps: string[];
  links: ProjectLink[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "AI 狼人杀 Alpha",
    slug: "ai-werewolf",
    summary: "本地可玩的 AI 狼人杀试玩版，支持真人参与、AI 自动对局、多人房间和临时公网分享。",
    description:
      "AI 狼人杀 Alpha 是一个 Next.js / TypeScript 项目。它把规则引擎、AI 发言、身份板子、复盘和多人房间整合到一套本地可试玩流程里；模拟模式不需要 API Key，适合快速演示和测试不同板子的推理节奏。",
    detailSections: [
      {
        title: "项目目标",
        body: "把狼人杀这种强流程、强博弈的桌游做成可验证的 AI 实验场：玩家可以自己入座，也可以让 AI 自动推演整局，从而观察发言、投票、身份技能和终局复盘是否连贯。"
      },
      {
        title: "核心实现",
        body: "项目围绕规则引擎、房间状态、AI 发言约束和前端对局面板展开。它既支持本地模拟，也保留多人房间与公网分享路径，方便从个人测试逐步走向朋友试玩。"
      },
      {
        title: "作品价值",
        body: "这个项目展示的是把 AI 能力放进真实交互流程里的能力：不是只调用模型，而是让模型在规则、阶段、身份和 UI 反馈之间稳定协作。"
      }
    ],
    modules: [
      {
        title: "对局规则引擎",
        body: "维护身份、阶段、发言、投票和胜负条件，让每一局能按狼人杀规则完整推进。"
      },
      {
        title: "AI 发言与约束",
        body: "把模型输出限制在当前身份和阶段语境里，避免发言越界，也方便后续分析行为质量。"
      },
      {
        title: "房间与分享流程",
        body: "支持真人入座、AI 补位和临时公网分享，方便从本地调试走向朋友试玩。"
      },
      {
        title: "复盘与诊断",
        body: "保留关键决策和终局结果，帮助判断规则、节奏和 AI 表现是否可信。"
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
        date: "下一阶段",
        title: "公开试玩和新手引导",
        body: "继续降低进入门槛，补充规则说明、局内提示和更多板子。"
      }
    ],
    challenges: [
      {
        problem: "AI 很容易说出不符合身份或阶段的信息。",
        solution: "把发言生成放进明确的阶段上下文里，用规则状态约束可见信息和行动范围。"
      },
      {
        problem: "桌游规则复杂，前端一旦只展示结果，玩家很难理解发生了什么。",
        solution: "用阶段、身份、投票、复盘等 UI 状态把规则过程可视化，让玩家能跟上局势。"
      }
    ],
    category: "AI 游戏",
    year: "2026",
    status: "Alpha",
    language: "TypeScript",
    updatedAt: "2026-05-16",
    accentHue: 42,
    coverUrl: "images/projects/ai-werewolf-cover.png?v=2",
    demoImageUrl: "images/projects/ai-werewolf-demo-mobile.jpg",
    demoImageVariant: "phone",
    tags: ["AI 狼人杀", "Next.js", "TypeScript", "多人联机"],
    highlights: ["本地模拟模式可完整试玩", "支持多人房间和公网隧道", "内置规则引擎与终局复盘"],
    nextSteps: ["继续打磨新手引导和公开试玩路径", "补充更多身份板子与 AI 行为诊断", "沉淀一篇完整开发复盘文章"],
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
