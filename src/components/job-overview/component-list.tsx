import { Typography } from '@equinor/eds-core-react';
import { upperFirst } from 'lodash';
import * as PropTypes from 'prop-types';

import { buildComponentMap } from '../../utils/build-component-map';
import { ComponentSummary } from '../../store/radix-api';
import { GitCommitTags } from '../component/git-commit-tags';
import { DockerImage } from '../docker-image';

type Props = {
  components: Array<ComponentSummary>;
  repository: string;
  commonCommitID: string;
};

export const ComponentList = ({
  components,
  repository,
  commonCommitID,
}: Props) => {
  const compMap = buildComponentMap(components);
  return (
    <>
      {Object.keys(compMap).map((type: ComponentSummary['type']) =>
        compMap[type].map((component) => (
          <Typography key={`${type}-${component.name}`}>
            {upperFirst(type)} <strong>{component.name}</strong>
            {' image '}
            <DockerImage path={component.image} />
            {commonCommitID &&
              (component.skipDeployment ||
                component.commitID !== commonCommitID) && (
                <>
                  <> from past deployment</>
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
