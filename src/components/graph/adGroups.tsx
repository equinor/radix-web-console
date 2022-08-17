import { Tooltip, Typography } from '@equinor/eds-core-react';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { debounce } from 'lodash';
import * as PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { ActionMeta, OnChangeValue } from 'react-select';
import AsyncSelect from 'react-select/async';

import { adGroupModel } from './adGroupModel';
import { useAuthentication } from './authentication';
import { getGroup, getGroups } from './graphService';

import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
import { AsyncState } from '../../effects/effect-types';
import { RequestState } from '../../state/state-utils/request-states';

export type HandleAdGroupsChangeCB = (
  event: OnChangeValue<adGroupModel, true>,
  actionMeta: ActionMeta<adGroupModel>
) => void;

export interface ADGroupsProps {
  handleAdGroupsChange: HandleAdGroupsChangeCB;
  adGroups?: string;
  isDisabled?: boolean;
  adModeAuto?: boolean;
}

const loadOptions = debounce<
  (
    callback: (options: Array<adGroupModel>) => void,
    authProvider: AuthCodeMSALBrowserAuthenticationProvider,
    value: string
  ) => void
>((callback, ...rest) => filterOptions(...rest).then(callback), 500);

async function filterOptions(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  inputValue: string
): Promise<Array<adGroupModel>> {
  return (await getGroups(authProvider, 10, inputValue)).value;
}

export const ADGroups = ({
  handleAdGroupsChange,
  adGroups,
  isDisabled,
  adModeAuto,
}: ADGroupsProps): JSX.Element => {
  const auth = useAuthentication();

  const [result, setResult] = useState<AsyncState<Array<adGroupModel>>>({
    data: undefined,
    status: RequestState.IN_PROGRESS,
  });

  const getGroupInfo = useCallback(
    (accessGroups: string) => {
      try {
        const groups: adGroupModel[] = [];
        const groupInfo = accessGroups.split(',').map(async (id) => {
          return groups.push(await getGroup(auth.authProvider, id));
        });
        Promise.all(groupInfo).then(() => {
          setResult({ data: groups, status: RequestState.SUCCESS });
        });
      } catch (err) {
        console.error(err);
        setResult({
          data: undefined,
          status: RequestState.FAILURE,
          error: err?.message ?? '',
        });
      }
    },
    [auth?.authProvider]
  );

  useEffect(() => {
    if (adGroups?.length > 0) {
      if (auth.authProvider) {
        getGroupInfo(adGroups);
      }
    } else {
      setResult({
        data: undefined,
        status: RequestState.SUCCESS,
      });
    }

    // cancel any pending debounce on component unload
    return () => loadOptions.cancel();
  }, [adGroups, auth?.authProvider, getGroupInfo]);

  return (
    <>
      <Typography
        className="label"
        group="input"
        variant="text"
        token={{ color: 'currentColor' }}
      >
        Custom{' '}
        <Tooltip title="Active Directory" placement="top">
          <span>AD</span>
        </Tooltip>{' '}
        groups (type 3 characters to search){' '}
      </Typography>
      <SimpleAsyncResource asyncState={result}>
        <AsyncSelect
          isMulti
          name="ADGroups"
          menuPosition="fixed"
          closeMenuOnScroll={(e: Event) => {
            const target = e.target as HTMLInputElement;
            return target && !target.className.match(/MenuList/);
          }}
          noOptionsMessage={() => null}
          loadOptions={(inputValue, callback) => {
            inputValue?.length < 3
              ? callback([])
              : loadOptions(callback, auth.authProvider, inputValue);
          }}
          onChange={handleAdGroupsChange}
          getOptionLabel={(group: adGroupModel) => group.displayName}
          getOptionValue={(group: adGroupModel) => group.id}
          closeMenuOnSelect={false}
          defaultValue={result.data}
          isDisabled={adModeAuto || isDisabled}
        />
      </SimpleAsyncResource>
    </>
  );
};

ADGroups.propTypes = {
  handleAdGroupsChange: PropTypes.func.isRequired,
  adGroups: PropTypes.string,
  isDisabled: PropTypes.bool,
  adModeAuto: PropTypes.bool,
} as PropTypes.ValidationMap<ADGroupsProps>;
