// PostForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost, login, register } from '../reducers/postReducer';
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
	
    useEffect(() => {
        console.log("UE:"+isLoggedIn)
		console.log("UE:USER:")
		user.map((post) => console.log(post));
        if (isLoggedIn=="true") {
          navigate('/home');	
        }
      }, [isLoggedIn,navigate]);

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
           dispatch(login({username:post.username,password:post.password}));
        	setPost(initilizePost);
		}
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
			<button onClick={handleLogin}>Login</button>
		</div>
	);
};
  
export default LoginForm;
