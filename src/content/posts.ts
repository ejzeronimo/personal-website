import type { Post } from './types'

const meta = import.meta.glob('./posts/*.mdx', {
  eager: true,
  import: 'frontmatter',
}) as Record<string, Omit<Post, 'load'>>

const loaders = import.meta.glob('./posts/*.mdx')

export function loadPosts(): Post[] {
  return Object.entries(meta)
    .map(([path, fm]) => ({
      ...fm,
      load: loaders[path] as Post['load'],
    }))
    .sort((a, b) => b.date.localeCompare(a.date))
}
