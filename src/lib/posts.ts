import fs from "fs";
import path from "path";
import { marked } from "marked";

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  lang?: string;
  cover?: string;
  tags: string[];
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
}

export interface Post extends PostMeta {
  content: string;
  html: string;
}

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export function parseFrontmatter(fileContent: string): {
  data: Partial<PostFrontmatter>;
  content: string;
} {
  const normalized = fileContent.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---")) {
    return { data: {}, content: normalized };
  }

  const endMatch = normalized.indexOf("\n---", 3);
  if (endMatch === -1) {
    return { data: {}, content: normalized };
  }

  const frontmatterRaw = normalized.slice(3, endMatch).trim();
  const content = normalized.slice(endMatch + 4).replace(/^\n+/, "");

  const data: Record<string, any> = {};
  const lines = frontmatterRaw.split("\n");
  let currentKey: string | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    // List item under currentKey (e.g. - tag)
    if (currentKey && /^\s*-\s+/.test(line)) {
      const val = trimmed.replace(/^-\s+/, "").trim().replace(/^['"](.*)['"]$/, "$1");
      if (Array.isArray(data[currentKey])) {
        data[currentKey].push(val);
      } else {
        data[currentKey] = [val];
      }
      continue;
    }

    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let val = line.slice(colonIndex + 1).trim();

      if (!val) {
        currentKey = key;
        data[key] = [];
        continue;
      }

      currentKey = key;

      if (val.startsWith("[") && val.endsWith("]")) {
        const inner = val.slice(1, -1).trim();
        data[key] = inner
          ? inner
              .split(",")
              .map((item) => item.trim().replace(/^['"](.*)['"]$/, "$1"))
              .filter(Boolean)
          : [];
      } else if (key === "tags" && val.includes(",")) {
        data[key] = val
          .split(",")
          .map((item) => item.trim().replace(/^['"](.*)['"]$/, "$1"))
          .filter(Boolean);
      } else if (key === "tags") {
        const cleaned = val.replace(/^['"](.*)['"]$/, "$1");
        data[key] = cleaned ? [cleaned] : [];
      } else {
        data[key] = val.replace(/^['"](.*)['"]$/, "$1");
      }
    }
  }

  return {
    data: {
      title: data.title,
      description: data.description,
      date: data.date ? String(data.date) : undefined,
      lang: data.lang,
      cover: data.cover,
      tags: Array.isArray(data.tags)
        ? data.tags
        : data.tags
        ? [String(data.tags)]
        : [],
    },
    content,
  };
}

export function getPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith(".md"));
  const posts: PostMeta[] = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const filePath = path.join(POSTS_DIR, file);
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = parseFrontmatter(raw);

      posts.push({
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || "",
        lang: data.lang,
        cover: data.cover,
        tags: data.tags || [],
      });
    } catch (e) {
      console.error(`Error reading post ${file}:`, e);
    }
  }

  return posts.sort((a, b) => {
    const timeA = a.date ? new Date(a.date).getTime() : 0;
    const timeB = b.date ? new Date(b.date).getTime() : 0;
    return timeB - timeA;
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const safeSlug = path.basename(slug);
  const filePath = path.join(POSTS_DIR, `${safeSlug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = parseFrontmatter(raw);

    marked.use({
      gfm: true,
    });

    const html = await marked.parse(content);

    return {
      slug: safeSlug,
      title: data.title || safeSlug,
      description: data.description || "",
      date: data.date || "",
      lang: data.lang,
      cover: data.cover,
      tags: data.tags || [],
      content,
      html,
    };
  } catch (e) {
    console.error(`Error loading post ${safeSlug}:`, e);
    return null;
  }
}
