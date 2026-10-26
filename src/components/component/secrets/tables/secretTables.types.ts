import type { ReactNode } from 'react'
import type { Secret } from '../../../../store/radix-api'

export interface SecretTableProps {
  readonly appName: string
  readonly componentName: string
  readonly envName: string
  readonly secrets: ReadonlyArray<Secret>
}

export interface SecretTable {
  readonly title: string
  readonly Component: (props: SecretTableProps) => ReactNode
}

export interface SecretTableGroup extends SecretTable {
  readonly types: Array<Secret['type']>
}

export interface SecretTableItem extends SecretTable {
  readonly secrets: Array<Secret>
}
