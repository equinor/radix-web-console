/**
 * This file exports factories of models; these have a schema that the Web
 * Console knows to be correct. Any transformation/normalisation of properties
 * should happen in these functions
 */

import pick from 'lodash/pick';

import * as models from '.';

/**
 * Create an ApplicationRegistration object
 * @param {Object} props Properties of the application object
 */
export const ApplicationRegistrationFactory = props =>
  // This is just a pass-through based on keys from the model; no transformation
  Object.freeze(pick(props, Object.keys(models.ApplicationRegistration)));

/**
 * Create an ApplicationSummary object
 */
export const ApplicationSummaryFactory = props =>
  Object.freeze(pick(props, Object.keys(models.ApplicationSummary)));

/**
 * Create an Application object
 */
export const ApplicationFactory = props =>
  Object.freeze(pick(props, Object.keys(models.Application)));
