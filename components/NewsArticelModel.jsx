import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { saveArticle } from '../api/savedArticleApi';
import { saveReactedArticle, updateReactedArticle, getReactedArticles } from '../api/reactedArticleApi';
import { getNewsArticleById } from '../api/newsArticleApi';
import { reportArticle } from '../api/reportedArticlesApi';
import { ReactionType } from '../constants/enums';
import { API_MESSAGES } from '../constants/errorMessages';
import { localStorageConstants } from '../constants/localStorage.constant';
import 'react-toastify/dist/ReactToastify.css';

export const NewsArticleModel = ({ articleId, onClose }) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const activeAccountId = Number(sessionStorage.getItem(localStorageConstants.ACTIVE_ACCOUNT_ID));

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const include = 'SavedArticles,ReactedArticles,ReportedArticles';
        setLoading(true);
        const response = await getNewsArticleById(articleId, include);
        setArticle(response?.data);
      } catch {
        toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
        onClose();
      } finally {
        setLoading(false);
      }
    };

    if (articleId) fetchArticle();
  }, [articleId]);

  const fetchNewArticle = async () => {
    const include = 'SavedArticles,ReactedArticles,ReportedArticles';
    const response = await getNewsArticleById(articleId, include);
    setArticle(response?.data);
  };

  if (!articleId) return null;

  const handleSave = async () => {
    try {
      await saveArticle({ newsArticleId: article.newsArticleId, userId: activeAccountId });
      await fetchNewArticle();
      toast.success(API_MESSAGES.ARTICLE_SAVED);
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  const handleReport = async () => {
    try {
      const payload = {
        newsArticleId: article.newsArticleId,
        userId: activeAccountId
      }
      await reportArticle(payload);
      await fetchNewArticle();
      toast.success('Article Reported Successfully');
    } catch (error) {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  }

  const handleDislike = async () => {
    try {
      const params = {
        filter: `NewsArticleId eq ${article.newsArticleId}; UserId eq ${activeAccountId}`,
      };
      const existingArticle = await getReactedArticles(params);
      if (existingArticle?.data?.length > 0) {
        const payload = {
          newsArticleId: existingArticle.data[0].newsArticleId,
          userId: activeAccountId,
          isActive: true,
          reactionType: ReactionType.Dislike,
        };
        await updateReactedArticle(existingArticle.data[0].reactionId, payload);
        await fetchNewArticle();
        toast.success('Article Disliked!');
      } else {
        await saveReactedArticle({
          newsArticleId: article.newsArticleId,
          userId: activeAccountId,
          isActive: true,
          reactionType: ReactionType.Dislike,
        });
        await fetchNewArticle();
        toast.success('Article Disliked!');
      }
    } catch (error) {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  const handleLike = async () => {
    try {
      const params = {
        filter: `NewsArticleId eq ${article.newsArticleId}; UserId eq ${activeAccountId}`,
      };
      const existingArticle = await getReactedArticles(params);
      if (existingArticle?.data?.length > 0) {
        const payload = {
          newsArticleId: existingArticle.data[0].newsArticleId,
          userId: activeAccountId,
          isActive: true,
          reactionType: ReactionType.Like,
        };
        await updateReactedArticle(existingArticle.data[0].reactionId, payload);
        await fetchNewArticle();
        toast.success('Article liked!');
      } else {
        await saveReactedArticle({
          newsArticleId: article.newsArticleId,
          userId: activeAccountId,
          isActive: true,
          reactionType: ReactionType.Like,
        });
        await fetchNewArticle();
        toast.success('Article liked!');
      }
    } catch (error) {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] p-6 rounded shadow-lg relative overflow-y-auto">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-lg font-bold">
          ✖
        </button>

        {loading ? (
          <p className="text-center">Loading article...</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{article.newsTitle}</h2>
            {article.imageUrl && (
              <img src={article.imageUrl} alt={article.newsTitle} className="w-full h-64 object-cover rounded mb-4" />
            )}
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">{article.newsContent}</p>

            <div className="text-sm text-gray-600 mb-4">
              <span className="block">📂 Category: {article.category}</span>
              <span className="block">🕒 {new Date(article.createdDateTime).toLocaleString()}</span>
            </div>

            {article.newsSource && <p className="italic text-sm mb-4">Source: {article.newsSource}</p>}
            {article.url && (
              <a href={article.url} target="_blank" rel="noreferrer" className="text-blue-600 underline mb-4 block">
                Read full article →
              </a>
            )}

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={article?.savedArticles?.some(
                  sa => sa.userId === activeAccountId && sa.newsArticleId === article.newsArticleId && sa.isActive === true,
                )}>
                Save Article
              </button>
              <button
                onClick={handleLike}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={article?.reactedArticles?.some(
                  ra =>
                    ra.userId === activeAccountId &&
                    ra.newsArticleId === article.newsArticleId &&
                    ra.isActive === true &&
                    ra.reactionType === ReactionType.Like,
                )}>
                Like Article
              </button>
              <button
                onClick={handleDislike}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={article?.reactedArticles?.some(
                  ra =>
                    ra.userId === activeAccountId &&
                    ra.newsArticleId === article.newsArticleId &&
                    ra.isActive === true &&
                    ra.reactionType === ReactionType.Dislike,
                )}>
                Dislike Article
              </button>
              <button
                onClick={handleReport}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={article?.reportedArticles?.some(
                  ra =>
                    ra.userId === activeAccountId &&
                    ra.newsArticleId === article.newsArticleId
                )}>
                Report Article
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
