import { Typography } from '@equinor/eds-core-react';
import type { FunctionComponent } from 'react';
import type { Runtime as RuntimeModel } from '../../store/radix-api';

export interface RuntimeProps {
  runtime: RuntimeModel;
}

export const Runtime: FunctionComponent<RuntimeProps> = ({ runtime }) => (
  <>
    {runtime.architecture && (
      <Typography>
        Architecture <strong>{runtime.architecture}</strong>
      </Typography>
    )}
  </>
);
