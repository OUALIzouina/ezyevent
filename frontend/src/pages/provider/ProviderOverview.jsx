import { useState, useEffect } from 'react';
import { bookings as bookingsApi } from '../../services/api';
import Btn from '../../components/Btn';

function BookingCard({ booking, onAction }) {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentFee, setPaymentFee] = useState('0');
  const [actionError, setActionError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handle(action, ...args) {
    setBusy(true);
    setActionError('');
    try {
      await action(booking.id, ...args);
      onAction();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold">{booking.event?.title}</h4>
          <p className="text-sm text-gray-500">
            {new Date(booking.bookingDate).toLocaleDateString()} ·{' '}
            {booking.startTime?.slice(11, 16)}–{booking.endTime?.slice(11, 16)}
          </p>
          <p className="text-sm text-gray-500">Service: {booking.service?.serviceName}</p>
        </div>
      </div>

      {actionError && <p className="text-red-500 text-sm mb-2">{actionError}</p>}

      {booking.status === 'PENDING' && (
        <div className="flex gap-3 mt-3">
          <Btn text="Accept" variant="primary" disabled={busy} onClick={() => handle(bookingsApi.accept)} />
          <Btn text="Decline" variant="outline" disabled={busy} onClick={() => handle(bookingsApi.decline)} />
        </div>
      )}

      {booking.status === 'CONFIRMED' && booking.paymentStatus === 'UNPAID' && (
        <div className="flex gap-3 mt-3 items-center">
          <input
            type="number"
            placeholder="Amount (DA)"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-32 text-sm"
          />
          <input
            type="number"
            placeholder="Fee %"
            value={paymentFee}
            onChange={(e) => setPaymentFee(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-24 text-sm"
          />
          <Btn
            text="Confirm payment"
            variant="primary"
            disabled={busy || !paymentAmount}
            onClick={() => handle(bookingsApi.confirmPayment, Number(paymentAmount), Number(paymentFee))}
          />
        </div>
      )}

      {booking.status === 'CONFIRMED' && booking.paymentStatus === 'PAID' && (
        <div className="mt-3">
          <Btn text="Mark as completed" variant="outline" disabled={busy} onClick={() => handle(bookingsApi.complete)} />
        </div>
      )}

      {booking.status === 'COMPLETED' && (
        <span className="inline-block mt-2 text-xs text-blue-600 font-medium">✔ Completed</span>
      )}
    </div>
  );
}

function ProviderOverview() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('pendingRequests');

  async function load() {
    try {
      const data = await bookingsApi.providerDashboard();
      setDashboard(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const TABS = [
    { key: 'pendingRequests', label: `Requests (${dashboard.pendingRequests.length})` },
    { key: 'toPay', label: `To Pay (${dashboard.toPay.length})` },
    { key: 'scheduled', label: `Scheduled (${dashboard.scheduled.length})` },
    { key: 'completed', label: `Completed (${dashboard.completed.length})` },
  ];

  const activeBookings = dashboard[tab];

  return (
    <div>
      <h2 className="text-4xl font-semibold text-gray-900 mb-8">Bookings</h2>

      <div className="flex gap-2 mb-6 border-b">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 font-medium ${
              tab === t.key ? 'border-b-2 border-customPurple text-customPurple' : 'text-gray-500'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center text-gray-500">
          Nothing here right now.
        </div>
      ) : (
        activeBookings.map((b) => <BookingCard key={b.id} booking={b} onAction={load} />)
      )}
    </div>
  );
}

export default ProviderOverview;
