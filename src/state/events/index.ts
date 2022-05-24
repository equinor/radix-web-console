import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EventsActionTypes } from './action-types';

import { SubscriptionsActionTypes } from '../subscriptions/action-types';
import type { RootState } from '../../init/store';
import type { EventModel } from '../../models/event';
import { EventModelNormalizer } from '../../models/event/normalizer';
import { arrayNormalizer } from '../../models/model-utils';

const initialState: Array<EventModel> = [];

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: {
    [EventsActionTypes.EVENTS_SNAPSHOT](
      _,
      action: PayloadAction<Array<EventModel | unknown>>
    ) {
      return arrayNormalizer(
        action.payload,
        EventModelNormalizer,
        initialState
      );
    },
    [SubscriptionsActionTypes.SUBSCRIPTION_ENDED](
      state,
      action: PayloadAction<unknown> & { resourceName: string }
    ) {
      return action.resourceName === 'EVENTS' ? initialState : state;
    },
  },
});

export const getMemoizedEvents = createSelector(
  (state: RootState) => state.events,
  (events) => events
);

export default eventsSlice.reducer;
