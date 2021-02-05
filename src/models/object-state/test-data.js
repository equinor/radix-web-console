export const testData = [
  {
    __testDescription: 'Valid event - empty',
  },
  {
    __testDescription: 'Valid event with pod',
    pod: {
      ready: true,
      started: true,
      restartCount: 0,
    },
  },
];

export default testData;
