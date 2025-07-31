import { useEffect, useState } from 'react';
import { getExternalServer, updateExternalServer } from '../api/externalServerApi';
import { API_MESSAGES } from '../constants/errorMessages';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ExternalServerUpdateModal = ({ externalServerId, onClose }) => {
  const [server, setServer] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getExternalServer(externalServerId);
        setServer(response?.data);
      } catch {
        toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
        onClose();
      }
    };
    fetch();
  }, [externalServerId]);

  const handleUpdate = async () => {
    try {
      await updateExternalServer(externalServerId, server);
      toast.success('Server updated.');
      onClose();
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  if (!server) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Edit External Server</h2>

        <input
          type="text"
          className="w-full border p-2 rounded"
          value={server.name}
          onChange={e => setServer({ ...server, name: e.target.value })}
        />
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={server.apiKey}
          onChange={e => setServer({ ...server, apiKey: e.target.value })}
        />
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={server.url}
          onChange={e => setServer({ ...server, url: e.target.value })}
        />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={server.isActive} onChange={e => setServer({ ...server, isActive: e.target.checked })} />
          Is Active
        </label>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Update
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
