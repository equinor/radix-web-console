import PropTypes from 'prop-types';
import React from 'react';
import { getEnvironment } from '../../state/environment';
import { connect } from 'react-redux';
import { buildComponentTypeLabelMap } from '../../models/component-type';
import Component from '../../models/component';

const ComponentSecrets = ({ component }) => {
  let componentTypeTitle = component
    ? buildComponentTypeLabelMap(component.type)
    : '';
  return (
    <React.Fragment>
      <div>
        <h2 className="o-heading-section">Secrets</h2>
        {component && component.secrets.length === 0 && (
          <p>This {componentTypeTitle.toLowerCase()} uses no secrets</p>
        )}
        {component && component.secrets.length > 0 && (
          <ul className="o-indent-list">
            {component.secrets.map((secret) => (
              <li key={secret}>{secret}</li>
            ))}
          </ul>
        )}
      </div>
    </React.Fragment>
  );
};

ComponentSecrets.propTypes = {
  component: PropTypes.arrayOf(PropTypes.shape(Component)),
};

const mapStateToProps = (state) => ({
  environment: getEnvironment(state),
});

export default connect(mapStateToProps)(ComponentSecrets);
