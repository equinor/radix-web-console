import { Button, Tooltip, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { useState } from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import { Authentication } from './authentication';
import { adGroupModel } from './adGroupModel';

interface State {
  readonly inputValue: string;
}

export interface ADGroupsProps {
  handleAdGroupsChange: (event: any) => void;
}

export const ADGroups = (props: ADGroupsProps): JSX.Element => {
  const { handleAdGroupsChange } = props;

  const [state, setState] = useState<State>({
    inputValue: '',
  });

  const isAuthenticated = useIsAuthenticated();
  const auth = Authentication();

  const options = {
    value: [
      {
        displayName: 'Karabagh project - Country Risk CAR/QAA/QC',
        id: '0000870f-da30-4e72-99cc-7072640f8d1c',
      },
      {
        displayName: 'Fremtidens renhold ',
        id: '0001700e-a198-4939-89e1-5398925c5073',
      },
      {
        displayName: 'Common_Read',
        id: '0001e49c-dc8b-4231-b76e-c9055a53ffb4',
      },
      {
        displayName: 'CPS_Read',
        id: '000230df-a363-4962-b684-f61b4f250f63',
      },
      {
        displayName: 'fg_EPI DEV PMO All',
        id: '00026041-3b7b-4c8d-9a10-56a0c483badb',
      },
      {
        displayName: 'APPL JIT IPGFC',
        id: '00028ff0-0b94-450a-8409-0cd61437ecd9',
      },
    ],
  };

  const filterOptions = (inputValue: string) => {
    // TODO: Run /groups to graph api with $filter=startswith(displayName,`${inputValue}`)&$top=10&$select=displayName,id
    return options.value.filter((i) =>
      i.displayName.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
    );
  };

  const loadOptions = (
    inputValue: string,
    callback: (optionsCallback: adGroupModel[]) => void
  ) => {
    callback(filterOptions(inputValue));
  };

  const handleInputChange = (inputValue: string) => {
    setState({ inputValue });
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
        groups (comma-separated){' '}
        {isAuthenticated ? (
          <span>(Logged in as {auth.user?.displayName || ''})</span>
        ) : (
          <span>(Logget out)</span>
        )}
      </Typography>
      <pre>inputValue: "{state.inputValue}"</pre>
      <AsyncSelect
        isMulti
        name="ADGroups"
        defaultOptions={options.value}
        loadOptions={loadOptions}
        onChange={handleAdGroupsChange}
        onInputChange={handleInputChange}
        getOptionLabel={(options: any) => options.displayName}
        getOptionValue={(options: any) => options.id}
      />
    </>
  );
};

ADGroups.propTypes = {
  handleAdGroupsChange: PropTypes.func.isRequired,
};
