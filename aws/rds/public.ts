import {
  ResourceValidationPolicy,
  validateResourceOfType,
} from "@pulumi/policy";
import * as aws from "@pulumi/aws";

const publicAccess: ResourceValidationPolicy = {
  name: "disallow-public-access",
  description: "Checks that public access is not enabled on RDS Instances.",
  enforcementLevel: "advisory",
  validateResource: [
    validateResourceOfType(
      aws.rds.Instance,
      (instance, args, reportViolation) => {
        if (!instance.publiclyAccessible) {
          reportViolation(
            "RDS Instances should not be created with public access enabled."
          );
        }
      }
    ),
    validateResourceOfType(
      aws.rds.ClusterInstance,
      (clusterInstance, args, reportViolation) => {
        if (!clusterInstance.publiclyAccessible) {
          reportViolation(
            "RDS Cluster Instances should not be created with public access enabled."
          );
        }
      }
    ),
  ],
};

export default [publicAccess];
