import { Factories, Models } from '.';

it('Module should not crash', () => {
  expect(Factories).not.toBeNull();
  expect(Models).not.toBeNull();
});
