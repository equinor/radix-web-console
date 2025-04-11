import { Icon, Typography } from '@equinor/eds-core-react';
import { debounce } from 'lodash-es';
import { type MutableRefObject, useRef, useState } from 'react';
import {
  type IndicatorsContainerProps,
  type PropsValue,
  components,
} from 'react-select';

import { ConfigurationItemPopover } from './ci-popover';

import { Alert } from '../alert';

import './style.css';
import { info_circle } from '@equinor/eds-icons';
import AsyncSelect from 'react-select/async';
import {
  type Application,
  type GetApplicationsApiResponse,
  serviceNowApi,
  useGetApplicationQuery,
} from '../../store/service-now-api';
import { getFetchErrorMessage } from '../../store/utils/parse-errors';

export type OnConfigurationItemChangeCallback = (
  ci: Application | null
) => void;
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
  name?: string;
  configurationItemChangeCallback?: OnConfigurationItemChangeCallback;
  disabled?: boolean;
  configurationItem?: string;
}
export function AppConfigConfigurationItem({
  configurationItem,
  configurationItemChangeCallback,
  disabled,
  name = 'ConfigurationItem',
}: Props) {
  const [selectedCI, setSelectedCI] = useState<Application | null | undefined>(
    undefined
  );
  const [popoverCI, setPopoverCI] = useState<Application | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [getApplications] =
    serviceNowApi.endpoints.getApplications.useLazyQuery();

  const { data: currentCI, ...currentCIState } = useGetApplicationQuery(
    {
      appId: configurationItem!,
    },
    { skip: !configurationItem }
  );

  const containerRef = useRef<HTMLDivElement>();

  function onChange(newValue: Application | null): void {
    configurationItemChangeCallback?.(newValue);
    setSelectedCI(newValue);
    setPopoverOpen(false);
  }

  const onLoad = (
    inputValue: string | null,
    callback: (apps: Application[]) => unknown
  ) => {
    if (inputValue == null || inputValue.length < 3) {
      callback([]);
      return;
    }

    loadOptions(callback, getApplications, inputValue);
  };
  const onInfoIconClick = (ci: Application) => {
    setPopoverCI(ci);
    setPopoverOpen(!popoverOpen);
  };

  if (currentCIState.isLoading) return <h1>loading...</h1>;

  return (
    <div className="configuration-item-select">
      <Typography className="label" group="input" variant="text">
        Configuration item
      </Typography>
      <AsyncSelect<Application>
        // @ts-expect-error onInfoIconClick is defined in IndicatorsContainer
        components={{ IndicatorsContainer }}
        onInfoIconClick={onInfoIconClick}
        containerRef={containerRef}
        name={name}
        menuPosition="fixed"
        closeMenuOnScroll={({ target }: Event) =>
          !(target as HTMLElement)?.parentElement?.className?.match(/menu/)
        }
        loadOptions={onLoad}
        onChange={onChange}
        getOptionLabel={({ name }) => name}
        getOptionValue={({ id }) => id}
        closeMenuOnSelect={false}
        value={selectedCI}
        defaultValue={currentCI}
        isClearable
        isDisabled={disabled}
      />
      <Typography className="helpertext" group="input" variant="text">
        Application from Business Applications Inventory (type 3 characters to
        search)
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

type InfoIconProps = IndicatorsContainerProps<Application, false> & {
  selectProps: {
    onInfoIconClick: (value: PropsValue<Application>) => void;
    containerRef?: MutableRefObject<HTMLDivElement>;
  };
};

const IndicatorsContainer = ({ children, ...props }: InfoIconProps) => (
  <components.IndicatorsContainer {...props}>
    {props.hasValue && props.selectProps.onInfoIconClick && (
      <div ref={props.selectProps.containerRef}>
        <Icon
          style={{ cursor: 'pointer' }}
          data={info_circle}
          onClick={(event) => {
            event.stopPropagation();
            props.selectProps.onInfoIconClick(props.selectProps.value);
          }}
        />
      </div>
    )}
    {children}
  </components.IndicatorsContainer>
);
