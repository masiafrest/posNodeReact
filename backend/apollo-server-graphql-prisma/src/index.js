const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const { tradeTokenForUser } = require("./resolvers/controllers/utils");

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: ({ req }) => {
    const authToken = req.headers.authentication;
    return {
      ...req,
      prisma,
      currentUser: authToken ? tradeTokenForUser(authToken) : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
