import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
      <h1>Nav App Title</h1>
      <NavLink to="/" activeClassName="is-active" exact={true}>Homepage</NavLink>
      <NavLink to="/contact" activeClassName="is-active" >Contact</NavLink>
      <NavLink to="/add-todo" activeClassName="is-active" >Add Todo</NavLink>
    </header>
);

export default Header;