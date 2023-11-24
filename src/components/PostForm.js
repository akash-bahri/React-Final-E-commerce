// PostForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost, register } from '../reducers/postReducer';

const initilizePost = {
	username: '',
	password: ''
};
const PostForm = () => {
	const [post, setPost] = useState(initilizePost);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		const newValue = (type === "checkbox" ? checked : value);
		setPost({
			...post,
			[name]: newValue,
		});

	}
	const handleAddPost = () => {
		if (post.username) {
			dispatch(addPost(post));
			setPost(initilizePost);
		}
	};
	const handleRegister = () => {
		if (post.username && post.password) {
			dispatch(register({username:post.username,password:post.password}));};
			setPost(initilizePost);
		}
	

	return (
		<div>
			<input
				type="text"
				name="username"
				placeholder="USERNAME"
				value={post.username}
				onChange={(e) => handleChange(e)}
			/>
			<input
				type="text"
				name="password"
				placeholder="PASSWORD"
				value={post.password}
				onChange={(e) => handleChange(e)}
			/>
			<button onClick={handleAddPost}>Add Post</button>
			<button onClick={handleRegister}>Register</button>
		</div>
	);
};

export default PostForm;
