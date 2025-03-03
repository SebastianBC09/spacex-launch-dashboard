import React from 'react';
import { useRockets } from '../../hooks/useRockets';
import RocketCard from './RocketCard';

const RocketGrid: React.FC = () => {
  const { data: rockets } = useRockets();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rockets?.map(rocket => (
        <RocketCard key={rocket.id} rocket={rocket} />
      ))}
    </div>
  );
};

export default RocketGrid;
