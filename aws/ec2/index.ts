import securityGroupPolicies from "./securityGroup";
import network from "./network";
import volumes from "./volumes";

export default [...securityGroupPolicies, ...network, ...volumes];