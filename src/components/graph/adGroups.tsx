import { Icon, Typography } from '@equinor/eds-core-react';
import { computer, group, person } from '@equinor/eds-icons';
import {
  type CSSObjectWithLabel,
  type MultiValue,
  type MultiValueGenericProps,
  type OptionsOrGroups,
  components,
} from 'react-select';
import AsyncSelect from 'react-select/async';
import { useDebounce } from '../../effects/use-debounce';
import {
  type EntraItem,
  useGetAdGroupsQuery,
  useGetAdServicePrincipalQuery,
  useLazySearchAdGroupsQuery,
  useLazySearchAdServicePrincipalsQuery,
} from '../../store/ms-graph-api';
import AsyncResource from '../async-resource/async-resource';
import { UnknownADGroupsAlert } from '../component/unknown-ad-groups-alert';

export type HandleAdGroupsChangeCB = (value: MultiValue<AdGroupItem>) => void;
export type AdGroupItem = EntraItem & {
  deleted?: boolean;
  type: 'Group' | 'User' | 'ServicePrincipal' | 'Application';
};

type GroupedOption = {
  readonly label: string;
  readonly options: readonly AdGroupItem[];
};

type CallbackType = (
  options: OptionsOrGroups<AdGroupItem, GroupedOption>
) => void;

interface Props {
  onChange: HandleAdGroupsChangeCB;
  adGroups: Array<string>;
  adUsers: Array<string>;
  isDisabled?: boolean;
}
export function ADGroups({ onChange, adGroups, adUsers, isDisabled }: Props) {
  const { data: groupsInfo, ...state } = useGetAdGroupsQuery({
    ids: adGroups ?? [],
  });
  const { data: spInfo, ...spState } = useGetAdServicePrincipalQuery({
    ids: adUsers ?? [],
  });
  const [searchServicePrincipals, spSearchState] =
    useLazySearchAdServicePrincipalsQuery();
  const [searchGroups, groupsSearchState] = useLazySearchAdGroupsQuery();

  const displayGroups: AdGroupItem[] = adGroups
    .map((id) => ({ id, info: groupsInfo?.find((g) => g.id === id) }))
    .map((g) => ({
      id: g.id,
      displayName: g.info?.displayName ?? g.id,
      type: 'Group',
      deleted: !g.info,
    }));
  const displayUsers: AdGroupItem[] = adUsers
    .map((id) => ({ id, info: spInfo?.find((sp) => sp.id === id) }))
    .map((sp) => ({
      id: sp.id,
      displayName: sp.info?.displayName ?? sp.id,
      type: 'ServicePrincipal',
      deleted: !sp.info,
    }));

  const unknownADGroups = adGroups?.filter(
    (adGroupId) => !groupsInfo?.some((adGroup) => adGroup.id === adGroupId)
  );
  const unknownADUsers = adUsers?.filter(
    (adUserId) => !spInfo?.some((adUser) => adUser.id === adUserId)
  );

  const onSearch = useDebounce(
    (displayName: string, callback: CallbackType) => {
      Promise.all([
        searchGroups({ displayName, limit: 10 }).unwrap(),
        searchServicePrincipals({ displayName, limit: 10 }).unwrap(),
      ]).then(([groups, servicePrincipals]) => {
        callback([
          {
            label: 'Groups',
            options: groups.value.map<AdGroupItem>((item) => ({
              ...item,
              type: 'Group',
            })),
          },
          {
            label: 'Service Principals',
            options: servicePrincipals.value.map<AdGroupItem>((item) => ({
              ...item,
              type: 'ServicePrincipal',
            })),
          },
        ]);
      });
    },
    500
  );

  return (
    <AsyncResource asyncState={spState} nonFailureErrorCodes={[404]}>
      <AsyncResource asyncState={state} nonFailureErrorCodes={[404]}>
        <AsyncSelect<AdGroupItem, true, GroupedOption>
          isMulti
          name="ADGroups"
          menuPosition="fixed"
          closeMenuOnScroll={(e: Event) => {
            const target = e.target as HTMLInputElement;
            return target?.parentElement?.className
              ? !target.parentElement.className.match(/menu/)
              : false;
          }}
          noOptionsMessage={() => null}
          loadOptions={(inputValue, callback) => {
            if (inputValue.length < 3) return callback([]);
            return onSearch(inputValue, callback);
          }}
          isLoading={groupsSearchState.isLoading || spSearchState.isLoading}
          onChange={onChange}
          getOptionLabel={({ displayName }) => displayName}
          getOptionValue={({ id }) => id}
          closeMenuOnSelect={false}
          defaultValue={[...displayGroups, ...displayUsers]}
          isDisabled={isDisabled}
          components={{ MultiValueLabel }}
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
          Azure Active Directory (type 3 characters to search)
        </Typography>
        {(!state.isFetching && unknownADGroups?.length > 0) ||
          (!spState.isFetching && unknownADUsers?.length > 0 && (
            <UnknownADGroupsAlert
              unknownADGroups={unknownADGroups}
              unknownADUsers={unknownADUsers}
            />
          ))}
      </AsyncResource>
    </AsyncResource>
  );
}

function selectValueStyle(
  base: CSSObjectWithLabel,
  props: { data: AdGroupItem }
) {
  if (props.data.deleted) {
    base.backgroundColor = 'var(--eds_interactive_danger__highlight)';
  }
  return base;
}

const MultiValueLabel = (
  props: MultiValueGenericProps<AdGroupItem, true, GroupedOption>
) => {
  let icon = computer;
  if (props.data.type === 'Group') icon = group;
  if (props.data.type === 'User') icon = person;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 4,
        backgroundColor: props.data.deleted
          ? 'var(--eds_interactive_danger__highlight)'
          : undefined,
      }}
    >
      <Icon data={icon} size={16} />
      <components.MultiValueLabel {...props} />
    </div>
  );
};
