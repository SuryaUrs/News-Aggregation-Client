import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../src/constants/apiEndpoints';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { LoginPage } from '../src/pages/LoginPage.jsx';
import { SignupPage } from '../src/pages/SignupPage.jsx';
import { NewsArticlePage } from '../src/pages/NewsArticlePage.jsx';
import { TopBar } from './components/TopBar.jsx';
import { ExternalServerPage } from '../src/pages/ExternalServerPage.jsx'
import { SavedArticlePage } from '../src/pages/SavedArticlePage.jsx';
import { NotificationsPage } from '../src/pages/NotificationsPage.jsx';
import { ReactedArticlesPage } from '../src/pages/ReactedArticlesPage.jsx';
import { UserSettingsPage } from '../src/pages/UserSettingsPage.jsx';
import { ReportedArticlesPage } from '../src/pages/ReportedArticlesPage.jsx';
import { AdminSettingsPage } from '../src/pages/AdminSettingsPage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { CategorySettingsPage } from './pages/CategorySettingsPage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path={ROUTE_PATHS.HOME} element={<Navigate to={ROUTE_PATHS.LOGIN} replace />} />
        <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE_PATHS.SIGN_UP} element={<SignupPage />} /> 
        <Route path={ROUTE_PATHS.NEWS_ARTICLES} element={<ProtectedRoute allowedRoles={['User']}> <NewsArticlePage /> </ProtectedRoute>} />
        <Route path={ROUTE_PATHS.SAVED_ARTICLES} element={<ProtectedRoute allowedRoles={['User']}> <SavedArticlePage /> </ProtectedRoute>} />
        <Route path={ROUTE_PATHS.NOTIFICATIONS} element={<ProtectedRoute allowedRoles={['User']}> <NotificationsPage /> </ProtectedRoute>} />
        <Route path={ROUTE_PATHS.REACTED_ARTICLES} element={<ProtectedRoute allowedRoles={['User']}> <ReactedArticlesPage /> </ProtectedRoute>} />
        <Route path={ROUTE_PATHS.USER_SETTINGS} element={<ProtectedRoute allowedRoles={['User']}> <UserSettingsPage /> </ProtectedRoute>} />
        <Route path={ROUTE_PATHS.PROFILE} element={<ProtectedRoute allowedRoles={['User', 'Admin']}> <ProfilePage /> </ProtectedRoute>} />
        <Route path={ROUTE_PATHS.EXTERNAL_SERVER} element={<ProtectedRoute allowedRoles={['Admin']}> <ExternalServerPage /> </ProtectedRoute>} />
        <Route path={ROUTE_PATHS.REPORTED_ARTICLES} element={<ProtectedRoute allowedRoles={['Admin']}> <ReportedArticlesPage /> </ProtectedRoute>} />
        <Route path={ROUTE_PATHS.ADMIN_SETTINGS} element={<ProtectedRoute allowedRoles={['Admin']}> <AdminSettingsPage /> </ProtectedRoute>} />
        <Route path={ROUTE_PATHS.CATEGORY_SETTINGS} element={<ProtectedRoute allowedRoles={['Admin']}> <CategorySettingsPage /> </ProtectedRoute>} />
        <Route path={ROUTE_PATHS.ERROR_404} element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router> 
  );
}

export default App;
