import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../constants/apiEndpoints';
import { localStorageConstants } from '../constants/localStorage.constant';

export const TopBar = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem(localStorageConstants.USER_ROLE);
  const isLoggedIn = sessionStorage.getItem(localStorageConstants.ACCESS_TOKEN);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate(ROUTE_PATHS.LOGIN);
  };

  if (!isLoggedIn) return null;

  return (
    <nav className="bg-gray-500 text-white px-4 py-3 shadow-md flex justify-between items-center">
      <div className="text-lg font-bold cursor-pointer">News App</div>

      {isLoggedIn && (
        <div className="flex items-center space-x-6">
          {role === 'Admin' && (
            <>
              <button onClick={() => navigate(ROUTE_PATHS.EXTERNAL_SERVER)} className="hover:text-blue-400">
                External Server
              </button>
              <button onClick={() => navigate(ROUTE_PATHS.REPORTED_ARTICLES)} className="hover:text-blue-400">
                Reported Articles
              </button>
              <button onClick={() => navigate(ROUTE_PATHS.CATEGORY_SETTINGS)} className="hover:text-blue-400">
                Category Settings
              </button>
              <button onClick={() => navigate(ROUTE_PATHS.ADMIN_SETTINGS)} className="hover:text-blue-400">
                Admin Settings
              </button>
              <button onClick={() => navigate(ROUTE_PATHS.PROFILE)} className="hover:text-blue-400">
                Profile
              </button>
            </>
          )}

          {role === 'User' && (
            <>
              <button onClick={() => navigate(ROUTE_PATHS.NEWS_ARTICLES)} className="hover:text-blue-400">
                News Articles
              </button>
              <button onClick={() => navigate(ROUTE_PATHS.SAVED_ARTICLES)} className="hover:text-blue-400">
                Saved Articles
              </button>
              <button onClick={() => navigate(ROUTE_PATHS.NOTIFICATIONS)} className="hover:text-blue-400">
                Notifications
              </button>
              <button onClick={() => navigate(ROUTE_PATHS.REACTED_ARTICLES)} className="hover:text-blue-400">
                Reacted Articles
              </button>
              <button onClick={() => navigate(ROUTE_PATHS.USER_SETTINGS)} className="hover:text-blue-400">
                Notification Settings
              </button>
              <button onClick={() => navigate(ROUTE_PATHS.PROFILE)} className="hover:text-blue-400">
                Profile
              </button>
            </>
          )}

          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};
