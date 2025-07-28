import { useEffect, useState } from 'react';
import { getNotificationSettings } from '../api/notificationSettingsApi';
import { NotificationSettingAddModal } from '../components/NotificationSettingAddModal';
import { NotificationSettingUpdateModal } from '../components/NotificationSettingUpdateModal';
import { localStorageConstants } from '../constants/localStorage.constant';
import { API_MESSAGES } from '../constants/errorMessages';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserSettingsPage = () => {
  const userId = Number(sessionStorage.getItem(localStorageConstants.ACTIVE_ACCOUNT_ID));
  const [settings, setSettings] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editSettingId, setEditSettingId] = useState(null);

  const fetchSettings = async () => {
    try {
      const params = {
        filter: `userId eq ${userId}`,
      };
      const response = await getNotificationSettings(params);
      setSettings(response?.data || []);
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="min-h-screen px-6 py-6 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">User Notification Settings</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          ➕ Add Setting
        </button>
      </div>

      <div className="grid gap-4">
        {settings.length === 0 ? (
          <p className="text-gray-500">No notification settings found.</p>
        ) : (
          settings.map(setting => (
            <div key={setting.notificationSettingId} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <p className="text-gray-800 font-medium">📂 Category: {setting.category}</p>
                <p className="text-sm text-gray-600">📧 Receive Email: {setting.receiveEmails ? 'Yes' : 'No'}</p>
              </div>
              <button
                onClick={() => setEditSettingId(setting.notificationSettingId)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">
                View / Edit
              </button>
            </div>
          ))
        )}
      </div>

      {showAddModal && (
        <NotificationSettingAddModal
          userId={userId}
          onClose={() => {
            setShowAddModal(false);
            fetchSettings();
          }}
        />
      )}

      {editSettingId && (
        <NotificationSettingUpdateModal
          notificationSettingId={editSettingId}
          onClose={() => {
            setEditSettingId(null);
            fetchSettings();
          }}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
