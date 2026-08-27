import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { Layout } from './layouts/Layout';

// Pages
import { Home } from './pages/Home';
import { AIDiscovery } from './pages/AIDiscovery';
import { ResourceDetails } from './pages/ResourceDetails';
import { Dashboard } from './pages/Dashboard';

const Discover = () => <div className="p-8">Discover Page</div>;
const Admin = () => <div className="p-8">Admin Dashboard</div>;
const Impact = () => <div className="p-8">Campus Impact</div>;

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="discover" element={<Discover />} />
            <Route path="ai-discovery" element={<AIDiscovery />} />
            <Route path="resource/:id" element={<ResourceDetails />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin" element={<Admin />} />
            <Route path="impact" element={<Impact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
