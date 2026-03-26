import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const logo = `${process.env.PUBLIC_URL}/images/jarvis-logo.svg`;

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/appendices/user-manual', label: 'Download' },
  { path: '/requirements', label: 'Requirements' },
  { path: '/research', label: 'Research' },
  { path: '/algorithms', label: 'Algorithms' },
  { path: '/ui-design', label: 'UI Design' },
  { path: '/system-design', label: 'System Design' },
  { path: '/implementation', label: 'Implementation' },
  { path: '/testing', label: 'Testing' },
  { path: '/evaluation', label: 'Evaluation' },
];

const appendicesItems = [
  { path: '/appendices/gdpr-privacy', label: 'GDPR and Privacy of Data' },
  {
    href: 'https://www.linkedin.com/pulse/f1-jarvis-granite-ai-telemetry-analysis-platform-ibm-granite-okutan-yfgoe/?trackingId=mpz6Op2YTAO%2BrRpg5%2FtaXA%3D%3D',
    label: 'Development Blog',
    external: true,
  },
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
          <img src={logo} alt="" className="navbar__logo" aria-hidden="true" />
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
              onClick={() => setAppendicesOpen(o => !o)}
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
