import { combineEpics } from 'redux-observable';
import { favouriteApplicationsEpic } from './applications-favourite/epic';

const rootEpic = combineEpics(favouriteApplicationsEpic);

export default rootEpic;
