import {
  App, Stack,
} from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SampleBucket } from '../src/samplebucket';

describe('SampleBucket', () => {
  let mockApp: App;
  let stack: Stack;

  beforeEach(() => {
    mockApp = new App();
    stack = new Stack(mockApp, 'testing-stack');
  });

  test('create SampleBucket', () => {
    new SampleBucket(stack, 'SampleBucket');
    Template.fromStack(stack).hasResourceProperties('AWS::S3::Bucket', {
      Tags: [
        {
          Key: 'provider',
          Value: 'cloudadder',
        },
      ],
    });
  });
});