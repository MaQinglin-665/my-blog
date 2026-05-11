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
    summary: "围绕 AI 对话体验的前端项目，用来沉淀智能交互、提示词和模型调用实践。",
    description:
      "这个项目适合作为 AI 应用能力的展示入口：从对话界面、状态反馈到未来的模型接入记录，都可以在博客里持续复盘。",
    year: "2026",
    status: "Active",
    language: "JavaScript",
    updatedAt: "2026-05-11",
    accentHue: 164,
    coverUrl:
      "https://opengraph.githubassets.com/mql-ai-chat/MaQinglin-665/AI-chat",
    tags: ["AI", "JavaScript", "Chat UI"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/MaQinglin-665/AI-chat"
      }
    ],
    featured: true
  },
  {
    title: "MQL Blog",
    slug: "mql-blog",
    summary: "当前这个 Astro + Notion 博客，把文章、项目和自动部署串成一个长期作品集。",
    description:
      "博客负责承载写作、项目展示和复盘记录。Notion 管内容，Astro 做静态生成，GitHub Pages 自动部署。",
    year: "2026",
    status: "Live",
    language: "Astro",
    updatedAt: "2026-04-27",
    accentHue: 214,
    coverUrl:
      "https://opengraph.githubassets.com/mql-blog/MaQinglin-665/my-blog",
    tags: ["Astro", "Notion", "GitHub Pages"],
    links: [
      {
        label: "在线站点",
        href: "https://maqinglin-665.github.io/my-blog/"
      },
      {
        label: "GitHub",
        href: "https://github.com/MaQinglin-665/my-blog"
      }
    ],
    featured: true
  }
];

export const featuredProjects = projects.filter((project) => project.featured);
