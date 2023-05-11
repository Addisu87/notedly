const { ApolloServer } = require("apollo-server");
require("dotenv").config();

// Run the server on a port specifies in out .env file or port 4000
const port = process.env.PORT || 4000;

//graphql server

//types query/mutation/subscription
const typeDefs = `
  type Query {
    hello: String
  }
`;

//resolvers
const resolvers = {
  Query: {
    hello: () => "Hello world",
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.listen(port, () => {
  console.log(`🚀 GRAPHQL Server is running at http://localhost:${port}`);
});
