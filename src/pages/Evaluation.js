import SectionPage from '../components/SectionPage';

const AVATARS = {
  Ece:    `${process.env.PUBLIC_URL}/images/team/ece-okutan.jpg`,
  Eima:   `${process.env.PUBLIC_URL}/images/team/eima-miyasaka.jpg`,
  Oltun:  `${process.env.PUBLIC_URL}/images/team/oltun-ozavci.jpg`,
  Athena: `${process.env.PUBLIC_URL}/images/team/athena-chong.jpg`,
  Elinor: `${process.env.PUBLIC_URL}/images/team/elinor-cheung.jpg`,
};

const avatarStyle = {
  width: '24px', height: '24px', borderRadius: '50%',
  objectFit: 'cover', verticalAlign: 'middle', marginRight: '5px',
};

function NameWithAvatar({ name }) {
  return (
    <span style={{ whiteSpace: 'nowrap' }}>
      {AVATARS[name] && <img src={AVATARS[name]} alt={name} style={avatarStyle} />}
      {name}
    </span>
  );
}

function Contributors({ names }) {
  return (
    <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {names.split(', ').map(n => <NameWithAvatar key={n} name={n} />)}
    </span>
  );
}

function Evaluation() {
  return (
    <SectionPage title="Evaluation">
      <h2>Summary of achievements</h2>
      <ul>
        <li>
          An achievement table to list the MoSCoW functionalities, the completed states, and
          contributors
        </li>
        <li>A list of known bugs (if applicable)</li>
        <li>Individual contribution distribution table</li>
      </ul>

      <h3>Achievement table</h3>
      <table>
        <thead>
          <tr>
            <th style={{ width: '56px' }}>ID</th>
            <th>Requirements</th>
            <th style={{ width: '120px' }}>Priority</th>
            <th style={{ width: '90px' }}>State</th>
            <th style={{ width: '160px' }}>Contributors</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2D platform displays real-time telemetry with &lt;500ms latency</td>
            <td>Should</td>
            <td>✓</td>
            <td><Contributors names="Ece" /></td>
          </tr>
          <tr>
            <td>2</td>
            <td>AI recommendations achieve &gt;85% accuracy on test scenarios</td>
            <td>Should</td>
            <td>✓</td>
            <td><Contributors names="Elinor, Athena" /></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Data integration functional from CAN bus and simulators to database</td>
            <td>Must</td>
            <td>✓</td>
            <td><Contributors names="Ece" /></td>
          </tr>
          <tr>
            <td>4</td>
            <td>IBM Granite with Jarvis orchestration operational with &lt;3 sec response times</td>
            <td>Could</td>
            <td>✕</td>
            <td><Contributors names="Eima" /></td>
          </tr>
          <tr>
            <td>5</td>
            <td>≥3 Formula Student members confirm value (SUS score &gt;70)</td>
            <td>Could</td>
            <td>✓</td>
            <td><Contributors names="Ece, Eima" /></td>
          </tr>
          <tr>
            <td>6</td>
            <td>VR platform renders 3D model with interactive telemetry at &gt;60 FPS</td>
            <td>Should</td>
            <td>✓</td>
            <td><Contributors names="Oltun, Eima" /></td>
          </tr>
          <tr>
            <td>7</td>
            <td>Complete documentation enables system replication by a new team</td>
            <td>Should</td>
            <td>✓</td>
            <td><Contributors names="Eima" /></td>
          </tr>
          <tr>
            <td colSpan={2}>
              <strong>Key Functionalities (must have and should have)</strong>
            </td>
            <td colSpan={3}>100% completed</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <strong>Optional Functionalities (could have)</strong>
            </td>
            <td colSpan={3}>50% completed</td>
          </tr>
        </tbody>
      </table>

      <h3>Known bugs</h3>
      <ul>
        <li>[Bug 1: short description, impact, and status]</li>
        <li>[Bug 2: short description, impact, and status]</li>
      </ul>

      <h3>Individual contribution distribution</h3>
      <p>System artefacts</p>
      <table>
        <thead>
          <tr>
            <th>Work packages</th>
            <th style={{ width: '120px' }}><NameWithAvatar name="Ece" /></th>
            <th style={{ width: '120px' }}><NameWithAvatar name="Oltun" /></th>
            <th style={{ width: '120px' }}><NameWithAvatar name="Elinor" /></th>
            <th style={{ width: '120px' }}><NameWithAvatar name="Athena" /></th>
            <th style={{ width: '120px' }}><NameWithAvatar name="Eima" /></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Research &amp; Experiments</td>
            <td>10%</td><td>30%</td><td>20%</td><td>25%</td><td>15%</td>
          </tr>
          <tr>
            <td>UI Design</td>
            <td>40%</td><td>35%</td><td>5%</td><td>5%</td><td>15%</td>
          </tr>
          <tr>
            <td>Coding</td>
            <td>20%</td><td>5%</td><td>25%</td><td>20%</td><td>30%</td>
          </tr>
          <tr>
            <td>Testing</td>
            <td>15%</td><td>5%</td><td>30%</td><td>25%</td><td>25%</td>
          </tr>
          <tr>
            <td><strong>Overall contribution</strong></td>
            <td><strong>21%</strong></td>
            <td><strong>19%</strong></td>
            <td><strong>20%</strong></td>
            <td><strong>19%</strong></td>
            <td><strong>21%</strong></td>
          </tr>
        </tbody>
      </table>

      <p style={{ marginTop: '1rem' }}>Website</p>
      <table>
        <thead>
          <tr>
            <th>Work packages</th>
            <th style={{ width: '120px' }}><NameWithAvatar name="Ece" /></th>
            <th style={{ width: '120px' }}><NameWithAvatar name="Oltun" /></th>
            <th style={{ width: '120px' }}><NameWithAvatar name="Elinor" /></th>
            <th style={{ width: '120px' }}><NameWithAvatar name="Athena" /></th>
            <th style={{ width: '120px' }}><NameWithAvatar name="Eima" /></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Template and Setup</td>
            <td>0%</td><td>0%</td><td>20%</td><td>80%</td><td>0%</td>
          </tr>
          <tr>
            <td>Home</td>
            <td>55%</td><td>10%</td><td>20%</td><td>10%</td><td>5%</td>
          </tr>
          <tr>
            <td>Video</td>
            <td>20%</td><td>20%</td><td>20%</td><td>20%</td><td>20%</td>
          </tr>
          <tr>
            <td>Requirement</td>
            <td>10%</td><td>0%</td><td>15%</td><td>15%</td><td>60%</td>
          </tr>
          <tr>
            <td>Research</td>
            <td>20%</td><td>15%</td><td>30%</td><td>10%</td><td>25%</td>
          </tr>
          <tr>
            <td>Algorithm</td>
            <td>20%</td><td>0%</td><td>25%</td><td>25%</td><td>30%</td>
          </tr>
          <tr>
            <td>UI Design</td>
            <td>30%</td><td>25%</td><td>25%</td><td>20%</td><td>0%</td>
          </tr>
          <tr>
            <td>System Design</td>
            <td>25%</td><td>30%</td><td>10%</td><td>0%</td><td>35%</td>
          </tr>
          <tr>
            <td>Implementation</td>
            <td>20%</td><td>20%</td><td>20%</td><td>20%</td><td>20%</td>
          </tr>
          <tr>
            <td>Testing</td>
            <td>15%</td><td>20%</td><td>20%</td><td>20%</td><td>25%</td>
          </tr>
          <tr>
            <td>Evaluation and Future Work</td>
            <td>30%</td><td>30%</td><td>20%</td><td>0%</td><td>20%</td>
          </tr>
          <tr>
            <td>User and Deployment Manuals</td>
            <td>40%</td><td>10%</td><td>0%</td><td>0%</td><td>50%</td>
          </tr>
          <tr>
            <td>Legal Issues</td>
            <td>0%</td><td>60%</td><td>20%</td><td>20%</td><td>0%</td>
          </tr>
          <tr>
            <td>Blog and Monthly Video</td>
            <td>30%</td><td>10%</td><td>20%</td><td>20%</td><td>20%</td>
          </tr>
          <tr>
            <td><strong>Overall contribution</strong></td>
            <td><strong>23%</strong></td>
            <td><strong>18%</strong></td>
            <td><strong>19%</strong></td>
            <td><strong>19%</strong></td>
            <td><strong>22%</strong></td>
          </tr>
        </tbody>
      </table>

      <h2>Critical evaluation of the project</h2>
      <h3>User interface / user experience (if applicable)</h3>
      <p>F1 Jarvis Granite dashboard offers clear, responsive, professional UI with strong real-time feedback, supporting efficient analysis, while maintaining good usability overall.</p>

      <h3>Functionality</h3>
      <p>F1 Jarvis Granite delivers robust telemetry, normalization, low-latency dashboards, promising AI features, reliable demos, and progress toward scalable, production-ready performance.</p>

      <h3>Stability</h3>
      <p>F1 Jarvis Granite shows reliable telemetry ingestion, low latency, stable dashboards, and promising performance, with strong foundations for further robustness improvements.</p>

      <h3>Efficiency</h3>
      <p>The F1 Jarvis Granite platform achieves low latency (under 500ms) for core telemetry and 2D dashboard with efficient resource usage in tests, but VR and AI features show higher demands needing optimisation.</p>

      <h3>Compatibility</h3>
      <p>The F1 Jarvis Granite platform excels with flexible tooling including Python, Unreal Engine 5, and IBM Granite models, enabling seamless cross-environment support from real CAN bus vehicles to Assetto Corsa simulators.</p>

      <h3>Maintainability</h3>
      <p>The F1 Jarvis Granite project features clean, modular code structure with excellent extensibility, comprehensive documentation, and strong test coverage that supports smooth development and future enhancements.</p>

      <h3>Project management</h3>
      <p>The F1 Jarvis Granite team demonstrated excellent planning and MoSCoW prioritisation, fostering strong teamwork and delivering a robust, functional prototype on schedule with impressive results.</p>

      <h2>Future work</h2>
      <ul>
        <li>Integration with professional Formula 1 systems or proprietary F1 data sources</li>
        <li>Support for racing simulators beyond Assetto Corsa (modular architecture permits future expansion)</li>
        <li>Real-time control commands sent back to vehicles (read-only telemetry analysis only)</li>
        <li>Hardware development beyond sensor integration protocols for real time support</li>
        <li>Commercial deployment or production-grade system hardening for enterprise use</li>
        <li>ThingSpeak integration for cloud-based sensor streaming and historical data access</li>
      </ul>
    </SectionPage>
  );
}

export default Evaluation;
