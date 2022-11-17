import { CircularProgress, Typography } from '@equinor/eds-core-react';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

import {
  DataChartItemColumnOptions,
  DataChartItemEvents,
  DataChartItemOptions,
  DataChartTimelineColumnOptions,
  DataChartTimelineOptions,
} from './data-chart-options';

import { ScrimPopup } from '../scrim-popup';
import { createDynatraceApiUrl } from '../../api/api-config';
import { getJson } from '../../api/api-helpers';
import { configVariables } from '../../utils/config';
import { differenceInWords, formatDateMonthTime } from '../../utils/datetime';

import './style.css';

interface AvailabilityPointsResponse {
  result: Array<{
    metricId: string;
    data: Array<{
      dimensions: Array<string>;
      dimensionMap: Map<string, string>;
      timestamps: Array<number>;
      values: Array<number>;
    }>;
  }>;
}

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
  const period = formatDateMonthTime(start) + ' - ' + formatDateMonthTime(end);
  const duration = differenceInWords(end, start, true);
  return (
    '<div class="chart-tooltip grid grid--gap-small">' +
    '  <span>Status code: ' +
    `    <span class="${clsx('status-code', { [status]: !!status })}">` +
    (status?.substring(3) ?? 'N/A') +
    '    </span>' +
    '  </span>' +
    `  <span>Period: ${period}</span>` +
    `  <span>Duration: ${duration}</span>` +
    '</div>'
  );
}

function makeStatusCodeUrl(
  baseUrl: string,
  monitorName: string,
  resolution: string,
  from: string,
  to: string = undefined,
  filter: string = undefined
): string {
  return (
    '/v2/metrics/query' +
    '?metricSelector=builtin:synthetic.http.request.statusCode' +
    (filter ? `:filter(${filter})` : '') +
    '&entitySelector=type(http_check_step)' +
    `,entityName.equals(canary.${baseUrl})` +
    ',fromRelationships.isStepOf(' +
    'type(http_check)' +
    ',mzName(RADIX)' +
    `,entityName("${monitorName}"))` +
    `&from=${from}` +
    (to ? `&to=${to}` : '') +
    `&resolution=${resolution}`
  );
}

