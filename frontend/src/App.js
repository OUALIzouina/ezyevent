import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import "@fortawesome/fontawesome-free/css/all.min.css";

import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layout/MainLayout'
import LogIn from './pages/auth/LogIn';
import Register from './pages/auth/Register';
import RegisterClient from './pages/auth/RegisterClient';
import RegisterProvider from './pages/auth/RegisterProvider';

import ClientLayout from './pages/client/ClientLayout';
import ClientOverview from './pages/client/ClientOverview';
import UrEvent from './pages/client/UrEvent';
import CreateEvent from './pages/client/CreateEvent';
import BrowseProviders from './pages/client/BrowseProviders';
import MyBookings from './pages/client/MyBookings';
import ProviderProfileView from './pages/client/ProviderProfileView';


import ProviderLayout from './pages/provider/ProviderLayout';
import ProviderOverview from './pages/provider/ProviderOverview';
import MyServices from './pages/provider/MyServices';
import Portfolio from './pages/provider/Portfolio';
import ProviderAccount from './pages/provider/ProviderAccount';

import AdminLayout from './pages/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import UserManagement from './pages/admin/UserManagement';
import AdminEvents from './pages/admin/AdminEvents';
import AdminBookings from './pages/admin/AdminBookings';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<MainLayout/>} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/client" element={<RegisterClient />} />
          <Route path="/register/provider" element={<RegisterProvider />} />

          {/* Client */}
          <Route element={<ProtectedRoute role="client" />}>
            <Route path="/client-dashboard" element={<ClientLayout />}>
              <Route index element={<ClientOverview />} />
              <Route path="events" element={<UrEvent />} />
              <Route path="events/create" element={<CreateEvent />} />
              <Route path="providers" element={<BrowseProviders />} />
              <Route path="providers/:providerId" element={<ProviderProfileView />} />

              <Route path="bookings" element={<MyBookings />} />
            </Route>
          </Route>

          {/* Provider */}
          <Route element={<ProtectedRoute role="provider" />}>
            <Route path="/provider-dashboard" element={<ProviderLayout />}>
              <Route index element={<ProviderOverview />} />
              <Route path="services" element={<MyServices />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="account" element={<ProviderAccount />} />
            </Route>
          </Route>

          {/* Admin */}
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin-dashboard" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="bookings" element={<AdminBookings />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
