import React from "react";
// import Apollo client libraries
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// global styles
import GlobalStyle from "./components/GlobalStyle";
// import our routes
import Pages from "./pages/index";

const App = () => {
  // configure our API URI & cache
  const uri = process.env.API_URI;
  const cache = new InMemoryCache();

  // configure Apollo Client
  const client = new ApolloClient({
    uri,
    cache,
    connectToDevTools: true,
  });

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

export default App;
