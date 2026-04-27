import { lazy, Suspense } from 'react'
import type { SiteContent } from '@/content/types'
import { useParams } from 'react-router-dom'

import { useTitle } from '@/hooks/use-title'

export default function Post({ content }: { content: SiteContent }) {
  const { slug } = useParams<{ slug: string }>()
  const post = content.posts.find((p) => p.slug === slug)
  useTitle(post ? `${content.identity.name} — ${post.title}` : 'Not found')

  if (!post) return <p>Not found.</p>

  const Body = lazy(post.load)
  return (
    <article className="prose">
      <h1>{post.title}</h1>
      <Suspense fallback={null}>
        <Body />
      </Suspense>
    </article>
  )
}
