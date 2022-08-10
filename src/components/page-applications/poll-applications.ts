import { createRadixApiUrl } from '../../api/api-config';
import { ajaxGet, ajaxPost } from '../../api/api-helpers';
import { makeUrl as makeUrlApps } from '../../api/resource-applications';
import { makeUrl as makeUrlAppSearch } from '../../api/resource-applicationsearch';
import { bindPolling } from '../../effects/bind-polling';
import { AsyncState } from '../../effects/effect-types';
import { ApplicationSummaryModel } from '../../models/application-summary';
import { RequestState } from '../../state/state-utils/request-states';

const defaultRequestValue: AsyncState<Array<ApplicationSummaryModel>> = {
  data: null,
  error: null,
  status: RequestState.IN_PROGRESS,
};

function getApplicationsRequest() {
  return ajaxGet<Array<ApplicationSummaryModel>>(
    createRadixApiUrl(makeUrlApps())
  );
}

function getApplicationsByNamesRequest(appNames: string) {
  return ajaxPost<Array<ApplicationSummaryModel>>(
    createRadixApiUrl(makeUrlAppSearch()),
    { names: appNames }
  );
}

export function pollApplications() {
  const requestFactory = getApplicationsRequest;
  return bindPolling<AsyncState<Array<ApplicationSummaryModel>>>(
    requestFactory,
    defaultRequestValue
  );
}

export function pollApplicationsByNames() {
  const requestFactory = getApplicationsByNamesRequest;
  return bindPolling<AsyncState<Array<ApplicationSummaryModel>>>(
    requestFactory,
    defaultRequestValue
  );
}
