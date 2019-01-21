import dateFormat from 'date-fns/format';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import differenceInHours from 'date-fns/difference_in_hours';

import ColorHash from 'color-hash';

import configHandler from '../utils/config';

export const routeWithParams = (route, params) =>
  route.replace(/:(\w+)/g, (match, key) => params[key]);

export const linkToComponent = (componentName, appName, env) => {
  return `https://${componentName}-${appName}-${env}.${configHandler.getDomain()}`;
};

export const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style = { position: 'absolute', left: '-9999px' };
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const themedColor = (() => {
  const colorHashThemedColor = new ColorHash({
    lightness: 0.66,
    saturation: 0.25,
  });

  return str => colorHashThemedColor.hex(str);
})();

export const formatDateTime = (() => {
  const FORMAT = 'YYYY-MM-DD HH:mm';
  return date => dateFormat(new Date(date), FORMAT);
})();

export const pluraliser = (singular, plural) => unit =>
  unit === 1 ? `${unit} ${singular}` : `${unit} ${plural}`;

export const differenceInWords = (() => {
  const secs = pluraliser('sec', 'secs');
  const mins = pluraliser('min', 'mins');
  const hours = pluraliser('hour', 'hours');

  return (start, end) => {
    let diffSecs = differenceInSeconds(start, end);

    if (diffSecs < 60) {
      return secs(diffSecs);
    }

    let diffMins = differenceInMinutes(start, end);
    diffSecs = diffSecs - diffMins * 60;

    if (diffMins < 60) {
      return `${mins(diffMins)}, ${secs(diffSecs)}`;
    }

    let diffHours = differenceInHours(start, end);
    diffMins = diffMins - diffHours * 60;

    return `${hours(diffHours)}, ${mins(diffMins)}, ${secs(diffSecs)}`;
  };
})();
