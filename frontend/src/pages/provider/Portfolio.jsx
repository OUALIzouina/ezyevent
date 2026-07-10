import { useState, useEffect, useRef ,useCallback} from 'react';
import { providers as providersApi, portfolios as portfoliosApi, getUploadUrl } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Btn from '../../components/Btn';

function PortfolioForm({ onCancel, onSaved }) {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await portfoliosApi.create(formData);
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
        name="title"
        placeholder="Title (e.g. Beach Wedding — July 2026)"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-lg p-3"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows={2}
        className="w-full border border-gray-300 rounded-lg p-3"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-3 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-500">Cancel</button>
        <Btn type="submit" text={submitting ? 'Saving...' : 'Create entry'} variant="primary" />
      </div>
    </form>
  );
}

function PortfolioCard({ portfolio, onChanged }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      await portfoliosApi.uploadImage(portfolio.id, file);
      onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = ''; // allow re-selecting the same file later
    }
  }

  async function handleDeleteImage(imageId) {
    try {
      await portfoliosApi.removeImage(imageId);
      onChanged();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeletePortfolio() {
    try {
      await portfoliosApi.remove(portfolio.id);
      onChanged();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="grid grid-cols-3 gap-1 p-1">
        {portfolio.images.map((img) => (
          <div key={img.id} className="relative group">
            <img src={getUploadUrl(img.imagePath)} alt={portfolio.title} className="w-full h-24 object-cover rounded" />
            <button
              onClick={() => handleDeleteImage(img.id)}
              className="absolute top-1 right-1 bg-black/60 text-white text-xs rounded-full w-5 h-5 opacity-0 group-hover:opacity-100"
            >
              ×
            </button>
          </div>
        ))}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 hover:border-customPurple hover:text-customPurple"
        >
          {uploading ? '...' : '+'}
        </button>
        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileSelect} className="hidden" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{portfolio.title}</h3>
        <p className="text-sm text-gray-500">{portfolio.description}</p>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        <button onClick={handleDeletePortfolio} className="text-xs text-red-500 hover:underline mt-2">
          Delete this portfolio entry
        </button>
      </div>
    </div>
  );
}

function Portfolio() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await providersApi.getProfile(user.id);
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    load();
  }, [load]);
  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-semibold text-gray-900">Portfolio</h2>
        {!showForm && <Btn text="+ Add Entry" variant="primary" onClick={() => setShowForm(true)} />}
      </div>

      {showForm && (
        <PortfolioForm onCancel={() => setShowForm(false)} onSaved={() => { setShowForm(false); load(); }} />
      )}

      {profile.portfolios.length === 0 && !showForm ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center text-gray-500">
          No portfolio items yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profile.portfolios.map((p) => (
            <PortfolioCard key={p.id} portfolio={p} onChanged={load} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Portfolio;
