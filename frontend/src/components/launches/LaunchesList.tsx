import React, { useState } from 'react';
import { useLaunches } from '../../hooks/useLaunches';
import { Link } from 'react-router-dom';

const LaunchesList: React.FC = () => {
  const { data: launches, isLoading, isError, error } = useLaunches();
  const [page, setPage] = useState(1);
  const launchesPerPage = 10;
  const [filterId, setFilterId] = useState('');

  const filteredLaunches = launches?.filter(launch =>
    launch.id.includes(filterId)
  );

  const paginatedLaunches = filteredLaunches?.slice(
    (page - 1) * launchesPerPage,
    page * launchesPerPage
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="mt-12 p-6 bg-gradient-to-br from-blue-600/20 to-blue-900/40 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group">
      <h2 className="text-2xl font-semibold mb-4 text-white">Launches List</h2>

      <input
        type="text"
        placeholder="Filter by ID"
        value={filterId}
        onChange={e => setFilterId(e.target.value)}
        className="border rounded p-2 mb-4 w-full bg-space-card text-white"
      />

      <ul className="space-y-4">
        {paginatedLaunches?.map(launch => (
          <li key={launch.id} className="bg-space-card rounded-xl p-4 border border-space-divider">
            <Link to={`/launches/${launch.id}`} className="block">
              <h3 className="text-lg font-semibold text-white">{launch.mission_name}</h3>
              <p className="text-space-gray text-sm">{launch.date_utc}</p>
              <p className="text-space-gray text-sm">Status: {launch.status}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 text-gray-800 p-2 rounded-full hover:bg-white/90 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(prev => prev + 1)}
          disabled={!filteredLaunches || page * launchesPerPage >= filteredLaunches.length}
          className="bg-blue-500 text-gray-800 p-2 rounded-full hover:bg-white/90 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LaunchesList;
