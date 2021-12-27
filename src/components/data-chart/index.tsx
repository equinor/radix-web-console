import {
  Button,
  CircularProgress,
  Dialog,
  Divider,
  Icon,
  Scrim,
  Typography,
} from '@equinor/eds-core-react';
import { clear } from '@equinor/eds-icons';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { getJson } from '../../dynatrace-api/api-helpers';
import './style.css';

const AvailabilityCharts = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availabilityItems, setAvailabilityItems] = useState([]);
  const [statusCodeItems, setStatusCodeItems] = useState([]);
  const [visibleScrim, setVisibleScrim] = useState(false);

  const monitorName = 'Radix Development';

  function timeDuration(date) {
    var seconds = Math.floor(date / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + ' years';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' months';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' days';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' hours';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' minutes';
    }
    return Math.floor(seconds) + ' seconds';
  }

  useEffect(() => {
    // Get all status codes from the specified HTTP monitor step
    getJson(
      '/v2/metrics/query' +
        '?metricSelector=builtin:synthetic.http.request.statusCode' +
        '&entitySelector=type(http_check_step)' +
        ',entityName("Radix Canary")' +
        ',fromRelationships.isStepOf(' +
        'type("http_check")' +
        ',mzName("RADIX")' +
        ',entityName("' +
        monitorName +
        '"))' +
        '&from=now-90d' +
        '&resolution=30m'
    ).then(
      (result) => {
        const arr_data = result.result[0].data;

        var data = [];
        for (let i = 0; i < arr_data.length; i++) {
          const arr_values = arr_data[i].values;
          const arr_timestamps = arr_data[i].timestamps;
          for (let j = 0; j < arr_values.length; j++) {
            if (arr_values[j]) {
              data.push([
                arr_timestamps[j],
                arr_data[i].dimensionMap['Status code'],
              ]);
            }
          }
        }
        data.sort(function (a, b) {
          if (a[0] === b[0]) {
            return a[1] - b[1];
          }
          return a[0] > b[0] ? 1 : -1;
        });
        setStatusCodeItems(data);
      },
      (error) => {
        setError(error);
        console.log('error');
        console.log(error);
      }
    );

    // Get availability of the specified HTTP monitor
    getJson(
      '/v2/metrics/query' +
        '?metricSelector=builtin:synthetic.http.availability.location.total' +
        '&entitySelector=type(http_check)' +
        ',entityName("' +
        monitorName +
        '")' +
        '&from=now-90d' +
        '&resolution=30m'
    ).then(
      (result) => {
        const timestamps = result.result[0].data[0].timestamps;
        const values = result.result[0].data[0].values;

        var availabilityDatapoints = [];
        var i = -1;
        while (timestamps[++i]) {
          if (values[i]) {
            const description =
              '<div class="chart-tooltip"><span>' +
              new Date(timestamps[i]).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                hour12: false,
                minute: '2-digit',
              }) +
              '</span><br /><span>Availability: ' +
              values[i].toFixed(2) +
              '%</span></div>';
            availabilityDatapoints.push([
              new Date(timestamps[i]),
              values[i],
              description,
            ]);
          }
        }
        setAvailabilityItems(availabilityDatapoints);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        setError(error);
        console.log('error');
        console.log(error);
      }
    );
  }, []);

  if (!error && !loading) {
    if (statusCodeItems.length > 0) {
      var timelineDataPoints3 = [];
      var timeStart3 = new Date(statusCodeItems[0][0]);
      for (let i = 1; i < statusCodeItems.length; i++) {
        const prev_status_code = statusCodeItems[i - 1][1];
        if (
          statusCodeItems[i][1] !== prev_status_code ||
          i === statusCodeItems.length - 1
        ) {
          // status is different than previous item. set end time and reset start time
          var timeEnd3 = new Date(statusCodeItems[i][0]);
          const duration = timeDuration(
            new Date(timeEnd3.getTime() - timeStart3.getTime())
          );
          timelineDataPoints3.push([
            'Period',
            'Status code: ' + prev_status_code,
            '<div class="chart-tooltip"><span>Status code: ' +
              prev_status_code +
              '</span>' +
              '<br />' +
              '<span>Period: ' +
              timeStart3.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                hour12: false,
                minute: '2-digit',
              }) +
              ' - ' +
              timeEnd3.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                hour12: false,
                minute: '2-digit',
              }) +
              '</span><br /><span>Duration: ' +
              duration +
              '</span></div>',
            timeStart3,
            timeEnd3,
          ]);
          timeStart3 = new Date(statusCodeItems[i][0]);
        }
      }

      // Colors for the timeline chart
      var timelineColors = [];
      var timelineColorMap = {
        'Status code: SC_2xx': '#007079',
        'Status code: SC_4xx': '#7D0023',
        'Status code: SC_5xx': '#7D0023',
      };
      for (var i = 0; i < timelineDataPoints3.length; i++) {
        timelineColors.push(timelineColorMap[timelineDataPoints3[i][1]]);
      }
    }

    // Calculate availability percentage
    var sum = 0;
    const availabilityPercentage = (
      availabilityItems.reduce(function (r, a) {
        return (sum += a[1]);
      }, []) / availabilityItems.length
    ).toFixed(2);

    return (
      <>
        <Typography variant="h4">Availability past 90 days</Typography>
        <div className="chart-percentage" onClick={() => setVisibleScrim(true)}>
          <Chart
            chartType="ColumnChart"
            rows={[
              [
                '',
                availabilityPercentage,
                availabilityPercentage + '% availability',
              ],
            ]}
            columns={[
              {
                type: 'string',
                label: 'Name',
              },
              {
                type: 'number',
                label: 'Availability',
              },
              {
                type: 'string',
                //@ts-ignore
                role: 'annotation',
                p: { html: true },
              },
            ]}
            options={{
              legend: { position: 'none' },
              colors: ['rgb(195, 243, 210)'],
              displayAnnotations: true,
              vAxis: {
                viewWindow: {
                  min: 0,
                  max: 100,
                },
                gridlines: {
                  color: '#FFF',
                },
              },
              bar: {
                groupWidth: '100%',
              },
              chartArea: {
                width: '100%',
                height: '100%',
              },
              enableInteractivity: false,
              series: [
                {
                  annotations: {
                    textStyle: { fontSize: 16 },
                  },
                },
              ],
            }}
            className="chart"
            legendToggle
          />
        </div>
        {visibleScrim && (
          <Scrim
            onClose={() => setVisibleScrim(false)}
            isDismissable
            className="scrim-chart"
          >
            <Dialog className="dialog-container">
              <div className="dialog__header">
                <Typography variant="h5">Availability</Typography>
                <Button
                  variant="ghost"
                  className="o-heading-page-button"
                  onClick={() => setVisibleScrim(false)}
                >
                  <Icon data={clear} />
                </Button>
              </div>
              <div>
                <Divider />
              </div>
              <div className="dialog-content">
                <Chart
                  chartType="AreaChart"
                  rows={availabilityItems}
                  columns={[
                    {
                      type: 'date',
                      label: 'Time',
                    },
                    {
                      type: 'number',
                      label: 'Availability',
                    },
                    {
                      type: 'string',
                      //@ts-ignore
                      role: 'tooltip',
                      p: { html: true },
                    },
                  ]}
                  options={{
                    colors: ['#007079'],
                    lineWidth: 2,
                    vAxis: {
                      viewWindow: { min: 0, max: 102 },
                      gridlines: {
                        count: '0',
                      },
                    },
                    chartArea: {
                      width: '100%',
                    },
                    animation: {
                      duration: 500,
                      easing: 'out',
                      startup: true,
                    },
                    tooltip: {
                      isHtml: true,
                    },
                  }}
                  chartEvents={[
                    {
                      eventName: 'ready',
                      callback: ({ chartWrapper }) => {
                        var container = document.getElementById(
                          chartWrapper.getContainerId()
                        );
                        var observer = new MutationObserver(function () {
                          container
                            .getElementsByTagName('svg')[0]
                            .setAttribute(
                              'xmlns',
                              'http://www.w3.org/2000/svg'
                            );
                          Array.prototype.forEach.call(
                            container.getElementsByTagName('path'),
                            function (rect) {
                              if (rect.getAttribute('fill') === '#007079') {
                                rect.setAttribute(
                                  'fill',
                                  'url(#chart-gradient) #007079'
                                );
                              }
                            }
                          );
                        });
                        observer.observe(container, {
                          childList: true,
                          subtree: true,
                        });
                      },
                    },
                  ]}
                  className="chart-area"
                />
                <svg
                  style={{ width: 0, height: 0, position: 'absolute' }}
                  aria-hidden="true"
                  focusable="false"
                >
                  <linearGradient
                    id="chart-gradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#007079" />
                    <stop offset="87.5%" stopColor="#FFF" />
                  </linearGradient>
                </svg>
                <Chart
                  chartType="Timeline"
                  rows={timelineDataPoints3}
                  columns={[
                    {
                      type: 'string',
                      id: 'Position',
                    },
                    {
                      type: 'string',
                      id: 'Name',
                    },
                    {
                      type: 'string',
                      //@ts-ignore
                      role: 'tooltip',
                      p: { html: true },
                    },
                    {
                      type: 'date',
                      id: 'Start',
                    },
                    {
                      type: 'date',
                      id: 'End',
                    },
                  ]}
                  options={{
                    timeline: {
                      colorByRowLabel: false,
                      showRowLabels: false,
                      showBarLabels: false,
                    },
                    colors: timelineColors,
                    hAxis: {
                      format: 'LLLL dd, Y',
                    },
                  }}
                  className="chart-timeline"
                />
              </div>
            </Dialog>
          </Scrim>
        )}
      </>
    );
  } else {
    return (
      <>
        <span>
          <CircularProgress size={16} /> Loading
        </span>
      </>
    );
  }
};
export default AvailabilityCharts;
