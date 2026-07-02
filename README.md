# My Blog (Astro + Notion)

一个使用 Astro 5、Notion API 和 Tailwind CSS 构建的个人博客模板，支持 GitHub Pages 自动部署。

## 快速开始

1. 安装依赖

```bash
npm install
```

2. 配置环境变量

```bash
cp .env.example .env
```

3. 启动开发环境

```bash
npm run dev
```

4. 构建静态站点

```bash
npm run build
```

## Agent 工作流

这个仓库已经配置了轻量 agent harness，用来让后续 Codex 或其他 coding agent 更容易接手。

进入项目后先读：

1. [AGENTS.md](./AGENTS.md)
2. [feature_list.json](./feature_list.json)
3. [progress.md](./progress.md)
4. [session-handoff.md](./session-handoff.md)

标准验证：

```powershell
.\init.ps1
```

如果在 bash 环境：

```bash
./init.sh
```

新任务开始前，可以复制 [docs/agent-task-template.md](./docs/agent-task-template.md) 里的结构来记录目标、范围和验证证据。
