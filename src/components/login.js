// PostForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { load, login, loadstate,loadOrders } from '../reducers/postReducer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const initilizePost = {
	username: '',
	password: ''
};

const LoginForm = () => {
	//const posts = useSelector((state) => state.posts.posts);
	const [post, setPost] = useState(initilizePost);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state) => state.posts.isLoggedIn);
	const user = useSelector((state) => state.posts.posts);
	const [logon, setLogon] = useState("");
	useEffect(() => {

		dispatch(load());
		dispatch(loadOrders());
		dispatch(loadstate());
	}, []);
	useEffect(() => {
		if (isLoggedIn == "true") {
			navigate('/home');

		}
	}, [isLoggedIn]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		const newValue = (type === "checkbox" ? checked : value);
		setPost({
			...post,
			[name]: newValue,
		});

	}

	const handleLogin = () => {


		if (post.username && post.password) {
			dispatch(login({ username: post.username, password: post.password }));
			setPost(initilizePost);
		}
		setLogon("INCORRECT USERNAME OR PASSWORD");
	}

	

	return (
		
		<div className='login'>
			
		<div>
			
			<div  className='main'> <input
				type="text"
				className='input'
				name="username"
				placeholder="USERNAME"
				value={post.username}
				onChange={(e) => handleChange(e)}
			/>
			<input
				type="password"
				className='input'
				name="password"
				placeholder="PASSWORD"
				value={post.password}
				onChange={(e) => handleChange(e)}
			/>
			</div>
			</div>
			<div className='main buttons'>
			<br />
			<button className='button' onClick={handleLogin}>Login</button>
			</div>
			<div className='main'>
			<button className='registerbutton' onClick={() => navigate('/register')}>Create New Account</button>
			
			</div>
			<div className='main'>
				<p style={{ color: 'red', fontWeigh: 'bold' }}>{logon}</p>
			</div>
		
		</div>

	);
};

export default LoginForm;
