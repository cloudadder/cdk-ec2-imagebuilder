import {
  App, Stack,
} from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ImageBuilder } from '../src/imagebuilder';

describe('ImageBuilderStack', () => {
  let mockApp: App;
  let stack: Stack;

  beforeEach(() => {
    mockApp = new App();
    stack = new Stack(mockApp, 'testing-stack');
  });

  test('create ImageBuilderStack', () => {
    new ImageBuilder(stack, 'ImageBuilder', {
      componentsFolder: './test/components',
      parentImage: 'arn:aws:imagebuilder:ap-southeast-2:aws:image/amazon-linux-2-x86/x.x.x',
      region: 'ap-southeast-2',
      amiName: 'test-ami',
      id: 'test-123',
      subnetId: 'subnet-12345',
      securityGroupIds: ['sg-12345'],
      version: '1.0.0',
      instanceTypes: ['t3.medium'],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::ImageBuilder::Component', {
      Tags: {
        'component-0': 'helloworld.yaml',
      },
      Name: 'component-helloworld-yaml',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::ImageBuilder::ImageRecipe', {
      ParentImage: 'arn:aws:imagebuilder:ap-southeast-2:aws:image/amazon-linux-2-x86/x.x.x',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Role', {
      RoleName: 'ImageBuilderRole-test-123',
    });

    Template.fromStack(stack).hasResourceProperties('Custom::EC2-Key-Pair', {
      Name: 'keypair-test-123',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::ImageBuilder::DistributionConfiguration', {
      Distributions: [
        {
          AmiDistributionConfiguration: {
            name: 'test-ami',
          },
          Region: 'ap-southeast-2',
        },
      ],
      Name: 'test-123',
    });
  });
});