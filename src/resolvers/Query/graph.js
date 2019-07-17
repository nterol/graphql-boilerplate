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
  }, 
  graph: (parent,
    { id },
    { prisma },
    info) => {
      const opArgs = {where: {id}};

      return prisma.query.graph(opArgs, info);
    }
};

export default graphQuery;
