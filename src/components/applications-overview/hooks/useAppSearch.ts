import { useEffect, useRef, useState } from 'react'

export const useAppSearch = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isSearchFieldVisible, setIsSearchFieldVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchFieldVisible) {
      inputRef.current?.focus()
    }
  }, [isSearchFieldVisible])

  const showSearchField = () => {
    setIsSearchFieldVisible(true)
  }

  const changeSearchValue = (value: string) => {
    setSearchValue(value)
    // Keep focus on the field after the native clear ("x") button empties it
    if (value === '') {
      inputRef.current?.focus()
    }
  }

  const collapseSearchFieldWhenEmpty = () => {
    if ((inputRef.current?.value ?? searchValue) === '') {
      setIsSearchFieldVisible(false)
    }
  }

  const searchTerm = searchValue.trim()

  return {
    searchValue, // The actual user-typed value in the search input field, including whitespace
    searchTerm, // The trimmed search term, used for filtering applications
    isUserSearching: searchTerm.length > 0,
    isSearchFieldVisible,
    inputRef,
    showSearchField,
    changeSearchValue,
    collapseSearchFieldWhenEmpty,
  }
}
