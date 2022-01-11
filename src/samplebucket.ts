import { Tags } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class SampleBucket extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    let r = (Math.random() + 1).toString(36).substring(8);

    const bucket = new Bucket(this, 'samplebucket', {
      bucketName: 'samplebucket-' + r,

    });

    Tags.of(bucket).add('provider', 'cloudadder');
  }
}