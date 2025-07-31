import { useEffect, useState } from 'react';
import { getAllReportedArticles } from '../api/reportedArticlesApi';
import { ReportedArticleViewModal } from '../components/ReportedArticleViewModal';
import { API_MESSAGES } from '../constants/errorMessages';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ReportedArticlesPage = () => {
  const [reports, setReports] = useState([]);
  const [selectedReportId, setSelectedReportId] = useState(null);

  const fetchReports = async () => {
    const params = {
      include: 'NewsArticle',
    };

    try {
      const response = await getAllReportedArticles(params);
      setReports(response?.data || []);
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Reported Articles</h1>

      <div className="grid gap-6">
        {reports.length === 0 ? (
          <p className="text-center text-gray-500">No reported articles found.</p>
        ) : (
          reports.map(report => (
            <div key={report.articleReportId} className="bg-white p-4 rounded shadow space-y-2">
              <h2 className="text-lg font-semibold">{report.newsArticle?.newsTitle || 'Untitled Article'}</h2>
              <p className="text-sm text-gray-700">{report.reason || 'No reason provided'}</p>
              <p className="text-xs text-gray-500">🕒 {new Date(report.newsArticle?.createdDateTime).toLocaleString()}</p>

              <button
                onClick={() => setSelectedReportId(report.articleReportId)}
                className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                View Article
              </button>
            </div>
          ))
        )}
      </div>

      {selectedReportId && (
        <ReportedArticleViewModal
          reportedArticleId={selectedReportId}
          onClose={() => {
            setSelectedReportId(null);
            fetchReports();
          }}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
