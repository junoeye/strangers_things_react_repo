import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./specificStyles.css";

const postMatches = (post, searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
  const {
    description,
    location,
    title,
    author: { username },
  } = post;

  const toMatch = [description, location, title, username];
  for (const field of toMatch) {
    if (field.toLowerCase().includes(searchTermLower)) {
      return true;
    }
  }
};

const Posts = ({ posts }) => {
  const history = useHistory();
  const [searchTerm, updateSearchTerm] = useState("");

  const postsToDisplay =
    searchTerm.length > 0
      ? posts.filter((post) => postMatches(post, searchTerm))
      : posts;

  return (
    <div className="postsBody">        
          <h2 className="postsHeading">Posts</h2>
          <input
            type="text"
            placeholder="Search for posts"
            style={{ padding: ".25em", marginBottom: ".25em", outline: "1px solid black"}}
            autoFocus="autoFocus"
            value={searchTerm}           
            onChange={(event) => {
              updateSearchTerm(event.target.value);
            }}
          />
      {postsToDisplay.length > 0 ? (
        postsToDisplay.map((post) => (
          <div
            key={post._id}
            style={{ borderTop: "1px solid black", padding: ".5em" }}
          >
            <h5>{post.title}</h5>
            <div>Posted by: {post.author.username}</div>
            <div>Description: {post.description} </div>
            <button
              className="viewPostsButton"
              onClick={() => {
                history.push(`/posts/${post._id}`);
              }}
            >
              View Post
            </button>
          </div>
        ))
      ) : (
        <h5> No posts to display</h5>
      )}
    </div>
  );
};

export default Posts;