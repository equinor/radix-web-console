import { Typography } from '@equinor/eds-core-react';
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
import { library_books } from '@equinor/eds-icons';
import { ExternalLink } from '../link/external-link';

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

    const millicores = value * 1000.0;
    let formattedValue: string;
    if (millicores >= 1.0) {
      formattedValue = parseFloat(millicores.toPrecision(3)).toString();
      return `${formattedValue}m`;
    }
    let mcStr = millicores.toFixed(20); // Use 20 decimal places to ensure precision
    mcStr = mcStr.replace(/0+$/, '');
    // Find the position of the decimal point
    const decimalIndex = mcStr.indexOf('.');
    // Find the index of the first non-zero digit after the decimal point
    let firstNonZeroIndex = -1;
    for (let i = decimalIndex + 1; i < mcStr.length; i++) {
      if (mcStr[i] !== '0') {
        firstNonZeroIndex = i;
        break;
      }
    }
    if (firstNonZeroIndex === -1) {
      return '0m';
    }
    // Create a new number where the digit at firstNonZeroIndex becomes the first decimal digit
    const digits = `0.${mcStr.substring(firstNonZeroIndex)}`;
    let num = parseFloat(digits);
    // Round the number to one digit
    num = Math.round(num * 10) / 10;
    // Handle rounding that results in num >= 1
    if (num >= 1) {
      num = 1;
    }
    let numStr = num.toString();
    // Remove the decimal point and any following zeros
    numStr = numStr.replace('0.', '').replace(/0+$/, '');
    // Replace the part of mcStr starting from firstNonZeroIndex - 1
    let zerosCount = firstNonZeroIndex - decimalIndex - 1;
    // Adjust zerosCount, when num is 1
    if (num === 1) {
      zerosCount -= 1;
    }
    const leadingDigitalZeros = '0'.repeat(Math.max(zerosCount, 0));
    const output = `0.${leadingDigitalZeros}${numStr}`;
    return `${output}m`;
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
        <ExternalLink
          href={externalUrls.resourcesDocs}
          icon={library_books}
          toolTip="Read more in the documentation"
        />
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
