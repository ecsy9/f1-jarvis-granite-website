import { Link } from 'react-router-dom';
import SectionPage from '../components/SectionPage';

function Appendices() {
  return (
    <SectionPage title="Appendices">
      <p>Supporting materials, documentation, and external resources for the F1 Jarvis TORCS project.</p>

      <h2>Project Documents</h2>
      <div className="info-cards">
        <div className="info-card">
          <div className="info-card__label">User Manual</div>
          <div className="info-card__value">
            <Link to="/appendices/user-manual" style={{color:'#e85d04'}}>
              View User &amp; Deployment Manual
            </Link>
          </div>
        </div>
        <div className="info-card">
          <div className="info-card__label">GDPR &amp; Privacy</div>
          <div className="info-card__value">
            <Link to="/appendices/gdpr-privacy" style={{color:'#e85d04'}}>
              View GDPR &amp; Privacy Statement
            </Link>
          </div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Monthly Video</div>
          <div className="info-card__value">
            <Link to="/appendices/monthly-video" style={{color:'#e85d04'}}>
              View Monthly Progress Videos
            </Link>
          </div>
        </div>
      </div>

      <h2>GitHub Repositories</h2>
      <div className="info-cards">
        <div className="info-card">
          <div className="info-card__label">Website Source</div>
          <div className="info-card__value">
            <a href="https://github.com/ecsy9/f1-jarvis-granite-website" target="_blank" rel="noopener noreferrer" style={{color:'#e85d04'}}>
              f1-jarvis-granite-website ↗
            </a>
          </div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Main Platform</div>
          <div className="info-card__value">
            <a href="https://github.com/ecsy9/f1-jarvis-granite" target="_blank" rel="noopener noreferrer" style={{color:'#e85d04'}}>
              f1-jarvis-granite ↗
            </a>
          </div>
        </div>
      </div>

      <h2>Project Details</h2>
      <table className="section-table">
        <tbody>
          <tr>
            <td><strong>Project Title</strong></td>
            <td>F1 Jarvis TORCS — AI Enhanced Racing Telemetry Analysis Platform</td>
          </tr>
          <tr>
            <td><strong>Module</strong></td>
            <td>COMP0016 Systems Engineering, UCL</td>
          </tr>
          <tr>
            <td><strong>Team</strong></td>
            <td>Team 17 — Ece Okutan, Oltun Ozavci, Athena Chong, Elinor Cheung, Eima Miyasaka</td>
          </tr>
          <tr>
            <td><strong>Supervisors</strong></td>
            <td>Prof. Stephen Hilton &amp; Prof. John McNamara</td>
          </tr>
          <tr>
            <td><strong>Specification Version</strong></td>
            <td>2.0 — 27th November 2025</td>
          </tr>
          <tr>
            <td><strong>Submission Deadline</strong></td>
            <td>27th March 2026</td>
          </tr>
          <tr>
            <td><strong>Licence</strong></td>
            <td>MIT</td>
          </tr>
        </tbody>
      </table>
    </SectionPage>
  );
}

export default Appendices;
