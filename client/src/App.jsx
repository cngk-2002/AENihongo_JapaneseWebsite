import { BrowserRouter } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MainSection } from "./components";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const darkMode = useSelector((state) => state.darkMode.value);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-gray-100">
          <MainSection />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
