import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';

import { ReplicaList } from '../replica-list';
import type { ReplicaSummary } from '../../store/radix-api';
import { getReplicaUrl } from '../../utils/routing';

export const ComponentReplicaList: FunctionComponent<{
  title: string;
  appName: string;
  envName: string;
  componentName: string;
  replicaList?: Array<ReplicaSummary>;
  isExpanded?: boolean;
}> = ({ title, appName, envName, componentName, replicaList, isExpanded }) => (
  <Accordion className="accordion elevated" chevronPosition="right">
    <Accordion.Item isExpanded={isExpanded}>
      <Accordion.Header>
        <Accordion.HeaderTitle>
          <Typography className="whitespace-nowrap" variant="h4" as="span">
            {title}
          </Typography>
        </Accordion.HeaderTitle>
      </Accordion.Header>
      <Accordion.Panel>
        <div className="grid">
          {replicaList?.length > 0 ? (
            <ReplicaList
              replicaList={replicaList}
              replicaUrlFunc={(name) =>
                getReplicaUrl(appName, envName, componentName, name)
              }
            />
          ) : (
            <Typography>This component has no replicas</Typography>
          )}
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);

ComponentReplicaList.propTypes = {
  title: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  replicaList: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<ReplicaSummary>
  ),
  isExpanded: PropTypes.bool,
};
