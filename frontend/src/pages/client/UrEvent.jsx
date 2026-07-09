import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { events as eventsApi } from '../../services/api';
import Btn from '../../components/Btn';

function UrEvent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await eventsApi.mine();
        setEvents(data);
      } catch (err) {
        setError(err.message || 'Could not load your events');
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-semibold text-gray-900">Your Events</h2>
        <Link to="create">
          <Btn text="+ New Event" variant="primary" className="text-lg" />
        </Link>
      </div>

      <div className="mb-8">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-3xl shadow-sm focus:ring-customPurple focus:border-customPurple"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔍</span>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center text-red-500">{error}</div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {events.length === 0 ? "You don't have an event yet" : 'No events match your search'}
          </h3>
          {events.length === 0 && (
            <>
              <p className="text-gray-500 mb-6">
                Go for it, even if you don't have all the details! You can edit your draft later.
              </p>
              <Link to="create">
                <Btn text="Add a new event" variant="outline" />
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
              <p className="text-gray-500 text-sm mb-1">{new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-500 text-sm">{event.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UrEvent;
