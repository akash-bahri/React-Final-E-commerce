// PostForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost, register } from '../reducers/postReducer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const initilizePost = {
	username: '',
	password: ''
};
const RegisterForm = () => {
	const [post, setPost] = useState(initilizePost);
	const [status, setStatus] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const posts = useSelector((state) => state.posts.posts);	
	posts.map((post) => console.log(post));

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		const newValue = (type === "checkbox" ? checked : value);
		setPost({
			...post,
			[name]: newValue,
		});
	}
	const handleRegister = () => {
		if (post.username && post.password) {
			dispatch(register({username:post.username,password:post.password}));
			setStatus("REGISTERED SUCCESSFULLY");
			setTimeout(() => {  // Use setTimeout to allow time for the delete action to complete
				navigate('/');
			  }, 1000);
			
		}
		else setStatus("INCORRECT USERNAME OR PASSWORD");
		setTimeout(() => {  // Use setTimeout to allow time for the delete action to complete
			setStatus("");
		  }, 1000);
			setPost(initilizePost);
			
		}

	return (
		<div>
		<div className='status'><h3>{status}</h3></div>
		<div className='main'>
			<input
			className='input'
				type="text"
				name="username"
				placeholder="NEW USERNAME"
				value={post.username}
				onChange={(e) => handleChange(e)}
			/>
			<br/>
			<input
			className='input'
				type="text"
				name="password"
				placeholder="NEW PASSWORD"
				value={post.password}
				onChange={(e) => handleChange(e)}
			/>
			
		</div>
			<div className='main'>
			<button className='button' onClick={handleRegister}>Submit</button>
			
		
		
		</div>
		</div>
	);
};

export default RegisterForm;
