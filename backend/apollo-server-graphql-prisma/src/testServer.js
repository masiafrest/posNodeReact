const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { GraphQLUpload, graphqlUploadExpress } = require("graphql-upload");

const { PrismaClient } = require("@prisma/client");

const fs = require("fs");
const path = require("path");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const { tradeTokenForUser } = require("./utils");
const { localIp } = require("./getLocalIp");

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
  Upload: GraphQLUpload,
};

async function startServer() {
  const server = new ApolloServer({
    introspection: true,
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
  app.use(cors());

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress({ maxFiles: 3 }));

  app.use(
    express.static(
      path.join(__dirname, "../../../frontend/react-graphql-apollo", "build")
    )
  );
  console.log(localIp);

  app.get("/upload/item/:image", (req, res, next) => {
    const { image } = req.params;
    const pathDir = path.join(__dirname, `../publicTest/images/items/${image}`);
    res.sendFile(pathDir);
  });

  server.applyMiddleware({ app });
  console.log(process.env)
  console.log(process.env.PORT)
  console.log(process.env.NODE_ENV)
  const PORT = process.env.PORT || 8888;
  await new Promise((resolve) => app.listen({ port: PORT }, resolve));

  console.log(
    "-------------------- this is a test server ---------------------------------"
  );
  console.log(`🚀 Serve React build files ready at http://localhost:${PORT}`);
  console.log(
    `🚀 Grahql Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    "-------------------- this is a test server --------------------------------- "
  );
}

startServer();
module.exports = startServer;
