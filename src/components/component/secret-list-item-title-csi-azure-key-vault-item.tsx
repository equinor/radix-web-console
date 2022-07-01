import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { SecretModel, SecretModelValidationMap } from '../../models/secret';
import { SecretListItemTitle } from './secret-list-item-title';

export const SecretListItemTitleCsiAzureKeyVaultItem = ({
  secret,
}: {
  secret: SecretModel;
}): JSX.Element => (
  <>
    <Typography as="span">
      <SecretListItemTitle secret={secret} />
    </Typography>
  </>
);

SecretListItemTitleCsiAzureKeyVaultItem.propTypes = {
  secret: PropTypes.shape(SecretModelValidationMap).isRequired,
} as PropTypes.ValidationMap<{
  secret: SecretModel;
}>;
