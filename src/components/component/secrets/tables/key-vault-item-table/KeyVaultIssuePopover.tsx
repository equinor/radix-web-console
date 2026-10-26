import { Button, EdsProvider, Icon, Popover, Typography } from '@equinor/eds-core-react'
import { close } from '@equinor/eds-icons'
import clsx from 'clsx'
import { useState } from 'react'
import { ComponentSecretStatusBadge } from '../../../../status-badges'
import { getSecretDisplayName } from '../secretTables.utils'
import { KEY_VAULT_ISSUE_PRESENTATION } from './keyVaultIssuePopover.const'
import styles from './keyVaultIssuePopover.module.css'
import type { KeyVaultIssue } from './keyVaultSecretsTable.types'

interface KeyVaultIssuePopoverProps {
  readonly issue: KeyVaultIssue
}

export const KeyVaultIssuePopover = (props: KeyVaultIssuePopoverProps) => {
  const { issue } = props

  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const openPopover = () => setIsOpen(true)
  const closePopover = () => setIsOpen(false)

  const { severity, icon, title, triggerLabel } = KEY_VAULT_ISSUE_PRESENTATION[issue.kind]

  return (
    <>
      <EdsProvider density="compact">
        <Button
          variant="ghost_icon"
          color={severity === 'danger' ? 'danger' : undefined}
          className={clsx({ [styles.warningTrigger]: severity === 'warning' })}
          aria-haspopup
          aria-expanded={isOpen}
          aria-label={triggerLabel}
          ref={setAnchorEl}
          onClick={openPopover}
        >
          <Icon data={icon} />
        </Button>
      </EdsProvider>

      <Popover open={isOpen} anchorEl={anchorEl} onClose={closePopover}>
        <Popover.Header>
          <Popover.Title>{title}</Popover.Title>
          <Button variant="ghost_icon" aria-label="Close popover" onClick={closePopover}>
            <Icon data={close} />
          </Button>
        </Popover.Header>
        <Popover.Content>
          <KeyVaultIssueDescription issue={issue} />
        </Popover.Content>
      </Popover>
    </>
  )
}

const KeyVaultIssueDescription = (props: KeyVaultIssuePopoverProps) => {
  const { issue } = props

  if (issue.kind === 'missing-credentials') {
    return (
      <>
        <Typography variant="body_short">
          Some credentials for this Key Vault are missing. The Key Vault items can't be read until these are resolved:
        </Typography>
        <ul className={styles.credentialList}>
          {issue.inconsistentCredentials.map((credential) => (
            <li key={credential.name} className={styles.credentialItem}>
              <Typography as="span">{getSecretDisplayName(credential)}</Typography>
              <ComponentSecretStatusBadge status={credential.status} />
            </li>
          ))}
        </ul>
      </>
    )
  }

  if (issue.kind === 'no-items-available') {
    return (
      <Typography variant="body_short">
        None of the Key Vault items are available. Verify that they are configured correctly.
      </Typography>
    )
  }

  return <></>
}
