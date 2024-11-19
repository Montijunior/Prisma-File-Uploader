const { PrismaClient } = require("@prisma/client");

let prismaInstance;

const getPrismaClient = () => {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
};

module.exports = getPrismaClient;
