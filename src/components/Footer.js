import { NavLink } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__brand-name">F1 Jarvis Granite</span>
            <span className="footer__brand-sub">COMP0016 Systems Engineering &middot; UCL &middot; Team 17</span>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <p className="footer__col-title">Report</p>
              <NavLink to="/" className="footer__link">Home</NavLink>
              <NavLink to="/requirements" className="footer__link">Requirements</NavLink>
              <NavLink to="/research" className="footer__link">Research</NavLink>
              <NavLink to="/ui-design" className="footer__link">UI Design</NavLink>
              <NavLink to="/system-design" className="footer__link">System Design</NavLink>
            </div>
            <div className="footer__col">
              <p className="footer__col-title">More</p>
              <NavLink to="/implementation" className="footer__link">Implementation</NavLink>
              <NavLink to="/testing" className="footer__link">Testing</NavLink>
              <NavLink to="/evaluation" className="footer__link">Evaluation</NavLink>
              <NavLink to="/appendices" className="footer__link">Appendices</NavLink>
            </div>
            <div className="footer__col">
              <p className="footer__col-title">GitHub</p>
              <a href="https://github.com/athena-c-22/f1-fine-tuning" target="_blank" rel="noopener noreferrer" className="footer__link">
                f1-fine-tuning ↗
              </a>
              <a href="https://github.com/eceokutan/f1-live-telemetry" target="_blank" rel="noopener noreferrer" className="footer__link">
                f1-live-telemetry ↗
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>Team 17 &mdash; Ece Okutan &middot; Oltun Ozavci &middot; Athena Chong &middot; Elinor Cheung &middot; Eima Miyasaka</span>
          <span>Supervised by Prof. Stephen Hilton &amp; Prof. John McNamara</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
