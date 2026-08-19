import { Button, Icon, Search } from '@equinor/eds-core-react'
import { search } from '@equinor/eds-icons'
import { clsx } from 'clsx'
import type { Ref } from 'react'

import styles from './appSearch.module.css'

interface AppSearchProps {
  readonly searchValue: string
  readonly isSearchFieldVisible: boolean
  readonly inputRef: Ref<HTMLInputElement>
  readonly onShowSearchField: () => void
  readonly onSearchValueChange: (value: string) => void
  readonly onBlur: () => void
}

export const AppSearch = (props: AppSearchProps) => {
  const { searchValue, isSearchFieldVisible, inputRef, onShowSearchField, onSearchValueChange, onBlur } = props

  return (
    <div className={styles.appSearch}>
      {!isSearchFieldVisible && (
        <Button variant="ghost_icon" color="primary" title="Search applications" onClick={onShowSearchField}>
          <Icon data={search} />
        </Button>
      )}
      <Search
        ref={inputRef}
        className={clsx(styles.searchField, isSearchFieldVisible && styles.expanded)}
        value={searchValue}
        onChange={(e) => onSearchValueChange(e.target.value)}
        onBlur={onBlur}
        aria-hidden={!isSearchFieldVisible}
        tabIndex={isSearchFieldVisible ? 0 : -1}
        placeholder="Search applications"
      />
    </div>
  )
}
