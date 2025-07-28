import { useEffect, useState } from 'react';
import { getExternalServers } from '../api/externalServerApi';
import { ExternalServerModal } from '../components/ExternalServerModal';
import { ExternalServerUpdateModal } from '../components/ExternalServerUpdateModal';
import { ToastContainer, toast } from 'react-toastify';
import { API_MESSAGES } from '../constants/errorMessages';
import 'react-toastify/dist/ReactToastify.css';

export const ExternalServerPage = () => {
  const [servers, setServers] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editServerId, setEditServerId] = useState(null);

  const fetchServers = async () => {
    try {
      const response = await getExternalServers();
      setServers(response?.data || []);
    } catch {
      toast.error(API_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  return (
      <div className="min-h-screen px-4 py-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">External Servers</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add New Server
        </button>
      </div>

      <div className="grid gap-6">
        {servers.length === 0 ? (
          <p className="text-center text-gray-500">No external servers found.</p>
        ) : (
          servers.map(server => (
            <div key={server.externalServerId} className="bg-white p-4 rounded shadow space-y-2">
              <h2 className="text-lg font-semibold">{server.name}</h2>
              <p className="text-sm text-gray-700">🔗 {server.url}</p>
              <p className="text-sm text-gray-700">🔑 API Key: {server.apiKey}</p>
              <p className="text-sm text-gray-500">📅 Last Accessed: {server.lastAccessed ? new Date(server.lastAccessed).toLocaleString() : 'N/A'}</p>
              <p className="text-sm text-gray-500">✅ Active: {server.isActive ? 'Yes' : 'No'}</p>
              <button
                onClick={() => setEditServerId(server.externalServerId)}
                className="mt-2 px-4 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                View / Edit
              </button>
            </div>
          ))
        )}
      </div>

      {addModalOpen && (
        <ExternalServerModal onClose={() => { setAddModalOpen(false); fetchServers(); }} />
      )}

      {editServerId && (
        <ExternalServerUpdateModal
          externalServerId={editServerId}
          onClose={() => {
            setEditServerId(null);
            fetchServers();
          }}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
