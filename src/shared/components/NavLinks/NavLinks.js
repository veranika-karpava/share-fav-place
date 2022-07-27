import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.scss'

const NavLinks = () => {
    return (
        <ul className='header__nav-links'>
            <li className='header__nav-item'>
                <NavLink to='/' exact className='header__nav-link'>All Users</NavLink>
            </li>
            <li className='header__nav-item'>
                <NavLink to='/u1/places' className='header__nav-link'>My Places</NavLink>
            </li>
            <li className='header__nav-item'>
                <NavLink to='/places/new' className='header__nav-link'>Add Place</NavLink>
            </li>
            <li className='header__nav-item'>
                <NavLink to='/auth' className='header__nav-link'>Log In</NavLink>
            </li>
        </ul>
    );
};

export default NavLinks;