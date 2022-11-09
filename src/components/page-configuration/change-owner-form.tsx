import { Accordion, TextField, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

export const ChangeOwnerForm = ({
  owner,
}: {
  appName?: string;
  owner: string;
}): JSX.Element => (
  <Accordion className="accordion" chevronPosition="right">
    <Accordion.Item>
      <Accordion.Header>
        <Accordion.HeaderTitle>
          <Typography>Owner (deprecated)</Typography>
        </Accordion.HeaderTitle>
      </Accordion.Header>
      <Accordion.Panel>
        <div className="grid grid--gap-medium">
          <TextField
            label="Email"
            id="email_field"
            helperText="Owner of the application (email). Deprecated, set configuration item instead."
            disabled
            value={owner}
          />
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);

ChangeOwnerForm.propTypes = {
  appName: PropTypes.string,
  owner: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<{ appName?: string; owner: string }>;
