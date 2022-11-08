import { Accordion, TextField, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

export const ChangeOwnerForm = (props) => {
  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Typography>Owner (deprecated)</Typography>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--gap-medium">
            <TextField
              label="Email"
              helperText="Owner of the application (email). Deprecated, set configuration item instead."
              disabled
              value={props.owner}
            />
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

ChangeOwnerForm.propTypes = {
  appName: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};
