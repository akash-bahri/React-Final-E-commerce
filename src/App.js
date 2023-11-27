// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import Login from './components/login';
import NavBar from './components/NavBar';
import Home from './components/home';
import Cart from './components/Cart';
import Orders from './components/Orders';
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
      <br/>
      <div className='banner'>
		<p >SHOPPING WEBSITE</p></div>
      <div className="app-container">
        <Routes>
          <Route path="/" exact element={
            <div>
              {/* <RegisterForm />
              <PostList /> */}
              <Login/>
            </div>
          } />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />


        </Routes>
      </div>
    </Router>
  );
};

export default App;
