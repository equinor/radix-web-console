import React from 'react';
import { withRouter } from 'react-router';

/**
 * Maps route parameters as defined in react-router and injects them as
 * first-class props into a component. This avoids components being tightly
 * coupled with the prop structure returned by withRouter()
 *
 * @example
 * // Inject "family", "genus", and "species" in a URL like
 * // "/fam/:family/g/:genus/sp/:species" as props of the same name into MyComponent
 * mapRouteParamsToProps(['family', 'genus', 'species'], MyComponent);
 *
 * @todo Support object (key => string) as paramsToMap (rename params)
 * @todo Support object (key => function) as paramsToMap (like mapStateToProps)
 *
 * @param {string[]} paramsToMap List of URL parameters to inject as props
 * @param {React.Component} Component Component to receive props
 */
export function mapRouteParamsToProps(paramsToMap, Component) {
  return withRouter(props => {
    const mappedProps = {};

    paramsToMap.forEach(
      param =>
        (mappedProps[param] =
          props.match && props.match.params
            ? props.match.params[param]
            : undefined)
    );

    return React.createElement(Component, { ...mappedProps, ...props });
  });
}
