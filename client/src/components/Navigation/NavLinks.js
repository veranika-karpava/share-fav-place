import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.scss';
import { AuthContext } from '../../helpers/contex/auth_context';

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className="header__nav-links">
      <li className="header__nav-item">
        <NavLink to="/" exact className="header__nav-link">
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li className="header__nav-item">
          <NavLink to={`/${auth.userId}/places`} className="header__nav-link">
            My Places
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li className="header__nav-item">
          <NavLink to="/places/new" className="header__nav-link">
            Add Place
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li className="header__nav-item">
          <NavLink to="/auth" className="header__nav-link">
            Log In
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li className="header__nav-item">
          <button onClick={auth.logout} className="header__logout">
            Log Out
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
