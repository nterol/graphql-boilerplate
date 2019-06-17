import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../../src/prisma";

export const userOne = {
  input: {
    name: "John",
    email: "john.doe@example.com",
    password: bcrypt.hashSync("whatever")
  },
  user: undefined,
  jwt: undefined
};

export const userTwo = {
  input: {
    name: "Jess",
    email: "jessy.james@example.com",
    password: bcrypt.hashSync("correctPassword")
  },
  user: undefined,
  jwt: undefined
};

async function seedDatabase() {
  /* DELETE TEST DATA */
  await prisma.mutation.deleteManyUsers();

  /* CREATE USERS */
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });

  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);
}
export default seedDatabase;
