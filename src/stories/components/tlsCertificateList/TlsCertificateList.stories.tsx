import type { Meta, StoryObj } from '@storybook/react-vite'
import { TLSCertificateList } from '../../../components/tls-certificate-list'
import {
  certificateChain,
  certificateWithoutSan,
  expiredCertificate,
  singleCertificate,
} from './tlsCertificateList.mock'

/** Expandable list that inspects a TLS certificate chain, showing subject, issuer, validity and subject alternative names. */
const meta = {
  title: 'Components/TlsCertificateList',
  component: TLSCertificateList,
  tags: ['autodocs'],
  args: {
    tlsCertificates: certificateChain,
  },
} satisfies Meta<typeof TLSCertificateList>

export default meta
type Story = StoryObj<typeof meta>

/** A full certificate chain (leaf, intermediate, root). The first row is expanded by default; toggle the chevrons to inspect each certificate. */
export const Default: Story = {}

/** A single leaf certificate with subject alternative names. */
export const SingleCertificate: Story = {
  args: {
    tlsCertificates: singleCertificate,
  },
}

/** A certificate without any subject alternative names. */
export const WithoutSubjectAlternativeNames: Story = {
  args: {
    tlsCertificates: certificateWithoutSan,
  },
}

/** An expired certificate — its "Expires" date is in the past. */
export const Expired: Story = {
  args: {
    tlsCertificates: expiredCertificate,
  },
}

/** No certificates provided. */
export const Empty: Story = {
  args: {
    tlsCertificates: [],
  },
}
