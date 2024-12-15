import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };

  const menuItems = [
    { 
      path: `/dashboard/${userData?.id}`, 
      label: 'Dashboard',
      isActive: location.pathname === `/dashboard/${userData?.id}`
    },
    { 
      path: '/dashboard/tasks', 
      label: 'Tasks',
      isActive: location.pathname === '/dashboard/tasks'
    },
    { 
      path: '/dashboard/users', 
      label: 'Users',
      isActive: location.pathname === '/dashboard/users'
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg">
      {/* Logo/Brand */}
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">TSIG CMS</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              {item.isActive ? (
                <span className="flex items-center space-x-2 rounded-lg bg-blue-50 p-2 text-blue-600 hover:cursor-pointer">
                  <span>{item.label}</span>
                </span>
              ) : (
                <NavLink
                  to={item.path}
                  className="flex items-center space-x-2 rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <span className='hover:cursor-pointer'>{item.label}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="absolute bottom-0 w-full border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            <div>
              <p className="text-sm font-medium">
                {userData?.fullname || 'Guest'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="rounded px-2 py-1 text-sm bg-red-50 text-red-600 hover:bg-red-400 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 