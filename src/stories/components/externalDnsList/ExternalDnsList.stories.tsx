import type { Meta, StoryObj } from '@storybook/react-vite'
import { ExternalDNSList } from '../../../components/external-dns-list'
import { mockedExternalDnsList } from './externalDnsList.mock'

const meta = {
  title: 'Components/ExternalDnsList',
  component: ExternalDNSList,
  tags: ['autodocs'],
  args: {
    externalDnsList: mockedExternalDnsList,
  },
} satisfies Meta<typeof ExternalDNSList>

export default meta
type Story = StoryObj<typeof meta>

/** Mixed list covering manual and automated TLS across every status. Expand a row to reveal certificates and status/automation messages. */
export const Default: Story = {}

/** Manually managed TLS certificates: valid, pending (not yet provided) and invalid with error messages. */
export const ManualCertificates: Story = {
  args: {
    externalDnsList: mockedExternalDnsList.filter((x) => !x.tls.useAutomation),
  },
}

/** Automated (ACME) TLS in its success, pending, failed and unknown states. */
export const AutomatedCertificates: Story = {
  args: {
    externalDnsList: mockedExternalDnsList.filter((x) => x.tls.useAutomation),
  },
}

/** With `onItemClick` provided, aliases using manual TLS become clickable links. */
export const Clickable: Story = {
  args: {
    onItemClick: () => undefined,
  },
}

/** No external DNS aliases configured. */
export const Empty: Story = {
  args: {
    externalDnsList: [],
  },
}
