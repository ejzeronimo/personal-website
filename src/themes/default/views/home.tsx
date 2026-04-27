import type { SiteContent } from '@/content/types'

import { useTitle } from '@/hooks/use-title'

import { Stars } from '../components/stars'

export default function Home({ content }: { content: SiteContent }) {
  useTitle(content.identity.name)
  return (
    <section>
      <h1 className="text-5xl font-bold">{content.identity.name}</h1>
      <h2 className="text-2xl">{content.identity.title}</h2>
      {content.about.tagline && <p className="mt-4">{content.about.tagline}</p>}

      <div className="relative h-screen w-full bg-[linear-gradient(0deg,var(--color-primary)0%,var(--color-secondary)100%)]">
        <div className="absolute z-9 flex h-screen w-full items-center justify-center">
          <div className="text-center">
            <h1 className="m-0 text-5xl font-bold text-(--text-primary)">
              Test
            </h1>
            <h2 className="m-0 text-2xl font-bold text-(--text-secondary)">
              Another test
            </h2>
          </div>
        </div>

        <Stars />
      </div>

      <main></main>
    </section>
  )
}
