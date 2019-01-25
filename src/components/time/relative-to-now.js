import React from 'react';

import { formatDateTimePrecise, relativeTimeToNow } from '../../utils/datetime';

export const RelativeToNow = ({ time, titlePrefix = '' }) => {
  const timePrecise = formatDateTimePrecise(time);
  const title = titlePrefix ? `${titlePrefix} ${timePrecise}` : timePrecise;

  return (
    <time dateTime={formatDateTimePrecise(time)} title={title}>
      {relativeTimeToNow(time)}
    </time>
  );
};

export default RelativeToNow;
