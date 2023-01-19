import React from 'react';
import { Link } from 'react-router-dom';

import './Button.scss';

const Button = ({
  href,
  size,
  inverse,
  danger,
  to,
  exact,
  type,
  onClick,
  disabled,
  children,
}) => {
  if (href) {
    return (
      <a
        className={`button__button-${size || 'default'} ${
          inverse && 'button__button-inverse'
        } ${danger && 'button__button-danger'}`}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        exact={exact}
        className={`button__button-${size || 'default'} ${
          inverse && 'button__button-inverse'
        } ${danger && 'button__button-danger'}`}
      >
        {children}
      </Link>
    );
  }
  return (
    // button for submit form
    <button
      className={`button__button-${size || 'default'} ${
        inverse && 'button__button-inverse'
      } ${danger && 'button__button-danger'}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

{
  /*||: 1st expression is always outputted. The 2nd expression only gets outputted if the 1st expression is falsy.  */
}
{
  /* &&: 1st expression is outputted if it's FALSY. The 2nd expression only get outputted if the 1st expression is truthy. */
}
