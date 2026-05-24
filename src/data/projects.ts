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
  category: string;
  year: string;
  status: string;
  language: string;
  updatedAt: string;
  accentHue: number;
  coverUrl: string;
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
    category: "AI 游戏",
    year: "2026",
    status: "Alpha",
    language: "TypeScript",
    updatedAt: "2026-05-16",
    accentHue: 42,
    coverUrl: "images/projects/ai-werewolf-cover.png?v=2",
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
