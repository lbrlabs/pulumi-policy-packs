# AWS Policies

## EC2

| Name                                                | Rationale             | Resources Affected                                                                                    |
| --------------------------------------------------- |:---------------------:|-------------------------------------------------------------------------------------------------------|
| add-desciption-to-security-group                    | Prevents human errors | [Security Group](https://www.pulumi.com/registry/packages/aws/api-docs/ec2/securitygroup/)            |
| disallow-public-ips                                 |                       | [Launch Configuration](https://www.pulumi.com/registry/packages/aws/api-docs/ec2/launchconfiguration)<br/>[Launch Template](https://www.pulumi.com/registry/packages/aws/api-docs/ec2/launchtemplate)<br/>[Instance](https://www.pulumi.com/registry/packages/aws/api-docs/ec2/instance/)    |
| disallow-unencrypted-root-volume                         |                       | [Instance](https://www.pulumi.com/registry/packages/aws/api-docs/ec2/instance/)  <br/>[Launch Configuration](https://www.pulumi.com/registry/packages/aws/api-docs/ec2/launchconfiguration)            |                 
| disallow-unencrypted-volumes |                       |[Launch Configuration](https://www.pulumi.com/registry/packages/aws/api-docs/ec2/launchconfiguration)<br/>[Launch Template](https://www.pulumi.com/registry/packages/aws/api-docs/ec2/launchtemplate)<br/>[Instance](https://www.pulumi.com/registry/packages/aws/api-docs/ec2/instance/)    |


## RDS

| Name                                                | Rationale             | Resources Affected                                                                                    |
| --------------------------------------------------- |:---------------------:|-------------------------------------------------------------------------------------------------------|
| disallow-low-backup-retention-period                |                       |[Instance](https://www.pulumi.com/registry/packages/aws/api-docs/rds/instance)<br/>[Cluster](https://www.pulumi.com/registry/packages/aws/api-docs/rds/cluster)|
| disallow-classic-resources                          |                       |[Instance](https://www.pulumi.com/registry/packages/aws/api-docs/rds/instance)                         |
| performance-insights-enabled                        |                       |[Instance](https://www.pulumi.com/registry/packages/aws/api-docs/rds/instance)<br/>[Cluster Instance](https://www.pulumi.com/registry/packages/aws/api-docs/rds/clusteristance)|
| performance-insights-encrypted                      |                       |[Instance](https://www.pulumi.com/registry/packages/aws/api-docs/rds/instance)<br/>[Cluster Instance](https://www.pulumi.com/registry/packages/aws/api-docs/rds/clusteristance)|
| disallow-public-access                              |                       |[Instance](https://www.pulumi.com/registry/packages/aws/api-docs/rds/instance)<br/>[Cluster Instance](https://www.pulumi.com/registry/packages/aws/api-docs/rds/clusteristance)|
| storage-encryption-enabled                          |                       |[Instance](https://www.pulumi.com/registry/packages/aws/api-docs/rds/instance)<br/>[Cluster](https://www.pulumi.com/registry/packages/aws/api-docs/rds/cluster)|
| storage-encryption-with-customer-managed-key        |                       |[Instance](https://www.pulumi.com/registry/packages/aws/api-docs/rds/instance)<br/>[Cluster](https://www.pulumi.com/registry/packages/aws/api-docs/rds/cluster)|

## Lambda

| Name                                                | Rationale             | Resources Affected                                                                                    |
| --------------------------------------------------- |:---------------------:|-------------------------------------------------------------------------------------------------------|
| disallow-lambda-without-tracing                     |                       |[Function](https://www.pulumi.com/registry/packages/aws/api-docs/lambda/function)|
| disallow-permission-without-source-arn              |                       |[Permission](https://www.pulumi.com/registry/packages/aws/api-docs/lambda/permission)|

## ECR

| Name                                                | Rationale             | Resources Affected                                                                                    |
| --------------------------------------------------- |:---------------------:|-------------------------------------------------------------------------------------------------------|
| disallow-repo-without-image-scans                   |                       |[Repository](https://www.pulumi.com/registry/packages/aws/api-docs/ecr/repository)|
| disallow-repo-without-immutable-image               |                       |[Repository](https://www.pulumi.com/registry/packages/aws/api-docs/ecr/repository)|