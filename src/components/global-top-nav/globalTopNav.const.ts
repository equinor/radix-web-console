import { github, info_circle, library_books } from '@equinor/eds-icons'
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
    icon: info_circle,
    href: routes.about,
    isExternal: false,
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: github,
    href: externalUrls.githubIssues,
    isExternal: true,
  },
] as const
