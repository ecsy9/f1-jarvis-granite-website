import SectionPage from '../components/SectionPage';

function Testing() {
  return (
    <SectionPage title="Testing">
      <p>
        Comprehensive testing strategy for F1 Jarvis Granite, covering automated unit, component,
        integration, system, and user acceptance tests with full regression evidence.
      </p>

      {/* ── 1. Testing Strategy ────────────────────────────────── */}
      <h2>Testing Strategy</h2>

      <h3>Objectives</h3>
      <ul>
        <li>Verify correctness of telemetry processing, AI guardrails, export/import workflows, and runtime safety checks.</li>
        <li>Catch regressions early with automated tests in CI.</li>
        <li>Keep manual tests for environment-specific and end-to-end user interaction checks.</li>
      </ul>

      <h3>Test Pyramid</h3>
      <div className="info-cards">
        <div className="info-card">
          <div className="info-card__label">Unit Tests</div>
          <div className="info-card__value">Fast checks of small logic units &mdash; <code>LapBuffer</code>, model formatting, parsing/normalisation helpers</div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Component Tests</div>
          <div className="info-card__value">Module-level behaviour with controlled dependencies &mdash; telemetry loader, local LLM wrappers, race engineer guardrails</div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Integration Tests</div>
          <div className="info-card__value">Multi-module workflows with real SQLite/filesystem interactions &mdash; session export/import/load</div>
        </div>
        <div className="info-card">
          <div className="info-card__label">System Tests</div>
          <div className="info-card__value">End-to-end automated smoke path plus manual runtime environment checks</div>
        </div>
        <div className="info-card">
          <div className="info-card__label">User Acceptance Tests</div>
          <div className="info-card__value">Executable user-story acceptance tests plus manual UAT cases with simulated testers</div>
        </div>
      </div>

      <h3>Automation and Regression Policy</h3>
      <ul>
        <li>Test runner: <code>pytest</code> with markers configured in <code>pytest.ini</code></li>
        <li>Default regression command: <code>pytest</code></li>
        <li>Included by default: <code>unit</code>, <code>component</code>, <code>integration</code>, automated <code>system</code>, automated <code>uat</code></li>
        <li>Excluded by default: <code>manual</code>, <code>slow</code></li>
        <li>CI automation: GitHub Actions workflow <code>.github/workflows/tests.yml</code> runs <code>pytest</code> on push and pull request</li>
      </ul>

      <h3>Latest Regression Evidence (26 March 2026)</h3>
      <div className="code-block">
        <code>{`pytest                        → 69 passed, 1 skipped
pytest -m "uat" -q            → 3 passed, 1 skipped, 66 deselected
pytest -m "system and not manual" -q
                              → 1 passed, 1 skipped, 68 deselected
RUN_ENVIRONMENT_CHECKS=1 pytest -m "system and manual" tests/test_environment.py -q
                              → 3 passed`}</code>
      </div>
      <p>
        The one skipped test set is expected: manual environment checks are intentionally opt-in.
      </p>

      {/* ── 2. Unit Testing ───────────────────────────────────── */}
      <h2>Unit Testing</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>Test Area</th>
            <th>Purpose</th>
            <th>Tool</th>
            <th>Method</th>
            <th>Result</th>
            <th>Analysis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lap buffering &amp; transition logic (<code>test_lap_buffer.py</code>)</td>
            <td>Prevent incorrect lap boundaries and corrupted per-lap sample state</td>
            <td><code>pytest</code></td>
            <td>Construct <code>LapBuffer</code>, feed synthetic lap samples, assert callback behaviour and state reset semantics</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Core lap state transitions are deterministic and correct for increment and reset paths</td>
          </tr>
          <tr>
            <td>Session/lap models (<code>test_session_models.py</code>)</td>
            <td>Ensure derived metrics (lap time, averages, consistency) are correct</td>
            <td><code>pytest</code>, <code>pandas</code></td>
            <td>Build synthetic telemetry DataFrames, assert normalised times and summary metrics</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Core model calculations are stable and suitable for downstream analysis</td>
          </tr>
          <tr>
            <td>Local LLM wrapper/fallback (<code>test_local_llm.py</code>)</td>
            <td>Validate deterministic behaviour and safe fallback without real model dependency</td>
            <td><code>pytest</code>, mocks</td>
            <td>Mock model loading/completion, assert prompt formatting, truncation, fallback behaviour</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Live AI path has deterministic fallback and robust prompt handling</td>
          </tr>
        </tbody>
      </table>

      {/* ── 3. Component Testing ──────────────────────────────── */}
      <h2>Component Testing</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>Test Area</th>
            <th>Purpose</th>
            <th>Tool</th>
            <th>Method</th>
            <th>Result</th>
            <th>Analysis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Telemetry validation/loading (<code>test_telemetry_loader_component.py</code>)</td>
            <td>Prevent malformed telemetry files entering the pipeline</td>
            <td><code>pytest</code>, temp files</td>
            <td>Write controlled CSV/JSON test data, load via component API, assert parsed metadata/laps/commentary</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Loader handles valid inputs and rejects missing required columns</td>
          </tr>
          <tr>
            <td>Telemetry event rules (<code>test_telemetry_agent_rules.py</code>)</td>
            <td>Ensure critical race events are emitted correctly</td>
            <td><code>pytest</code></td>
            <td>Build telemetry snapshots and context; assert expected events and payload fields</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Rule-based event detection is consistent for key safety/performance conditions</td>
          </tr>
          <tr>
            <td>Race engineer guardrails (<code>test_race_engineer_guardrails.py</code>)</td>
            <td>Prevent hallucinated/unsafe responses and enforce pit/fallback rules</td>
            <td><code>pytest</code></td>
            <td>Execute guardrail checks over representative prompts and context states</td>
            <td><span className="badge badge--low">Pass (25 passed)</span></td>
            <td>Prompt conditioning and fallback safeguards are strongly covered</td>
          </tr>
          <tr>
            <td>Post-race local/HF clients (<code>test_postrace_local_client.py</code>, <code>test_postrace_hf_health.py</code>)</td>
            <td>Validate model client behaviour and error handling paths</td>
            <td><code>pytest</code>, <code>pytest-asyncio</code></td>
            <td>Mock completion/HTTP responses, assert output shape, finish reasons, health probe handling</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>AI client interfaces are stable and failure-aware</td>
          </tr>
        </tbody>
      </table>

      {/* ── 4. Integration Testing ────────────────────────────── */}
      <h2>Integration Testing</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>Test Area</th>
            <th>Purpose</th>
            <th>Tool</th>
            <th>Method</th>
            <th>Result</th>
            <th>Analysis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CSV roundtrip (<code>test_session_exporter_integration.py</code>)</td>
            <td>Validate end-to-end export &rarr; load interoperability</td>
            <td><code>pytest</code>, SQLite, filesystem</td>
            <td>Seed real DB rows, export session files, load with <code>TelemetryLoader</code>, assert metadata/laps/commentary</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Data format contracts between exporter and loader are intact</td>
          </tr>
          <tr>
            <td>Bundle export/import</td>
            <td>Ensure portable sharing workflow works across databases</td>
            <td><code>pytest</code>, SQLite</td>
            <td>Export <code>.jsession</code> bundle from source DB, import into fresh target DB, validate session visibility</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Session sharing flow is reliable</td>
          </tr>
          <tr>
            <td>Schema evolution compatibility</td>
            <td>Protect against schema drift on telemetry columns</td>
            <td><code>pytest</code>, SQLite DDL</td>
            <td>Add camber columns in source, export/import bundle, assert target schema and values preserved</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Import path handles additional telemetry columns safely</td>
          </tr>
        </tbody>
      </table>

      <h3>Regression Tooling</h3>
      <ul>
        <li>Framework: <code>pytest</code>, <code>pytest-asyncio</code></li>
        <li>Deterministic test setup: environment defaults + hardware mocking in <code>tests/conftest.py</code></li>
        <li>CI: <code>.github/workflows/tests.yml</code></li>
        <li>Test dependency lock for CI includes <code>PyQt5</code> in <code>requirements-test.txt</code> to avoid unintended skipping of the guardrail suite</li>
      </ul>

      {/* ── 5. Compatibility Testing ──────────────────────────── */}
      <h2>Compatibility Testing</h2>
      <p>
        This project is a desktop Python application with Windows-specific live Assetto Corsa integration
        and cross-platform non-live modules.
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Test</th>
            <th>Purpose</th>
            <th>Tool</th>
            <th>Method</th>
            <th>Result</th>
            <th>Analysis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Python/runtime compatibility (<code>test_environment.py</code>)</td>
            <td>Ensure minimum interpreter support</td>
            <td><code>pytest</code></td>
            <td>Manual environment check suite with <code>RUN_ENVIRONMENT_CHECKS=1</code></td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Runtime requirement (&ge;3.10) is enforced</td>
          </tr>
          <tr>
            <td>Dependency import compatibility</td>
            <td>Ensure required runtime libs load in target setup</td>
            <td><code>pytest</code></td>
            <td>Manual environment checks import <code>PyQt5</code>, <code>matplotlib</code>, <code>numpy</code>, <code>pydantic</code>, <code>httpx</code></td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Core dependency set is importable in the current environment</td>
          </tr>
          <tr>
            <td>Platform constraint</td>
            <td>Guard Windows-only live telemetry path</td>
            <td><code>pytest</code>, <code>platform</code></td>
            <td>Assert <code>platform.system() == "Windows"</code> in manual system checks</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Live AC integration is correctly scoped to supported OS</td>
          </tr>
          <tr>
            <td>CI Linux compatibility</td>
            <td>Ensure non-live logic works in standard CI environment</td>
            <td>GitHub Actions</td>
            <td><code>ubuntu-latest</code> runner executes <code>pytest</code> on every push/PR</td>
            <td><span className="badge badge--low">Active</span></td>
            <td>Core automated suites are validated in CI continuously</td>
          </tr>
        </tbody>
      </table>
      <div className="design-decision">
        <strong>Conclusion:</strong> Compatibility coverage is appropriate for a Windows-first desktop app,
        with CI validating cross-platform non-live logic. Responsive design testing is not applicable as
        this is a native desktop application, not a browser-based UI.
      </div>

      {/* ── 6. Performance Testing ────────────────────────────── */}
      <h2>Performance Testing</h2>

      <h3>Automated Stress Checks</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Test</th>
            <th>Purpose</th>
            <th>Tool</th>
            <th>Method</th>
            <th>Result</th>
            <th>Analysis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Telemetry event loop throughput</td>
            <td>Validate event detector runs comfortably under high update rates</td>
            <td>Python script (<code>time.perf_counter</code>)</td>
            <td>10,000 calls to <code>TelemetryAgent.detect_events(...)</code></td>
            <td><strong>0.0035 ms/call</strong></td>
            <td>Event detection is well below real-time budget</td>
          </tr>
          <tr>
            <td>Session export stress</td>
            <td>Validate repeated export robustness/latency</td>
            <td>Python script + real SQLite DB</td>
            <td>20 repeated <code>export_session(...)</code> calls with 2,000 telemetry rows</td>
            <td><strong>27.84 ms/export</strong></td>
            <td>Export path is performant for moderate session sizes</td>
          </tr>
          <tr>
            <td>Bundle export stress</td>
            <td>Validate archive generation cost</td>
            <td>Python script</td>
            <td>20 repeated <code>export_session_bundle(...)</code> calls</td>
            <td><strong>41.20 ms/export</strong></td>
            <td>Bundle creation is efficient for tested workload</td>
          </tr>
          <tr>
            <td>Bundle import stress</td>
            <td>Validate repeated import stability</td>
            <td>Python script</td>
            <td>20 repeated <code>import_session_bundle(...)</code> calls</td>
            <td><strong>37.15 ms/import</strong></td>
            <td>Import path is stable and fast under repeated execution</td>
          </tr>
        </tbody>
      </table>

      <h3>Existing Performance Evidence</h3>
      <ul>
        <li>Rule-based event detection: <strong>&lt;5 ms</strong> typical</li>
        <li>Live LLM proactive responses: <strong>1&ndash;3 s</strong></li>
        <li>Full voice query round-trip: <strong>5&ndash;12 s</strong></li>
      </ul>
      <div className="design-decision">
        <strong>Conclusion:</strong> Tested paths meet intended latency targets for local desktop operation.
        For highest rigour, future work should add automated threshold assertions for these latency budgets in CI.
      </div>

      {/* ── 7. Prompt Testing ─────────────────────────────────── */}
      <h2>Prompt Testing</h2>
      <p>
        Prompt behaviour is critical because the system includes live race engineer generation and
        post-race analysis prompts.
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Test Area</th>
            <th>Purpose</th>
            <th>Tool</th>
            <th>Method</th>
            <th>Result</th>
            <th>Analysis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Guardrail prompt-context pruning (<code>test_race_engineer_guardrails.py</code>)</td>
            <td>Ensure prompt context includes relevant data and excludes misleading fields</td>
            <td><code>pytest</code></td>
            <td>Query-specific context tests (pit, tyre, gap, unmatched queries)</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Prompt context selection is robust and query-aware</td>
          </tr>
          <tr>
            <td>Hallucination prevention (<code>_has_ungrounded_numbers</code>)</td>
            <td>Reduce fabricated numerical outputs</td>
            <td><code>pytest</code></td>
            <td>Feed grounded/ungrounded responses and assert guardrail decisions</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Numeric grounding checks are functioning</td>
          </tr>
          <tr>
            <td>Pit-fallback enforcement (<code>_should_force_pit_fallback</code>)</td>
            <td>Ensure safe deterministic fallback when evidence is insufficient</td>
            <td><code>pytest</code></td>
            <td>Validate fallback triggers for weak pit responses</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Safety fallback behaviour is deterministic</td>
          </tr>
          <tr>
            <td>Local model prompt formatting (<code>test_local_llm.py</code>, <code>test_postrace_local_client.py</code>)</td>
            <td>Ensure Granite role template is correctly formed with no malformed prompt leakage</td>
            <td><code>pytest</code>, mocks</td>
            <td>Assert role markers, truncation behaviour, and cleaned output</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Prompt formatting and cleanup paths are correct</td>
          </tr>
        </tbody>
      </table>
      <p>
        Additional evidence: <code>pytest tests/test_race_engineer_guardrails.py -q</code> &rarr; <strong>25 passed in 0.14s</strong>
      </p>
      <div className="design-decision">
        <strong>Conclusion:</strong> Prompt-level reliability is tested both structurally (template correctness)
        and behaviourally (guardrails/fallbacks).
      </div>

      {/* ── 8. User Acceptance Testing ────────────────────────── */}
      <h2>User Acceptance Testing</h2>

      <h3>Simulated Testers</h3>
      <p>
        Simulated testers were used to emulate realistic stakeholders:
      </p>
      <div className="profile-cards">
        <div className="profile-card">
          <div className="profile-card__title">Driver Persona</div>
          <div className="profile-card__body">
            <p><strong>Goal:</strong> Validate lap review and coaching usefulness</p>
            <p><strong>Feedback:</strong> Requested concise fallback phrasing during critical race moments. Current fallback responses are concise and deterministic.</p>
          </div>
        </div>
        <div className="profile-card">
          <div className="profile-card__title">Analyst Persona</div>
          <div className="profile-card__body">
            <p><strong>Goal:</strong> Validate post-race data integrity and interpretability</p>
            <p><strong>Feedback:</strong> Requested confidence that imported sessions preserve key telemetry fields. Integration and UAT import tests confirm this.</p>
          </div>
        </div>
        <div className="profile-card">
          <div className="profile-card__title">New User Persona</div>
          <div className="profile-card__body">
            <p><strong>Goal:</strong> Validate session sharing workflow clarity</p>
            <p><strong>Feedback:</strong> Requested clear success criteria for share/import. UAT-03 explicitly validates file creation and import visibility.</p>
          </div>
        </div>
      </div>

      <h3>UAT Test Cases</h3>
      <p>
        Manual UAT definitions are in <code>tests/manual/UAT_TEST_CASES.md</code>, and executable UAT
        checks are in <code>tests/test_uat_acceptance.py</code>.
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>UAT Case</th>
            <th>Purpose</th>
            <th>Tool</th>
            <th>Method</th>
            <th>Result</th>
            <th>Analysis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>UAT-01: Driver can review lap performance</td>
            <td>Confirms core post-race value proposition</td>
            <td><code>pytest</code> + manual</td>
            <td>Seed session &rarr; list metadata &rarr; export &rarr; load &rarr; assert lap telemetry fields and fastest lap availability</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Session browsing and lap inspection behaviour is validated</td>
          </tr>
          <tr>
            <td>UAT-02: Driver receives understandable coaching</td>
            <td>Ensures user-facing AI output is actionable and non-garbled</td>
            <td><code>pytest</code></td>
            <td>Invoke fallback AI path with race query, assert meaningful wording and no template tokens</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>User-facing response format is understandable and safe</td>
          </tr>
          <tr>
            <td>UAT-03: Session sharing via bundle</td>
            <td>Confirms collaboration/portability workflow</td>
            <td><code>pytest</code> + manual</td>
            <td>Export <code>.jsession</code> &rarr; import into fresh DB &rarr; verify imported session visibility</td>
            <td><span className="badge badge--low">Pass</span></td>
            <td>Sharing workflow meets acceptance criteria</td>
          </tr>
        </tbody>
      </table>

      <h3>Project Partner Feedback</h3>
      <p>
        As of 26 March 2026, no external project-partner feedback artifact is stored in-repo.
        To close this gap for assessment, at least one dated partner/proxy-partner review should be
        recorded using <code>tests/manual/TEST_EXECUTION_LOG_TEMPLATE.md</code> with explicit quote/feedback
        item, affected feature, action taken, and retest outcome.
      </p>

      {/* ── 9. Reproducibility ────────────────────────────────── */}
      <h2>Reproducibility</h2>
      <p>All test suites can be reproduced with the following commands:</p>
      <div className="code-block">
        <code>{`# Full regression suite
pytest

# UAT-only automated checks
pytest -m "uat" -q

# Automated system smoke checks
pytest -m "system and not manual" -q

# Manual environment compatibility checks
RUN_ENVIRONMENT_CHECKS=1 pytest -m "system and manual" tests/test_environment.py -q`}</code>
      </div>
    </SectionPage>
  );
}

export default Testing;
