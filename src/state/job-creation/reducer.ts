import { makeRequestReducer } from '../state-utils/request';
import { JobModel } from '../../models/job';

export default makeRequestReducer<JobModel>('JOB_CREATION');
