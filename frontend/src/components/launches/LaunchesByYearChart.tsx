import React from 'react';
import { useLaunches } from '../../hooks/useLaunches';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { Launch } from '../../types/launch';

const LaunchesByYearChart: React.FC = () => {
  const { data: launches, isLoading, isError, error } = useLaunches();

  const chartData = React.useMemo(() => {
    if (!launches) return [];

    const launchesByYear = launches.reduce((acc: Record<string, number>, launch: Launch) => {
      const year = format(parseISO(launch.date_utc), 'yyyy');
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(launchesByYear)
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => a.year.localeCompare(b.year));
  }, [launches]);

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (isError)
    return <div className="text-red-500">Error: {error?.message}</div>;

  return (
    <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/40 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Launches by Year
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
            <XAxis
              dataKey="year"
              tick={{ fill: "#A0AEC0" }}
              label={{
                value: "Year",
                position: "bottom",
                fill: "#A0AEC0",
                offset: 0,
              }}
            />
            <YAxis
              tick={{ fill: "#A0AEC0" }}
              label={{
                value: "N° Launches",
                angle: -90,
                position: "left",
                fill: "#A0AEC0",
                offset: 15,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1A202C",
                border: "1px solid #2D3748",
                borderRadius: "8px",
              }}
              formatter={(value) => [value, "Launches"]}
            />
            <Bar
              dataKey="count"
              fill="rgba(66, 153, 225, 0.8)"
              radius={[4, 4, 0, 0]}
              name="Launches"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-space-gray text-sm mt-4">
        Historical distribution of launches per calendar year
      </p>
    </div>
  );
};

export default LaunchesByYearChart;
