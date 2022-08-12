import { Tooltip, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
import { useCallback, useEffect, useState } from 'react';
import { useAuthentication } from './authentication';
import { adGroupModel } from './adGroupModel';
import { getGroup, getGroups } from './graphService';
import { RequestState } from '../../state/state-utils/request-states';
import { AsyncState } from '../../effects/effect-types';
import { debounce } from 'lodash';

export interface ADGroupsProps {
  handleAdGroupsChange: (event: adGroupModel[]) => void;
  adGroups: string;
  isDisabled: boolean;
  adModeAuto: boolean;
}

export const ADGroups = ({
  handleAdGroupsChange,
  adGroups,
  isDisabled,
  adModeAuto,
}: ADGroupsProps): JSX.Element => {
  const auth = useAuthentication();

  const filterOptions = async (inputValue: string) => {
    const groups = await getGroups(auth.authProvider, 10, inputValue);
    return groups.value;
  };

  const [result, setResult] = useState<AsyncState<Array<adGroupModel>>>({
    data: undefined,
    status: RequestState.IN_PROGRESS,
  });

  const loadOptions = debounce(
    (inputValue: string, callback: (options: adGroupModel[]) => void) => {
      filterOptions(inputValue).then(callback);
    },
    500
  );

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
            return target && !target.classList.contains('select__menu-list');
          }}
          noOptionsMessage={() => null}
          loadOptions={(inputValue: string, callback) => {
            if (inputValue.length < 3) {
              callback([]);
            } else {
              loadOptions(inputValue, callback);
            }
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
};
