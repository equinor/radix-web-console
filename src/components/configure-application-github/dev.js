import React from 'react';

import ConfigureApplicationGitHub from '.';

export default (
  <div className="o-layout-single">
    <ConfigureApplicationGitHub
      app={{
        adGroups: ['Group 1', 'Group 2'],
        name: 'a-name-thing',
        publicKey:
          'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCjWIk9dMN7wgtKMBSRJHskVIt4Z+upajPmgLBKltVGu8TOMgjtOQcu31YDguxAqNLF6UmpKc6YKJJCNFWINCLzYbGUnjvlrDiiEkZ8C60i7DvHIXnxEIo4DxV/e1D5bDp9psLKixnqEpuKwsVSwtgrAGcRaFS3LK+Rq1OVJAOtREG1htBkN9X+f8aORlk0WHEYhIpba5lAbgxh9NXdzxuk9o0bXIEPjr3RdA7077aerUyNmSaZho9699XCNlJFWgi5ULRCRw7ITF9o4S2CDZUXymDP4NZAWZXEnKfflLNBNAvriSt45b8JDwHrz1qhgJfZbGf9LXqOLqEU6z6IvlWF',
        repository: 'https://some/path/to/a/repo',
        sharedSecret: 'a long shared secret',
      }}
    />
  </div>
);
