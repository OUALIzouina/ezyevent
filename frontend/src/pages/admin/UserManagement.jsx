import { useState, useEffect } from 'react';
import { admin } from '../../services/api';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  async function load() {
    try {
      const data = await admin.users();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(userId) {
    setActionMsg('');
    try {
      await admin.deleteUser(userId);
      setUsers(users.filter((u) => u.id !== userId));
    } catch (err) {
      // Surfaces the backend's 409 message directly:
      // "Cannot delete a user with existing events or bookings..."
      setActionMsg(err.message);
    }
  }

  function roleOf(user) {
    if (user.adminProfile) return 'admin';
    if (user.providerProfile) return 'provider';
    return 'client';
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-4xl font-semibold text-gray-900 mb-8">Users</h2>

      {actionMsg && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 mb-4">
          {actionMsg}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg divide-y">
        {users.map((user) => (
          <div key={user.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-gray-500">{user.email} · {roleOf(user)}</p>
            </div>
            <button
              onClick={() => handleDelete(user.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserManagement;
