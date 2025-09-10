import { type FunctionComponent, useEffect, useState } from 'react'

import { parseImageTag } from '../../utils/docker'

export const DockerImage: FunctionComponent<{ path: string }> = ({ path }) => {
  const [tag, setTag] = useState('')

  useEffect(() => {
    setTag(parseImageTag(path)?.image || '')
  }, [path])

  return <strong>{tag}</strong>
}
