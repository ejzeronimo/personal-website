import type { ComponentType } from 'react'

import type { ThemeRootProps } from './types'

export const themes = {
  default: () => import('@/themes/default/root'),
  // cockpit: () => import('@/themes/cockpit/Root'),
} as const satisfies Record<
  string,
  () => Promise<{ default: ComponentType<ThemeRootProps> }>
>

export type ThemeName = keyof typeof themes
export const THEME_NAMES = Object.keys(themes) as ThemeName[]

export function isThemeName(s: unknown): s is ThemeName {
  return typeof s === 'string' && (THEME_NAMES as string[]).includes(s)
}
