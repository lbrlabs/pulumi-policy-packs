import {
  ResourceValidationPolicy,
  validateResourceOfType,
} from "@pulumi/policy";
import * as aws from "@pulumi/aws";

const encryptedRootVolume: ResourceValidationPolicy = {
  name: "disallow-unencrypted-root-volume",
  description:
    "Checks that any EC2 resources do not have unencrypted root volumes.",
  enforcementLevel: "advisory",
  validateResource: [
    validateResourceOfType(
      aws.ec2.LaunchConfiguration,
      (lc, args, reportViolation) => {
        if (!lc.rootBlockDevice?.encrypted) {
          reportViolation(
            "The root block device for this launch configuration is not encrypted."
          );
        }
      }
    ),
    validateResourceOfType(aws.ec2.Instance, (i, args, reportViolation) => {
      if (!i.rootBlockDevice?.encrypted) {
        reportViolation(
          "The root block device for this instance is not encrypted."
        );
      }
    }),
  ],
};

const encryptedBlockDevices: ResourceValidationPolicy = {
  name: "disallow-unencrypted-volumes",
  description: "Checks that any EC2 resources do not have unencrypted volumes.",
  enforcementLevel: "advisory",
  validateResource: [
    validateResourceOfType(
      aws.ec2.LaunchConfiguration,
      (lc, args, reportViolation) => {
        lc.ebsBlockDevices?.forEach((device) => {
          if (!device.encrypted) {
            reportViolation(
              "A block device for this launch configuration is not encrypted."
            );
          }
        });
      }
    ),
    validateResourceOfType(aws.ec2.Instance, (i, args, reportViolation) => {
      i.ebsBlockDevices?.forEach((device) => {
        if (!device.encrypted) {
          reportViolation("A block device for this instance is not encrypted.");
        }
      });
    }),
    validateResourceOfType(
      aws.ec2.LaunchTemplate,
      (lt, args, reportViolation) => {
        lt.blockDeviceMappings?.forEach((device) => {
          if (!device.ebs?.encrypted) {
            reportViolation(
              "A block device for this launch template is not encrypted."
            );
          }
        });
      }
    ),
  ],
};

export default [encryptedBlockDevices, encryptedRootVolume];
