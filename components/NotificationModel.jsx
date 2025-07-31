import { useState, useEffect } from 'react';
import { getNotification, updateNotification } from '../api/notificationApi';
import { toast, ToastContainer } from 'react-toastify';
import { API_MESSAGES } from '../constants/errorMessages';
import 'react-toastify/dist/ReactToastify.css';

export const NotificationModel = ({ isOpen, onClose, notificationId, setNotificationUpdated }) => {
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && notificationId) {
      const fetchNotification = async () => {
        try {
          const include = 'NewsArticle';
          setLoading(true);
          const response = await getNotification(notificationId, include);
          setNotification(response.data);
        } catch (err) {
          toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
        } finally {
          setLoading(false);
        }
      };
      fetchNotification();
    }
  }, [isOpen, notificationId]);

  if (!isOpen) return null;

  const fetchUpdatedNotification = async () => {
    const include = 'NewsArticle';
    const response = await getNotification(notificationId, include);
    setNotification(response.data);
  };

  const handleToggleRead = async () => {
    try {
      const newIsViewed = !notification.isViewed;
      const updatedNotification = {
        notificationId: notification.notificationId,
        isViewed: newIsViewed,
        userId: notification.userId,
        newsArticleId: notification.newsArticleId,
      };
      await updateNotification(notificationId, updatedNotification);
      await fetchUpdatedNotification();
      toast.success(notification.isViewed ? 'Marked as unread' : 'Marked as read');
      setNotificationUpdated(true);
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-lg font-bold">
          ✖
        </button>

        {loading ? (
          <p className="text-center">Loading notification...</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{notification.newsArticle?.newsTitle || 'Notification'}</h2>

            {notification.newsArticle?.imageUrl && (
              <img
                src={notification.newsArticle.imageUrl}
                alt={notification.newsArticle.newsTitle}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}

            <p className="text-gray-700 mb-4 whitespace-pre-wrap">
              {notification.newsArticle?.newsContent || 'No content available.'}
            </p>

            <div className="text-sm text-gray-600 mb-4">
              <span className="block">📂 Category: {notification.newsArticle?.category || 'N/A'}</span>
              <span className="block">
                🕒{' '}
                {notification.newsArticle?.createdDateTime
                  ? new Date(notification.newsArticle.createdDateTime).toLocaleString()
                  : 'N/A'}
              </span>
            </div>

            {notification.newsArticle?.newsSource && (
              <p className="italic text-sm mb-4">Source: {notification.newsArticle.newsSource}</p>
            )}

            {notification.newsArticle?.url && (
              <a
                href={notification.newsArticle.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline mb-4 block">
                Read full article →
              </a>
            )}

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleToggleRead}
                className={`px-4 py-2 rounded text-white transition ${
                  notification.isViewed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
                }`}>
                {notification.isViewed ? 'Mark as Unread' : 'Mark as Read'}
              </button>
            </div>
          </>
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};
