import React from 'react';
import { Rocket } from '../../types/rocket';
import ImageCarousel from './ImageCarousel';
import AnimatedMetric from './AnimatedMetric';

interface RocketCardProps {
  rocket: Rocket;
}

const RocketCard: React.FC<RocketCardProps> = ({ rocket }) => {
  return (
    <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/20 rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="h-64 relative">
        <ImageCarousel images={rocket.flickr_images} />
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-white">{rocket.name}</h2>
        <p className="text-gray-300 mb-4">{rocket.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-gray-400">First Flight</p>
            <p className="text-white">{rocket.first_flight}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400">Success Rate</p>
            <p className="text-white">{rocket.success_rate_pct}%</p>
          </div>
          <AnimatedMetric value={rocket.cost_per_launch} label="Cost per Launch" />
          <div className="space-y-1">
            <p className="text-gray-400">Type</p>
            <p className="text-white">{rocket.type}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400">Height</p>
            <p className="text-white">{rocket.height_m} m</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400">Diameter</p>
            <p className="text-white">{rocket.diameter_m} m</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400">Mass</p>
            <p className="text-white">{rocket.mass_kg} kg</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400">Engines</p>
            <p className="text-white">{rocket.engines_type}</p>
          </div>
          <a
            href={rocket.wikipedia}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Wikipedia
          </a>
        </div>
      </div>
    </div>
  );
};

export default RocketCard;
