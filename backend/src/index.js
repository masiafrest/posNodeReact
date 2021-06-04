const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const Query = require("./resolvers/Query");

const prisma = new PrismaClient();

/**
 */
const resolvers = {
  Query,
  Mutation: {
    postItem: async (parent, args, ctx, info) => {
      console.log(args);
      return args;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
