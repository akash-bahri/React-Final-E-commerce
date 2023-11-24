import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { editPost } from '../reducers/postReducer';

import { useParams , useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';



const PostEdit = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts.posts);
  const post = posts[postId];

  const [currentPost, setCurrentPost] = useState({
    data: post.data,
    timestamp: post.timestamp,
    post_id:postId
  });

  if (!post) {
    return <div>Post not found</div>;
  }

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		const newValue = (type === "checkbox" ? checked : value);
		setCurrentPost({
			...currentPost,
			[name]: newValue,
			timestamp: new Date().toLocaleString()
		});

	}

  const handleEditPost = () => {
		if (currentPost.data) {
			dispatch(editPost(currentPost));
      navigate(`/view/${postId}`);
		}
	};

  return (
    <div>
      <h2>Edit Post</h2>
      <p> Data: <input
				type="text"
				name="data"
				value={currentPost.data}
				onChange={(e) => handleChange(e)}
			/></p>
      <p> Updated On: {post.timestamp}</p>
      <button onClick={handleEditPost}>Edit  Post</button>
      {' '}<Link to="/">Back</Link>
    </div>
  );
};

export default PostEdit;
