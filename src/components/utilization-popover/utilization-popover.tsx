import { Chip, Popover } from '@equinor/eds-core-react';
import { useEffect, useRef, useState } from 'react';
import type { ReplicaResourcesUtilizationResponse } from '../../store/radix-api';

type Props = {
  appName: string;
  envName: string;
  data: ReplicaResourcesUtilizationResponse;
};

export const UtilizationPopover = ({ appName, envName, data }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleBodyClick = () => setOpen(false);
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  console.log({ data });

  return (
    <>
      <Chip ref={ref} onClick={() => setOpen(true)}>
        Utilization
      </Chip>
      <Popover
        anchorEl={ref.current}
        open={open}
        onClick={(ev) => ev.stopPropagation()}
      >
        <Popover.Content>
          hello world {appName} {envName}
        </Popover.Content>
      </Popover>
    </>
  );
};

// @ts-expect-error not used yet
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

// @ts-expect-error not used yet
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
