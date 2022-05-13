import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  isThisYear,
  isToday,
  isYesterday,
} from 'date-fns';

import { pluraliser } from './string';

const DATETIME_FORMAT_PRECISE: string = 'yyyy/MM/dd HH:mm:ssxxx';
const TIME_FORMAT: string = 'HH:mm';
const DATETIME_FORMAT: string = "MMM d, yyyy 'at' HH:mm";
const DATE_FORMAT: string = 'MMM d';
const DATE_YEAR_FORMAT: string = 'MMM d, yyyy';
const DAY_MONTH_YEAR_FORMAT: string = 'dd MMM yyyy';

const secondsPluraliser = pluraliser('sec', 'secs');
const minutesPluraliser = pluraliser('min', 'mins');
const hoursPluraliser = pluraliser('hour', 'hours');

export function formatDateTimeYear(date: number | Date): string {
  return format(date, DAY_MONTH_YEAR_FORMAT);
}
export function formatDateTime(date: number | Date): string {
  return format(date, DATETIME_FORMAT);
}
export function formatDateTimePrecise(date: number | Date): string {
  return format(date, DATETIME_FORMAT_PRECISE);
}

export function differenceInWords(
  start: number | Date,
  end: number | Date
): string {
  let diffSecs = differenceInSeconds(start, end);

  if (diffSecs < 60) {
    return secondsPluraliser(diffSecs);
  }

  let diffMins = differenceInMinutes(start, end);
  diffSecs = diffSecs - diffMins * 60;

  if (diffMins < 60) {
    return `${minutesPluraliser(diffMins)} ${secondsPluraliser(diffSecs)}`;
  }

  const diffHours = differenceInHours(start, end);
  diffMins = diffMins - diffHours * 60;

  return `${hoursPluraliser(diffHours)} ${minutesPluraliser(
    diffMins
  )} ${secondsPluraliser(diffSecs)}`;
}

export function relativeTimeToNow(
  date: number | Date,
  capitalize?: boolean
): string {
  let dateText: string;

  if (isToday(date)) {
    dateText = `today at ${format(date, TIME_FORMAT)}`;
  } else if (isYesterday(date)) {
    dateText = `yesterday at ${format(date, TIME_FORMAT)}`;
  } else if (isThisYear(date)) {
    dateText = `${format(date, DATE_FORMAT)} at ${format(date, TIME_FORMAT)}`;
  } else {
    dateText = `${format(date, DATE_YEAR_FORMAT)} at ${format(date, TIME_FORMAT)}`; // prettier-ignore
  }

  return capitalize
    ? dateText.replace(/\w/, (firstChar) => firstChar.toUpperCase())
    : dateText;
}
