import { Typography } from '@equinor/eds-core-react';
import { upperFirst } from 'lodash';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { buildComponentMap } from '../../utils/build-component-map';
import { ComponentSummary } from '../../store/radix-api';
import { GitCommitTags } from '../component/git-commit-tags';

export interface ComponentListProps {
  components: Array<ComponentSummary>;
  repository: string;
}

export const ComponentList: FunctionComponent<ComponentListProps> = ({
  components,
  repository,
}) => {
  const compMap = buildComponentMap(components);

  return (
    <>
      {Object.keys(compMap).map((type: ComponentSummary['type']) =>
        compMap[type].map((component) => (
          <Typography key={`${type}-${component.name}`}>
            {upperFirst(type)} <strong>{component.name}</strong>
            {component.skipDeployment && (
              <>
                {' keep deployment '}
                <GitCommitTags
                  commitID={component.commitID}
                  gitTags={component.gitTags}
                  repository={repository}
                />
              </>
            )}
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
