import { useEffect, useState } from 'react';
import { getSavedArticles, deleteSavedArticle } from '../api/savedArticleApi';
import { localStorageConstants } from '../constants/localStorage.constant';
import { toast, ToastContainer } from 'react-toastify';
import { API_MESSAGES } from '../constants/errorMessages';
import 'react-toastify/dist/ReactToastify.css';

export const SavedArticlePage = () => {
  const activeAccountId = Number(sessionStorage.getItem(localStorageConstants.ACTIVE_ACCOUNT_ID));
  const [savedArticles, setSavedArticles] = useState([]);

  const fetchSavedArticles = async () => {
    const params = {
      filter: `userId eq ${activeAccountId}; isActive eq TRUE`,
      include: 'NewsArticle',
    };
    try {
      const response = await getSavedArticles(params);
      setSavedArticles(response?.data || []);
    } catch (err) {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    fetchSavedArticles();
  }, []);

  const handleRemoveArticle = async articleId => {
    try {
      await deleteSavedArticle(articleId);
      toast.success(API_MESSAGES.ARTICLE_REMOVED);
      setSavedArticles(prev => prev.filter(article => article.savedArticleId !== articleId));
    } catch (err) {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Saved Articles</h1>

      <div className="grid gap-6">
        {savedArticles.length === 0 ? (
          <p className="text-center text-gray-500">You have not saved any articles.</p>
        ) : (
          savedArticles.map(article => (
            <div key={article.savedArticleId} className="bg-white p-4 rounded shadow space-y-2">
              {article.newsArticle?.imageUrl && (
                <img
                  src={article.newsArticle.imageUrl}
                  alt={article.newsArticle.newsTitle}
                  className="w-full h-48 object-cover rounded"
                />
              )}

              <h2 className="text-xl font-semibold text-gray-800">{article.newsArticle.newsTitle}</h2>

              <p className="text-sm text-gray-600">
                {article.newsArticle.newsContent?.length > 150
                  ? `${article.newsArticle.newsContent.slice(0, 150)}...`
                  : article.newsArticle.newsContent}
              </p>

              <div className="flex flex-wrap justify-between text-xs text-gray-500">
                <span>🗂️ Category: {article.newsArticle.category}</span>
                <span>
                  📅{' '}
                  {article.newsArticle.createdDateTime
                    ? new Date(article.newsArticle.createdDateTime).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>

              {article.newsArticle.newsSource && (
                <div className="text-sm text-gray-500 italic">Source: {article.newsArticle.newsSource}</div>
              )}

              {article.newsArticle.url && (
                <a
                  href={article.newsArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 hover:underline text-sm font-medium">
                  Read full article →
                </a>
              )}

              <hr />
              <button
                onClick={() => handleRemoveArticle(article.savedArticleId)}
                className="mt-2 px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition">
                Remove from Saved
              </button>
            </div>
          ))
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
