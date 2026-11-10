import { Button, type ButtonProps, CircularProgress } from '@equinor/eds-core-react'

interface ApplyConfigButtonProps {
  readonly onClick: () => void
  /** Shows a spinner and disables the button while the apply request is in flight. */
  readonly isApplying: boolean
  /** Use when a previous attempt failed, changes the label to a retry. */
  readonly isRetry?: boolean
  readonly variant?: ButtonProps['variant']
}

/** The "apply config" call to action, shared by the onboarding banner and panel. Owns all its labels. */
export const ApplyConfigButton = (props: ApplyConfigButtonProps) => {
  const { onClick, isApplying, isRetry = false, variant = 'contained' } = props

  if (isApplying) {
    return (
      <Button variant={variant} disabled>
        <CircularProgress size={16} /> Applying...
      </Button>
    )
  }

  return (
    <Button variant={variant} onClick={onClick}>
      {isRetry ? 'Apply config again' : 'Apply config'}
    </Button>
  )
}
