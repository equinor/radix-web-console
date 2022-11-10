import { Accordion, TextField, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

export const ChangeWBSForm = (props) => {
  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Typography>WBS (deprecated)</Typography>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--gap-medium">
            <TextField
              label="WBS"
              helperText="WBS of the application for cost allocation. Deprecated, set configuration item instead."
              disabled
              type="text"
              value={props.wbs}
            />
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

ChangeWBSForm.propTypes = {
  appName: PropTypes.string.isRequired,
  wbs: PropTypes.string.isRequired,
};

export default ChangeWBSForm;
