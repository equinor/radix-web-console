import { Tooltip, Typography } from '@equinor/eds-core-react';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { debounce } from 'lodash';
import * as PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActionMeta, OnChangeValue, StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';

import { adGroupModel } from './adGroupModel';
import { getGroup, getGroups } from './graphService';

import { useAppContext } from '../app-context';
import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
import { AsyncState } from '../../effects/effect-types';
import { RequestState } from '../../state/state-utils/request-states';

export type HandleAdGroupsChangeCB = (
  value: OnChangeValue<adGroupModel, true>,
  actionMeta: ActionMeta<adGroupModel>
) => void;

export interface ADGroupsProps {
  handleAdGroupsChange: HandleAdGroupsChangeCB;
  adGroups?: Array<string>;
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
  const { graphAuthProvider } = useAppContext();
  const mountedRef = useRef(true);

  const [result, setResult] = useState<AsyncState<Array<adGroupModel>>>({
    data: undefined,
    status: RequestState.IN_PROGRESS,
  });

  const getGroupInfo = useCallback(
    (accessGroups: Array<string>): void => {
      const data: Array<adGroupModel> = [];
      const groupResult = accessGroups?.map(
        async (id) =>
          await getGroup(graphAuthProvider, id)
            .then((group) => data.push(group))
            .catch(() =>
              data.push({
                displayName: id,
                id: id,
                color: 'var(--eds_interactive_danger__text)',
              })
            )
      );

      if (groupResult) {
        Promise.all(groupResult)
          .then(() => {
            if (mountedRef.current) {
              setResult({ data: data, status: RequestState.SUCCESS });
            }
          })
          .catch(() => {
            setResult({ data: undefined, status: RequestState.FAILURE });
          });
      }
    },
    [graphAuthProvider]
  );

  useEffect(() => {
    mountedRef.current = true;
    if (adGroups?.length > 0) {
      if (graphAuthProvider) {
        getGroupInfo(adGroups);
      }
    } else {
      setResult({ data: undefined, status: RequestState.SUCCESS });
    }

    // cancel any pending debounce on component unload
    return () => {
      mountedRef.current = false;
      loadOptions.cancel();
    };
  }, [adGroups, graphAuthProvider, getGroupInfo]);

  const customStyle: StylesConfig<adGroupModel> = {
    multiValueLabel: (styles, { data }) => ({ ...styles, color: data?.color }),
  };

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
            return target && !target.parentElement.className.match(/menu/);
          }}
          noOptionsMessage={() => null}
          loadOptions={(inputValue, callback) => {
            inputValue?.length < 3
              ? callback([])
              : loadOptions(callback, graphAuthProvider, inputValue);
          }}
          onChange={handleAdGroupsChange}
          getOptionLabel={(group: adGroupModel) => group.displayName}
          getOptionValue={(group: adGroupModel) => group.id}
          closeMenuOnSelect={false}
          defaultValue={result.data}
          isDisabled={adModeAuto || isDisabled}
          styles={customStyle}
        />
      </SimpleAsyncResource>
    </>
  );
};

ADGroups.propTypes = {
  handleAdGroupsChange: PropTypes.func.isRequired,
  adGroups: PropTypes.arrayOf(PropTypes.string),
  isDisabled: PropTypes.bool,
  adModeAuto: PropTypes.bool,
} as PropTypes.ValidationMap<ADGroupsProps>;
