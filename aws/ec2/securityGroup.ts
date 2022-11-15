import {
  ResourceValidationPolicy,
  validateResourceOfType,
} from "@pulumi/policy";
import * as aws from "@pulumi/aws";

const description: ResourceValidationPolicy = {
  name: "add-desciption-to-security-group",
  description: "Checks that all security groups have a description.",
  enforcementLevel: "advisory",
  validateResource: validateResourceOfType(
    aws.ec2.SecurityGroup,
    (sg, args, reportViolation) => {
      if (!sg.description) {
        reportViolation("Security group must have a description.");
      }
    }
  ),
};



export default [
    description,
];
