import { List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';

export const IngressAllowList: FunctionComponent<{
  allowedIpRanges?: Array<string>;
}> = ({ allowedIpRanges }) =>
  allowedIpRanges?.length > 0 ? (
    <div>
      <Typography>Accessible from public IP address ranges:</Typography>
      <List className="o-indent-list">
        {allowedIpRanges.map((ip) => (
          <List.Item key={ip}>{ip}</List.Item>
        ))}
      </List>
    </div>
  ) : (
    <Typography>Accessible from all public IP addresses</Typography>
  );

IngressAllowList.propTypes = {
  allowedIpRanges: PropTypes.arrayOf(PropTypes.string),
};
