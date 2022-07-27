import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

import Header from '../Header/Header';
import './MainHeader.scss';
import NavLinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';

const MainHeader = () => {
    return (
        <>

            <SideDrawer >
                <nav>
                    <NavLinks className='header__drawer-nav' />
                </nav>
            </SideDrawer>
            <Header>
                <Link to='/' className='header__link-logo'>
                    <h1 className='header__logo'>Ur<span className='header__container-icon'>
                        <FiHeart className='header__icon-logo' /></span>Places</h1>
                </Link>
                <button className='header__menu-button'>
                    <span />
                    <span />
                    <span />
                </button>
                <nav className='header__navigation-links'>
                    <NavLinks />
                </nav>
            </Header>
        </>
    );
};

export default MainHeader;