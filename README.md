[![build](https://github.com/cloudadder/cdk-ec2-imagebuilder/actions/workflows/build.yml/badge.svg)](https://github.com/cloudadder/cdk-ec2-imagebuilder/actions/workflows/build.yml)
[![release](https://github.com/cloudadder/cdk-ec2-imagebuilder/actions/workflows/release.yml/badge.svg)](https://github.com/cloudadder/cdk-ec2-imagebuilder/actions/workflows/release.yml)

# cdk-ec2-imagebuilder
## Installation and Usage
#### Creates an [EC2 Image Builder](https://aws.amazon.com/image-builder/) using cdk to create EC2 AMIs
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
      amiName: 'test-ami',
      subnetId: 'subnet-12345',
      securityGroupIds: ['sg-12345'],
      version: '1.0.0',
      id: 'test-123',
    });
  }
}
```

#### Links
* [npmjs](https://www.npmjs.com/package/@cloudadder/cdk-ec2-imagebuilder)
* [cdk constructs.dev](https://constructs.dev/packages/@cloudadder/cdk-ec2-imagebuilder)

#### License

Distributed under the [Apache-2.0](./LICENSE) license.