import { Icon, Tooltip, Typography } from '@equinor/eds-core-react';
import { library_books } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';
import { externalUrls } from '../../externalUrls';
import {
  type GetResourcesApiResponse,
  useGetResourcesQuery,
} from '../../store/radix-api';
import { formatDateTimeYear } from '../../utils/datetime';
import AsyncResource from '../async-resource/async-resource';

import './style.css';

function getPeriod({ from, to }: GetResourcesApiResponse): string {
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
  const { data: resources, ...state } = useGetResourcesQuery(
    { appName },
    { skip: !appName }
  );
  const formatCpuUsage = (value?: number): string => {
    if (!value) {
      return '-';
    }
    if (value >= 1) {
      return parseFloat(value.toPrecision(3)).toString();
    }

    let millicores = value * 1000;
    let formattedValue: string;
    if (millicores > 0.009) {
      formattedValue = parseFloat(millicores.toPrecision(3)).toString();
      return `${formattedValue}m`;
    }

    const significantDigits = 1;

    const exponent = Math.floor(Math.log10(value));
    const factor = 10 ** (-exponent + (significantDigits - 1));
    const roundedValue = Math.round(value * factor) / factor;
    millicores = roundedValue * 1000;
    formattedValue = millicores.toFixed(-Math.floor(Math.log10(millicores)));

    formattedValue = parseFloat(formattedValue).toString();
    return `${formattedValue}m`;
  };

  const formatMemoryUsage = (value?: number): string => {
    if (!value) {
      return '-';
    }
    const units = [
      { unit: 'P', size: 1e15 },
      { unit: 'T', size: 1e12 },
      { unit: 'G', size: 1e9 },
      { unit: 'M', size: 1e6 },
      { unit: 'k', size: 1e3 },
    ];

    let unit = ''; // Default to bytes

    // Determine the appropriate unit
    for (const u of units) {
      if (value >= u.size) {
        value = value / u.size;
        unit = u.unit;
        break;
      }
    }
    const formattedValue = parseFloat(value.toPrecision(3)).toString();
    return formattedValue + unit;
  };

  return (
    <div className="grid grid--gap-medium">
      <div className="grid grid--gap-medium grid--auto-columns">
        <Typography variant="h6"> Used resources</Typography>
        <Typography
          link
          href={externalUrls.resourcesDocs}
          rel="noopener noreferrer"
        >
          <Tooltip title="Read more in the documentation">
            <Icon data={library_books} />
          </Tooltip>
        </Typography>
      </div>
      <AsyncResource asyncState={state}>
        {resources ? (
          <div className="resources-section grid grid--gap-medium">
            <div className="grid grid--gap-small">
              <Typography variant="overline">Period</Typography>
              <Typography group="input" variant="text">
                {getPeriod(resources)}
              </Typography>
            </div>

            <div className="grid grid--gap-small grid--auto-columns">
              <div>
                <Typography>
                  CPU{' '}
                  <strong>
                    min {formatCpuUsage(resources?.cpu?.min)}, avg{' '}
                    {formatCpuUsage(resources?.cpu?.avg)}, max{' '}
                    {formatCpuUsage(resources?.cpu?.max)}
                  </strong>
                </Typography>
                <Typography>
                  Memory{' '}
                  <strong>
                    min {formatMemoryUsage(resources?.memory?.min)}, avg{' '}
                    {formatMemoryUsage(resources?.memory?.avg)}, max{' '}
                    {formatMemoryUsage(resources?.memory?.max)}
                  </strong>
                </Typography>
              </div>
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
