import SectionPage from '../components/SectionPage';

function Testing() {
  return (
    <SectionPage title="Testing">
      <p>
        Testing strategy for the F1 Jarvis Granite platform, covering unit tests, integration tests,
        performance benchmarks, and user evaluation.
      </p>

      <h2>Test Data Sources</h2>
      <ul>
        <li>Synthetic telemetry generated for unit tests</li>
        <li>Real TORCS and Assetto Corsa session recordings</li>
        <li>Proteus simulator data (Formula Student substitute)</li>
        <li>Formula Student CAN bus data (if available during testing windows)</li>
        <li>Public motorsport datasets via FastF1</li>
      </ul>
      <p>All data is anonymised per GDPR requirements before use in tests.</p>

      <h2>Performance Requirements</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Metric</th>
            <th>Target</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CAN bus / TORCS pipeline</td>
            <td>End-to-end latency</td>
            <td>&lt;500ms sensor to visualisation</td>
          </tr>
          <tr>
            <td>Data ingestion</td>
            <td>Throughput</td>
            <td>≥1000 telemetry samples/sec</td>
          </tr>
          <tr>
            <td>InfluxDB queries</td>
            <td>Query response time</td>
            <td>&lt;100ms</td>
          </tr>
          <tr>
            <td>AI Race Engineer</td>
            <td>Recommendation latency</td>
            <td>&lt;3 sec</td>
          </tr>
          <tr>
            <td>Vocal AI output</td>
            <td>Speech latency</td>
            <td>&lt;2 sec</td>
          </tr>
          <tr>
            <td>VR platform</td>
            <td>Frame rate (standard)</td>
            <td>&gt;60 FPS</td>
          </tr>
          <tr>
            <td>VR platform</td>
            <td>Frame rate (headset)</td>
            <td>&gt;90 FPS</td>
          </tr>
        </tbody>
      </table>

      <h2>Test Types</h2>
      <h3>Unit Tests</h3>
      <p>
        Each module tested in isolation with synthetic data. Target: minimum 80% code coverage
        (NFR7). CAN bus parser, telemetry normaliser, and API endpoints each have dedicated
        test suites.
      </p>
      <h3>Integration Tests</h3>
      <p>
        End-to-end tests verifying data flows correctly from simulator/CAN bus through ingestion,
        storage, API, and into the 2D dashboard and AI layer.
      </p>
      <h3>Performance Benchmarks</h3>
      <p>
        Load tests simulating peak telemetry throughput (≥1000 samples/sec) and concurrent user
        queries to the AI Race Engineer to validate latency targets.
      </p>
      <h3>User Testing</h3>
      <p>
        Qualitative and quantitative sessions with at least 3 Formula Student team members.
        System Usability Scale (SUS) questionnaire administered after each session; target
        score &gt;70 (NFR5).
      </p>

      <h2>CI/CD Pipeline</h2>
      <p>
        Automated test runs triggered on each pull request via GitHub Actions. Builds must pass
        all unit and integration tests before merging to main. Coverage reports generated
        and tracked across sprints.
      </p>
    </SectionPage>
  );
}

export default Testing;
