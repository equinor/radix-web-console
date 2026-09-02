import type { ReactNode } from 'react'
import type { Secret } from '../../../../store/radix-api'

export type SecretTableProps = {
  appName: string
  componentName: string
  envName: string
  secrets: Array<Secret>
}

export type SecretTable = {
  title: string
  Component: (props: SecretTableProps) => ReactNode
}

export type SecretTableGroup = SecretTable & { types: Array<Secret['type']> }

export type SecretTableItem = SecretTable & { secrets: Array<Secret> }
