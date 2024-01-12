import {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import * as PropTypes from 'prop-types';
import { Checkbox, Icon, Table, Typography } from '@equinor/eds-core-react';
import { ExternalDns, Tls } from '../../store/radix-api';
import { ExternalDNSStatusBadge } from '../status-badges';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import clsx from 'clsx';
import { TLSCertificateList } from '../tls-certificate-list';
import { Alert, AlertProps } from '../alert';
import { differenceInDays } from 'date-fns';
import { pluraliser } from '../../utils/string';
import { dataSorter, sortCompareString } from '../../utils/sort-utils';

const dayPluraliser = pluraliser('day', 'days');

const AlertTemplates: Record<Tls['status'], AlertProps> = {
  Pending: { type: 'info' },
  Consistent: { type: 'info' },
  Invalid: { type: 'danger' },
};

const StatusMessages: FunctionComponent<{
  status: Tls['status'];
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

export const ExternalDNSList: FunctionComponent<{
  externalDnsList: Array<ExternalDns>;
  fqdnElem?: (externalDns: ExternalDns) => React.JSX.Element;
}> = ({ externalDnsList, fqdnElem }) => {
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
          <Table.Cell>FQDN</Table.Cell>
          <Table.Cell width={150}>Expires</Table.Cell>
          <Table.Cell width={150}>Status</Table.Cell>
          <Table.Cell width={150}>TLS Automation</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sortedExternalDnsList
          ?.map((v) => ({
            externalDNS: v,
            hasCertificates: v.tls.certificates?.length > 0,
            certificateExpiry:
              v.tls.certificates?.length > 0
                ? v.tls.certificates[0].notAfter
                : null,
            hasMessages: v.tls.statusMessages?.length > 0,
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
                  <Table.Cell>
                    {fqdnElem ? (
                      fqdnElem(externalDNS)
                    ) : (
                      <Typography>{externalDNS.fqdn}</Typography>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {certificateExpiry && (
                      <CertificateExpiry expires={certificateExpiry} />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <ExternalDNSStatusBadge status={externalDNS.tls.status} />
                  </Table.Cell>
                  <Table.Cell>
                    <Checkbox
                      disabled
                      checked={externalDNS.tls.useAutomation}
                    ></Checkbox>
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
                        {hasMessages && (
                          <StatusMessages
                            status={externalDNS.tls.status}
                            messages={externalDNS.tls.statusMessages}
                          />
                        )}
                        {hasCertificates && (
                          <TLSCertificateList
                            tlsCertificates={externalDNS.tls.certificates}
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
  fqdnElem: PropTypes.func,
};
