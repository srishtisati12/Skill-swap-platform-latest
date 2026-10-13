import { NavLink, useNavigate } from 'react-router-dom';
import '../App.css'
function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="sidebar">

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/profile">My Profile</NavLink>
        <NavLink to="/my-skills">My Skills</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/swap-requests">Swap Requests</NavLink>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;