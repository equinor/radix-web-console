import get from 'lodash/get';

export const getEvents = (state) => get(state, 'events', []);
