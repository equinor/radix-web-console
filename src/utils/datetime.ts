import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
  format,
  isThisYear,
  isToday,
  isYesterday,
} from 'date-fns'

import { pluraliser } from './string'

const TIME_FORMAT = 'HH:mm'
const TIME_FORMAT_SECONDS = 'HH:mm:ss'
const DATETIME_FORMAT = "MMM d, yyyy 'at' HH:mm"
const DATETIME_FORMAT_PRECISE = 'yyyy/MM/dd HH:mm:ssxxx'
const DAY_MONTH_YEAR_FORMAT = 'dd MMM yyyy'
const MONTH_DAY_FORMAT = 'MMM d'
const MONTH_DAY_YEAR_FORMAT = 'MMM d, yyyy'
const MONTH_DAY_TIME_FORMAT = 'MMM d, HH:mm'

const timePluralisers = {
  seconds: pluraliser('sec', 'secs'),
  minutes: pluraliser('min', 'mins'),
  hours: pluraliser('hour', 'hours'),
  days: pluraliser('day', 'days'),
  months: pluraliser('month', 'months'),
  years: pluraliser('year', 'years'),
}

/**
 * Formats Date as "MMM d, yyyy 'at' HH:mm"
 *
 * @param date date
 */
export function formatDateTime(date: number | string | Date): string {
  return format(date, DATETIME_FORMAT)
}
/**
 * Formats Date as 'yyyy/MM/dd HH:mm:ssxxx'
 *
 * @param date date
 */
export function formatDateTimePrecise(date: number | Date | string): string {
  return format(date, DATETIME_FORMAT_PRECISE)
}
/**
 * Formats Date as 'dd MMM yyyy'
 *
 * @param date date
 */
export function formatDateTimeYear(date: number | Date): string {
  return format(date, DAY_MONTH_YEAR_FORMAT)
}
/**
 * Formats Date as 'MMM d, HH:mm'
 *
 * @param date date
 */
export function formatDateMonthTime(date: number | Date): string {
  return format(date, MONTH_DAY_TIME_FORMAT)
}

/**
 * Parses the time difference into readable words
 *
 * @param end end time
 * @param start start time
 * @param shortFormat return the greatest difference only (years or months or etc.)
 * @returns time difference in words
 */
export function differenceInWords(
  end: number | string | Date,
  start: number | string | Date,
  shortFormat?: boolean
): string {
  if (shortFormat) {
    let diff: number
    if ((diff = differenceInYears(end, start))) {
      return timePluralisers.years(diff)
    } else if ((diff = differenceInMonths(end, start))) {
      return timePluralisers.months(diff)
    } else if ((diff = differenceInDays(end, start))) {
      return timePluralisers.days(diff)
    } else if ((diff = differenceInHours(end, start))) {
      return timePluralisers.hours(diff)
    } else if ((diff = differenceInMinutes(end, start))) {
      return timePluralisers.minutes(diff)
    } else {
      return timePluralisers.seconds(differenceInSeconds(end, start))
    }
  } else {
    let diffSecs = differenceInSeconds(end, start)

    if (diffSecs < 60) {
      return timePluralisers.seconds(diffSecs)
    }

    let diffMins = differenceInMinutes(end, start)
    diffSecs = diffSecs - diffMins * 60

    if (diffMins < 60) {
      return `${timePluralisers.minutes(diffMins)} ${timePluralisers.seconds(diffSecs)}`
    }

    const diffHours = differenceInHours(end, start)
    diffMins = diffMins - diffHours * 60

    return `${timePluralisers.hours(diffHours)} ${timePluralisers.minutes(
      diffMins
    )} ${timePluralisers.seconds(diffSecs)}`
  }
}

/**
 * Parses the time difference relative to now into readable words
 *
 * @param date date
 * @param capitalize capitalize the first letter
 * @returns relative time in words
 */
export function relativeTimeToNow(
  date: number | Date | string,
  capitalize?: boolean,
  includeSeconds?: boolean
): string {
  const time = format(date, includeSeconds ? TIME_FORMAT_SECONDS : TIME_FORMAT)
  let dateText: string

  if (isToday(date)) {
    dateText = `today at ${time}`
  } else if (isYesterday(date)) {
    dateText = `yesterday at ${time}`
  } else if (isThisYear(date)) {
    dateText = `${format(date, MONTH_DAY_FORMAT)} at ${time}`
  } else {
    dateText = `${format(date, MONTH_DAY_YEAR_FORMAT)} at ${time}`
  }

  return capitalize ? dateText.replace(/\w/, (firstChar) => firstChar.toUpperCase()) : dateText
}
