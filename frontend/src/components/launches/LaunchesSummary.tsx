import React from 'react';
import LaunchesByYearChart from './LaunchesByYearChart';
import SuccessRateChart from './SuccessRateChart';
import RocketUsageChart from './RocketUsageChart';

const LaunchesSummary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <LaunchesByYearChart />
      <SuccessRateChart />
      <RocketUsageChart />
    </div>
  );
};

export default LaunchesSummary;
