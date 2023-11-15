import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const resp = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const info = await resp.json();
      console.log(info);
      setToken(info.token);

      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            minLength="8"
            value={username}
            onChange={(event) => {
              console.log(event.target.value);
              setUsername(event.target.value);
            }}
            id="user-name"
          />
        </label>
        <label>
          Password:
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            type="password"
            id="user-password"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
