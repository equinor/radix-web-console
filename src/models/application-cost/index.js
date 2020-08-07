import PropTypes from 'prop-types';

export default Object.freeze({
  name: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  wbs: PropTypes.string,
  cost: PropTypes.number,
  currency: PropTypes.string,
  costPercentageByCpu: PropTypes.number,
  costPercentageByMemory: PropTypes.number,
  comment: PropTypes.string,
});
