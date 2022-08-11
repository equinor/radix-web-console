import { Tooltip, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
import { useCallback, useEffect, useState } from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import { useAuthentication } from './authentication';
import { adGroupModel } from './adGroupModel';
import { getGroup, getGroups } from './graphService';
import { RequestState } from '../../state/state-utils/request-states';
import { AsyncState } from '../../effects/effect-types';

export interface ADGroupsProps {
  handleAdGroupsChange: (event: any) => void;
  adGroups: string;
}

export const ADGroups = ({
  handleAdGroupsChange,
  adGroups,
}: ADGroupsProps): JSX.Element => {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthentication();

  const filterOptions = async (inputValue: string) => {
    const groups = await getGroups(auth.authProvider, 10, inputValue);
    return groups.value;
  };

  const [result, setResult] = useState<AsyncState<Array<adGroupModel>>>({
    data: undefined,
    status: RequestState.IN_PROGRESS,
  });

  const loadOptions = (inputValue: string) =>
    new Promise<adGroupModel[]>((resolve) => {
      setTimeout(() => {
        resolve(filterOptions(inputValue));
      });
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
    if (adGroups) {
      getGroupInfo(adGroups);
    } else {
      setResult({
        data: undefined,
        status: RequestState.SUCCESS,
      });
    }
  }, [adGroups, getGroupInfo]);

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
        groups (comma-separated){' '}
        {isAuthenticated ? (
          <span>(Logged in as {auth.user?.displayName || ''})</span>
        ) : (
          <span>(Logget out)</span>
        )}
      </Typography>
      <SimpleAsyncResource asyncState={result}>
        <AsyncSelect
          isMulti
          name="ADGroups"
          loadOptions={loadOptions}
          onChange={handleAdGroupsChange}
          getOptionLabel={(group: adGroupModel) => group.displayName}
          getOptionValue={(group: adGroupModel) => group.id}
          closeMenuOnSelect={false}
          defaultValue={result.data}
        />
      </SimpleAsyncResource>
    </>
  );
};

ADGroups.propTypes = {
  handleAdGroupsChange: PropTypes.func.isRequired,
  adGroups: PropTypes.string,
};
