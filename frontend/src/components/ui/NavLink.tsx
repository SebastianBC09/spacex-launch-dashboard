import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label }) => (
  <Link
    to={to}
    className="text-gray-300 hover:text-white font-medium text-lg relative group"
  >
    {label}
    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
  </Link>
);

export default NavLink;
