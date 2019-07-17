import getUserId from "../../utils/getUserId";

const summitMutation = {
  createSummit(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.createSummit(
      {
        data: {
          author: {
            connect: { id: userId }
          },
          graphs: { connect: { id: data.graph } },
          title: data.title,
          body: data.body
        }
      },
      info
    );
  },

  updateSummit() {},
  async deleteSummit(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);

    const summitExists = await prisma.exists.Summit({
      id,
      author: { id: userId }
    });

    if (!summitExists) throw new Error("could not delete node");

    return prisma.mutation.deleteSummit({ where: { id } }, info);
  }
};

export default summitMutation;
