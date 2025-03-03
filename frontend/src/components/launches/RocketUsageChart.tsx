import React from 'react';
import { useLaunches } from '../../hooks/useLaunches';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Launch } from '../../types/launch';
import useRocketStore from '../../store/rocketStore';
import { Rocket } from '../../types/rocket';

const RocketUsageChart: React.FC = () => {
  const { data: launches, isLoading, isError, error } = useLaunches();
  const rockets = useRocketStore(state => state.rockets);

  const chartData = React.useMemo(() => {
    if (!launches || !rockets) return [];

    const rocketUsage = launches.reduce((acc: Record<string, number>, launch: Launch) => {
      acc[launch.rocket_id] = (acc[launch.rocket_id] || 0) + 1;
      return acc;
    }, {});

    return Object.entries<number>(rocketUsage)
      .map(([rocketId, count]) => {
        const rocket: Rocket | undefined = rockets.find(r => r.id === rocketId);
        return {
          rocket: rocketId,
          name: rocket?.name || `Rocket ID: ${rocketId}`,
          count
        };
      })
      .sort((a, b) => b.count - a.count);
  }, [launches, rockets]);

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (isError) return <div className="text-red-500">Error: {error?.message}</div>;

  return (
    <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/40 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group p-6 h-auto">
      <h2 className="text-xl font-semibold mb-4 text-white">Rocket Usage</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
          >
            <YAxis
              type="category"
              dataKey="name"
              width={150}
              tick={{ fill: '#A0AEC0' }}
              axisLine={false}
            />
            <XAxis
              type="number"
              tick={{ fill: '#A0AEC0' }}
              label={{
                value: 'N° Launches',
                position: 'bottom',
                fill: '#A0AEC0',
                offset: 0
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A202C',
                border: '1px solid #2D3748',
                borderRadius: '8px'
              }}
              formatter={(value) => [value, 'Launches']}
            />
            <Bar
              dataKey="count"
              fill="#805AD5"
              radius={[0, 4, 4, 0]}
              name="Launches"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-space-gray text-sm mt-5">
        Frequency of use of each rocket model
      </p>
    </div>
  );
};

export default RocketUsageChart;
