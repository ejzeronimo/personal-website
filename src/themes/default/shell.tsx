import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import { THEME_NAMES, type ThemeName } from '@/themes/registry'
import type { ThemeRootProps } from '@/themes/types'

export default function Shell({
  content,
  setTheme,
  children,
}: PropsWithChildren<ThemeRootProps>) {
  return (
    <>
      <header className="border-b">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-bold">
            {content.identity.name}
          </Link>
          <ul className="flex gap-6 text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <select
            onChange={(e) => setTheme(e.target.value as ThemeName)}
            defaultValue=""
            className="border px-2 py-1 text-sm"
          >
            <option value="" disabled>
              theme…
            </option>
            {THEME_NAMES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>
      <footer className="mx-auto max-w-5xl px-6 py-8 text-sm">
        {content.socials.map((s) => (
          <a
            key={s.kind}
            href={s.href}
            target="_blank"
            rel="noopener"
            className="mr-4"
          >
            {s.kind}
          </a>
        ))}
      </footer>
    </>
  )
}
