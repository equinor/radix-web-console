import { CircularProgress, Typography } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

import {
  DataChartItemColumnOptions,
  DataChartItemEvents,
  DataChartItemOptions,
  DataChartTimelineColumnOptions,
  DataChartTimelineOptions,
} from './data-chart-options';

import { getJson } from '../../dynatrace-api/api-helpers';
import { configVariables } from '../../utils/config';

import './style.css';
import { ScrimPopup } from '../scrim-popup';

interface AvailabilityPointsResponse {
  result: Array<{
    metricId: string;
    data: Array<{
      dimensions: string[];
      dimensionMap: Map<string, string>;
      timestamps: number[];
      values: number[];
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
 * Cluster type aliases
 */
const clusterAlias: { [key: string]: string } = {
  production: 'platform',
};

/**
 * Colors for timeline chart
 */
const timelineColorMap: { [key: string]: string } = {
  'Status code: SC_0xx': '#9c9c9c',
  'Status code: SC_2xx': '#007079',
  'Status code: SC_4xx': '#7D0023',
  'Status code: SC_5xx': '#7D0023',
};

/**
 * Date time chart format options
 */
const timeFormattingOptions: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};

function timeDuration(date: Date): string {
  const seconds = Math.floor(date.getTime() / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return `${Math.floor(interval)} years`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} months`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} days`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} hours`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes`;
  }
  return `${Math.floor(seconds)} seconds`;
}

