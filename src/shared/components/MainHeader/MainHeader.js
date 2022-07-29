import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

import Header from '../Header/Header';
import './MainHeader.scss';
import NavLinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import BackDrop from '../BackDrop/BackDrop';

const MainHeader = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true)
    }

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false)
    }

    return (
        <React.Fragment>
            {drawerIsOpen && <BackDrop onClick={closeDrawerHandler} />}
            <SideDrawer show={drawerIsOpen}>
                <nav className='header__navigation-links-mobile'>
                    <NavLinks />
                </nav>
            </SideDrawer>
            <Header>
                <Link to='/' className='header__link-logo'>
                    <h1 className='header__logo'>Ur<span className='header__container-icon'>
                        <FiHeart className='header__icon-logo' /></span>Places</h1>
                </Link>
                {!drawerIsOpen && <button className='header__menu-button' onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>}
                <nav className='header__navigation-links'>
                    <NavLinks />
                </nav>
            </Header>
        </React.Fragment>
    );
};

export default MainHeader;