import { cloud, info_circle, library_books, support } from '@equinor/eds-icons'
import { externalUrls } from '../../externalUrls'
import { routes } from '../../router/routes'
import type { NavAction } from './globalTopNav.types'

export const NAV_ACTIONS: readonly NavAction[] = [
  {
    id: 'documentation',
    label: 'Documentation',
    shortLabel: 'Docs',
    icon: library_books,
    href: externalUrls.documentation,
    isExternal: true,
  },
  {
    id: 'about',
    label: 'About',
    shortLabel: 'About',
    icon: cloud,
    href: routes.about,
    isExternal: false,
  },
  {
    id: 'support',
    label: 'Support',
    shortLabel: 'Support',
    icon: support,
    href: routes.support,
    isExternal: false,
  },
] as const
