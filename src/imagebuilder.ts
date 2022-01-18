import * as fs from 'fs';
import * as path from 'path';
import { aws_iam as iam, aws_imagebuilder as imagebuilder, CfnOutput, Stack, Tags } from 'aws-cdk-lib';
import { CfnImageRecipe } from 'aws-cdk-lib/aws-imagebuilder';
import { KeyPair } from 'cdk-ec2-key-pair';
import { Construct } from 'constructs';

var componentArns: Array<CfnImageRecipe.ComponentConfigurationProperty> = [];

export interface ImageBuilderProps {
  /**
   * Local folder name including path which contains the component yaml files.
   */
  readonly componentsFolder: string;
  /**
   * Parent AMI Image Arn.
   * @default - the latest Amazon Linux 2 AMI
   *
   * ```
   * 'arn:aws:imagebuilder:' + Stack.of(this).region + ':aws:image/amazon-linux-2-x86/x.x.x'
   * ```
   */
  readonly parentImage?: string;

  /**
   * The AMI name.
   */
  readonly amiName: string;

  /**
   * The id to use as a name suffix to identify resources.
   */
  readonly id: string;

  /**
   * The subnet id to use for the build.
   */
  readonly subnetId: string;

  /**
   * The securityGroupIds to use for the build.
   * A single subnet id is enough to allow access to the build instance.
   * The subnet must support [ssm agent installation](https://aws.amazon.com/premiumsupport/knowledge-center/ssm-agent-install-issues-linux/)
   */
  readonly securityGroupIds: string[];

  /**
   * Version to use in the metadata of the build.
   * AWS requires a version unique to the build, therefore incrementing the version number is required for each deployment.
   */
  readonly version: string;

  /**
   * The instance types to use for the build.
   * @default - [t3.medium]
   */
  readonly instanceTypes?: string[];

  /**
   * The [scheduleExpression](https://docs.aws.amazon.com/imagebuilder/latest/userguide/cron-expressions.html) for creating a refresh schedule of the AMI in cron format ```0 0 * * ? *```.
   * @default - No schedule
   */
  readonly scheduleExpression?: string;
}

export class ImageBuilder extends Construct {
  constructor(scope: Construct, id: string, props: ImageBuilderProps) {
    super(scope, id);

    const region = Stack.of(this).region;

    const role = new iam.Role(this, 'ImageBuilderRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      roleName: 'ImageBuilderRole-' + props.id,
    });

    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('EC2InstanceProfileForImageBuilder'));
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('EC2InstanceProfileForImageBuilderECRContainerBuilds'));

    const instanceProfile = new iam.CfnInstanceProfile(this, 'ImageBuilderInstanceProfile', {
      instanceProfileName: 'ImageBuilderInstanceProfile' + props.id,
      roles: [role.roleName],
    });

    const key = new KeyPair(this, 'AKeyPair', {
      name: 'keypair-' + props.id,
      description: 'This is a Key Pair for the Image Builder',
    });

    let count = 0;
    fs.readdirSync('' + props.componentsFolder).forEach((file: any) => {
      console.log('Adding component file : ' + file);
      const yaml = fs.readFileSync(path.join(props.componentsFolder, file), 'utf-8');

      const component = new imagebuilder.CfnComponent(this, 'Component-' + file, {
        name: 'component-' + file.replace('.', '-'),
        platform: 'Linux',
        version: props.version,
        data: yaml,
      });

      componentArns.push({ componentArn: component.attrArn });
      Tags.of(component).add('component-' + count, file);
      count++;
    });

    const imageRecipe = new imagebuilder.CfnImageRecipe(this, 'ImageRecipe', {
      version: props.version,
      name: 'ImageRecipe' + props.id,
      parentImage: props.parentImage || 'arn:aws:imagebuilder:' + region + ':aws:image/amazon-linux-2-x86/x.x.x',
      components: componentArns,
    });


    const infrastructureConfiguration = new imagebuilder.CfnInfrastructureConfiguration(this, 'ImageInfrastructureConfiguration', {
      name: 'ImageInfrastructureConfiguration' + props.id,
      description: 'ImageInfrastructureConfiguration',
      instanceTypes: props.instanceTypes || ['t3.medium'],
      instanceProfileName: 'ImageBuilderInstanceProfile' + props.id,
      keyPair: key.keyPairName,
      securityGroupIds: props.securityGroupIds,
      subnetId: props.subnetId,
      terminateInstanceOnFailure: true,

    });

    const distribution = new imagebuilder.CfnDistributionConfiguration(this, 'ImageDistributionConfiguration', {
      distributions: [{
        region: region,
        amiDistributionConfiguration: {
          name: props.amiName + '-{{imagebuilder:buildDate}}',
        },
      }],
      name: props.id,
    });

    const imagePipeline = new imagebuilder.CfnImagePipeline(this, 'ImagePipeline', {
      name: 'ImagePipeline' + props.id,
      description: 'ImagePipeline',
      imageRecipeArn: imageRecipe.attrArn,
      infrastructureConfigurationArn: infrastructureConfiguration.attrArn,
      distributionConfigurationArn: distribution.attrArn,
    });

    if (props.scheduleExpression) {
      const schedule: imagebuilder.CfnImagePipeline.ScheduleProperty = {
        pipelineExecutionStartCondition: 'EXPRESSION_MATCH_AND_DEPENDENCY_UPDATES_AVAILABLE',
        scheduleExpression: 'cron(' + props.scheduleExpression + ')',
      };
      imagePipeline.schedule = schedule;
    }

    infrastructureConfiguration.addDependsOn(instanceProfile);
    imagePipeline.addDependsOn(distribution);
    imagePipeline.addDependsOn(imageRecipe);
    imagePipeline.addDependsOn(infrastructureConfiguration);

    new CfnOutput(this, 'ImageInfrastructureConfigurationOutput', {
      value: imagePipeline.attrName,
      description: 'ImageImagePipeline Name',
    });
  }
}