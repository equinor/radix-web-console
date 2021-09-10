import { makeUrl } from '../../api/resource-applications';
import { ajax } from 'rxjs/ajax';
import { map, catchError, exhaustMap, startWith } from 'rxjs/operators';
import { of, interval } from 'rxjs';
import { bind } from '@react-rxjs/core';
import requestStates from '../../state/state-utils/request-states';
import { createApiUrl } from '../../api/api-helpers';

const ajaxGet = (path, contentType = 'application/json') => {
  const headers = { 'Content-Type': contentType };
  return ajax.get(path, headers).pipe(
    map((response) => ({
      data: response.response,
      status: requestStates.SUCCESS,
    })),
    catchError((err) =>
      of({ status: requestStates.FAILURE, error: err.message })
    )
  );
};

export const getApplications = () => {
  const url = createApiUrl(makeUrl());
  return bind(ajaxGet(url), {
    data: null,
    error: null,
    status: requestStates.IN_PROGRESS,
  });
};

export const pollApplications = () => {
  // const [, getApplications$] = getApplications();
  const url = createApiUrl(makeUrl());
  return bind(
    (period) =>
      interval(period).pipe(
        startWith(0),
        exhaustMap(() => ajaxGet(url))
      ),
    {
      data: null,
      error: null,
      status: requestStates.IN_PROGRESS,
    }
  );
};
