import { useState, useEffect } from "react";

import { useQuery } from "@apollo/client/react";
import { ME, ALL_BOOKS } from "../queries";

const Recommend = ({ show }) => {
  const [userFavGenre, setUserFavGenre] = useState(null);
  const resultUser = useQuery(ME);
  const resultBooks = useQuery(ALL_BOOKS, {
    variables: { genre: userFavGenre },
  });

  let books = [];
  useEffect(() => {
    if (resultUser.data) {
      setUserFavGenre(resultUser.data.me.favoriteGenre);
    }
  }, [resultUser.data]);

  if (resultBooks.data) {
    books = resultBooks.data.allBooks;
  }

  if (!show) {
    return null;
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
