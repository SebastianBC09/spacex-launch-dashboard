import React from 'react';
import Layout from '../layout/Layout';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Error',
  message,
  onRetry
}) => {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-red-900 to-red-800 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-5xl">⚠️</span>
            {onRetry && (
              <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer" onClick={onRetry}>
                <span className="text-white text-xl">↻</span>
              </div>
            )}
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
          <p className="text-gray-300 mb-6">{message}</p>
          {onRetry && (
            <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Intentar nuevamente
            </button>
          )}
        </div>
      </div>
  </Layout>
  );
};

export default ErrorState;
