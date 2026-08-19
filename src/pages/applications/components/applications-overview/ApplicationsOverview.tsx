import { Button, CircularProgress, Icon, Typography } from '@equinor/eds-core-react'
import { refresh } from '@equinor/eds-icons'
import { clsx } from 'clsx'
import { Banner } from '../../../../components/banner/Banner'
import CreateApplication from '../../../../components/create-application'
import { getFetchErrorMessage } from '../../../../store/utils/parse-errors'
import { useApplications } from '../../hooks/useApplications'
import { useAppSearch } from '../../hooks/useAppSearch'
import { useFavoriteApplications } from '../../hooks/useFavoriteApplications'
import { AllApplicationsList } from '../AllApplicationsList'
import { AppSearch } from '../app-search/AppSearch'
import sharedStyles from '../applications.module.css'
import { FavoritesList } from '../FavoritesList'
import { NoSearchResults } from '../NoSearchResults'
import styles from './ApplicationsOverview.module.css'

export const ApplicationsOverview = () => {
  const { favoriteApplications, isFavorite, isLoading: isLoadingFavorites, setFavorite } = useFavoriteApplications()
  const { applicationNames, hasLoadedOnce, isRefreshing, error, refresh: refreshApplications } = useApplications()
  const search = useAppSearch()

  const applications = applicationNames.map((name) => ({
    name,
    isFavorite: isFavorite(name),
  }))

  const searchTerm = search.searchTerm.toLowerCase()
  const filteredApplications = applications.filter((app) => app.name.toLowerCase().includes(searchTerm))

  return (
    <article className="grid grid--gap-medium">
      <div className={styles.header}>
        <Typography variant="body_short_bold">Favorites</Typography>
        <div className={styles.buttons}>
          <CreateApplication />
        </div>
      </div>
      <div className={styles.appList}>
        <FavoritesList
          favoriteApplications={favoriteApplications}
          isLoading={isLoadingFavorites}
          onRemoveFavorite={(appName) => setFavorite(appName, false)}
        />
        <div className={styles.titleActions}>
          <Typography variant="body_short_bold">All applications</Typography>
          <div className={styles.titleActionsRight}>
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
        {error && (
          <div>
            <Banner variant="danger">Failed to load applications. {getFetchErrorMessage(error)}</Banner>
          </div>
        )}
        <div className={clsx('grid grid--gap-medium', sharedStyles.section)}>
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
