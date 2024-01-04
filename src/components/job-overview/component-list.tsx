import { Typography } from '@equinor/eds-core-react';
import { upperFirst } from 'lodash';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { buildComponentMap } from '../../models/radix-api/deployments/component-type';
import { ComponentSummary } from '../../store/radix-api';

export interface ComponentListProps {
  components: Array<ComponentSummary>;
}

export const ComponentList: FunctionComponent<ComponentListProps> = ({
  components,
}) => {
  const compMap = buildComponentMap(components);

  return (
    <>
      {Object.keys(compMap).map((type: ComponentSummary['type']) =>
        compMap[type].map(({ name }) => (
          <Typography key={`${type}-${name}`}>
            {upperFirst(type)} <strong>{name}</strong>
          </Typography>
        ))
      )}
    </>
  );
};

ComponentList.propTypes = {
  components: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<ComponentSummary>
  ).isRequired,
};
