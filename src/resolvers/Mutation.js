import bcrypt from "bcryptjs";
import getUserId from "../utils/getUserId";
import generateToken from "../utils/generateToken";

import hashPassword from "../utils/hashPassword";

const Mutation = {
  createUser: async (parent, { data }, { prisma }, info) => {
    const password = await hashPassword(data.password);

    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password
      }
    });

    return {
      user,
      token: generateToken(user.id)
    };
  },

  login: async (parent, { data }, { prisma }, info) => {
    const user = await prisma.query.user({ where: { email: data.email } });

    if (!user) throw new Error("User does not exist");

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) return new Error("Could not login");

    return {
      user,
      token: generateToken(user.id)
    };
  },

  updateUser: async (parent, { id, data }, { prisma, request }, info) => {
    const userId = getUserId(request);

    if (typeof data.password === "string") {
      data.password = await hashPassword(data.password);
    }

    return prisma.mutation.updateUser({ where: { id: userId }, data }, info);
  },

  deleteUser: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request);
    console.log("ID", userId);
    return prisma.mutation.deleteUser({ where: { id: userId } }, info);
  }
};

export { Mutation as default };
