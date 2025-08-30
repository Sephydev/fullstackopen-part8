import { useQuery } from "@apollo/client/react";
import { ME, ALL_BOOKS } from "../queries";

const Recommend = ({ show }) => {
  const resultUser = useQuery(ME);
  const resultBooks = useQuery(ALL_BOOKS, {
    variables: { genre: resultUser.data.me.favoriteGenre },
  });

  if (!show) {
    return null;
  }

  let books = [];

  if (resultUser.data && resultBooks.data) {
    books = resultBooks.data.allBooks;
  }

  return (
    <>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Recommend;
