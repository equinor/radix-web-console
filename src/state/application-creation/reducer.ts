import { makeRequestReducer } from '../state-utils/request';
import { ApplicationRegistrationUpsertResponseModel } from '../../models/radix-api/applications/application-registration-upsert-response';

export default makeRequestReducer<ApplicationRegistrationUpsertResponseModel>(
  'APP_CREATION'
);
