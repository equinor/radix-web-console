import { FunctionComponent } from 'react';

import { differenceInWords } from '../../utils/datetime';
import { isValid } from 'date-fns';

export const Duration: FunctionComponent<{
  start: number | string | Date;
  end: number | string | Date;
  title?: string;
}> = ({ start, end, title }) => {
  if (!end || !isValid(end) || !isValid(start)) {
    return null;
  }

  if (end < start) {
    end = start;
  }

  return <span title={title}>{differenceInWords(end, start)}</span>;
};
