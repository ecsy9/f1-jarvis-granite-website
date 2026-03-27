import { useState } from 'react';
import SectionPage from '../components/SectionPage';
import './Algorithms.css';

const TABS = ['Whole System', 'Data Pipeline', 'AI Pipeline', 'VR'];

function SystemDesign() {
  const [activeTab, setActiveTab] = useState('Whole System');

  return (
    <SectionPage
      title="System Design"
      activeTab={activeTab}
      sectionTabs={TABS}
      onSectionChange={setActiveTab}
    >
      <div className="algo-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`algo-tab${activeTab === tab ? ' algo-tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Whole System' && (<>
      <p>
        The system flows from Assetto Corsa telemetry through deterministic data processing,
        LLM-powered responses, persistent storage, and finally post-race analysis or VR
        visualization. Use the tabs above to explore each subsystem in detail.
      </p>

      <h2>Overall System Architecture</h2>
      <div className="arch-diagram">
        {/* Source */}
        <div className="arch-node arch-node--game">
          <div className="arch-node__header">
            <span className="arch-node__title">Assetto Corsa Game</span>
          </div>
          <div className="arch-node__sub">Windows Shared Memory @ 60 Hz</div>
        </div>

        <div className="arch-connector">
          <div className="arch-connector__line" />
          <div className="arch-connector__label">ctypes mmap read</div>
          <div className="arch-connector__arrow" />
        </div>

        {/* Data Pipeline */}
        <div className="arch-node arch-node--live">
          <div className="arch-node__header">
            <span className="arch-node__title">Data Pipeline</span>
            <span className="arch-badge arch-badge--thread">Live · Deterministic</span>
          </div>
          <ul className="arch-node__bullets">
            <li>AcTelemetryWorker — read, validate, normalize @ 60 Hz</li>
            <li>TelemetryAgent — 10 event detection rules · &lt;50ms latency</li>
          </ul>
        </div>

        {/* Fan-out to 3 consumers */}
        <div className="arch-fanout-wrap">
          <div className="arch-fanout-wrap__vline" />
          <div className="arch-fanout-wrap__label">UI Update · Events · Storage</div>
          <div className="arch-fanout-wrap__hbar" />
        </div>

        <div className="arch-row arch-row--3">
          {/* UI thread */}
          <div className="arch-col">
            <div className="arch-drop" />
            <div className="arch-node arch-node--ui">
              <div className="arch-node__header">
                <span className="arch-node__title">MainWindow</span>
                <span className="arch-badge arch-badge--ui">UI Thread</span>
              </div>
              <ul className="arch-node__bullets">
                <li>Live telemetry graphs</li>
                <li>Comms transcript</li>
              </ul>
            </div>
          </div>

          {/* AI Pipeline */}
          <div className="arch-col">
            <div className="arch-drop" />
            <div className="arch-node arch-node--live">
              <div className="arch-node__header">
                <span className="arch-node__title">AI Pipeline</span>
                <span className="arch-badge arch-badge--red">Live · LLM</span>
              </div>
              <ul className="arch-node__bullets">
                <li>AIRaceEngineerWorker</li>
                <li>RaceEngineerAgent (LLM)</li>
                <li>LocalLLMInference (Granite)</li>
                <li>TTSOutputWorker (Kokoro)</li>
                <li>VoiceInputWorker (Whisper)</li>
              </ul>
            </div>
            <div className="arch-vline-sm" />
            <div className="arch-node arch-node--worker">
              <div className="arch-node__header" style={{ justifyContent: 'center' }}>
                <span className="arch-node__title">🔊 Audio Out</span>
              </div>
            </div>
          </div>

          {/* Storage */}
          <div className="arch-col">
            <div className="arch-drop" />
            <div className="arch-node arch-node--worker">
              <div className="arch-node__header">
                <span className="arch-node__title">SessionRecorder</span>
                <span className="arch-badge arch-badge--thread">QThread</span>
              </div>
              <ul className="arch-node__bullets">
                <li>Batch SQLite writes</li>
                <li>Sessions, Laps, Telemetry</li>
                <li>AI Commentary, Voice</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SQLite */}
        <div className="arch-connector">
          <div className="arch-connector__line" />
          <div className="arch-connector__label">all threads → SQLite</div>
          <div className="arch-connector__arrow" />
        </div>

        <div className="arch-node arch-node--db">
          <div className="arch-node__header">
            <span className="arch-node__title">SQLite Data Persistence</span>
          </div>
          <ul className="arch-node__bullets">
            <li>Sessions · Laps · Telemetry samples</li>
            <li>AI Commentary · Voice Queries</li>
          </ul>
        </div>

        <div className="arch-connector">
          <div className="arch-connector__line" />
          <div className="arch-connector__arrow" />
        </div>

        {/* SessionExporter */}
        <div className="arch-node arch-node--viewer">
          <div className="arch-node__header">
            <span className="arch-node__title">SessionExporter</span>
            <span className="arch-badge arch-badge--post">CSV / Bundle</span>
          </div>
          <ul className="arch-node__bullets">
            <li>Exports telemetry + commentary</li>
            <li>Enables sharing &amp; archiving</li>
          </ul>
        </div>

        {/* Fan-out to 2 outputs */}
        <div className="arch-fanout-wrap">
          <div className="arch-fanout-wrap__vline" />
          <div className="arch-fanout-wrap__hbar" />
        </div>

        <div className="arch-row arch-row--2">
          <div className="arch-col">
            <div className="arch-drop" />
            <div className="arch-node arch-node--post">
              <div className="arch-node__header">
                <span className="arch-node__title">Post-Race Analysis</span>
                <span className="arch-badge arch-badge--post">Offline</span>
              </div>
              <ul className="arch-node__bullets">
                <li>Load from DB / CSV</li>
                <li>16 graphs · Lap comparison</li>
                <li>LLM debrief · Coaching</li>
              </ul>
            </div>
          </div>

          <div className="arch-col">
            <div className="arch-drop" />
            <div className="arch-node arch-node--viewer">
              <div className="arch-node__header">
                <span className="arch-node__title">VR Environment</span>
              </div>
              <ul className="arch-node__bullets">
                <li>Live telemetry feed</li>
                <li>AI commentary</li>
                <li>Exported session data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </>)}

      {activeTab === 'Data Pipeline' && (<>
      <p>
        This tab covers how telemetry travels from Assetto Corsa's shared memory through
        validation, rule-based event detection, and into persistent storage. The pipeline is
        entirely deterministic — no LLM or voice model is involved. AI inference begins only
        after a validated event is emitted; that handoff is covered in the AI Pipeline tab.
      </p>

      <h2>System Architecture</h2>
      <p>
        The data pipeline follows a <strong>multi-threaded producer-consumer architecture</strong>{' '}
        with Qt signal-slot decoupling. A single producer thread reads AC shared memory at 60 Hz
        and fans out via signals to three independent consumers: the UI, the AI worker (for event
        detection), and the session recorder.
      </p>
      <div className="arch-diagram">
        {/* Source */}
        <div className="arch-node arch-node--game">
          <div className="arch-node__header">
            <span className="arch-node__title">Assetto Corsa Game</span>
          </div>
          <div className="arch-node__sub">Windows Shared Memory</div>
        </div>

        {/* Arrow */}
        <div className="arch-connector">
          <div className="arch-connector__line" />
          <div className="arch-connector__label">ctypes mmap read @ 60 Hz</div>
          <div className="arch-connector__arrow" />
        </div>

        {/* AcTelemetryWorker */}
        <div className="arch-node arch-node--worker">
          <div className="arch-node__header">
            <span className="arch-node__title">AcTelemetryWorker</span>
            <span className="arch-badge arch-badge--thread">QThread</span>
          </div>
          <ul className="arch-node__bullets">
            <li>Reads 3 memory blocks — physics, graphics, static</li>
            <li>Validates and cleans telemetry at 60 Hz</li>
            <li>LapBuffer lap detection</li>
          </ul>
        </div>

        {/* Fan-out */}
        <div className="arch-fanout-wrap">
          <div className="arch-fanout-wrap__vline" />
          <div className="arch-fanout-wrap__label">realtime_sample (60 Hz) · lap_completed · session_info_update</div>
          <div className="arch-fanout-wrap__hbar" />
        </div>

        {/* Three consumers */}
        <div className="arch-row arch-row--3">
          <div className="arch-col">
            <div className="arch-drop" />
            <div className="arch-node arch-node--ui">
              <div className="arch-node__header">
                <span className="arch-node__title">MainWindow</span>
                <span className="arch-badge arch-badge--ui">UI Thread</span>
              </div>
              <ul className="arch-node__bullets">
                <li>Live telemetry graphs</li>
                <li>Lap overview</li>
              </ul>
            </div>
          </div>

          <div className="arch-col">
            <div className="arch-drop" />
            <div className="arch-node arch-node--worker">
              <div className="arch-node__header">
                <span className="arch-node__title">AIRaceEngineerWorker</span>
                <span className="arch-badge arch-badge--thread">QThread</span>
              </div>
              <ul className="arch-node__bullets">
                <li>TelemetryAgent</li>
                <li>Rule-based detection</li>
                <li>Statistical fallback</li>
              </ul>
            </div>
          </div>

          <div className="arch-col">
            <div className="arch-drop" />
            <div className="arch-node arch-node--worker">
              <div className="arch-node__header">
                <span className="arch-node__title">SessionRecorder</span>
                <span className="arch-badge arch-badge--thread">QThread</span>
              </div>
              <ul className="arch-node__bullets">
                <li>60-sample batch writes</li>
                <li>SQLite database</li>
              </ul>
            </div>
            <div className="arch-vline-sm" />
            <div className="arch-node arch-node--viewer">
              <div className="arch-node__header">
                <span className="arch-node__title">LapViewerWindow</span>
                <span className="arch-badge arch-badge--post">Post-Race</span>
              </div>
              <ul className="arch-node__bullets">
                <li>Session timeline</li>
                <li>16 graph types</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <h3>Data Components</h3>
      <table className="section-table">
        <thead>
          <tr><th>Component</th><th>Thread</th><th>Responsibility</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>AcTelemetryWorker</code></td>
            <td>Background QThread</td>
            <td>Reads AC shared memory at 60 Hz, validates and normalises data, detects lap boundaries via LapBuffer, emits Qt signals</td>
          </tr>
          <tr>
            <td><code>LapBuffer</code></td>
            <td>Inline (no thread)</td>
            <td>Monitors <code>completedLaps</code> counter; requires 10 consecutive stable frames before confirming a lap transition, then fires <code>on_lap_complete</code> callback</td>
          </tr>
          <tr>
            <td><code>TelemetryAgent</code></td>
            <td>Inside AIRaceEngineerWorker</td>
            <td>Threshold-and-cooldown rule engine — evaluates 10 detection rules per frame, returns <code>List[Event]</code> in under 50 ms. No LLM dependency.</td>
          </tr>
          <tr>
            <td><code>SessionRecorder</code></td>
            <td>Background QThread</td>
            <td>Buffers 60 telemetry samples, batch-inserts to SQLite via <code>executemany()</code>, records laps and session metadata</td>
          </tr>
          <tr>
            <td><code>MainWindow</code></td>
            <td>Main (UI) thread</td>
            <td>Receives signals, updates Matplotlib canvases at ~12 Hz, displays live data panels and lap table</td>
          </tr>
          <tr>
            <td><code>LapViewerWindow</code></td>
            <td>Main (UI) thread</td>
            <td>Loads recorded sessions from SQLite/CSV, provides timeline scrubber and 16 configurable graph types</td>
          </tr>
          <tr>
            <td><code>SessionExporter</code></td>
            <td>Plain class</td>
            <td>Reads sessions from SQLite, exports to CSV or <code>.jsession</code> bundles (ZIP), supports session sharing and import</td>
          </tr>
          <tr>
            <td><code>TelemetryLoader</code></td>
            <td>Plain class</td>
            <td>Deserialises exported CSV files back into <code>Session</code>/<code>Lap</code>/<code>pd.DataFrame</code> objects for the post-race viewer</td>
          </tr>
        </tbody>
      </table>

      <h2>Sequence Diagrams</h2>

      <h3>Real-Time Telemetry Flow (Per Frame)</h3>
      <div className="seq-diagram">
        <div className="seq-actors">
          <div className="seq-actor seq-actor--game">
            <span className="seq-actor__name">AC Game</span>
            <span className="seq-actor__type">Shared Memory</span>
          </div>
          <div className="seq-actor seq-actor--thread">
            <span className="seq-actor__name">AcTelemetry Worker</span>
            <span className="seq-actor__type">QThread</span>
          </div>
          <div className="seq-actor seq-actor--plain">
            <span className="seq-actor__name">LapBuffer</span>
            <span className="seq-actor__type">inline</span>
          </div>
          <div className="seq-actor seq-actor--ui">
            <span className="seq-actor__name">MainWindow</span>
            <span className="seq-actor__type">UI Thread</span>
          </div>
          <div className="seq-actor seq-actor--thread">
            <span className="seq-actor__name">Session Recorder</span>
            <span className="seq-actor__type">QThread</span>
          </div>
        </div>
        <div className="seq-body">
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--game">AC Game</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--thread">AcTelemetryWorker</span>
            <span className="seq-msg__label">: shared memory read</span>
            <span className="seq-msg__note">60 Hz</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">AcTelemetryWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--plain">LapBuffer</span>
            <span className="seq-msg__label">: add_sample()</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">AcTelemetryWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--ui">MainWindow</span>
            <span className="seq-msg__label">: emit realtime_sample</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">AcTelemetryWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--thread">SessionRecorder</span>
            <span className="seq-msg__label">: emit realtime_sample</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-note">[every 5 samples — ~12 Hz]</div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--ui">MainWindow</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">update canvases (Matplotlib)</span>
          </div>
          <div className="seq-note">[every 60 samples — batch flush]</div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">SessionRecorder</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">executemany() → SQLite batch insert</span>
          </div>
        </div>
      </div>

      <h3>Lap Completion Flow</h3>
      <div className="seq-diagram">
        <div className="seq-actors">
          <div className="seq-actor seq-actor--thread">
            <span className="seq-actor__name">AcTelemetry Worker</span>
            <span className="seq-actor__type">QThread</span>
          </div>
          <div className="seq-actor seq-actor--plain">
            <span className="seq-actor__name">LapBuffer</span>
            <span className="seq-actor__type">inline</span>
          </div>
          <div className="seq-actor seq-actor--ui">
            <span className="seq-actor__name">MainWindow</span>
            <span className="seq-actor__type">UI Thread</span>
          </div>
          <div className="seq-actor seq-actor--thread">
            <span className="seq-actor__name">Session Recorder</span>
            <span className="seq-actor__type">QThread</span>
          </div>
        </div>
        <div className="seq-body">
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">AcTelemetryWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--plain">LapBuffer</span>
            <span className="seq-msg__label">: lap_id incremented</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--plain">LapBuffer</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">wait 10 consecutive stable frames (~167 ms)</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--plain">LapBuffer</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--ui">MainWindow</span>
            <span className="seq-msg__label">: on_lap_complete callback</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">AcTelemetryWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--ui">MainWindow</span>
            <span className="seq-msg__label">: emit lap_completed</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--ui">MainWindow</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">add to lap table</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">AcTelemetryWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--thread">SessionRecorder</span>
            <span className="seq-msg__label">: emit lap_completed</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">SessionRecorder</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">record_lap() — SQLite INSERT</span>
          </div>
        </div>
      </div>

      <h3>Event Detection Flow (TelemetryAgent)</h3>
      <p>
        <code>TelemetryAgent</code> is entirely deterministic — it applies threshold rules to
        each telemetry frame and returns prioritised events in under 50 ms. No LLM is invoked
        at this stage. Emitted events are handed to <code>RaceEngineerAgent</code> for
        natural-language response generation (see AI Pipeline tab).
      </p>
      <div className="flow-diagram">
        <div className="flow-actor flow-actor--thread">
          <span className="flow-actor__name">AIRaceEngineerWorker</span>
          <span className="flow-actor__type">QThread — data processing stage</span>
        </div>
        <div className="flow-steps">
          <div className="flow-step">
            <span className="flow-step__text">receive <code>realtime_sample</code></span>
            <span className="flow-step__badge flow-step__badge--game">dict · 60 Hz</span>
          </div>
          <div className="flow-step">
            <span className="flow-step__text">convert dict → <code>TelemetryData</code></span>
            <span className="flow-step__badge">Pydantic validation</span>
          </div>
          <div className="flow-step">
            <span className="flow-step__text"><code>LiveSessionContext.update(telemetry)</code></span>
          </div>
          <div className="flow-step flow-step--branch">
            <span className="flow-step__text"><code>TelemetryAgent.detect_events(telemetry, context)</code></span>
            <span className="flow-step__badge flow-step__badge--timing">&lt; 50 ms</span>
          </div>
        </div>
        <div className="flow-sub">
          <div className="flow-sub__label">TelemetryAgent — 10 independent detection rules</div>
          <div className="flow-rule-grid">
            <div className="flow-rule">
              <span className="flow-rule__name">_check_fuel_events</span>
              <span className="flow-rule__cond">laps_remaining &le; 5 / 2</span>
            </div>
            <div className="flow-rule">
              <span className="flow-rule__name">_check_tire_temp_events</span>
              <span className="flow-rule__cond">any tire &ge; 100°C / 110°C</span>
            </div>
            <div className="flow-rule">
              <span className="flow-rule__name">_check_tire_wear_events</span>
              <span className="flow-rule__cond">any tire &ge; 70% / 85%</span>
            </div>
            <div className="flow-rule">
              <span className="flow-rule__name">_check_wheel_slip_events</span>
              <span className="flow-rule__cond">any slip &ge; 50 / 100</span>
            </div>
            <div className="flow-rule">
              <span className="flow-rule__name">_check_gap_events</span>
              <span className="flow-rule__cond">gap delta &ge; 1.0s</span>
            </div>
            <div className="flow-rule">
              <span className="flow-rule__name">_check_opponent_events</span>
              <span className="flow-rule__cond">gap_behind &le; 0.8s (hysteresis)</span>
            </div>
            <div className="flow-rule">
              <span className="flow-rule__name">_check_car_damage_events</span>
              <span className="flow-rule__cond">total damage &ge; 5% / 20%</span>
            </div>
            <div className="flow-rule">
              <span className="flow-rule__name">_check_position_change</span>
              <span className="flow-rule__cond">position != previous</span>
            </div>
            <div className="flow-rule">
              <span className="flow-rule__name">_check_lap_completion</span>
              <span className="flow-rule__cond">lap_number incremented</span>
            </div>
            <div className="flow-rule">
              <span className="flow-rule__name">_check_pit_window</span>
              <span className="flow-rule__cond">fuel &le; 5 laps OR wear &ge; 70%</span>
            </div>
          </div>
          <div className="flow-sub__return">→ return List[Event] · &lt; 50 ms total</div>
        </div>
        <div className="flow-router">
          <div className="flow-route flow-route--fallback">
            <span className="flow-route__cond">no events</span>
            <span className="flow-route__arrow">→</span>
            <span className="flow-route__dest">statistical fallback (CoV, summary stats — no AI)</span>
          </div>
          <div className="flow-route flow-route--ai">
            <span className="flow-route__cond">events</span>
            <span className="flow-route__arrow">→</span>
            <span className="flow-route__dest">RaceEngineerAgent → AI Pipeline tab</span>
          </div>
        </div>
      </div>

      <h2>Design Patterns</h2>
      <table className="section-table">
        <thead>
          <tr><th>Pattern</th><th>Where Used</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Observer (Signal-Slot)</strong></td>
            <td>All inter-thread communication</td>
            <td>PyQt5 signals decouple the telemetry producer from all consumers; adding a new consumer requires only connecting a new slot — no changes to the producer</td>
          </tr>
          <tr>
            <td><strong>Producer-Consumer</strong></td>
            <td><code>AcTelemetryWorker</code> &rarr; <code>MainWindow</code>, <code>SessionRecorder</code>, <code>AIWorker</code></td>
            <td>Single telemetry producer fans out to multiple independent consumers via Qt signal fan-out</td>
          </tr>
          <tr>
            <td><strong>Strategy</strong></td>
            <td><code>TelemetryAgent</code> detection rules</td>
            <td>Each <code>_check_*</code> method is an independent detection strategy; new rules are added without touching existing ones</td>
          </tr>
          <tr>
            <td><strong>Template Method</strong></td>
            <td>Backend workers</td>
            <td>All backends share the same <code>run()</code> structure: connect &rarr; poll &rarr; validate &rarr; emit; extending to a new simulator requires overriding only the read logic</td>
          </tr>
          <tr>
            <td><strong>Batch/Buffer</strong></td>
            <td><code>SessionRecorder</code> (60-sample batch), <code>LiveSessionContext</code> (600-sample deque)</td>
            <td>Amortise SQLite I/O cost (~50&times; vs per-sample inserts) and bound memory usage regardless of session length</td>
          </tr>
        </tbody>
      </table>

      <h2>Class Diagrams</h2>

      <h3>Data Layer</h3>
      <div className="cls-diagram">
        <div className="cls-grid cls-grid--2">
          <div className="cls-card cls-card--model">
            <div className="cls-card__name">
              <span className="cls-card__title">Session</span>
              <span className="cls-card__badge cls-card__badge--plain">data model</span>
            </div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--has">has</span><span className="cls-card__row-content">SessionMetadata</span><span className="cls-card__row-type">Pydantic</span></div>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--has">has</span><span className="cls-card__row-content">List[Lap]</span></div>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--has">has</span><span className="cls-card__row-content">pd.DataFrame</span><span className="cls-card__row-type">telemetry</span></div>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--has">has?</span><span className="cls-card__row-content">List[AIComment]</span></div>
              <div className="cls-divider"/>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--method">fn</span><span className="cls-card__row-content">get_lap()</span></div>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--method">fn</span><span className="cls-card__row-content">get_fastest_lap()</span></div>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--method">fn</span><span className="cls-card__row-content">calculate_consistency()</span></div>
            </div>
          </div>
          <div className="cls-card cls-card--model">
            <div className="cls-card__name">
              <span className="cls-card__title">Lap</span>
              <span className="cls-card__badge cls-card__badge--plain">data model</span>
            </div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--has">has</span><span className="cls-card__row-content">LapSummary</span><span className="cls-card__row-type">Pydantic</span></div>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--has">has</span><span className="cls-card__row-content">pd.DataFrame</span><span className="cls-card__row-type">lap telemetry</span></div>
              <div className="cls-divider"/>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--method">fn</span><span className="cls-card__row-content">get_speed_trace()</span></div>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--method">fn</span><span className="cls-card__row-content">get_racing_line()</span></div>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--method">fn</span><span className="cls-card__row-content">get_avg_tire_temps()</span></div>
            </div>
          </div>
        </div>
        <div className="cls-grid cls-grid--3">
          <div className="cls-card cls-card--qthread">
            <div className="cls-card__name">
              <span className="cls-card__title">Session Recorder</span>
              <span className="cls-card__badge cls-card__badge--thread">QThread</span>
            </div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--uses">uses</span><span className="cls-card__row-content">sqlite3.Connection</span></div>
              <div className="cls-card__row"><span className="cls-card__row-prefix">→</span><span className="cls-card__row-content">sessions, laps, telemetry</span></div>
              <div className="cls-card__row"><span className="cls-card__row-prefix">→</span><span className="cls-card__row-content">ai_commentary, voice_queries</span></div>
            </div>
          </div>
          <div className="cls-card cls-card--plain">
            <div className="cls-card__name">
              <span className="cls-card__title">Session Exporter</span>
              <span className="cls-card__badge cls-card__badge--plain">class</span>
            </div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--uses">uses</span><span className="cls-card__row-content">sqlite3 (reads)</span></div>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--produces">out</span><span className="cls-card__row-content">CSV / ZIP bundles</span></div>
              <div className="cls-divider"/>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--method">fn</span><span className="cls-card__row-content">list_sessions()</span></div>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--method">fn</span><span className="cls-card__row-content">export_session()</span></div>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--method">fn</span><span className="cls-card__row-content">export_session_bundle()</span></div>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--method">fn</span><span className="cls-card__row-content">import_session_bundle()</span></div>
            </div>
          </div>
          <div className="cls-card cls-card--plain">
            <div className="cls-card__name">
              <span className="cls-card__title">Telemetry Loader</span>
              <span className="cls-card__badge cls-card__badge--plain">class</span>
            </div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--uses">uses</span><span className="cls-card__row-content">pd.read_csv, JSON</span></div>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--produces">out</span><span className="cls-card__row-content">Session (from CSV)</span></div>
              <div className="cls-divider"/>
              <div className="cls-card__row"><span className="cls-card__row-prefix cls-card__row-prefix--method">fn</span><span className="cls-card__row-content">load_session(path)</span></div>
            </div>
          </div>
        </div>
      </div>

      <h3>Pydantic Data Models</h3>
      <div className="cls-diagram">
        <div className="cls-parent">
          <div className="cls-card cls-card--pydantic cls-card--center">
            <div className="cls-card__name">
              <span className="cls-card__title">pydantic.BaseModel</span>
              <span className="cls-card__badge cls-card__badge--pydantic">base class</span>
            </div>
          </div>
        </div>
        <div className="cls-connector">
          <div className="cls-connector__line"/>
          <div className="cls-connector__label">inherits ↓</div>
        </div>
        <div className="cls-section-label">Data Layer Models</div>
        <div className="cls-grid cls-grid--3">
          <div className="cls-card cls-card--pydantic">
            <div className="cls-card__name"><span className="cls-card__title">TireCorners</span></div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-content">fl, fr, rl, rr</span><span className="cls-card__row-type">: float</span></div>
            </div>
          </div>
          <div className="cls-card cls-card--pydantic">
            <div className="cls-card__name"><span className="cls-card__title">SessionMetadata</span></div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-content">session_id, game, track</span></div>
              <div className="cls-card__row"><span className="cls-card__row-content">car, player, times, laps</span></div>
            </div>
          </div>
          <div className="cls-card cls-card--pydantic">
            <div className="cls-card__name"><span className="cls-card__title">LapSummary</span></div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-content">lap_number, lap_time</span></div>
              <div className="cls-card__row"><span className="cls-card__row-content">fuel, speeds, valid</span></div>
            </div>
          </div>
        </div>
        <div className="cls-grid cls-grid--3">
          <div className="cls-card cls-card--pydantic">
            <div className="cls-card__name"><span className="cls-card__title">AIComment</span></div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-content">timestamp, message</span></div>
              <div className="cls-card__row"><span className="cls-card__row-content">trigger, priority, lap_number</span></div>
            </div>
          </div>
          <div className="cls-card cls-card--pydantic">
            <div className="cls-card__name"><span className="cls-card__title">BrakePoint</span></div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-content">distance, speed_before</span></div>
              <div className="cls-card__row"><span className="cls-card__row-content">speed_after, duration, pressure</span></div>
            </div>
          </div>
          <div className="cls-card cls-card--pydantic">
            <div className="cls-card__name"><span className="cls-card__title">Corner</span></div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-content">number, entry/apex/exit</span></div>
              <div className="cls-card__row"><span className="cls-card__row-content">distance+speed, type</span></div>
            </div>
          </div>
        </div>
        <div className="cls-section-label">Telemetry Snapshot Models</div>
        <div className="cls-grid cls-grid--4">
          <div className="cls-card cls-card--pydantic">
            <div className="cls-card__name"><span className="cls-card__title">TelemetryData</span></div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-content">full snapshot</span></div>
              <div className="cls-card__row"><span className="cls-card__row-content">with nested models</span></div>
            </div>
          </div>
          <div className="cls-card cls-card--pydantic">
            <div className="cls-card__name"><span className="cls-card__title">TireTemps</span></div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-content">fl, fr, rl, rr</span><span className="cls-card__row-type">≥ 0</span></div>
            </div>
          </div>
          <div className="cls-card cls-card--pydantic">
            <div className="cls-card__name"><span className="cls-card__title">TirePressure</span></div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-content">fl, fr, rl, rr</span><span className="cls-card__row-type">≥ 0</span></div>
            </div>
          </div>
          <div className="cls-card cls-card--pydantic">
            <div className="cls-card__name"><span className="cls-card__title">TireWear</span></div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-content">fl, fr, rl, rr</span><span className="cls-card__row-type">0–100</span></div>
            </div>
          </div>
        </div>
        <div className="cls-grid cls-grid--4">
          <div className="cls-card cls-card--pydantic">
            <div className="cls-card__name"><span className="cls-card__title">WheelSlip</span></div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-content">fl, fr, rl, rr</span><span className="cls-card__row-type">float</span></div>
            </div>
          </div>
          <div className="cls-card cls-card--pydantic">
            <div className="cls-card__name"><span className="cls-card__title">GForces</span></div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-content">lateral</span></div>
              <div className="cls-card__row"><span className="cls-card__row-content">longitudinal</span></div>
            </div>
          </div>
          <div className="cls-card cls-card--pydantic">
            <div className="cls-card__name"><span className="cls-card__title">RideHeight</span></div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-content">front, rear</span><span className="cls-card__row-type">float</span></div>
            </div>
          </div>
          <div className="cls-card cls-card--pydantic">
            <div className="cls-card__name"><span className="cls-card__title">SuspensionTravel</span></div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-content">fl, fr, rl, rr</span><span className="cls-card__row-type">float</span></div>
            </div>
          </div>
        </div>
        <div className="cls-section-label">Config</div>
        <div className="cls-parent">
          <div className="cls-card cls-card--pydantic cls-card--center">
            <div className="cls-card__name">
              <span className="cls-card__title">ThresholdsConfig</span>
              <span className="cls-card__badge cls-card__badge--pydantic">Pydantic</span>
            </div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-card__row-content">all event detection thresholds with defaults</span></div>
            </div>
          </div>
        </div>
      </div>

      <h2>Data Storage</h2>
      <p>
        The application uses a single SQLite file (<code>data/telemetry_sessions.db</code>).
        SQLite was chosen for zero configuration (no server process), portability (single file),
        adequate concurrency for single-writer with WAL mode, and performance (batch inserts
        handle 60 samples/second comfortably).
      </p>

      <h3>Entity-Relationship Diagram</h3>
      <div className="er-diagram">
        {/* Hub: sessions */}
        <div className="er-hub">
          <div className="er-table er-table--sessions">
            <div className="er-table__name">sessions</div>
            <div className="er-table__col"><span className="er-table__key er-table__key--pk">PK</span><span className="er-table__colname">session_id</span><span className="er-table__coltype">INTEGER</span></div>
            <div className="er-table__col"><span className="er-table__colname">start_time · end_time</span><span className="er-table__coltype">REAL</span></div>
            <div className="er-table__col"><span className="er-table__colname">game · track_name · car_model</span></div>
            <div className="er-table__col"><span className="er-table__colname">player_name · total_laps</span></div>
            <div className="er-table__col"><span className="er-table__colname">best_lap_time · total_distance</span></div>
            <div className="er-table__col"><span className="er-table__colname">ai_enabled · notes · session_type</span></div>
          </div>
        </div>
        {/* 1:N relationship strip */}
        <div className="er-rel-strip">
          <span className="er-rel-badge">1 : N</span>
          <span className="er-rel-badge">1 : N</span>
          <span className="er-rel-badge">1 : N</span>
          <span className="er-rel-badge">1 : N</span>
        </div>
        {/* Satellite tables */}
        <div className="er-grid er-grid--4">
          <div className="er-table er-table--laps">
            <div className="er-table__name">laps</div>
            <div className="er-table__col"><span className="er-table__key er-table__key--pk">PK</span><span className="er-table__colname">lap_id</span></div>
            <div className="er-table__col"><span className="er-table__key er-table__key--fk">FK</span><span className="er-table__colname">session_id</span></div>
            <div className="er-table__col"><span className="er-table__colname">lap_number · lap_time</span></div>
            <div className="er-table__col"><span className="er-table__colname">sector1/2/3_time</span></div>
            <div className="er-table__col"><span className="er-table__colname">valid · fuel_start/end</span></div>
            <div className="er-table__col"><span className="er-table__colname">avg/max/min_speed</span></div>
          </div>
          <div className="er-table er-table--telemetry">
            <div className="er-table__name">telemetry</div>
            <div className="er-table__col"><span className="er-table__key er-table__key--pk">PK</span><span className="er-table__colname">telemetry_id</span></div>
            <div className="er-table__col"><span className="er-table__key er-table__key--fk">FK</span><span className="er-table__colname">session_id</span></div>
            <div className="er-table__col"><span className="er-table__colname">lap_number · elapsed_time</span></div>
            <div className="er-table__col"><span className="er-table__colname">speed · gear · rpm</span></div>
            <div className="er-table__col"><span className="er-table__colname">throttle · brake · fuel</span></div>
            <div className="er-table__col"><span className="er-table__colname">tyre_temp/press/wear_*</span></div>
          </div>
          <div className="er-table er-table--commentary">
            <div className="er-table__name">ai_commentary</div>
            <div className="er-table__col"><span className="er-table__key er-table__key--pk">PK</span><span className="er-table__colname">commentary_id</span></div>
            <div className="er-table__col"><span className="er-table__key er-table__key--fk">FK</span><span className="er-table__colname">session_id</span></div>
            <div className="er-table__col"><span className="er-table__colname">timestamp · lap_number</span></div>
            <div className="er-table__col"><span className="er-table__colname">message · trigger</span></div>
            <div className="er-table__col"><span className="er-table__colname">priority</span></div>
          </div>
          <div className="er-table er-table--voice">
            <div className="er-table__name">voice_queries</div>
            <div className="er-table__col"><span className="er-table__key er-table__key--pk">PK</span><span className="er-table__colname">query_id</span></div>
            <div className="er-table__col"><span className="er-table__key er-table__key--fk">FK</span><span className="er-table__colname">session_id</span></div>
            <div className="er-table__col"><span className="er-table__colname">timestamp · lap_number</span></div>
            <div className="er-table__col"><span className="er-table__colname">query_text</span></div>
            <div className="er-table__col"><span className="er-table__colname">response_text</span></div>
          </div>
        </div>
      </div>
      <ul>
        <li><strong>sessions 1:N laps</strong> — Each session has many laps</li>
        <li><strong>sessions 1:N telemetry</strong> — Each session has ~60 &times; laps &times; lap_duration telemetry rows</li>
        <li><strong>sessions 1:N ai_commentary</strong> — Each session has 0–many AI messages</li>
        <li><strong>sessions 1:N voice_queries</strong> — Each session has 0–many voice Q&amp;A entries</li>
      </ul>

      <h3>Table Schemas</h3>

      <h4>sessions</h4>
      <table className="section-table">
        <thead>
          <tr><th>Column</th><th>Type</th><th>Constraints</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>session_id</td><td>INTEGER</td><td>PK AUTOINCREMENT</td><td>Unique session identifier</td></tr>
          <tr><td>start_time</td><td>REAL</td><td>NOT NULL</td><td>Unix timestamp of session start</td></tr>
          <tr><td>end_time</td><td>REAL</td><td>nullable</td><td>Unix timestamp of session end</td></tr>
          <tr><td>game</td><td>TEXT</td><td>NOT NULL</td><td>Game identifier (e.g., "ac")</td></tr>
          <tr><td>track_name</td><td>TEXT</td><td></td><td>Track name from shared memory</td></tr>
          <tr><td>car_model</td><td>TEXT</td><td></td><td>Car model from shared memory</td></tr>
          <tr><td>player_name</td><td>TEXT</td><td></td><td>Player name from shared memory</td></tr>
          <tr><td>total_laps</td><td>INTEGER</td><td>DEFAULT 0</td><td>Completed lap count</td></tr>
          <tr><td>best_lap_time</td><td>REAL</td><td></td><td>Best lap time (seconds)</td></tr>
          <tr><td>total_distance</td><td>REAL</td><td>DEFAULT 0.0</td><td>Total distance driven (metres)</td></tr>
          <tr><td>ai_enabled</td><td>INTEGER</td><td>DEFAULT 0</td><td>Whether AI was active (0/1)</td></tr>
          <tr><td>notes</td><td>TEXT</td><td></td><td>User-added session notes</td></tr>
          <tr><td>session_type</td><td>TEXT</td><td>DEFAULT ''</td><td>Session type (practice, race, etc.)</td></tr>
        </tbody>
      </table>

      <h4>laps</h4>
      <table className="section-table">
        <thead>
          <tr><th>Column</th><th>Type</th><th>Constraints</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>lap_id</td><td>INTEGER</td><td>PK AUTOINCREMENT</td><td>Unique lap identifier</td></tr>
          <tr><td>session_id</td><td>INTEGER</td><td>FK &rarr; sessions, NOT NULL</td><td>Parent session</td></tr>
          <tr><td>lap_number</td><td>INTEGER</td><td>NOT NULL</td><td>Lap number within session</td></tr>
          <tr><td>lap_time</td><td>REAL</td><td></td><td>Lap duration (seconds)</td></tr>
          <tr><td>sector1/2/3_time</td><td>REAL</td><td></td><td>Sector split times (seconds)</td></tr>
          <tr><td>valid</td><td>INTEGER</td><td>DEFAULT 1</td><td>1=completed, 0=incomplete</td></tr>
          <tr><td>fuel_start</td><td>REAL</td><td></td><td>Fuel at lap start (litres)</td></tr>
          <tr><td>fuel_end</td><td>REAL</td><td></td><td>Fuel at lap end (litres)</td></tr>
          <tr><td>avg_speed</td><td>REAL</td><td></td><td>Average speed (km/h)</td></tr>
          <tr><td>max_speed</td><td>REAL</td><td></td><td>Maximum speed (km/h)</td></tr>
          <tr><td>min_speed</td><td>REAL</td><td></td><td>Minimum speed (km/h)</td></tr>
          <tr><td>timestamp</td><td>REAL</td><td>NOT NULL</td><td>Unix timestamp of lap completion</td></tr>
        </tbody>
      </table>

      <h4>telemetry</h4>
      <table className="section-table">
        <thead>
          <tr><th>Column</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>telemetry_id</td><td>INTEGER PK</td><td>Unique sample identifier</td></tr>
          <tr><td>session_id</td><td>INTEGER FK</td><td>Parent session</td></tr>
          <tr><td>lap_number</td><td>INTEGER</td><td>Lap number for this sample</td></tr>
          <tr><td>elapsed_time</td><td>REAL</td><td>Seconds since session start</td></tr>
          <tr><td>pos_x, pos_z</td><td>REAL</td><td>World position (metres)</td></tr>
          <tr><td>speed</td><td>REAL</td><td>Speed (km/h)</td></tr>
          <tr><td>gear</td><td>INTEGER</td><td>Gear (-1 to 8, after mapping)</td></tr>
          <tr><td>rpm</td><td>INTEGER</td><td>Engine RPM</td></tr>
          <tr><td>throttle, brake</td><td>REAL</td><td>Input (0.0–1.0)</td></tr>
          <tr><td>fuel</td><td>REAL</td><td>Remaining fuel (litres)</td></tr>
          <tr><td>steer_angle</td><td>REAL</td><td>Steering angle</td></tr>
          <tr><td>g_force_lat, g_force_lon</td><td>REAL</td><td>G-forces</td></tr>
          <tr><td>tyre_pressure_fl/fr/rl/rr</td><td>REAL</td><td>Tyre pressure (PSI)</td></tr>
          <tr><td>tyre_temp_fl/fr/rl/rr</td><td>REAL</td><td>Tyre core temperature (&#176;C)</td></tr>
          <tr><td>tyre_wear_fl/fr/rl/rr</td><td>REAL</td><td>Tyre wear (%)</td></tr>
          <tr><td>wheel_slip_fl/fr/rl/rr</td><td>REAL</td><td>Wheel slip ratio</td></tr>
          <tr><td>suspension_fl/fr/rl/rr</td><td>REAL</td><td>Suspension travel (metres)</td></tr>
          <tr><td>camber_fl/fr/rl/rr</td><td>REAL</td><td>Camber angle (radians)</td></tr>
          <tr><td>ride_height_front/rear</td><td>REAL</td><td>Ride height (metres)</td></tr>
          <tr><td>car_damage_front/rear/left/right/centre</td><td>REAL</td><td>Damage per zone</td></tr>
          <tr><td>is_in_pit</td><td>INTEGER</td><td>In pit lane (0/1)</td></tr>
          <tr><td>pit_limiter</td><td>INTEGER</td><td>Pit limiter active (0/1)</td></tr>
          <tr><td>timestamp</td><td>REAL</td><td>Unix timestamp</td></tr>
        </tbody>
      </table>

      <h4>ai_commentary</h4>
      <table className="section-table">
        <thead>
          <tr><th>Column</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>commentary_id</td><td>INTEGER PK</td><td>Unique message identifier</td></tr>
          <tr><td>session_id</td><td>INTEGER FK</td><td>Parent session</td></tr>
          <tr><td>timestamp</td><td>REAL</td><td>Unix timestamp</td></tr>
          <tr><td>message</td><td>TEXT</td><td>AI-generated message text</td></tr>
          <tr><td>trigger</td><td>TEXT</td><td>Event type (e.g., "fuel_warning", "driver_query")</td></tr>
          <tr><td>priority</td><td>TEXT</td><td>Priority level</td></tr>
          <tr><td>lap_number</td><td>INTEGER</td><td>Lap when message was generated</td></tr>
        </tbody>
      </table>

      <h4>voice_queries</h4>
      <table className="section-table">
        <thead>
          <tr><th>Column</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>query_id</td><td>INTEGER PK</td><td>Unique query identifier</td></tr>
          <tr><td>session_id</td><td>INTEGER FK</td><td>Parent session</td></tr>
          <tr><td>timestamp</td><td>REAL</td><td>Unix timestamp</td></tr>
          <tr><td>query_text</td><td>TEXT</td><td>Transcribed driver query</td></tr>
          <tr><td>response_text</td><td>TEXT</td><td>AI response text</td></tr>
          <tr><td>lap_number</td><td>INTEGER</td><td>Lap when query was asked</td></tr>
        </tbody>
      </table>

      <p><strong>Indices:</strong></p>
      <ul>
        <li><code>idx_laps_session</code> on <code>laps(session_id)</code></li>
        <li><code>idx_telemetry_session</code> on <code>telemetry(session_id)</code></li>
        <li><code>idx_telemetry_lap</code> on <code>telemetry(lap_number)</code></li>
        <li><code>idx_ai_session</code> on <code>ai_commentary(session_id)</code></li>
        <li><code>idx_voice_session</code> on <code>voice_queries(session_id)</code></li>
      </ul>

      <h3>Data Volumes</h3>
      <table className="section-table">
        <thead>
          <tr><th>Table</th><th>Write Rate</th><th>Typical Session (20 laps, ~25 min)</th></tr>
        </thead>
        <tbody>
          <tr><td>telemetry</td><td>~60 rows/sec (batched at 60)</td><td>~90,000 rows</td></tr>
          <tr><td>laps</td><td>1 row per lap</td><td>~20 rows</td></tr>
          <tr><td>ai_commentary</td><td>1–5 per lap</td><td>~40–100 rows</td></tr>
          <tr><td>voice_queries</td><td>0–3 per session</td><td>~0–3 rows</td></tr>
          <tr><td>sessions</td><td>1 per session</td><td>1 row</td></tr>
        </tbody>
      </table>

      <h3>Export Formats</h3>
      <p><strong>CSV Export</strong> (per session):</p>
      <ul>
        <li><code>session_X_telemetry.csv</code> — Full telemetry at 60 Hz</li>
        <li><code>session_X_laps.csv</code> — Lap summary statistics</li>
        <li><code>session_X_ai_commentary.csv</code> — AI messages with timestamps</li>
        <li><code>session_X_metadata.json</code> — Session metadata sidecar</li>
      </ul>
      <p><strong>Bundle Export</strong> (<code>.jsession</code> file):</p>
      <ul>
        <li>ZIP archive containing all CSV files + metadata JSON</li>
        <li>Portable for sharing between installations</li>
        <li>Can be imported via <code>SessionExporter.import_session_bundle()</code></li>
      </ul>

      <h2>Packages and APIs</h2>

      <h3>Internal Packages (Data Layer)</h3>
      <table className="section-table">
        <thead>
          <tr><th>Package</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr><td><code>telemetry/</code></td><td>Backend workers and lap detection</td></tr>
          <tr><td><code>telemetry/backends/</code></td><td>Game-specific shared memory readers (ctypes structs)</td></tr>
          <tr><td><code>data/</code></td><td>Session/Lap/Telemetry models, SessionRecorder, SessionExporter, TelemetryLoader</td></tr>
          <tr><td><code>ui/</code></td><td>PyQt5 windows, canvases, styles</td></tr>
          <tr><td><code>ui/canvases/</code></td><td>Matplotlib graph widgets (track map, time-series, multi-line, delta)</td></tr>
          <tr><td><code>ui/post_race/</code></td><td>Post-race viewer with timeline, graphs, session picker</td></tr>
        </tbody>
      </table>

      <h3>External Dependencies (Data Layer)</h3>
      <table className="section-table">
        <thead>
          <tr><th>Library</th><th>Version</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>PyQt5</strong></td><td>&ge; 5.15</td><td>GUI framework, QThread, signals/slots</td></tr>
          <tr><td><strong>Matplotlib</strong></td><td>&ge; 3.5</td><td>Track map, time-series, multi-line graphs</td></tr>
          <tr><td><strong>NumPy</strong></td><td>&ge; 1.21</td><td>Array operations, unit conversions, interpolation</td></tr>
          <tr><td><strong>Pandas</strong></td><td>transitive</td><td>Telemetry DataFrames, CSV I/O, column operations</td></tr>
          <tr><td><strong>Pydantic</strong></td><td>&ge; 2.5</td><td>Telemetry data validation and type-safe models</td></tr>
          <tr><td><strong>sqlite3</strong></td><td>stdlib</td><td>Session recording database</td></tr>
          <tr><td><strong>ctypes</strong></td><td>stdlib</td><td>Windows shared memory struct mapping</td></tr>
        </tbody>
      </table>

      <h3>Telemetry Backend API</h3>
      <div className="api-card">
        <div className="api-card__header api-card__header--thread">
          <span className="api-card__name">AcTelemetryWorker</span>
          <span className="api-card__type-badge api-card__type-badge--thread">QThread</span>
        </div>
        <div className="api-section__label">Signals (outbound)</div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--signal">▸</span>
          <span className="api-row__sig">realtime_sample(dict)</span>
          <span className="api-row__desc">every frame · ~60 Hz</span>
        </div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--signal">▸</span>
          <span className="api-row__sig">lap_completed(int, list, bool, int)</span>
          <span className="api-row__desc">lap finished</span>
        </div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--signal">▸</span>
          <span className="api-row__sig">session_info_update(dict)</span>
          <span className="api-row__desc">track / car / player metadata</span>
        </div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--signal">▸</span>
          <span className="api-row__sig">live_data_update(dict)</span>
          <span className="api-row__desc">current speed / gear / fuel</span>
        </div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--signal">▸</span>
          <span className="api-row__sig">status_update(str)</span>
          <span className="api-row__desc">status messages</span>
        </div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--signal">▸</span>
          <span className="api-row__sig">session_reset()</span>
          <span className="api-row__desc">AC restarted mid-session</span>
        </div>
        <div className="api-section__label">Methods</div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--method">fn</span>
          <span className="api-row__sig">start()</span>
          <span className="api-row__desc">begin polling loop</span>
        </div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--method">fn</span>
          <span className="api-row__sig">stop()</span>
          <span className="api-row__desc">signal shutdown</span>
        </div>
      </div>

      <h3>Data Layer API</h3>
      <div className="api-card">
        <div className="api-card__header api-card__header--thread">
          <span className="api-card__name">SessionRecorder</span>
          <span className="api-card__type-badge api-card__type-badge--thread">QThread</span>
        </div>
        <div className="api-section__label">Methods</div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--method">fn</span>
          <span className="api-row__sig">start_session(game, track, car, player, session_type)</span>
        </div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--method">fn</span>
          <span className="api-row__sig">end_session()</span>
        </div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--method">fn</span>
          <span className="api-row__sig">record_telemetry_sample(dict sample)</span>
        </div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--method">fn</span>
          <span className="api-row__sig">record_lap(lap_number, lap_time, fuel_start, fuel_end, ...)</span>
        </div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--method">fn</span>
          <span className="api-row__sig">record_ai_commentary(message, trigger, priority, lap_number)</span>
        </div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--method">fn</span>
          <span className="api-row__sig">record_voice_query(query_text, response_text, lap_number)</span>
        </div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--method">fn</span>
          <span className="api-row__sig">start() / stop()</span>
        </div>
        <div className="api-card__header api-card__header--plain api-card__header--sep">
          <span className="api-card__name">SessionExporter</span>
          <span className="api-card__type-badge api-card__type-badge--plain">class</span>
        </div>
        <div className="api-section__label">Methods</div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--method">fn</span>
          <span className="api-row__sig">list_sessions()</span>
          <span className="api-row__ret">→ List[dict]</span>
        </div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--method">fn</span>
          <span className="api-row__sig">export_session(session_id)</span>
          <span className="api-row__ret">→ str path</span>
        </div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--method">fn</span>
          <span className="api-row__sig">export_session_bundle(session_id, file_path)</span>
        </div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--method">fn</span>
          <span className="api-row__sig">import_session_bundle(file_path)</span>
          <span className="api-row__ret">→ int session_id</span>
        </div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--method">fn</span>
          <span className="api-row__sig">delete_session(session_id)</span>
        </div>
        <div className="api-card__header api-card__header--plain api-card__header--sep">
          <span className="api-card__name">TelemetryLoader</span>
          <span className="api-card__type-badge api-card__type-badge--plain">class</span>
        </div>
        <div className="api-section__label">Static Methods</div>
        <div className="api-row">
          <span className="api-row__prefix api-row__prefix--method">fn</span>
          <span className="api-row__sig">load_session(path)</span>
          <span className="api-row__ret">→ Session</span>
        </div>
      </div>

      <h2>References</h2>
      <ol className="ref-list">
        <li>Kunz, T. (2020) <em>Assetto Corsa Shared Memory Reference</em>. <a href="https://assettocorsamods.net/threads/doc-shared-memory-reference.58/" target="_blank" rel="noopener noreferrer">assettocorsamods.net</a></li>
        <li>Hunter, J.D. (2007) 'Matplotlib: A 2D Graphics Environment', <em>Computing in Science &amp; Engineering</em>, 9(3), pp. 90–95.</li>
        <li>Gamma, E., Helm, R., Johnson, R. and Vlissides, J. (1994) <em>Design Patterns: Elements of Reusable Object-Oriented Software</em>. Reading, MA: Addison-Wesley.</li>
        <li>Riverbank Computing (2023) <em>PyQt5 Reference Guide</em>. <a href="https://www.riverbankcomputing.com/static/Docs/PyQt5/" target="_blank" rel="noopener noreferrer">riverbankcomputing.com</a></li>
        <li>SQLite Consortium (2024) <em>SQLite Documentation</em>. <a href="https://www.sqlite.org/docs.html" target="_blank" rel="noopener noreferrer">sqlite.org</a></li>
      </ol>
      </>)}

      {activeTab === 'AI Pipeline' && (<>
      <p>
        This tab covers everything that involves an LLM or voice model: how the AI race engineer
        generates natural-language responses, how voice input is captured and transcribed, how
        speech synthesis works, and how post-race LLM agents produce debriefs and coaching.
        Telemetry acquisition and deterministic event detection are covered in the Data Pipeline tab.
      </p>

      <h2>System Architecture</h2>
      <p>
        The AI layer sits downstream of the data pipeline (see Data Pipeline tab). Once
        telemetry has been acquired and validated, events are handed to the AI subsystem for
        LLM inference, voice I/O, and post-race analysis. The diagram below shows only the
        AI-specific components and their interactions.
      </p>

      <div className="arch-diagram">
        {/* Launcher */}
        <div className="arch-node arch-node--launcher">
          <div className="arch-node__header">
            <span className="arch-node__title">Unified Launcher</span>
            <span className="arch-badge arch-badge--red">main.py</span>
          </div>
          <div className="arch-node__sub">
            StartupLoaderThread — downloads GGUF models, imports modules, prewarms LLM
          </div>
        </div>

        {/* Fan-out */}
        <div className="arch-fanout-wrap">
          <div className="arch-fanout-wrap__vline" />
          <div className="arch-fanout-wrap__hbar" />
        </div>

        {/* Three modes */}
        <div className="arch-row arch-row--3">
          <div className="arch-col">
            <div className="arch-drop" />
            <div className="arch-node arch-node--live">
              <div className="arch-node__header">
                <span className="arch-node__title">Jarvis Live</span>
                <span className="arch-badge arch-badge--red">Real-Time</span>
              </div>
              <ul className="arch-node__bullets">
                <li>AIRaceEngineerWorker</li>
                <li>VoiceInputWorker + VAD</li>
                <li>TTSOutputWorker (Kokoro)</li>
                <li>PTTController</li>
                <li><em>+ Data Pipeline components</em></li>
              </ul>
            </div>
          </div>

          <div className="arch-col">
            <div className="arch-drop" />
            <div className="arch-node arch-node--post">
              <div className="arch-node__header">
                <span className="arch-node__title">Jarvis Post</span>
                <span className="arch-badge arch-badge--thread">Post-Race</span>
              </div>
              <ul className="arch-node__bullets">
                <li>AIPipelineBridge</li>
                <li>RaceAnalysisAgent</li>
                <li>CoachingAgent</li>
                <li><em>+ Post-race viewer (Data Pipeline tab)</em></li>
              </ul>
            </div>
          </div>

          <div className="arch-col">
            <div className="arch-drop" />
            <div className="arch-node arch-node--settings">
              <div className="arch-node__header">
                <span className="arch-node__title">Settings</span>
                <span className="arch-badge arch-badge--ui">UI</span>
              </div>
              <ul className="arch-node__bullets">
                <li>LauncherWindow</li>
                <li>Voice mode config</li>
                <li>PTT button binding</li>
                <li>AI verbosity level</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Down to SQLite */}
        <div className="arch-connector">
          <div className="arch-connector__line" />
          <div className="arch-connector__label">telemetry_sessions.db</div>
          <div className="arch-connector__arrow" />
        </div>

        <div className="arch-node arch-node--db">
          <div className="arch-node__header">
            <span className="arch-node__title">SQLite Database</span>
          </div>
          <div className="arch-node__sub">ai_commentary · voice_queries + data tables (see Data Pipeline tab)</div>
        </div>
      </div>

      <h3>AI Component Descriptions</h3>
      <table className="section-table">
        <thead>
          <tr><th>Component</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>StartupLoaderThread</strong></td>
            <td><code>QThread</code></td>
            <td>11-stage background loader that imports all modules, downloads GGUF models from HuggingFace, and prewarms the LLM while displaying a progress splash screen.</td>
          </tr>
          <tr>
            <td><strong>AIRaceEngineerWorker</strong></td>
            <td><code>QThread</code></td>
            <td>Orchestrates the AI pipeline: receives telemetry via queue, runs TelemetryAgent detection, generates LLM responses, applies guardrails, and emits commentary signals.</td>
          </tr>
          <tr>
            <td><strong>RaceEngineerAgent</strong></td>
            <td>Plain class</td>
            <td>LLM response generator. Constructs prompts from events/queries and session context, calls the local LLM, and returns natural-language radio messages.</td>
          </tr>
          <tr>
            <td><strong>LocalLLMInference</strong></td>
            <td>Singleton class</td>
            <td>Loads and manages the GGUF-quantised Granite model via llama-cpp-python. Thread-safe generation with timeout and mutex. Shared singleton across launcher loop iterations.</td>
          </tr>
          <tr>
            <td><strong>VoiceInputWorker</strong></td>
            <td><code>QThread</code></td>
            <td>Captures microphone audio at 16 kHz. In VAD mode, uses WebRTC VAD to detect speech boundaries. In PTT mode, records only while button is held. Transcribes via faster-whisper.</td>
          </tr>
          <tr>
            <td><strong>PTTController</strong></td>
            <td><code>QObject</code></td>
            <td>Listens for push-to-talk key/button presses via pynput (keyboard) and pygame (joystick). Emits <code>ptt_pressed</code>/<code>ptt_released</code> signals.</td>
          </tr>
          <tr>
            <td><strong>TTSOutputWorker</strong></td>
            <td><code>QThread</code></td>
            <td>Synthesises AI responses to audio using Kokoro TTS (ONNX). Plays via winsound (Windows) or PyAudio. Priority message queue ensures critical alerts interrupt lower-priority speech.</td>
          </tr>
          <tr>
            <td><strong>AIPipelineBridge</strong></td>
            <td>Plain class</td>
            <td>Adapter connecting the post-race UI to the LLM agents. Translates data formats, handles model availability, and falls back to heuristic analysis if the LLM is unavailable.</td>
          </tr>
          <tr>
            <td><strong>RaceAnalysisAgent</strong></td>
            <td>Plain class (BaseAgent)</td>
            <td>Post-race LLM agent that streams a full race debrief — lap consistency, tyre degradation trends, fuel strategy assessment.</td>
          </tr>
          <tr>
            <td><strong>CoachingAgent</strong></td>
            <td>Plain class (BaseAgent)</td>
            <td>Post-race LLM agent that analyses a specific lap and returns targeted coaching feedback on braking points, throttle application, and racing line.</td>
          </tr>
        </tbody>
      </table>

      <h2>Sequence Diagrams</h2>

      <h3>LLM Response Generation (Proactive)</h3>
      <p>
        After <code>TelemetryAgent</code> emits events (Data Pipeline), <code>RaceEngineerAgent</code>
        generates a natural-language response via the local LLM.
      </p>
      <pre className="code-block"><code>{`AIRaceEngineerWorker (AI stage — picks up after event detection)
  |
  |--for each Event (sorted by Priority via heapq):
  |    |--RaceEngineerAgent.generate_proactive_response(event, context)
  |    |    |--format prompt with event data + session context
  |    |    |--verbosity lookup (minimal / moderate / verbose template)
  |    |    |--LocalLLMInference.generate()   (~2s)
  |    |    |--guardrail checks (hallucination detection)
  |    |    |--[if fails] -> rule-based fallback template
  |    |    |--return response text
  |    |
  |    |--emit ai_commentary(message, trigger_type, priority)
  |
  |--MainWindow receives ai_commentary signal
  |--display in comms transcript
  |--TTSOutputWorker.speak(message, priority)  -> audio playback`}</code></pre>

      <h3>Voice Query Flow</h3>
      <p>
        End-to-end flow when the driver asks a question via voice, through transcription, LLM
        generation, and TTS playback.
      </p>
      <div className="seq-diagram">
        <div className="seq-actors">
          <div className="seq-actor seq-actor--entry">
            <span className="seq-actor__name">Microphone</span>
            <span className="seq-actor__type">hardware</span>
          </div>
          <div className="seq-actor seq-actor--thread">
            <span className="seq-actor__name">VoiceInput Worker</span>
            <span className="seq-actor__type">QThread</span>
          </div>
          <div className="seq-actor seq-actor--thread">
            <span className="seq-actor__name">AIRaceEngineer Worker</span>
            <span className="seq-actor__type">QThread</span>
          </div>
          <div className="seq-actor seq-actor--thread">
            <span className="seq-actor__name">TTS Output Worker</span>
            <span className="seq-actor__type">QThread</span>
          </div>
        </div>
        <div className="seq-body">
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--entry">Microphone</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--thread">VoiceInputWorker</span>
            <span className="seq-msg__label">: audio frame</span>
            <span className="seq-msg__note">16 kHz</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">VoiceInputWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">VAD check — is_speech? (WebRTC, 30 ms frames)</span>
          </div>
          <div className="seq-note">[speech detected]</div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">VoiceInputWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">buffer audio + 150 ms padding</span>
          </div>
          <div className="seq-note">[silence 150 ms — utterance complete]</div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">VoiceInputWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">transcribe() via faster-whisper</span>
            <span className="seq-msg__note">&lt; 1 s</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">VoiceInputWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--thread">AIRaceEngineerWorker</span>
            <span className="seq-msg__label">: speech_detected signal (str)</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">AIRaceEngineerWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">build reactive prompt (query-aware context pruning)</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">AIRaceEngineerWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">LocalLLMInference.generate()</span>
            <span className="seq-msg__note">2–5 s</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">AIRaceEngineerWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">guardrail checks (hallucination, pit validation)</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">AIRaceEngineerWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--thread">TTSOutputWorker</span>
            <span className="seq-msg__label">: ai_commentary signal (str)</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">TTSOutputWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">synthesize via Kokoro TTS (ONNX)</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">TTSOutputWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">play audio (winsound / PyAudio)</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">AIRaceEngineerWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--back">→</span>
            <span className="seq-msg__to seq-msg__to--thread">VoiceInputWorker</span>
            <span className="seq-msg__label">: pause() — prevent echo capture</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">AIRaceEngineerWorker</span>
            <span className="seq-msg__arrow seq-msg__arrow--back">→</span>
            <span className="seq-msg__to seq-msg__to--thread">VoiceInputWorker</span>
            <span className="seq-msg__label">: resume() after playback_finished signal</span>
          </div>
        </div>
      </div>

      <h3>Post-Race Analysis Flow (AI Stage)</h3>
      <p>
        After session data is loaded from SQLite/CSV (see Data Pipeline tab),
        the user triggers LLM analysis via the post-race viewer.
      </p>
      <div className="seq-diagram">
        <div className="seq-actors">
          <div className="seq-actor seq-actor--ui">
            <span className="seq-actor__name">Session Picker</span>
            <span className="seq-actor__type">QDialog</span>
          </div>
          <div className="seq-actor seq-actor--plain">
            <span className="seq-actor__name">Session Exporter</span>
            <span className="seq-actor__type">plain class</span>
          </div>
          <div className="seq-actor seq-actor--ui">
            <span className="seq-actor__name">LapViewer Window</span>
            <span className="seq-actor__type">QMainWindow</span>
          </div>
          <div className="seq-actor seq-actor--plain">
            <span className="seq-actor__name">AIPipeline Bridge</span>
            <span className="seq-actor__type">plain class</span>
          </div>
        </div>
        <div className="seq-body">
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--ui">SessionPicker</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--plain">SessionExporter</span>
            <span className="seq-msg__label">: list_sessions()</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--plain">SessionExporter</span>
            <span className="seq-msg__arrow seq-msg__arrow--back">→</span>
            <span className="seq-msg__to seq-msg__to--ui">SessionPicker</span>
            <span className="seq-msg__label">: session list (return)</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-note">[user selects session]</div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--ui">SessionPicker</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--plain">SessionExporter</span>
            <span className="seq-msg__label">: export_session()</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--plain">SessionExporter</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">write CSVs to disk</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--ui">LapViewerWindow</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">load_session() via TelemetryLoader</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-note">[user clicks Analyse]</div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--ui">LapViewerWindow</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--plain">AIPipelineBridge</span>
            <span className="seq-msg__label">: generate()</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--plain">AIPipelineBridge</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">RaceAnalysisAgent.analyse_stream()</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--plain">AIPipelineBridge</span>
            <span className="seq-msg__arrow seq-msg__arrow--back">→</span>
            <span className="seq-msg__to seq-msg__to--ui">LapViewerWindow</span>
            <span className="seq-msg__label">: streaming text</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-note">[user clicks lap for coaching]</div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--ui">LapViewerWindow</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--plain">AIPipelineBridge</span>
            <span className="seq-msg__label">: generate_coach()</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--plain">AIPipelineBridge</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">CoachingAgent.analyse_stream()</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--plain">AIPipelineBridge</span>
            <span className="seq-msg__arrow seq-msg__arrow--back">→</span>
            <span className="seq-msg__to seq-msg__to--ui">LapViewerWindow</span>
            <span className="seq-msg__label">: streaming text</span>
          </div>
        </div>
      </div>

      <h3>Application Startup Flow</h3>
      <p>
        The 11-stage startup loader that imports modules, downloads models, and prewarms the LLM.
      </p>
      <div className="seq-diagram">
        <div className="seq-actors">
          <div className="seq-actor seq-actor--entry">
            <span className="seq-actor__name">main.py</span>
            <span className="seq-actor__type">entry point</span>
          </div>
          <div className="seq-actor seq-actor--ui">
            <span className="seq-actor__name">Loading Screen</span>
            <span className="seq-actor__type">QWidget</span>
          </div>
          <div className="seq-actor seq-actor--thread">
            <span className="seq-actor__name">Startup Loader</span>
            <span className="seq-actor__type">QThread</span>
          </div>
          <div className="seq-actor seq-actor--ui">
            <span className="seq-actor__name">Unified Launcher</span>
            <span className="seq-actor__type">QDialog</span>
          </div>
        </div>
        <div className="seq-body">
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--entry">main.py</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--ui">LoadingScreen</span>
            <span className="seq-msg__label">: show()</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--entry">main.py</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--thread">StartupLoaderThread</span>
            <span className="seq-msg__label">: start()</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">StartupLoaderThread</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">Stage 1–5: app shell, DLLs, UI, telemetry, AI stack</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">StartupLoaderThread</span>
            <span className="seq-msg__arrow seq-msg__arrow--back">→</span>
            <span className="seq-msg__to seq-msg__to--ui">LoadingScreen</span>
            <span className="seq-msg__label">: stage_update signal × 5</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">StartupLoaderThread</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">Stage 6: download GGUF models (if not cached)</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">StartupLoaderThread</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">Stages 7–9: Whisper, Kokoro TTS, persistence</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">StartupLoaderThread</span>
            <span className="seq-msg__arrow seq-msg__arrow--back">→</span>
            <span className="seq-msg__to seq-msg__to--ui">LoadingScreen</span>
            <span className="seq-msg__label">: all_done(component_dict)</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--entry">main.py</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">Stages 10–11: fonts + complete (main thread)</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--entry">main.py</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--ui">LoadingScreen</span>
            <span className="seq-msg__label">: close()</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--entry">main.py</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--ui">UnifiedLauncher</span>
            <span className="seq-msg__label">: exec_()</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-note">[user picks action]</div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--ui">UnifiedLauncher</span>
            <span className="seq-msg__arrow seq-msg__arrow--back">→</span>
            <span className="seq-msg__to seq-msg__to--entry">main.py</span>
            <span className="seq-msg__label">: ACTION_LIVE / ACTION_POST / ACTION_SETTINGS / ACTION_QUIT</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--entry">main.py</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">loop — re-show launcher after each session ends</span>
          </div>
        </div>
      </div>

      <h2>Design Patterns</h2>

      <h3>Singleton Pattern (LLM Instance)</h3>
      <p>
        <code>LocalLLMInference</code> uses a module-level singleton with double-checked locking
        to ensure the ~2.5 GB GGUF model is loaded exactly once and persists across launcher
        loop iterations.
      </p>
      <pre className="code-block"><code>{`# ai/local_llm_inference.py
_shared_instance: Optional[LocalLLMInference] = None
_shared_lock = threading.Lock()

@classmethod
def get_shared(cls, ...) -> LocalLLMInference:
    if _shared_instance is not None and _shared_instance._loaded:
        return _shared_instance  # Fast path (no lock)
    with _shared_lock:
        if _shared_instance is not None and _shared_instance._loaded:
            return _shared_instance  # Re-check after lock
        instance = cls(...)
        instance.load()
        _shared_instance = instance
        return instance`}</code></pre>

      <h3>Chain of Responsibility (Fallback Chain)</h3>
      <p>
        LLM response generation follows a priority fallback chain. The same pattern applies to
        fuel lookup (exact match &rarr; substring &rarr; Jaccard similarity), TTS playback
        (winsound &rarr; PyAudio), and post-race coaching (LLM &rarr; retry with concise prompt
        &rarr; deterministic fallback).
      </p>
      <ol>
        <li><strong>Local GGUF model</strong> (preferred) — generates response via llama-cpp-python</li>
        <li><strong>Rule-based fallback</strong> — deterministic template responses per event type</li>
        <li><strong>Guardrail override</strong> — if post-generation checks detect hallucination, substitute a safe fallback message</li>
      </ol>

      <h3>Strategy Pattern (Prompt Templates)</h3>
      <p>
        Prompt generation uses a registry indexed by verbosity level, allowing the system to
        switch between ultra-brief radio messages and detailed analysis by changing one
        configuration parameter.
      </p>
      <pre className="code-block"><code>{`# ai/race_engineer_core/prompts.py
PROACTIVE_PROMPTS = {
    "minimal":  PROACTIVE_PROMPT_MINIMAL,
    "moderate": PROACTIVE_PROMPT_MODERATE,
    "verbose":  PROACTIVE_PROMPT_VERBOSE,
}

def get_proactive_prompt(verbosity: str = "moderate") -> PromptTemplate:
    return PROACTIVE_PROMPTS.get(verbosity, PROACTIVE_PROMPT_MODERATE)`}</code></pre>

      <h3>Adapter Pattern (AIPipelineBridge)</h3>
      <p>
        <code>AIPipelineBridge</code> adapts between the post-race UI (<code>Session</code>/<code>Lap</code>{' '}
        objects) and the LLM agents (which expect JSON payloads). It handles data translation,
        model availability checking, and graceful degradation to heuristic analysis.
      </p>

      <h3>Template Method Pattern (BaseAgent)</h3>
      <p>
        Post-race agents inherit from <code>BaseAgent</code> and implement an <code>analyse()</code>{' '}
        method. Each agent customises prompt construction and response parsing while sharing the
        same interface and streaming logic.
      </p>
      <pre className="code-block"><code>{`class BaseAgent:
    async def analyse(self, session_data: dict) -> dict: ...

class RaceAnalysisAgent(BaseAgent):
    async def analyse(self, session_data: dict) -> dict: ...

class CoachingAgent(BaseAgent):
    async def analyse(self, session_data: dict) -> dict: ...`}</code></pre>

      <h3>Builder Pattern (Startup Loader)</h3>
      <p>
        <code>StartupLoaderThread</code> progressively builds a results dictionary across 11 stages,
        each adding component classes or availability flags. The final <code>all_done</code> signal
        passes this dictionary to <code>main.py</code>, which unpacks it into module-level variables.
        This avoids import-time failures and allows graceful degradation when optional components
        (e.g., audio hardware) are unavailable.
      </p>

      <h2>Class Diagrams</h2>

      <h3>AI QThread Workers</h3>
      {/* Parent */}
      <div className="cls-diagram">
        <div className="cls-grid--1" style={{ justifyItems: 'center', marginBottom: '0.5rem' }}>
          <div className="cls-card cls-card--qthread">
            <div className="cls-card__name">QtCore.QThread</div>
            <div className="cls-card__badge">base class</div>
          </div>
        </div>
        <div className="cls-connector">inherits ↓</div>
        {/* Four children */}
        <div className="cls-grid--2">
          {/* AIRaceEngineerWorker */}
          <div className="cls-card cls-card--qthread">
            <div className="cls-card__name">AIRaceEngineerWorker</div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> ai_commentary</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> driver_query_received</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> status_update</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> processing_query</div>
              <div className="cls-divider" />
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> TelemetryAgent</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> RaceEngineerAgent</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> LiveSessionContext</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> LocalLLMInference</div>
            </div>
          </div>
          {/* VoiceInputWorker */}
          <div className="cls-card cls-card--qthread">
            <div className="cls-card__name">VoiceInputWorker</div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> speech_detected</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> vad_state_changed</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> status_update</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> error_occurred</div>
              <div className="cls-divider" />
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> webrtcvad.Vad</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> WhisperModel</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> pyaudio</div>
            </div>
          </div>
          {/* TTSOutputWorker */}
          <div className="cls-card cls-card--qthread">
            <div className="cls-card__name">TTSOutputWorker</div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> status_update</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> error_occurred</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> playback_started</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> playback_finished</div>
              <div className="cls-divider" />
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> KokoroTTSClient</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> pyaudio</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> asyncio.PriorityQueue</div>
            </div>
          </div>
          {/* StartupLoaderThread */}
          <div className="cls-card cls-card--qthread">
            <div className="cls-card__name">StartupLoaderThread</div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> stage_update</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> all_done</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> fatal_error</div>
            </div>
          </div>
        </div>
      </div>

      <h3>AI Pipeline Classes</h3>
      <div className="cls-diagram">
        <div className="cls-grid--2">
          {/* BaseAgent hierarchy */}
          <div className="cls-card cls-card--plain">
            <div className="cls-card__name">BaseAgent</div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--fn">fn</span> analyse(session_data) → dict</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--fn">fn</span> analyse_stream(session_data) → AsyncIterator</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> LocalLLMInference</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--out">sub</span> RaceAnalysisAgent, CoachingAgent</div>
            </div>
          </div>
          {/* RaceEngineerAgent */}
          <div className="cls-card cls-card--plain">
            <div className="cls-card__name">RaceEngineerAgent</div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> LLMClient</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> PromptTemplate</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> LiveSessionContext</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--out">out</span> str (radio message)</div>
            </div>
          </div>
          {/* LLMClient */}
          <div className="cls-card cls-card--plain">
            <div className="cls-card__name">LLMClient</div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> LocalLLMInference (singleton)</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--fn">fall</span> rule-based response templates</div>
            </div>
          </div>
          {/* LocalLLMInference */}
          <div className="cls-card cls-card--plain">
            <div className="cls-card__name">LocalLLMInference</div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> llama_cpp.Llama (GGUF)</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--fn">pat</span> Singleton (_shared_instance)</div>
            </div>
          </div>
          {/* LiveSessionContext */}
          <div className="cls-card cls-card--plain">
            <div className="cls-card__name">LiveSessionContext</div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--has">has</span> vehicle state</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--has">has</span> lap history</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--has">has</span> telemetry buffer (60s)</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--has">has</span> conversation history (1 ex)</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--has">has</span> fuel tracking</div>
            </div>
          </div>
          {/* KokoroTTSClient */}
          <div className="cls-card cls-card--plain">
            <div className="cls-card__name">KokoroTTSClient</div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> pykokoro.build_pipeline (ONNX)</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--out">out</span> WAV bytes</div>
            </div>
          </div>
          {/* PTTController */}
          <div className="cls-card cls-card--plain">
            <div className="cls-card__name">PTTController <span style={{fontSize:'0.7rem',color:'#888'}}>(QObject)</span></div>
            <div className="cls-card__body">
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> pynput.keyboard.Listener</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--uses">uses</span> pygame.joystick</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> ptt_pressed</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> ptt_released</div>
              <div className="cls-card__row"><span className="cls-prefix cls-prefix--signal">sig</span> status_update</div>
            </div>
          </div>
        </div>
      </div>

      <h2>Thread Model</h2>
      <p>
        Data pipeline threads (AcTelemetryWorker, SessionRecorder) are documented in the
        Data Pipeline tab. The AI layer adds the following threads:
      </p>
      <table className="section-table">
        <thead>
          <tr><th>Thread</th><th>Type</th><th>Lifetime</th><th>Frequency</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr><td>AIRaceEngineerWorker</td><td>QThread + asyncio</td><td>Session lifetime</td><td>~5 Hz (throttled)</td><td>Event detection + LLM inference</td></tr>
          <tr><td>VoiceInputWorker</td><td>QThread</td><td>Session lifetime</td><td>~33 Hz (30ms frames)</td><td>Audio capture + VAD + Whisper STT</td></tr>
          <tr><td>TTSOutputWorker</td><td>QThread + asyncio</td><td>Session lifetime</td><td>On-demand</td><td>Kokoro synthesis + audio playback</td></tr>
          <tr><td>StartupLoaderThread</td><td>QThread</td><td>~5–30 seconds</td><td>One-shot</td><td>Module imports + model downloads</td></tr>
          <tr><td>PTTController</td><td>QObject (timers)</td><td>Session lifetime</td><td>60 Hz (joystick poll)</td><td>Input device monitoring</td></tr>
        </tbody>
      </table>

      <h2>Packages and APIs</h2>

      <h3>Internal Packages (AI Layer)</h3>
      <table className="section-table">
        <thead>
          <tr><th>Package</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr><td><code>ai/</code></td><td>AI race engineer worker, voice input, TTS output</td></tr>
          <tr><td><code>ai/race_engineer_core/</code></td><td>TelemetryAgent, RaceEngineerAgent, LLMClient, LocalLLMInference, LiveSessionContext, prompts, event models</td></tr>
          <tr><td><code>analysis/</code></td><td>Post-race AI pipeline bridge, RaceAnalysisAgent, CoachingAgent, fallback heuristics</td></tr>
        </tbody>
      </table>

      <h3>External Dependencies (AI Layer)</h3>
      <table className="section-table">
        <thead>
          <tr><th>Library</th><th>Version</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>llama-cpp-python</strong></td><td>&ge; 0.2.50</td><td>GGUF model inference (llama.cpp C++ bindings)</td></tr>
          <tr><td><strong>huggingface-hub</strong></td><td>&ge; 0.23</td><td>Model auto-download from HF Hub</td></tr>
          <tr><td><strong>hf_xet</strong></td><td>&ge; 1.1</td><td>Fast downloads from HF Hub (xet protocol)</td></tr>
          <tr><td><strong>faster-whisper</strong></td><td>&ge; 1.0</td><td>Local speech-to-text (CTranslate2 Whisper)</td></tr>
          <tr><td><strong>webrtcvad</strong></td><td>&ge; 2.0</td><td>Voice Activity Detection (GMM-based)</td></tr>
          <tr><td><strong>pykokoro</strong></td><td>&ge; 0.6.5</td><td>Neural TTS synthesis (ONNX backend)</td></tr>
          <tr><td><strong>pyaudio</strong></td><td>&ge; 0.2</td><td>Audio capture (microphone) and playback</td></tr>
          <tr><td><strong>pynput</strong></td><td>&ge; 1.7</td><td>Global keyboard hooks for push-to-talk</td></tr>
          <tr><td><strong>pygame</strong></td><td>&ge; 2.5</td><td>Joystick/racing wheel button detection</td></tr>
          <tr><td><strong>tenacity</strong></td><td>&ge; 8.2</td><td>Retry logic for LLM calls</td></tr>
        </tbody>
      </table>

      <h3>AI Pipeline API</h3>
      <pre className="code-block"><code>{`AIRaceEngineerWorker (QThread)
  Signals (outbound):
      ai_commentary(str message, str trigger, int priority)
      driver_query_received(str query)
      status_update(str message)
      processing_query(bool busy)
  Methods (inbound):
      process_telemetry(dict sample)   # Called from signal handler
      process_driver_query(str query)  # Called from voice signal
      update_session_info(dict info)   # Track/car info for fuel lookup
      update_ac_status(int status)     # On-track detection
      start() / stop()`}</code></pre>

      <h3>Voice API</h3>
      <pre className="code-block"><code>{`VoiceInputWorker (QThread)
  Signals (outbound):
      speech_detected(str text)
      vad_state_changed(bool speaking)
      status_update(str) / error_occurred(str)
  Methods:
      start_recording() / stop_recording()  # PTT mode
      pause() / resume()                     # Echo prevention
      start() / stop()

TTSOutputWorker (QThread)
  Signals (outbound):
      playback_started() / playback_finished()
      status_update(str) / error_occurred(str)
  Methods:
      speak(str text, int priority)  # Queue message for synthesis
      start() / stop()`}</code></pre>

      <h2>Fine-Tuning Pipeline</h2>
      <p>
        The runtime AI system depends on externally produced fine-tuned models, but training
        itself is an offline subsystem. At system-design level, the key concern is the
        <strong>integration boundary</strong> between training outputs and runtime inference.
      </p>

      <h3>Integration Boundary (Offline → Runtime)</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Boundary Element</th>
            <th>Design Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Training repository output</td>
            <td>Produces deployable model artifacts consumed by runtime services.</td>
          </tr>
          <tr>
            <td>Model artifact packaging</td>
            <td>Defines a stable format/version so launcher checks and model loading are deterministic.</td>
          </tr>
          <tr>
            <td>Startup loader contract</td>
            <td>Validates model availability and initialises inference workers before interactive use.</td>
          </tr>
          <tr>
            <td>Agent compatibility</td>
            <td>Ensures prompt templates and response parsers remain compatible across model updates.</td>
          </tr>
        </tbody>
      </table>

      <p>
        Full model-training methodology (datasets, filtering, QLoRA configuration, experiments,
        and quantified results) is documented in the Algorithms page to avoid duplicating
        algorithmic content inside System Design.
      </p>
      <h2>References</h2>
      <ol className="ref-list">
        <li>Gamma, E., Helm, R., Johnson, R. and Vlissides, J. (1994) <em>Design Patterns: Elements of Reusable Object-Oriented Software</em>. Reading, MA: Addison-Wesley.</li>
        <li>Gerganov, G. (2023) <em>llama.cpp: Inference of Meta's LLaMA model in pure C/C++</em>. <a href="https://github.com/ggerganov/llama.cpp" target="_blank" rel="noopener noreferrer">https://github.com/ggerganov/llama.cpp</a></li>
        <li>Google (2011) <em>WebRTC: Real-Time Communication for the Web</em>. <a href="https://webrtc.org/" target="_blank" rel="noopener noreferrer">https://webrtc.org/</a></li>
        <li>Hexgrad (2024) <em>Kokoro: Lightweight Neural Text-to-Speech</em>. <a href="https://github.com/hexgrad/kokoro" target="_blank" rel="noopener noreferrer">https://github.com/hexgrad/kokoro</a></li>
        <li>Klein, G. (2020) <em>CTranslate2: Fast Inference Engine for Transformer Models</em>. <a href="https://github.com/OpenNMT/CTranslate2" target="_blank" rel="noopener noreferrer">https://github.com/OpenNMT/CTranslate2</a></li>
        <li>Mishra, M. et al. (2024) 'Granite Code Models: A Family of Open Foundation Models for Code Intelligence', <em>arXiv preprint arXiv:2405.04324</em>.</li>
        <li>Radford, A., Kim, J.W., Xu, T., Brockman, G., McLeavey, C. and Sutskever, I. (2023) 'Robust Speech Recognition via Large-Scale Weak Supervision', in <em>Proceedings of ICML</em>, pp. 28492–28518.</li>
      </ol>
      </>)}

      {activeTab === 'VR' && (<>

      <p>
        This section covers the system design of the VR Racing &amp; Engineering Hub — an Unreal
        Engine 4.27 virtual reality environment encompassing environment design, vehicle asset
        pipelines, interactive media systems, AI-driven presentations, and telemetry visualisation.
        Each subsystem is described below. The Telemetry Visualizer (further down) receives the
        most detailed treatment as it involved the most custom C++ development.
      </p>

      <h2>VR Environment — System Architecture</h2>
      <p>
        The hub is built on a <strong>pre-existing VR Chemistry Lab template</strong> (UE 4.27).
        The template provided the external building architecture, core VR locomotion (teleport arc
        and smooth thumbstick), VR grab/interaction mechanics, and a working elevator with in-world
        destination screens that teleports the player to preset locations. The interior was
        completely reconfigured from a laboratory into a racing and engineering space — entirely
        through Unreal Editor level design (static mesh placement, material assignment, collision
        generation) with no C++ or Blueprint modification to the template's core VR systems.
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Source</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Building Exterior &amp; Structure</strong></td>
            <td>VR Lab template (unmodified)</td>
            <td>Physical shell, windows, and ambient lighting rig for the entire hub.</td>
          </tr>
          <tr>
            <td><strong>VR Locomotion</strong></td>
            <td>VR Lab template (unmodified)</td>
            <td>Teleport arc targeting and smooth thumbstick locomotion for player movement.</td>
          </tr>
          <tr>
            <td><strong>VR Grab Interaction</strong></td>
            <td>VR Lab template (unmodified)</td>
            <td>Pick up, inspect, and place objects using VR motion controllers.</td>
          </tr>
          <tr>
            <td><strong>Elevator + Teleport Screens</strong></td>
            <td>VR Lab template (unmodified)</td>
            <td>
              In-world navigation — screens inside the elevator display available destinations;
              selecting one teleports the player to a pre-configured location in the hub.
            </td>
          </tr>
          <tr>
            <td><strong>Interior Layout &amp; Set Dressing</strong></td>
            <td>Custom (level design)</td>
            <td>
              Sim racer rig (multiple static meshes merged into a cohesive actor), high-detail F1
              tyres, custom computer workstations simulating an engineering telemetry deck.
            </td>
          </tr>
          <tr>
            <td><strong>Object Collisions</strong></td>
            <td>Custom (per-object, UE editor)</td>
            <td>
              Generated for every placed asset — furniture, vehicles, tyres, workstations. Required
              to enable VR interaction: picking up objects, bumping into surfaces, standing on
              geometry.
            </td>
          </tr>
        </tbody>
      </table>

      <div className="design-decision">
        <strong>Design Decision — Build on an Existing VR Template:</strong> Core VR mechanics
        (locomotion, comfort tuning, controller interaction) are notoriously difficult to implement
        correctly — latency, locomotion sickness, and input handling each require significant
        effort. By inheriting a proven VR lab template, the team eliminated that risk entirely and
        redirected all development effort to domain-specific content: the racing environment,
        telemetry charts, vehicle assets, and AI integration. No template code was modified,
        keeping the foundation stable and upgradeable.
      </div>

      <h2>Vehicle Asset Pipeline</h2>
      <p>
        The VR asset subsystem uses three ingestion paths (direct import, geometry reduction, and
        custom conversion) to handle heterogeneous source formats while keeping runtime assets
        within VR performance constraints.
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Source Format</th>
            <th>Pipeline</th>
            <th>Key Steps</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Lewis Hamilton's Ferrari</strong></td>
            <td>Pre-made 3D model</td>
            <td>Direct import</td>
            <td>Import as static mesh into UE4. Generate collision.</td>
            <td>Static mesh actor (scene centrepiece)</td>
          </tr>
          <tr>
            <td><strong>UCL Formula Student Car</strong></td>
            <td>High-poly 3D model (~9.5 M triangles)</td>
            <td>Blender → UE4</td>
            <td>
              1) Import into Blender.
              2) Decimate modifier: 9.5 M → 250 K triangles.
              3) Export FBX.
              4) Import into UE4.
              5) Re-apply materials and textures.
              6) Generate collision.
            </td>
            <td>Optimised static mesh (~250 K tris)</td>
          </tr>
          <tr>
            <td><strong>TORCS car1-ow1 (IBM Livery)</strong></td>
            <td>TORCS AC3D <code>.acc</code> mesh + SGI <code>.rgb</code> textures</td>
            <td>Custom Python script (<code>export_car.py</code>) → UE4</td>
            <td>
              1) Parse <code>.acc</code> files — extract vertices, normals, UVs.
              2) Fan-triangulate polygons.
              3) Convert <code>.rgb</code> → <code>.png</code> via Pillow (vertical flip for UE4
              origin convention).
              4) Write Wavefront OBJ + MTL.
              5) Import textures into UE4 first (auto-generates materials), then OBJ meshes.
              6) Generate collision.
            </td>
            <td>
              Car body: 1,954 verts / 2,640 tris.
              4 × wheels: 240 verts / 302 tris each.
            </td>
          </tr>
        </tbody>
      </table>

      <h3>TORCS Export — File Mapping</h3>
      <pre className="code-block"><code>{`TORCS Source Files                            Export Output
─────────────────                             ────────────
cars/car1-ow1/car1-ow1.acc          →         car1-ow1.obj + car1-ow1.mtl
drivers/scr_server/0/car1-ow1.rgb   →         car1-ow1_livery.png  (IBM livery, 512×512)
cars/car1-ow1/tex-wheel.rgb         →         tex-wheel.png         (128×128)
cars/car1-ow1/shadow.rgb            →         shadow.png            (shadow decal)
wheels/openwheel1-1/wheel*.acc      →         wheel_front_left.obj
                                              wheel_front_right.obj
                                              wheel_rear_left.obj
                                              wheel_rear_right.obj
wheels/openwheel1-1/wheel3d.png     →         wheel3d.png           (copied as-is)`}</code></pre>
      <p>
        The <code>.acc</code> format is a TORCS-extended AC3D format: each vertex line carries 6
        values (<code>x y z nx ny nz</code>) and each surface reference line carries 9 values
        (vertex index + 4 UV channels). The script extracts only the base UV channel and applies
        fan triangulation for quads and n-gons. Architecture-wise, this stage acts as a schema
        normalisation boundary: non-standard TORCS geometry is transformed into UE-compatible
        assets with deterministic validation gates before import.
      </p>

      <div className="design-decision">
        <strong>Design Decision — Custom Python Export Script:</strong> No existing tool could
        correctly parse the TORCS-extended AC3D format, which uses non-standard per-vertex normals
        inlined into the vertex block and a multi-channel UV layout that standard AC3D parsers
        ignore. Writing <code>export_car.py</code> was therefore necessary. The script is
        fully re-runnable (<code>python export_car.py</code>) and produces deterministic output,
        making it a reproducible pipeline rather than a one-off manual conversion — useful if
        livery textures or geometry need updating.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0 2rem' }}>
        <img
          src={`${process.env.PUBLIC_URL}/images/UI_images/VR-Vehicle-Assets-Ferrari.png`}
          alt="Ferrari F1 car in the VR lab with telemetry upload prompt on the wall"
          style={{ width: '100%', borderRadius: '4px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/UI_images/VR-Vehicle-Assets-UCLR.png`}
          alt="UCL Racing Formula Student car in the VR lab with UCL Racing branding screens"
          style={{ width: '100%', borderRadius: '4px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
        />
      </div>

      <h2>Interactive Media System</h2>
      <p>
        Virtual screens in the environment display video and static imagery through two parallel
        systems: a dynamic video pipeline using UE4's Media Framework, and a static imagery
        approach using emissive/unlit materials applied directly to screen mesh surfaces.
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>UE4 Type</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>FileMediaSource</code></td>
            <td>UE4 Media Framework</td>
            <td>Points to a local video file on disk; provides the stream source for the MediaPlayer.</td>
          </tr>
          <tr>
            <td><code>MediaPlayer</code></td>
            <td>UE4 Media Framework</td>
            <td>Controls playback state — play, pause, seek. Consumes the FileMediaSource stream.</td>
          </tr>
          <tr>
            <td><code>MediaTexture</code></td>
            <td>UE4 Media Framework</td>
            <td>Receives decoded video frames from the MediaPlayer and exposes them as a texture for materials.</td>
          </tr>
          <tr>
            <td>Media Blueprint</td>
            <td>UE4 Blueprint actor</td>
            <td>
              Binds VR controller input to play/pause commands on the MediaPlayer, allowing the
              user to control video playback while in VR without leaving the scene.
            </td>
          </tr>
          <tr>
            <td>Emissive Screen Material</td>
            <td>UE4 Material (Unlit shading model)</td>
            <td>
              Displays static logos and images on TV mesh objects. Bypasses scene lighting —
              the image appears self-lit, accurately mimicking a real backlit screen regardless
              of the surrounding VR environment's lighting conditions.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Dynamic video content uses the <code>FileMediaSource</code> → <code>MediaPlayer</code> →{' '}
        <code>MediaTexture</code> pipeline, with a Blueprint actor bridging controller input to
        playback commands. Static imagery (logos, branding, infographics) uses emissive/unlit
        materials applied directly to the screen mesh. Standard lit materials were avoided for
        static screens because they receive scene lighting — a screen in a dimly lit corner would
        appear dark, which is physically incorrect for a self-illuminating display.
      </p>

      <img
        src={`${process.env.PUBLIC_URL}/images/UI_images/VR-Interactive-Media-And-Displays-1.png`}
        alt="VR lounge with static branding screens showing Ferrari and F1 logos"
        style={{ width: '100%', borderRadius: '4px', margin: '1rem 0 2rem', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
      />

      <h2>AI-Driven Presentations (Convai)</h2>
      <p>
        AI avatar characters present slides dynamically on VR monitors. Slide content is decoupled
        from the UE4 build — images are hosted externally and referenced by URL in the Convai
        character's knowledge base, so slides can be updated without recompiling or repackaging
        the project.
      </p>
      <div className="seq-diagram">
        <div className="seq-actors">
          <div className="seq-actor seq-actor--entry">
            <span className="seq-actor__name">Slide Author</span>
            <span className="seq-actor__type">external</span>
          </div>
          <div className="seq-actor seq-actor--plain">
            <span className="seq-actor__name">imgbb.com</span>
            <span className="seq-actor__type">image host</span>
          </div>
          <div className="seq-actor seq-actor--ui">
            <span className="seq-actor__name">Convai Platform</span>
            <span className="seq-actor__type">cloud AI</span>
          </div>
          <div className="seq-actor seq-actor--game">
            <span className="seq-actor__name">UE4 VR Scene</span>
            <span className="seq-actor__type">runtime</span>
          </div>
        </div>
        <div className="seq-body">
          <div className="seq-note">[setup — done once per content update, no recompile needed]</div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--entry">Slide Author</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--plain">imgbb.com</span>
            <span className="seq-msg__label">: upload slide images</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--plain">imgbb.com</span>
            <span className="seq-msg__arrow seq-msg__arrow--back">→</span>
            <span className="seq-msg__to seq-msg__to--entry">Slide Author</span>
            <span className="seq-msg__label">: direct-link URLs (no auth, stable)</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--entry">Slide Author</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--ui">Convai Platform</span>
            <span className="seq-msg__label">: inject image URLs into Character knowledge base</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--entry">Slide Author</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--game">UE4 VR Scene</span>
            <span className="seq-msg__label">: assign Convai Character ID in Blueprint actor</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--game">UE4 VR Scene</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">bind Character actor to virtual screen mesh</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-note">[runtime — each user session in VR]</div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--entry">User</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--ui">Convai Platform</span>
            <span className="seq-msg__label">: interact with AI avatar in VR</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--ui">Convai Platform</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">resolve relevant slide URL from knowledge base</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--ui">Convai Platform</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--game">UE4 VR Scene</span>
            <span className="seq-msg__label">: fetch &amp; render slide on virtual screen</span>
          </div>
        </div>
      </div>

      <table className="section-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Platform</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Presentation Slides</strong></td>
            <td>Authored externally</td>
            <td>Source imagery for the AI to present on VR monitors.</td>
          </tr>
          <tr>
            <td><strong>imgbb.com</strong></td>
            <td>Image hosting service</td>
            <td>
              Hosts slide images and provides direct-link URLs with no authentication required —
              URLs are stable and can be referenced directly from Convai.
            </td>
          </tr>
          <tr>
            <td><strong>Convai Character</strong></td>
            <td>Convai cloud platform</td>
            <td>
              AI avatar with a knowledge base containing the slide image URLs. Processes user
              interaction at runtime and decides which slide to display.
            </td>
          </tr>
          <tr>
            <td><strong>Convai Character ID</strong></td>
            <td>UE4 Blueprint binding</td>
            <td>
              Links a specific Convai Character to a Blueprint actor in the VR scene, connecting
              the cloud AI to the in-world presentation screen.
            </td>
          </tr>
          <tr>
            <td><strong>Virtual Screen (target)</strong></td>
            <td>UE4 static mesh + material</td>
            <td>
              The physical screen surface in the VR environment onto which the Convai character
              renders slides during user interaction.
            </td>
          </tr>
        </tbody>
      </table>

      <div className="design-decision">
        <strong>Design Decision — External Image Hosting for Slide Content:</strong> Embedding
        slide images directly in the UE4 project would require a full recompile and repackage
        every time presentation content changes. By hosting slides on imgbb.com and injecting the
        URLs into Convai's knowledge base, the VR build is completely decoupled from presentation
        content. The Convai character fetches images at runtime, so updating a slide is a
        matter of replacing the hosted image URL — no UE4 editor interaction required.
      </div>

      <img
        src={`${process.env.PUBLIC_URL}/images/UI_images/VR-Interactive-Media-And-Displays-2.png`}
        alt="Convai AI avatar presenting a UCL and IBM project slide on a VR screen"
        style={{ width: '100%', borderRadius: '4px', margin: '1rem 0 2rem', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
      />

      <h2>Telemetry Visualizer — System Architecture</h2>
      <p>
        The visualizer follows a <strong>broadcast-on-load</strong> architecture. A single actor
        instance owns the file I/O and JSON parsing; a <code>TActorIterator</code> then fans out
        the parsed data to every <code>ATelemetryVisualizer</code> in the level so that all charts
        refresh simultaneously from one file load. Each actor independently manages its own Kantan
        Charts widget lifecycle, from construction through datasource binding to data population.
      </p>
      <div className="flow-diagram">
        <div className="flow-actor flow-actor--thread">
          <span className="flow-actor__name">Broadcast-on-Load</span>
          <span className="flow-actor__type">ATelemetryVisualizer · UE4 C++ Actor · triggered by 'O' key</span>
        </div>
        <div className="flow-steps">
          <div className="flow-step">
            <span className="flow-step__text">User presses 'O' key</span>
            <span className="flow-step__badge">input</span>
          </div>
          <div className="flow-step">
            <span className="flow-step__text">GetOpenFileName(OFN_NOCHANGEDIR) — Win32 commdlg.h</span>
            <span className="flow-step__badge">Win32</span>
          </div>
          <div className="flow-step flow-step--branch">
            <span className="flow-step__text">cancel → early return</span>
            <span className="flow-step__badge flow-step__badge--game">guard</span>
          </div>
          <div className="flow-step">
            <span className="flow-step__text">SetInputMode(GameOnly) — recapture mouse look</span>
          </div>
          <div className="flow-step">
            <span className="flow-step__text">FFileHelper::LoadFileToString()</span>
          </div>
          <div className="flow-step">
            <span className="flow-step__text">FJsonSerializer::Deserialize() — extract "telemetry" object + elapsed_time array</span>
          </div>
          <div className="flow-step">
            <span className="flow-step__text">TActorIterator fan-out → LoadMetricFromJson() on every ATelemetryVisualizer in level</span>
            <span className="flow-step__badge flow-step__badge--game">broadcast</span>
          </div>
        </div>
        <div className="flow-sub">
          <div className="flow-sub__label">Per instance — LoadMetricFromJson</div>
          <div className="flow-rule-grid">
            <div className="flow-rule">
              <span className="flow-rule__name">CreateWidget</span>
              <span className="flow-rule__cond">UChartContainerWidget at runtime</span>
            </div>
            <div className="flow-rule">
              <span className="flow-rule__name">ConstructWidget</span>
              <span className="flow-rule__cond">USimpleCartesianPlot → set as RootWidget</span>
            </div>
            <div className="flow-rule">
              <span className="flow-rule__name">SetWidget</span>
              <span className="flow-rule__cond">WidgetComp → TakeWidget() binds datasource</span>
            </div>
            <div className="flow-rule">
              <span className="flow-rule__name">GetSubSeries()</span>
              <span className="flow-rule__cond">TArray&lt;FTelemetrySubSeries&gt; — 1–5 entries</span>
            </div>
            <div className="flow-rule">
              <span className="flow-rule__name">BP_AddDatapoint()</span>
              <span className="flow-rule__cond">loop per sub-series · down-sample if &gt; 6 000 pts</span>
            </div>
            <div className="flow-rule">
              <span className="flow-rule__name">ConfigureChart()</span>
              <span className="flow-rule__cond">axes · FixedRange · colours · anti-aliasing</span>
            </div>
          </div>
          <div className="flow-sub__return">Plot→SynchronizeProperties() — flush UPROPERTY changes to Slate</div>
        </div>
      </div>

      <table className="section-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Type</th>
            <th>Responsibility</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ATelemetryVisualizer</code></td>
            <td>C++ AActor (Unreal)</td>
            <td>
              Owns the file dialog, JSON parse, broadcast, widget lifecycle, data population, and
              chart configuration. One instance per chart placed in the VR scene. Exposes
              per-instance properties (<code>TargetMetric</code>, <code>ChartDrawSize</code>,{' '}
              <code>VisualScale</code>, <code>LineColor</code>, <code>LineThickness</code>) via
              the Unreal Details panel.
            </td>
          </tr>
          <tr>
            <td><code>UChartContainerWidget</code></td>
            <td>C++ UUserWidget (UMG)</td>
            <td>
              Minimal shell widget created at runtime to host the <code>USimpleCartesianPlot</code>.
              Has no custom logic — exists solely because Kantan Charts requires its plot to be
              the root of a UUserWidget tree for the datasource binding to initialise correctly.
            </td>
          </tr>
          <tr>
            <td><code>USimpleCartesianPlot</code></td>
            <td>Kantan Charts plugin widget</td>
            <td>
              Renders the actual line chart. Exposes <code>BP_AddSeriesWithId</code>,{' '}
              <code>BP_AddDatapoint</code>, axis configuration, fixed-range plot scale, per-series
              style overrides, and <code>SynchronizeProperties</code> to flush changes to the
              underlying Slate widget.
            </td>
          </tr>
          <tr>
            <td><code>ETelemetryMetric</code></td>
            <td>C++ UENUM</td>
            <td>
              Enumerates every supported metric (Speed, RPM, Gear, Throttle, Brake, Fuel,
              SteerAngle, GForceLat, GForceLon, TyrePressure, TyreTemp, TyreWear, WheelSlip,
              Suspension, RideHeight, CarDamage, ElapsedTime, LapNumber, PosX, PosZ). Exposed to
              the Unreal Details panel so users pick a metric per actor instance without recompiling.
            </td>
          </tr>
          <tr>
            <td><code>FTelemetrySubSeries</code></td>
            <td>Plain C++ struct</td>
            <td>
              Holds <code>JsonKey</code> (the key to look up in the telemetry JSON object),{' '}
              <code>DisplayName</code> (chart legend label), and <code>Color</code> (line colour).
              Returned as a <code>TArray</code> by <code>GetSubSeries()</code> — one entry for
              single-line metrics, 2–5 entries for grouped metrics.
            </td>
          </tr>
        </tbody>
      </table>

      <img
        src={`${process.env.PUBLIC_URL}/images/UI_images/VR-Telemetry-Visualizer-Charts.png`}
        alt="Two Kantan Charts telemetry graphs mounted on the VR lab wall showing tyre pressures and RPM"
        style={{ width: '100%', borderRadius: '4px', margin: '1rem 0 2rem', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
      />

      <h2>Sequence Diagram</h2>
      <div className="seq-diagram">
        <div className="seq-actors">
          <div className="seq-actor seq-actor--entry">
            <span className="seq-actor__name">User</span>
            <span className="seq-actor__type">VR headset</span>
          </div>
          <div className="seq-actor seq-actor--thread">
            <span className="seq-actor__name">ATelemetryVisualizer[0]</span>
            <span className="seq-actor__type">UE4 Actor</span>
          </div>
          <div className="seq-actor seq-actor--plain">
            <span className="seq-actor__name">Win32 API</span>
            <span className="seq-actor__type">commdlg.h</span>
          </div>
          <div className="seq-actor seq-actor--plain">
            <span className="seq-actor__name">TActorIterator</span>
            <span className="seq-actor__type">broadcast</span>
          </div>
          <div className="seq-actor seq-actor--game">
            <span className="seq-actor__name">ATelemetryVisualizer[N]</span>
            <span className="seq-actor__type">each instance</span>
          </div>
        </div>
        <div className="seq-body">
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--entry">User</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--thread">ATelemetryVisualizer[0]</span>
            <span className="seq-msg__label">: press 'O' key</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">ATelemetryVisualizer[0]</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--plain">Win32 API</span>
            <span className="seq-msg__label">: GetOpenFileName(OFN_NOCHANGEDIR)</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--plain">Win32 API</span>
            <span className="seq-msg__arrow seq-msg__arrow--back">→</span>
            <span className="seq-msg__to seq-msg__to--thread">ATelemetryVisualizer[0]</span>
            <span className="seq-msg__label">: file path (or cancel → early return)</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">ATelemetryVisualizer[0]</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">SetInputMode(GameOnly) — recapture mouse look</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">ATelemetryVisualizer[0]</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">FFileHelper::LoadFileToString()</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">ATelemetryVisualizer[0]</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">FJsonSerializer::Deserialize() — extract "telemetry" object + elapsed_time array</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-note">[broadcast — TActorIterator fans out to all instances in the level]</div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">ATelemetryVisualizer[0]</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--plain">TActorIterator</span>
            <span className="seq-msg__label">: iterate ATelemetryVisualizer actors</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--plain">TActorIterator</span>
            <span className="seq-msg__arrow seq-msg__arrow--fwd">→</span>
            <span className="seq-msg__to seq-msg__to--game">ATelemetryVisualizer[N]</span>
            <span className="seq-msg__label">: LoadMetricFromJson(JsonObj, ElapsedTime)</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--thread">ATelemetryVisualizer[0]</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">LoadMetricFromJson(self) — same widget lifecycle as [N]</span>
          </div>
          <hr className="seq-sep" />
          <div className="seq-note">[each instance — widget creation, data population, chart configuration]</div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--game">ATelemetryVisualizer[N]</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">CreateWidget&lt;UChartContainerWidget&gt;</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--game">ATelemetryVisualizer[N]</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">WidgetTree→ConstructWidget&lt;USimpleCartesianPlot&gt; — set as RootWidget</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--game">ATelemetryVisualizer[N]</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">WidgetComp→SetWidget(Container) — triggers TakeWidget() → binds datasource</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--game">ATelemetryVisualizer[N]</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">BP_AddSeriesWithId() — per sub-series from GetSubSeries()</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--game">ATelemetryVisualizer[N]</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">BP_AddDatapoint() loop — down-sample if &gt; 6 000 pts</span>
            <span className="seq-msg__note">per sub-series</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--game">ATelemetryVisualizer[N]</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">ConfigureChart() — axes, FixedRange, colours, line style, anti-aliasing</span>
          </div>
          <div className="seq-msg">
            <span className="seq-msg__from seq-msg__from--game">ATelemetryVisualizer[N]</span>
            <span className="seq-msg__arrow seq-msg__arrow--self">↺</span>
            <span className="seq-msg__label">Plot→SynchronizeProperties() — flush UPROPERTY changes to Slate</span>
          </div>
        </div>
      </div>

      <h2>Design Patterns</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>Pattern</th>
            <th>Where Used</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Observer (Broadcast)</strong></td>
            <td><code>OnOpenFilePressed</code> → <code>TActorIterator</code> fan-out</td>
            <td>
              Single file parse triggers all chart instances. Decouples file I/O from per-chart
              widget logic — adding a new chart actor to the scene requires no code changes.
            </td>
          </tr>
          <tr>
            <td><strong>Strategy (Sub-Series)</strong></td>
            <td><code>GetSubSeries()</code> switch on <code>ETelemetryMetric</code></td>
            <td>
              Each metric enum value maps to a different sub-series strategy (1, 2, 4, or 5 lines)
              without conditional logic in the data population loop. The loop always iterates the
              returned array uniformly.
            </td>
          </tr>
          <tr>
            <td><strong>Factory</strong></td>
            <td><code>FTelemetrySubSeries</code> construction inside <code>GetSubSeries()</code></td>
            <td>
              Encapsulates JsonKey, DisplayName, and Color per sub-series. Callers iterate the
              returned array without needing to know the group structure of the metric.
            </td>
          </tr>
          <tr>
            <td><strong>Template Method</strong></td>
            <td><code>LoadMetricFromJson</code></td>
            <td>
              Enforces a fixed skeleton — create widget → attach → add series → populate →
              configure → sync — regardless of metric type. Sub-series count and JSON keys vary
              but the sequence is invariant.
            </td>
          </tr>
          <tr>
            <td><strong>Null Object / Guard</strong></td>
            <td>WidgetTree null-check, zero-range expansion, datapoint fail counting</td>
            <td>
              Defensive patterns that handle edge cases (uninitialised widget tree, flat
              single-value datasets, malformed JSON arrays) without altering the main flow or
              requiring callers to check return values.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Class Diagram</h2>
      <div className="arch-diagram">

        {/* ATelemetryVisualizer — main actor, full-width */}
        <div className="arch-node arch-node--live">
          <div className="arch-node__header">
            <span className="arch-node__title">ATelemetryVisualizer</span>
            <span className="arch-badge arch-badge--red">AActor</span>
          </div>
          <div className="arch-node__sub">TelemetryVisualizer.h / TelemetryVisualizer.cpp</div>
          <ul className="arch-node__bullets">
            <li>− WidgetComp: UWidgetComponent &nbsp;·&nbsp; − RootComp: USceneComponent</li>
            <li>+ TargetMetric: ETelemetryMetric &nbsp;·&nbsp; + ChartDrawSize: FVector2D</li>
            <li>+ VisualScale: float &nbsp;·&nbsp; + LineColor: FLinearColor &nbsp;·&nbsp; + LineThickness: float</li>
            <li>+ OnOpenFilePressed() — opens Win32 dialog, parses JSON, broadcasts to all instances</li>
            <li>+ LoadMetricFromJson(JsonObj, ElapsedTime) — full widget lifecycle + data population</li>
            <li>+ GetSubSeries() [static] → TArray&lt;FTelemetrySubSeries&gt;</li>
            <li>+ MetricDisplayName() [static] &nbsp;·&nbsp; + MetricYAxisLabel() [static]</li>
            <li>− ApplyWidgetSettings() &nbsp;·&nbsp; − ConfigureChart()</li>
          </ul>
        </div>

        {/* Fan-out to supporting types */}
        <div className="arch-fanout-wrap">
          <div className="arch-fanout-wrap__vline" />
          <div className="arch-fanout-wrap__label">WidgetComp → &nbsp;·&nbsp; renders via &nbsp;·&nbsp; TargetMetric uses &nbsp;·&nbsp; GetSubSeries() returns</div>
          <div className="arch-fanout-wrap__hbar" />
        </div>

        <div className="arch-row arch-row--2">

          {/* Left column: UChartContainerWidget → USimpleCartesianPlot */}
          <div className="arch-col">
            <div className="arch-drop" />
            <div className="arch-node arch-node--worker">
              <div className="arch-node__header">
                <span className="arch-node__title">UChartContainerWidget</span>
                <span className="arch-badge arch-badge--thread">UUserWidget</span>
              </div>
              <div className="arch-node__sub">minimal shell — no custom logic</div>
              <ul className="arch-node__bullets">
                <li>− WidgetTree: UWidgetTree</li>
                <li>Created at runtime via CreateWidget&lt;&gt;</li>
                <li>Hosts USimpleCartesianPlot as RootWidget</li>
              </ul>
            </div>
            <div className="arch-vline-sm" />
            <div className="arch-node arch-node--post">
              <div className="arch-node__header">
                <span className="arch-node__title">USimpleCartesianPlot</span>
                <span className="arch-badge">Kantan Charts</span>
              </div>
              <div className="arch-node__sub">plugin widget — Slate line chart renderer</div>
              <ul className="arch-node__bullets">
                <li>+ BP_AddSeriesWithId() &nbsp;·&nbsp; + BP_AddDatapoint()</li>
                <li>+ SetPlotScaleByRange() — FixedRange with padding</li>
                <li>+ SetXAxisConfig() &nbsp;·&nbsp; + SetYAxisConfig()</li>
                <li>+ AddSeriesStyleOverride() — per-series colour</li>
                <li>+ SynchronizeProperties() — flush UPROPERTY changes to Slate</li>
              </ul>
            </div>
          </div>

          {/* Right column: ETelemetryMetric → FTelemetrySubSeries */}
          <div className="arch-col">
            <div className="arch-drop" />
            <div className="arch-node arch-node--settings">
              <div className="arch-node__header">
                <span className="arch-node__title">ETelemetryMetric</span>
                <span className="arch-badge arch-badge--ui">UENUM</span>
              </div>
              <div className="arch-node__sub">exposed in Unreal Details panel — one value per actor instance</div>
              <ul className="arch-node__bullets">
                <li>Speed, RPM, Gear, Throttle, Brake, Fuel</li>
                <li>SteerAngle, GForceLat, GForceLon</li>
                <li>TyrePressure, TyreTemp, TyreWear</li>
                <li>WheelSlip, Suspension, RideHeight</li>
                <li>CarDamage, ElapsedTime, LapNumber, PosX, PosZ</li>
              </ul>
            </div>
            <div className="arch-vline-sm" />
            <div className="arch-node arch-node--viewer">
              <div className="arch-node__header">
                <span className="arch-node__title">FTelemetrySubSeries</span>
                <span className="arch-badge">plain struct</span>
              </div>
              <div className="arch-node__sub">returned as TArray by GetSubSeries() — 1–5 entries per metric</div>
              <ul className="arch-node__bullets">
                <li>+ JsonKey: FString — key in telemetry JSON object</li>
                <li>+ DisplayName: FString — chart legend label</li>
                <li>+ Color: FLinearColor — line colour for this sub-series</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <h2>Data Storage</h2>
      <p>
        The VR Telemetry Visualizer has <strong>no database</strong>. It reads{' '}
        <code>.jsession</code> files directly at runtime. These files are produced by the Data
        Pipeline's session recorder and CSV exporter — the VR system is a pure consumer of that
        output. All telemetry arrays inside the file share the same length as{' '}
        <code>elapsed_time</code>, which the visualizer uses as the shared X-axis across every
        chart instance.
      </p>
      <div className="er-diagram">
        <div className="er-hub">
          <div className="er-table er-table--sessions">
            <div className="er-table__name">.jsession file</div>
            <div className="er-table__col">
              <span className="er-table__colname">version</span>
              <span className="er-table__coltype">integer</span>
            </div>
            <div className="er-table__col">
              <span className="er-table__colname">metadata</span>
              <span className="er-table__coltype">object</span>
            </div>
            <div className="er-table__col">
              <span className="er-table__colname">laps</span>
              <span className="er-table__coltype">array</span>
            </div>
            <div className="er-table__col">
              <span className="er-table__colname">telemetry</span>
              <span className="er-table__coltype">object</span>
            </div>
          </div>
        </div>
        <div className="er-rel-strip">
          <span className="er-rel-badge">metadata &#123; &#125;</span>
          <span className="er-rel-badge">laps [ ]</span>
          <span className="er-rel-badge">telemetry &#123; &#125;</span>
        </div>
        <div className="er-grid er-grid--3">
          <div className="er-table">
            <div className="er-table__name">metadata</div>
            <div className="er-table__col"><span className="er-table__colname">game</span><span className="er-table__coltype">string</span></div>
            <div className="er-table__col"><span className="er-table__colname">track_name</span><span className="er-table__coltype">string</span></div>
            <div className="er-table__col"><span className="er-table__colname">car_model</span><span className="er-table__coltype">string</span></div>
            <div className="er-table__col"><span className="er-table__colname">player_name</span><span className="er-table__coltype">string</span></div>
            <div className="er-table__col"><span className="er-table__colname">total_laps</span><span className="er-table__coltype">integer</span></div>
            <div className="er-table__col"><span className="er-table__colname">best_lap_time</span><span className="er-table__coltype">float · seconds</span></div>
            <div className="er-table__col"><span className="er-table__colname">notes</span><span className="er-table__coltype">string</span></div>
          </div>
          <div className="er-table er-table--laps">
            <div className="er-table__name">laps [ ]</div>
            <div className="er-table__col"><span className="er-table__colname">lap_number</span><span className="er-table__coltype">integer</span></div>
            <div className="er-table__col"><span className="er-table__colname">lap_time</span><span className="er-table__coltype">float · seconds</span></div>
            <div className="er-table__col"><span className="er-table__colname">fuel_start</span><span className="er-table__coltype">float · litres</span></div>
            <div className="er-table__col"><span className="er-table__colname">fuel_end</span><span className="er-table__coltype">float · litres</span></div>
            <div className="er-table__col"><span className="er-table__colname">avg_speed</span><span className="er-table__coltype">float · km/h</span></div>
            <div className="er-table__col"><span className="er-table__colname">max_speed</span><span className="er-table__coltype">float · km/h</span></div>
            <div className="er-table__col"><span className="er-table__colname">valid</span><span className="er-table__coltype">0 | 1</span></div>
          </div>
          <div className="er-table er-table--telemetry">
            <div className="er-table__name">telemetry &#123; &#125;</div>
            <div className="er-table__col"><span className="er-table__colname">elapsed_time</span><span className="er-table__coltype">float[ ] · X axis</span></div>
            <div className="er-table__col"><span className="er-table__colname">speed · rpm · gear</span><span className="er-table__coltype">float[ ]</span></div>
            <div className="er-table__col"><span className="er-table__colname">throttle · brake · fuel</span><span className="er-table__coltype">float[ ]</span></div>
            <div className="er-table__col"><span className="er-table__colname">tyre_pressure_fl/fr/rl/rr</span><span className="er-table__coltype">float[ ]</span></div>
            <div className="er-table__col"><span className="er-table__colname">tyre_temp_fl/fr/rl/rr</span><span className="er-table__coltype">float[ ]</span></div>
            <div className="er-table__col"><span className="er-table__colname">suspension_fl/fr/rl/rr</span><span className="er-table__coltype">float[ ]</span></div>
            <div className="er-table__col"><span className="er-table__colname">+ all other metric arrays</span><span className="er-table__coltype">same length</span></div>
          </div>
        </div>
      </div>

      <h2>Packages and APIs</h2>

      <h3>Unreal Module Dependencies</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Module</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Core, CoreUObject, Engine, InputCore</code></td>
            <td>Unreal Engine fundamentals — object model, actor lifecycle, input binding.</td>
          </tr>
          <tr>
            <td><code>UMG, Slate, SlateCore</code></td>
            <td>
              Widget system for in-world UI. UMG provides <code>UWidgetComponent</code> and{' '}
              <code>UUserWidget</code>; Slate provides the underlying render layer that Kantan
              Charts draws into.
            </td>
          </tr>
          <tr>
            <td><code>Json, JsonUtilities</code></td>
            <td>
              <code>FJsonSerializer::Deserialize</code> and <code>FFileHelper::LoadFileToString</code>{' '}
              for parsing <code>.jsession</code> files at runtime.
            </td>
          </tr>
          <tr>
            <td><code>KantanChartsUMG, KantanChartsSlate, KantanChartsDatasource</code></td>
            <td>
              Kantan Charts plugin — provides <code>USimpleCartesianPlot</code> (UMG widget),
              its Slate renderer, and the datasource interface that is bound during{' '}
              <code>SynchronizeProperties()</code>.
            </td>
          </tr>
        </tbody>
      </table>

      <h3>External API (Win32)</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>API</th>
            <th>Header</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>GetOpenFileName</code></td>
            <td><code>commdlg.h</code></td>
            <td>
              Native Windows file-open dialog. Used instead of Unreal's{' '}
              <code>IDesktopPlatform</code> module because <code>DesktopPlatform</code> is
              editor-only and causes linker errors in Shipping builds.{' '}
              <code>OFN_NOCHANGEDIR</code> prevents the dialog from altering the process working
              directory.
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Internal C++ API</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Method</th>
            <th>Signature</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>OnOpenFilePressed</code></td>
            <td><code>void()</code></td>
            <td>
              Bound to the 'O' key in <code>BeginPlay</code>. Opens the Win32 file dialog, loads
              and parses the JSON session file, then broadcasts parsed data to all{' '}
              <code>ATelemetryVisualizer</code> instances via <code>TActorIterator</code>.
            </td>
          </tr>
          <tr>
            <td><code>LoadMetricFromJson</code></td>
            <td><code>void(TSharedPtr&lt;FJsonObject&gt;, TArray&lt;float&gt;)</code></td>
            <td>
              Receives the full telemetry JSON object and the pre-extracted elapsed time array.
              Executes the full widget creation, data population, and chart configuration sequence
              for this actor's configured metric.
            </td>
          </tr>
          <tr>
            <td><code>GetSubSeries</code></td>
            <td><code>static TArray&lt;FTelemetrySubSeries&gt;(ETelemetryMetric, FLinearColor)</code></td>
            <td>
              Returns the sub-series definitions for a given metric: 1 entry for single-value
              metrics, 2 for Ride Height, 4 for 4-corner metrics (tyre/suspension), 5 for Car
              Damage. The data population loop iterates this array uniformly regardless of metric
              type.
            </td>
          </tr>
          <tr>
            <td><code>MetricDisplayName</code></td>
            <td><code>static FString(ETelemetryMetric)</code></td>
            <td>Human-readable metric name derived from UENUM reflection, used as the chart title.</td>
          </tr>
          <tr>
            <td><code>MetricYAxisLabel</code></td>
            <td><code>static FString(ETelemetryMetric)</code></td>
            <td>
              Unit string for the Y-axis label (e.g. <code>"km/h"</code>, <code>"PSI"</code>,{' '}
              <code>"°C"</code>) to make charts self-describing without external documentation.
            </td>
          </tr>
        </tbody>
      </table>

      </>)}

    </SectionPage>
  );
}

export default SystemDesign;
