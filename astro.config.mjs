import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "my-blog";
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER ?? "username";
const hasGithubEnv = Boolean(process.env.GITHUB_REPOSITORY);

export default defineConfig({
  site: `https://${repositoryOwner}.github.io/${repositoryName}`,
  base: hasGithubEnv ? `/${repositoryName}/` : "/",
  integrations: [tailwind(), sitemap()],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-light",
      themes: {
        light: "github-light",
        dark: "github-dark"
      },
      wrap: true
    }
  }
});
