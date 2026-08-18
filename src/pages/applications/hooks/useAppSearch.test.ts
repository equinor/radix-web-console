import { act, renderHook } from '@testing-library/react'

import { useAppSearch } from './useAppSearch'

describe('useAppSearch', () => {
  it('starts with the search field hidden and no search term', () => {
    const { result } = renderHook(() => useAppSearch())

    expect(result.current.isSearchFieldVisible).toBe(false)
    expect(result.current.searchTerm).toBe('')
    expect(result.current.isUserSearching).toBe(false)
  })

  it('shows the search field when requested', () => {
    const { result } = renderHook(() => useAppSearch())

    act(() => result.current.showSearchField())

    expect(result.current.isSearchFieldVisible).toBe(true)
  })

  it('trims surrounding whitespace from the search term', () => {
    const { result } = renderHook(() => useAppSearch())

    act(() => result.current.changeSearchValue('  radix  '))

    expect(result.current.searchTerm).toBe('radix')
  })

  it('does not treat a whitespace-only value as an active search', () => {
    const { result } = renderHook(() => useAppSearch())

    act(() => result.current.changeSearchValue('   '))

    expect(result.current.isUserSearching).toBe(false)
  })

  it('treats a non-empty value as an active search', () => {
    const { result } = renderHook(() => useAppSearch())

    act(() => result.current.changeSearchValue('radix'))

    expect(result.current.isUserSearching).toBe(true)
  })

  it('collapses the search field on blur when the value is empty', () => {
    const { result } = renderHook(() => useAppSearch())

    act(() => result.current.showSearchField())
    act(() => result.current.collapseSearchFieldWhenEmpty())

    expect(result.current.isSearchFieldVisible).toBe(false)
  })

  it('keeps the search field open on blur when a value is present', () => {
    const { result } = renderHook(() => useAppSearch())

    act(() => result.current.showSearchField())
    act(() => result.current.changeSearchValue('radix'))
    act(() => result.current.collapseSearchFieldWhenEmpty())

    expect(result.current.isSearchFieldVisible).toBe(true)
  })

  it('refocuses the search input when the value is cleared', () => {
    const { result } = renderHook(() => useAppSearch())

    const input = document.createElement('input')
    document.body.appendChild(input)
    result.current.inputRef.current = input

    act(() => result.current.changeSearchValue(''))

    expect(document.activeElement).toBe(input)

    input.remove()
  })
})
