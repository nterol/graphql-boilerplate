import getUserId from "../../utils/getUserId";

const graphMutation = {
  createGraph: (parent, { data }, { prisma, request }, info) => {
    const userId = getUserId(request);

    return prisma.mutation.createGraph(
      {
        data: {
          title: data.title,
          author: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    );
  },
  updateGraph: async (parent, { id, data }, { prisma, request }, info) => {
    const userId = getUserId(request);

    const graphExists = await prisma.exists.Graph({
      id,
      author: { id: userId }
    });

    if (!graphExists) throw new Error("Could not update graph");

    return prisma.mutation.updateGraph(
      {
        where: {
          id
        },
        data
      },
      info
    );
  },
  deleteGraph: (parent, { id }, { prisma, request }, info) => {}
};

export default graphMutation;
