import { Button, type ButtonProps, CircularProgress } from '@equinor/eds-core-react'
import { useState } from 'react'

type Props = ButtonProps & {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
}
export function LoadingButton({ onClick, ...rest }: Props) {
  const [loading, setLoading] = useState(false)

  const onLocalClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      try {
        setLoading(true)
        await onClick(e)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Button onClick={onLocalClick} {...rest} disabled={loading}>
      <span style={{ visibility: loading ? 'hidden' : 'visible' }}>{rest.children}</span>
      {loading && (
        <CircularProgress
          size={24}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
            color: 'currentColor',
          }}
        />
      )}
    </Button>
  )
}
