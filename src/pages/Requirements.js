import SectionPage from '../components/SectionPage';

function Requirements() {
  return (
    <SectionPage title="Requirements">
      <p>
        Functional and non-functional requirements for the F1 Jarvis TORCS platform, derived from
        stakeholder analysis with UCL Racing Formula Student, competitive sim racers, and the
        project supervisors.
      </p>

      <h2>Scope</h2>
      <div className="scope-grid">
        <div className="scope-box scope-box--in">
          <div className="scope-box__title">In Scope</div>
          <ul>
            <li>CAN bus telemetry ingestion from UCL Racing vehicle</li>
            <li>TORCS simulator live telemetry via UDP</li>
            <li>Assetto Corsa integration via shared memory</li>
            <li>2D real-time telemetry dashboard</li>
            <li>Post-race replay and multi-lap comparison</li>
            <li>InfluxDB time-series storage</li>
            <li>FastAPI microservice architecture</li>
            <li>IBM Granite LLM fine-tuning for motorsport</li>
            <li>AI Race Engineer with vocal output</li>
            <li>VR platform in Unreal Engine 5</li>
          </ul>
        </div>
        <div className="scope-box scope-box--out">
          <div className="scope-box__title">Out of Scope</div>
          <ul>
            <li>Integration with proprietary F1 data sources</li>
            <li>Simulators beyond TORCS and Assetto Corsa</li>
            <li>Real-time control commands to vehicles (read-only)</li>
            <li>Commercial deployment or enterprise hardening</li>
            <li>TORCS in-game overlay (future enhancement)</li>
            <li>ThingSpeak cloud integration</li>
            <li>Hardware development beyond sensor protocols</li>
          </ul>
        </div>
      </div>

      <h2>Functional Requirements</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Requirement</th>
            <th>Priority</th>
            <th>Acceptance Criteria</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FR1</td>
            <td>Ingest real-time CAN bus data from Formula Student sensors</td>
            <td><span className="badge badge--high">High</span></td>
            <td>Parse CAN messages; validate data integrity; ≥99% frame reception</td>
          </tr>
          <tr>
            <td>FR2</td>
            <td>Extract telemetry from TORCS simulator during live sessions</td>
            <td><span className="badge badge--high">High</span></td>
            <td>Extract vehicle telemetry; accuracy &gt;95%; latency &lt;200ms</td>
          </tr>
          <tr>
            <td>FR3</td>
            <td>Extract telemetry from Assetto Corsa via network protocol</td>
            <td><span className="badge badge--high">High</span></td>
            <td>Decode AC protocol; extract core metrics; support multi-car scenarios</td>
          </tr>
          <tr>
            <td>FR4</td>
            <td>Normalise heterogeneous telemetry sources into unified schema</td>
            <td><span className="badge badge--medium">Medium</span></td>
            <td>Parse TORCS, AC, CAN formats into common structure</td>
          </tr>
          <tr>
            <td>FR5</td>
            <td>Store telemetry in time-series database with efficient indexing</td>
            <td><span className="badge badge--medium">Medium</span></td>
            <td>Ingest ≥1000 data points/sec; query performance &lt;100ms</td>
          </tr>
          <tr>
            <td>FR6</td>
            <td>2D dashboard displays real-time telemetry with live refresh</td>
            <td><span className="badge badge--high">High</span></td>
            <td>All metrics visible; refresh rate ≥1 Hz; &lt;500ms latency</td>
          </tr>
          <tr>
            <td>FR7</td>
            <td>Post-race replay with scrubbing and multi-lap comparison</td>
            <td><span className="badge badge--medium">Medium</span></td>
            <td>Playback sessions; overlay multiple laps for comparison</td>
          </tr>
          <tr>
            <td>FR8</td>
            <td>AI Race Engineer generates strategic recommendations</td>
            <td><span className="badge badge--high">High</span></td>
            <td>Recommendations aligned with race situation; contextually relevant</td>
          </tr>
          <tr>
            <td>FR9</td>
            <td>AI Race Engineer provides real-time vocal output</td>
            <td><span className="badge badge--high">High</span></td>
            <td>Natural speech; &lt;2 sec latency</td>
          </tr>
          <tr>
            <td>FR10</td>
            <td>Conversational telemetry query interface</td>
            <td><span className="badge badge--medium">Medium</span></td>
            <td>Accept open-ended questions; generate accurate responses; &gt;85% accuracy</td>
          </tr>
          <tr>
            <td>FR11</td>
            <td>VR platform renders interactive 3D car model</td>
            <td><span className="badge badge--high">High</span></td>
            <td>Load 3D CAD model; render at &gt;60 FPS</td>
          </tr>
        </tbody>
      </table>

      <h2>Non-Functional Requirements</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Requirement</th>
            <th>Category</th>
            <th>Acceptance Criteria</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NFR1</td>
            <td>End-to-end latency from sensor to visualisation</td>
            <td>Performance</td>
            <td>&lt;500ms for CAN/TORCS</td>
          </tr>
          <tr>
            <td>NFR2</td>
            <td>Data throughput capacity</td>
            <td>Performance</td>
            <td>≥1000 telemetry samples/sec</td>
          </tr>
          <tr>
            <td>NFR3</td>
            <td>VR platform frame rate minimum</td>
            <td>Performance</td>
            <td>&gt;60 FPS standard; &gt;90 FPS for VR headsets</td>
          </tr>
          <tr>
            <td>NFR4</td>
            <td>AI response latency</td>
            <td>Performance</td>
            <td>&lt;3 sec for recommendations</td>
          </tr>
          <tr>
            <td>NFR5</td>
            <td>UI intuitiveness for non-technical users</td>
            <td>Usability</td>
            <td>&gt;85% task completion; SUS score &gt;70</td>
          </tr>
          <tr>
            <td>NFR6</td>
            <td>System modularity and extensibility</td>
            <td>Maintainability</td>
            <td>Component replacement without full redesign</td>
          </tr>
          <tr>
            <td>NFR7</td>
            <td>Code quality and documentation</td>
            <td>Maintainability</td>
            <td>Minimum 80% test coverage; comprehensive documentation</td>
          </tr>
        </tbody>
      </table>

      <h2>Constraints & Assumptions</h2>
      <h3>Constraints</h3>
      <ul>
        <li>Project deadline: 27th March 2026</li>
        <li>Limited budget — free/academic tier APIs only</li>
        <li>VR hardware availability on campus</li>
        <li>Formula Student data access dependent on team cooperation and testing schedule alignment</li>
      </ul>
      <h3>Assumptions</h3>
      <ul>
        <li>TORCS and Assetto Corsa telemetry APIs remain accessible throughout development</li>
        <li>IBM Granite available via academic programme</li>
        <li>UCL Formula Student provides sample CAN bus and CAD data, or Proteus platform serves as substitute</li>
      </ul>
    </SectionPage>
  );
}

export default Requirements;
