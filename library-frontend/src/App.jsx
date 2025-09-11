import { useState } from "react";
import {
  useApolloClient,
  useSubscription,
  useQuery,
} from "@apollo/client/react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";

import { BOOK_ADDED, ALL_BOOKS } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, (data) => {
    if (!data || !data.allBooks) {
      return {
        allBooks: [addedBook],
      };
    }
    console.log("addedBook:", addedBook);
    console.log("data:", data.allBooks);
    return {
      allBooks: uniqByName(data.allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  const result = useQuery(ALL_BOOKS);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      alert(`"${addedBook.title}" added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
      console.log(
        "CACHE AFTER UPDATE:",
        client.cache.readQuery({ query: ALL_BOOKS })
      );
    },
  });

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>

        {!token ? (
          <button onClick={() => setPage("login") > Login}>Login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>Add Book</button>
            <button onClick={() => setPage("recommend")}>Recommend</button>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books" && result.data} books={result.data} />

      <Login show={page === "login"} setToken={setToken} setPage={setPage} />

      <Recommend show={page === "recommend"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
