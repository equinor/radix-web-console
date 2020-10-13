import differenceInSeconds from 'date-fns/difference_in_seconds';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import differenceInHours from 'date-fns/difference_in_hours';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import isYesterday from 'date-fns/is_yesterday';
import isThisYear from 'date-fns/is_this_year';

import { pluraliser } from './string';

const DATETIME_FORMAT_PRECISE = 'YYYY/MM/DD HH:mm:ssZ';
const TIME_FORMAT = 'HH:mm';
const DATETIME_FORMAT = 'MMM D, YYYY [at] HH:mm';
const DATE_FORMAT = 'MMM D';
const DATE_YEAR_FORMAT = 'MMM D, YYYY';
const DAY_MONTH_YEAR_FORMAT = 'DD MMM YYYY';

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
      return `${mins(diffMins)}, ${secs(diffSecs)}`;
    }

    let diffHours = differenceInHours(start, end);
    diffMins = diffMins - diffHours * 60;

    return `${hours(diffHours)}, ${mins(diffMins)}, ${secs(diffSecs)}`;
  };
})();

export const relativeTimeToNow = (date) => {
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

  return dateText;
};
