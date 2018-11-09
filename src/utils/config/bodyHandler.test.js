import BodyHandler from './bodyHandler';

describe('hasKey', () => {
  it('should return true if we have an value', () => {
    const fakeBodyAccessor = () => {
      return 'value';
    };

    const bodyHandler = new BodyHandler(undefined, fakeBodyAccessor);
    const result = bodyHandler.hasKey('what_ever_key');
    expect(result).toBeTruthy();
  });

  it('should return false if we have no value', () => {
    const fakeBodyAccessor = () => {
      return undefined;
    };

    const bodyHandler = new BodyHandler(undefined, fakeBodyAccessor);
    const result = bodyHandler.hasKey('what_ever_key');
    expect(result).toBeFalsy();
  });

  it('should return false if we have value that is prefixed with env config', () => {
    const fakeBodyAccessor = () => {
      return `\${env_var_ref}`;
    };

    const bodyHandler = new BodyHandler(undefined, fakeBodyAccessor);
    const result = bodyHandler.hasKey('what_ever_key');
    expect(result).toBeFalsy();
  });
});
