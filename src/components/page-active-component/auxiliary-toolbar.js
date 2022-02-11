// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import React from 'react';

// import { auxiliaryResourceRestartState } from '../../state/oauth-auxiliary-resource';
// import componentStatuses from '../../state/component/component-states';
// import auxiliaryResourceActions from '../../state/oauth-auxiliary-resource/action-creators';
// import requestStatuses from '../../state/state-utils/request-states';

// import { Button, CircularProgress } from '@equinor/eds-core-react';

// class AuxiliaryToolbar extends React.Component {
//   constructor() {
//     super();

//     this.doRestartAuxiliaryResource =
//       this.doRestartAuxiliaryResource.bind(this);
//   }

//   doRestartAuxiliaryResource(ev) {
//     ev.preventDefault();
//     this.props.restartAuxiliaryResource(
//       this.props.appName,
//       this.props.envName,
//       this.props.componentName,
//       this.props.auxiliaryResource.type
//     );
//   }

//   render() {
//     const { auxiliaryResource, restartRequestStatus, restartRequestMessage } =
//       this.props;

//     const isRestartEnabled =
//       auxiliaryResource &&
//       auxiliaryResource.deployment &&
//       auxiliaryResource.deployment.status === componentStatuses.CONSISTENT &&
//       auxiliaryResource.deployment.replicaList != null &&
//       auxiliaryResource.deployment.replicaList.length > 0 &&
//       restartRequestStatus !== requestStatuses.IN_PROGRESS;

//     const restartInProgress =
//       restartRequestStatus === requestStatuses.IN_PROGRESS ||
//       (auxiliaryResource &&
//         auxiliaryResource.deployment &&
//         (auxiliaryResource.deployment.status ===
//           componentStatuses.RECONCILING ||
//           auxiliaryResource.deployment.status ===
//             componentStatuses.RESTARTING));

//     return (
//       <div className="component-actions">
//         <Button
//           onClick={this.doRestartAuxiliaryResource}
//           disabled={!isRestartEnabled}
//           variant="outlined"
//         >
//           Restart
//         </Button>
//         {restartInProgress && <CircularProgress size="32" />}
//         {restartRequestMessage && <div>{restartRequestMessage}</div>}
//       </div>
//     );
//   }
// }

// AuxiliaryToolbar.propTypes = {
//   restartRequestStatus: PropTypes.oneOf(Object.values(requestStatuses)),
//   restartRequestMessage: PropTypes.string,
// };

// const mapStateToProps = (state) => ({
//   restartRequestStatus:
//     auxiliaryResourceRestartState.getRestartRequestStatus(state),
//   restartRequestMessage:
//     auxiliaryResourceRestartState.getRestartRequestError(state),
// });

// const mapDispatchToProps = (dispatch) => ({
//   restartAuxiliaryResource: (appName, envName, componentName, auxType) =>
//     dispatch(
//       auxiliaryResourceActions.restart.restartRequest(
//         appName,
//         envName,
//         componentName,
//         auxType
//       )
//     ),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(AuxiliaryToolbar);
