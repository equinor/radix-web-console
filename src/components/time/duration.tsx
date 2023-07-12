import { differenceInWords } from '../../utils/datetime';

export const Duration = ({
  start,
  end,
  title,
}: {
  start: number | Date;
  end: number | Date;
  title?: string;
}): JSX.Element => {
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
