const edgeQuery = {
  edges: (parent, { query, first, skip, after, orderBy }, { prisma }, info) => {
    const opArgs = {
      first,
      skip,
      after,
      orderBy
    };
    if (query) {
      opArgs.where = {
        OR: [{ title_contains: query }, { body_contains: query }]
      };
    }

    return prisma.query.edges(opArgs, info);
  },
  edge: (parent, { id }, { prisma }, info) => {
    const opArgs = { where: { id } };

    return prisma.query.edge(opArgs, info);
  }
};

export default edgeQuery;
