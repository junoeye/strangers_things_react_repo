import React from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from './';

import './specificStyles.css';

const Post = ({ posts }) => {
    const { postId } = useParams();
    const post = posts.find((post) => postId === post._id);

    // if (post === undefined) {
    //     return <Loading />        
    // }

    return (
        <div>
        { post ? ( 
        <div className="singlePost">
            {/* {postId !== undefined && <Post posts={posts} />} */}
            <h2>{post.title}</h2>
            <div>Posted by: {post.author.username}</div>
            <div>Description: {post.description} </div>
            <div>Price: {post.price}</div>
            <div>Location: {post.location}</div>
            <div>Delivers: {post.willDeliver ? 'Yes' : 'No'}</div>            
        </div>
        ) : <Loading />
        }
        </div>
    );
};

export default Post;