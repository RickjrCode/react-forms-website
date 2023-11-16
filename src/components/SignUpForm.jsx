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
      <div class="wrapper">
        <h2>Sign Up</h2>

        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit}>
          <i class="fa-solid fa-user"></i>
          <label>
            <div class="input-box">
              <input
                type="text"
                placeholder="username"
                minLength="8"
                value={username}
                onChange={(event) => {
                  console.log(event.target.value);
                  setUsername(event.target.value);
                }}
                id="user-name"
              />
            </div>
          </label>
          <br />
          <i class="fa-solid fa-lock"></i>
          <label>
            <div class="input-box">
              <input
                placeholder="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type="password"
                id="user-password"
              />
              <button type="submit">Submit</button>
            </div>
          </label>
          <br />
        </form>
      </div>
    </>
  );
}
