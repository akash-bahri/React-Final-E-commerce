// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li >
          <Link className="navbar" to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
