import { Button, CircularProgress, Icon, Typography } from '@equinor/eds-core-react'
import { refresh } from '@equinor/eds-icons'
import CreateApplication from '../create-application'
import { AllApplicationsList } from './components/AllApplicationsList'
import { AppSearch } from './components/app-search/AppSearch'
import { FavoritesList } from './components/FavoritesList'
import { NoSearchResults } from './components/NoSearchResults'
import { useApplications } from './hooks/useApplications'
import { useAppSearch } from './hooks/useAppSearch'
import { useFavoriteApplications } from './hooks/useFavoriteApplications'

import './style.css'

export const ApplicationsOverview = () => {
  const { favoriteApplications, isFavorite, isLoading: isLoadingFavorites, setFavorite } = useFavoriteApplications()
  const { applicationNames, hasLoadedOnce, isRefreshing, refresh: refreshApplications } = useApplications()
  const search = useAppSearch()

  const applications = applicationNames.map((name) => ({
    name,
    isFavorite: isFavorite(name),
  }))

  const filteredApplications = applications.filter((app) =>
    app.name.toLowerCase().includes(search.searchValue.toLowerCase())
  )

  return (
    <article className="grid grid--gap-medium">
      <div className="app-list__header">
        <Typography variant="body_short_bold">Favorites</Typography>
        <div className="app-list__buttons">
          <CreateApplication />
        </div>
      </div>
      <div className="app-list">
        <FavoritesList
          favoriteApplications={favoriteApplications}
          isLoading={isLoadingFavorites}
          onRemoveFavorite={(appName) => setFavorite(appName, false)}
        />
        <div className="applications-list-title-actions">
          <Typography variant="body_short_bold">All applications</Typography>
          <div className="applications-list-title-actions__right">
            <AppSearch
              searchValue={search.searchValue}
              isSearchFieldVisible={search.isSearchFieldVisible}
              inputRef={search.inputRef}
              onShowSearchField={search.showSearchField}
              onSearchValueChange={search.changeSearchValue}
              onBlur={search.collapseSearchFieldWhenEmpty}
            />
            <Button
              className="action--justify-end"
              variant="outlined"
              color="primary"
              disabled={isRefreshing}
              onClick={refreshApplications}
            >
              {isRefreshing ? <CircularProgress size={16} /> : <Icon data={refresh} />}
              Refresh list
            </Button>
          </div>
        </div>
        <div className="grid grid--gap-medium app-list--section">
          {search.isUserSearching && hasLoadedOnce && filteredApplications.length === 0 ? (
            <NoSearchResults searchTerm={search.searchValue} />
          ) : (
            <AllApplicationsList apps={filteredApplications} hasLoadedOnce={hasLoadedOnce} setFavorite={setFavorite} />
          )}
        </div>
      </div>
    </article>
  )
}
