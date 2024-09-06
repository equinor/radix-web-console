import {
  Fragment,
  type FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { Icon, Table, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import clsx from 'clsx';
import { differenceInDays } from 'date-fns';
import * as PropTypes from 'prop-types';
import type { ExternalDns, Tls, TlsAutomation } from '../../store/radix-api';
import { dataSorter, sortCompareString } from '../../utils/sort-utils';
import { pluraliser } from '../../utils/string';
import { Alert, type AlertProps } from '../alert';
import { ExternalDNSStatusBadge } from '../status-badges';
import { TLSAutomationStatusBadge } from '../status-badges/tls-automation-status-badge';
import { TLSCertificateList } from '../tls-certificate-list';

type TlsStatus = Tls['status'];

const StatusMessageAlertTemplate = {
  Pending: { type: 'info' },
  Consistent: { type: 'info' },
  Invalid: { type: 'danger' },
} satisfies Record<TlsStatus, AlertProps>;

type StatusMessagesProps = {
  status: TlsStatus;
  messages: Array<string>;
};

function StatusMessages({ status, messages }: StatusMessagesProps) {
  return (
    <Alert {...StatusMessageAlertTemplate[status]}>
      <div className="grid grid--gap-medium">
        {messages.map((msg, i) => (
          <Typography key={i}>{msg}</Typography>
        ))}
      </div>
    </Alert>
  );
}

type AutomationStatus = TlsAutomation['status'] | 'Unknown';

const TlsAutomationMessageAlertTemplate = {
  Pending: { type: 'warning' },
  Success: { type: 'info' },
  Failed: { type: 'danger' },
  Unknown: { type: 'warning' },
} satisfies Record<AutomationStatus, AlertProps>;

type TlsAutomationMessageProps = {
  status: AutomationStatus;
  message: string;
};

function TlsAutomationStatusMessage({
  status,
  message,
}: TlsAutomationMessageProps) {
  return (
    <Alert {...TlsAutomationMessageAlertTemplate[status]}>
      <div className="grid grid--gap-medium">
        <Typography>{message}</Typography>
      </div>
    </Alert>
  );
}

const dayPluraliser = pluraliser('day', 'days');

export const ExternalDNSList: FunctionComponent<{
  externalDnsList: Array<ExternalDns>;
  onItemClick?: (item: ExternalDns) => void;
}> = ({ externalDnsList, onItemClick }) => {
  const sortedExternalDnsList = useMemo(
    () =>
      dataSorter(externalDnsList, [
        (x, y) => sortCompareString(x.fqdn, y.fqdn),
      ]),
    [externalDnsList]
  );
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const expandRow = useCallback<(name: string) => void>(
    (name) => setExpandedRows((x) => ({ ...x, [name]: !x[name] })),
    []
  );

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell width={40} />
          <Table.Cell>Alias</Table.Cell>
          <Table.Cell width={150}>Expires</Table.Cell>
          <Table.Cell width={150}>Certificate</Table.Cell>
          <Table.Cell width={190} style={{ textAlign: 'center' }}>
            Certificate Automation
          </Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sortedExternalDnsList
          ?.map((v) => ({
            externalDns: v,
            hasCertificates: v.tls.certificates?.length > 0,
            certificateExpiry:
              v.tls.certificates?.length > 0
                ? v.tls.certificates[0].notAfter
                : null,
            hasMessages: v.tls.statusMessages?.length > 0,
            hasAutomationMessage: v.tls.automation?.message?.length > 0,
            expanded: !!expandedRows[v.fqdn],
          }))
          .map(
            ({
              externalDns,
              hasCertificates,
              certificateExpiry,
              hasMessages,
              hasAutomationMessage,
              expanded,
            }) => (
              <Fragment key={externalDns.fqdn}>
                <Table.Row
                  className={clsx({
                    'border-bottom-transparent': expanded,
                  })}
                >
                  <Table.Cell className="fitwidth padding-right-0">
                    {(hasCertificates ||
                      hasMessages ||
                      hasAutomationMessage) && (
                      <Typography
                        link
                        as="span"
                        onClick={() => expandRow(externalDns.fqdn)}
                      >
                        <Icon
                          data={expanded ? chevron_up : chevron_down}
                          role="button"
                          title="Toggle more information"
                        />
                      </Typography>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Typography
                      link={!externalDns.tls.useAutomation && !!onItemClick}
                      onClick={() => onItemClick?.(externalDns)}
                      token={{ textDecoration: 'none' }}
                    >
                      {externalDns.fqdn}
                    </Typography>
                  </Table.Cell>
                  <Table.Cell>
                    {certificateExpiry && (
                      <>
                        {dayPluraliser(
                          differenceInDays(
                            new Date(certificateExpiry),
                            new Date()
                          )
                        )}
                      </>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <ExternalDNSStatusBadge status={externalDns.tls.status} />
                  </Table.Cell>
                  <Table.Cell style={{ textAlign: 'center' }}>
                    {externalDns.tls.useAutomation && (
                      <Typography as="span" color="primary">
                        <TLSAutomationStatusBadge
                          status={
                            externalDns.tls.automation?.status || 'Unknown'
                          }
                        />
                      </Typography>
                    )}
                  </Table.Cell>
                </Table.Row>
                {expanded && (
                  <Table.Row>
                    <Table.Cell />
                    <Table.Cell colSpan={4}>
                      <div
                        className="grid grid--gap-medium"
                        style={{ margin: '16px 0' }}
                      >
                        {hasAutomationMessage && (
                          <TlsAutomationStatusMessage
                            status={
                              externalDns.tls.automation?.status || 'Unknown'
                            }
                            message={externalDns.tls.automation?.message}
                          />
                        )}
                        {hasMessages && (
                          <StatusMessages
                            status={externalDns.tls.status}
                            messages={externalDns.tls.statusMessages}
                          />
                        )}
                        {hasCertificates && (
                          <TLSCertificateList
                            tlsCertificates={externalDns.tls.certificates}
                          />
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Fragment>
            )
          )}
      </Table.Body>
    </Table>
  );
};

ExternalDNSList.propTypes = {
  externalDnsList: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<ExternalDns>
  ).isRequired,
  onItemClick: PropTypes.func,
};
