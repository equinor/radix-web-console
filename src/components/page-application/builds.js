import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import React from 'react';

import Chip from '../chip';

import { getAppBuilds } from '../../state/applications';
import buildStatuses from '../../state/applications/build-statuses';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';

const getBuildStatus = build => {
  const status = build.status;

  if (!status.completionTime) {
    return buildStatuses.BUILDING;
  } else if (status.failed) {
    return buildStatuses.FAILURE;
  } else if (status.succeeded) {
    return buildStatuses.SUCCESS;
  }

  return buildStatuses.IDLE;
};

const getBuildDate = build =>
  distanceInWordsToNow(new Date(build.metadata.creationTimestamp));

const getBuildLabel = build =>
  `${getBuildDate(build)} - ${getBuildStatus(build)}`;

const Builds = ({ appName, builds }) => {
  if (!builds) {
    return 'Loading builds…';
  }
  if (builds && builds.length === 0) {
    return 'No builds yet 😕';
  }

  return (
    <ul className="o-inline-list o-inline-list--spacing">
      {builds.map(build => (
        <li key={build.metadata.name}>
          <Chip>
            <Link
              to={routeWithParams(routes.appBuild, {
                appName,
                buildName: build.metadata.name,
              })}
            >
              {getBuildLabel(build)}
            </Link>
          </Chip>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state, ownProps) => ({
  builds: getAppBuilds(state, ownProps.appName).slice(0, 5),
});

export default connect(mapStateToProps)(Builds);
