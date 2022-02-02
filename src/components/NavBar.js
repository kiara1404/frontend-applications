import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

function NavBar(){

return (
<div className="nav">
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/about">About</Link>
        </li>
    </ul>
</div>

)
}

export default NavBar;