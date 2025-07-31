import { useEffect, useState } from 'react';
import { getNewsArticlesOData } from '../api/newsArticleApi';
import { buildODataQuery } from '../utils/odataUtils';
import { Category } from '../constants/enums';
import { toast, ToastContainer } from 'react-toastify';
import { API_MESSAGES } from '../constants/errorMessages';
import { NewsArticleModel } from '../components/NewsArticelModel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';

export const NewsArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    startDate: '',
    endDate: '',
  });

  const fetchArticles = async () => {
    const filterQuery = buildODataQuery(filters);
    const params = filterQuery ? { $filter: filterQuery.replace('$filter=', '') } : {};
    try {
      const response = await getNewsArticlesOData(params);
      setArticles(response?.data || []);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    const { startDate, endDate } = filters;
    if ((startDate && endDate) || (!startDate && !endDate)) {
      fetchArticles();
    }
  }, [filters]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({ category: '', search: '', startDate: '', endDate: '' });
  };

  const handleViewArticle = articleId => {
    setSelectedArticleId(articleId);
  };

  const closeModal = () => {
    setSelectedArticleId(null)
    fetchArticles();
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">News Articles</h1>

      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="search"
          placeholder="Search title or content..."
          value={filters.search}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full">
          <option value="">All Categories</option>
          {Object.values(Category).map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <DatePicker
          selectsRange
          startDate={filters.startDate ? new Date(filters.startDate) : null}
          endDate={filters.endDate ? new Date(filters.endDate) : null}
          onChange={([start, end]) => {
            setFilters(prev => ({
              ...prev,
              startDate: start ? start.toLocaleDateString().split('T')[0] : '',
              endDate: end ? end.toLocaleDateString().split('T')[0] : '',
            }));
          }}
          isClearable
          placeholderText="Select date range"
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Reset Button */}
      <div className="flex justify-end mb-4">
        <button onClick={handleReset} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
          Clear Filters
        </button>
      </div>

      {/* Article List */}
      <div className="grid gap-6">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500">No articles found.</p>
        ) : (
          articles.map(article => (
            <div key={article.newsArticleId} className="bg-white p-4 rounded shadow space-y-2">
              {article.imageUrl && (
                <img src={article.imageUrl} alt={article.newsTitle} className="w-full h-48 object-cover rounded" />
              )}

              <h2 className="text-xl font-semibold text-gray-800">{article.newsTitle}</h2>

              <p className="text-sm text-gray-600">
                {article.newsContent?.length > 150 ? `${article.newsContent.slice(0, 150)}...` : article.newsContent}
              </p>

              <div className="flex flex-wrap justify-between text-xs text-gray-500">
                <span>🗂️ Category: {article.category}</span>
                <span>📅 {article.createdDateTime ? new Date(article.createdDateTime).toLocaleDateString() : 'N/A'}</span>
              </div>

              {article.newsSource && <div className="text-sm text-gray-500 italic">Source: {article.newsSource}</div>}

              {article.url && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 hover:underline text-sm font-medium">
                  Read full article →
                </a>
              )}
              <hr />
              <button
                onClick={() => handleViewArticle(article.newsArticleId)}
                className="mt-2 px-4 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600 transition">
                View
              </button>
            </div>
          ))
        )}
      </div>
      <NewsArticleModel articleId={selectedArticleId} onClose={closeModal} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
