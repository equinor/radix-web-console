import { EnvironmentScanSummaryModel, EnvironmentScanObjectModel } from '.';

import { TestDependencyDataType } from '../model-types';
import { testData as VulnerabilitySummaryData } from '../vulnerability-summary/test-data';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<EnvironmentScanSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    components: {
      prod: {
        image: 'image',
        baseImage: 'alpine:3.15',
        scanSuccess: true,
        scanTime: new Date(),
        vulnerabilitySummary: VulnerabilitySummaryData[0],
      },
      qa: {
        image: 'image',
        baseImage: 'alpine:3.15',
        scanSuccess: true,
        scanTime: new Date(1999, 6, 25),
        vulnerabilitySummary: VulnerabilitySummaryData[0],
      },
    },
    jobs: {
      job1: {
        image: 'image',
        baseImage: 'alpine:3.15',
        scanSuccess: true,
        scanTime: new Date('2018-11-19T14:31:23Z'),
        vulnerabilitySummary: VulnerabilitySummaryData[0],
      },
      job2: {
        image: 'image',
        baseImage: 'alpine:3.15',
        scanSuccess: true,
        scanTime: new Date(Date.now() - 1000 * 60 * 60),
        vulnerabilitySummary: VulnerabilitySummaryData[0],
      },
    },
  },
  {
    __testDescription: 'Valid partial object',
    components: {
      prod: {
        image: 'image',
        baseImage: 'alpine:3.15',
      },
    },
  },
  {
    __testDescription: 'Valid empty object',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    components: {
      prod: {
        image: 'image',
        baseImage: 'alpine:3.15',
        scanSuccess: 'Missing' as unknown as boolean,
        scanTime: new Date(),
        vulnerabilitySummary: VulnerabilitySummaryData[0],
      },
      qa: {
        image: 'image',
        baseImage: 'alpine:3.15',
        scanSuccess: true,
        scanTime: new Date(1999, 6, 25),
        vulnerabilitySummary: VulnerabilitySummaryData[0],
      },
    },
    jobs: {
      job1: {
        image: 'image',
        baseImage: 'alpine:3.15',
        scanSuccess: true,
        scanTime: new Date('2018-11-19T14:31:23Z'),
        vulnerabilitySummary: VulnerabilitySummaryData[0],
      },
      job2: {
        image: 'image',
        baseImage: 'alpine:3.15',
        scanSuccess: true,
        scanTime: new Date(Date.now() - 1000 * 60 * 60),
        vulnerabilitySummary: VulnerabilitySummaryData[0],
      },
    },
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    components: [
      {
        images: ['image1', 'image2'],
        baseImage: 'alpine:3.15',
        vulnerabilitySummary: VulnerabilitySummaryData[0],
      },
    ] as unknown as { [key: string]: EnvironmentScanObjectModel },
  },
];
