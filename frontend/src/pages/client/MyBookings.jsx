import { useState, useEffect } from 'react';
import { bookings as bookingsApi, providers as providersApi } from '../../services/api';

const STATUS_STYLES = {
  CONFIRMED: 'bg-green-100 text-green-700',
  PENDING: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-blue-100 text-blue-700',
  CANCELLED: 'bg-gray-100 text-gray-600',
};

function ContactReveal({ providerId }) {
  const [contact, setContact] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function reveal() {
    setLoading(true);
    setError('');
    try {
      const data = await providersApi.getContactDetails(providerId);
      setContact(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (contact) {
    return (
      <div className="text-sm text-gray-600 mt-2">
        📞 {contact.phone} · ✉️ {contact.email}
      </div>
    );
  }

  return (
    <div className="mt-2">
      <button onClick={reveal} className="text-sm text-customPurple hover:underline">
        {loading ? 'Loading...' : 'Show contact details'}
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function MyBookings() {
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

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const allBookings = eventsWithBookings.flatMap((e) =>
    e.bookings.map((b) => ({ ...b, eventTitle: e.title }))
  );

  return (
    <div>
      <h2 className="text-4xl font-semibold text-gray-900 mb-8">My Bookings</h2>

      {allBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center text-gray-500">
          No bookings yet.
        </div>
      ) : (
        <div className="space-y-4">
          {allBookings.map((b) => (
            <div key={b.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{b.service.serviceName}</h3>
                  <p className="text-sm text-gray-500">
                    {b.eventTitle} · {new Date(b.bookingDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Provider: {b.service.provider.user.firstName} {b.service.provider.user.lastName}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[b.status]}`}>
                  {b.status}
                </span>
              </div>

              <div className="mt-3 text-sm text-gray-600">
                Payment: <span className="font-medium">{b.paymentStatus}</span>
                {b.paymentAmount && ` · ${b.paymentAmount} DA`}
              </div>

              {/* Contact only unlocks once CONFIRMED — matches the backend guard exactly */}
              {b.status === 'CONFIRMED' ? (
                <ContactReveal providerId={b.service.providerId} />
              ) : (
                <p className="text-xs text-gray-400 mt-2">
                  Contact details unlock once this booking is confirmed.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
