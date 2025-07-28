import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { localStorageConstants } from '../constants/localStorage.constant';
import { getNotifications } from '../api/notificationApi';
import { NotificationModel } from '../components/NotificationModel';
import { API_MESSAGES } from '../constants/errorMessages';
import 'react-toastify/dist/ReactToastify.css';

export const NotificationsPage = () => {
  const userId = Number(sessionStorage.getItem(localStorageConstants.ACTIVE_ACCOUNT_ID));
  const [notifications, setNotifications] = useState([]);
  const [notificationUpdated, setNotificationUpdated] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNotifications = async () => {
    const params = {
      filter: `userId eq ${userId}`,
      include: 'NewsArticle,User',
    };
    try {
      const response = await getNotifications(params);
      setNotifications(response?.data || []);
    } catch (err) {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleViewNotification = id => {
    setSelectedNotificationId(id);
    setIsModalOpen(true);
  };

  const handleCloseModel = () => {
    setIsModalOpen(false);
    setSelectedNotificationId(null);
    if (notificationUpdated) {
      fetchNotifications();
      setNotificationUpdated(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Notifications</h1>

      <div className="grid gap-6">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500">No notifications found.</p>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.notificationId}
              className={`bg-white p-4 rounded shadow space-y-2 border-l-4 ${
                notification.isViewed ? 'border-yellow-500' : 'border-green-500'
              }`}>
              <h2 className="text-lg font-semibold text-gray-800">{notification.newsArticle?.newsTitle || 'Notification'}</h2>
              <p className="text-sm text-gray-700">{notification.newsArticle?.newsContent}</p>

              {notification.newsArticle?.newsTitle && (
                <a
                  href={notification.newsArticle?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline block">
                  Read related article: {notification.newsArticle?.newsTitle}
                </a>
              )}

              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  📅{' '}
                  {notification.newsArticle?.createdDateTime
                    ? new Date(notification.newsArticle?.createdDateTime).toLocaleString()
                    : 'N/A'}
                </span>

                <button
                  onClick={() => handleViewNotification(notification.notificationId)}
                  className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm">
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <NotificationModel isOpen={isModalOpen} onClose={handleCloseModel} notificationId={selectedNotificationId} setNotificationUpdated={setNotificationUpdated} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
