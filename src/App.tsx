import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingScreen } from './components/common/LoadingScreen';
import { DemoBar } from './components/common/DemoBar';
import { ToastContainer } from './components/common/Toast';

// Public Landing
import { LandingPage } from './pages/LandingPage';

// Customer App
import { CustomerHomePage } from './pages/customer/CustomerHomePage';
import { CustomerOrdersPage } from './pages/customer/CustomerOrdersPage';
import { CustomerTrackingPage } from './pages/customer/CustomerTrackingPage';
import { CustomerProfilePage } from './pages/customer/CustomerProfilePage';

// Business Dashboard
import { OverviewPage } from './pages/dashboard/OverviewPage';
import { OrdersPage } from './pages/dashboard/OrdersPage';
import { CustomersPage } from './pages/dashboard/CustomersPage';
import { ServicesPage } from './pages/dashboard/ServicesPage';
import { OperationsPage } from './pages/dashboard/OperationsPage';
import { PaymentsPage } from './pages/dashboard/PaymentsPage';
import { AnalyticsPage } from './pages/dashboard/AnalyticsPage';
import { TeamPage } from './pages/dashboard/TeamPage';
import { BillingPage } from './pages/dashboard/BillingPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';

// Platform Admin
import { PlatformAdminPage } from './pages/platform/PlatformAdminPage';

// Architecture Showcase
import { ArchitecturePage } from './pages/architecture/ArchitecturePage';

export const App: React.FC = () => {
  const [hasLoaded, setHasLoaded] = useState(() => {
    // If user refreshes or navigates deep, check sessionStorage to only show initial loader once per session
    return sessionStorage.getItem('laundryos_loaded') === 'true';
  });

  const handleLoadingComplete = () => {
    setHasLoaded(true);
    sessionStorage.setItem('laundryos_loaded', 'true');
  };

  return (
    <div className="relative min-h-screen bg-background text-charcoal font-sans selection:bg-sage-200 selection:text-forest">
      {/* Branded Loading Screen (Initial Entry) */}
      {!hasLoaded && <LoadingScreen onComplete={handleLoadingComplete} minDurationMs={1600} />}

      {/* Discreet Demo Toolbar (Tenant Switcher, Shortcuts, Reset) */}
      <DemoBar />

      {/* Global Toast Notifications */}
      <ToastContainer />

      {/* Application Routing */}
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Customer Mobile App Routes */}
        <Route path="/app" element={<CustomerHomePage />} />
        <Route path="/app/orders" element={<CustomerOrdersPage />} />
        <Route path="/app/track/:id" element={<CustomerTrackingPage />} />
        <Route path="/app/profile" element={<CustomerProfilePage />} />

        {/* Laundromat Business Dashboard Routes */}
        <Route path="/dashboard" element={<OverviewPage />} />
        <Route path="/dashboard/orders" element={<OrdersPage />} />
        <Route path="/dashboard/customers" element={<CustomersPage />} />
        <Route path="/dashboard/services" element={<ServicesPage />} />
        <Route path="/dashboard/operations" element={<OperationsPage />} />
        <Route path="/dashboard/payments" element={<PaymentsPage />} />
        <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
        <Route path="/dashboard/team" element={<TeamPage />} />
        <Route path="/dashboard/billing" element={<BillingPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />

        {/* Platform Administration */}
        <Route path="/platform" element={<PlatformAdminPage />} />

        {/* Technical Architecture & Audit Showcase */}
        <Route path="/architecture" element={<ArchitecturePage />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
