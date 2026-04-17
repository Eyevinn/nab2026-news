import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type Brief = {
  title: string;
  date: string;
  bodyHtml: string;
  bodyMarkdown: string;
};

const BRIEF_PATH = path.join(process.cwd(), "content", "brief.md");

export function getBrief(): Brief | null {
  if (!fs.existsSync(BRIEF_PATH)) return null;
  const raw = fs.readFileSync(BRIEF_PATH, "utf8");
  const { data, content } = matter(raw);
  if (!data.title || !data.date) return null;
  return {
    title: String(data.title),
    date: String(data.date),
    bodyMarkdown: content,
    bodyHtml: marked.parse(content, { async: false }) as string
  };
}
