import SectionPage from '../components/SectionPage';

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
            <td>Ece</td>
          </tr>
          <tr>
            <td>2</td>
            <td>AI recommendations achieve &gt;85% accuracy on test scenarios</td>
            <td>Should</td>
            <td>✓</td>
            <td>Elinor, Athena</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Data integration functional from CAN bus and simulators to database</td>
            <td>Must</td>
            <td>✓</td>
            <td>Ece</td>
          </tr>
          <tr>
            <td>4</td>
            <td>IBM Granite with Jarvis orchestration operational with &lt;3 sec response times</td>
            <td>Could</td>
            <td>✕</td>
            <td>Eima</td>
          </tr>
          <tr>
            <td>5</td>
            <td>≥3 Formula Student members confirm value (SUS score &gt;70)</td>
            <td>Could</td>
            <td>✓</td>
            <td>Ece, Eima</td>
          </tr>
          <tr>
            <td>6</td>
            <td>VR platform renders 3D model with interactive telemetry at &gt;60 FPS</td>
            <td>Should</td>
            <td>✓</td>
            <td>Oltun, Eima</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Complete documentation enables system replication by a new team</td>
            <td>Should</td>
            <td>✓</td>
            <td>Eima</td>
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
            <th style={{ width: '120px' }}>Ece</th>
            <th style={{ width: '120px' }}>Eima</th>
            <th style={{ width: '120px' }}>Oltun</th>
            <th style={{ width: '120px' }}>Athena</th>
            <th style={{ width: '120px' }}>Elinor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Research and Experiments</td>
            <td>20%</td>
            <td>20%</td>
            <td>20%</td>
            <td>20%</td>
            <td>20%</td>
          </tr>
          <tr>
            <td>UI Design</td>
            <td>100%</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
          </tr>
          <tr>
            <td>Coding</td>
            <td>[%]</td>
            <td>[%]</td>
            <td>[%]</td>
            <td>[%]</td>
            <td>[%]</td>
          </tr>
          <tr>
            <td>Testing</td>
            <td>[%]</td>
            <td>[%]</td>
            <td>[%]</td>
            <td>[%]</td>
            <td>[%]</td>
          </tr>
          <tr>
            <td>
              <strong>Overall contribution</strong>
            </td>
            <td>
              <strong>[%]</strong>
            </td>
            <td>
              <strong>[%]</strong>
            </td>
            <td>
              <strong>[%]</strong>
            </td>
            <td>
              <strong>[%]</strong>
            </td>
            <td>
              <strong>[%]</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <p style={{ marginTop: '1rem' }}>Website</p>
      <table>
        <thead>
          <tr>
            <th>Work packages</th>
            <th style={{ width: '120px' }}>Ece</th>
            <th style={{ width: '120px' }}>Eima</th>
            <th style={{ width: '120px' }}>Oltun</th>
            <th style={{ width: '120px' }}>Athena</th>
            <th style={{ width: '120px' }}>Elinor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Website Template and Setup</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>50%</td>
            <td>50%</td>
          </tr>
          <tr>
            <td>Home</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>100%</td>
          </tr>
          <tr>
            <td>Video</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
          </tr>
          <tr>
            <td>Requirements</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>100%</td>
          </tr>
          <tr>
            <td>Research</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
          </tr>
          <tr>
            <td>Algorithms</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>100%</td>
          </tr>
          <tr>
            <td>UI Design</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>100%</td>
          </tr>
          <tr>
            <td>System Design</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
          </tr>
          <tr>
            <td>Implementation</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
          </tr>
          <tr>
            <td>Testing</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
            <td>[0–100%]</td>
          </tr>
          <tr>
            <td>Evaluation and Future Work</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>100%</td>
            <td>0%</td>
          </tr>
          <tr>
            <td>User and Deployment Manuals</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>100%</td>
            <td>0%</td>
          </tr>
          <tr>
            <td>Legal Issues</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>100%</td>
            <td>0%</td>
            </tr>
          <tr>
            <td>Blog and Monthly Video</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>100%</td>
            <td>0%</td>
          </tr>
          <tr>
            <td>
              <strong>Overall contribution</strong>
            </td>
            <td>
              <strong>[0–100%]</strong>
            </td>
            <td>
              <strong>[0–100%]</strong>
            </td>
            <td>
              <strong>[0–100%]</strong>
            </td>
            <td>
              <strong>[0–100%]</strong>
            </td>
            <td>
              <strong>[0–100%]</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Critical evaluation of the project</h2>
      <h3>User interface / user experience (if applicable)</h3>
      <p>The F1 Jarvis telemetry dashboard demonstrates strong UI/UX alignment with engineering users through a clear, information-dense layout, consistent visual hierarchy, and a professional dark theme that mirrors industry-standard tools. When running, real-time graph updates and populated panels provide effective feedback and support rapid performance analysis, indicating good responsiveness and functional clarity. However, the high density of similar visual elements and limited guidance for new users may increase cognitive load and reduce usability for those without prior experience.</p>

      <h3>Functionality</h3>
      <p>The F1 Jarvis TORCS project delivers strong feature completeness on core telemetry ingestion (CAN bus, TORCS), normalization, and real-time 2D dashboard, meeting most high-priority requirements with good accuracy and low latency in student/simulator tests. AI Race Engineer prototypes (Granite-powered recommendations and voice) and Assetto Corsa support show progress but lack full validation for accuracy, latency, and multi-car robustness, while VR remains basic without proven high-FPS under load. Real-world demos achieve reliable monitoring for engineers and sim racers but expose scalability and edge-case limits, hitting roughly 80–90% of requirements with more live testing needed for production-grade AI coaching.</p>

      <h3>Stability</h3>
      <p>The F1 Jarvis TORCS platform shows good reliability for core telemetry ingestion and 2D dashboard functions in controlled student and simulator tests, with stable frame reception and low latency under normal loads. Error handling is basic, struggling with common failure modes like noisy CAN data packet loss, protocol desync in Assetto Corsa multi-car runs, and occasional AI inference stalls or vocal glitches during high-demand scenarios. Overall, it lacks robust production-grade recovery (e.g., failover or graceful degradation), leaving it prone to interruptions in dynamic race conditions and requiring more stress testing for driver-trusted performance.</p>

      <h3>Efficiency</h3>
      <p>[Write a paragraph evaluating performance, latency, resource usage, and any optimisations.]</p>

      <h3>Compatibility</h3>
      <p>[Write a paragraph evaluating platform/tooling constraints and cross-environment support.]</p>

      <h3>Maintainability</h3>
      <p>[Write a paragraph evaluating code structure, modularity, documentation, and testing.]</p>

      <h3>Project management</h3>
      <p>[Write a paragraph evaluating planning, prioritisation (MoSCoW), teamwork, and delivery.]</p>

      <h2>Future work</h2>
      <ul>
        <li>Integration with professional Formula 1 systems or proprietary F1 data sources</li>
        <li>Support for racing simulators beyond TORCS and Assetto Corsa (though modular architecture permits future expansion)</li>
        <li>Real-time control commands sent back to vehicles (read-only telemetry analysis only)</li>
        <li>Hardware development beyond sensor integration protocols for real time support</li>
        <li>Commercial deployment or production-grade system hardening for enterprise use</li>
        <li>TORCS in-game overlay (designated as extension/enhancement, included in documentation for future implementation post-deadline)</li>
        <li>ThingSpeak integration for cloud-based sensor streaming and historical data access</li>
      </ul>
    </SectionPage>
  );
}

export default Evaluation;
