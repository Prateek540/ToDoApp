import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const Login = (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      alert("Email or password is empty");
      return;
    }
    const data = {
      email,
      password,
    };
    axios
      .post("http://localhost:8000/api/auth/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        setUserInfo(response.data);
        navigate("/main");
      })
      .catch((error) => {
        alert("Error Occured");
      });
  };

  return (
    <>
      <div className="FormContainer">
        <h3>Log in</h3>
        <form onSubmit={Login}>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Auth;
