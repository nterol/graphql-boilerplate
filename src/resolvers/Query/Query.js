import userQuery from "./user";
import graphQuery from "./graph";
import summitQuery from "./summit";
import edgeQuery from "./edge";

const Query = {
  ...userQuery,
  ...graphQuery,
  ...summitQuery,
  ...edgeQuery
};

export { Query as default };
