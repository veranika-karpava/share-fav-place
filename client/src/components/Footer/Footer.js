import React from 'react';
import { FaHeart } from 'react-icons/fa';

import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">
        Created with
        <span className="footer__container-heart-icon">
          <FaHeart className="footer__icon-heart" />
        </span>
        by Veranika Karpava © 2022{' '}
      </p>
    </footer>
  );
};

export default Footer;
