// Posts are plain markdown files in src/content/posts. Add a file, and it appears on Writing.
const modules = import.meta.glob('../content/posts/*.md', { eager: true });

export const posts = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: path.split('/').pop().replace(/\.md$/, ''),
    title: mod.frontmatter.title,
    date: String(mod.frontmatter.date),
    excerpt: mod.frontmatter.excerpt,
    Content: mod.Content,
  }))
  .sort((a, b) => b.date.localeCompare(a.date));
