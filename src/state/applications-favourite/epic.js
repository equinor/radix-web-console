import { map, withLatestFrom } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import actionTypes from './action-types';
import { setFavouriteApplications } from './action-creators';
import { getFavouriteApplications } from '.';
import update from 'immutability-helper';

export const favouriteApplicationsEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.APPS_FAVOURITE_TOGGLE),
    withLatestFrom(
      state$.pipe(map((state) => getFavouriteApplications(state)))
    ),
    map(([action, currentState]) => {
      const idx = currentState.findIndex(
        (appName) => appName === action.payload
      );
      return idx >= 0
        ? update(currentState, { $splice: [[idx, 1]] })
        : update(currentState, { $push: [action.payload] });
    }),
    map((payload) => setFavouriteApplications(payload))
  );
};
