import { Typography } from '@equinor/eds-core-react';
import { debounce } from 'lodash-es';
import * as PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import type { MultiValue, SingleValue } from 'react-select';

import { ConfigurationItemPopover } from './ci-popover';
import { ConfigurationItemSelect } from './ci-select';

import { Alert } from '../alert';

import './style.css';
import {
  type Application,
  type GetApplicationsApiResponse,
  serviceNowApi,
  useGetApplicationQuery,
} from '../../store/service-now-api';
import { getFetchErrorMessage } from '../../store/utils';

export type OnConfigurationItemChangeCallback = (ci?: Application) => void;
type GetApplicationsFunction = ReturnType<
  typeof serviceNowApi.endpoints.getApplications.useLazyQuery
>[0];

const loadOptions = debounce(
  (
    callback: (options: GetApplicationsApiResponse) => void,
    getApplications: GetApplicationsFunction,
    name: string
  ) => filterOptions(getApplications, name).then(callback),
  500
);

async function filterOptions(
  getApplications: GetApplicationsFunction,
  inputValue: string
) {
  return await getApplications({ name: inputValue, limit: 10 }).unwrap();
}

export interface Props {
  configurationItemChangeCallback: OnConfigurationItemChangeCallback;
  disabled?: boolean;
  configurationItem?: string;
}
export function AppConfigConfigurationItem({
  configurationItem,
  configurationItemChangeCallback,
  disabled,
}: Props) {
  const [selectedCI, setSelectedCI] = useState<Application | null>(null);
  const [popoverCI, setPopoverCI] = useState<Application>();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [getApplications] =
    serviceNowApi.endpoints.getApplications.useLazyQuery();

  const { data: currentCI, ...currentCIState } = useGetApplicationQuery(
    {
      appId: configurationItem,
    },
    { skip: !configurationItem }
  );

  useEffect(() => {
    setSelectedCI(currentCI);
  }, [currentCI]);
  const containerRef = useRef<HTMLDivElement>(null);

  function onChange(newValue?: Application): void {
    configurationItemChangeCallback(newValue);
    setSelectedCI(newValue);
    setPopoverOpen(false);
  }

  return (
    <div className="configuration-item-select">
      <Typography className="label" group="input" variant="text">
        Configuration item
      </Typography>
      <ConfigurationItemSelect<Application>
        onInfoIconClick={(ev, ci) => {
          ev.stopPropagation();
          setPopoverCI(
            Array.isArray(ci)
              ? (ci as MultiValue<Application>)[0]
              : (ci as SingleValue<Application>)
          );
          setPopoverOpen(!popoverOpen);
        }}
        containerRef={containerRef}
        name="ConfigurationItem"
        menuPosition="fixed"
        closeMenuOnScroll={({ target }: Event) =>
          !(target as HTMLElement)?.parentElement?.className?.match(/menu/)
        }
        noOptionsMessage={() => null}
        loadOptions={(inputValue, callback) => {
          inputValue?.length < 3
            ? callback([])
            : loadOptions(callback, getApplications, inputValue);
        }}
        onChange={onChange}
        getOptionLabel={({ name }) => name}
        getOptionValue={({ id }) => id}
        isClearable
        closeMenuOnSelect={false}
        value={selectedCI}
        isDisabled={disabled}
      />
      <Typography className="helpertext" group="input" variant="text">
        Application from IT Software Inventory (type 3 characters to search)
      </Typography>

      {currentCIState.isError && (
        <div>
          <Alert type="danger">
            <Typography>
              Failed to load. {getFetchErrorMessage(currentCIState.error)}
            </Typography>
          </Alert>
        </div>
      )}

      {popoverCI && (
        <ConfigurationItemPopover
          anchorEl={containerRef.current}
          open={popoverOpen}
          configurationItem={popoverCI}
          onClose={() => setPopoverOpen(false)}
        />
      )}
    </div>
  );
}

AppConfigConfigurationItem.propTypes = {
  configurationItemChangeCallback: PropTypes.func.isRequired,
  configurationItem: PropTypes.string,
  disabled: PropTypes.bool,
};
