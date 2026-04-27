import { lazy, StrictMode, Suspense, useEffect, useState } from 'react'

import './styles/global.css'

import { loadContent } from '@/content/loader'
import type { SiteContent } from '@/content/types'
import Cookies from 'js-cookie'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import {
  isThemeName,
  THEME_NAMES,
  themes,
  type ThemeName,
} from '@/themes/registry'

const STALE_MS = 1000 * 60 * 60 * 24 * 14

function pickInitialTheme(): ThemeName {
  const stored = Cookies.get('theme')
  const lastVisit = parseInt(Cookies.get('theme_lastVisit') ?? '0', 10)
  const isStale = !lastVisit || Date.now() - lastVisit > STALE_MS
  if (isThemeName(stored) && !isStale) return stored
  return THEME_NAMES[Math.floor(Math.random() * THEME_NAMES.length)]
}

function persistTheme(name: ThemeName) {
  Cookies.set('theme', name, { expires: 365, sameSite: 'lax' })
  Cookies.set('theme_lastVisit', String(Date.now()), {
    expires: 365,
    sameSite: 'lax',
  })
}
function App() {
  const [theme, setTheme] = useState<ThemeName>(pickInitialTheme)
  const [content, setContent] = useState<SiteContent | null>(null)

  useEffect(() => {
    loadContent().then(setContent)
  }, [])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    persistTheme(theme)
  }, [theme])
  useEffect(() => {
    if (content) document.title = content.identity.name
  }, [content])

  if (!content) return null
  const ThemeRoot = lazy(themes[theme])
  return (
    <Suspense fallback={null}>
      <ThemeRoot content={content} setTheme={setTheme} />
    </Suspense>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
)
