import React from 'react';
import { testSaga } from 'redux-saga-test-plan';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getPod } from '../../state/pods';
import { getText } from '../../api/api-helpers';

class PageApplicationPod extends React.Component {

  constructor(props) {
    super(props);
    this.podlog = "";
  }
  //TODO: MAKE BUTTON TO LOAD IN LOGS INSTEAD

  componentWillMount() {
    // let link = 'namespaces/'+this.props.pod.metadata.namespace+'/pods/'+this.props.ownProps.match.params.pod;
    let testlink = 'namespaces/default/pods/radix-kubernetes-api-proxy-55984d8db8-zjdhm';
    getText(testlink + '/log', 'radix_dev_playground_k8s').then(res =>
      this.podlog = res,
    );
  }

  componentWillUpdate() {
    // let link = 'namespaces/'+this.props.pod.metadata.namespace+'/pods/'+this.props.ownProps.match.params.pod;
    let testlink = 'namespaces/default/pods/radix-kubernetes-api-proxy-55984d8db8-zjdhm';
    getText(testlink + '/log', 'radix_dev_playground_k8s').then(res =>
      this.podlog = res,
    );
  }

  render() {
    console.log(this.podlog);

    return (
      <React.Fragment>
        <div className="o-layout-page-head">
          <h1 className="o-heading-page">Pod</h1>
        </div>
        <p>Hello, this is the pod page</p>
        {/* TODO: show pod logs */}
        {!this.podlog && <p>There are no logs here</p>}
        <div>{this.podlog}</div>
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  ownProps: ownProps,
  pod: getPod(state, ownProps.match.params.pod),
});

export default withRouter(
  connect(
    mapStateToProps
  )(PageApplicationPod)
);



