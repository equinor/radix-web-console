import { render } from '@testing-library/react';
import { addMinutes } from 'date-fns';
import { expect } from 'vitest';
import { Duration } from './duration';
import { DurationToNow } from './duration-to-now';
import { RelativeToNow } from './relative-to-now';
vi.setSystemTime(new Date('Tue May 29 12:47:20 2018 +0200'));

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
  new Date(null!),
  new Date(undefined!),
  new Date(Infinity),
  new Date(-Infinity),
  new Date(+Infinity),
  new Date(1705580730),
  new Date('2024-01-05T14:35:16Z'),
] as const;

describe('Test Duration mixed Render', () => {
  it('should render without error', () => {
    render(
      <>
        {Times.map((a, ai) =>
          Times.map((b, bi) => (
            <Duration key={`${ai}-${bi}`} start={a!} end={b!} />
          ))
        )}
      </>
    );
  });
});

const DurationTests = [
  { test: new Date(), result: '0 secs' },
  { test: addMinutes(new Date(), 10), result: '0 secs' },
  { test: addMinutes(new Date(), -10), result: '10 mins 0 secs' },
  { test: '', result: '' },
  { test: null, result: '' },
  { test: undefined, result: '' },
  { test: Infinity, result: '' },
  { test: -Infinity, result: '' },
  { test: +Infinity, result: '' },
  { test: 'hello-world', result: '' },
  { test: 1705580730, result: '423857 hours 0 mins 59 secs' },
  { test: '2024-01-05T14:35:16Z', result: '0 secs' },
  { test: new Date(''), result: '' },
  { test: new Date(null!), result: '424330 hours 47 mins 20 secs' },
  { test: new Date(undefined!), result: '' },
  { test: new Date(Infinity), result: '' },
  { test: new Date(-Infinity), result: '' },
  { test: new Date(+Infinity), result: '' },
  { test: new Date(1705580730), result: '423857 hours 0 mins 59 secs' },
  { test: new Date('2024-01-05T14:35:16Z'), result: '0 secs' },
] as const;
describe('Test Duration results and render', () => {
  it('should render without error', () => {
    DurationTests.map(({ test, result }, i) => {
      const { container } = render(
        <Duration key={i} start={test!} end={new Date()} />
      );
      expect(container.textContent).to.equal(result, `Test ${i}`);
    });
  });
});

const RelativeToNowTests = [
  { test: new Date(), result: 'today at 12:47' },
  { test: addMinutes(new Date(), 10), result: 'today at 12:57' },
  { test: addMinutes(new Date(), -10), result: 'today at 12:37' },
  { test: '', result: '' },
  { test: null, result: '' },
  { test: undefined, result: '' },
  { test: Infinity, result: '' },
  { test: -Infinity, result: '' },
  { test: +Infinity, result: '' },
  { test: 'hello-world', result: '' },
  { test: 1705580730, result: 'Jan 20, 1970 at 18:46' },
  { test: '2024-01-05T14:35:16Z', result: 'Jan 5, 2024 at 15:35' },
  { test: new Date(''), result: '' },
  { test: new Date(null!), result: 'Jan 1, 1970 at 01:00' },
  { test: new Date(undefined!), result: '' },
  { test: new Date(Infinity), result: '' },
  { test: new Date(-Infinity), result: '' },
  { test: new Date(+Infinity), result: '' },
  { test: new Date(1705580730), result: 'Jan 20, 1970 at 18:46' },
  { test: new Date('2024-01-05T14:35:16Z'), result: 'Jan 5, 2024 at 15:35' },
] as const;
describe('Test Relative-to-now Render', () => {
  it('should render without error', () => {
    RelativeToNowTests.map(({ test, result }, i) => {
      const { container } = render(<RelativeToNow key={i} time={test!} />);
      expect(container.textContent).to.equal(result, `Test ${i}`);
    });
  });
});

const DurationToNowTimes = [
  { test: new Date(), result: '0 secs' },
  { test: addMinutes(new Date(), 10), result: '0 secs' },
  { test: addMinutes(new Date(), -10), result: '10 mins 0 secs' },
  { test: '', result: '' },
  { test: null, result: '' },
  { test: undefined, result: '' },
  { test: Infinity, result: '' },
  { test: -Infinity, result: '' },
  { test: +Infinity, result: '' },
  { test: 'hello-world', result: '' },
  { test: 1705580730, result: '423857 hours 0 mins 59 secs' },
  { test: '2024-01-05T14:35:16Z', result: '0 secs' },
  { test: new Date(''), result: '' },
  { test: new Date(null!), result: '424330 hours 47 mins 20 secs' },
  { test: new Date(undefined!), result: '' },
  { test: new Date(Infinity), result: '' },
  { test: new Date(-Infinity), result: '' },
  { test: new Date(+Infinity), result: '' },
  { test: new Date(1705580730), result: '423857 hours 0 mins 59 secs' },
  { test: new Date('2024-01-05T14:35:16Z'), result: '0 secs' },
] as const;
describe('Test Duration-to-now Render', () => {
  it('should render without error', () => {
    DurationToNowTimes.map(({ test, result }, i) => {
      const { container } = render(<DurationToNow key={i} start={test!} />);
      expect(container.textContent).to.equal(result, `Test ${i}`);
    });
  });
});
