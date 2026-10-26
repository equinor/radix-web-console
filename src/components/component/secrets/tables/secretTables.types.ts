import type { ReactNode } from 'react'
import type { Secret } from '../../../../store/radix-api'

export interface SecretTableProps {
  readonly appName: string
  readonly componentName: string
  readonly envName: string
  readonly secrets: ReadonlyArray<Secret>
}

interface SecretTable {
  readonly title: string
  readonly Component: (props: SecretTableProps) => ReactNode
}

/** Static configuration: which secret types are rendered by this table. */
export interface SecretTableDefinition extends SecretTable {
  readonly types: Array<Secret['type']>
}

/** A table populated with the secrets it should render, shown as one section. */
export interface SecretTableSection extends SecretTable {
  readonly secrets: Array<Secret>
}
