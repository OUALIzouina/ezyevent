import { useState, useEffect } from 'react';
import { admin } from '../../services/api';

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    admin.events().then(setEvents).catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-4xl font-semibold text-gray-900 mb-8">All Events</h2>
      <div className="bg-white rounded-xl shadow-lg divide-y">
        {events.map((event) => (
          <div key={event.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-gray-500">
                {new Date(event.date).toLocaleDateString()} · {event.location}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Client: {event.client?.user?.firstName} {event.client?.user?.lastName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminEvents;
