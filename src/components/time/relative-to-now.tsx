import { isValid } from 'date-fns';
import { formatDateTimePrecise, relativeTimeToNow } from '../../utils/datetime';

type Props = {
  time?: number | string | Date;
  titlePrefix?: string;
  capitalize?: boolean;
  includeSeconds?: boolean;
};

export function RelativeToNow({
  time,
  titlePrefix,
  capitalize,
  includeSeconds,
}: Props) {
  if (typeof time === 'string' || typeof time === 'number') {
    time = new Date(time);
  }

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
}
