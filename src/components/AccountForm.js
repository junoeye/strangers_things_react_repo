import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { callApi } from "../api";
import { Button } from "@material-ui/core";
import "./specificStyles.css";

const AccountForm = ({ action, setToken, setUserData }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = action === "login";
  const title = isLogin ? "Login" : "Register";
  const oppositeTitle = isLogin ? "Register" : "Login";
  const oppositeAction = isLogin ? "register" : "login";
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await callApi({
      url: `/users/${action}`,
      body: { user: { username, password } },
      method: "POST",
    });
    const token = data?.data?.token;
    // if there's data, tack on data prop. if data.data, tack on token prop

    if (token) {
      localStorage.setItem("token", token);
      setUsername("");
      setPassword("");
      setToken(token);
      history.push("/");
    }
  };
  return (
    <div className="form">
      <h2 className="formTitle">{title}</h2>          
      <form onSubmit={handleSubmit}>

        <div>
          <input
            className="inputUsername"
            type="text"
            placeholder="username"
            required
            onChange={(event) => setUsername(event.target.value)}
          ></input>
        </div>

        <div>
          <input
            className="inputPassword"
            type="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </div>       

        <div>
          <Button
            variant="contained"
            type="submit"
            style={{ display: "flex", alignItems: "center", marginTop: "15px", margin: "auto", backgroundColor: "blue", color: "white" }}
          >
            {title}
          </Button>
        </div>

      </form>
      <Link className="switchToLink" to={`/${oppositeAction}`}>
        {oppositeTitle}
      </Link>
    </div>
  );
};

export default AccountForm;