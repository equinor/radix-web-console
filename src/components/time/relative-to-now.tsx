import { formatDateTimePrecise, relativeTimeToNow } from '../../utils/datetime';

export const RelativeToNow: (props: {
  time: number | Date;
  titlePrefix?: string;
  capitalize?: boolean;
}) => React.JSX.Element = ({ time, titlePrefix, capitalize }) => {
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
