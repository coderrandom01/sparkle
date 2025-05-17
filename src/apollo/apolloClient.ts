import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

const clientUri = process.env.REACT_APP_BASE_API_URL;

// GraphQL endpoint
const uploadLink = createUploadLink({
  uri: clientUri,
});

// Fix: Define proper types for setContext function
const authLink = setContext((operation: any, prevContext: { headers?: Record<string, string> }) => {
  const token: string | null = localStorage.getItem("loginUserToken");

  // List of operations that should NOT require authentication
  const publicOperations: string[] = ["Login"];

  // Ensure `headers` exist in previous context, defaulting to an empty object
  const headers = prevContext.headers ? { ...prevContext.headers } : {};
  // Exclude token for public operations
  // if (publicOperations.includes(operation.operationName) || !operation.operationName) {
  //   return { headers };
  // }

  // Attach token for authenticated requests
  return {
    headers: {
      ...headers,
      Authorization: token ? `liSparklez ${token}` : "",
    },
  };
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

export default client;
