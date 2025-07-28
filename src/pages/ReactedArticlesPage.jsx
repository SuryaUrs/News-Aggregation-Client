import { useEffect, useState } from 'react';
import { getReactedArticles, updateReactedArticle } from '../api/reactedArticleApi';
import { localStorageConstants } from '../constants/localStorage.constant';
import { toast, ToastContainer } from 'react-toastify';
import { API_MESSAGES } from '../constants/errorMessages';
import { ReactionType } from '../constants/enums';
import 'react-toastify/dist/ReactToastify.css';

export const ReactedArticlesPage = () => {
  const activeAccountId = Number(sessionStorage.getItem(localStorageConstants.ACTIVE_ACCOUNT_ID));
  const [reactedArticles, setReactedArticles] = useState([]);

  const fetchReactedArticles = async () => {
    const params = {
      filter: `userId eq ${activeAccountId}; isActive eq TRUE`,
      include: 'NewsArticle',
    };
    try {
      const response = await getReactedArticles(params);
      setReactedArticles(response?.data || []);
    } catch (err) {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    fetchReactedArticles();
  }, []);

  const handleRemoveReaction = async article => {
    try {
      await updateReactedArticle(article.reactionId, { isActive: false });
      await fetchReactedArticles();
      toast.success(API_MESSAGES.ARTICLE_REMOVED);
    } catch (err) {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Reacted Articles</h1>

      <div className="grid gap-6">
        {reactedArticles.length === 0 ? (
          <p className="text-center text-gray-500">You have not reacted to any articles.</p>
        ) : (
          reactedArticles.map(article => (
            <div key={article.reactedArticleId} className="bg-white p-4 rounded shadow space-y-2">
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
                onClick={() => handleRemoveReaction(article)}
                className={`mt-2 px-4 py-1 text-white text-sm rounded transition ${
                  article.reactionType === ReactionType.Like ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                }`}>
                {article.reactionType === ReactionType.Like ? 'Remove from Likes' : 'Remove from Dislikes'}
              </button>
            </div>
          ))
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
