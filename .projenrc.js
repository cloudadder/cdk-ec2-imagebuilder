const { AwsCdkConstructLibrary, NpmAccess, awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'cloudadder',
  authorAddress: 'cloudadder.com@gmail.com',
  bundledDeps: [
    'cdk-ec2-key-pair',
    'cdk-iam-floyd',
  ],
  cdkVersion: '2.8.0',
  defaultReleaseBranch: 'main',
  dependabot: true,
  dependabotOptions: {
    scheduleInterval: 'weekly',
  },
  homepage: 'https://github.com/cloudadder/cdk-ec2-imagebuilder',
  name: '@cloudadder/cdk-ec2-imagebuilder',
  npmAccess: 'public',
  repositoryUrl: 'https://github.com/cloudadder/cdk-ec2-imagebuilder.git',

  // cdkDependencies: undefined,      /* Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? */
  // cdkTestDependencies: undefined,  /* AWS CDK modules required for testing. */
  // deps: [],                        /* Runtime dependencies of this module. */
  // description: undefined,          /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                     /* Build dependencies for this module. */
  // packageName: undefined,          /* The "name" in package.json. */
  // release: undefined,              /* Add release management to this project. */
});
project.synth();