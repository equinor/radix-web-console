import { Tabs } from '@equinor/eds-core-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'

interface TabItemTemplateProps {
  href: string
  value: string
  children: ReactNode
}

export const TabItemTemplate = (props: TabItemTemplateProps) => {
  const { href, value, children, ...injectedTabProps } = props
  return (
    <Tabs.Tab as={Link} to={href} value={value} {...injectedTabProps}>
      {children}
    </Tabs.Tab>
  )
}
