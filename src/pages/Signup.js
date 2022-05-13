import React from "react";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = React.useState("mikew");
  const [password, setPassword] = React.useState("password");

  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    post("/users/signup", {
      username: username,
      password: password,
    })
      .then((results) => {
        console.log("Results", results.data.token);
        localStorage.setItem("authToken", results.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log("Something went wrong", err.message);
      });
  };

  return (
    <div>
      <h1>This is Signup</h1>
      <form onSubmit={register}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="Submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
