import React from 'react';
import { Link } from 'react-router-dom';

const InternalLink = ({ to, children, ...props }) => {
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
};

export default InternalLink;
