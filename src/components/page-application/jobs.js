import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import React from 'react';
import PropTypes from 'prop-types';

import Chip from '../chip';

import { getJobs } from '../../state/new_application';
import * as subscriptionActions from '../../state/subscriptions/action-creators';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import { JobSummary } from 'radix-web-console-models';

const getJobDate = job => distanceInWordsToNow(new Date(job.started));
const getJobLabel = job => `${getJobDate(job)} - ${job.status}`;
const jobsSorter = (a, b) => new Date(b.started) - new Date(a.started);

export class Jobs extends React.Component {
  componentDidMount() {
    const { subscribeApplication, appName } = this.props;
    subscribeApplication(appName);
  }

  componentWillUnmount() {
    const { unsubscribeApplication, appName } = this.props;
    unsubscribeApplication(appName);
  }

  render() {
    const { appName, jobs } = this.props;

    if (!jobs) {
      return 'Loading jobs…';
    }

    if (jobs && jobs.length === 0) {
      return 'No jobs yet 😕';
    }

    return (
      <ul className="o-inline-list o-inline-list--spacing">
        {jobs
          .sort(jobsSorter)
          .slice(0, 5)
          .map(job => (
            <li key={job.name}>
              <Chip>
                <Link
                  to={routeWithParams(routes.appJob, {
                    appName,
                    jobName: job.name,
                  })}
                >
                  {getJobLabel(job)}
                </Link>
              </Chip>
            </li>
          ))}
      </ul>
    );
  }
}

Jobs.propTypes = {
  appName: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(JobSummary)),
  subscribeApplication: PropTypes.func.isRequired,
  unsubscribeApplication: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, { appName }) => ({
  subscribeApplication: () =>
    dispatch(subscriptionActions.subscribeApplication(appName)),
  unsubscribeApplication: appName =>
    dispatch(subscriptionActions.unsubscribeApplication(appName)),
});

const mapStateToProps = state => ({
  jobs: getJobs(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Jobs);
