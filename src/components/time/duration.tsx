import { differenceInWords } from '../../utils/datetime';

export const Duration = ({
  start,
  end,
  title,
}: {
  start: Date | Number;
  end: Date | Number;
  title?: string;
}): JSX.Element => {
  if (!end) {
    return null;
  }

  if (end < start) {
    end = start;
  }

  return (
    <span {...(title ? { title: title } : undefined)}>
      {differenceInWords(end, start)}
    </span>
  );
};

export default Duration;
