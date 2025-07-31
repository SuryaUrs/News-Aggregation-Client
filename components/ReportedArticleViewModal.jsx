import { useEffect, useState } from 'react';
import { getReportedArticle } from '../api/reportedArticlesApi';
import { updateNewsArticle } from '../api/newsArticleApi';
import { toast, ToastContainer } from 'react-toastify';
import { API_MESSAGES } from '../constants/errorMessages';
import 'react-toastify/dist/ReactToastify.css';

export const ReportedArticleViewModal = ({ reportedArticleId, onClose }) => {
  const [report, setReport] = useState(null);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReport = async () => {
    try {
      const response = await getReportedArticle(reportedArticleId, 'NewsArticle');
      setReport(response?.data);
      setArticle(response?.data?.newsArticle);
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [reportedArticleId]);

  const handleToggleHidden = async () => {
    try {
      const newIsHidden = !article.isHidden;
      const payload = {
        newsArticleId: article.newsArticleId,
        isHidden: newIsHidden,
        newsContent: article.newsContent,
        newsTitle: article.newsTitle,
      };
      await updateNewsArticle(article.newsArticleId, payload);
      toast.success(`Article ${article.isHidden ? 'unhidden' : 'hidden'} successfully.`);
      setArticle({ ...article, isHidden: newIsHidden });
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  if (loading || !report || !article) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Reported Article Details</h2>

        <div className="space-y-3">
          <div>
            <label className="block font-medium text-gray-700">Title</label>
            <p className="border p-2 rounded bg-gray-100 text-gray-800">{article.newsTitle}</p>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Content</label>
            <div className="border p-2 rounded bg-gray-100 text-gray-700 whitespace-pre-wrap">{article.newsContent}</div>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Category</label>
            <p className="border p-2 rounded bg-gray-100 text-gray-800">{article.category}</p>
          </div>

          <div className="text-sm text-gray-600">📅 Created: {new Date(article.createdDateTime).toLocaleString()}</div>

          <div className="text-red-600 text-sm italic">Report Reason: {report.reason || 'No reason provided'}</div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={handleToggleHidden}
            className={`px-4 py-2 rounded text-white transition ${
              article.isHidden ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}>
            {article.isHidden ? 'Unhide Article' : 'Hide Article'}
          </button>

          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Close
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
