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
| [`amiName`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertyaminame)<span title="Required">*</span> | `string` | the AMI name. |
| [`componentsFolder`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertycomponentsfolder)<span title="Required">*</span> | `string` | Local folder name including path which contains the component yaml files. |
| [`id`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertyid)<span title="Required">*</span> | `string` | the id to use as a name suffix to identify resources. |
| [`instanceTypes`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertyinstancetypes)<span title="Required">*</span> | `string`[] | the instance types to use for the build. |
| [`parentImage`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertyparentimage)<span title="Required">*</span> | `string` | Parent AMI Image Arn. |
| [`region`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertyregion)<span title="Required">*</span> | `string` | region the build will run in. |
| [`securityGroupIds`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertysecuritygroupids)<span title="Required">*</span> | `string`[] | the securityGroupIds to use for the build. |
| [`subnetId`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertysubnetid)<span title="Required">*</span> | `string` | the subnet id to use for the build. |
| [`version`](#cloudaddercdkec2imagebuilderimagebuilderpropspropertyversion)<span title="Required">*</span> | `string` | version to use in the metadata of the build. |

---

##### `amiName`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.amiName" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertyaminame"></a>

```typescript
public readonly amiName: string;
```

- *Type:* `string`

the AMI name.

---

##### `componentsFolder`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.componentsFolder" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertycomponentsfolder"></a>

```typescript
public readonly componentsFolder: string;
```

- *Type:* `string`

Local folder name including path which contains the component yaml files.

---

##### `id`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.id" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertyid"></a>

```typescript
public readonly id: string;
```

- *Type:* `string`

the id to use as a name suffix to identify resources.

---

##### `instanceTypes`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.instanceTypes" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertyinstancetypes"></a>

```typescript
public readonly instanceTypes: string[];
```

- *Type:* `string`[]

the instance types to use for the build.

---

##### `parentImage`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.parentImage" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertyparentimage"></a>

```typescript
public readonly parentImage: string;
```

- *Type:* `string`

Parent AMI Image Arn.

---

##### `region`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.region" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertyregion"></a>

```typescript
public readonly region: string;
```

- *Type:* `string`

region the build will run in.

---

##### `securityGroupIds`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.securityGroupIds" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertysecuritygroupids"></a>

```typescript
public readonly securityGroupIds: string[];
```

- *Type:* `string`[]

the securityGroupIds to use for the build.

---

##### `subnetId`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.subnetId" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertysubnetid"></a>

```typescript
public readonly subnetId: string;
```

- *Type:* `string`

the subnet id to use for the build.

---

##### `version`<sup>Required</sup> <a name="@cloudadder/cdk-ec2-imagebuilder.ImageBuilderProps.property.version" id="cloudaddercdkec2imagebuilderimagebuilderpropspropertyversion"></a>

```typescript
public readonly version: string;
```

- *Type:* `string`

version to use in the metadata of the build.

AWS requires a version unique to the build, therefore incrementing the version number is required for each deployment.

---



