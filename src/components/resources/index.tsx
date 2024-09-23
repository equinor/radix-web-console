import { Icon, Table, Tooltip, Typography } from '@equinor/eds-core-react';
import { info_circle, library_books } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { type FunctionComponent, useState } from 'react';
import { externalUrls } from '../../externalUrls';
import {
  type GetResourcesApiResponse,
  useGetResourcesQuery,
} from '../../store/radix-api';
import { formatDateTimeYear } from '../../utils/datetime';
import AsyncResource from '../async-resource/async-resource';
import { ScrimPopup } from '../scrim-popup';

import './style.css';

function getPeriod({ from, to }: GetResourcesApiResponse): string {
  return `${formatDateTimeYear(new Date(from))} - ${formatDateTimeYear(
    new Date(to)
  )}`;
}

export interface UsedResourcesProps {
  appName: string;
}

export const UsedResources: FunctionComponent<UsedResourcesProps> = ({
  appName,
}) => {
  const { data: resources, ...state } = useGetResourcesQuery(
    { appName },
    { skip: !appName }
  );
  const [visibleScrim, setVisibleScrim] = useState(false);
  return (
    <div className="grid grid--gap-medium">
      <div className="grid grid--gap-medium grid--auto-columns">
        <Typography variant="h6"> Used resources</Typography>
        <Typography
          link
          href={externalUrls.resourcesDocs}
          rel="noopener noreferrer"
        >
          <Tooltip title="Read more in the documentation">
            <Icon data={library_books} />
          </Tooltip>
        </Typography>
      </div>
      <AsyncResource asyncState={state}>
        {resources ? (
          <div className="resources-section grid grid--gap-medium">
            <div className="grid grid--gap-small">
              <Typography variant="overline">Period</Typography>
              <Typography group="input" variant="text">
                {getPeriod(resources)}
              </Typography>
            </div>

            <div className="grid grid--gap-small grid--auto-columns">
              <div>
                <Typography>
                  CPU{' '}
                  <strong>
                    min {resources?.cpu?.min ?? '-'}, max{' '}
                    {resources?.cpu?.max ?? '-'}, avg{' '}
                    {resources?.cpu?.average ?? '-'}
                  </strong>
                </Typography>
                <Typography>
                  Memory{' '}
                  <strong>
                    min {resources?.memory?.min ?? '-'}, max{' '}
                    {resources?.memory?.max ?? '-'}, avg{' '}
                    {resources?.memory?.average ?? '-'}
                  </strong>
                </Typography>
              </div>
              <Icon
                style={{ cursor: 'pointer' }}
                data={info_circle}
                className={'icon-justify-end'}
                onClick={() => setVisibleScrim(true)}
              />
              <ScrimPopup
                className={'resources__scrim'}
                title={'Used resources'}
                open={visibleScrim}
                isDismissable
                onClose={() => setVisibleScrim(false)}
              >
                <div className={'resources__scrim-content'}>
                  <Table className={'resources-content'}>
                    <Table.Head>
                      <Table.Row>
                        <Table.Cell />
                        <Table.Cell>Min</Table.Cell>
                        <Table.Cell>Max</Table.Cell>
                        <Table.Cell>Average</Table.Cell>
                      </Table.Row>
                    </Table.Head>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          CPU (millicores , rounded){' '}
                          <Typography
                            link
                            href={externalUrls.kubernetesResourcesCpuUnits}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Icon data={library_books} />
                          </Typography>
                        </Table.Cell>
                        <Table.Cell>{resources?.cpu?.min ?? '-'}</Table.Cell>
                        <Table.Cell>{resources?.cpu?.max ?? '-'}</Table.Cell>
                        <Table.Cell>
                          {resources?.cpu?.average ?? '-'}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>CPU (millicores, actual)</Table.Cell>
                        <Table.Cell>
                          {resources?.cpu?.minActual ?? '-'}
                        </Table.Cell>
                        <Table.Cell>
                          {resources?.cpu?.maxActual ?? '-'}
                        </Table.Cell>
                        <Table.Cell>
                          {resources?.cpu?.avgActual ?? '-'}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          Memory (MB, rounded){' '}
                          <Typography
                            link
                            href={externalUrls.kubernetesResourcesMemoryUnits}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Icon data={library_books} />
                          </Typography>
                        </Table.Cell>
                        <Table.Cell>{resources?.memory?.min ?? '-'}</Table.Cell>
                        <Table.Cell>{resources?.memory?.max ?? '-'}</Table.Cell>
                        <Table.Cell>
                          {resources?.memory?.average ?? '-'}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Memory (MB , actual)</Table.Cell>
                        <Table.Cell>
                          {resources?.memory?.minActual ?? '-'}
                        </Table.Cell>
                        <Table.Cell>
                          {resources?.memory?.maxActual ?? '-'}
                        </Table.Cell>
                        <Table.Cell>
                          {resources?.memory?.avgActual ?? '-'}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              </ScrimPopup>
            </div>
          </div>
        ) : (
          <Typography variant="caption">No data</Typography>
        )}
      </AsyncResource>
    </div>
  );
};

UsedResources.propTypes = {
  appName: PropTypes.string.isRequired,
};
