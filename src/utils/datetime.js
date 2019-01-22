import React from 'react';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import differenceInHours from 'date-fns/difference_in_hours';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import isYesterday from 'date-fns/is_yesterday';

import { pluraliser } from './string';

export const TIME_FORMAT = 'HH:mm:ss';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ssZ';

export const formatDateTime = date => format(new Date(date), TIME_FORMAT);

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

export const relativeTimeToNow = dateTime => {
  const date = new Date(dateTime);
  let dateText;

  if (isToday(date)) {
    dateText = `today at ${format(date, TIME_FORMAT)}`;
  } else if (isYesterday(date)) {
    dateText = `yesterday at ${format(date, TIME_FORMAT)}`;
  } else {
    dateText = distanceInWordsToNow(date, { addSuffix: true });
  }

  const timestamp = format(date, DATETIME_FORMAT);

  return (
    <time dateTime={timestamp} title={timestamp}>
      {dateText}
    </time>
  );
};
