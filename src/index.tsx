import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import React from "react";
import { render } from "react-dom";
import { Listings } from "./sections/Listings";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.css";

const client = new ApolloClient({
  uri: "/api",
});

render(
  <ApolloProvider client={client}>
    <Listings title="HackHouse Listings" />
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
