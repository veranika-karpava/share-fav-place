import React from 'react';

import './Footer.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon';


const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">
        Created with
        <span className="footer__container-heart-icon">
          <DynamicIcon name='FaHeart' className='footer__icon-heart' />
        </span>
        by Veranika Karpava © 2022{' '}
      </p>
    </footer>
  );
};

export default Footer;
