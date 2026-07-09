import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookings as bookingsApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Btn from '../../components/Btn';

function ClientOverview() {
  const { user } = useAuth();
  const [eventsWithBookings, setEventsWithBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await bookingsApi.clientDashboard();
        setEventsWithBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="text-gray-500">Loading your dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const allBookings = eventsWithBookings.flatMap((e) =>
    e.bookings.map((b) => ({ ...b, eventTitle: e.title, eventDate: e.date }))
  );
  const pending = allBookings.filter((b) => b.status === 'PENDING');
  const upcoming = eventsWithBookings
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  const eventsWithNoBookings = eventsWithBookings.filter((e) => e.bookings.length === 0);

  if (eventsWithBookings.length === 0) {
    return (
      <div>
        <h2 className="text-4xl font-semibold text-gray-900 mb-8">
          Welcome, {user?.firstName}
        </h2>
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Let's plan your first event</h3>
          <p className="text-gray-500 mb-6">
            Create an event, then browse providers to start booking services for it.
          </p>
          <Link to="/client-dashboard/events/create">
            <Btn text="Create your first event" variant="outline" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-semibold text-gray-900 mb-8">
        Welcome back, {user?.firstName}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-500 text-sm mb-1">Total events</p>
          <p className="text-3xl font-bold">{eventsWithBookings.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-500 text-sm mb-1">Pending requests</p>
          <p className="text-3xl font-bold text-yellow-600">{pending.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-500 text-sm mb-1">Next event</p>
          <p className="text-lg font-semibold">
            {upcoming ? `${upcoming.title} — ${new Date(upcoming.date).toLocaleDateString()}` : '—'}
          </p>
        </div>
      </div>

      {eventsWithNoBookings.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8 flex justify-between items-center">
          <p className="text-indigo-800">
            You have {eventsWithNoBookings.length} event(s) with no providers booked yet.
          </p>
          <Link to="/client-dashboard/providers">
            <Btn text="Find providers" variant="primary" />
          </Link>
        </div>
      )}

      <h3 className="text-2xl font-semibold mb-4">Recent booking activity</h3>
      <div className="bg-white rounded-xl shadow-lg divide-y">
        {allBookings.length === 0 ? (
          <p className="p-6 text-gray-500">No bookings yet — browse providers to get started.</p>
        ) : (
          allBookings.slice(0, 5).map((b) => (
            <div key={b.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{b.eventTitle}</p>
                <p className="text-sm text-gray-500">
                  {new Date(b.bookingDate).toLocaleDateString()} · {b.startTime?.slice(11, 16)}–{b.endTime?.slice(11, 16)}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  b.status === 'CONFIRMED' ? 'bg-green-100 text-green-700'
                  : b.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700'
                  : b.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600'
                }`}
              >
                {b.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ClientOverview;
