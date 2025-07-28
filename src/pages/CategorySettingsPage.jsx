import { useEffect, useState } from 'react';
import { getNewsCategories } from '../api/newsCategoryApi';
import { NewsCategoryModal } from '../components/NewsCategoryModal';
import { toast, ToastContainer } from 'react-toastify';
import { API_MESSAGES } from '../constants/errorMessages';
import 'react-toastify/dist/ReactToastify.css';

export const CategorySettingsPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await getNewsCategories();
      setCategories(response?.data || []);
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Category Settings</h1>

      <div className="grid gap-4">
        {categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories found.</p>
        ) : (
          categories.map(category => (
            <div key={category.newsCategoryId} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{category.category}</h2>
                <p className={`text-sm ${category.isHidden ? 'text-red-600' : 'text-green-600'}`}>
                  {category.isHidden ? 'Hidden' : 'Visible'}
                </p>
              </div>

              <button
                onClick={() => setSelectedCategoryId(category.newsCategoryId)}
                className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                View
              </button>
            </div>
          ))
        )}
      </div>

      {selectedCategoryId && (
        <NewsCategoryModal
          categoryId={selectedCategoryId}
          onClose={() => {
            setSelectedCategoryId(null);
            fetchCategories();
          }}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
