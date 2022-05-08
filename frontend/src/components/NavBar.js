import React from 'react';
import {  Route, NavLink } from 'react-router-dom';

function NavBar(props) {

  return (
    <nav className="menu">
      {/* { props.loggedIn  ? <p>залогинены</p> : <p>не залогинены </p>} */}

      {props.loggedIn ? (
        <>
          <span>{props.userData.email}</span>
          <span>{props.userData.username}</span>
          <button onClick={props.signOut} className="menu__item menu__button">Выйти</button>
        </>
      ) : ( 
        <>
          <Route path="/sign-in">
            <NavLink to="/sign-up" activeClassName="menu__item_active" className="menu__item">Регистрация</NavLink>
          </Route>
          <Route path="/sign-up">
            <NavLink to="/sign-in" activeClassName="menu__item_active" className="menu__item">Авторизация</NavLink>
          </Route>
        </>
       )}
    </nav>
  );
}

export default NavBar;