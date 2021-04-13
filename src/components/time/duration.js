import React from 'react';

import { differenceInWords } from '../../utils/datetime';

export const Duration = ({ start, end, title }) => {
  if (!end) {
    return null;
  }
  if (end < start) {
    end = start;
  }
  return <span title={title}>{differenceInWords(end, start)}</span>;
};

export default Duration;
