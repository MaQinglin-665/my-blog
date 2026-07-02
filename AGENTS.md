# AGENTS.md

这个仓库是一个 Astro + Notion + Tailwind CSS 的个人博客和 AI 作品集。代理进来时先稳住现状，再做小步、可验证的改动。

## Startup Workflow / 启动顺序

Before writing code:

1. 确认目录是 `D:\博客`。
2. 阅读 `README.md`、`feature_list.json`、`progress.md` 和最近的 `session-handoff.md`。
3. 查看当前工作树：`git status --short`。不要回滚用户或其他会话留下的改动。
4. 需要了解设计方向时，优先看 `docs/superpowers/specs/` 和 `docs/superpowers/plans/`。
5. 新任务需要记录范围时，复制 `docs/agent-task-template.md` 的结构到 `progress.md` 或任务文档。
6. 修改前先确认当前页面结构和样式位置，前端视觉改动完成后必须浏览器检查。

## 工作规则

- One feature at a time: 一次只推进 `feature_list.json` 中一个 `in-progress` 或明确选定的功能。
- 需求不清时，先问一个问题；不要一次抛出问题列表。
- 保持中文为主要可读语言；英文只在专有名词、技术名词、URL、命令和品牌名中使用。
- 视觉改动要使用真实图片或项目资产，避免纯装饰占位。
- 不改路由、导航语义、环境变量名或部署方式，除非用户明确要求。
- 手动编辑文件用 `apply_patch`；不要用临时脚本重写整文件。
- 发现无关脏改动时只记录，不要清理。
- Stay in scope: 只改当前功能需要的文件，跨模块重构、部署配置、内容模型变化都需要用户确认。
- Completion gate: 没有验证证据时，不要把功能状态改成 `done`。

## 验证命令

标准验证：

```bash
./init.sh
```

Windows PowerShell 可用：

```powershell
.\init.ps1
```

等价检查：

```bash
npm run build
git diff --check
```

Test command: 当前仓库没有单独的 `npm test` 脚本；把 `npm run build`、`git diff --check` 和必要的浏览器检查作为必须的 test / verify gate。

前端视觉改动还需要浏览器验证：

- 首页 `http://127.0.0.1:4321/`
- 作品页 `/projects/`
- 至少一个文章页和一个作品详情页
- 桌面和 390px 左右移动端都不能有横向溢出、文字重叠或图片明显裁坏

## Definition of Done / 完成标准

只有同时满足这些条件，才能说任务完成：

- 目标行为或视觉改动已经实现。
- `npm run build` 通过。
- `git diff --check` 通过，只有 LF/CRLF 提示可接受。
- 视觉任务完成了浏览器检查，并记录结果。
- `feature_list.json`、`progress.md` 或 `session-handoff.md` 写入证据、风险和下一步。
- 当前功能的 scope 已关闭，没有把未验证的延伸工作一起标为完成。

## End of Session / 会话收尾

Before ending:

结束前更新：

1. `feature_list.json` 的状态和证据。
2. `progress.md` 的当前状态、修改文件、验证结果。
3. `session-handoff.md` 的下一步和风险。

留下 restartable / clean restart path：下一次会话应能直接阅读 harness 文件并运行 `./init.sh` 或 `.\init.ps1`。不要为了“清理”而提交或回滚，除非用户明确要求。

## Harness 参考

- 任务模板：`docs/agent-task-template.md`
- 结构评估报告：`docs/harness-assessment.html`
