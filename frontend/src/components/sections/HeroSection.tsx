import React from 'react';

const HeroSection: React.FC = () => (
  <section className="py-20 relative overflow-hidden">
    <div className="container mx-auto px-4 text-center relative z-10">
      <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
        Explore the <span className="text-blue-400">Universe</span> with SpaceX
      </h2>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
        Journey through SpaceX's cosmic achievements with real-time data and interstellar visualizations
      </p>
      <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1">
        Start Exploring
      </button>
    </div>
  </section>
);

export default HeroSection;
