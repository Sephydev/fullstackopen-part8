import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../queries";

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      setPage("authors");
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]);

  const submit = (event) => {
    event.preventDefault();

    login({ variables: { username, password } });

    setUsername("");
    setPassword("");
  };

  if (!show) {
    return null;
  }

  return (
    <form onSubmit={submit}>
      <div>
        Username:
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
