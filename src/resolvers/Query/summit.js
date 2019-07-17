import infoDeepStringifier from "./utils/infoDeepStringifier";

const purify = arr => arr.map(({ node }) => ({ ...node }));

const summitQuery = {
  summits: (
    parent,
    { query, first, skip, after, orderBy },
    { prisma },
    info
  ) => {
    const opArgs = {
      query,
      first,
      skip,
      after,
      orderBy
    };

    if (query)
      opArgs.where.OR = [
        {
          title_contains: query
        },
        { body_contains: query }
      ];

    return prisma.query.summits(opArgs, info);
  },
  summit: async (parent, { id }, { prisma }, info) => {
    const opArgs = { where: { id } };

    /* 
This hack is because edges have source and target references, 
but summit only have source reference. 
Meaning they can only access to themself or to the nodes their pointing at
While accessing a particular node, I want to access both nodes pointed by the it and nodes pointing at it
Hence this artificial reconstruction
*/

    const isTarget = info.fieldNodes[0].selectionSet.selections.findIndex(
      ({ name: { value } }) => value === "target"
    );

    const summit = await prisma.query.summit(opArgs, info);

    if (isTarget !== -1) {
      const targetInfoFields = infoDeepStringifier(
        info.fieldNodes[0].selectionSet.selections[isTarget].selectionSet
      ).join(" ");

      const sink = await prisma.query.edgesConnection(
        {
          where: { target: { id } }
        },
        `{ edges { node { ${targetInfoFields} } } }`
      );

      const target = purify(sink.edges);
      summit.target = target;

      return summit;
    }

    return summit;
  }
};

export default summitQuery;
