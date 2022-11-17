import {
  ResourceValidationPolicy,
  validateResourceOfType,
} from "@pulumi/policy";
import * as aws from "@pulumi/aws";

const storageEncrypted: ResourceValidationPolicy = {
  name: "storage-encryption-enabled",
  description: "Checks that RDS storage is encrypted.",
  enforcementLevel: "advisory",
  validateResource: [
    validateResourceOfType(
      aws.rds.Instance,
      (instance, args, reportViolation) => {
        if (!instance.storageEncrypted) {
          reportViolation("RDS Instance storage should be encrypted.");
        }
      }
    ),
    validateResourceOfType(
      aws.rds.Cluster,
      (cluster, args, reportViolation) => {
        if (!cluster.storageEncrypted) {
          reportViolation("RDS Cluster storage should be encrypted.");
        }
      }
    ),
  ],
};

const storageCustomerManagedKey: ResourceValidationPolicy = {
  name: "storage-encryptionenabled-with-customer-managed-key",
  description: "Checks that storage is encrypted with a customer managed key.",
  enforcementLevel: "advisory",
  validateResource: [
    validateResourceOfType(
      aws.rds.Instance,
      (instance, args, reportViolation) => {
        if (!instance.kmsKeyId === undefined) {
          reportViolation(
            "RDS Instance storage should be encrypted with a customer managed key."
          );
        }
      }
    ),
    validateResourceOfType(
      aws.rds.Cluster,
      (cluster, args, reportViolation) => {
        if (!cluster.kmsKeyId === undefined) {
          reportViolation(
            "RDS Cluster storage should be encrypted with a customer managed key."
          );
        }
      }
    ),
  ],
};

export default [storageEncrypted, storageCustomerManagedKey];
