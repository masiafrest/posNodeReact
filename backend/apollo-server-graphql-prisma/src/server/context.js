const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { tradeTokenForUser } = require("../utils");

const context = ({ req }) => {
  const authToken = req.headers.authorization;
  return {
    ...req,
    prisma,
    currentUser: authToken ? tradeTokenForUser(authToken) : null,
  };
};

module.exports = context;
