import dateFormat from 'date-fns/format';

import ColorHash from 'color-hash';

import configHandler from '../utils/config';

export const routeWithParams = (route, params, search) => {
  let url = route.replace(/:(\w+)/g, (match, key) => params[key]);

  if (search) {
    const searchParams = [];

    for (const key in search) {
      searchParams.push(`${key}=${search[key]}`);
    }

    return `${url}?${searchParams.join('&')}`;
  }

  return url;
};

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
