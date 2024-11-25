import { CircularProgress, Typography } from '@equinor/eds-core-react';
import { useState } from 'react';
import { Chart } from 'react-google-charts';
import { ScrimPopup } from '../scrim-popup';

import './style.css';
import type { ChartWrapperOptions } from 'react-google-charts/dist/types';
import { externalUrls } from '../../externalUrls';
import { useGetUptimeQuery } from '../../store/uptime-api';
import { ExternalLink } from '../link/external-link';

export const AvailabilityCharts = () => {
  const { data: uptime, isLoading, isError } = useGetUptimeQuery();
  const [visibleScrim, setVisibleScrim] = useState(false);

  if (isError) {
    return <span>Failed to load chart</span>;
  }

  if (isLoading) {
    return (
      <strong>
        <CircularProgress size={16} /> Loading
      </strong>
    );
  }

  if (!uptime || uptime.length === 0) {
    return (
      <Typography variant="body_short_bold">
        Not enough data to display charts
      </Typography>
    );
  }

  const data = uptime.map(([timestamp, available]) => [
    new Date(timestamp * 1000),
    Number(available),
  ]);

  const availability =
    (uptime.filter(([_, x]) => x === '1').length / uptime.length) * 100;

  return (
    <>
      <Typography variant="h4">Availability past 30 days</Typography>
      <div className="chart-percentage" onClick={() => setVisibleScrim(true)}>
        <div className="chart-percentage__ring">
          <CircularProgress
            variant="determinate"
            value={Math.min(Math.max(availability, 0), 100)}
          />
          <Typography>{`${availability.toFixed(2)}%`}</Typography>
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
            <ExternalLink href={externalUrls.uptimeDocs}>
              documentation
            </ExternalLink>
            .
          </Typography>

          {visibleScrim && uptime.length > 0 ? (
            <>
              <Chart
                chartType="AreaChart"
                className="chart-area"
                data={[['Date', 'Available'], ...data]}
                options={DataChartItemOptions}
              />
            </>
          ) : (
            <Typography variant="body_short_bold" style={{ margin: '0 auto' }}>
              Not enough data to display Availability chart
            </Typography>
          )}
          <br />
        </div>
      </ScrimPopup>
    </>
  );
};

const DataChartItemOptions: ChartWrapperOptions['options'] = {
  colors: ['#007079'],
  lineWidth: 2,
  vAxis: {
    viewWindow: { min: 0, max: 1 },
    gridlines: { count: 0 },
  },
  chartArea: {
    width: '90%',
  },
  legend: 'none',
  animation: {
    duration: 500,
    easing: 'out',
  },
  selectionMode: 'multiple',
  tooltip: {
    isHtml: true,
    trigger: 'both',
  },
  aggregationTarget: 'none',
};
