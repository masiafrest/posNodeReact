const Query = require("../resolvers/Query");
const Mutation = require("../resolvers/Mutation");
const { GraphQLUpload } = require("graphql-upload");

const resolvers = {
  Query,
  Mutation,
  Upload: GraphQLUpload,
};

module.exports = resolvers;
