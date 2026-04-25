import { Client, isFullPage } from "@notionhq/client";
import type {
  DatabaseObjectResponse,
  PageObjectResponse,
  RichTextItemResponse
} from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";

export interface Post {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  publishedAt: string;
  summary: string;
  coverUrl?: string;
}

type NotionFileLike = {
  type?: string;
  external?: { url?: string };
  file?: { url?: string };
};

type FilesPropertyLike = {
  type?: string;
  files?: NotionFileLike[];
};

const notionToken = process.env.NOTION_TOKEN?.trim();
const notionDatabaseId = process.env.NOTION_DATABASE_ID?.trim();

const notion = new Client({ auth: notionToken });
const notionToMarkdown = new NotionToMarkdown({ notionClient: notion });

let cachedPosts: Post[] | null = null;
let hasWarnedMissingEnv = false;
const shouldCachePosts = import.meta.env.PROD;

function hasNotionEnv() {
  return Boolean(notionToken && notionDatabaseId);
}

function warnMissingEnv() {
  if (hasWarnedMissingEnv) {
    return;
  }
  hasWarnedMissingEnv = true;
  console.warn(
    "[notion] Missing NOTION_TOKEN or NOTION_DATABASE_ID. Returning empty content."
  );
}

function readPlainText(items: RichTextItemResponse[] = []) {
  return items.map((item) => item.plain_text).join("").trim();
}

function readFileUrl(file?: NotionFileLike | null) {
  if (!file) {
    return undefined;
  }
  if (file.type === "external") {
    return file.external?.url?.trim() || undefined;
  }
  if (file.type === "file") {
    return file.file?.url?.trim() || undefined;
  }
  return undefined;
}

function readCoverUrl(page: PageObjectResponse) {
  const properties = page.properties as Record<string, unknown>;
  const preferredKeys = ["Cover", "Image", "Photo", "Banner", "Media"];

  const preferredProperty = preferredKeys
    .map((key) => properties[key])
    .find(
      (item): item is FilesPropertyLike =>
        (item as FilesPropertyLike | undefined)?.type === "files"
    );

  const firstFilesProperty = Object.values(properties).find(
    (item): item is FilesPropertyLike =>
      (item as FilesPropertyLike | undefined)?.type === "files"
  );

  const fileCandidates = preferredProperty?.files ?? firstFilesProperty?.files;
  if (Array.isArray(fileCandidates)) {
    for (const file of fileCandidates) {
      const url = readFileUrl(file);
      if (url) {
        return url;
      }
    }
  }

  return readFileUrl(page.cover as NotionFileLike | null | undefined);
}

function readPostFromPage(page: PageObjectResponse): Post {
  const titleProperty = page.properties.Title;
  const slugProperty = page.properties.Slug;
  const statusProperty = page.properties.Status;
  const tagsProperty = page.properties.Tags;
  const publishedAtProperty = page.properties.PublishedAt;
  const summaryProperty = page.properties.Summary;

  const title =
    titleProperty?.type === "title" ? readPlainText(titleProperty.title) : "";
  const slug =
    slugProperty?.type === "rich_text"
      ? readPlainText(slugProperty.rich_text)
      : "";
  const tags =
    tagsProperty?.type === "multi_select"
      ? tagsProperty.multi_select.map((item) => item.name)
      : [];
  const publishedAt =
    publishedAtProperty?.type === "date" && publishedAtProperty.date?.start
      ? publishedAtProperty.date.start
      : page.created_time;
  const summary =
    summaryProperty?.type === "rich_text"
      ? readPlainText(summaryProperty.rich_text)
      : "";
  const coverUrl = readCoverUrl(page);

  const statusName =
    statusProperty?.type === "select"
      ? statusProperty.select?.name
      : statusProperty?.type === "status"
        ? statusProperty.status?.name
        : undefined;

  if (statusName && statusName !== "Published") {
    throw new Error(`Page ${page.id} is not published.`);
  }

  return {
    id: page.id,
    title: title || "Untitled",
    slug: slug || page.id.replace(/-/g, ""),
    tags,
    publishedAt,
    summary,
    coverUrl
  };
}

async function queryPublishedPages() {
  if (!hasNotionEnv()) {
    warnMissingEnv();
    return [];
  }
  const databaseId = notionDatabaseId as string;
  const database = (await notion.databases.retrieve({
    database_id: databaseId
  })) as DatabaseObjectResponse;
  const statusProperty = database.properties.Status;
  const statusFilter =
    statusProperty?.type === "status"
      ? {
          property: "Status" as const,
          status: { equals: "Published" as const }
        }
      : {
          property: "Status" as const,
          select: { equals: "Published" as const }
        };

  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: statusFilter,
      sorts: [{ property: "PublishedAt", direction: "descending" }],
      start_cursor: cursor
    });

    for (const result of response.results) {
      if (isFullPage(result)) {
        pages.push(result);
      }
    }

    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return pages;
}

export async function getAllPosts() {
  if (shouldCachePosts && cachedPosts) {
    return cachedPosts;
  }

  const pages = await queryPublishedPages();
  const posts = pages.map(readPostFromPage).sort((a, b) => {
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  if (shouldCachePosts) {
    cachedPosts = posts;
  }
  return posts;
}

export async function getPostBySlug(slug: string) {
  const allPosts = await getAllPosts();
  const targetSlug = slug.trim().toLowerCase();
  return allPosts.find((post) => post.slug.toLowerCase() === targetSlug) ?? null;
}

export async function getPostContent(pageId: string) {
  if (!hasNotionEnv()) {
    warnMissingEnv();
    return "Notion content is unavailable because environment variables are missing.";
  }
  const mdBlocks = await notionToMarkdown.pageToMarkdown(pageId);
  const mdOutput = notionToMarkdown.toMarkdownString(mdBlocks);
  return typeof mdOutput === "string" ? mdOutput : mdOutput.parent;
}

export async function getAllTags() {
  const posts = await getAllPosts();
  const tags = new Set<string>();

  for (const post of posts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }

  return [...tags].sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
}
