import { extractFragmentReplacements } from "prisma-binding";

import Query from "./Query/Query";
import Mutation from "./Mutation/Mutation";
// import Subscription from "./Subscription";
import User from "./User";
import Graph from "./Graph";
import Summit from "./Summit";
import Edge from "./Edge";

const resolvers = {
  Query,
  Mutation,
  // Subscription,
  User,
  Graph,
  Summit,
  Edge
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
