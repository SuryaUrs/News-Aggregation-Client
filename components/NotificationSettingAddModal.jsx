import { useState } from 'react';
import { saveNotificationSettings } from '../api/notificationSettingsApi';
import { Category } from '../constants/enums';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NotificationSettingAddModal = ({ userId, onClose }) => {
  const [category, setCategory] = useState('');
  const [receiveEmails, setReceiveEmails] = useState(false);

  const handleSave = async () => {
    try {
      await saveNotificationSettings({ userId, category, receiveEmails });
      toast.success('Notification setting added');
      onClose();
    } catch {
      toast.error('Failed to add setting');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Add Notification Setting</h2>

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded p-2">
          <option value="">Select Category</option>
          {Object.values(Category).map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={receiveEmails} onChange={e => setReceiveEmails(e.target.checked)} />
          Receive Email Notifications
        </label>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!category}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
            Save
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
