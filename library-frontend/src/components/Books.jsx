import { useState } from "react";
import { useQuery } from "@apollo/client/react";

import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [filter, setFilter] = useState(null);

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
    skip: !filter,
  });

  if (!props.show) {
    return null;
  }

  let books = [];

  if (filter && !result.loading) {
    books = result.data.allBooks;
  } else {
    books = props.books.allBooks;
  }

  const genres = [...new Set(props.books.allBooks.map((b) => b.genres).flat())];

  const handleFilter = (event) => {
    if (filter !== event.target.value) {
      setFilter(event.target.value);
    } else {
      setFilter(null);
    }
  };

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} value={g} onClick={handleFilter}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
