# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="constructs"></a>

### ImageBuilder <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilder" id="cloudaddercdkec2imagebuilderimagebuilder"></a>

#### Initializers <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilder.Initializer" id="cloudaddercdkec2imagebuilderimagebuilderinitializer"></a>

```typescript
import { ImageBuilder } from '@cloudadder/cdk-ec2-imagebuilder'

new ImageBuilder(scope: Construct, id: string, props: ImageBuilderProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#cloudaddercdkec2imagebuilderimagebuilderparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#cloudaddercdkec2imagebuilderimagebuilderparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#cloudaddercdkec2imagebuilderimagebuilderparameterprops)<span title="Required">*</span> | [`@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps`](#@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilder.parameter.scope" id="cloudaddercdkec2imagebuilderimagebuilderparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilder.parameter.id" id="cloudaddercdkec2imagebuilderimagebuilderparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilder.parameter.props" id="cloudaddercdkec2imagebuilderimagebuilderparameterprops"></a>

- *Type:* [`@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps`](#@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps)

---





## Structs <a name="Structs" id="structs"></a>

### ImageBuilderProps <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps" id="cloudaddercdkec2imagebuilderimagebuilderprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { ImageBuilderProps } from '@cloudadder/cdk-ec2-imagebuilder'

const imageBuilderProps: ImageBuilderProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`amiName`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertyaminame)<span title="Required">*</span> | `string` | The AMI name. |
| [`componentsFolder`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertycomponentsfolder)<span title="Required">*</span> | `string` | Local folder name including path which contains the component yaml files. |
| [`id`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertyid)<span title="Required">*</span> | `string` | The id to use as a name suffix to identify resources in AWS. |
| [`securityGroupIds`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertysecuritygroupids)<span title="Required">*</span> | `string`[] | The securityGroupIds to use for the build. |
| [`subnetId`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertysubnetid)<span title="Required">*</span> | `string` | The subnet id to use for the build. |
| [`version`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertyversion)<span title="Required">*</span> | `string` | Version to use in the metadata of the build. |
| [`componentsManagedByAWS`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertycomponentsmanagedbyaws) | `string`[] | A list of AWS managed component arns to be used in the image recipe. |
| [`instanceTypes`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertyinstancetypes) | `string`[] | The instance types to use for the build. |
| [`parentImage`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertyparentimage) | `string` | Parent AMI Image Arn. |
| [`scheduleExpression`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertyscheduleexpression) | `string` | The [scheduleExpression](https://docs.aws.amazon.com/imagebuilder/latest/userguide/cron-expressions.html) for creating a refresh schedule of the AMI in cron format ```0 0 * * ? *```. |
| [`targetAccountIds`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertytargetaccountids) | `string`[] | The account ids to share the AMI with. |

---

##### `amiName`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.amiName" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertyaminame"></a>

```typescript
public readonly amiName: string;
```

- *Type:* `string`

The AMI name.

---

##### `componentsFolder`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.componentsFolder" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertycomponentsfolder"></a>

```typescript
public readonly componentsFolder: string;
```

- *Type:* `string`

Local folder name including path which contains the component yaml files.

e.g. ```'./src/components'```

---

##### `id`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.id" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertyid"></a>

```typescript
public readonly id: string;
```

- *Type:* `string`

The id to use as a name suffix to identify resources in AWS.

---

##### `securityGroupIds`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.securityGroupIds" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertysecuritygroupids"></a>

```typescript
public readonly securityGroupIds: string[];
```

- *Type:* `string`[]

The securityGroupIds to use for the build.

A single subnet id is enough to allow access to the build instance. The subnet must support [ssm agent installation](https://aws.amazon.com/premiumsupport/knowledge-center/ssm-agent-install-issues-linux/)

---

##### `subnetId`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.subnetId" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertysubnetid"></a>

```typescript
public readonly subnetId: string;
```

- *Type:* `string`

The subnet id to use for the build.

---

##### `version`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.version" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertyversion"></a>

```typescript
public readonly version: string;
```

- *Type:* `string`

Version to use in the metadata of the build.

AWS requires a version unique to the build, therefore incrementing the version number is required for each deployment.

---

##### `componentsManagedByAWS`<sup>Optional</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.componentsManagedByAWS" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertycomponentsmanagedbyaws"></a>

```typescript
public readonly componentsManagedByAWS: string[];
```

- *Type:* `string`[]

A list of AWS managed component arns to be used in the image recipe.

e.g. In the console under EC2 Image Builder->Components-reboot-linux you will find the arn of the reboot-linux component.

---

##### `instanceTypes`<sup>Optional</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.instanceTypes" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertyinstancetypes"></a>

```typescript
public readonly instanceTypes: string[];
```

- *Type:* `string`[]
- *Default:* ```[t3.medium]```

The instance types to use for the build.

---

##### `parentImage`<sup>Optional</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.parentImage" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertyparentimage"></a>

```typescript
public readonly parentImage: string;
```

- *Type:* `string`
- *Default:* the latest Amazon Linux 2 AMI  ``` 'arn:aws:imagebuilder:' + Stack.of(this).region + ':aws:image/amazon-linux-2-x86/x.x.x' ```

Parent AMI Image Arn.

---

##### `scheduleExpression`<sup>Optional</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.scheduleExpression" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertyscheduleexpression"></a>

```typescript
public readonly scheduleExpression: string;
```

- *Type:* `string`
- *Default:* No schedule

The [scheduleExpression](https://docs.aws.amazon.com/imagebuilder/latest/userguide/cron-expressions.html) for creating a refresh schedule of the AMI in cron format ```0 0 * * ? *```.

---

##### `targetAccountIds`<sup>Optional</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.targetAccountIds" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertytargetaccountids"></a>

```typescript
public readonly targetAccountIds: string[];
```

- *Type:* `string`[]

The account ids to share the AMI with.

---



