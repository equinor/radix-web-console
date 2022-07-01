import { Accordion, List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { RootState } from '../../../init/store';
import {
  EnvironmentModel,
  EnvironmentModelValidationMap,
} from '../../../models/environment';
import { getComponentSecret, getEnvironment } from '../../../state/environment';
import { SecretListItem } from './secret-list-item';

interface ActiveComponentSecretsData {
  environment?: EnvironmentModel;
}

export interface ActiveComponentSecretsProps
  extends ActiveComponentSecretsData {
  appName: string;
  envName: string;
  componentName: string;
  secrets?: Array<string>;
}

export const ActiveComponentSecrets = function ({
  appName,
  envName,
  componentName,
  secrets,
  environment,
}: ActiveComponentSecretsProps): JSX.Element {
  // const [visibleScrim, setVisibleScrim] = useState(false);

  return secrets.length > 0 ? (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              Secrets
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <List className="o-indent-list">
            {secrets
              .map((name) => ({
                name: name,
                secret: getComponentSecret(environment, name, componentName),
              }))
              .map(({ name, secret }) => (
                <List.Item key={name}>
                  <SecretListItem
                    appName={appName}
                    envName={envName}
                    componentName={componentName}
                    secret={secret}
                  />
                </List.Item>
              ))}
          </List>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ) : (
    <Typography>This component has no secrets</Typography>
  );
};

ActiveComponentSecrets.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  secrets: PropTypes.arrayOf(PropTypes.string),
  environment: PropTypes.shape(EnvironmentModelValidationMap),
} as PropTypes.ValidationMap<ActiveComponentSecretsProps>;

const mapStateToProps = (state: RootState): ActiveComponentSecretsData => ({
  environment: getEnvironment(state),
});

export default connect(mapStateToProps)(ActiveComponentSecrets);
