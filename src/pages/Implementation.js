import SectionPage from '../components/SectionPage';

function Implementation() {
  return (
    <SectionPage title="Implementation">
      <p>
        Development follows an Agile methodology with two-week sprints across four parallel tracks,
        covering the full 18-week project timeline from November 2025 to March 2026.
      </p>

      <h2>Parallel Development Tracks</h2>
      <div className="info-cards">
        <div className="info-card">
          <div className="info-card__label">Track 1 — Data Integration</div>
          <div className="info-card__value">CAN bus handling, TORCS integration, Assetto Corsa integration, InfluxDB setup</div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Track 2 — 2D Visualisation</div>
          <div className="info-card__value">Dashboard framework, real-time displays, post-race replay, UI refinement</div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Track 3 — AI Services</div>
          <div className="info-card__value">Granite API integration, fine-tuning pipeline, strategy engine, voice synthesis</div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Track 4 — VR Platform</div>
          <div className="info-card__value">Unreal Engine 5 setup, 3D visualisation, telemetry sync, user interaction</div>
        </div>
      </div>

      <h2>Project Phases</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>Phase</th>
            <th>Weeks</th>
            <th>Focus Areas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Planning & Design</td>
            <td>1–4</td>
            <td>Requirements gathering, architecture design, environment setup</td>
          </tr>
          <tr>
            <td>Core Development</td>
            <td>5–12</td>
            <td>Parallel tracks: Data integration, 2D dashboard, AI services, VR platform</td>
          </tr>
          <tr>
            <td>Integration & Testing</td>
            <td>13–16</td>
            <td>System integration, performance testing, user testing</td>
          </tr>
          <tr>
            <td>Documentation & Finalisation</td>
            <td>17–18</td>
            <td>Documentation completion, final refinements, submission</td>
          </tr>
        </tbody>
      </table>

      <h2>Major Milestones</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>Milestone</th>
            <th>Target Date</th>
            <th>Deliverable</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>M1: Requirements Complete</td>
            <td>Week 4 — 28 Nov 2025</td>
            <td>Specification document, architecture design</td>
          </tr>
          <tr>
            <td>M2: Data Pipeline Prototype</td>
            <td>Week 7 — 19 Dec 2025</td>
            <td>CAN bus + TORCS integration working</td>
          </tr>
          <tr>
            <td>M3: 2D Platform Alpha</td>
            <td>Week 10 — 9 Jan 2026</td>
            <td>Dashboard with real-time visualisation</td>
          </tr>
          <tr>
            <td>M4: AI Integration Alpha</td>
            <td>Week 12 — 23 Jan 2026</td>
            <td>Basic strategy recommendations operational</td>
          </tr>
          <tr>
            <td>M5: VR Environment Alpha</td>
            <td>Week 14 — 6 Feb 2026</td>
            <td>Interactive VR environment</td>
          </tr>
          <tr>
            <td>M6: System Integration</td>
            <td>Week 16 — 6 Mar 2026</td>
            <td>All components integrated and tested</td>
          </tr>
          <tr>
            <td>M7: Testing Complete</td>
            <td>Week 17 — 13 Mar 2026</td>
            <td>All testing finished</td>
          </tr>
          <tr>
            <td>M8: Project Submission</td>
            <td>Week 18 — 27 Mar 2026</td>
            <td>Final deliverables submitted</td>
          </tr>
        </tbody>
      </table>

      <h2>Development Process</h2>
      <h3>Sprint Structure</h3>
      <p>
        Two-week sprints with sprint planning, daily async standups via Discord, a mid-sprint
        check-in, and a sprint review/demo at the end of each cycle.
      </p>
      <h3>Git Workflow</h3>
      <p>
        Feature branch workflow with pull request reviews. The main branch is kept stable;
        all development happens on feature branches merged via PR.
      </p>
      <h3>Communication</h3>
      <p>
        Discord for daily team communication; GitHub Projects for task tracking;
        bi-weekly demos presented to supervisors Prof. Hilton and Prof. McNamara.
      </p>
    </SectionPage>
  );
}

export default Implementation;
