import { CircularProgress, Typography } from '@equinor/eds-core-react';
import { clsx } from 'clsx';
import { FunctionComponent, useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

import {
  DataChartItemColumnOptions,
  DataChartItemEvents,
  DataChartItemOptions,
  DataChartTimelineColumnOptions,
  DataChartTimelineOptions,
  googleChartDataBuilder,
} from './data-chart-options';

import { ScrimPopup } from '../scrim-popup';
import { configVariables } from '../../utils/config';
import { differenceInWords, formatDateMonthTime } from '../../utils/datetime';
import {
  dataSorter,
  sortCompareNumber,
  sortCompareString,
} from '../../utils/sort-utils';

import './style.css';
import {
  GenericResponse,
  useGetAvailabilityItemsQuery,
  useLazyGetStatusItemsQuery,
} from '../../store/dynatrace-api';
import { isNull } from 'lodash';

type GetStatusItemsFunction = ReturnType<typeof useLazyGetStatusItemsQuery>[0];

interface AvailabilityItem {
  date: Date;
  value: number;
  description: string;
}

interface StatusCodeItem {
  timestamp: number;
  statusCode: string;
}

interface TimelineDataPoint {
  timelineType: string;
  statusCode: string;
  description: string;
  timeStart: Date;
  timeEnd: Date;
}

/**
 * Colors for timeline chart
 */
const timelineColorMap: Record<string, string> = {
  'Status code: SC_0xx': '#9c9c9c',
  'Status code: SC_2xx': '#007079',
  'Status code: SC_4xx': '#7D0023',
  'Status code: SC_5xx': '#7D0023',
};

function availabilityTooltip(
  timestamp: number | Date,
  availability: number
): string {
  const availStr = availability !== -1 ? `${availability.toFixed(2)}%` : 'N/A';
  return (
    '<div class="chart-tooltip grid grid--gap-small">' +
    `  <span>${formatDateMonthTime(timestamp)}</span>` +
    `  <span>Availability: ${availStr}</span>` +
    '</div>'
  );
}

function timelineTooltip(start: Date, end: Date, status?: string): string {
  const period = `${formatDateMonthTime(start)} - ${formatDateMonthTime(end)}`;
  const duration = differenceInWords(end, start, true);
  return (
    '<div class="chart-tooltip grid grid--gap-small">' +
    '  <span>Status code: ' +
    `    <span class="${clsx('status-code', { [status ?? '']: !!status })}">` +
    (status?.substring(3) ?? 'N/A') +
    '    </span>' +
    '  </span>' +
    `  <span>Period: ${period}</span>` +
    `  <span>Duration: ${duration}</span>` +
    '</div>'
  );
}

async function getStatusItems(
  queryFn: GetStatusItemsFunction,
  monitorName: string
): Promise<Array<StatusCodeItem>> {
  return queryFn({ monitorName, resolution: '1d', from: 'now-90d' })
    .unwrap()
    .then(({ result: [{ data }] }) =>
      data.reduce<Array<StatusCodeItem>>(
        (items, loRes) =>
          loRes.values.reduce((obj, x, i) => {
            if (x) {
              // check for errors within day and if so, perform another query with higher resolution.
              if (loRes.dimensionMap['Status code'] !== 'SC_2xx') {
                queryFn({
                  monitorName,
                  resolution: '1m',
                  from: `${loRes.timestamps[i] - 1000 * 60 * 60 * 24}`,
                  to: `${loRes.timestamps[i]}`,
                  filter: 'ne("Status code",SC_2xx)',
                })
                  .unwrap()
                  .then(({ result: [{ data }] }) =>
                    data.forEach((hiRes) =>
                      hiRes.values.forEach((y, i) =>
                        obj.push({
                          timestamp: hiRes.timestamps[i],
                          statusCode: y
                            ? hiRes.dimensionMap['Status code']
                            : 'SC_2xx', // fill non-error rows with status 2xx
                        })
                      )
                    )
                  )
                  .catch((err) => {
                    throw err;
                  });
              } else {
                obj.push({
                  timestamp: loRes.timestamps[i],
                  statusCode: loRes.dimensionMap['Status code'],
                });
              }
            }
            return obj;
          }, items),
        []
      )
    )
    .catch((err) => {
      throw err;
    });
}

function generateTimelineData(
  statusItems: Array<StatusCodeItem>
): Array<TimelineDataPoint> {
  let start = new Date(statusItems[0]?.timestamp);
  return statusItems.reduce<Array<TimelineDataPoint>>(
    (obj, { statusCode, timestamp }, i, a) => {
      i++; // focus on next item
      if (a[i] && (a.length - 1 === i || statusCode !== a[i].statusCode)) {
        // end of list or status is different from previous item, set end and prepare start
        const end = new Date(timestamp);
        obj.push({
          timelineType: 'Period',
          statusCode: `Status code: ${statusCode}`,
          description: timelineTooltip(start, end, statusCode),
          timeStart: start,
          timeEnd: end,
        });
        start = end;
      }
      return obj;
    },
    []
  );
}

function capitalize(word: string) {
  return word.replace(/\w/, (firstChar) => firstChar.toUpperCase());
}

function reduceAvailabilityData(data: GenericResponse) {
  const { timestamps, values } = data?.result?.[0]?.data[0] ?? {};

  const reduced =
    timestamps?.reduce<Array<AvailabilityItem>>((carry, x, i) => {
      if (isNull(values[i])) return carry;

      return [
        ...carry,
        {
          date: new Date(x),
          value: values[i],
          description: availabilityTooltip(x, values[i]),
        },
      ];
    }, []) ?? [];

  return reduced;
}

export const AvailabilityCharts: FunctionComponent = () => {
  const { RADIX_CLUSTER_TYPE } = configVariables;
  const monitorName = `Radix Services ${capitalize(RADIX_CLUSTER_TYPE)}`;
  const [getStatusCodes] = useLazyGetStatusItemsQuery();

  const { data: availabilityData, isLoading: isAvailabilityLoading } =
    useGetAvailabilityItemsQuery(
      { monitorName },
      {
        selectFromResult: ({ data, ...stats }) => {
          return {
            data: data ? reduceAvailabilityData(data) : undefined,
            ...stats,
          };
        },
      }
    );

  const [error, setError] = useState<Error>();
  const [statusLoading, setStatusLoading] = useState(true);
  const [visibleScrim, setVisibleScrim] = useState(false);
  const [statusCodes, setStatusCodes] = useState<Array<StatusCodeItem>>([]);

  useEffect(() => {
    let mounted = true;
    const { RADIX_CLUSTER_TYPE } = configVariables;
    const monitorName = `Radix Services ${capitalize(RADIX_CLUSTER_TYPE)}`;

    // get all status codes from the specified HTTP monitor step
    getStatusItems(getStatusCodes, monitorName)
      .then((res) => (mounted ? setStatusCodes(res) : null))
      .catch((err) => (mounted ? setError(err) : null))
      .finally(() => (mounted ? setStatusLoading(false) : null));

    return () => {
      mounted = false;
    };
  }, [getStatusCodes]);

  if (error) {
    return <span>Failed to load chart</span>;
  }

  if (isAvailabilityLoading || statusLoading) {
    return (
      <strong>
        <CircularProgress size={16} /> Loading
      </strong>
    );
  }

  if (
    !availabilityData ||
    (availabilityData.length === 0 && statusCodes.length === 0)
  ) {
    return (
      <Typography variant="body_short_bold">
        Not enough data to display charts
      </Typography>
    );
  }

  // calculate availability percentage
  const availabilityPercentage =
    Math.floor(
      (Number(availabilityData.reduce((prev, cur) => (prev += cur.value), 0)) /
        availabilityData.length) *
        100
    ) / 100;

  const timelineData = generateTimelineData(
    dataSorter(statusCodes, [
      ({ statusCode: s1, timestamp: t1 }, { statusCode: s2, timestamp: t2 }) =>
        sortCompareNumber(t1, t2) || sortCompareString(s1, s2),
    ])
  );

  // adjust charts to match start and end
  if (timelineData.length > 0 && availabilityData.length > 0) {
    // add dummy data to match charts timeStart
    if (availabilityData[0].date < timelineData[0].timeStart) {
      const timeStart = availabilityData[0].date;
      const timeEnd = timelineData[0].timeStart;
      timelineData.unshift({
        description: timelineTooltip(timeStart, timeEnd),
        statusCode: 'Status code: SC_0xx',
        timeEnd: timeEnd,
        timeStart: timeStart,
        timelineType: 'Period',
      });
    } else if (availabilityData[0].date > timelineData[0].timeStart) {
      const { timeStart } = timelineData[0];
      availabilityData.unshift({
        date: timeStart,
        description: availabilityTooltip(timeStart, -1),
        value: 100,
      });
    }

    // add dummy data to match charts timeEnd
    if (
      availabilityData[availabilityData.length - 1].date >
      timelineData[timelineData.length - 1].timeEnd
    ) {
      const timeStart = timelineData[timelineData.length - 1].timeEnd;
      const timeEnd = availabilityData[availabilityData.length - 1].date;
      timelineData.push({
        description: timelineTooltip(timeStart, timeEnd),
        statusCode: 'Status code: SC_0xx',
        timeEnd: timeEnd,
        timeStart: timeStart,
        timelineType: 'Period',
      });
    } else if (
      availabilityData[availabilityData.length - 1].date <
      timelineData[timelineData.length - 1].timeEnd
    ) {
      const { timeEnd } = timelineData[timelineData.length - 1];
      availabilityData.push({
        date: timeEnd,
        description: availabilityTooltip(timeEnd, -1),
        value: 100,
      });
    }
  }

  return (
    <>
      <Typography variant="h4">Availability past 90 days</Typography>
      <div className="chart-percentage" onClick={() => setVisibleScrim(true)}>
        <div className="chart-percentage__ring">
          <CircularProgress
            variant="determinate"
            value={Math.min(Math.max(availabilityPercentage, 0), 100)}
          />
          <Typography>{`${availabilityPercentage.toFixed(2)}%`}</Typography>
        </div>
        <Typography link>View history</Typography>
      </div>
      <ScrimPopup
        title="Availability"
        open={visibleScrim}
        onClose={() => setVisibleScrim(false)}
        isDismissable
      >
        <div className="chart-container grid grid--gap-medium">
          <Typography>
            For more information on availability, please check the{' '}
            <Typography
              link
              href="https://radix.equinor.com/docs/topic-uptime/"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation.
            </Typography>
          </Typography>

          {availabilityData.length > 0 ? (
            <>
              <Chart
                chartType="AreaChart"
                className="chart-area"
                data={googleChartDataBuilder(
                  DataChartItemColumnOptions,
                  ...availabilityData.map((x) => [
                    x.date,
                    x.value,
                    x.description,
                  ])
                )}
                options={DataChartItemOptions}
                chartEvents={DataChartItemEvents}
              />
              <svg
                aria-hidden="true"
                focusable="false"
                style={{ width: 0, height: 0, position: 'absolute' }}
              >
                <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#007079" />
                  <stop offset="87.5%" stopColor="#FFF" />
                </linearGradient>
              </svg>
            </>
          ) : (
            <Typography variant="body_short_bold" style={{ margin: '0 auto' }}>
              Not enough data to display Availability chart
            </Typography>
          )}

          {timelineData.length > 0 ? (
            <Chart
              chartType="Timeline"
              className="chart-timeline"
              data={googleChartDataBuilder(
                DataChartTimelineColumnOptions,
                ...timelineData.map((x) => [
                  x.timelineType,
                  x.statusCode,
                  x.description,
                  x.timeStart,
                  x.timeEnd,
                ])
              )}
              options={{
                ...DataChartTimelineOptions,
                colors: timelineData
                  .filter(
                    ({ statusCode }, i, a) =>
                      a.findIndex((y) => y.statusCode === statusCode) === i
                  )
                  .map(({ statusCode }) => timelineColorMap[statusCode]),
              }}
            />
          ) : (
            <Typography variant="body_short_bold" style={{ margin: '0 auto' }}>
              Not enough data to display Timeline chart
            </Typography>
          )}
        </div>
      </ScrimPopup>
    </>
  );
};
