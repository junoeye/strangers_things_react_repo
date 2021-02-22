import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { AccountForm, Posts, Post, CreatePost, Dashboard, Reply} from ".";
import { callApi } from "../api";
import { NavBar } from ".";
import './specificStyles.css';

const fetchUserData = async (token) => {
  const { data } = await callApi({
    url: "/users/me",
    token,
  });

  return data;
};
const fetchPosts = async () => {
  const {
    data: { posts },
  } = await callApi({
    url: "/posts",
  });
  return posts;
};

const App = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const posts = await fetchPosts();
    setPosts(posts);

    if (!token) {
      setToken(localStorage.getItem("token"));
      return;
    }
    const data = await fetchUserData(token);
    if (data && data.username) {
      setUserData(data);
    }
  }, [token]);

  return (
    <div style={{width: "100vw"}}>
      <NavBar
        userData={userData}
        setToken={setToken}
        setUserData={setUserData}        
      />

    <Switch>
      <Route exact path="/">
        {userData.username && (
          <>
          <div className="helloUser"><h3>Hello, {userData.username}!</h3></div>
          </>
        )}
        <Posts posts={posts} /> {/* moved here to land on posts page */}
      </Route>
      
        <Route path="/dashboard">
          <Dashboard           
          token={token}
          userData={userData}
          />
        </Route>

        <Route path="/reply">
        <Reply token={token} />
      </Route>

      <Route  exact path="/posts/createpost">
        <CreatePost token={token} posts={posts} setPosts={setPosts} />
      </Route>

      <Route path="/posts/:postId">
        <Post posts={posts} />
      </Route>

      <Route path="/login">
        <AccountForm
          action="login"
          setToken={setToken}
          setUserData={setUserData}
        />
      </Route>

      <Route path="/register">
        <AccountForm
          action="register"
          setToken={setToken}
          setUserData={setUserData}
        />
      </Route>

      </Switch>
    </div>
  );
};

export default App;