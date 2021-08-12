import differenceInSeconds from 'date-fns/differenceInSeconds';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInHours from 'date-fns/differenceInHours';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';
import isThisYear from 'date-fns/isThisYear';

import { pluraliser } from './string';

const DATETIME_FORMAT_PRECISE = 'yyyy/MM/dd HH:mm:ssxxx';
const TIME_FORMAT = 'HH:mm';
const DATETIME_FORMAT = 'MMM d, yyyy [at] HH:mm';
const DATE_FORMAT = 'MMM d';
const DATE_YEAR_FORMAT = 'MMM d, yyyy';
const DAY_MONTH_YEAR_FORMAT = 'dd MMM yyyy';

export const formatDateTimeYear = (date) => format(date, DAY_MONTH_YEAR_FORMAT);
export const formatDateTime = (date) => format(date, DATETIME_FORMAT);
export const formatDateTimePrecise = (date) =>
  format(date, DATETIME_FORMAT_PRECISE);

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
      return `${mins(diffMins)} ${secs(diffSecs)}`;
    }

    let diffHours = differenceInHours(start, end);
    diffMins = diffMins - diffHours * 60;

    return `${hours(diffHours)} ${mins(diffMins)} ${secs(diffSecs)}`;
  };
})();

export const relativeTimeToNow = (date, capitalize) => {
  let dateText;

  if (isToday(date)) {
    dateText = `today at ${format(date, TIME_FORMAT)}`;
  } else if (isYesterday(date)) {
    dateText = `yesterday at ${format(date, TIME_FORMAT)}`;
  } else if (isThisYear(date)) {
    dateText = `${format(date, DATE_FORMAT)} at ${format(date, TIME_FORMAT)}`;
  } else {
    dateText = `${format(date, DATE_YEAR_FORMAT)} at ${format(date, TIME_FORMAT)}`; // prettier-ignore
  }

  if (capitalize) {
    dateText = dateText.replace(/\w/, (firstChar) => firstChar.toUpperCase());
  }

  return dateText;
};
