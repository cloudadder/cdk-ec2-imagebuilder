[![build](https://github.com/cloudadder/cdk-ec2-imagebuilder/actions/workflows/build.yml/badge.svg)](https://github.com/cloudadder/cdk-ec2-imagebuilder/actions/workflows/build.yml)
[![release](https://github.com/cloudadder/cdk-ec2-imagebuilder/actions/workflows/release.yml/badge.svg)](https://github.com/cloudadder/cdk-ec2-imagebuilder/actions/workflows/release.yml)

# cdk-ec2-imagebuilder
This is a collection of AWS CDK Constructs to simplify deployments.

## Installation and Usage

### [ImageBuilder](https://github.com/cloudadder/cdk-ec2-imagebuilder/blob/main/src/imagebuilder.ts)
#### Creates an [EC2 Image Builder](https://aws.amazon.com/image-builder/) using cdk to create EC2 AMIs
##### Typescript
```console
npm install @cloudadder/cdk-ec2-imagebuilder
```
```typescript
import { ImageBuilder } from '@cloudadder/cdk-ec2-imagebuilder';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ImageBuilderStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new ImageBuilder(this, 'ImageBuilder', {
      componentsFolder: './test/components',
      parentImage: 'arn:aws:imagebuilder:ap-southeast-2:aws:image/amazon-linux-2-x86/x.x.x',
      region: 'ap-southeast-2',
      amiName: 'test-ami',
      subnetId: 'subnet-12345',
      securityGroupIds: ['sg-12345'],
      version: '1.0.0',
      instanceTypes: ['t2.micro'],
    });
  }
}
```

## License

Distributed under the [Apache-2.0](./LICENSE) license.