export const AvailabilityCharts = (): JSX.Element => {
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  const [availabilityItems, setAvailabilityItems] = useState<
    AvailabilityItem[]
  >([]);
  const [statusCodeItems, setStatusCodeItems] = useState<StatusCodeItem[]>([]);
  const [isScrimVisible, setScrimVisible] = useState(false);

  useEffect(() => {
    const clusterType =
      clusterAlias[configVariables.RADIX_CLUSTER_TYPE] ||
      configVariables.RADIX_CLUSTER_TYPE;
    const monitorName =
      'Radix ' + clusterType.charAt(0).toUpperCase() + clusterType.slice(1);

    // Get all status codes from the specified HTTP monitor step
    getJson(
      '/v2/metrics/query' +
        '?metricSelector=builtin:synthetic.http.request.statusCode' +
        '&entitySelector=type(http_check_step)' +
        ',entityName("Radix Canary")' +
        ',fromRelationships.isStepOf(' +
        'type("http_check")' +
        ',mzName("RADIX")' +
        `,entityName("${monitorName}"))` +
        '&from=now-90d' +
        '&resolution=1d'
    ).then(
      (reply: AvailabilityPointsResponse) => {
        const data: StatusCodeItem[] = [];
        reply.result[0].data.forEach((x) =>
          x.values.forEach((y, i) => {
            if (y) {
              // Check for errors within day and if so, perform another query with higher resolution.
              if (x.dimensionMap['Status code'] !== 'SC_2xx') {
                getJson(
                  '/v2/metrics/query' +
                    '?metricSelector=builtin:synthetic.http.request.statusCode' +
                    ':filter(ne("Status code",SC_2xx))' +
                    '&entitySelector=type("http_check_step")' +
                    ',entityName("Radix Canary")' +
                    ',fromRelationships.isStepOf(' +
                    'type("http_check")' +
                    ',mzName("RADIX")' +
                    `,entityName("${monitorName}"))` +
                    `&from=${x.timestamps[i] - 86400000}` +
                    `&to=${x.timestamps[i]}` +
                    '&resolution=1m'
                ).then(
                  (reply: AvailabilityPointsResponse) =>
                    reply.result[0].data.forEach((a) =>
                      a.values.forEach((b, i) => {
                        data.push(
                          !!b
                            ? {
                                timestamp: a.timestamps[i],
                                statusCode: a.dimensionMap['Status code'],
                              }
                            : {
                                timestamp: a.timestamps[i],
                                statusCode: 'SC_2xx', // Fill non-error rows with status 2xx
                              }
                        );
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

    // Get availability percentage per resolution of the specified HTTP monitor
    getJson(
      '/v2/metrics/query' +
        '?metricSelector=builtin:synthetic.http.availability.location.total' +
        '&entitySelector=type(http_check)' +
        `,entityName("${monitorName}")` +
        '&from=now-90d' +
        '&resolution=30m'
    ).then(
      (reply: AvailabilityPointsResponse) => {
        const values = reply.result[0].data[0].values;
        const availabilityDatapoints = reply.result[0].data[0].timestamps
          .map((x, i): AvailabilityItem => {
            if (values[i]) {
              const description =
                '<div class="chart-tooltip grid grid--gap-small">' +
                '  <span>' +
                new Date(x).toLocaleDateString('en-US', timeFormattingOptions) +
                '  </span>' +
                `  <span>Availability: ${values[i].toFixed(2)}%</span>` +
                '</div>';
              return {
                date: new Date(x),
                value: values[i],
                description: description,
              };
            }
            return null;
          })
          .filter((x) => !!x);

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

  let timeStart = new Date(statusCodeItems[0].timestamp);
  const timelineDataPoints: TimelineDataPoint[] = [];

  for (let i = 1; i < statusCodeItems.length; i++) {
    const prev_status_code = statusCodeItems[i - 1].statusCode;

    if (
      statusCodeItems[i].statusCode !== prev_status_code ||
      i === statusCodeItems.length - 1
    ) {
      // status is different than previous item. set end time and reset start time
      const timeEnd = new Date(statusCodeItems[i].timestamp);

      const duration = timeDuration(
        new Date(timeEnd.getTime() - timeStart.getTime())
      );

      timelineDataPoints.push({
        timelineType: 'Period',
        statusCode: `Status code: ${prev_status_code}`,
        description:
          '<div class="chart-tooltip grid grid--gap-small">' +
          '  <span>Status code: ' +
          `    <span class="status-code ${prev_status_code}">` +
          prev_status_code.substring(3) +
          '    </span>' +
          '  </span>' +
          '  <span>Period: ' +
          timeStart.toLocaleDateString('en-US', timeFormattingOptions) +
          ' - ' +
          timeEnd.toLocaleDateString('en-US', timeFormattingOptions) +
          '  </span>' +
          `  <span>Duration: ${duration}</span>` +
          '</div>',
        timeStart: timeStart,
        timeEnd: timeEnd,
      });
      timeStart = new Date(statusCodeItems[i].timestamp);
    }
  }

  // Calculate availability percentage
  const availabilityPercentage =
    Math.floor(
      (Number(availabilityItems.reduce((prev, cur) => (prev += cur.value), 0)) /
        availabilityItems.length) *
        100
    ) / 100;

  if (availabilityItems[0].date < timelineDataPoints[0].timeStart) {
    const timeEnd = timelineDataPoints[0].timeStart;
    const timeStart = availabilityItems[0].date;

    timelineDataPoints.unshift({
      description:
        '<div class="chart-tooltip grid grid--gap-small">' +
        '  <span>Status code: ' +
        '    <span class="status-code">N/A</span>' +
        '  </span>' +
        '  <span>Period: ' +
        timeStart.toLocaleDateString('en-US', timeFormattingOptions) +
        ' - ' +
        timeEnd.toLocaleDateString('en-US', timeFormattingOptions) +
        '  </span>' +
        `  <span>Duration: ${timeDuration(
          new Date(timeEnd.getTime() - timeStart.getTime())
        )}</span>` +
        '</div>',
      statusCode: 'Status code: SC_0xx',
      timeEnd: timeEnd,
      timeStart: timeStart,
      timelineType: 'Period',
    });
  } else if (availabilityItems[0].date > timelineDataPoints[0].timeStart) {
    availabilityItems.unshift({
      date: timelineDataPoints[0].timeStart,
      description:
        '<div class="chart-tooltip grid grid--gap-small">' +
        '  <span>' +
        timelineDataPoints[0].timeStart.toLocaleDateString(
          'en-US',
          timeFormattingOptions
        ) +
        '  </span>' +
        `  <span>Availability: N/A</span>` +
        '</div>',
      value: 100,
    });
  }

  if (
    availabilityItems[availabilityItems.length - 1].date >
    timelineDataPoints[timelineDataPoints.length - 1].timeEnd
  ) {
    const timeEnd = availabilityItems[availabilityItems.length - 1].date;
    const timeStart = timelineDataPoints[timelineDataPoints.length - 1].timeEnd;

    timelineDataPoints.push({
      description:
        '<div class="chart-tooltip grid grid--gap-small">' +
        '  <span>Status code: ' +
        '    <span class="status-code">N/A</span>' +
        '  </span>' +
        '  <span>Period: ' +
        timeStart.toLocaleDateString('en-US', timeFormattingOptions) +
        ' - ' +
        timeEnd.toLocaleDateString('en-US', timeFormattingOptions) +
        '  </span>' +
        `  <span>Duration: ${timeDuration(
          new Date(timeEnd.getTime() - timeStart.getTime())
        )}</span>` +
        '</div>',
      statusCode: 'Status code: SC_0xx',
      timeEnd: timeEnd,
      timeStart: timeStart,
      timelineType: 'Period',
    });
  } else if (
    availabilityItems[availabilityItems.length - 1].date <
    timelineDataPoints[timelineDataPoints.length - 1].timeEnd
  ) {
    availabilityItems.push({
      date: timelineDataPoints[timelineDataPoints.length - 1].timeEnd,
      description:
        '<div class="chart-tooltip grid grid--gap-small">' +
        '  <span>' +
        timelineDataPoints[
          timelineDataPoints.length - 1
        ].timeEnd.toLocaleDateString('en-US', timeFormattingOptions) +
        '  </span>' +
        `  <span>Availability: N/A</span>` +
        '</div>',
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
