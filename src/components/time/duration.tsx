import { differenceInWords } from '../../utils/datetime';

export const Duration: (props: {
  start: number | Date;
  end: number | Date;
  title?: string;
}) => React.JSX.Element = ({ start, end, title }) => {
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
