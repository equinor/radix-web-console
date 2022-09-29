import { Accordion, Button, Typography } from '@equinor/eds-core-react';
import { AppConfigAppId } from '../app-config-appid';

export const ChangeAppIdForm = (): JSX.Element => {
  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item style={{ overflow: 'visible' }}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Change ServiceNow application</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <form className="grid grid--gap-medium">
            <AppConfigAppId appId="todo" />
            <div>
              <Button color="danger" type="submit">
                Change application
              </Button>
            </div>
          </form>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
