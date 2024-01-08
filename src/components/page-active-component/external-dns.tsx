import { Accordion, Icon, Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { ExternalDns, Tls } from '../../store/radix-api';
import { ExternalDnsAliasHelp } from '../external-dns-alias-help';
import { ExternalDNSStatusBadge } from '../status-badges/external-dns-status-badge';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import clsx from 'clsx';
import { TLSCertificateList } from '../tls-certificate-list';
import { Alert, AlertProps } from '../alert';
import { differenceInDays } from 'date-fns';
import { pluraliser } from '../../utils/string';
import { dataSorter, sortCompareString } from '../../utils/sort-utils';

const dayPluraliser = pluraliser('day', 'days');

function useGetSortedExternalDNS(
  externalDNSList: Array<ExternalDns>
): Array<ExternalDns> {
  const [sortedData, setSortedData] = useState(externalDNSList);

  useEffect(() => {
    setSortedData(
      dataSorter(externalDNSList, [(x, y) => sortCompareString(x.fqdn, y.fqdn)])
    );
  }, [externalDNSList]);

  return sortedData;
}

const AlertTemplates: Record<Tls['certificateStatus'], AlertProps> = {
  Pending: { type: 'info' },
  Consistent: { type: 'info' },
  Invalid: { type: 'danger' },
};

const StatusMessages: FunctionComponent<{
  status: Tls['certificateStatus'];
  messages: Array<string>;
}> = ({ status, messages }) => (
  <Alert {...AlertTemplates[status]}>
    <div className="grid grid--gap-medium">
      {messages.map((msg, i) => (
        <Typography key={i}>{msg}</Typography>
      ))}
    </div>
  </Alert>
);

const CertificateExpiry: FunctionComponent<{ expires: string }> = ({
  expires,
}) => {
  const expiresIn = differenceInDays(new Date(expires), new Date());
  return <>{dayPluraliser(expiresIn)}</>;
};

export const ExternalDNS: FunctionComponent<{
  appName: string;
  envName: string;
  componentName: string;
  externalDNSList: Array<ExternalDns>;
}> = ({ appName, envName, componentName, externalDNSList }) => {
  const sortedExternalDNSList = useGetSortedExternalDNS(externalDNSList);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const expandRow = useCallback<(name: string) => void>(
    (name) => setExpandedRows((x) => ({ ...x, [name]: !x[name] })),
    []
  );

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={false}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              External DNS ({sortedExternalDNSList?.length})
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--gap-large">
            <ExternalDnsAliasHelp />
            <Table>
              <Table.Head>
                <Table.Cell width={40} />
                <Table.Cell>FQDN</Table.Cell>
                <Table.Cell>Expires</Table.Cell>
                <Table.Cell>Status</Table.Cell>
              </Table.Head>
              <Table.Body>
                {sortedExternalDNSList
                  ?.map((v) => ({
                    externalDNS: v,
                    hasCertificates: v.tls.certificates?.length > 0,
                    certificateExpiry:
                      v.tls.certificates?.length > 0
                        ? v.tls.certificates[0].notAfter
                        : null,
                    hasMessages: v.tls.certificateStatusMessages?.length > 0,
                    expanded: !!expandedRows[v.fqdn],
                  }))
                  .map(
                    ({
                      externalDNS,
                      hasCertificates,
                      certificateExpiry,
                      hasMessages,
                      expanded,
                    }) => (
                      <Fragment key={externalDNS.fqdn}>
                        <Table.Row
                          className={clsx({
                            'border-bottom-transparent': expanded,
                          })}
                        >
                          <Table.Cell className="fitwidth padding-right-0">
                            {(hasCertificates || hasMessages) && (
                              <Typography
                                link
                                as="span"
                                onClick={() => expandRow(externalDNS.fqdn)}
                              >
                                <Icon
                                  data={expanded ? chevron_up : chevron_down}
                                  role="button"
                                  title="Toggle more information"
                                />
                              </Typography>
                            )}
                          </Table.Cell>
                          <Table.Cell>{externalDNS.fqdn}</Table.Cell>
                          <Table.Cell>
                            <CertificateExpiry expires={certificateExpiry} />
                          </Table.Cell>
                          <Table.Cell>
                            <ExternalDNSStatusBadge
                              status={externalDNS.tls.certificateStatus}
                            />
                          </Table.Cell>
                        </Table.Row>
                        {expanded && (
                          <Table.Row>
                            <Table.Cell />
                            <Table.Cell colSpan={3}>
                              <div
                                className="grid grid--gap-medium"
                                style={{ margin: '16px 0' }}
                              >
                                {hasMessages && (
                                  <StatusMessages
                                    status={externalDNS.tls.certificateStatus}
                                    messages={
                                      externalDNS.tls.certificateStatusMessages
                                    }
                                  />
                                )}
                                {hasCertificates && (
                                  <TLSCertificateList
                                    tlsCertificates={
                                      externalDNS.tls.certificates
                                    }
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
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

ExternalDNS.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  externalDNSList: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<ExternalDns>
  ),
};
