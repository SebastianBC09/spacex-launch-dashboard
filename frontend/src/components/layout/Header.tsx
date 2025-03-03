import React from 'react';
import NavLink from '../ui/NavLink';

const Header: React.FC = () => (
  <header className="sticky top-0 z-10 backdrop-blur-md bg-black/30 border-b border-blue-500/20 shadow-lg shadow-blue-500/10">
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse opacity-50"></div>
            <img src="/api/placeholder/48/48" alt="SpaceX Logo" className="w-full h-full object-contain relative z-10" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            SpaceX Tracker
          </h1>
        </div>

        <nav className="hidden md:flex space-x-6">
          <NavLink to="/launches" label="Launches" />
          <NavLink to="/rockets" label="Rockets" />
          <NavLink to="/launchpads" label="Launchpads" />
        </nav>

        <button className="md:hidden text-white text-2xl">
          ☰
        </button>
      </div>
    </div>
  </header>
);

export default Header;
