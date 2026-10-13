import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import MySkills from './pages/MySkills';
import Users from './pages/User';
import SwapRequests from './pages/SwapRequest';

function App() {
  const { pathname } = useLocation();

  const publicPath =
    pathname === '/login' || pathname === '/signup';

  return (
    <ProtectedRoute>
      {publicPath ? (
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : (
        <>
          <Navbar />

          <div className="app-layout">
            <Sidebar />

            <main className="main-content">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-skills" element={<MySkills />} />
                <Route path="/users" element={<Users />} />
                <Route path="/swap-requests" element={<SwapRequests />} />
              </Routes>
            </main>
          </div>
        </>
      )}
    </ProtectedRoute>
  );
}

export default App;