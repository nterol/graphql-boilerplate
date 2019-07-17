const graphQuery = {
  graphs: (
    parent,
    { query, first, skip, after, orderBy },
    { prisma },
    info
  ) => {
    const opArgs = {
      first,
      skip,
      after,
      orderBy
    };

    if (query) {
      opArgs.where = {
        title_contains: query
      };
    }

    return prisma.query.graphs(opArgs, info);
  }
};

export default graphQuery;
