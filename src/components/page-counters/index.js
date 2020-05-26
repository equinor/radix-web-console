import React from 'react';
import { connect } from 'react-redux';

import Counter from '../counter';
import * as stateCounters from '../../state/counters';
import {
  incrementSyncCounter,
  requestIncrementAsyncCounter,
} from '../../state/counters/action-creators';

export const PageCounters = ({
  valSync,
  valAsync,
  incrementSync,
  incrementAsync,
  updating,
}) => (
  <React.Fragment>
    <h1 className="o-heading-page">Counters</h1>
    <h2 className="o-heading-section">A synchronous counter</h2>
    <Counter val={valSync} requestIncrement={incrementSync} />
    <h2 className="o-heading-section">An asynchronous counter</h2>
    <Counter val={valAsync} requestIncrement={incrementAsync} />
    {updating && <p>Updating asynchronous counter…</p>}
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  valSync: stateCounters.getSyncCounter(state),
  valAsync: stateCounters.getAsyncCounter(state),
  updating: stateCounters.isUpdatingAsync(state),
});

const mapDispatchToProps = (dispatch) => ({
  incrementSync: () => dispatch(incrementSyncCounter()),
  incrementAsync: () => dispatch(requestIncrementAsyncCounter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageCounters);
