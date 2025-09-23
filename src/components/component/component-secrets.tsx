import { List, Typography } from '@equinor/eds-core-react'
import type { FunctionComponent } from 'react'

import type { Component } from '../../store/radix-api'

export const ComponentSecrets: FunctionComponent<{ component: Component }> = ({ component }) => (
  <>
    <Typography variant="h4">Secrets</Typography>
    {component &&
      (component.secrets && component.secrets.length > 0 ? (
        <List className="o-indent-list secrets">
          {component.secrets.map((secret) => (
            <List.Item key={secret}>{secret}</List.Item>
          ))}
        </List>
      ) : (
        <Typography>This {component.type} uses no secrets</Typography>
      ))}
  </>
)
