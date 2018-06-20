import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('streaming');

export const getConnectionStatus = (state, streamKey) =>
  localGetter(state, streamKey);
