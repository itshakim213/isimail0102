import React from 'react';
import {Link} from 'react-router-dom';
import "../styles/Button.css";

function Button({btnLink, btnText, CustomClass}) {
  const customClasses = `button ${CustomClass}`;
  return (
    <Link to={btnLink} className={customClasses}>
      {btnText}
    </Link>
  )
}

export default Button;
