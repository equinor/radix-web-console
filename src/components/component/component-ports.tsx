import { List, Typography } from '@equinor/eds-core-react'
import type { Port } from '../../store/radix-api'

export const ComponentPorts = ({ ports }: { ports: Port[] }) =>
  ports.length > 0 ? (
    <div>
      <Typography>Open ports:</Typography>
      <List className="o-indent-list">
        {ports.map(({ name, port, isPublic }) => (
          <List.Item key={port}>
            {port} ({name}) {isPublic && '- public'}
          </List.Item>
        ))}
      </List>
    </div>
  ) : (
    <Typography>No open ports</Typography>
  )
