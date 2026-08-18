import { Typography } from '@equinor/eds-core-react'

interface NoSearchResultsProps {
  readonly searchTerm: string
}

export const NoSearchResults = (props: NoSearchResultsProps) => {
  const { searchTerm } = props

  return (
    <div className="app-list--empty">
      <Typography variant="h3">No applications found</Typography>
      <Typography>
        There are no applications matching your search <strong>"{searchTerm}"</strong>
      </Typography>
    </div>
  )
}
