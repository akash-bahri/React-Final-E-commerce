// PostList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
//This hook provides a way for functional components to access the Redux store state.

const PostList = () => {
    /*
    The useSelector hook takes a single argument, which is a selector function. 
    This function receives the entire Redux store state as its parameter, 
    and you can then extract the specific data you need from the state.
    */
    const posts = useSelector((state) => state.posts.posts);
    const isLoggedInn = useSelector((state) => state.posts.isLoggedIn);


    return (
        <div>
            <h2>Post</h2>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>
                        <strong>{post.username}{isLoggedInn}?</strong> - {post.timestamp} {' '}<Link to={`/view/${index}`}>View</Link>{' '}
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default PostList;
