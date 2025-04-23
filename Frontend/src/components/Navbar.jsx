import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/home">E-Shop</Link>
      <div className="ms-auto">
        <Link className="btn btn-outline-light me-2" to="/cart">Cart</Link>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </nav>  
  );
};

export default Navbar;
