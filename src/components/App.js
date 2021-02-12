import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { AccountForm, Posts, Post } from '.';
import { callApi } from '../api';
import { NavBar } from './NavBar';


const fetchUserData = async (token) => {
    const { data } = await callApi({
        url: '/users/me',
        token,
    });

    return data;
};
const fetchPosts = async () => {
    const {
        data: { posts },
    } = await callApi({
        url: '/posts',
    });
    return posts;
};

const App = () => {
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        if (!token) {
            setToken(localStorage.getItem('token'));
            return;
        }
        const data = await fetchUserData(token);
        if (data && data.username) {
            setUserData(data);
        }
        const posts = await fetchPosts();
        setPosts(posts);
        console.log (posts)
    }, [token]);

    return (
        <>
            {/* <Route>
                <NavBar />
            </Route> */}
            <h1>Buy, Sell, Bye</h1>
            <Route exact path="/">
                {userData.username && <div>Hello, {userData.username}!</div>}
            </Route>
            <Route exact path="/posts">
                <Posts posts={posts} />
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
        </>
    );
};

export default App;