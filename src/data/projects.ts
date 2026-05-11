export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  slug: string;
  summary: string;
  description: string;
  year: string;
  status: string;
  language: string;
  updatedAt: string;
  accentHue: number;
  coverUrl: string;
  tags: string[];
  links: ProjectLink[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "AI-chat",
    slug: "ai-chat",
    summary: "桌面 AI 伙伴与 AI VTuber 实验项目，探索陪伴式聊天、记忆片段和情绪反馈。",
    description:
      "AI-chat 以桌面 AI 伙伴为核心，尝试把对话、角色设定、记忆片段和小工具整合到更有陪伴感的交互体验里。后续可以继续补充模型接入、桌宠状态和复盘文章。",
    year: "2026",
    status: "In progress",
    language: "JavaScript",
    updatedAt: "2026-05-11",
    accentHue: 224,
    coverUrl: "images/projects/ai-chat-cover.png",
    tags: ["AI Desktop Pet", "AI VTuber", "JavaScript"],
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
