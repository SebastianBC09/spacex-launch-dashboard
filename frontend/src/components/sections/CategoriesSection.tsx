import React from 'react';
import CategoryCard from '../ui/CategoryCard';

const CategoriesSection: React.FC = () => (
  <section className="py-16 px-4">
    <div className="container mx-auto grid md:grid-cols-3 gap-8 max-w-6xl">
      <CategoryCard
        id="launches"
        title="Launches"
        icon="🚀"
        description="Explore complete history of SpaceX missions, from the first Falcon 1 to the latest Starship tests."
        color="from-blue-600/20 to-blue-900/40"
        to="/launches"
        subtext="All historical launches"
      />

      <CategoryCard
        id="rockets"
        title="Rockets"
        icon="🛰️"
        description="Detailed specifications and evolution of SpaceX's revolutionary rocket technology."
        color="from-purple-600/20 to-purple-900/40"
        to="/rockets"
        subtext="Technical specifications"
      />

      <CategoryCard
        id="launchpads"
        title="Launchpads"
        icon="🌎"
        description="Interactive map of global launch facilities supporting SpaceX's growing mission cadence."
        color="from-teal-600/20 to-teal-900/40"
        to="/launchpads"
        subtext="Launch sites map"
      />
    </div>
  </section>
);

export default CategoriesSection;
