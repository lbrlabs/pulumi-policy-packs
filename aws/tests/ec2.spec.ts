import "mocha";

import * as aws from "@pulumi/aws";
import * as ec2 from "../ec2";

import {
  assertHasResourceViolation,
  assertNoResourceViolations,
  createResourceValidationArgs,
} from "./util";

describe("#ec2SecurityGroup", () => {
  const policy = ec2.default[0]; // FIXME: refactor this so it's not an array?

  it("should fail if no security group description set.", async () => {
    await assertHasResourceViolation(
      policy,
      createResourceValidationArgs(aws.ec2.SecurityGroup, {}),
      { message: "Security group must have a description." }
    );
  });

  it("should fail if no security group description set.", async () => {
    await assertNoResourceViolations(
      policy,
      createResourceValidationArgs(aws.ec2.SecurityGroup, {
        description: "I have a description!",
      })
    );
  });
});

describe("#ec2LaunchConfiguration", () => {
  const publicIpPolicy = ec2.network; // FIXME: refactor this so it's not an array?
  const volumePolicy = ec2.volumes;

  console.log(publicIpPolicy[0])

  it("should fail if associate public IP is set.", async () => {
    await assertHasResourceViolation(
      publicIpPolicy[0],
      createResourceValidationArgs(aws.ec2.LaunchConfiguration, {
        imageId: "ami-123456",
        instanceType: "t2.micro",
        associatePublicIpAddress: true,
      }),
      { message: "Launch configurations should not have a public IP address." }
    );
  });

// FIXME: why doesn't this work?
//   it("should fail if the root block device is not encrypted.", async () => {
//     await assertHasResourceViolation(
//       volumePolicy,
//       createResourceValidationArgs(aws.ec2.LaunchConfiguration, {
//         imageId: "ami-123456",
//         instanceType: "t2.micro",
//       }),
//       {
//         message:
//           "The root block device for this launch configuration is not encrypted.",
//       }
//     );
//   });


});
