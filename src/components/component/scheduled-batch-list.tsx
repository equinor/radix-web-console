import { Accordion, Icon, Table, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up, IconData } from '@equinor/eds-icons';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { ReplicaImage } from '../replica-image';
import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  ScheduledBatchSummaryModel,
  ScheduledBatchSummaryModelValidationMap,
} from '../../models/scheduled-batch-summary';
import { getScheduledBatchUrl } from '../../utils/routing';
import { smallScheduledBatchName } from '../../utils/string';

import './style.css';

export interface ScheduledBatchListProps {
  appName: string;
  envName: string;
  jobComponentName: string;
  scheduledBatchList?: Array<ScheduledBatchSummaryModel>;
  isExpanded?: boolean;
}

const chevronIcons: Array<IconData> = [chevron_down, chevron_up];

export const ScheduledBatchList = ({
  appName,
  envName,
  jobComponentName,
  scheduledBatchList,
  isExpanded,
}: ScheduledBatchListProps): JSX.Element => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  function expandRow(name: string): void {
    setExpandedRows({ ...expandedRows, [name]: !expandedRows[name] });
  }

  return scheduledBatchList?.length > 0 ? (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={isExpanded}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              Scheduled batch{scheduledBatchList.length > 1 ? 'es' : ''} (
              {scheduledBatchList.length})
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--table-overflow">
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.Cell />
                  <Table.Cell>Name</Table.Cell>
                  <Table.Cell>Status</Table.Cell>
                  <Table.Cell>Created</Table.Cell>
                  <Table.Cell>Duration</Table.Cell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {scheduledBatchList
                  .map((x) => ({ batch: x, expanded: !!expandedRows[x.name] }))
                  .map(({ batch, expanded }, i) => (
                    <Fragment key={i}>
                      <Table.Row
                        className={classNames({
                          'border-bottom-transparent': expanded,
                        })}
                      >
                        <Table.Cell
                          className={`fitwidth padding-right-0`}
                          variant="icon"
                        >
                          <Typography
                            link
                            as="span"
                            onClick={() => expandRow(batch.name)}
                          >
                            <Icon
                              size={24}
                              data={chevronIcons[+!!expanded]}
                              role="button"
                              title="Toggle more information"
                            />
                          </Typography>
                        </Table.Cell>
                        <Table.Cell>
                          <Link
                            className="scheduled-job__link"
                            to={getScheduledBatchUrl(
                              appName,
                              envName,
                              jobComponentName,
                              batch.name
                            )}
                          >
                            <Typography
                              link
                              as="span"
                              token={{ textDecoration: 'none' }}
                            >
                              {smallScheduledBatchName(batch.name)}
                            </Typography>
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <StatusBadge type={batch.status}>
                            {batch.status}
                          </StatusBadge>
                        </Table.Cell>
                        <Table.Cell>
                          <RelativeToNow time={batch.created} capitalize />
                        </Table.Cell>
                        <Table.Cell>
                          <Duration
                            start={batch.created}
                            end={batch.ended ?? new Date()}
                          />
                        </Table.Cell>
                      </Table.Row>
                      {expanded && (
                        <Table.Row>
                          <Table.Cell />
                          <Table.Cell colSpan={4}>
                            <div className="grid grid--gap-medium">
                              <span />
                              {batch.replica ? (
                                <ReplicaImage replica={batch.replica} />
                              ) : (
                                <Typography>
                                  Unable to get image tag and digest. The
                                  container for this batch no longer exists.
                                </Typography>
                              )}
                              <span />
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      )}
                    </Fragment>
                  ))}
              </Table.Body>
            </Table>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ) : (
    <Typography>This component has no scheduled batch.</Typography>
  );
};

ScheduledBatchList.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  scheduledBatchList: PropTypes.arrayOf(
    PropTypes.shape(ScheduledBatchSummaryModelValidationMap)
  ),
  isExpanded: PropTypes.bool,
} as PropTypes.ValidationMap<ScheduledBatchListProps>;
