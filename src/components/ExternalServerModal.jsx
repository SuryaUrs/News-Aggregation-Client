import { useState } from 'react';
import { saveExternalServer } from '../api/externalServerApi';
import { API_MESSAGES } from '../constants/errorMessages';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ExternalServerModal = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    apiKey: '',
    url: '',
    isActive: true,
  });

  const handleSave = async () => {
    try {
      await saveExternalServer(form);
      toast.success('External server added successfully.');
      onClose();
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Add External Server</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="API Key"
          className="w-full border p-2 rounded"
          value={form.apiKey}
          onChange={e => setForm({ ...form, apiKey: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL"
          className="w-full border p-2 rounded"
          value={form.url}
          onChange={e => setForm({ ...form, url: e.target.value })}
        />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
          Is Active
        </label>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
