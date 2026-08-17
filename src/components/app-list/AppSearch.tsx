import { Button, Icon, Search } from '@equinor/eds-core-react'
import { search } from '@equinor/eds-icons'
import { useRef, useState } from 'react'

import styles from './appSearch.module.css'

interface AppSearchProps {
  readonly searchValue: string
  readonly setSearchValue: (value: string) => void
}

export const AppSearch = (props: AppSearchProps) => {
  const { searchValue, setSearchValue } = props

  const [isSearchFieldVisible, setIsSearchFieldVisible] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  const toggleSearchField = () => {
    setIsSearchFieldVisible((prev) => !prev)
    if (!isSearchFieldVisible) {
      setTimeout(() => {
        ref.current?.focus()
      }, 100)
    }
  }
  return (
    <div className={styles.appSearch}>
      {!isSearchFieldVisible && (
        <Button variant="ghost_icon" color="primary" title="Refresh known applications" onClick={toggleSearchField}>
          <Icon data={search} />
        </Button>
      )}
      <Search
        ref={ref}
        className={`${styles.searchField} ${isSearchFieldVisible ? styles.expanded : ''}`}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  )
}
