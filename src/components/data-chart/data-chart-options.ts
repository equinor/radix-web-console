import {
  ChartWrapperOptions,
  GoogleDataTableColumn,
  GoogleDataTableColumnRoleType,
  GoogleDataTableRow,
  ReactGoogleChartEvent,
} from 'react-google-charts/dist/types';

// there seems to be an unresolved issue with enums for 'react-google-charts/dist/types'
// issue: https://github.com/rakannimer/react-google-charts/issues/377
const _tooltipRoleKey: keyof typeof GoogleDataTableColumnRoleType = 'tooltip';
const tooltipRoleKey = _tooltipRoleKey as GoogleDataTableColumnRoleType;

export const DataChartItemColumnOptions: GoogleDataTableColumn[] = [
  { label: 'Time', type: 'date' },
  { label: 'Availability', type: 'number' },
  { type: 'string', role: tooltipRoleKey, p: { html: true } },
];

export const DataChartItemEvents: ReactGoogleChartEvent[] = [
  {
    eventName: 'ready',
    callback: ({ chartWrapper }) => {
      const container = document.getElementById(chartWrapper.getContainerId());
      const observer = new MutationObserver(() => {
        container
          .getElementsByTagName('svg')[0]
          .setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        Array.prototype.forEach.call(
          container.getElementsByTagName('path'),
          (rect: SVGPathElement) =>
            rect.getAttribute('fill') === '#007079' &&
            rect.setAttribute('fill', 'url(#chart-gradient) #007079')
        );
      });
      observer.observe(container, { childList: true, subtree: true });
    },
  },
];

export const DataChartItemOptions: ChartWrapperOptions['options'] = {
  colors: ['#007079'],
  lineWidth: 2,
  vAxis: {
    viewWindow: { min: 0, max: 102 },
    gridlines: { count: 0 },
  },
  chartArea: {
    width: '100%',
  },
  legend: 'none',
  animation: {
    duration: 500,
    easing: 'out',
    startup: true,
  },
  selectionMode: 'multiple',
  tooltip: {
    isHtml: true,
    trigger: 'both',
  },
  aggregationTarget: 'none',
};

export const DataChartTimelineColumnOptions: GoogleDataTableColumn[] = [
  { id: 'Position', type: 'string' },
  { id: 'Name', type: 'string' },
  { type: 'string', role: tooltipRoleKey, p: { html: true } },
  { id: 'Start', type: 'date' },
  { id: 'End', type: 'date' },
];

export const DataChartTimelineOptions: ChartWrapperOptions['options'] = {
  timeline: {
    colorByRowLabel: false,
    showRowLabels: false,
    showBarLabels: false,
  },
  hAxis: {
    format: 'LLLL dd, Y',
  },
  tooltip: {
    isHtml: true,
    trigger: 'focus',
  },
};

export function googleChartDataBuilder(
  options: GoogleDataTableColumn[],
  ...data: GoogleDataTableRow[]
): (GoogleDataTableColumn | GoogleDataTableRow)[] {
  return [[...options], ...data];
}
