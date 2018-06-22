import React from 'react';

export const ApplicationsList = ({ apps }) => {
  console.log(apps);
  return (
    <ul>
      {apps.map(app => <li key={app.metadata.name}>{app.metadata.name}</li>)}
    </ul>
  );
};

export default ApplicationsList;
