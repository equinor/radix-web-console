import PropTypes from 'prop-types';
import ReplicaSummaryModel from '../../models/replica-summary';
import { Link } from 'react-router-dom';
import { smallReplicaName } from '../../utils/string';
import ReplicaStatus from '../replica-status';
import RelativeToNow from '../time/relative-to-now';
import Duration from '../time/duration';
import React, { useEffect, useState } from 'react';
import { Icon, Table, Typography } from '@equinor/eds-core-react';
import { chevron_up, chevron_down } from '@equinor/eds-icons';
import classNames from 'classnames';
import ReplicaImage from '../replica-image';
import './style.css';

export const ReplicaList = ({ replicaUrlFunc, replicaList }) => {
  const [moreInfoExpanded, setMoreInfoExpanded] = useState({});
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    setNow(new Date());
  }, [replicaList]);

  const toggleMoreInfo = (replicaName) => {
    setMoreInfoExpanded({
      ...moreInfoExpanded,
      [replicaName]: !moreInfoExpanded[replicaName],
    });
  };

  const getExpandedClassNames = (replicaName) => {
    return classNames({
      'border-bottom-transparent': !!moreInfoExpanded[replicaName],
    });
  };

  const getAccordionIcon = (replicaName) =>
    moreInfoExpanded[replicaName] ? chevron_down : chevron_up;

  return (
    <React.Fragment>
      {replicaList && (
        <div className="grid grid--table-overflow">
          <Table className="replica-list-table">
            <Table.Head>
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell>Name</Table.Cell>
                <Table.Cell>Status</Table.Cell>
                <Table.Cell>Created</Table.Cell>
                <Table.Cell>Duration</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {replicaList.map((replica) => {
                const expandClassNames = getExpandedClassNames(replica.name);
                return (
                  <React.Fragment key={replica.name}>
                    <Table.Row>
                      <Table.Cell
                        className={`fitwidth padding-right-0 ${expandClassNames}`}
                        variant="icon"
                      >
                        <Typography
                          link
                          as="span"
                          onClick={() => toggleMoreInfo(replica.name)}
                        >
                          <Icon
                            size="24"
                            data={getAccordionIcon(replica.name)}
                            role="button"
                            title="Toggle more information"
                          />
                        </Typography>
                      </Table.Cell>
                      <Table.Cell className={expandClassNames}>
                        <Link to={replicaUrlFunc(replica.name)}>
                          <Typography link as="span">
                            {smallReplicaName(replica.name)}{' '}
                          </Typography>
                        </Link>
                      </Table.Cell>
                      <Table.Cell className={expandClassNames}>
                        <ReplicaStatus replica={replica} />
                      </Table.Cell>
                      <Table.Cell className={expandClassNames}>
                        <RelativeToNow time={replica.created}></RelativeToNow>
                      </Table.Cell>
                      <Table.Cell className={expandClassNames}>
                        <Duration start={replica.created} end={now} />
                      </Table.Cell>
                    </Table.Row>
                    {moreInfoExpanded[replica.name] && (
                      <Table.Row>
                        <Table.Cell />
                        <Table.Cell colSpan="4">
                          <div className="grid grid--gap-medium">
                            <span />
                            <ReplicaImage replica={replica} />
                            <span />
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </React.Fragment>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      )}
    </React.Fragment>
  );
};

ReplicaList.propTypes = {
  replicaUrlFunc: PropTypes.func.isRequired,
  replicaList: PropTypes.arrayOf(PropTypes.exact(ReplicaSummaryModel)),
};
