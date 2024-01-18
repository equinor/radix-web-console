import { FunctionComponent } from 'react';

import { formatDateTimePrecise, relativeTimeToNow } from '../../utils/datetime';
import { isValid } from 'date-fns';

export const RelativeToNow: FunctionComponent<{
  time: number | string | Date;
  titlePrefix?: string;
  capitalize?: boolean;
  includeSeconds?: boolean;
}> = ({ time, titlePrefix, capitalize, includeSeconds }) => {
  if (!time || !isValid(time)) {
    return null;
  }

  const timePrecise = formatDateTimePrecise(time);
  const title = titlePrefix ? `${titlePrefix} ${timePrecise}` : timePrecise;

  return (
    <time dateTime={timePrecise} title={title}>
      {relativeTimeToNow(time, capitalize, includeSeconds)}
    </time>
  );
};
