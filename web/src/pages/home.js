import React from "react";
// import the required libraries
import { useQuery, gql } from "@apollo/client";

import ReactMarkdown from "react-markdown";

// our GraphQL stored as a variable
const GET_NOTES = gql`
  query noteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const Home = () => {
  // query hook
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error, display error message
  if (error) return <p>Error!</p>;
  // if the data is successful, display the data in our UI
  return (
    <div>
      {data.noteFeed.notes.map((note) => (
        <article key={note.id}>
          <img
            src={note.author.avatar}
            alt={`${note.author.username} avatar`}
            height="50px"
          />{" "}
          {note.author.username} {note.createdAt} {note.favoriteCount}{" "}
          <ReactMarkdown source={note.content} />
        </article>
      ))}
    </div>
  );
};

export default Home;
