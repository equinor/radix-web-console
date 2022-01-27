export const testData = [
  {
    __testDescription: 'Valid full object',
    name: 'a-name',
    owner: 'a-user@equinor.com',
    creator: 'servant',
    cost: 100,
    currency: 'usd',
    costPercentageByCpu: 15,
    costPercentageByMemory: 85,
  },
  {
    __testDescription: 'Valid partial object',
    name: 'name',
    owner: 'a-user@equinor.com',
    creator: 'master',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'a-name',
    owner: 'a-user@equinor.com',
    creator: 'servant',
    cost: 'a slice of pizza',
    currency: 'usd',
    costPercentageByCpu: 15,
    costPercentageByMemory: 85,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'a-name',
    owner: 2022,
    creator: 'servant',
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
  },
];

export default testData;
