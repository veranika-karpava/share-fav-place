import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { FiHeart } from 'react-icons/fi';

import './Header.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon';
import NavLinks from '../Navigation/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import BackDrop from '../BackDrop/BackDrop';

const Header = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  // event handler for opening navigation in mobile
  const openDrawerHandler = () => setDrawerIsOpen(true);

  // event handler for closing navigation in mobile
  const closeDrawerHandler = () => setDrawerIsOpen(false);

  return (
    <>
      {drawerIsOpen && (
        <BackDrop onClick={closeDrawerHandler} aria-hidden="true" />
      )}
      <SideDrawer show={drawerIsOpen}>
        <nav
          className="header__navigation-links-mobile"
          onClick={closeDrawerHandler}
          aria-hidden="true"
        >
          <NavLinks />
        </nav>
      </SideDrawer>
      <header className="header">
        <Link to="/" className="header__link-logo">
          <h1 className="header__logo">
            Ur
            <span className="header__container-icon">
              <DynamicIcon
                name='FiHeart'
                className='header__icon-logo' />
            </span>
            Places
          </h1>
        </Link>
        {!drawerIsOpen && (
          <button
            className="header__menu-button"
            value="Menu Button"
            onClick={openDrawerHandler}
            aria-hidden="true"
          >
            <DynamicIcon
              name='CgMenu'
              className='header__icon-menu' />
          </button>
        )}
        <nav className="header__navigation-links">
          <NavLinks />
        </nav>
      </header>
    </>
  );
};

export default Header;
