import { ajaxGet, ajaxPost, createApiUrl } from '../../api/api-helpers';
import { makeUrl as makeUrlApps } from '../../api/resource-applications';
import { makeUrl as makeUrlAppSearch } from '../../api/resource-applicationsearch';
import { bindPolling } from '../../effects/bind-polling';
import { RequestState } from '../../state/state-utils/request-states';

const defaultRequestValue = {
  data: null,
  error: null,
  status: RequestState.IN_PROGRESS,
};

const getApplicationsRequest = () => {
  const url = createApiUrl(makeUrlApps());
  return ajaxGet(url);
};

const getApplicationsByNamesRequest = (appNames) => {
  const url = createApiUrl(makeUrlAppSearch());
  return ajaxPost(url, { names: appNames });
};

export const pollApplications = () => {
  const requestFactory = getApplicationsRequest;
  return bindPolling(requestFactory, defaultRequestValue);
};

export const pollApplicationsByNames = () => {
  const requestFactory = getApplicationsByNamesRequest;
  return bindPolling(requestFactory, defaultRequestValue);
};
