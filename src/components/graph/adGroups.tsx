import { Tooltip, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { useEffect, useState } from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import { Authentication } from './authentication';
import { adGroupsModel, adGroupModel } from './adGroupModel';
import { getGroup, getGroups } from './graphService';

interface State {
  readonly inputValue: string;
}

export interface ADGroupsProps {
  handleAdGroupsChange: (event: any) => void;
  adGroups: string;
}

export const ADGroups = (props: ADGroupsProps): JSX.Element => {
  const { handleAdGroupsChange, adGroups } = props;
  const [administrators, setAdministrators] = useState<adGroupsModel>({
    value: [
      {
        displayName: '',
        id: '',
      },
    ],
  });
  const [groups, setGroups] = useState<adGroupsModel>();
  const [state, setState] = useState<State>({
    inputValue: '',
  });
  const isAuthenticated = useIsAuthenticated();
  const auth = Authentication();

  const filterOptions = async (inputValue: string) => {
    const foo = await getGroups(auth.authProvider, 10, inputValue);
    console.log(foo);
    return foo.value;
  };

  const loadOptions = (inputValue: string) =>
    new Promise<adGroupModel[]>((resolve) => {
      setTimeout(() => {
        resolve(filterOptions(inputValue));
      });
    });

  const loadGroups = async () => {
    try {
      const groups = await getGroups(auth.authProvider, 10);
      setGroups(groups);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getGroupInfo = (administratorString: string) => {
    try {
      const foo: adGroupModel[] = [];
      administratorString.split(',').map(async (id) => {
        foo.push(await getGroup(auth.authProvider, id));
      }, setAdministrators({ value: foo }));
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleInputChange = (inputValue: string) => {
    setState({ inputValue });
  };

  useEffect(() => {
    getGroupInfo(adGroups);
    loadGroups();
  }, []);

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
        defaultOptions={groups?.value} // change this with adgroup later. make function to get name of group with id.
        loadOptions={loadOptions}
        onChange={handleAdGroupsChange}
        onInputChange={handleInputChange}
        getOptionLabel={(group: adGroupModel) => group.displayName}
        getOptionValue={(group: adGroupModel) => group.id}
        closeMenuOnSelect={false}
        defaultValue={administrators.value}
      />
    </>
  );
};

ADGroups.propTypes = {
  handleAdGroupsChange: PropTypes.func.isRequired,
  adGroups: PropTypes.string,
};
