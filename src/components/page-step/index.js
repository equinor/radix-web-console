import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import isYesterday from 'date-fns/is_yesterday';
import PropTypes from 'prop-types';
import React from 'react';

import Breadcrumb from '../breadcrumb';
import DocumentTitle from '../document-title';

import { getStep } from '../../state/job';
import * as subscriptionActions from '../../state/subscriptions/action-creators';

import { routeWithParams, differenceInWords } from '../../utils/string';
import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';

const TIME_FORMAT = 'HH:mm:ss';
const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ssZ';

const getStartTime = startTime => {
  const date = new Date(startTime); // TODO: `startTime` should be a date (set by the Job factory)
  let dateText;

  if (isToday(date)) {
    dateText = `today at ${format(date, TIME_FORMAT)}`;
  } else if (isYesterday(date)) {
    dateText = `yesterday at ${format(date, TIME_FORMAT)}`;
  } else {
    dateText = distanceInWordsToNow(date, { addSuffix: true });
  }

  const timestamp = format(date, DATETIME_FORMAT);

  return (
    <time dateTime={timestamp} title={timestamp}>
      {dateText}
    </time>
  );
};

export class PageStep extends React.Component {
  constructor() {
    super();
    this.state = { now: new Date() };
  }

  componentDidMount() {
    const { subscribeJob, appName, jobName } = this.props;
    subscribeJob(appName, jobName);
    this.interval = setInterval(() => this.setState({ now: new Date() }), 1000);
  }

  componentWillUnmount() {
    const { unsubscribeJob, appName, jobName } = this.props;
    unsubscribeJob(appName, jobName);
  }

  componentDidUpdate(prevProps) {
    const { subscribeJob, unsubscribeJob, appName, jobName } = this.props;

    if (prevProps.jobName !== jobName || prevProps.appName !== appName) {
      unsubscribeJob(appName, prevProps.jobName);
      subscribeJob(appName, jobName);
    }
  }

  render() {
    const { appName, jobName, stepName, step } = this.props;
    return (
      <React.Fragment>
        <DocumentTitle title={stepName} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Jobs', to: routeWithParams(routes.appJobs, { appName }) },
            {
              label: jobName,
              to: routeWithParams(routes.appJob, { appName, jobName }),
            },
            { label: stepName },
          ]}
        />
        <main>
          {!step && 'No step…'}
          {step && (
            <React.Fragment>
              <div className="o-layout-columns">
                <section>
                  <h2 className="o-heading-section">Summary</h2>
                  <p>Step {step.status.toLowerCase()}</p>
                  <p>
                    Started <strong>{getStartTime(step.started)}</strong>
                  </p>
                  {step.ended && (
                    <p>
                      Step took{' '}
                      <strong title={format(step.ended, DATETIME_FORMAT)}>
                        {differenceInWords(step.ended, step.started)}
                      </strong>
                    </p>
                  )}
                  {!step.ended && (
                    <p>
                      Duration so far is{' '}
                      <strong>
                        {differenceInWords(this.state.now, step.started)}
                      </strong>
                    </p>
                  )}
                </section>
              </div>
            </React.Fragment>
          )}
        </main>
      </React.Fragment>
    );
  }
}

PageStep.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  stepName: PropTypes.string.isRequired,
  // TODO step: PropTypes.shape(),
};

const mapStateToProps = (state, ownProps) => ({
  step: getStep(state, ownProps.stepName),
});

const mapDispatchToProps = dispatch => ({
  subscribeJob: (appName, jobName) =>
    dispatch(subscriptionActions.subscribeJob(appName, jobName)),
  unsubscribeJob: (appName, jobName) =>
    dispatch(subscriptionActions.unsubscribeJob(appName, jobName)),
});

export default mapRouteParamsToProps(
  ['appName', 'jobName', 'stepName'],
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageStep)
);
