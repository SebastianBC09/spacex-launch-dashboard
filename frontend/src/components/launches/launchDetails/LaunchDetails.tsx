import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useLaunch } from '../../../hooks/useLaunches';
import Layout from '../../layout/Layout';

const LaunchDetails: FC = () => {
  const { id } = useParams();
  const { data: launch, isLoading, isError, error } = useLaunch(id!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message || 'Failed to load launch.'}</div>;
  }

  if (!launch) {
    return <div>Launch not found.</div>;
  }

  return (
    <Layout>
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Launch <span className="text-blue-400">Details</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Detailed information about the {launch.mission_name} mission.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="p-6 bg-gradient-to-br from-blue-600/20 to-blue-900/40 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group">
          <h2 className="text-2xl font-semibold mb-4 text-white">{launch.mission_name}</h2>
          <div className="bg-space-card rounded-xl p-4 border border-space-divider">
            <p className="text-space-gray text-sm">Date: {launch.date_utc}</p>
            <p className="text-space-gray text-sm">Status: {launch.status}</p>
            <p className="text-space-gray text-sm">Details: {launch.details || 'No details available.'}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LaunchDetails;
