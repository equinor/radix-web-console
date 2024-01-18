import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { Duration } from './duration';
import { addMinutes } from 'date-fns';
import { RelativeToNow } from './relative-to-now';
import { DurationToNow } from './duration-to-now';

const DurationTestProps = [
  { start: new Date(), end: addMinutes(new Date(), 10) },
  { start: new Date(), end: new Date(+Infinity) },
  { start: new Date(+Infinity), end: new Date() },
  { start: addMinutes(new Date(), 10), end: new Date() },
  { start: '', end: '' },
  { start: null, end: null },
  { start: Infinity, end: -Infinity },
  { start: new Date(''), end: '2024-01-05T14:35:16Z' },
  { start: '2024-01-05T14:35:16Z', end: '2024-01-05T14:35:16Z' },
  {
    start: new Date('2024-01-05T14:35:16Z'),
    end: new Date('2024-01-05T14:35:16Z'),
  },
] satisfies Array<ComponentProps<typeof Duration>>;

describe('Test RelativeToNow Render', () => {
  it('should render without error', () => {
    render(
      <>
        {DurationTestProps.map((props, i) => (
          <Duration key={i} {...props} />
        ))}
      </>
    );
  });
});

const RelativeToNowTestProps = [
  { time: new Date() },
  { time: addMinutes(new Date(), 10) },
  { time: '' },
  { time: null },
  { time: undefined },
  { time: Infinity },
  { time: 1705580730 },
  { time: '2024-01-05T14:35:16Z' },
  { time: new Date('') },
  { time: new Date(null) },
  { time: new Date(undefined) },
  { time: new Date(Infinity) },
  { time: new Date(1705580730) },
  { time: new Date('2024-01-05T14:35:16Z') },
] satisfies Array<ComponentProps<typeof RelativeToNow>>;
describe('Test Relative-to-now Render', () => {
  it('should render without error', () => {
    render(
      <>
        {RelativeToNowTestProps.map((props, i) => (
          <RelativeToNow key={i} {...props} />
        ))}
      </>
    );
  });
});

const DurationToNowTestProps = [
  { start: new Date() },
  { start: addMinutes(new Date(), 10) },
  { start: '' },
  { start: null },
  { start: undefined },
  { start: Infinity },
  { start: 1705580730 },
  { start: '2024-01-05T14:35:16Z' },
  { start: new Date('') },
  { start: new Date(null) },
  { start: new Date(undefined) },
  { start: new Date(Infinity) },
  { start: new Date(1705580730) },
  { start: new Date('2024-01-05T14:35:16Z') },
] satisfies Array<ComponentProps<typeof DurationToNow>>;
describe('Test Duration-to-now Render', () => {
  it('should render without error', () => {
    render(
      <>
        {DurationToNowTestProps.map((props, i) => (
          <DurationToNow key={i} {...props} />
        ))}
      </>
    );
  });
});
