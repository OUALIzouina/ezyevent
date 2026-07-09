import { useState, useEffect } from 'react';
import { providers as providersApi, services as servicesApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Btn from '../../components/Btn';

function ServiceForm({ initial, onCancel, onSaved }) {
  const [formData, setFormData] = useState({
    serviceName: initial?.serviceName || '',
    category: initial?.category || '',
    description: initial?.description || '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (initial) {
        await servicesApi.update(initial.id, formData);
      } else {
        await servicesApi.create(formData);
      }
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-6 space-y-3">
      <input
        name="serviceName"
        placeholder="Service name (e.g. Wedding Photography)"
        value={formData.serviceName}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-lg p-3"
      />
      <input
        name="category"
        placeholder="Category (e.g. Photography)"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-lg p-3"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows={3}
        className="w-full border border-gray-300 rounded-lg p-3"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-3 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-500">Cancel</button>
        <Btn type="submit" text={submitting ? 'Saving...' : initial ? 'Save changes' : 'Add service'} variant="primary" />
      </div>
    </form>
  );
}

function MyServices() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [actionError, setActionError] = useState('');

  async function load() {
    try {
      const data = await providersApi.getProfile(user.id);
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [user.id]);

  async function handleDelete(serviceId) {
    setActionError('');
    try {
      await servicesApi.remove(serviceId);
      load();
    } catch (err) {
      setActionError(err.message);
    }
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-semibold text-gray-900">My Services</h2>
        {!showForm && !editingService && (
          <Btn text="+ Add Service" variant="primary" onClick={() => setShowForm(true)} />
        )}
      </div>

      {actionError && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 mb-4">
          {actionError}
        </div>
      )}

      {showForm && (
        <ServiceForm
          onCancel={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); load(); }}
        />
      )}

      {editingService && (
        <ServiceForm
          initial={editingService}
          onCancel={() => setEditingService(null)}
          onSaved={() => { setEditingService(null); load(); }}
        />
      )}

      {profile.services.length === 0 && !showForm ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center text-gray-500">
          No services listed yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-lg mb-1">{service.serviceName}</h3>
              <p className="text-sm text-indigo-600 mb-2">{service.category}</p>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              <div className="flex gap-3">
                <button onClick={() => setEditingService(service)} className="text-sm text-customPurple hover:underline">
                  Edit
                </button>
                <button onClick={() => handleDelete(service.id)} className="text-sm text-red-500 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyServices;
