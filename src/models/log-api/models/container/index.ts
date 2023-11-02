import * as PropTypes from 'prop-types';

export type ContainerModel = {
  id: string;
  name?: string;
  creationTimestamp?: Date;
  lastKnown?: Date;
};

/* PropTypes validation map for ContainerModel */
export const ContainerModelValidationMap: PropTypes.ValidationMap<ContainerModel> =
  {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    creationTimestamp: PropTypes.instanceOf(Date),
    lastKnown: PropTypes.instanceOf(Date),
  };
