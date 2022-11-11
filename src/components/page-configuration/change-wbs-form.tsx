import { Accordion, TextField, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

export const ChangeWBSForm = ({
  wbs,
}: {
  appName?: string;
  wbs: string;
}): JSX.Element => (
  <Accordion className="accordion" chevronPosition="right">
    <Accordion.Item>
      <Accordion.Header>
        <Accordion.HeaderTitle>
          <Typography>WBS (deprecated)</Typography>
        </Accordion.HeaderTitle>
      </Accordion.Header>
      <Accordion.Panel>
        <div className="grid grid--gap-medium">
          <TextField
            label="WBS"
            id="wbs_field"
            helperText="WBS of the application for cost allocation. Deprecated, set configuration item instead."
            disabled
            type="text"
            value={wbs}
          />
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);

ChangeWBSForm.propTypes = {
  appName: PropTypes.string,
  wbs: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<{ appName?: string; wbs: string }>;
