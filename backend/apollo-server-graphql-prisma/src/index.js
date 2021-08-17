const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { GraphQLUpload, graphqlUploadExpress } = require("graphql-upload");

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
  Upload: GraphQLUpload,
};

async function startServer() {
  const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
    resolvers,
    context: ({ req }) => {
      const authToken = req.headers.authorization;
      return {
        ...req,
        prisma,
        currentUser: authToken ? tradeTokenForUser(authToken) : null,
      };
    },
  });

  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress({ maxFiles: 3 }));

  app.use(
    express.static(
      path.join(__dirname, "../../../frontend/react-graphql-apollo", "build")
    )
  );

  const { networkInterfaces } = require("os");
  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === "IPv4" && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  console.log("result", results);

  app.get("/upload/item/:image", (req, res, next) => {
    console.log(req.params.image);
    const { image } = req.params;
    const pathDir = path.join(__dirname, `../public/images/items/${image}`);
    console.log("pathDir", pathDir);
    res.sendFile(pathDir);
  });

  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
