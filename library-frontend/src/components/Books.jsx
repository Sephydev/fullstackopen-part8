import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [filter, setFilter] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  let books = [];
  let genres = [];

  if (result.data) {
    books = result.data.allBooks;
    const genresWithDuplicate = books.map((b) => b.genres);
    genres = [...new Set(genresWithDuplicate.flat())];
  }

  const handleFilter = (event) => {
    if (filter !== event.target.value) {
      setFilter(event.target.value);
      setFilteredBooks(
        books.filter((b) => b.genres.includes(event.target.value))
      );
    } else {
      setFilter(null);
      setFilteredBooks(books);
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
          {filteredBooks.map((a) => (
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
