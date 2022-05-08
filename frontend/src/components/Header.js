import React from 'react';
import headerLogo from '../images/header-logo.svg';
import Navbar from '../components/NavBar';
import { Link } from 'react-router-dom';

function Header(props) {

  return (
    <header className="header section page__header">
      <Link to="/" className="">
        <img  className="logo"
              src={headerLogo}
              alt="логотип Mesto" />
      </Link>

      <Navbar 
        loggedIn={props.loggedIn}
        signOut={props.signOut} 
        userData={props.userData}
      />
    </header>
  );
}

export default Header;
