const Books = (props) => {
  if (!props.show) {
    return null;
  }

  const genres = [...new Set(props.books.allBooks.map((b) => b.genres).flat())];

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
          {props.books.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} value={g} onClick={props.handleFilter}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
