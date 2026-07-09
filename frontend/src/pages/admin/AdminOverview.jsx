import { useState, useEffect } from 'react';
import { admin } from '../../services/api';

function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    admin.stats().then(setStats).catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!stats) return <p className="text-gray-500">Loading...</p>;

  const cards = [
    { label: 'Total Users', value: stats.totalUsers },
    { label: 'Total Events', value: stats.totalEvents },
    { label: 'Total Providers', value: stats.totalProviders },
    { label: 'Total Bookings', value: stats.totalBookings },
  ];

  return (
    <div>
      <h2 className="text-4xl font-semibold text-gray-900 mb-8">Admin Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-customPurple">{c.value}</p>
            <p className="text-gray-500 text-sm mt-1">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOverview;
