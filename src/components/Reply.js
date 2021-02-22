import React, { useState } from "react";
import { callApi } from "../api";

import { Button } from "@material-ui/core";
import "./specificStyles.css";

const Reply = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleReply = async (event) => {
    event.preventDefault();
    // const token = data?.data?.token;
    // if there's data, tack on data prop. if data.data tack on token prop
    const data = await callApi({
      url: `/posts`,
      body: { post: { title, description, price, location, deliver } },
      method: "POST",
      token: token,
    });

    const postSuccess = data?.success;
    if (postSuccess) {
      window.alert("Message sent!");
      history.push("/dashboard");
    } else {
      window.alert("Message wasn't successful");
    }
    // console.log("data", data)
  };

  return (
    <div className="messagesBody">
      <h2 className="messagesTitle">Reply Message</h2>
      <form onSubmit={handleReply}>
        <div>
          <div className="descriptionText" htmlFor="Description"></div>
          <textarea
            className="description"
            type="text"
            required
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>

        <div>
          <Button
            type="submit"
            style={{
              display: "flex",
              marginTop: "15px",
              marginLeft: "15px",
              backgroundColor: "blue",
              color: "white",
            }}
          >
            Reply
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Reply;