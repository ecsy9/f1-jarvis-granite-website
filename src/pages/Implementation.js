import { useState } from 'react';
import SectionPage from '../components/SectionPage';
import './Implementation.css';

const TABS = ['Overview', 'UI', 'Data Pipeline', 'AI Pipeline', 'VR'];

function Implementation() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <SectionPage title="Implementation" activeTab={activeTab}>
      <div className="impl-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`impl-tab${activeTab === tab ? ' impl-tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (<>
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
      </>)}

      {activeTab === 'UI' && (<>
        <p>
          The UI is built with <strong>PyQt5</strong> and <strong>Matplotlib</strong>, providing both
          a live telemetry dashboard during driving and a full post-race review environment. All
          charts are embedded via <code>FigureCanvasQTAgg</code> and share a consistent dark theme.
        </p>

        <h2>Real-Time Dashboard</h2>
        <p>
          <strong>Files:</strong> <code>ui/main_window.py</code>, <code>ui/canvases/</code>, <code>ui/styles.py</code><br />
          <strong>Libraries:</strong> PyQt5, Matplotlib
        </p>
        <p>
          The <code>MainWindow</code> uses a <strong>three-column layout</strong> with stretch
          ratios 3:5:2:
        </p>
        <table className="section-table">
          <thead>
            <tr>
              <th>Left Column (3)</th>
              <th>Middle Column (5)</th>
              <th>Right Column (2)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Track map (speed-colored racing line)</td>
              <td>6 telemetry graphs: Speed, Gear, RPM, Brake, Throttle, Tire Temp</td>
              <td>Session info (driver, car, track)</td>
            </tr>
            <tr>
              <td>Lap times table with deltas</td>
              <td>Sliding window selector (30s / 60s / 90s / All)</td>
              <td>Live telemetry readouts</td>
            </tr>
            <tr>
              <td>Delta-to-best-lap graph</td>
              <td></td>
              <td>Communications transcript</td>
            </tr>
          </tbody>
        </table>

        <h3>Canvas Implementations</h3>
        <p>
          <strong>TrackMapCanvas</strong> renders the racing line as a speed-colored path
          using <code>LineCollection</code> mapped to a <code>Blues</code> colormap (dark=slow,
          bright=fast). A red-bordered white circle marks the car's current position. Axis limits
          lock from the first completed lap to prevent resizing.
        </p>
        <p>
          <strong>TimeSeriesCanvas</strong> displays a single <code>Line2D</code> artist for
          metrics like speed or RPM with a configurable sliding window (last 30/60/90 seconds).
        </p>
        <p>
          <strong>MultiLineCanvas</strong> overlays four <code>Line2D</code> artists for per-tire
          data, each with a distinct colour: FL=#FF6B6B, FR=#4ECDC4, RL=#FFD93D, RR=#6BCB77.
        </p>

        <h3>Throttled Rendering</h3>
        <p>
          Raw telemetry arrives at 60 Hz, but rendering every frame would overwhelm the UI.
          Throttling is applied at multiple levels:
        </p>
        <table className="section-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Rate</th>
              <th>Mechanism</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Graph updates</td>
              <td>~3 Hz (every 20th sample)</td>
              <td><code>if len(samples) % 20 == 0</code></td>
            </tr>
            <tr>
              <td>Status panel</td>
              <td>~6 Hz (every 10th frame)</td>
              <td><code>if frame_count % 10 == 0</code></td>
            </tr>
            <tr>
              <td>Matplotlib draw</td>
              <td>Deferred</td>
              <td><code>canvas.draw_idle()</code> instead of <code>draw()</code></td>
            </tr>
          </tbody>
        </table>

        <h3>Signal/Slot Wiring</h3>
        <p>
          All telemetry workers run on separate <code>QThread</code> instances and communicate
          with the UI via PyQt5's thread-safe signal/slot mechanism:
        </p>
        <pre className="code-block"><code>{`telemetry_thread.realtime_sample.connect(window.handle_realtime_sample)
telemetry_thread.lap_completed.connect(window.handle_lap_complete)
telemetry_thread.session_info_update.connect(window.update_session_info)
telemetry_thread.live_data_update.connect(window.update_live_data)
telemetry_thread.session_reset.connect(window.reset_session)`}</code></pre>

        <h3>Dark Theme</h3>
        <p>
          All styling is centralised in <code>ui/styles.py</code>: background <code>#111111</code>,
          panels <code>#181818</code>, accent <code>#E10600</code> (F1 Red). Fonts are "Bebas Neue"
          for headings and "Rajdhani" for body text, loaded via <code>QFontDatabase</code>. A
          comprehensive PyQt5 stylesheet covers QMainWindow, QGroupBox, QTableWidget, QPushButton,
          QTabBar, QComboBox, and QSlider.
        </p>

        <h2>Post-Race Lap Viewer</h2>
        <p>
          <strong>Files:</strong> <code>ui/post_race/lap_viewer_window.py</code>, <code>ui/post_race/timeline_controller.py</code><br />
          <strong>Libraries:</strong> PyQt5, Matplotlib
        </p>
        <p>
          The <code>LapViewerWindow</code> (1400x900) provides two tabs: <strong>Lap Review</strong>{' '}
          (telemetry visualization with playback) and <strong>Analysis</strong> (AI-generated
          insights). The left panel shows a lap list with times, a track map, and lap statistics.
          The main area displays up to <strong>6 configurable graphs</strong> selected from 16 types:
        </p>
        <table className="section-table">
          <thead>
            <tr>
              <th>Graph Category</th>
              <th>Available Types</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic Telemetry</td>
              <td>Speed, Gear, RPM, Throttle &amp; Brake, Fuel, Steering Angle</td>
            </tr>
            <tr>
              <td>Tire Data (4 lines)</td>
              <td>Temperature, Pressure, Wear</td>
            </tr>
            <tr>
              <td>Chassis</td>
              <td>G-Forces, Wheel Slip, Suspension, Camber Gain, Ride Height, Car Damage</td>
            </tr>
            <tr>
              <td>Performance</td>
              <td>Delta to Best (green=ahead, red=behind)</td>
            </tr>
          </tbody>
        </table>
        <p>
          A <code>_StayOpenMenu</code> subclass keeps the graph selection dropdown open when toggling
          checkboxes, so users can enable/disable multiple graphs without reopening the menu.
        </p>

        <h3>Timeline Controller</h3>
        <p>
          <code>TimelineController</code> is a playback state machine (play/pause/stop/seek)
          using <code>QElapsedTimer</code> for accurate time tracking at ~30 FPS. Available speeds:
          0.25x, 0.5x, 1x, 2x, 4x. The graph X-axis zoom supports 15s, 30s, 45s, 60s, or full
          lap. A throttling mechanism (33ms minimum between redraws) prevents excessive rendering
          during timeline scrubbing.
        </p>

        <h3>Post-Race Canvases</h3>
        <p>
          <strong>TrackMapCanvas</strong> plots the full racing line coloured by speed
          using <code>LineCollection</code> with a <code>plasma</code> colormap. A red position
          marker moves along the track during playback.
        </p>
        <p>
          <strong>TimeSeriesCanvas</strong> supports single-line, multi-line, delta, and XY scatter
          plots. The delta visualisation uses filled area: green fill below zero (ahead of best
          lap) and red fill above zero (behind). A vertical red dashed line marks the current
          playback time.
        </p>

        <h2>Application Launcher</h2>
        <p>
          <strong>Files:</strong> <code>ui/unified_launcher.py</code>, <code>ui/startup_loader.py</code>, <code>ui/config_manager.py</code>, <code>ui/session_picker.py</code>
        </p>

        <h3>Unified Launcher</h3>
        <p>
          The <code>UnifiedLauncher</code> dialog is the application's entry point, presenting
          three options: <strong>Start Jarvis Live</strong> (real-time dashboard),{' '}
          <strong>Start Jarvis Post</strong> (session picker then lap viewer), and{' '}
          <strong>Setup &amp; Settings</strong> (voice mode, PTT keys, model paths). After a session
          ends, the user returns to the launcher.
        </p>

        <h3>Startup Loading Screen</h3>
        <p>
          <code>StartupLoaderThread</code> runs 11 initialisation stages in a background{' '}
          <code>QThread</code>, reporting progress to a frameless splash screen with per-stage
          status icons (green checkmark / red X / gray dash):
        </p>
        <table className="section-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Stage</th>
              <th>Fatal?</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>App shell initialisation</td><td></td></tr>
            <tr><td>2</td><td>Native runtimes (onnxruntime, ctranslate2)</td><td></td></tr>
            <tr><td>3</td><td>Dashboard UI stack (PyQt5 modules)</td><td>Yes</td></tr>
            <tr><td>4</td><td>Telemetry backends (ctypes structures)</td><td>Yes</td></tr>
            <tr><td>5</td><td>AI live stack (race engineer modules)</td><td></td></tr>
            <tr><td>6</td><td>Local models (GGUF loading)</td><td></td></tr>
            <tr><td>7</td><td>Voice stack (webrtcvad, faster-whisper)</td><td></td></tr>
            <tr><td>8</td><td>TTS stack (Kokoro)</td><td></td></tr>
            <tr><td>9</td><td>Persistence (SQLite session recorder)</td><td></td></tr>
            <tr><td>10</td><td>Fonts and configuration</td><td></td></tr>
            <tr><td>11</td><td>Complete</td><td></td></tr>
          </tbody>
        </table>
        <p>
          Fatal failures halt startup with an error panel. The results dict records which optional
          components loaded, allowing graceful degradation (e.g., running without AI if the model
          failed to load).
        </p>

        <h3>Configuration &amp; Session Picker</h3>
        <p>
          <code>ConfigManager</code> persists user settings to <code>config.json</code>: voice mode
          (disabled / push-to-talk / continuous), up to 2 PTT input slots (keyboard or joystick),
          local vs. remote LLM toggle, and model file path.
        </p>
        <p>
          <code>SessionPickerDialog</code> lists all recorded sessions in a table (ID, name, date,
          track, car, mode, duration, laps, best lap) with options to select, rename, delete, or
          export. A quick "Use Last Recorded Session" button is available for convenience.
        </p>
      </>)}

      {activeTab === 'Data Pipeline' && (<>
        <p>
          The data pipeline handles everything from reading raw telemetry out of the racing
          simulator to persisting it in a database and exporting it for post-race review. All
          components are deterministic — no LLM involvement — and operate with strict latency
          budgets to keep up with 60 Hz telemetry.
        </p>

        <h2>Telemetry Data Acquisition</h2>
        <p>
          <strong>Files:</strong> <code>telemetry/backends/ac_backend.py</code><br />
          <strong>Libraries:</strong> ctypes, mmap (Windows shared memory)
        </p>
        <p>
          Assetto Corsa exposes telemetry through three Windows shared memory blocks. The{' '}
          <code>AcTelemetryWorker</code> (a <code>QThread</code>) maps these into Python objects
          using <code>ctypes.Structure</code> subclasses:
        </p>
        <table className="section-table">
          <thead>
            <tr>
              <th>Shared Memory Block</th>
              <th>ctypes Structure</th>
              <th>Contents</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>acpmf_physics</code></td>
              <td><code>SPageFilePhysics</code></td>
              <td>Speed, RPM, throttle, brake, gear, fuel, tire pressures/temps (4 tires), suspension, G-forces, damage</td>
            </tr>
            <tr>
              <td><code>acpmf_graphics</code></td>
              <td><code>SPageFileGraphics</code></td>
              <td>Car X/Z world position, completed laps, lap times, session status, pit status, sector index</td>
            </tr>
            <tr>
              <td><code>acpmf_static</code></td>
              <td><code>SPageFileStatic</code></td>
              <td>Track name, car model, player name, max RPM, max fuel</td>
            </tr>
          </tbody>
        </table>
        <pre className="code-block"><code>{`class SPageFilePhysics(ctypes.Structure):
    _fields_ = [
        ("packetId", ctypes.c_int),
        ("gas", ctypes.c_float),
        ("brake", ctypes.c_float),
        ("fuel", ctypes.c_float),
        ("gear", ctypes.c_int),
        ("rpms", ctypes.c_int),
        ("speedKmh", ctypes.c_float),
        ("wheelsPressure", ctypes.c_float * 4),   # FL, FR, RL, RR
        ("tyreCoreTemp", ctypes.c_float * 4),
        # ... suspension, damage, G-forces, etc.
    ]`}</code></pre>

        <h3>Polling &amp; Validation</h3>
        <p>
          The worker polls at <strong>60 Hz</strong>, reading all three memory blocks each frame.
          Before emitting data, several validation steps ensure data quality:
        </p>
        <ol>
          <li><strong>Warmup period</strong> — Skips the first 60 frames after session goes LIVE to avoid garbage data from AC's memory initialisation.</li>
          <li><strong>Lap counter stabilisation</strong> — Requires 10 consecutive identical <code>completedLaps</code> readings before trusting the value, preventing false lap completions from memory transients.</li>
          <li><strong>Coordinate validation</strong> — Rejects positions where X or Z exceeds 100,000 (uninitialised memory).</li>
          <li><strong>Speed deadzone</strong> — Values below 1 km/h are zeroed; values above 500 km/h or below 0 are rejected.</li>
          <li><strong>Velocity integration fallback</strong> — If position reads as (0, 0) but velocity data is available, integrates the velocity vector to estimate position.</li>
          <li><strong>Session status tracking</strong> — Detects AC restarts (10 consecutive OFF reads) and emits a <code>session_reset</code> signal.</li>
        </ol>

        <h3>Output</h3>
        <p>
          Each frame produces a sample dict emitted via the <code>realtime_sample</code> pyqtSignal,
          containing: lap ID, elapsed time, world position (x, z), speed, gear, RPM, throttle,
          brake, fuel, 4x tire pressures, 4x tire temperatures, 5x car damage zones, G-forces,
          suspension travel, wheel slip, and ride height.
        </p>

        <h2>Lap Detection &amp; Buffering</h2>
        <p>
          <strong>Files:</strong> <code>telemetry/lap_buffer.py</code><br />
          <strong>Libraries:</strong> None (pure Python)
        </p>
        <p>
          The <code>LapBuffer</code> class accumulates telemetry samples and detects lap
          boundaries by tracking <code>current_lap_id</code>:
        </p>
        <ul>
          <li>If <code>lap_id &gt; current_lap_id</code> — a new lap has started. The buffer fires <code>on_lap_complete</code> with the completed lap's data, then resets.</li>
          <li>If <code>lap_id &lt; current_lap_id</code> — the session was reset (e.g., restart). The buffer silently clears.</li>
          <li>Otherwise — the sample is appended to the current buffer.</li>
        </ul>
        <pre className="code-block"><code>{`class LapBuffer:
    def __init__(self, on_lap_complete):
        self.on_lap_complete = on_lap_complete
        self.current_lap_id = None
        self.samples = []

    def add_sample(self, lap_id, t, x, z, speed, **kwargs):
        if self.current_lap_id is not None and lap_id > self.current_lap_id:
            self.on_lap_complete(self.current_lap_id, self.samples)
            self.samples = []
        elif self.current_lap_id is not None and lap_id < self.current_lap_id:
            self.samples = []  # Reset on backwards jump
        self.current_lap_id = lap_id
        self.samples.append({"t": t, "x": x, "z": z, "speed": speed, **kwargs})`}</code></pre>

        <h2>Session Recording</h2>
        <p>
          <strong>Files:</strong> <code>data/session_recorder.py</code><br />
          <strong>Libraries:</strong> sqlite3, threading.RLock
        </p>
        <p>
          <code>SessionRecorder</code> runs as a <code>QThread</code> and persists all telemetry,
          lap summaries, AI commentary, and voice queries to a SQLite database.
        </p>

        <h3>Database Schema</h3>
        <table className="section-table">
          <thead>
            <tr>
              <th>Table</th>
              <th>Key Columns</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>sessions</code></td>
              <td>session_id (PK), start/end time, game, track, car, player, best_lap_time, ai_enabled</td>
              <td>Top-level session metadata</td>
            </tr>
            <tr>
              <td><code>laps</code></td>
              <td>lap_id (PK), session_id (FK), lap_number, lap_time, sector times, speed stats, fuel, valid</td>
              <td>Per-lap summary statistics</td>
            </tr>
            <tr>
              <td><code>telemetry</code></td>
              <td>telemetry_id (PK), session_id (FK), elapsed_time, position, speed, gear, RPM, 4x tire data, 5x damage</td>
              <td>High-frequency samples (~60/s)</td>
            </tr>
            <tr>
              <td><code>ai_commentary</code></td>
              <td>commentary_id (PK), session_id (FK), timestamp, message, trigger, priority</td>
              <td>AI race engineer messages</td>
            </tr>
            <tr>
              <td><code>voice_queries</code></td>
              <td>query_id (PK), session_id (FK), timestamp, query_text, response_text</td>
              <td>Driver voice queries and responses</td>
            </tr>
          </tbody>
        </table>

        <h3>Batch Insert Strategy</h3>
        <p>
          Writing each of the ~60 samples/second individually would create excessive transaction
          overhead. Instead, samples are buffered in memory and flushed in batches of 60 (~1 second
          of data) using <code>executemany</code>. A <code>threading.RLock</code> protects all
          database operations, and the connection uses <code>check_same_thread=False</code> for
          cross-thread access.
        </p>
        <pre className="code-block"><code>{`TELEMETRY_BATCH_SIZE = 60  # ~1 second of data

def record_telemetry_sample(self, sample):
    self.telemetry_buffer.append(sample)
    if len(self.telemetry_buffer) >= TELEMETRY_BATCH_SIZE:
        self._flush_telemetry_batch()

def _flush_telemetry_batch(self):
    with self._db_lock:
        self.cursor.executemany(
            "INSERT INTO telemetry (...) VALUES (...)", self.telemetry_buffer
        )
        self.db.commit()
    self.telemetry_buffer.clear()`}</code></pre>
        <div className="design-decision">
          <strong>Schema Migration:</strong> For backwards compatibility with older databases, the
          recorder runs <code>ALTER TABLE ... ADD COLUMN</code> statements wrapped in try/except to
          add new columns (e.g., <code>tyre_wear_fl</code>, <code>session_type</code>) without
          dropping existing data.
        </div>

        <h2>Session Export &amp; Import</h2>
        <p>
          <strong>Files:</strong> <code>data/session_exporter.py</code>, <code>data/csv_importer.py</code>, <code>data/telemetry_loader.py</code><br />
          <strong>Libraries:</strong> sqlite3, csv, json, pandas
        </p>

        <h3>Export (SQLite to CSV)</h3>
        <p>
          <code>SessionExporter</code> reads from SQLite and writes:
        </p>
        <ul>
          <li><code>session_X_telemetry.csv</code> — All high-frequency telemetry samples</li>
          <li><code>session_X_laps.csv</code> — Per-lap summary statistics</li>
          <li><code>session_X_ai_commentary.csv</code> — AI race engineer messages (if enabled)</li>
          <li><code>session_X_metadata.json</code> — Session metadata sidecar (track, car, player, timestamps)</li>
        </ul>

        <h3>Import &amp; Loading</h3>
        <p>
          <code>CSVImporter</code> reads CSV files back into the database, batching telemetry
          inserts at 1,000 rows per commit and auto-inferring the best lap time.{' '}
          <code>TelemetryLoader</code> loads exported CSVs into Pydantic-validated <code>Session</code>{' '}
          and <code>Lap</code> objects, auto-discovering companion files (laps CSV, AI commentary
          CSV, metadata JSON) and normalising lap elapsed times to start at 0.0.
        </p>

        <h2>Thread Architecture</h2>
        <p>
          <strong>Libraries:</strong> PyQt5.QtCore.QThread, pyqtSignal
        </p>
        <p>
          All background work runs in dedicated <code>QThread</code> instances. The main thread
          runs the Qt event loop and handles UI rendering exclusively.
        </p>

        <div className="arch-diagram">
          <div className="arch-node arch-node--game">
            <div className="arch-node__header">
              <span className="arch-node__title">Main Thread (Qt Event Loop)</span>
            </div>
            <div className="arch-node__sub">UI rendering only — all heavy work offloaded to QThreads</div>
          </div>

          <div className="arch-fanout-wrap">
            <div className="arch-fanout-wrap__vline" />
            <div className="arch-fanout-wrap__label">Worker Threads</div>
            <div className="arch-fanout-wrap__hbar" />
          </div>

          <div className="arch-row arch-row--3">
            <div className="arch-col">
              <div className="arch-drop" />
              <div className="arch-node arch-node--live">
                <div className="arch-node__header">
                  <span className="arch-node__title">AcTelemetryWorker</span>
                  <span className="arch-badge arch-badge--thread">QThread</span>
                </div>
                <ul className="arch-node__bullets">
                  <li>60 Hz shared memory polling</li>
                  <li>Validation &amp; normalisation</li>
                  <li>Lap boundary detection</li>
                </ul>
              </div>
            </div>

            <div className="arch-col">
              <div className="arch-drop" />
              <div className="arch-node arch-node--live">
                <div className="arch-node__header">
                  <span className="arch-node__title">AIRaceEngineerWorker</span>
                  <span className="arch-badge arch-badge--red">QThread</span>
                </div>
                <ul className="arch-node__bullets">
                  <li>Event detection + LLM inference</li>
                  <li>Throttled to ~5 Hz input</li>
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
                  <li>Batch SQLite writes</li>
                  <li>Cross-thread safe (RLock)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="arch-row arch-row--3" style={{ marginTop: '0.75rem' }}>
            <div className="arch-col">
              <div className="arch-node arch-node--ui">
                <div className="arch-node__header">
                  <span className="arch-node__title">VoiceInputWorker</span>
                  <span className="arch-badge arch-badge--ui">QThread</span>
                </div>
                <ul className="arch-node__bullets">
                  <li>Microphone capture + STT</li>
                </ul>
              </div>
            </div>

            <div className="arch-col">
              <div className="arch-node arch-node--ui">
                <div className="arch-node__header">
                  <span className="arch-node__title">TTSOutputWorker</span>
                  <span className="arch-badge arch-badge--ui">QThread</span>
                </div>
                <ul className="arch-node__bullets">
                  <li>Speech synthesis + playback</li>
                </ul>
              </div>
            </div>

            <div className="arch-col">
              <div className="arch-node arch-node--worker">
                <div className="arch-node__header">
                  <span className="arch-node__title">PTTController</span>
                  <span className="arch-badge arch-badge--thread">QObject</span>
                </div>
                <ul className="arch-node__bullets">
                  <li>Keyboard/joystick monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h3>Signal Flow (Live Session)</h3>
        <p>
          Signals connect the worker threads in a producer-consumer pattern.{' '}
          <code>AcTelemetryWorker</code> is the primary data source, fanning out to the UI,
          recorder, and AI worker:
        </p>

        <div className="flow-diagram">
          {/* AcTelemetryWorker */}
          <div className="flow-actor flow-actor--thread">AcTelemetryWorker</div>
          <div className="flow-steps">
            <div className="flow-step">
              <span className="flow-step__text"><code>realtime_sample</code> → MainWindow · SessionRecorder · AIWorker <em>(~5 Hz throttled)</em></span>
              <span className="flow-step__badge flow-step__badge--timing">60 Hz</span>
            </div>
            <div className="flow-step">
              <span className="flow-step__text"><code>lap_completed</code> → MainWindow · SessionRecorder</span>
              <span className="flow-step__badge">event</span>
            </div>
            <div className="flow-step">
              <span className="flow-step__text"><code>live_data_update</code> → MainWindow · AIWorker <em>(session context)</em></span>
              <span className="flow-step__badge flow-step__badge--timing">6 Hz</span>
            </div>
            <div className="flow-step">
              <span className="flow-step__text"><code>session_info_update</code> → MainWindow · SessionRecorder</span>
              <span className="flow-step__badge">event</span>
            </div>
            <div className="flow-step">
              <span className="flow-step__text"><code>session_reset</code> → MainWindow · SessionRecorder</span>
              <span className="flow-step__badge">event</span>
            </div>
          </div>

          {/* AIRaceEngineerWorker */}
          <div className="flow-actor flow-actor--thread" style={{ marginTop: '1.25rem' }}>AIRaceEngineerWorker</div>
          <div className="flow-steps">
            <div className="flow-step">
              <span className="flow-step__text"><code>ai_commentary</code> → MainWindow · TTSOutputWorker · SessionRecorder</span>
              <span className="flow-step__badge">async</span>
            </div>
          </div>

          {/* VoiceInputWorker */}
          <div className="flow-actor flow-actor--thread" style={{ marginTop: '1.25rem' }}>VoiceInputWorker</div>
          <div className="flow-steps">
            <div className="flow-step">
              <span className="flow-step__text"><code>speech_detected</code> → AIWorker · SessionRecorder</span>
              <span className="flow-step__badge">event</span>
            </div>
            <div className="flow-step">
              <span className="flow-step__text"><code>vad_state_changed</code> → MainWindow</span>
              <span className="flow-step__badge">event</span>
            </div>
          </div>

          {/* TTSOutputWorker */}
          <div className="flow-actor flow-actor--thread" style={{ marginTop: '1.25rem' }}>TTSOutputWorker</div>
          <div className="flow-steps">
            <div className="flow-step">
              <span className="flow-step__text"><code>playback_started</code> → VoiceInputWorker<code>.pause()</code></span>
              <span className="flow-step__badge">event</span>
            </div>
            <div className="flow-step">
              <span className="flow-step__text"><code>playback_finished</code> → VoiceInputWorker<code>.resume()</code></span>
              <span className="flow-step__badge">event</span>
            </div>
          </div>
        </div>
      </>)}

      {activeTab === 'AI Pipeline' && (<>
        <p>
          The AI pipeline operates independently from the data pipeline — it consumes telemetry
          via Qt signals and produces commentary that feeds back into the UI and database. All
          inference runs locally on a quantised GGUF model with no cloud dependencies.
        </p>

        <h2>Live AI Race Engineer</h2>
        <p>
          <strong>Files:</strong> <code>ai/race_engineer.py</code><br />
          <strong>Libraries:</strong> PyQt5.QtCore.QThread, asyncio, Pydantic
        </p>
        <p>
          <code>AIRaceEngineerWorker</code> is the central orchestrator thread that bridges raw
          telemetry with AI response generation. It runs its own <code>asyncio</code> event loop
          and processes two independent input streams:
        </p>
        <ul>
          <li><strong>Telemetry stream</strong> — Receives AC telemetry dicts, converts them to Pydantic models, runs rule-based event detection, and generates proactive commentary.</li>
          <li><strong>Query stream</strong> — Receives transcribed voice queries from the driver, generates contextual AI responses, and emits them to the UI and TTS.</li>
        </ul>

        <h3>Queue-Based Architecture</h3>
        <p>
          Both streams use <code>asyncio.Queue</code> instances to decouple signal reception from
          processing. The telemetry queue (<code>maxsize=5</code>, ~83ms buffer at 60 Hz) drops the
          oldest entry when full to prevent backlog. The query queue keeps only the most recent query
          if multiple arrive while the LLM is busy.
        </p>

        <h3>Telemetry-to-Model Conversion</h3>
        <p>
          AC telemetry dicts are converted to validated Pydantic models
          via <code>_dict_to_telemetry()</code>. Key transformation: tire wear is{' '}
          <strong>inverted</strong> — AC provides "remaining life" (100=fresh) but the AI models
          expect "percent worn" (0=fresh), so <code>wear = 100 - ac_value</code>.
        </p>

        <h3>Response Guardrails</h3>
        <p>
          After the LLM generates a response, multiple guardrail passes validate quality:
        </p>
        <ol>
          <li><strong>Ungrounded numbers</strong> — Numeric values not present in source telemetry trigger a fallback.</li>
          <li><strong>Pit-specific fallback</strong> — Pit queries with "insufficient data" responses get deterministic answers.</li>
          <li><strong>Low quality detection</strong> — Lone numbers, "N/A", or incoherent fragments trigger a fallback.</li>
          <li><strong>Context-aware fallbacks</strong> — Keyword matching (damage, tires, gaps, fuel) selects an appropriate deterministic response.</li>
        </ol>

        <h2>Event Detection</h2>
        <p>
          <strong>Files:</strong> <code>ai/race_engineer_core/telemetry_agent.py</code>, <code>ai/race_engineer_core/events.py</code><br />
          <strong>Libraries:</strong> Pydantic, Python dataclasses
        </p>
        <p>
          The <code>TelemetryAgent</code> performs pure rule-based event detection with
          a <strong>&lt;50ms latency budget</strong> and zero LLM dependency. It processes every
          incoming <code>TelemetryData</code> frame and returns <code>Event</code> objects sorted
          by priority.
        </p>

        <h3>Event Types &amp; Thresholds</h3>
        <table className="section-table">
          <thead>
            <tr>
              <th>Event Type</th>
              <th>Priority</th>
              <th>Trigger Condition</th>
              <th>Cooldown</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>fuel_critical</code></td>
              <td>CRITICAL</td>
              <td>Fuel for &le; 2 laps remaining</td>
              <td>45s</td>
            </tr>
            <tr>
              <td><code>fuel_warning</code></td>
              <td>HIGH</td>
              <td>Fuel for &le; 5 laps remaining</td>
              <td>60s</td>
            </tr>
            <tr>
              <td><code>tire_critical</code></td>
              <td>CRITICAL</td>
              <td>Any tire &ge; 110&deg;C</td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>tire_warning</code></td>
              <td>MEDIUM</td>
              <td>Any tire &ge; 100&deg;C</td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>tire_wear_critical</code></td>
              <td>HIGH</td>
              <td>Any tire wear &ge; 85%</td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>wheel_slip_critical</code></td>
              <td>HIGH</td>
              <td>Any wheel slip &ge; 10.0 (speed &gt; 10 km/h)</td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>opponent_close_behind</code></td>
              <td>HIGH</td>
              <td>Gap &le; 0.8s (resets at 1.2s hysteresis)</td>
              <td>15s</td>
            </tr>
            <tr>
              <td><code>car_damage_alert</code></td>
              <td>HIGH/MEDIUM</td>
              <td>Damage crosses 5% (warning) or 20% (critical)</td>
              <td>20s</td>
            </tr>
            <tr>
              <td><code>position_change</code></td>
              <td>HIGH</td>
              <td>Race position changed</td>
              <td>5s</td>
            </tr>
            <tr>
              <td><code>lap_complete</code></td>
              <td>MEDIUM</td>
              <td>Lap number incremented</td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>pit_window_open</code></td>
              <td>HIGH</td>
              <td>Fuel at warning OR tire wear &ge; 70%</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>

        <h3>Priority System</h3>
        <pre className="code-block"><code>{`class Priority(IntEnum):
    CRITICAL = 0   # Immediate interrupt (fuel critical, tire blowout)
    HIGH     = 1   # Interrupt lower priorities (position change, close opponent)
    MEDIUM   = 2   # Normal queue (lap complete, tire warning)
    LOW      = 3   # Skip if busy (sector times)`}</code></pre>
        <p>
          Fuel consumption is tracked incrementally: <code>fuel_used = lap_start_fuel -
          fuel_remaining</code>. A sanity check (0 &lt; consumption &lt; 20 L/lap) filters garbage
          values. Remaining laps = <code>fuel_remaining / consumption_per_lap</code>.
        </p>

        <h2>LLM Inference</h2>
        <p>
          <strong>Files:</strong> <code>ai/race_engineer_core/race_engineer_agent.py</code>, <code>ai/race_engineer_core/llm_client.py</code>, <code>ai/local_llm_inference.py</code><br />
          <strong>Libraries:</strong> llama-cpp-python, huggingface-hub
        </p>
        <p>
          The <code>RaceEngineerAgent</code> generates contextual AI responses for two scenarios:
          proactive (event-triggered radio messages) and reactive (driver voice query responses).
        </p>

        <h3>LLM Client Fallback Chain</h3>
        <ol>
          <li><strong>Local GGUF Model</strong> — Quantised Granite model via llama-cpp-python (primary)</li>
          <li><strong>Rule-Based Fallback</strong> — Keyword-matching hardcoded responses (if model unavailable or fails)</li>
        </ol>

        <h3>Model Configuration</h3>
        <table className="section-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Model</td><td><code>granite-race-engineer-Q4_K_M.gguf</code></td></tr>
            <tr><td>Architecture</td><td>Granite (IBM)</td></tr>
            <tr><td>Quantisation</td><td>Q4_K_M (~4-bit)</td></tr>
            <tr><td>Context window</td><td>2,048 tokens</td></tr>
            <tr><td>Max output tokens</td><td>48 (configurable)</td></tr>
            <tr><td>Temperature</td><td>0.3</td></tr>
            <tr><td>Top-k / Top-p</td><td>50 / 0.95</td></tr>
            <tr><td>Device</td><td>CPU</td></tr>
          </tbody>
        </table>

        <h3>Chat Template</h3>
        <p>
          Granite models require specific role markers to produce coherent responses. Without them,
          the model hallucinates data continuations:
        </p>
        <pre className="code-block"><code>{`<|start_of_role|>system<|end_of_role|>{system_prompt}<|end_of_text|>
<|start_of_role|>user<|end_of_role|>{user_prompt}<|end_of_text|>
<|start_of_role|>assistant<|end_of_role|>`}</code></pre>

        <h3>Prompt Templates &amp; Verbosity</h3>
        <table className="section-table">
          <thead>
            <tr>
              <th>Verbosity</th>
              <th>Max Words</th>
              <th>Max Tokens</th>
              <th>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Minimal</td><td>&lt;15</td><td>24</td><td>Race radio brevity</td></tr>
            <tr><td>Moderate</td><td>1-2 sentences</td><td>24</td><td>Balanced (default)</td></tr>
            <tr><td>Verbose</td><td>&le;4 sentences</td><td>48</td><td>Detailed coaching</td></tr>
          </tbody>
        </table>
        <p>
          The system prompt establishes the AI's role as an expert F1 race engineer: concise
          (1-3 sentences max), leading with the most important information, using precise numbers,
          and never claiming tires are "worn" unless wear exceeds 70% or "damaged" unless damage
          exceeds 0%.
        </p>
        <div className="design-decision">
          <strong>Constraint Injection:</strong> For specific query types, additional constraints
          are injected — pit queries never recommend pitting if fuel laps are unknown; opponent
          queries only report gap data actually available from the sim. Proactive messages respect
          a 10-second minimum interval to avoid overwhelming the driver.
        </div>

        <h3>Auto-Download &amp; Prewarm</h3>
        <p>
          On first run, if the model file is missing and <code>LOCAL_LLM_AUTO_DOWNLOAD=1</code>,
          the model is downloaded from Hugging Face Hub. After loading, a short generation
          ("System ready.") absorbs the first-inference overhead (~1-2s), so the first real
          request is faster.
        </p>

        <h2>Session Context</h2>
        <p>
          <strong>Files:</strong> <code>ai/race_engineer_core/context.py</code><br />
          <strong>Libraries:</strong> Pydantic, collections.deque
        </p>
        <p>
          <code>LiveSessionContext</code> maintains a comprehensive in-memory snapshot of the
          current session state, updated every telemetry frame and injected into LLM prompts to
          ground responses in real data.
        </p>
        <table className="section-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Fields</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Vehicle</td><td>speed, RPM, gear, throttle, brake</td></tr>
            <tr><td>Resources</td><td>fuel remaining, consumption/lap, tire wear/temps/pressures</td></tr>
            <tr><td>Race Position</td><td>position, gap ahead/behind, opponents[]</td></tr>
            <tr><td>Physics</td><td>steering angle, G-forces, wheel slip, suspension, ride height</td></tr>
            <tr><td>Damage</td><td>5 zones: front, rear, left, right, centre</td></tr>
            <tr><td>Lap History</td><td>lap times[], best/last/current lap, current sector</td></tr>
            <tr><td>Telemetry Buffer</td><td>Rolling deque (600 samples = 60s at 10 Hz)</td></tr>
            <tr><td>Conversation</td><td>deque of query/response/timestamp (max 1 exchange)</td></tr>
          </tbody>
        </table>

        <h3>Query-Aware Context Pruning</h3>
        <p>
          To minimise LLM input tokens, <code>to_prompt_context(query)</code> only includes
          context lines relevant to the driver's question. Keywords in the query activate specific
          sections — "fuel" includes fuel data, "tire" includes temperature/pressure/wear, "gap"
          includes opponent data, etc. Core fields (track, lap, speed/gear/RPM) are always included.
        </p>
        <pre className="code-block"><code>{`# Example formatted context injected into the LLM prompt:
Track: Monza
Lap: 5 | Position: P3
Speed: 287 km/h | Gear: 6 | RPM: 8100
Fuel: 15.2L (3.8 laps)
Tire Temps: FL:92°C FR:94°C RL:88°C RR:90°C`}</code></pre>

        <h2>Voice I/O &amp; Push-to-Talk</h2>
        <p>
          <strong>Files:</strong> <code>ai/voice_input.py</code>, <code>ai/tts_output.py</code>, <code>ai/ptt_controller.py</code><br />
          <strong>Libraries:</strong> webrtcvad, faster-whisper, pykokoro, PyAudio, pynput, pygame
        </p>

        <h3>Voice Input (Speech-to-Text)</h3>
        <p>
          <code>VoiceInputWorker</code> captures microphone audio at 16 kHz, 16-bit mono in 30ms
          chunks. Two modes are supported:
        </p>
        <ul>
          <li><strong>VAD (hands-free)</strong> — <code>webrtcvad.Vad</code> (aggressiveness=2) detects speech continuously. When silence returns (150ms padding), buffered audio is sent to Whisper.</li>
          <li><strong>PTT (push-to-talk)</strong> — Recording only occurs while the PTT button is held, skipping VAD processing entirely.</li>
        </ul>
        <p>
          Whisper is configured with <code>model_size="base"</code> (~140 MB),{' '}
          <code>compute_type="int8"</code> for CPU efficiency, <code>beam_size=5</code>, and
          an <code>initial_prompt</code> seeded with racing vocabulary ("F1 racing, telemetry,
          tires, brakes, fuel, pit stop...") to significantly improve domain-specific accuracy.
        </p>

        <h3>Text-to-Speech Output</h3>
        <p>
          <code>TTSOutputWorker</code> uses Kokoro, a local TTS engine requiring no API keys:
        </p>
        <pre className="code-block"><code>{`KokoroTTSClient(
    voice_id="bm_lewis",    # Male British voice
    lang="en-gb",
    speed=1.3,              # 30% faster than normal
    use_cuda=False           # CPU inference by default
)`}</code></pre>
        <p>
          Messages are ordered by a priority queue (0=critical, 3=low). Before synthesis, numeric
          decimals are converted to spoken form: "3.5" becomes "3 point 5".
        </p>

        <h3>Echo Prevention</h3>
        <p>
          When TTS plays audio, the voice input pauses to prevent the microphone from capturing
          and re-transcribing the AI's own speech. This uses a reference-counted pause mechanism:
          multiple sources can request pause, and recording only resumes when all have called resume.
        </p>

        <h3>Push-to-Talk Controller</h3>
        <p>
          <code>PTTController</code> monitors inputs <strong>globally</strong> — it works even
          when the game window has focus, which is critical for sim racing. Keyboard monitoring
          uses <code>GetAsyncKeyState()</code> via ctypes; joystick monitoring
          uses <code>pygame.joystick</code>. Up to 2 configurable PTT slots are supported
          (e.g., keyboard "V" + joystick button 11), and release is only emitted when{' '}
          <em>all</em> held inputs are released.
        </p>

        <h2>Post-Race AI Analysis</h2>
        <p>
          <strong>Files:</strong> <code>jarvis_post/agents/coaching.py</code>, <code>jarvis_post/agents/race_analysis.py</code>, <code>analysis/ai_pipeline_bridge.py</code><br />
          <strong>Libraries:</strong> llama-cpp-python, asyncio, statistics
        </p>

        <div className="arch-diagram">
          <div className="arch-node arch-node--ui">
            <div className="arch-node__header">
              <span className="arch-node__title">LapViewerWindow</span>
              <span className="arch-badge arch-badge--ui">UI</span>
            </div>
          </div>

          <div className="arch-connector">
            <div className="arch-connector__line" />
            <div className="arch-connector__arrow" />
          </div>

          <div className="arch-node arch-node--worker">
            <div className="arch-node__header">
              <span className="arch-node__title">AIPipelineBridge</span>
              <span className="arch-badge arch-badge--thread">Adapter</span>
            </div>
            <div className="arch-node__sub">Three-tier fallback chain</div>
          </div>

          <div className="arch-fanout-wrap">
            <div className="arch-fanout-wrap__vline" />
            <div className="arch-fanout-wrap__hbar" />
          </div>

          <div className="arch-row arch-row--3">
            <div className="arch-col">
              <div className="arch-drop" />
              <div className="arch-node arch-node--live">
                <div className="arch-node__header">
                  <span className="arch-node__title">RaceAnalysisAgent</span>
                </div>
                <ul className="arch-node__bullets">
                  <li>Session-level technical summary</li>
                  <li>max_tokens=2000, temp=0.3</li>
                </ul>
              </div>
            </div>

            <div className="arch-col">
              <div className="arch-drop" />
              <div className="arch-node arch-node--live">
                <div className="arch-node__header">
                  <span className="arch-node__title">CoachingAgent</span>
                </div>
                <ul className="arch-node__bullets">
                  <li>Per-lap improvement tips</li>
                  <li>Multi-turn conversation</li>
                  <li>max_tokens=500, temp=0.6</li>
                </ul>
              </div>
            </div>

            <div className="arch-col">
              <div className="arch-drop" />
              <div className="arch-node arch-node--db">
                <div className="arch-node__header" style={{ justifyContent: 'center' }}>
                  <span className="arch-node__title">LocalGGUFClient</span>
                </div>
                <div className="arch-node__sub" style={{ textAlign: 'center' }}>Post-race GGUF model (8K context)</div>
              </div>
            </div>
          </div>
        </div>

        <h3>Telemetry Preprocessing</h3>
        <p>
          Before sending data to the LLM, <code>preprocess_for_analysis()</code> reduces
          thousands of raw samples into statistical summaries:
        </p>
        <ul>
          <li><strong>Throttle patterns</strong> — Hesitation detection (&ge;0.6 to &lt;0.5 drop), full-throttle percentage, variance</li>
          <li><strong>Braking patterns</strong> — Braking zone detection (threshold 0.1), max pressure, variance</li>
          <li><strong>Tire evolution</strong> — Front/rear and left/right temperature imbalances, pressure trends per corner</li>
          <li><strong>Notable events</strong> — Max speed, heavy braking (&gt;90%), lock-ups (20+ km/h speed drops), high G-forces, damage incidents</li>
        </ul>

        <h3>Fallback Chain</h3>
        <p>
          <code>AIPipelineBridge</code> implements a three-tier fallback:
        </p>
        <ol>
          <li><strong>Jarvis Post agents</strong> (primary) — Local GGUF inference via CoachingAgent and RaceAnalysisAgent</li>
          <li><strong>Recorded AI commentary</strong> — Extract commentary from the session's database if available</li>
          <li><strong>Heuristic fallback</strong> — Generate basic insights from telemetry statistics alone (no LLM)</li>
        </ol>
        <div className="design-decision">
          <strong>Truncation Handling:</strong> The coaching agent detects LLM output cutoff
          and retries with a more concise prompt (<code>retry_max_tokens=320</code>). If still
          truncated, it falls back to a deterministic compact summary. Both agents support
          streaming output via Python generators that yield text chunks.
        </div>

        <h2>Latency &amp; Technology Summary</h2>
        <h3>Latency Budget</h3>
        <table className="section-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Target</th>
              <th>Actual</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Telemetry polling</td><td>16.7ms (60 Hz)</td><td>~16ms</td></tr>
            <tr><td>Event detection</td><td>&lt;50ms</td><td>&lt;10ms</td></tr>
            <tr><td>Context update</td><td>&lt;50ms</td><td>&lt;5ms</td></tr>
            <tr><td>LLM generation (live)</td><td>&lt;5s</td><td>1-5s</td></tr>
            <tr><td>LLM generation (post-race)</td><td>&lt;10s</td><td>2-8s</td></tr>
            <tr><td>Voice transcription</td><td>&lt;5s</td><td>1-3s</td></tr>
            <tr><td>TTS synthesis</td><td>&lt;5s</td><td>1-3s</td></tr>
            <tr><td><strong>Full voice loop</strong></td><td>—</td><td><strong>5-10s</strong></td></tr>
          </tbody>
        </table>

        <h3>Technology Stack</h3>
        <table className="section-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Technology</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>UI Framework</td><td>PyQt5</td><td>Windows, dialogs, threading (QThread, signals/slots)</td></tr>
            <tr><td>Charts</td><td>Matplotlib</td><td>Track maps, time-series graphs, delta plots</td></tr>
            <tr><td>Data Validation</td><td>Pydantic</td><td>Telemetry models, configuration, session metadata</td></tr>
            <tr><td>Database</td><td>SQLite3</td><td>Session recording, telemetry persistence</td></tr>
            <tr><td>Data Analysis</td><td>Pandas, NumPy</td><td>Telemetry loading, statistical preprocessing</td></tr>
            <tr><td>LLM Inference</td><td>llama-cpp-python</td><td>Local GGUF model loading and text generation</td></tr>
            <tr><td>Model Hosting</td><td>Hugging Face Hub</td><td>Auto-download of quantised GGUF models</td></tr>
            <tr><td>Speech-to-Text</td><td>faster-whisper</td><td>Local voice transcription (CTranslate2)</td></tr>
            <tr><td>Voice Detection</td><td>webrtcvad</td><td>Voice activity detection for hands-free mode</td></tr>
            <tr><td>Text-to-Speech</td><td>pykokoro (Kokoro)</td><td>Local speech synthesis</td></tr>
            <tr><td>Audio I/O</td><td>PyAudio</td><td>Microphone capture and speaker output</td></tr>
            <tr><td>Input Hooks</td><td>pynput, pygame</td><td>Global PTT key and joystick detection</td></tr>
            <tr><td>Shared Memory</td><td>ctypes</td><td>Reading AC telemetry from Windows shared memory</td></tr>
          </tbody>
        </table>
      </>)}

      {activeTab === 'VR' && (<>
        <p>
          The VR project consists of nine key implementation features spanning environment setup,
          vehicle asset pipelines, interactive media, AI-driven presentations, and the custom C++
          telemetry chart system. Each section below describes the frameworks, plugins, and
          specific techniques used to implement that feature.
        </p>
        <p>
          Scope note: this page focuses on <strong>how</strong> features were built and integrated
          (toolchain, code paths, runtime behaviour). UX rationale remains in UI Design, and
          architecture-level decomposition remains in System Design.
        </p>

        <h2>VR Environment Setup</h2>
        <p>
          <strong>Frameworks:</strong> Unreal Engine 4.27, VR Chemistry Lab template (pre-existing
          UE4 project).
        </p>
        <p>
          The project was initialised from a pre-existing VR Chemistry Lab template that provided
          the building exterior, core VR locomotion (teleport arc and smooth thumbstick movement),
          VR grab/interaction mechanics via motion controllers, and a working elevator with
          in-world destination screens for spatial navigation. No C++ or Blueprint modifications
          were made to these systems — they were inherited and used as-is.
        </p>
        <p>
          The interior was reconfigured entirely through the Unreal Editor's level design tools:
          existing lab geometry and props were removed, and motorsport-themed assets were placed
          using the editor's transform gizmos. The sim racer rig was assembled by individually
          importing static mesh assets (seat, steering wheel frame, pedals, monitor stand,
          displays) and manually positioning and rotating each piece in the level viewport until
          they formed a single cohesive unit. F1 tyres and engineering workstation meshes were
          placed around the space similarly.
        </p>
        <p>
          Every placed object required collision setup to enable VR physical interaction:
        </p>
        <pre className="code-block"><code>{`Static Mesh Editor → Collision → Auto Convex Collision
  Hull Count:    8–16   (balance accuracy vs. runtime performance)
  Max Hull Verts: 32
  Hull Precision: 100000

For complex concave meshes (e.g. sim rig frame):
  Static Mesh Editor → Collision → Add Box Simplified Collision
  (manually position and scale collision primitives to approximate the shape)

Alternative for dense meshes where accuracy is required:
  Collision → Use Complex Collision As Simple
  (uses the full render geometry — higher cost, exact shape)`}</code></pre>

        <h2>Vehicle Asset Import &amp; Optimisation</h2>
        <p>
          <strong>Tools:</strong> Blender 3.x (Decimate modifier), Python 3.12 + Pillow 11.1.0
          (<code>export_car.py</code>), Unreal Engine 4.27 FBX/OBJ import pipeline.
        </p>
        <p>
          Three vehicles were brought into the VR environment through different import pipelines,
          each requiring a different level of pre-processing.
        </p>

        <h3>Lewis Hamilton's Ferrari — Direct Import</h3>
        <p>
          A pre-made high-detail 3D model was imported directly as a UE4 static mesh via the
          standard FBX import workflow. The model was already at a polygon count suitable for VR
          rendering, so no geometry reduction was needed. Collision was generated in the Static
          Mesh Editor and the asset was placed as the centrepiece of the VR hub.
        </p>

        <h3>UCL Formula Student Car — Blender Decimate Pipeline</h3>
        <p>
          The original Formula Student car mesh contained approximately 9.5 million triangles —
          far beyond the VR budget (dropping frame rate well below the 90 fps comfort threshold).
          The mesh was imported into Blender, where the <strong>Decimate modifier</strong> in
          Collapse mode was applied to reduce triangle count to ~250,000:
        </p>
        <pre className="code-block"><code>{`# Blender Python console equivalent of the manual Decimate workflow:
import bpy

obj = bpy.context.active_object
mod = obj.modifiers.new(name="Decimate", type='DECIMATE')
mod.decimate_type = 'COLLAPSE'
mod.ratio = 250000 / 9500000  # ≈ 0.0263
bpy.ops.object.modifier_apply(modifier="Decimate")
# Result: ~250,000 triangles (from ~9.5M)`}</code></pre>
        <p>
          After decimation, materials were stripped (Blender's geometry reduction invalidates some
          UV islands). The mesh was exported as FBX, re-imported into UE4, and materials and
          textures were re-applied and configured in the Material Editor to restore accurate
          colouring. Collision was then generated in UE4.
        </p>

        <h3>TORCS F1 Car (IBM Livery) — Custom Python Export Pipeline</h3>
        <p>
          TORCS stores car geometry in a non-standard extended AC3D format (<code>.acc</code>) and
          textures in SGI format (<code>.rgb</code>). No existing tool could parse the extended
          vertex format (6 values per vertex: <code>x y z nx ny nz</code>) or the 9-value surface
          reference lines (vertex index + 4 UV channels). A custom Python script{' '}
          <code>export_car.py</code> was written to handle the full pipeline:
        </p>
        <pre className="code-block"><code>{`# Parsing TORCS-extended AC3D vertex lines
# Standard AC3D: "vert x y z"
# TORCS extended: each vertex line has 6 floats: x y z nx ny nz
for line in vertex_lines:
    parts = line.split()
    x, y, z   = float(parts[0]), float(parts[1]), float(parts[2])
    nx, ny, nz = float(parts[3]), float(parts[4]), float(parts[5])
    vertices.append((x, y, z))
    normals.append((nx, ny, nz))

# Parsing surface ref lines (9 values per ref)
# vert_idx u_base v_base u_tiled v_tiled u_skids v_skids u_shad v_shad
for ref_line in surface_refs:
    parts = ref_line.split()
    vert_idx = int(parts[0])
    u, v = float(parts[1]), float(parts[2])  # base UV channel only
    face_verts.append((vert_idx, u, v))

# SGI .rgb → PNG conversion (vertical flip for UE4 origin convention)
from PIL import Image
img = Image.open("car1-ow1.rgb")
img = img.transpose(Image.FLIP_TOP_BOTTOM)
img.save("car1-ow1_livery.png")`}</code></pre>
        <p>
          The script also performs fan triangulation for quads and n-gons (converting all faces to
          triangles for OBJ compatibility), writes standard Wavefront OBJ + MTL files, and exports
          all 4 wheels as separate meshes. Output was validated by checking that all
          vertex/UV/normal indices are in-bounds and rendering a matplotlib 3D wireframe preview
          before UE4 import. The script is fully deterministic and re-runnable.
        </p>
        <table className="section-table">
          <thead>
            <tr>
              <th>Output File</th>
              <th>Content</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>car1-ow1.obj</code> + <code>.mtl</code></td>
              <td>Car body mesh + material references</td>
              <td>1,954 verts / 2,640 tris</td>
            </tr>
            <tr>
              <td><code>wheel_*.obj</code> (×4) + <code>wheels.mtl</code></td>
              <td>Wheel meshes + material reference</td>
              <td>240 verts / 302 tris each</td>
            </tr>
            <tr>
              <td><code>car1-ow1_livery.png</code></td>
              <td>IBM livery texture (converted from SGI <code>.rgb</code>)</td>
              <td>512×512</td>
            </tr>
            <tr>
              <td><code>tex-wheel.png</code></td>
              <td>Secondary wheel texture</td>
              <td>128×128</td>
            </tr>
            <tr>
              <td><code>shadow.png</code></td>
              <td>Shadow decal texture</td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>wheel3d.png</code></td>
              <td>Wheel rim/tyre texture</td>
              <td>copied as-is</td>
            </tr>
          </tbody>
        </table>

        <h2>Interactive Video Playback</h2>
        <p>
          <strong>Framework:</strong> Unreal Engine 4.27 Media Framework (FileMediaSource,
          MediaPlayer, MediaTexture), UE4 Blueprints.
        </p>
        <p>
          A <code>FileMediaSource</code> asset is created in UE4 pointing to a local{' '}
          <code>.mp4</code> file on disk. A <code>MediaPlayer</code> asset consumes the source
          and manages playback state (play, pause, stop, seek). A <code>MediaTexture</code>{' '}
          receives decoded video frames from the MediaPlayer and exposes them as a texture, which
          is plugged into a Material's Emissive slot and applied to a screen mesh in the VR scene.
          A Blueprint actor attached to the screen listens for VR controller input and calls{' '}
          <code>Play</code> / <code>Pause</code> on the MediaPlayer:
        </p>
        <pre className="code-block"><code>{`Event: OnComponentBeginOverlap (VR hand / pointer collider)
  → Set bCanInteract = true
  → Show highlight outline on screen mesh

Event: VR Trigger Pressed  (while bCanInteract == true)
  → If MediaPlayer.IsPlaying():
        MediaPlayer.Pause()
    Else:
        MediaPlayer.Play()

Event: OnComponentEndOverlap
  → Set bCanInteract = false
  → Hide highlight outline`}</code></pre>
        <pre className="code-block"><code>{`FileMediaSource  (.mp4 file on disk)
        │
        ▼
MediaPlayer  (controls playback state — play / pause / seek)
        │
        ▼
MediaTexture  (receives decoded video frames as a UTexture2D)
        │
        ▼
Material  (Emissive Color ← MediaTexture node)
        │
        ▼
Screen Mesh Actor  (StaticMeshComponent with material applied)`}</code></pre>

        <h2>Emissive Screen Materials</h2>
        <p>
          <strong>Framework:</strong> Unreal Engine 4.27 Material Editor, Unlit shading model.
        </p>
        <p>
          For screens displaying static logos or images (as opposed to video), a Material using
          the <strong>Unlit shading model</strong> is created in UE4's Material Editor. The
          texture is connected directly to the <strong>Emissive Color</strong> input node. This
          bypasses all scene lighting calculations — the image renders at full brightness
          regardless of the environment's light actor placement or intensity.
        </p>
        <p>
          This accurately mimics real-world backlit screens: a monitor or TV emits its own light
          rather than reflecting ambient light. Using a standard Lit material would cause the
          screen surface to appear dark or shadowed depending on the nearby scene lighting,
          which is physically incorrect for a self-illuminating display.
        </p>
        <pre className="code-block"><code>{`Material Properties:
  Shading Model : Unlit
  Blend Mode    : Opaque

Node Graph:
  TextureSample (logo.png)
        │
        └──► Emissive Color  (main output)

Result: Image renders at full brightness, completely unaffected by
        scene light actors, light maps, or ambient occlusion.`}</code></pre>

        <h2>AI-Driven Slide Presentations (Convai)</h2>
        <p>
          <strong>Frameworks:</strong> Convai cloud platform, imgbb.com (image hosting), Unreal
          Engine 4.27 Blueprints, Convai UE4 plugin.
        </p>
        <p>
          Presentation slides were authored externally and uploaded to imgbb.com, where a "Direct
          Link" URL (raw image URL with no HTML wrapper or authentication requirement) was
          extracted for each slide. These URLs were pasted into a Convai Character's knowledge
          base / backstory configuration on the Convai web platform, along with instructions
          about slide order and context.
        </p>
        <p>
          In UE4, the Convai plugin provides a <code>ConvaiCharacter</code> actor. Its{' '}
          <code>Character ID</code> property is set to match the configured character on the
          Convai platform. A Blueprint links the character to a target screen mesh in the VR
          scene — when the AI decides to display a slide during user interaction, it sends the
          image URL and the Blueprint renders it on the screen material.
        </p>
        <pre className="code-block"><code>{`[Offline Setup]
  Author slides → Upload to imgbb.com → Copy direct image URLs
       ↓
  Convai web platform → Create Character
       ↓
  Paste slide URLs into Character knowledge base
  (configure slide order and presentation context)
       ↓
  Note Character ID (e.g. "abc123-def456")

[UE4 Setup]
  Place ConvaiCharacter actor in VR level
       ↓
  Set Character ID property = "abc123-def456"
       ↓
  Blueprint: bind ConvaiCharacter → target screen mesh actor

[Runtime in VR]
  User approaches / speaks to Convai avatar
       ↓
  Convai processes interaction (cloud inference)
       ↓
  Decides to show slide → returns image URL
       ↓
  Blueprint fetches image → displays on screen material`}</code></pre>
        <div className="design-decision">
          <strong>Implementation Note — Content Decoupling via External Hosting:</strong> Because
          slide images are hosted on imgbb.com and referenced by URL in Convai's knowledge base,
          slide content can be updated at any time without reopening the UE4 editor, recompiling,
          or repackaging the project. The Convai character fetches images at runtime — updating a
          slide is a matter of replacing the hosted URL.
        </div>

        <h2>Telemetry — Dynamic Widget Construction</h2>
        <p>
          <strong>Frameworks:</strong> Unreal Engine 4.27 (UMG, Slate, UWidgetComponent), Kantan
          Charts plugin (<code>USimpleCartesianPlot</code>), C++.
        </p>
        <p>
          Each <code>ATelemetryVisualizer</code> actor creates its chart <strong>entirely at
          runtime in C++</strong> — there is no pre-made Widget Blueprint. A minimal{' '}
          <code>UChartContainerWidget</code> (a thin <code>UUserWidget</code> subclass) is created
          via <code>CreateWidget&lt;&gt;</code>, and a <code>USimpleCartesianPlot</code> is
          constructed via <code>WidgetTree-&gt;ConstructWidget&lt;&gt;</code> and set as its root
          widget.
        </p>
        <p>
          The critical implementation detail is the <strong>ordering of widget attachment and data
          population</strong>. The container must be assigned to the <code>UWidgetComponent</code>{' '}
          via <code>SetWidget()</code> <em>before</em> any series or datapoints are added.{' '}
          <code>SetWidget</code> triggers <code>TakeWidget()</code> → Slate widget construction
          → <code>SynchronizeProperties()</code>, which binds the chart's internal datasource
          interface. Without this, the Slate widget has a null datasource — axes and background
          render correctly (driven by UPROPERTY reads) but data series are never queried, producing
          perfectly scaled empty graphs with invisible lines and no compile-time or runtime error.
        </p>
        <pre className="code-block"><code>{`// 1. Create the UMG container widget
UChartContainerWidget* Container =
    CreateWidget<UChartContainerWidget>(GetWorld(),
        UChartContainerWidget::StaticClass());

// 2. Build the plot inside the container's WidgetTree
USimpleCartesianPlot* Plot =
    Container->WidgetTree->ConstructWidget<USimpleCartesianPlot>(
        USimpleCartesianPlot::StaticClass());
Container->WidgetTree->RootWidget = Plot;

// 3. CRITICAL: Attach to WidgetComponent BEFORE populating data.
//    SetWidget() → TakeWidget() → SynchronizeProperties() → binds datasource.
//    If this line comes AFTER BP_AddDatapoint, all data lines are invisible.
WidgetComp->SetWidget(Container);

// 4. NOW add series and data (datasource is bound, queries will succeed)
Plot->BP_AddSeriesWithId(bOK, SeriesID, Name, true, false, true);
for (int32 i = 0; i < NumPoints; i += Step)
{
    Plot->BP_AddDatapoint(SeriesID, FVector2D(X[i], Y[i]), bPointOK);
}

// 5. Configure axes, fixed range, colours, and line style
ConfigureChart(Plot, MinX, MaxX, MinY, MaxY);

// 6. Flush all UPROPERTY changes made after SetWidget() to the Slate layer
Plot->SynchronizeProperties();`}</code></pre>
        <p>
          The final <code>SynchronizeProperties()</code> call is also necessary — axis
          configuration, plot scale, and style overrides applied after <code>SetWidget()</code>{' '}
          modify UPROPERTYs on the UMG object but may not propagate to the underlying Slate widget
          until explicitly flushed.
        </p>

        <h2>Telemetry — Multi-Series Grouped Metrics</h2>
        <p>
          <strong>Frameworks:</strong> C++ (<code>TArray</code>, <code>FName</code>,{' '}
          <code>FLinearColor</code>), Kantan Charts (<code>BP_AddSeriesWithId</code>,{' '}
          <code>AddSeriesStyleOverride</code>).
        </p>
        <p>
          Grouped metrics (Tyre Pressure, Tyre Temp, Tyre Wear, Wheel Slip, Suspension Travel,
          Ride Height, Car Damage) plot multiple colour-coded lines on a single chart instance.
          This is implemented via a static <code>GetSubSeries()</code> function that takes an{' '}
          <code>ETelemetryMetric</code> enum value and returns a{' '}
          <code>TArray&lt;FTelemetrySubSeries&gt;</code>. Each entry holds <code>JsonKey</code>{' '}
          (the key in the <code>.jsession</code> telemetry object), <code>DisplayName</code>{' '}
          (the chart legend label), and <code>Color</code> (the line colour).
        </p>
        <p>
          The data population loop in <code>LoadMetricFromJson</code> iterates this array
          uniformly — the same loop body handles 1-line, 2-line, 4-line, and 5-line charts with
          no branching on metric type.
        </p>
        <pre className="code-block"><code>{`// High-contrast colours chosen for dark VR backgrounds
static const FLinearColor ColourFL(0.00f, 0.90f, 0.40f, 1.0f);  // green
static const FLinearColor ColourFR(0.20f, 0.65f, 1.00f, 1.0f);  // blue
static const FLinearColor ColourRL(1.00f, 0.55f, 0.00f, 1.0f);  // orange
static const FLinearColor ColourRR(1.00f, 0.20f, 0.40f, 1.0f);  // red-pink

// Example — 4-corner grouped metric (same colour scheme for tyre/suspension)
case ETelemetryMetric::TyrePressure:
    Out.Add({TEXT("tyre_pressure_fl"), TEXT("FL"), ColourFL});
    Out.Add({TEXT("tyre_pressure_fr"), TEXT("FR"), ColourFR});
    Out.Add({TEXT("tyre_pressure_rl"), TEXT("RL"), ColourRL});
    Out.Add({TEXT("tyre_pressure_rr"), TEXT("RR"), ColourRR});
    break;

// The data population loop is identical regardless of sub-series count:
for (const FTelemetrySubSeries& SS : SubSeries)
{
    Plot->BP_AddSeriesWithId(bOK, FName(*SS.JsonKey),
        FText::FromString(SS.DisplayName), true, false, true);
    Plot->AddSeriesStyleOverride(FName(*SS.JsonKey), nullptr, SS.Color);

    for (int32 i = 0; i < NumPoints; i += Step)
        Plot->BP_AddDatapoint(FName(*SS.JsonKey), FVector2D(X[i], Y[i]), bOK);
}`}</code></pre>

        <h2>Telemetry — Native Win32 File Dialog</h2>
        <p>
          <strong>Frameworks:</strong> Win32 API (<code>commdlg.h</code> —{' '}
          <code>GetOpenFileName</code>), Unreal Engine 4.27 input system.
        </p>
        <p>
          UE4's built-in <code>IDesktopPlatform</code> module wraps the OS file dialog but is{' '}
          <strong>editor-only</strong> — it is not compiled into Shipping builds and causes a
          linker error: <em>"Missing precompiled manifest for 'DesktopPlatform'"</em>. The
          solution is to bypass <code>DesktopPlatform</code> entirely and call the Win32{' '}
          <code>GetOpenFileName</code> API directly via <code>commdlg.h</code>. This is the same
          underlying API that <code>DesktopPlatform</code> wraps internally, so behaviour is
          identical — but it has zero additional module dependencies and works in all build
          configurations (Editor, Development, Shipping).
        </p>
        <p>
          UE4's <code>Windows/AllowWindowsPlatformTypes.h</code> and{' '}
          <code>Windows/HideWindowsPlatformTypes.h</code> bracket the Win32 include to prevent
          macro conflicts with Unreal's type system. After the dialog closes (file selected or
          cancelled), <code>SetInputMode(FInputModeGameOnly)</code> recaptures mouse and VR input
          focus — without this the OS cursor remains active and the player loses mouse look.
        </p>
        <pre className="code-block"><code>{`#if PLATFORM_WINDOWS
#include "Windows/AllowWindowsPlatformTypes.h"
#include <commdlg.h>
#include "Windows/HideWindowsPlatformTypes.h"
#endif

// Inside OnOpenFilePressed():
TCHAR FilePath[MAX_PATH] = { 0 };

OPENFILENAME Ofn;
FMemory::Memzero(&Ofn, sizeof(Ofn));
Ofn.lStructSize = sizeof(OPENFILENAME);
Ofn.lpstrFilter = TEXT("JSession Files (*.jsession)\\0*.jsession\\0");
Ofn.lpstrFile   = FilePath;
Ofn.nMaxFile    = MAX_PATH;
Ofn.lpstrTitle  = TEXT("Select .jsession Telemetry File");
Ofn.Flags       = OFN_FILEMUSTEXIST | OFN_PATHMUSTEXIST | OFN_NOCHANGEDIR;

if (!GetOpenFileName(&Ofn))
{
    // User cancelled — still recapture VR input focus
    PC->SetInputMode(FInputModeGameOnly());
    return;
}

// ... load and parse file ...

PC->SetInputMode(FInputModeGameOnly());`}</code></pre>

        <h2>Telemetry — JSON Parsing &amp; Broadcast</h2>
        <p>
          <strong>Frameworks:</strong> Unreal Engine 4.27 (<code>FFileHelper</code>,{' '}
          <code>FJsonSerializer</code>, <code>TActorIterator</code>), C++.
        </p>
        <p>
          The <code>.jsession</code> file is loaded into an <code>FString</code> via{' '}
          <code>FFileHelper::LoadFileToString</code>, then deserialized via{' '}
          <code>FJsonSerializer::Deserialize</code> into an <code>FJsonObject</code> tree. The{' '}
          <code>"elapsed_time"</code> array is pre-extracted into a <code>TArray&lt;float&gt;</code>{' '}
          as the shared X-axis for all chart instances. A{' '}
          <code>TActorIterator&lt;ATelemetryVisualizer&gt;</code> then iterates every instance
          in the level and calls <code>LoadMetricFromJson</code> on each — one parse, N chart
          updates simultaneously.
        </p>
        <p>
          Down-sampling: if any metric array exceeds 6,000 points, a uniform step is computed
          as <code>FMath::CeilToInt(NumPoints / 6000.0f)</code> and only every N-th point is
          pushed to the chart. This preserves the overall shape and trend of the data while
          keeping GPU work and memory allocation within VR frame-time limits.
        </p>
        <pre className="code-block"><code>{`// Load and parse the .jsession file once
FString JsonString;
FFileHelper::LoadFileToString(JsonString, *SelectedFilePath);

TSharedPtr<FJsonObject> RootJson;
TSharedRef<TJsonReader<>> Reader = TJsonReaderFactory<>::Create(JsonString);
FJsonSerializer::Deserialize(Reader, RootJson);

TSharedPtr<FJsonObject> TeleObj = RootJson->GetObjectField(TEXT("telemetry"));

// Pre-extract shared X-axis (elapsed_time) — avoids repeated JSON lookups
TArray<float> ElapsedTimeArray;
for (const auto& Val : TeleObj->GetArrayField(TEXT("elapsed_time")))
    ElapsedTimeArray.Add((float)Val->AsNumber());

// Broadcast to every ATelemetryVisualizer actor in the level
for (TActorIterator<ATelemetryVisualizer> It(GetWorld()); It; ++It)
{
    It->LoadMetricFromJson(TeleObj, ElapsedTimeArray);
}

// Down-sampling (inside LoadMetricFromJson, per sub-series):
int32 NumPoints = DataArray.Num();
int32 Step = FMath::Max(1, FMath::CeilToInt(NumPoints / 6000.0f));
for (int32 i = 0; i < NumPoints; i += Step)
{
    float X = ElapsedTime[i];
    float Y = (float)DataArray[i]->AsNumber();
    Plot->BP_AddDatapoint(SeriesID, FVector2D(X, Y), bOK);
}`}</code></pre>

      </>)}
    </SectionPage>
  );
}

export default Implementation;
