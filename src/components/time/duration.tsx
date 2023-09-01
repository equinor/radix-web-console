import { FunctionComponent } from 'react';

import { differenceInWords } from '../../utils/datetime';

export const Duration: FunctionComponent<{
  start: number | Date;
  end: number | Date;
  title?: string;
}> = ({ start, end, title }) => {
  if (!end) {
    return null;
  }

  if (end < start) {
    end = start;
  }

  return (
    <span {...(title && { title: title })}>
      {differenceInWords(end, start)}
    </span>
  );
};
