const { PORT } = require("../utils/config");
const { ApolloServer } = require("apollo-server-express");
const fs = require("fs");

const path = require("path");

const app = require("./expressApp");
const resolvers = require("./resolvers");
const context = require("./context");

const server = new ApolloServer({
  introspection: true,
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context,
});

async function startServer(http) {
  await server.start();
  server.applyMiddleware({ app });
  // await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  // app.listen(
  //   { port: PORT },
  //   console.log(
  //     `🚀 Serve React build files ready at http://localhost:${PORT}`,
  //     "\n",
  //     `🚀 Grahql Server ready at http://localhost:${PORT}${server.graphqlPath}`
  //   )
  // );
  const httpServer = http.createServer(app);
  httpServer.listen(
    PORT,
    console.log(
      `🚀 Serve React build files ready at http://localhost:${PORT}`,
      "\n",
      `🚀 Grahql Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
}

module.exports = { startServer, server };
