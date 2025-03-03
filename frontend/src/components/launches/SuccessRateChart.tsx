/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import { useLaunches } from '../../hooks/useLaunches';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

interface DataItem {
  name: string;
  value: number;
  color: string;
}

const SuccessRateChart: React.FC = () => {
  const { data: launches, isLoading, isError, error } = useLaunches();
  const [activeIndex, setActiveIndex] = useState(0);

  const data = useMemo<DataItem[] | undefined>(() => {
    if (!launches) return undefined;

    const successCount = launches.filter(launch => launch.status === 'success').length;
    const failureCount = launches.length - successCount;

    return [
      { name: 'Success', value: successCount, color: '#63B3ED' },
      { name: 'Failure', value: failureCount, color: '#E53E3E' },
    ];
  }, [launches]);

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx && cy && outerRadius ? cx + (outerRadius + 10) * cos : 0;
    const sy = cx && cy && outerRadius ? cy + (outerRadius + 10) * sin : 0;
    const mx = cx && cy && outerRadius ? cx + (outerRadius + 30) * cos : 0;
    const my = cx && cy && outerRadius ? cy + (outerRadius + 30) * sin : 0;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx || 0} y={cy || 0} dy={8} textAnchor="middle" fill="#ffffff">
          {payload?.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius && outerRadius + 6}
          outerRadius={outerRadius && outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#ffffff">{`${value} Launches`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#A0AEC0">
          {`(${(percent && (percent * 100).toFixed(2)) || 0}%)`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (isError) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/40 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Success Rate</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Legend />
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {data && data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SuccessRateChart;
