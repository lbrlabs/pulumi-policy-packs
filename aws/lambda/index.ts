import {
  ResourceValidationPolicy,
  validateResourceOfType,
} from "@pulumi/policy";
import * as aws from "@pulumi/aws";

const tracingEnabled: ResourceValidationPolicy = {
  name: "disallow-lambda-without-tracing",
  description: "Checks that Lambda functions have tracing enabled.",
  enforcementLevel: "advisory",
  validateResource: [
    validateResourceOfType(aws.lambda.Function, (f, args, reportViolation) => {
      if (f.tracingConfig?.mode !== "Active") {
        reportViolation("Lambda functions should have tracing enabled.");
      }
    }),
  ],
};

const sourceArn: ResourceValidationPolicy = {
  name: "disallow-permission-without-source-arn",
  description:
    "Checks that lambda function permissions have a source arn specified.",
  enforcementLevel: "advisory",
  validateResource: [
    validateResourceOfType(
      aws.lambda.Permission,
      (f, args, reportViolation) => {
        if (f.sourceArn === undefined) {
          reportViolation(
            "Lambda function permissions should have a source ARN defined."
          );
        }
      }
    ),
  ],
};

export default [];
