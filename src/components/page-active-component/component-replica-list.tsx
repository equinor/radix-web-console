import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { ReplicaList } from '../replica-list';
import {
  ReplicaSummaryNormalizedModel,
  ReplicaSummaryNormalizedModelValidationMap,
} from '../../models/radix-api/deployments/replica-summary';
import { getReplicaUrl } from '../../utils/routing';

export interface ComponentReplicaListProps {
  title: string;
  appName: string;
  envName: string;
  componentName: string;
  replicaList?: Array<ReplicaSummaryNormalizedModel>;
  isExpanded?: boolean;
}

function replicaUrlFuncFactory(
  appName: string,
  envName: string,
  componentName: string
): (replicaName: string) => string {
  return function (replicaName) {
    return getReplicaUrl(appName, envName, componentName, replicaName);
  };
}

export const ComponentReplicaList = ({
  title,
  appName,
  envName,
  componentName,
  replicaList,
  isExpanded,
}: ComponentReplicaListProps): React.JSX.Element => (
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
              replicaUrlFunc={replicaUrlFuncFactory(
                appName,
                envName,
                componentName
              )}
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
    PropTypes.shape(ReplicaSummaryNormalizedModelValidationMap)
  ),
  isExpanded: PropTypes.bool,
} as PropTypes.ValidationMap<ComponentReplicaListProps>;
