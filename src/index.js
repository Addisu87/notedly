const express = require("express");
const { ApolloServer } = require("apollo-server-express");

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;

// Construct a schema, using GraphQL's schema language
const typeDefs = `
  type Query {
    hello: String
  }
`;

// Provide resolver functions for our schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.start().then((res) => {
  server.applyMiddleware({ app, path: "/api" });
  app.listen({ port }, () =>
    console.log(
      `GraphQL Server running on http://localhost:${port}${server.graphqlPath}`
    )
  );
});
