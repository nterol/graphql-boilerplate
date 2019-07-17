import getUserId from "../../utils/getUserId";

const edgeMutation = {
  createEdge: (parent, { data }, { prisma, request }, info) => {
    const userId = getUserId(request);

    console.log("DATA      ", data);

    return prisma.mutation.createEdge(
      {
        data: {
          author: { connect: { id: userId } },
          graph: { connect: { id: data.graph } },
          source: { connect: { id: data.source } },
          target: { connect: { id: data.target } },
          title: data.title,
          body: data.body
        }
      },
      info
    );
  },

  updateEdge: async (parent, { id, data }, { prisma, request }, info) => {
    const userId = getUserId(request);

    const edgeExists = await prisma.exists.Edge({ id, author: { id: userId } });
    if (!edgeExists) throw new Error("could not update Link");

    if (data.graph) {
      const graphExists = await prisma.exists.Graph({ id: data.graph });

      if (!graphExists) throw new Error("could not update Link");
    }

    return prisma.mutation.updateEdge({
      where: { id },
      data: {
        graph: { connect: { id: data.graph } },
        ...data
      }
    });
  },

  deleteEdge: async (parent, { id }, { prisma, request }, info) => {
    const userId = getUserId(request);

    const edgeExists = await prisma.exists.Edge({
      id,
      author: { id: userId }
    });

    if (!edgeExists) throw new Error("Could not delete link");

    return prisma.mutation.deleteEdge({ where: { id } }, info);
  }
};

export default edgeMutation;
