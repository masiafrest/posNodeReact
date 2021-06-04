const { ApolloServer } = require("apollo-server");
const fs = require('fs')
const path = require('path')

const resolvers = {
  Query: info:()=> 'api pos server'
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql')),
  resolvers
})

server.listen().then(({url}) => console.log(`Server is running on ${url}`)) 
