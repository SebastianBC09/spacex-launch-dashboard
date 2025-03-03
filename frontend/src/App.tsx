import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useRockets } from './hooks/useRockets';
import useRocketStore from './store/rocketStore';
import LoadingState from './components/ui/LoadingState';
import ErrorState from './components/ui/ErrorState';

const HomePage = lazy(() => import('./pages/HomePage'));
const LaunchesPage = lazy(() => import('./pages/LaunchesPage'));
const RocketsPage = lazy(() => import('./pages/RocketsPage'));
const LaunchpadsPage = lazy(() => import('./pages/Launchpads'));
const LaunchDetails = lazy(() => import('./components/launches/launchDetails/LaunchDetails'));

const App: React.FC = () => {
    const { data: rockets, error, refetch } = useRockets();
    const { setRockets } = useRocketStore();

    useEffect(() => {
        if (rockets && rockets.length > 0) {
            setRockets(rockets);
        }
    }, [rockets, setRockets]);

    if (error) return (
        <ErrorState
            title="Conexion error"
            message={`We were unable to load store data: ${(error as Error).message}`}
            onRetry={() => refetch()}
        />
    );

    return (
        <Router>
            <Suspense fallback={<LoadingState message="Loading..." />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/launches" element={<LaunchesPage />} />
                        <Route path="/rockets" element={<RocketsPage />} />
                        <Route path="/launchpads" element={<LaunchpadsPage />} />
                        <Route path="/launches/:id" element={<LaunchDetails />} />
                    </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
