import { useEffect, useState } from 'react';
import { getNotificationSettingsById, updateNotificationSettings } from '../api/notificationSettingsApi';
import { API_MESSAGES } from '../constants/errorMessages';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NotificationSettingUpdateModal = ({ notificationSettingId, onClose }) => {
  const [setting, setSetting] = useState(null);

  const fetchSetting = async () => {
    try {
      const response = await getNotificationSettingsById(notificationSettingId);
      setSetting(response.data);
    } catch {
      toast.error('Failed to fetch setting');
      onClose();
    }
  };

  useEffect(() => {
    fetchSetting();
  }, [notificationSettingId]);

  const handleUpdate = async () => {
    try {
      await updateNotificationSettings(notificationSettingId, setting);
      await fetchSetting();
      toast.success('Notification setting updated');
      onClose();
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  if (!setting) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Edit Notification Setting</h2>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={setting.receiveEmails}
            onChange={e => setSetting({ ...setting, receiveEmails: e.target.checked })}
          />
          Receive Email Notifications
        </label>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Update
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
