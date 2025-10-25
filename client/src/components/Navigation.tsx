import { useNavigate, useLocation } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/menu', label: 'MENU' },
    { path: '/events', label: "WHERE'S THE BOMBER" },
    { path: '/catering', label: 'CATERING' },
    { path: '/our-story', label: 'OUR STORY' },
  ];

  return (
    <nav className="nav-header">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="nav-logo-circle">PB</div>
          <span>PIE BOMBER</span>
        </div>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
