import { useEffect, useState } from 'react';
import { getUser, updateUser, deleteUser } from '../api/userApi'; // Adjust path as needed
import { localStorageConstants } from '../constants/localStorage.constant';
import { API_MESSAGES } from '../constants/errorMessages';
import { ROUTE_PATHS } from '../constants/apiEndpoints';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export const ProfilePage = () => {
  const userId = Number(sessionStorage.getItem(localStorageConstants.ACTIVE_ACCOUNT_ID));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await getUser(userId);
      setUser(response?.data || {});
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      await updateUser(userId, user);
      await fetchUser();
      toast.success('Profile updated successfully.');
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action is irreversible.');
    if (!confirmed) return;

    try {
      await deleteUser(userId);
      toast.success('Account deleted successfully.');
      sessionStorage.clear();
      setTimeout(() => {
        navigate(ROUTE_PATHS.LOGIN);
      }, 500);
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!user) return <p className="text-center text-red-600">No profile found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Your Profile</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="First Name"
          value={user.firstName || ''}
          onChange={e => setUser({ ...user, firstName: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={user.lastName || ''}
          onChange={e => setUser({ ...user, lastName: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="User Name"
          value={user.userName || ''}
          onChange={e => setUser({ ...user, userName: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={user.phoneNumber || ''}
          onChange={e => setUser({ ...user, phoneNumber: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <select
          value={user.gender || ''}
          onChange={e => setUser({ ...user, gender: e.target.value })}
          className="w-full p-2 border rounded">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Update Profile
        </button>

        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Delete Account
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
