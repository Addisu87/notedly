const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
require("dotenv").config();
const db = require("./db");

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;

// Store the DB_HOST value as a variable
const DB_HOST = process.env.DB_HOST;

let notes = [
  {
    id: "1",
    content: "This is a note",
    author: "Adam Scott",
  },
  {
    id: "2",
    content: "This is another note!",
    author: "Harlow Everly",
  },
  {
    id: "3",
    content: "This is a third note!",
    author: "Riley Harrison",
  },
];

// Construct a schema, using GraphQL's schema language
const typeDefs = gql`
  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }

  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Mutation {
    newNote(content: String!): Note!
  }
`;

// Provide resolver functions for our schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    notes: () => notes,
    note: (parent, args) => {
      return notes.find((note) => note.id === args.id);
    },
  },

  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: "Addisu Haile",
      };
      notes.push(noteValue);
      return noteValue;
    },
  },
};

const app = express();

// Connect to the database
db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the Apollo GraphQL middleware and set the path to /api
server.start().then((res) => {
  server.applyMiddleware({ app, path: "/api" });
  app.listen({ port }, () =>
    console.log(
      `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
  );
});
