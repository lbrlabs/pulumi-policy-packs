import * as aws from "@pulumi/aws";
import { PolicyPack } from "@pulumi/policy";
import ec2 from "./ec2";
import rds from "./rds";
import lambda from "./lambda";

new PolicyPack("aws", {
  policies: [...ec2, ...rds, ...lambda],
});
