import performanceInsights from "./performanceInsights";
import storage from "./storage";
import classic from "./classic";
import publicAccess from "./public";

export default [
  ...performanceInsights,
  ...storage,
  ...classic,
  ...publicAccess,
];
