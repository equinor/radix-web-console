import type { ReactNode } from 'react'
import type { Secret } from '../../../../store/radix-api'

export interface SecretTableProps {
  appName: string
  componentName: string
  envName: string
  secrets: Array<Secret>
}

export interface SecretTable {
  title: string
  Component: (props: SecretTableProps) => ReactNode
}

export interface SecretTableGroup extends SecretTable {
  types: Array<Secret['type']>
}

export interface SecretTableItem extends SecretTable {
  secrets: Array<Secret>
}
