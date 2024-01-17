import { FunctionComponent } from 'react';

import { useNow } from '../../effects/use-now';
import { Duration } from './duration';

export const DurationToNow: FunctionComponent<{
  start: number | string | Date;
  title?: string;
}> = ({ start, title }) => {
  const now = useNow();

  return <Duration start={start} end={now} title={title} />;
};
