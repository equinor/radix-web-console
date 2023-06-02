import { makeRequestReducer } from '../state-utils/request';
import { JobModel } from '../../models/radix-api/jobs/job';

export default makeRequestReducer<JobModel>('JOB_CREATION');
