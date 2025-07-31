import { useEffect, useState } from 'react';
import { getNewsCategory, updateNewsCatogry } from '../api/newsCategoryApi';
import { API_MESSAGES } from '../constants/errorMessages';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NewsCategoryModal = ({ categoryId, onClose }) => {
  const [category, setCategory] = useState(null);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getNewsCategory(categoryId);
        setCategory(response?.data);
        setIsHidden(response?.data?.isHidden || false);
      } catch {
        toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
        onClose();
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleUpdate = async () => {
    try {
      const updated = { ...category, isHidden: !category.isHidden };
      await updateNewsCatogry(categoryId, updated);
      toast.success(`Category ${updated.isHidden ? 'hidden' : 'visible'} successfully.`);
      setCategory(updated);
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  if (!category) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Category Details</h2>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Category Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
            value={category.category}
            disabled
          />
        </div>

        <label className="flex items-center gap-2 mt-4">
          <input type="checkbox" checked={isHidden} onChange={e => setIsHidden(e.target.checked)} />
          Is Hidden
        </label>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Close
          </button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Update
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
