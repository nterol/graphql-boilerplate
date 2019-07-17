import userMutation from "./user";

import graphMutation from "./graph";
import summitMutation from "./summit";
import edgeMutation from "./edge";

const Mutation = {
  ...userMutation,
  ...graphMutation,
  ...edgeMutation,
  ...summitMutation
};

export { Mutation as default };
