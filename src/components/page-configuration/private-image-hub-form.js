import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Panel from '../panel';
import Toggler from '../toggler';
import SecretStatus from '../secret-status';

import * as routing from '../../utils/routing';

const privateImageHubForm = props => {
  const [imageHubs, setImageHubs] = useState([]);

  useEffect(() => {
    setImageHubs([
      {
        server: 'privaterepodeleteme.azurecr.io',
        username: '814607e6-3d71-44a7-8476-50e8b281abbc',
        email: 'radix@statoilsrm.onmicrosoft.com',
        status: 'Consistent',
      },
      {
        server: 'privaterepodeleteme2.azurecr.io',
        username: '814607e6-3d71-44a7-8476-50e8b281abbc',
        email: 'radix@statoilsrm.onmicrosoft.com',
        status: 'Pending',
      },
    ]);
  });

  return (
    <Panel>
      <Toggler summary="Private image hubs" startVisible={true}>
        {imageHubs.length === 0 ? (
          <p>This component uses no private image hubs</p>
        ) : (
          <ul className="o-indent-list">
            {imageHubs.map(imageHub => (
              <li key={imageHub.server}>
                <Link
                  to={routing.getPrivateImageHubUrl(
                    props.appName,
                    imageHub.server
                  )}
                >
                  {imageHub.server}
                </Link>{' '}
                <SecretStatus secret={imageHub} />
              </li>
            ))}
          </ul>
        )}
      </Toggler>
    </Panel>
  );
};

export default privateImageHubForm;
