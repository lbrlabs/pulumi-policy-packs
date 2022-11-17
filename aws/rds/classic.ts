import {
  ResourceValidationPolicy,
  validateResourceOfType,
} from "@pulumi/policy";
import * as aws from "@pulumi/aws";

const classicResources: ResourceValidationPolicy = {
  name: "disallow-classic-resources",
  description: "Checks that no RDS classic resources are created.",
  enforcementLevel: "advisory",
  validateResource: [
    validateResourceOfType(
      aws.rds.Instance,
      (instance, args, reportViolation) => {
        if (!instance.securityGroupNames?.length ?? 0 > 0) {
          reportViolation(
            "RDS Instances should not be created with EC2-Classic security groups."
          );
        }
      }
    ),
  ],
};

export default [classicResources];
