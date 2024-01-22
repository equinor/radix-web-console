import { CircularProgress, Typography } from '@equinor/eds-core-react';
import { debounce } from 'lodash';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { ActionMeta, OnChangeValue, StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { adGroupModel } from './adGroupModel';

import { AdGroup, msGraphApi } from '../../store/ms-graph-api';
import { ErrorPanel, LoadingComponent } from '../async-resource/shared';
import { Alert } from '../alert';
import { externalUrls } from '../../externalUrls';
import { getFetchErrorCode, getFetchErrorMessage } from '../../store/utils';

export type HandleAdGroupsChangeCB = (
  value: OnChangeValue<adGroupModel, true>,
  actionMeta: ActionMeta<adGroupModel>
) => void;

export interface ADGroupsProps {
  handleAdGroupsChange: HandleAdGroupsChangeCB;
  adGroups?: Array<string>;
  isDisabled?: boolean;
}

type SearchGroupFunctionType = ReturnType<
  typeof msGraphApi.endpoints.searchAdGroups.useLazyQuery
>[0];

const loadOptions = debounce(
  (
    callback: (options: Array<adGroupModel>) => void,
    searchGroup: SearchGroupFunctionType,
    value: string
  ) => filterOptions(searchGroup, value).then(callback),
  500
);

async function filterOptions(
  searchGroups: SearchGroupFunctionType,
  groupName: string
): Promise<Array<AdGroup>> {
  return (await searchGroups({ groupName, limit: 10 }).unwrap()).value;
}

export function ADGroups({
  handleAdGroupsChange,
  adGroups,
  isDisabled,
}: ADGroupsProps) {
  const [getGroupInfo] = msGraphApi.endpoints.getAdGroup.useLazyQuery(); //  useGetAdGroupQuery({adGroup})
  const [searchGroups, { data }] =
    msGraphApi.endpoints.searchAdGroups.useLazyQuery();
  const [results, setResults] = useState<null | Array<{
    data: AdGroup;
    error: FetchBaseQueryError | SerializedError;
  }>>(null);

  console.log({ adGroups, results, search: data });

  useEffect(() => {
    let mounted = true;

    const promises = adGroups.map((id) => getGroupInfo({ id }));
    Promise.all(promises).then((results) => {
      if (!mounted) return;

      const res = results.map(({ data, error }) => {
        console.log(data);
        return {
          data,
          error,
        } as const;
      });

      setResults(res);
    });

    return () => {
      mounted = false;
    };
  }, [adGroups, getGroupInfo]);

  const customStyle: StylesConfig<adGroupModel> = {
    multiValueLabel: (styles, { data }) => {
      styles.color = data?.color;
      return styles;
    },
  };

  const isLoading = results === null;
  const firstError = results?.find(({ error }) => !!error)?.error;

  return (
    <>
      {isLoading && (
        <LoadingComponent
          defaultContent={
            <span>
              <CircularProgress size={16} /> Loading…
            </span>
          }
        />
      )}
      {firstError && (
        <Alert type="danger">
          <Typography variant="h4">
            That didn't work{' '}
            <span role="img" aria-label="Sad">
              😞
            </span>
          </Typography>
          <div className="grid grid--gap-small">
            <ErrorPanel
              message={getFetchErrorMessage(firstError)}
              code={getFetchErrorCode(firstError)}
            />
            <Typography>
              You may want to refresh the page. If the problem persists, get in
              touch on our Slack{' '}
              <Typography
                link
                href={externalUrls.slackRadixSupport}
                rel="noopener noreferrer"
                target="_blank"
              >
                support channel
              </Typography>
            </Typography>
          </div>
        </Alert>
      )}

      {!isLoading && (
        <>
          <AsyncSelect
            isMulti
            name="ADGroups"
            menuPosition="fixed"
            closeMenuOnScroll={(e: Event) => {
              const target = e.target as HTMLInputElement;
              return (
                target?.parentElement?.className &&
                !target.parentElement.className.match(/menu/)
              );
            }}
            noOptionsMessage={() => null}
            loadOptions={(inputValue, callback) => {
              inputValue?.length < 3
                ? callback([])
                : loadOptions(callback, searchGroups, inputValue);
            }}
            onChange={handleAdGroupsChange}
            getOptionLabel={({ displayName }) => displayName}
            getOptionValue={({ id }) => id}
            closeMenuOnSelect={false}
            defaultValue={results.map((v) => v.data)}
            isDisabled={isDisabled}
            styles={customStyle}
          />
        </>
      )}
      <Typography
        className="helpertext"
        group="input"
        variant="text"
        token={{ color: 'currentColor' }}
      >
        Azure Active Directory groups (type 3 characters to search)
      </Typography>
    </>
  );
}

ADGroups.propTypes = {
  handleAdGroupsChange: PropTypes.func.isRequired,
  adGroups: PropTypes.arrayOf(PropTypes.string),
  isDisabled: PropTypes.bool,
};
