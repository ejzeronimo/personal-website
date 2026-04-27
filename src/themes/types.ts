import type { SiteContent } from '@/content/types'

import type { ThemeName } from './registry'

export type ThemeRootProps = {
  content: SiteContent
  setTheme: (name: ThemeName) => void
}
