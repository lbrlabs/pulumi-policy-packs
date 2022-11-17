import {
  ResourceValidationPolicy,
  validateResourceOfType,
} from "@pulumi/policy";
import * as aws from "@pulumi/aws";

const performanceInsights: ResourceValidationPolicy = {
  name: "performance-insights-enabled",
  description: "Checks that RDS has performance insights enabled.",
  enforcementLevel: "advisory",
  validateResource: [
    validateResourceOfType(
      aws.rds.Instance,
      (instance, args, reportViolation) => {
        if (!instance.performanceInsightsEnabled) {
          reportViolation(
            "RDS Instances should have performance insights enabled."
          );
        }
      }
    ),
    validateResourceOfType(
      aws.rds.ClusterInstance,
      (clusterInstance, args, reportViolation) => {
        if (!clusterInstance.performanceInsightsEnabled) {
          reportViolation(
            "RDS Cluster instances should have performance insights enabled."
          );
        }
      }
    ),
  ],
};

const performanceInsightsEncrypted: ResourceValidationPolicy = {
  name: "performance-insights-encrypted",
  description: "Checks that performance insights in RDS is encrypted.",
  enforcementLevel: "advisory",
  validateResource: [
    validateResourceOfType(
      aws.rds.Instance,
      (instance, args, reportViolation) => {
        if (!instance.performanceInsightsEnabled === undefined) {
          reportViolation(
            "RDS Instances should have performance insights enabled."
          );
        }
      }
    ),
    validateResourceOfType(
      aws.rds.ClusterInstance,
      (clusterInstance, args, reportViolation) => {
        if (!clusterInstance.performanceInsightsKmsKeyId === undefined) {
          reportViolation(
            "RDS Cluster instances should have performance insights enabled."
          );
        }
      }
    ),
  ],
};

export default [performanceInsights, performanceInsightsEncrypted];
