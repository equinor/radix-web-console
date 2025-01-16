import { Divider } from '@equinor/eds-core-react';
import PageCreateApplication from '.';
import { CreateApplicationFormLayout } from './create-application-form';

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

    <CreateApplicationFormLayout
      isLoading={true}
      isSuccess={true}
      error={new Error('hello world!')}
      warnings={['test 1', 'test 2']}
      onRefreshApps={console.log}
      onCreated={console.log}
      onCreateApp={async (...args) => {
        console.info(args);
        return Promise.resolve({});
      }}
    />
  </div>
);
