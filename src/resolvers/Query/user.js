import getUserId from "../../utils/getUserId";

const userQuery = {
  users: (parent, { query, first, skip, after, orderBy }, { prisma }, info) => {
    const opArgs = {
      first,
      skip,
      after,
      orderBy
    };
    if (query) {
      opArgs.where = {
        OR: [{ name_contains: query }, { email_contains: query }]
      };
    }
    return prisma.query.users(opArgs, info);
  },

  me: (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request);

    if (!userId) throw new Error("Auth required");

    return prisma.query.user({ where: { id: userId } }, info);
  }
};

export default userQuery;
