import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.scss';
import { AuthContext } from '../../helpers/contex/auth_context';
import DynamicIcon from '../DynamicIcon/DynamicIcon';

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item">
        <NavLink to="/" exact className="header__nav-link" activeClassName="header__nav-link--active">
          <DynamicIcon name='AiOutlineHome' className='header__nav-icon' />
          <span className='header__nav-content'>Home</span>
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <>
          <li className="header__nav-item">
            <NavLink to={`/${auth.userId}/places`} className="header__nav-link" activeClassName="header__nav-link--active">
              <DynamicIcon name='AiOutlineGroup' className='header__nav-icon' />
              <span className='header__nav-content'>My Places</span>
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink to="/places/new" className="header__nav-link" activeClassName="header__nav-link--active">
              <DynamicIcon name='AiOutlineFileAdd' className='header__nav-icon' />
              <span className='header__nav-content'>Add Place</span>
            </NavLink>
          </li>
          <li className="header__nav-item">
            <button onClick={auth.logout} className="header__logout">
              <DynamicIcon name='RiLogoutBoxRLine' className='header__nav-icon' />
              <span className='header__nav-content'>Log Out</span>
            </button>
          </li>
        </>
      )}
      {!auth.isLoggedIn && (
        <li className="header__nav-item">
          <NavLink to="/auth" className="header__nav-link" activeClassName="header__nav-link--active">
            <DynamicIcon name='AiOutlineUser' className='header__nav-icon' />
            <span className='header__nav-content'>Log In</span>
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
