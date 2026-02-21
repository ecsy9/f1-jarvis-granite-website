import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/requirements', label: 'Requirements' },
  { path: '/research', label: 'Research' },
  { path: '/ui-design', label: 'UI Design' },
  { path: '/system-design', label: 'System Design' },
  { path: '/implementation', label: 'Implementation' },
  { path: '/testing', label: 'Testing' },
  { path: '/evaluation', label: 'Evaluation' },
];

const appendicesItems = [
  { path: '/appendices/user-manual', label: 'User manual and deployment manual' },
  { path: '/appendices/gdpr-privacy', label: 'GDPR and Privacy of Data' },
  { href: 'https://example.com/dev-blog', label: 'Development Blog', external: true },
  { path: '/appendices/monthly-video', label: 'Monthly Video' },
];

function NavLinkItem({ to, children, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
    >
      {children}
    </NavLink>
  );
}

function Navbar() {
  const [appendicesOpen, setAppendicesOpen] = useState(false);
  const location = useLocation();
  const isAppendicesActive = location.pathname.startsWith('/appendices');

  return (
    <header className="navbar">
      <div className="navbar__container">
        <NavLink to="/" className="navbar__brand">
          F1 Jarvis Granite
        </NavLink>
        <nav className="navbar__nav">
          {navItems.map(({ path, label }) => (
            <NavLinkItem key={path} to={path} end={path === '/'}>
              {label}
            </NavLinkItem>
          ))}
          <div
            className={`navbar__dropdown ${appendicesOpen ? 'navbar__dropdown--open' : ''} ${isAppendicesActive ? 'nav-link--active' : ''}`}
            onMouseEnter={() => setAppendicesOpen(true)}
            onMouseLeave={() => setAppendicesOpen(false)}
          >
            <button
              type="button"
              className="nav-link navbar__dropdown-trigger"
              aria-expanded={appendicesOpen}
              aria-haspopup="true"
            >
              Appendices
              <span className="navbar__dropdown-arrow" aria-hidden>▾</span>
            </button>
            <ul className="navbar__dropdown-menu" role="menu">
              {appendicesItems.map((item) =>
                item.external ? (
                  <li key={item.label} role="none">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="navbar__dropdown-item"
                      role="menuitem"
                    >
                      {item.label}
                      <span className="navbar__external-icon" aria-hidden>↗</span>
                    </a>
                  </li>
                ) : (
                  <li key={item.path} role="none">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `navbar__dropdown-item ${isActive ? 'navbar__dropdown-item--active' : ''}`
                      }
                      role="menuitem"
                      onClick={() => setAppendicesOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
