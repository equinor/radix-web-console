import { FunctionComponent } from 'react';

import { formatDateTimePrecise, relativeTimeToNow } from '../../utils/datetime';

export const RelativeToNow: FunctionComponent<{
  time: number | Date;
  titlePrefix?: string;
  capitalize?: boolean;
}> = ({ time, titlePrefix, capitalize }) => {
  if (!time) {
    return null;
  }

  const timePrecise = formatDateTimePrecise(time);
  const title = titlePrefix ? `${titlePrefix} ${timePrecise}` : timePrecise;

  return (
    <time dateTime={timePrecise} title={title}>
      {relativeTimeToNow(time, capitalize)}
    </time>
  );
};
