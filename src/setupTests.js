import { randomBytes } from 'crypto';

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr) => randomBytes(arr.length),
  },
});
