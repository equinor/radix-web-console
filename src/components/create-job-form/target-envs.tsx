import { Typography } from '@equinor/eds-core-react'
import { Fragment } from 'react'

type Props = {
  targetEnvs: Array<string>
  branch?: string
}
export function TargetEnvs({ targetEnvs, branch }: Props) {
  const penultimateId = targetEnvs.length - 2

  return targetEnvs.length > 0 ? (
    <Typography>
      Branch <code>{branch}</code> will be deployed to{' '}
      {targetEnvs.length === 1 ? (
        <>
          <code>{targetEnvs[0]}</code> environment
        </>
      ) : (
        <>
          {targetEnvs.map((env, i) => (
            <Fragment key={i}>
              <code>{env}</code>
              {i < penultimateId ? ', ' : ''}
              {i === penultimateId ? ' and ' : ''}
            </Fragment>
          ))}
          environments
        </>
      )}
    </Typography>
  ) : branch ? (
    <Typography>
      radixconfig.yaml file will be read and deployed from branch <code>{branch}</code> to any environment{' '}
      <code>{branch}</code> is mapped to
    </Typography>
  ) : null
}
