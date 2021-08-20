import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import {
  ApolloProvider,
  ApolloClient,
  // createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// const { localIp } = require("../../../getLocalIp");
// console.log("local ip: ", localIp);

// const httpLink = createHttpLink({
//   uri: "http://localhost:4000/graphql",
// });

const cellooIp = "192.168.1.104";
const homeIp = "";
const host = "localhost";
const uri = `http://${cellooIp}:4000/graphql`;

console.log("uri: ", uri);

const uploadLink = createUploadLink({
  uri,
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
