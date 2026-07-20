import {
  type DialogActionsProps,
  type DialogContentProps,
  type DialogProps,
  Dialog as EDSDialog,
} from '@equinor/eds-core-react'
import clsx from 'clsx'
import { forwardRef } from 'react'
import styles from './dialog.module.css'

interface DialogRootProps extends DialogProps {
  /** Allows setting the width of the dialog. Accepts any valid CSS width value. */
  width?: string
  /** Enables medium gap between custom content elements when set to true. */
  contentAutoGap?: boolean
}
/**
 * Wrapper for EDS Dialog component that allows for custom styling and width.
 * It also provides compound components for the dialog's title, header, content, and actions.
 */
const DialogRoot = forwardRef<HTMLDivElement, DialogRootProps>(
  ({ className, width, contentAutoGap, ...props }, ref) => (
    <EDSDialog
      ref={ref}
      className={clsx(styles.dialog, { [styles.contentAutoGap]: contentAutoGap }, className)}
      {...props}
      style={{ '--contentWidth': width }}
    />
  )
)
DialogRoot.displayName = 'Dialog'

/** Override for Dialog.Actions */
const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>(({ className, ...props }, ref) => (
  <EDSDialog.Actions ref={ref} className={clsx(styles.actions, className)} {...props} />
))
DialogActions.displayName = 'Dialog.Actions'

/** Override for Dialog.CustomContent */
const DialogCustomContent = forwardRef<HTMLDivElement, DialogContentProps>(({ className, ...props }, ref) => (
  <EDSDialog.CustomContent ref={ref} className={clsx(styles.customContent, className)} {...props} />
))
DialogCustomContent.displayName = 'Dialog.CustomContent'

// Re-expose the compound parts. The EDS-owned parts are referenced explicitly,
// so if EDS renames or removes one this file fails to compile. API drift is
// caught at build time rather than at runtime.
export const Dialog = Object.assign(DialogRoot, {
  Title: EDSDialog.Title,
  Header: EDSDialog.Header,
  Content: DialogCustomContent,
  CustomContent: DialogCustomContent,
  Actions: DialogActions,
})
