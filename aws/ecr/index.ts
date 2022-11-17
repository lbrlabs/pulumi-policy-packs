import {
  ResourceValidationPolicy,
  validateResourceOfType,
} from "@pulumi/policy";
import * as aws from "@pulumi/aws";

const imageScans: ResourceValidationPolicy = {
  name: "disallow-repo-without-image-scans",
  description: "Checks that ECR repositories have scan on push enabled.",
  enforcementLevel: "advisory",
  validateResource: [
    validateResourceOfType(
      aws.ecr.Repository,
      (repo, args, reportViolation) => {
        if (!repo.imageScanningConfiguration?.scanOnPush) {
          reportViolation("ECR image scanning on push should be enabled.");
        }
      }
    ),
  ],
};

const immutableImage: ResourceValidationPolicy = {
  name: "disallow-repo-without-immutable-image",
  description: "Checks that ECR repositories have immutable images enabled.",
  enforcementLevel: "advisory",
  validateResource: [
    validateResourceOfType(
      aws.ecr.Repository,
      (repo, args, reportViolation) => {
        if (repo.imageTagMutability !== "IMMUTABLE") {
          reportViolation("ECR repositories should have immutable images");
        }
      }
    ),
  ],
};

export default [imageScans, immutableImage];
