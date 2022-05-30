import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { EventsActionTypes } from './action-types';

import type { ActionType } from '../state-utils/action-creators';
import { SubscriptionsActionTypes } from '../subscriptions/action-types';
import type { RootState } from '../../init/store';
import type { EventModel } from '../../models/event';
import { EventModelNormalizer } from '../../models/event/normalizer';
import { arrayNormalizer } from '../../models/model-utils';

const initialState: Array<EventModel> = [];

const snapshotAction = createAction<Array<EventModel>>(
  EventsActionTypes.EVENTS_SNAPSHOT
);
const subscriptionEndedAction = createAction(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(snapshotAction, (_, action) =>
        arrayNormalizer(action.payload, EventModelNormalizer, initialState)
      )
      .addCase(subscriptionEndedAction, (state, action) =>
        (action as ActionType).meta.resourceName === 'EVENTS'
          ? initialState
          : state
      )
      .addDefaultCase((state) => state),
});

export const getMemoizedEvents = createSelector(
  (state: RootState) => state.events,
  (events) => events
);

export default eventsSlice.reducer;
