import { render } from '@testing-library/react';
import { Duration } from './duration';
import { addMinutes } from 'date-fns';
import { RelativeToNow } from './relative-to-now';
import { DurationToNow } from './duration-to-now';

const Times = [
  new Date(),
  addMinutes(new Date(), 10),
  addMinutes(new Date(), -10),
  '',
  null,
  undefined,
  Infinity,
  -Infinity,
  +Infinity,
  'hello-world',
  1705580730,
  '2024-01-05T14:35:16Z',
  new Date(''),
  new Date(null),
  new Date(undefined),
  new Date(Infinity),
  new Date(1705580730),
  new Date('2024-01-05T14:35:16Z'),
] as const;

describe('Test RelativeToNow Render', () => {
  it('should render without error', () => {
    render(
      <>
        {Times.map((a, ai) =>
          Times.map((b, bi) => (
            <Duration key={`${ai}-${bi}`} start={a} end={b} />
          ))
        )}
      </>
    );
  });
});

describe('Test Relative-to-now Render', () => {
  it('should render without error', () => {
    render(
      <>
        {Times.map((a, i) => (
          <RelativeToNow key={i} time={a} />
        ))}
      </>
    );
  });
});

describe('Test Duration-to-now Render', () => {
  it('should render without error', () => {
    render(
      <>
        {Times.map((a, i) => (
          <DurationToNow key={i} start={a} />
        ))}
      </>
    );
  });
});
