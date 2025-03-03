import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/HeroSection';
import CategoriesSection from '../components/sections/CategoriesSection';

const HomePage: React.FC = () => (
  <Layout>
    <HeroSection />
    <CategoriesSection />
  </Layout>
);

export default HomePage;
