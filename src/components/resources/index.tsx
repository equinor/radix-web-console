import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';
import {
  type ResourcesApiResponse,
  useResourcesQuery,
} from '../../store/radix-api';
import { formatDateTimeYear } from '../../utils/datetime';
import AsyncResource from '../async-resource/async-resource';

import './style.css';

function getPeriod({ from, to }: ResourcesApiResponse): string {
  return `${formatDateTimeYear(new Date(from))} - ${formatDateTimeYear(
    new Date(to)
  )}`;
}

export interface UsedResourcesProps {
  appName: string;
}

export const UsedResources: FunctionComponent<UsedResourcesProps> = ({
  appName,
}) => {
  const { data: resources, ...state } = useResourcesQuery(
    { appName },
    { skip: !appName }
  );

  return (
    <div className="grid grid--gap-medium">
      <Typography variant="h6">Used resources</Typography>
      <AsyncResource asyncState={state}>
        {resources ? (
          <div className="resources-section grid grid--gap-medium">
            <div className="grid grid--gap-small">
              <Typography variant="overline">Period</Typography>
              <Typography group="input" variant="text">
                {getPeriod(resources)}
              </Typography>
            </div>

            <div className="grid grid--gap-small">
              <>
                <Typography>
                  CPU{' '}
                  <strong>
                    min {resources?.cpu?.min ?? '-'}, max{' '}
                    {resources?.cpu?.max ?? '-'}, avg{' '}
                    {resources?.cpu?.average ?? '-'}
                  </strong>
                </Typography>
                <Typography>
                  Memory{' '}
                  <strong>
                    min {resources?.memory?.min ?? '-'}, max{' '}
                    {resources?.memory?.max ?? '-'}, avg{' '}
                    {resources?.memory?.average ?? '-'}
                  </strong>
                </Typography>
              </>
            </div>
          </div>
        ) : (
          <Typography variant="caption">No data</Typography>
        )}
      </AsyncResource>
    </div>
  );
};

UsedResources.propTypes = {
  appName: PropTypes.string.isRequired,
};
