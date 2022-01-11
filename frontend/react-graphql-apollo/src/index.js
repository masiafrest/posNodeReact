import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SnackbarProvider } from "notistack";
import CloseSnackBar from "./components/CloseSnackBar";

import {
  ApolloProvider,
  ApolloClient,
  // createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { getUrlHost } from "./utils";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// const httpLink = createHttpLink({
//   uri: "http://localhost:4000/graphql",
// });
const host = getUrlHost();
console.log("host: ", host);
const uri = `http://${host}:4000/graphql`;

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
      <SnackbarProvider
        preventDuplicate
        maxSnack={2}
        action={(key) => {
          return <CloseSnackBar snackbarKey={key} />;
        }}
      >
        <App />
      </SnackbarProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
