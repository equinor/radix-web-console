import { github, info_circle, library_books } from '@equinor/eds-icons'
import { externalUrls } from '../../externalUrls'
import { routes } from '../../router/routes'
import type { NavAction } from './globalTopNav.types'

export const RADIX_ISSUES_URL = 'https://github.com/equinor/radix/issues'

export const NAV_ACTIONS: readonly NavAction[] = [
  {
    id: 'documentation',
    label: 'Documentation',
    shortLabel: 'Docs',
    icon: library_books,
    href: externalUrls.documentation,
    isExternal: true,
    showInMobileMenu: true,
  },
  {
    id: 'about',
    label: 'About',
    icon: info_circle,
    href: routes.about,
    isExternal: false,
    showInMobileMenu: true,
  },
  {
    id: 'feedback',
    label: 'Give us feedback',
    icon: github,
    href: RADIX_ISSUES_URL,
    isExternal: true,
    showInMobileMenu: true,
    iconOnly: true,
  },
] as const
