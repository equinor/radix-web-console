import * as configKeys from './keys';
import * as jsonConfig from '../../config.json';

const keys = configKeys.keys;
var arr = [];
Object.keys(keys).forEach(function (key) {
  arr.push(keys[key]);
});

const configVariables = {};

arr.map((c) => {
  var value = window[c];
  if (!window[c] || window[c].startsWith('${')) {
    value = jsonConfig.default[c];
  }
  return (configVariables[c] = value);
});
export default configVariables;
