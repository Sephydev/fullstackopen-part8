import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [filter, setFilter] = useState(null);
  const [books, setBooks] = useState([]);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
  });

  let genres = [];

  const genresWithDuplicate = books.map((b) => b.genres);
  genres = [...new Set(genresWithDuplicate.flat())];

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

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
