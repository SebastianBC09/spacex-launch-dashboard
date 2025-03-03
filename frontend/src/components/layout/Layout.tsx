import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import StarryBackground from '../ui/StarryBackground';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="relative min-h-screen w-screen overflow-x-hidden text-white font-sans">
    <StarryBackground />
    <div className="relative z-10 flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  </div>
);

export default Layout;
