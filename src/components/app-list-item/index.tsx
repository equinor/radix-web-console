import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { star_filled, star_outlined } from '@equinor/eds-icons';
import classNames from 'classnames';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { AppBadge } from '../app-badge';
import { StatusBadge } from '../status-badge';
import { ApplicationSummaryModel } from '../../models/application-summary';
import { routes } from '../../routes';
import { ProgressStatus } from '../../models/progress-status';
import { routeWithParams } from '../../utils/string';

import './style.css';

export type FavouriteClickedHandler = (
  event: MouseEvent<HTMLButtonElement>,
  name: string
) => void;

export type AppListItemProps = {
  app: ApplicationSummaryModel;
  handler: FavouriteClickedHandler;
  isPlaceholder?: boolean;
  isFavourite?: boolean;
};

const LatestJobSummary = ({
  app,
}: {
  app: ApplicationSummaryModel;
}): JSX.Element => {
  if (!app?.latestJob?.started) {
    return (
      <>
        <div className="app-list--details-info">
          <Typography variant="h6">{app.name}</Typography>
        </div>
        {app.name && <StatusBadge type="warning">Unknown</StatusBadge>}
      </>
    );
  }

  const time =
    app.latestJob.status === ProgressStatus.Running || !app.latestJob.ended
      ? app.latestJob.started
      : app.latestJob.ended;
  const timeSince = formatDistanceToNow(new Date(time), { addSuffix: true });

  return (
    <>
      <div className="app-list--details-info">
        <Typography variant="h6" className="app-list-item--title">
          {app.name}
        </Typography>
        <Typography variant="caption">{timeSince}</Typography>
      </div>
      <StatusBadge type={app.latestJob.status}>
        {app.latestJob.status}
      </StatusBadge>
    </>
  );
};

const FavouriteButton = (props: {
  app: ApplicationSummaryModel;
  handler: FavouriteClickedHandler;
  isFavourite: boolean;
}): JSX.Element => (
  <Button
    variant="ghost_icon"
    onClick={(e) => props.handler(e, props.app.name)}
  >
    <Icon data={props.isFavourite ? star_filled : star_outlined} size={24} />
  </Button>
);

const WElement = (
  props: {
    app: ApplicationSummaryModel;
    isPlaceholder?: boolean;
  } & React.HTMLAttributes<HTMLDivElement>
): JSX.Element =>
  props.isPlaceholder ? (
    <div className={props.className}>{props.children}</div>
  ) : (
    <Link
      className={props.className}
      to={routeWithParams(routes.app, { appName: props.app.name })}
    >
      {props.children}
    </Link>
  );

export const AppListItem = (props: AppListItemProps): JSX.Element => (
  <div
    className={classNames('app-list-item', {
      'app-list-item--placeholder': props.isPlaceholder,
    })}
  >
    <WElement
      className="app-list-item--area"
      app={props.app}
      isPlaceholder={props.isPlaceholder}
    >
      <div className="app-list-item--area-content">
        <div className="app-list-item--area-icon">
          {!props.isPlaceholder && (
            <AppBadge appName={props.app.name} size={40} />
          )}
        </div>
        <div className="app-list-item--area-details">
          <LatestJobSummary app={props.app} />
        </div>
      </div>
      {!props.isPlaceholder && (
        <FavouriteButton
          app={props.app}
          handler={props.handler}
          isFavourite={props.isFavourite}
        />
      )}
    </WElement>
  </div>
);
