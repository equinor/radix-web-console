import React from 'react';

import { differenceInWords } from '../../utils/datetime';

export const Duration = ({ start, end, title }) => {
  if (!end) {
    return null;
  }

  return <span title={title}>{differenceInWords(end, start)}</span>;
};

export default Duration;
