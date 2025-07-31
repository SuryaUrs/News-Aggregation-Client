import { useState } from 'react';
import { updateUser } from '../api/userApi';
import { toast, ToastContainer } from 'react-toastify';
import { API_MESSAGES } from '../constants/errorMessages';
import 'react-toastify/dist/ReactToastify.css';

export const AdminUserModal = ({ user, onClose }) => {
  const [isActive, setIsActive] = useState(user.isActive);

  const handleToggleAccountStatus = async () => {
    try {
      const updatedUser = { ...user, isActive: !isActive };
      await updateUser(user.userId, updatedUser);
      toast.success(`User ${!isActive ? 'activated' : 'deactivated'} successfully.`);
      setIsActive(!isActive);
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">User Details</h2>

        <div className="space-y-1 text-sm text-gray-700">
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Username:</strong> {user.userName}</p>
          <p><strong>Phone:</strong> {user.phoneNumber || 'N/A'}</p>
          <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
          <p><strong>Status:</strong> {isActive ? 'Active' : 'Deactivated'}</p>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Close
          </button>
          <button
            onClick={handleToggleAccountStatus}
            className={`px-4 py-2 text-white rounded ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {isActive ? 'Deactivate' : 'Reactivate'}
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
