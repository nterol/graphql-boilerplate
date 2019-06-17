import getUserId from "../utils/getUserId";

const User = {
  email: {
    fragment: "fragment userField on User { id }",
    resolve: (parent, args, { request }, info) => {
      const userId = getUserId(request, false);

      if (userId && userId === parent.id) return parent.email;
      return null;
    }
  },
  password: {
    fragment: "fragment userField on User { id }",
    resolve: (parent, args, { request }, info) => {
      const userId = getUserId(request, false);

      if (userId && userId === parent.id) return parent.password;
      return null;
    }
  }
};

export { User as default };
