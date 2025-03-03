import React from 'react';
import Layout from '../layout/Layout';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Cargando datos...',
  fullScreen = false
}) => {
  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50'
    : 'bg-gradient-to-br from-blue-900 to-indigo-800 border border-white/10 rounded-2xl overflow-hidden p-8';

  return (
    <Layout>
      <div className={containerClass}>
        <div className="flex flex-col items-center text-center">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute top-0 w-16 h-16 rounded-full border-4 border-blue-200 border-opacity-20"></div>
            <div className="absolute top-0 w-16 h-16 rounded-full border-4 border-t-blue-500 animate-spin"></div>
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">{message}</h3>
          <p className="text-gray-300">Por favor espera un momento</p>
        </div>
      </div>
    </Layout>
  );
};

export default LoadingState;
