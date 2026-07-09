import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { events as eventsApi } from '../../services/api';
import Btn from '../../components/Btn';

function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', date: '', location: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await eventsApi.create(formData);
      navigate('/client-dashboard/events');
    } catch (err) {
      setError(err.message || 'Could not create event');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-4xl font-semibold text-gray-900 mb-8">Create an Event</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-5">
        <input
          name="title"
          placeholder="Event title (e.g. Sarah's Wedding)"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-3"
        />
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-3"
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-3"
        />

        {error && <div className="text-red-500">{error}</div>}

        <Btn type="submit" text={submitting ? 'Creating...' : 'Create Event'} variant="primary" />
      </form>
    </div>
  );
}

export default CreateEvent;
