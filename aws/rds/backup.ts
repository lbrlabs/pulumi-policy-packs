import {
    ResourceValidationPolicy,
    validateResourceOfType,
  } from "@pulumi/policy";
  import * as aws from "@pulumi/aws";
  
  const backupRetention: ResourceValidationPolicy = {
    name: "disallow-low-backup-retention-period",
    description: "Checks that backup retention policy is adequate.",
    enforcementLevel: "advisory",
    validateResource: [
      validateResourceOfType(
        aws.rds.Instance,
        (instance, args, reportViolation) => {
          if (!instance.backupRetentionPeriod ?? 0 > 2) {
            reportViolation(
              "RDS Instance backup retention period is lower than 2 days."
            );
          }
        }
      ),
      validateResourceOfType(
        aws.rds.Cluster,
        (cluster, args, reportViolation) => {
          if (!cluster.backupRetentionPeriod ?? 0 > 2) {
            reportViolation(
              "RDS Cluster backup retention period is lower than 2 days."
            );
          }
        }
      ),
    ],
  };
  
  export default [ backupRetention ];
  