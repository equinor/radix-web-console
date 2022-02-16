import { formatDateTimePrecise, relativeTimeToNow } from '../../utils/datetime';

export const RelativeToNow = ({
  time,
  titlePrefix,
  capitalize,
}: {
  time: Date | number;
  titlePrefix?: string;
  capitalize?: boolean;
}): JSX.Element => {
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

export default RelativeToNow;
