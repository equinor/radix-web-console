import { Divider } from '@equinor/eds-core-react';
import PageCreateApplication from '.';
import { CreateApplicationForm } from './create-application-form';

export default (
  <div
    style={{
      width: '60%',
      margin: '16px auto',
      backgroundColor: '#FFF',
      padding: '16px',
    }}
  >
    <PageCreateApplication />
    <Divider />

    <CreateApplicationForm
      onCreated={console.log}
      onCreateApp={async (...args) => {
        console.info(args);
        return Promise.resolve({});
      }}
    />
  </div>
);
