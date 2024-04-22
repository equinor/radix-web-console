import { CircularProgress, Typography } from '@equinor/eds-core-react';
import { debounce } from 'lodash';
import * as PropTypes from 'prop-types';
import { ActionMeta, OnChangeValue } from 'react-select';
import AsyncSelect from 'react-select/async';

import {
  AdGroup,
  msGraphApi,
  useGetAdGroupsQuery,
} from '../../store/ms-graph-api';
import { UnknownADGroupsAlert } from '../component/unknown-ad-groups-alert';

type SearchGroupFunctionType = ReturnType<
  typeof msGraphApi.endpoints.searchAdGroups.useLazyQuery
>[0];

const loadOptions = debounce(
  (
    callback: (options: Array<AdGroup>) => void,
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

export type HandleAdGroupsChangeCB = (
  value: OnChangeValue<AdGroup, true>,
  actionMeta: ActionMeta<AdGroup>
) => void;
interface Props {
  handleAdGroupsChange: HandleAdGroupsChangeCB;
  adGroups?: Array<string>;
  isDisabled?: boolean;
}
export function ADGroups({
  handleAdGroupsChange,
  adGroups,
  isDisabled,
}: Props) {
  const { data: groupsInfo, ...state } = useGetAdGroupsQuery({
    ids: adGroups ?? [],
  });
  const [searchGroups] = msGraphApi.endpoints.searchAdGroups.useLazyQuery();
  const unknownADGroups = adGroups?.filter(
    (adGroupId) => !groupsInfo?.some((adGroup) => adGroup.id === adGroupId)
  );
  return (
    <>
      {state.isLoading ? (
        <>
          <CircularProgress size={24} /> Updating…
        </>
      ) : (
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
          defaultValue={groupsInfo}
          isDisabled={isDisabled}
        />
      )}
      <Typography
        className="helpertext"
        group="input"
        variant="text"
        token={{ color: 'currentColor' }}
      >
        Azure Active Directory groups (type 3 characters to search)
      </Typography>
      {adGroups?.length > 0 && unknownADGroups?.length > 0 && (
        <UnknownADGroupsAlert
          unknownADGroups={unknownADGroups}
        ></UnknownADGroupsAlert>
      )}
    </>
  );
}

ADGroups.propTypes = {
  handleAdGroupsChange: PropTypes.func.isRequired,
  adGroups: PropTypes.arrayOf(PropTypes.string),
  isDisabled: PropTypes.bool,
};
