import { Typography } from '@equinor/eds-core-react'
import styles from './applications.module.css'

interface NoSearchResultsProps {
  readonly searchValue: string
}

export const NoSearchResults = (props: NoSearchResultsProps) => {
  const { searchValue } = props

  return (
    <div className={styles.empty}>
      <Typography variant="h3">No applications found</Typography>
      <Typography>
        There are no applications matching your search <strong>"{searchValue}"</strong>
      </Typography>
    </div>
  )
}
