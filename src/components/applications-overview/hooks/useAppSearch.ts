import { useRef, useState } from 'react'

const FOCUS_DELAY_MS = 100

export const useAppSearch = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isSearchFieldVisible, setIsSearchFieldVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const showSearchField = () => {
    setIsSearchFieldVisible(true)
    setTimeout(() => inputRef.current?.focus(), FOCUS_DELAY_MS)
  }

  const changeSearchValue = (value: string) => {
    setSearchValue(value)
  }

  const collapseSearchFieldWhenEmpty = () => {
    if ((inputRef.current?.value ?? searchValue) === '') {
      setIsSearchFieldVisible(false)
    }
  }

  return {
    searchValue,
    isUserSearching: searchValue.trim().length > 0,
    isSearchFieldVisible,
    inputRef,
    showSearchField,
    changeSearchValue,
    collapseSearchFieldWhenEmpty,
  }
}
