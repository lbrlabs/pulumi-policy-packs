import {
  ResourceValidationPolicy,
  validateResourceOfType,
} from "@pulumi/policy";
import * as aws from "@pulumi/aws";

const publicIps: ResourceValidationPolicy = {
  name: "disallow-public-ips",
  description: "Checks that any EC2 resources do not have public IP addresses.",
  enforcementLevel: "advisory",
  validateResource: [
    validateResourceOfType(
      aws.ec2.LaunchConfiguration,
      (lc, args, reportViolation) => {
        if (!lc.associatePublicIpAddress) {
          reportViolation(
            "Launch configurations should not have a public IP address."
          );
        }
      }
    ),
    validateResourceOfType(
      aws.ec2.LaunchTemplate,
      (lt, args, reportViolation) => {
        lt.networkInterfaces?.forEach((iface) => {
          if (!iface.associatePublicIpAddress) {
            reportViolation(
              "Launch templates should not have a public IP address."
            );
          }
        });
      }
    ),
    validateResourceOfType(
      aws.ec2.Instance,
      (instance, args, reportViolation) => {
        if (!instance.associatePublicIpAddress) {
          reportViolation("Instances should not have a public IP address.");
        }
      }
    ),
  ],
};

export default [publicIps];
