// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostView from './components/PostView';
import PostEdit from './components/PostEdit';
import Login from './components/login';
import NavBar from './components/NavBar';
import Home from './components/home';
import './App.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

export const NavLogin = (users,username,password) => {
  const navigate = useNavigate(); 
  
    navigate('/home');
      
}


const App = () => {

  return (
    <Router>
      <div>
        <NavBar />
      </div>
      <div className="app-container">
        <Routes>
          <Route path="/" exact element={
            <div>
              <PostForm />
              <PostList />
              <Login/>
            </div>
          } />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<PostForm />} />
          <Route path="/view/:postId" element={<PostView />} />
          <Route path="/edit/:postId" element={<PostEdit />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
