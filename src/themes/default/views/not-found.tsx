import type { SiteContent } from '@/content/types'
import { Link } from 'react-router-dom'

import { useTitle } from '@/hooks/use-title'

export default function NotFound(_: { content: SiteContent }) {
  useTitle('Not Found')
  return (
    <>
      <h1 className="text-3xl font-bold">Not Found</h1>
      <p className="mt-2">That page doesn't exist.</p>
      <p className="mt-4">
        <Link to="/">← Home</Link>
      </p>
    </>
  )
}