export const AvailabilityCharts = (): JSX.Element => {
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  const [availabilityItems, setAvailabilityItems] = useState<
    Array<AvailabilityItem>
  >([]);
  const [statusCodeItems, setStatusCodeItems] = useState<Array<StatusCodeItem>>(
    []
  );
  const [isScrimVisible, setScrimVisible] = useState(false);

  useEffect(() => {
    const clusterType = configVariables.RADIX_CLUSTER_TYPE;
    const monitorName = `Radix Services ${clusterType.replace(
      /\w/,
      (firstChar) => firstChar.toUpperCase()
    )}`;

    // get all status codes from the specified HTTP monitor step
    getJson(
      createDynatraceApiUrl(
        makeStatusCodeUrl(
          configVariables.RADIX_CLUSTER_BASE,
          monitorName,
          '1d',
          'now-90d'
        )
      )
    ).then(
      (reply: AvailabilityPointsResponse) => {
        const data: Array<StatusCodeItem> = [];
        reply.result[0].data.forEach((x) =>
          x.values.forEach((y, i) => {
            if (y) {
              // check for errors within day and if so, perform another query with higher resolution.
              if (x.dimensionMap['Status code'] !== 'SC_2xx') {
                getJson(
                  createDynatraceApiUrl(
                    makeStatusCodeUrl(
                      configVariables.RADIX_CLUSTER_BASE,
                      monitorName,
                      '1m',
                      `${x.timestamps[i] - 86400000}`,
                      `${x.timestamps[i]}`,
                      'ne("Status code",SC_2xx)'
                    )
                  )
                ).then(
                  (reply: AvailabilityPointsResponse) =>
                    reply.result[0].data.forEach((a) =>
                      a.values.forEach((b, i) => {
                        data.push({
                          timestamp: a.timestamps[i],
                          statusCode: !!b
                            ? a.dimensionMap['Status code']
                            : 'SC_2xx', // fill non-error rows with status 2xx
                        });
                      })
                    ),
                  (error: Error) => {
                    setError(error);
                    console.error(error);
                  }
                );
              } else {
                data.push({
                  timestamp: x.timestamps[i],
                  statusCode: x.dimensionMap['Status code'],
                });
              }
            }
          })
        );

        setStatusCodeItems(data);
      },
      (error: Error) => {
        setError(error);
        console.error(error);
      }
    );

    // get availability percentage per resolution of the specified HTTP monitor
    getJson(
      createDynatraceApiUrl(
        '/v2/metrics/query' +
          '?metricSelector=builtin:synthetic.http.availability.location.total' +
          '&entitySelector=type(http_check)' +
          `,entityName("${monitorName}")` +
          '&from=now-90d' +
          '&resolution=30m'
      )
    ).then(
      (reply: AvailabilityPointsResponse) => {
        const data = reply.result[0].data[0];
        const availabilityDatapoints = data.timestamps.reduce<
          Array<AvailabilityItem>
        >((obj, x, i) => {
          obj.push({
            date: new Date(x),
            value: data.values[i],
            description: availabilityTooltip(x, data.values[i]),
          });
          return obj;
        }, []);

        setAvailabilityItems(availabilityDatapoints);
        setLoading(false);
      },
      (error: Error) => {
        setLoading(false);
        setError(error);
        console.error(error);
      }
    );
  }, []);

  if (error) {
    // fetch returned error
    return <span>Failed to load chart</span>;
  }

  if (
    loading ||
    statusCodeItems.length === 0 ||
    availabilityItems.length === 0
  ) {
    // fetch is loading or items are empty
    return (
      <strong>
        <CircularProgress size={16} /> Loading
      </strong>
    );
  }

  statusCodeItems.sort((a, b) =>
    a.timestamp === b.timestamp
      ? a.statusCode.localeCompare(b.statusCode)
      : a.timestamp > b.timestamp
      ? 1
      : -1
  );

  // calculate availability percentage
  const availabilityPercentage =
    Math.floor(
      (Number(availabilityItems.reduce((prev, cur) => (prev += cur.value), 0)) /
        availabilityItems.length) *
        100
    ) / 100;

  let timeStart = new Date(statusCodeItems[0].timestamp);
  const timelineDataPoints: Array<TimelineDataPoint> = [];

  for (let i = 1; i < statusCodeItems.length; i++) {
    const prev_status_code = statusCodeItems[i - 1].statusCode;

    if (
      statusCodeItems[i].statusCode !== prev_status_code ||
      i === statusCodeItems.length - 1
    ) {
      // status is different than previous item. set end time and reset start time
      const timeEnd = new Date(statusCodeItems[i].timestamp);

      timelineDataPoints.push({
        timelineType: 'Period',
        statusCode: `Status code: ${prev_status_code}`,
        description: timelineTooltip(timeStart, timeEnd, prev_status_code),
        timeStart: timeStart,
        timeEnd: timeEnd,
      });
      timeStart = new Date(statusCodeItems[i].timestamp);
    }
  }

  // add dummy data to match charts timeStart
  if (availabilityItems[0].date < timelineDataPoints[0].timeStart) {
    const timeEnd = timelineDataPoints[0].timeStart;
    const timeStart = availabilityItems[0].date;

    timelineDataPoints.unshift({
      description: timelineTooltip(timeStart, timeEnd),
      statusCode: 'Status code: SC_0xx',
      timeEnd: timeEnd,
      timeStart: timeStart,
      timelineType: 'Period',
    });
  } else if (availabilityItems[0].date > timelineDataPoints[0].timeStart) {
    const timestamp = timelineDataPoints[0].timeStart;

    availabilityItems.unshift({
      date: timestamp,
      description: availabilityTooltip(timestamp, -1),
      value: 100,
    });
  }

  // add dummy data to match charts timeEnd
  if (
    availabilityItems[availabilityItems.length - 1].date >
    timelineDataPoints[timelineDataPoints.length - 1].timeEnd
  ) {
    const timeEnd = availabilityItems[availabilityItems.length - 1].date;
    const timeStart = timelineDataPoints[timelineDataPoints.length - 1].timeEnd;

    timelineDataPoints.push({
      description: timelineTooltip(timeStart, timeEnd),
      statusCode: 'Status code: SC_0xx',
      timeEnd: timeEnd,
      timeStart: timeStart,
      timelineType: 'Period',
    });
  } else if (
    availabilityItems[availabilityItems.length - 1].date <
    timelineDataPoints[timelineDataPoints.length - 1].timeEnd
  ) {
    const timestamp = timelineDataPoints[timelineDataPoints.length - 1].timeEnd;

    availabilityItems.push({
      date: timestamp,
      description: availabilityTooltip(timestamp, -1),
      value: 100,
    });
  }

  return (
    <>
      <Typography variant="h4">Availability past 90 days</Typography>
      <div className="chart-percentage" onClick={() => setScrimVisible(true)}>
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
        open={isScrimVisible}
        onClose={() => setScrimVisible(false)}
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
          <Chart
            chartType="AreaChart"
            className="chart-area"
            rows={availabilityItems.map((x) => [
              x.date,
              x.value,
              x.description,
            ])}
            columns={DataChartItemColumnOptions}
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
          <Chart
            chartType="Timeline"
            className="chart-timeline"
            rows={timelineDataPoints.map((x) => [
              x.timelineType,
              x.statusCode,
              x.description,
              x.timeStart,
              x.timeEnd,
            ])}
            columns={DataChartTimelineColumnOptions}
            options={{
              ...DataChartTimelineOptions,
              ...{
                colors: timelineDataPoints
                  .reduce((a, b) => {
                    if (!a.includes(b.statusCode)) {
                      a.push(b.statusCode);
                    }
                    return a;
                  }, [])
                  .map((x) => timelineColorMap[x]),
              },
            }}
          />
        </div>
      </ScrimPopup>
    </>
  );
};
