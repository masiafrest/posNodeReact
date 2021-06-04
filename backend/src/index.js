const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

/**
 */
const resolvers = {
  Query: {
    /**
     * @typedef { import("@prisma/client").PrismaClient } Prisma
     * @param {any} parent
     * @param {{ searchString: string }} args
     * @param {{ prisma: Prisma }} ctx
     */
    items: async (parent, args, ctx, info) => {
      console.log("hello args", args);
      const item = await ctx.prisma.item.findMany({
        include: {
          categorias: true,
          inventarios: { include: { precio: true, ubicacion: true } },
        },
      });
      console.log(item);
      return item;
    },
  },
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
