import { useState, useEffect } from 'react';
import { admin } from '../../services/api';

const STATUS_STYLES = {
  CONFIRMED: 'bg-green-100 text-green-700',
  PENDING: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-blue-100 text-blue-700',
  CANCELLED: 'bg-gray-100 text-gray-600',
};

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    admin.bookings().then(setBookings).catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-4xl font-semibold text-gray-900 mb-8">All Bookings</h2>
      <div className="bg-white rounded-xl shadow-lg divide-y">
        {bookings.map((b) => (
          <div key={b.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{b.event?.title} — {b.service?.serviceName}</p>
              <p className="text-sm text-gray-500">
                {new Date(b.bookingDate).toLocaleDateString()} · Payment: {b.paymentStatus}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[b.status]}`}>
              {b.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminBookings;
