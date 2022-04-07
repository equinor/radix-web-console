import { Icon, Table, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ReplicaImage } from '../replica-image';
import { ReplicaStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  ReplicaSummaryNormalizedModel,
  ReplicaSummaryNormalizedModelValidationMap,
} from '../../models/replica-summary';
import { smallReplicaName } from '../../utils/string';

export interface ReplicaListRowProps {
  replica: ReplicaSummaryNormalizedModel;
  replicaLink: string;
  lastUpdate: Date;
  toggleExpand: (name: string) => void;
  isExpanded?: boolean;
}

export const ReplicaListRow = ({
  replica,
  replicaLink,
  lastUpdate,
  toggleExpand,
  isExpanded,
}: ReplicaListRowProps): JSX.Element => (
  <>
    <Table.Row
      {...(isExpanded && {
        className: 'replica-list-row__expanded',
      })}
    >
      <Table.Cell className={`fitwidth padding-right-0`} variant="icon">
        <Typography link as="span" onClick={() => toggleExpand(replica.name)}>
          <Icon
            size={24}
            data={isExpanded ? chevron_up : chevron_down}
            role="button"
            title="Toggle more information"
          />
        </Typography>
      </Table.Cell>
      <Table.Cell>
        <Link to={replicaLink}>
          <Typography link as="span">
            {smallReplicaName(replica.name)}{' '}
          </Typography>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <ReplicaStatusBadge status={replica?.status} />
      </Table.Cell>
      <Table.Cell>
        <RelativeToNow time={replica.created} />
      </Table.Cell>
      <Table.Cell>
        <Duration start={replica.created} end={lastUpdate} />
      </Table.Cell>
    </Table.Row>
    {isExpanded && (
      <Table.Row>
        <Table.Cell />
        <Table.Cell colSpan={4}>
          <div className="grid grid--gap-medium">
            <span />
            <ReplicaImage replica={replica} />
            <span />
          </div>
        </Table.Cell>
      </Table.Row>
    )}
  </>
);

ReplicaListRow.propTypes = {
  replica: PropTypes.shape(ReplicaSummaryNormalizedModelValidationMap)
    .isRequired,
  replicaLink: PropTypes.string.isRequired,
  lastUpdate: PropTypes.instanceOf(Date).isRequired,
  toggleExpand: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool,
} as PropTypes.ValidationMap<ReplicaListRowProps>;
