import React from 'react';
import Layout from '../components/layout/Layout';
import RocketGrid from '../components/rockets/RocketGrid';

const RocketsPage: React.FC = () => {
  return (
    <Layout>
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            SpaceX <span className="text-blue-400">Rockets</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Explore the powerful fleet of SpaceX rockets, from the iconic Falcon 9 to the revolutionary Starship.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <RocketGrid />
      </div>
    </Layout>
  );
};

export default RocketsPage;
