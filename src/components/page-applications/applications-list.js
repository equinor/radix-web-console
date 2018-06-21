import React from 'react';

export const ApplicationsList = apps => {
  return <ul>{apps.forEach(app => <li>{app.name}</li>)}</ul>;
};

export default ApplicationsList;
