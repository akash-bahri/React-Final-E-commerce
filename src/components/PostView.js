import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const PostView = () => {
  const { postId } = useParams();

  const posts = useSelector((state) => state.posts.posts);
  const post = posts[postId];

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h2>View Post</h2>
      <strong> {post.data}</strong>
      <p> Updated On: {post.timestamp}</p>
      <Link to={`/edit/${postId}`}>Edit</Link>
    {'  '}
      <Link to="/">Back</Link>

    </div>
  );
};

export default PostView;
