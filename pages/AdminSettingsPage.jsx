import { useEffect, useState } from 'react';
import { getAllUsers } from '../api/userApi';
import { toast, ToastContainer } from 'react-toastify';
import { API_MESSAGES } from '../constants/errorMessages';
import { AdminUserModal } from '../components/AdminUserModal';
import 'react-toastify/dist/ReactToastify.css';

export const AdminSettingsPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const params = {
        filter: `Role eq User`,
      };
      const response = await getAllUsers(params);
      setUsers(response?.data || []);
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => user.firstName?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Settings</h1>

      <div className="max-w-md mx-auto mb-4">
        <input
          type="text"
          placeholder="Search by First Name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="grid gap-4 max-w-3xl mx-auto">
        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-600">No deactivated users found.</p>
        ) : (
          filteredUsers.map(user => (
            <div key={user.userId} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-600">Username: {user.userName}</p>
              </div>
              <button
                onClick={() => setSelectedUser(user)}
                className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                View
              </button>
            </div>
          ))
        )}
      </div>

      {selectedUser && (
        <AdminUserModal
          user={selectedUser}
          onClose={() => {
            setSelectedUser(null);
            fetchUsers();
          }}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
