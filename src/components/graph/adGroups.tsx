import { Typography } from '@equinor/eds-core-react';
import { debounce } from 'lodash';
import * as PropTypes from 'prop-types';
import type {
  ActionMeta,
  CSSObjectWithLabel,
  OnChangeValue,
} from 'react-select';
import AsyncSelect from 'react-select/async';

import {
  type AdGroup,
  msGraphApi,
  useGetAdGroupsQuery,
} from '../../store/ms-graph-api';
import AsyncResource from '../async-resource/async-resource';
import { UnknownADGroupsAlert } from '../component/unknown-ad-groups-alert';

type DisplayAdGroups = AdGroup & { deleted?: boolean };

type SearchGroupFunctionType = ReturnType<
  typeof msGraphApi.endpoints.searchAdGroups.useLazyQuery
>[0];

const loadOptions = debounce(
  (
    callback: (options: Array<DisplayAdGroups>) => void,
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

function selectValueStyle(
  base: CSSObjectWithLabel,
  props: { data: DisplayAdGroups }
): CSSObjectWithLabel {
  if (props.data.deleted) {
    base.backgroundColor = 'var(--eds_interactive_danger__highlight)';
  }
  return base;
}

export type HandleAdGroupsChangeCB = (
  value: OnChangeValue<DisplayAdGroups, true>,
  actionMeta: ActionMeta<DisplayAdGroups>
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
  const displayGroups = adGroups
    ?.map((id) => ({ id, info: groupsInfo?.find((g) => g.id === id) }))
    .map<DisplayAdGroups>((g) => ({
      id: g.id,
      displayName: g.info?.displayName ?? g.id,
      deleted: !g.info,
    }));

  const unknownADGroups = adGroups?.filter(
    (adGroupId) => !groupsInfo?.some((adGroup) => adGroup.id === adGroupId)
  );

  return (
    <AsyncResource asyncState={state} nonFailureErrorCodes={[404]}>
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
        defaultValue={displayGroups}
        isDisabled={isDisabled}
        styles={{
          multiValueLabel: selectValueStyle,
          multiValueRemove: selectValueStyle,
        }}
      />
      <Typography
        className="helpertext"
        group="input"
        variant="text"
        token={{ color: 'currentColor' }}
      >
        Azure Active Directory groups (type 3 characters to search)
      </Typography>
      {!state.isFetching && unknownADGroups?.length > 0 && (
        <UnknownADGroupsAlert unknownADGroups={unknownADGroups} />
      )}
    </AsyncResource>
  );
}

ADGroups.propTypes = {
  handleAdGroupsChange: PropTypes.func.isRequired,
  adGroups: PropTypes.arrayOf(PropTypes.string),
  isDisabled: PropTypes.bool,
};
