import * as fs from 'fs';
import * as path from 'path';
import { aws_iam as iam, aws_imagebuilder as imagebuilder, CfnOutput, Tags } from 'aws-cdk-lib';
import { CfnImageRecipe } from 'aws-cdk-lib/aws-imagebuilder';
import { Construct } from 'constructs';

var componentArns: Array<CfnImageRecipe.ComponentConfigurationProperty> = [];

export interface ImageBuilderProps {
  /**
   * Local folder name including path which contains the component yaml files.
   */
  readonly componentsFolder: string;
  /**
   * Parent AMI Image Arn.
   */
  readonly parentImage: string;

  /**
   * region the build will run in.
   */
  readonly region: string;

  /**
   * the ami name.
   */
  readonly amiName: string;

  /**
   * the subnet id to use for the build.
   */
  readonly subnetId: string;

  /**
   * the securityGroupIds to use for the build.
   */
  readonly securityGroupIds: string[];

  /**
   * version to use in the metadata of the build.
   */
  readonly version: string;

  /**
   * the instance types to use for the build.
   */
  readonly instanceTypes: string[];
}

export class ImageBuilder extends Construct {
  constructor(scope: Construct, id: string, props: ImageBuilderProps) {
    super(scope, id);

    const role = new iam.Role(this, 'ImageBuilderRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      roleName: 'ImageBuilderRole-' + props.amiName,
    });

    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('EC2InstanceProfileForImageBuilder'));
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('EC2InstanceProfileForImageBuilderECRContainerBuilds'));

    const instanceProfile = new iam.CfnInstanceProfile(this, 'ImageBuilderInstanceProfile', {
      instanceProfileName: 'ImageBuilderInstanceProfile',
      roles: [role.roleName],
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
      name: 'ImageRecipe',
      parentImage: props.parentImage,
      components: componentArns,
    });


    const infrastructureConfiguration = new imagebuilder.CfnInfrastructureConfiguration(this, 'ImageInfrastructureConfiguration', {
      name: 'ImageInfrastructureConfiguration',
      description: 'ImageInfrastructureConfiguration',
      instanceTypes: props.instanceTypes,
      instanceProfileName: 'ImageBuilderInstanceProfile',
      keyPair: 'keypair',
      securityGroupIds: props.securityGroupIds,
      subnetId: props.subnetId,
      terminateInstanceOnFailure: true,

    });

    const distribution = new imagebuilder.CfnDistributionConfiguration(this, 'ImageDistributionConfiguration', {
      distributions: [{
        region: props.region,
        amiDistributionConfiguration: {
          name: props.amiName + '-{{imagebuilder:buildDate}}',
        },
      }],
      name: props.amiName,
    });

    // const schedule: imagebuilder.CfnImagePipeline.ScheduleProperty = {
    //   pipelineExecutionStartCondition: 'EXPRESSION_MATCH_AND_DEPENDENCY_UPDATES_AVAILABLE',
    //   scheduleExpression: 'cron(0 8 1 * ? *)', //Run at 8:00 AM (UTC) on the first day of every month
    // };

    const imagePipeline = new imagebuilder.CfnImagePipeline(this, 'ImagePipeline', {
      name: 'ImagePipeline',
      description: 'ImagePipeline',
      imageRecipeArn: imageRecipe.attrArn,
      infrastructureConfigurationArn: infrastructureConfiguration.attrArn,
      distributionConfigurationArn: distribution.attrArn,
      //schedule: schedule,
    });

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