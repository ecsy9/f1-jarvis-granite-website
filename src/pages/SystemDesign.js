import { useState } from 'react';
import SectionPage from '../components/SectionPage';
import './Algorithms.css';

const TABS = ['Data Pipeline', 'AI Pipeline', 'VR'];

function SystemDesign() {
  const [activeTab, setActiveTab] = useState('Data Pipeline');

  return (
    <SectionPage title="System Design">
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

      {activeTab === 'Data Pipeline' && (<>
      <p>
        This section covers the data pipeline system design: architecture, sequence diagrams,
        design patterns, data layer class diagram, storage schema, and packages/APIs.
        AI model inference and the AI pipeline are covered in the AI Pipeline tab.
      </p>

      <h2>System Architecture</h2>
      <p>
        The application follows a <strong>multi-threaded producer-consumer architecture</strong>{' '}
        with Qt signal-slot decoupling between components. All inter-thread communication uses
        PyQt5's thread-safe signal mechanism, ensuring the UI thread never blocks on telemetry
        processing or AI inference.
      </p>
      <pre className="code-block"><code>{`+---------------------------+
|     Assetto Corsa Game    |
|  (Windows Shared Memory)  |
+----------+----------------+
           | ctypes mmap read @ 60 Hz
           v
+----------+----------------+
|   AcTelemetryWorker       |
|   (QThread)               |
|   - Reads 3 memory blocks |
|   - Validates/cleans data |
|   - Detects lap boundaries|
+--+------+------+------+--+
   |      |      |      |
   | realtime_sample (60 Hz)
   | lap_completed
   | session_info_update
   | live_data_update
   v      v      v      v
+--+------+------+------+--+     +-------------------------+
|     MainWindow (UI)       |     |  AIRaceEngineerWorker   |
|  - Track map canvas       |     |  (QThread)              |
|  - Time-series graphs     |<----+  - TelemetryAgent       |
|  - Live data panels       |     |  - RaceEngineerAgent    |
|  - AI transcript display  |     |  - LiveSessionContext   |
|  - Lap table              |     +---+---------------------+
+---------------------------+         | ai_commentary signal
                                      v
+---------------------------+     +-------------------------+
|   SessionRecorder         |     |  VoiceInputWorker       |
|   (QThread)               |     |  (QThread)              |
|   - SQLite batch writes   |     |  - WebRTC VAD           |
|   - 60-sample buffer      |     |  - Whisper STT          |
+---------------------------+     +-------------------------+
           | SQLite DB
           v
+---------------------------+
|   Post-Race Viewer        |
|   (LapViewerWindow)       |
|   - TelemetryLoader       |
|   - Timeline scrubber     |
|   - 16 graph types        |
|   - AI Coach/Analyst      |
+---------------------------+`}</code></pre>

      <table className="section-table">
        <thead>
          <tr><th>Component</th><th>Thread</th><th>Responsibility</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>AcTelemetryWorker</code></td>
            <td>Background QThread</td>
            <td>Reads AC shared memory at 60 Hz, validates data, detects lap boundaries via LapBuffer, emits 4 Qt signals</td>
          </tr>
          <tr>
            <td><code>MainWindow</code></td>
            <td>Main (UI) thread</td>
            <td>Receives signals, updates Matplotlib canvases at ~12 Hz, displays live data panels, lap table, AI transcripts</td>
          </tr>
          <tr>
            <td><code>AIRaceEngineerWorker</code></td>
            <td>Background QThread</td>
            <td>Converts telemetry to Pydantic models, runs rule-based event detection (&lt;50ms), triggers LLM responses (~2s), emits <code>ai_commentary</code></td>
          </tr>
          <tr>
            <td><code>SessionRecorder</code></td>
            <td>Background QThread</td>
            <td>Buffers 60 telemetry samples, batch-inserts to SQLite, records laps/AI/voice data</td>
          </tr>
          <tr>
            <td><code>VoiceInputWorker</code></td>
            <td>Background QThread</td>
            <td>Listens for voice via WebRTC VAD, transcribes with faster-whisper, forwards queries to AI</td>
          </tr>
          <tr>
            <td><code>TTSOutputWorker</code></td>
            <td>Background QThread</td>
            <td>Converts AI text responses to speech via Kokoro TTS, plays through PyAudio</td>
          </tr>
          <tr>
            <td><code>LapViewerWindow</code></td>
            <td>Main (UI) thread</td>
            <td>Loads recorded sessions from CSV/SQLite, provides timeline scrubber, 16 configurable graph types, AI analysis tabs</td>
          </tr>
          <tr>
            <td><code>StartupLoaderThread</code></td>
            <td>Background QThread</td>
            <td>Stages 2–9 sequential import of heavy modules, model download with progress tracking</td>
          </tr>
        </tbody>
      </table>

      <h2>Sequence Diagrams</h2>

      <h3>Real-Time Telemetry Flow (Per Frame)</h3>
      <pre className="code-block"><code>{`AC Game       AcTelemetryWorker    LapBuffer     MainWindow     SessionRecorder
  |                 |                  |               |                |
  |--shared mem.--->|                  |               |                |
  |                 |--add_sample()--->|               |                |
  |                 |--emit realtime_sample----------->|                |
  |                 |--emit realtime_sample--------------------------------->|
  |                 |                  |               |--buffer sample |
  |                 |                  |               |                |--append to batch
  |                 |      [every 5 samples]           |                |
  |                 |                  |               |--update canvases (12Hz)
  |                 |      [every 60 samples]          |                |
  |                 |                  |               |                |--flush batch
  |                 |                  |               |                |  (executemany)`}</code></pre>

      <h3>Lap Completion Flow</h3>
      <pre className="code-block"><code>{`AcTelemetryWorker    LapBuffer      MainWindow    SessionRecorder  AIRaceEngineerWorker
  |                     |               |               |                  |
  |--lap_id incremented->|              |               |                  |
  |                     |--wait 10 frames (stabilisation)                  |
  |                     |--on_lap_complete->|           |                  |
  |--emit lap_completed------------------>|            |                  |
  |                     |               |--add to lap table                |
  |--emit lap_completed---------------------------->|                     |
  |                     |               |           |--record_lap()        |
  |--emit lap_completed------------------------------------------>|        |
  |                     |               |               |         |--detect lap_complete
  |                     |               |               |         |--LLM generate response
  |                     |               |               |         |--emit ai_commentary
  |                     |               |<------- ai_commentary --|
  |                     |               |--display in transcript  |`}</code></pre>

      <h3>AI Event Detection &amp; Response Flow</h3>
      <pre className="code-block"><code>{`AIRaceEngineerWorker
  |
  |--receive realtime_sample
  |--convert dict -> TelemetryData (Pydantic)
  |--LiveSessionContext.update(telemetry)
  |--TelemetryAgent.detect_events(telemetry, context)
  |    |
  |    |--_check_fuel_events()         [fuel / consumption_per_lap <= threshold?]
  |    |--_check_tire_temp_events()    [any tire >= 100C / 110C?]
  |    |--_check_tire_wear_events()    [any tire >= 70% / 85%?]
  |    |--_check_wheel_slip_events()   [any tire slip >= 50 / 100?]
  |    |--_check_gap_events()          [gap delta >= 1.0s?]
  |    |--_check_opponent_events()     [gap_behind <= 0.8s?]
  |    |--_check_car_damage_events()   [total damage >= 5% / 20%?]
  |    |--_check_position_change()     [position != previous?]
  |    |--_check_lap_completion()      [lap_number incremented?]
  |    |--_check_pit_window()          [fuel <= 5 laps OR wear >= 70%?]
  |    |
  |    |--return List[Event]  (< 50ms total)
  |
  |--for each Event (sorted by Priority via heapq):
  |    |--RaceEngineerAgent.generate_proactive_response(event, context)
  |    |    |--format prompt with event data + context
  |    |    |--LLM inference (~2s)
  |    |    |--return response text
  |    |
  |    |--emit ai_commentary(message, trigger_type, priority)`}</code></pre>

      <h2>Design Patterns</h2>
      <table className="section-table">
        <thead>
          <tr><th>Pattern</th><th>Where Used</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Observer (Signal-Slot)</strong></td>
            <td>All inter-thread communication</td>
            <td>PyQt5 signals decouple producers from consumers; any number of slots can connect to a signal without the emitter knowing about them</td>
          </tr>
          <tr>
            <td><strong>Producer-Consumer</strong></td>
            <td><code>AcTelemetryWorker</code> &rarr; <code>MainWindow</code>, <code>SessionRecorder</code>, <code>AIWorker</code></td>
            <td>Single telemetry producer feeds multiple independent consumers via signal fan-out</td>
          </tr>
          <tr>
            <td><strong>Strategy</strong></td>
            <td><code>TelemetryAgent</code> detection rules</td>
            <td>Each <code>_check_*</code> method is an independent detection strategy; new rules are added by implementing a new method</td>
          </tr>
          <tr>
            <td><strong>Factory</strong></td>
            <td><code>events.py</code> factory functions</td>
            <td><code>create_fuel_critical_event()</code>, <code>create_tire_warning_event()</code>, etc. encapsulate event construction with correct priority and data schema</td>
          </tr>
          <tr>
            <td><strong>Template Method</strong></td>
            <td>Backend workers</td>
            <td>All backends follow the same <code>run()</code> structure: connect &rarr; poll &rarr; validate &rarr; emit; extending to a new sim requires overriding only the read logic</td>
          </tr>
          <tr>
            <td><strong>Singleton (Module-level)</strong></td>
            <td>LLM instance in <code>model_prewarm</code></td>
            <td>The LLM is loaded once and shared across inference calls to avoid multi-GB memory duplication</td>
          </tr>
          <tr>
            <td><strong>Batch/Buffer</strong></td>
            <td><code>SessionRecorder</code> (60-sample batch), <code>LiveSessionContext</code> (600-sample deque)</td>
            <td>Amortise I/O cost and bound memory usage</td>
          </tr>
        </tbody>
      </table>

      <h2>Class Diagram (Data Layer)</h2>
      <pre className="code-block"><code>{`+---------------------+       +-------------------+       +------------------+
|   SessionMetadata   |       |     Session       |       |       Lap        |
+---------------------+       +-------------------+       +------------------+
| session_id: int     |<------| metadata          |       | lap_number: int  |
| game: str           |       | laps: List[Lap]   |------>| telemetry: DF    |
| track_name: str     |       | telemetry: DF     |       | lap_time: float  |
| car_model: str      |       | ai_commentary:    |       | summary: LapSum  |
| player_name: str    |       |   List[AIComment] |       +------------------+
| start_time: datetime|       +-------------------+       | get_speed_trace()|
| total_laps: int     |       | get_lap(n)        |       | get_racing_line()|
| ai_enabled: bool    |       | get_fastest_lap() |       | get_avg_tire_*() |
+---------------------+       | calculate_CoV()   |       +------------------+
                              +-------------------+

+---------------------+       +-------------------+       +------------------+
|    AIComment        |       |   TelemetryData   |       |   TireTemps      |
+---------------------+       |   (Pydantic)      |       +------------------+
| timestamp: datetime |       +-------------------+       | fl: float (>= 0) |
| message: str        |       | speed: float      |       | fr: float (>= 0) |
| trigger: str        |       | rpms: int         |       | rl: float (>= 0) |
| priority: int       |       | gear: int         |       | rr: float (>= 0) |
| lap_number: int     |       | throttle: 0-1     |       +------------------+
+---------------------+       | brake: 0-1        |
                              | fuel: Optional    |       +------------------+
                              | tire_temps        |       |     GForces      |
                              | tire_pressure     |       +------------------+
                              | tire_wear         |       | lateral: float   |
                              | g_forces          |       | longitudinal:float|
                              | wheel_slip        |       +------------------+
                              | car_damage: dict  |
                              +-------------------+`}</code></pre>

      <h2>Data Storage</h2>
      <p>
        The application uses a single SQLite file (<code>data/telemetry_sessions.db</code>).
        SQLite was chosen for zero configuration (no server process), portability (single file),
        adequate concurrency for single-writer with WAL mode, and performance (batch inserts
        handle 60 samples/second comfortably).
      </p>

      <h3>Entity-Relationship Diagram</h3>
      <pre className="code-block"><code>{`+------------------+        +------------------+        +-------------------+
|    sessions      |        |      laps        |        |    telemetry      |
+------------------+        +------------------+        +-------------------+
| PK session_id    |<-------| FK session_id    |        | PK telemetry_id   |
|    start_time    |   1:N  | PK lap_id        |        | FK session_id     |----+
|    end_time      |        |    lap_number    |        |    lap_number     |    |
|    game          |        |    lap_time      |        |    elapsed_time   |    |
|    track_name    |        |    sector1_time  |        |    pos_x, pos_z   |    |
|    car_model     |        |    sector2_time  |        |    speed          |    |
|    player_name   |        |    sector3_time  |        |    gear, rpm      |    |
|    total_laps    |        |    valid         |        |    throttle, brake|    |
|    best_lap_time |        |    fuel_start    |        |    tyre_press_*   |    |
|    ai_enabled    |        |    fuel_end      |        |    tyre_temp_*    |    |
|    session_type  |        |    avg_speed     |        |    tyre_wear_*    |    |
+------------------+        |    timestamp     |        |    wheel_slip_*   |    |
        |                   +------------------+        |    car_damage_*   |    |
        | 1:N                                           |    timestamp      |    |
        v                                               +-------------------+    |
+------------------+        +-------------------+                                |
| ai_commentary    |        |  voice_queries    |<-------------------------------+
+------------------+        +-------------------+       (all FK to session_id)
| PK commentary_id |        | PK query_id       |
| FK session_id    |        | FK session_id     |
|    timestamp     |        |    timestamp      |
|    message       |        |    query_text     |
|    trigger       |        |    response_text  |
|    priority      |        |    lap_number     |
|    lap_number    |        +-------------------+
+------------------+`}</code></pre>

      <p><strong>Cardinalities:</strong></p>
      <ul>
        <li><code>sessions</code> 1:N <code>laps</code> — one session has many laps</li>
        <li><code>sessions</code> 1:N <code>telemetry</code> — one session has ~60 &times; laps &times; lap_duration telemetry rows</li>
        <li><code>sessions</code> 1:N <code>ai_commentary</code> — one session has 0–many AI messages</li>
        <li><code>sessions</code> 1:N <code>voice_queries</code> — one session has 0–many voice queries</li>
      </ul>

      <p><strong>Database Indices:</strong></p>
      <ul>
        <li><code>idx_laps_session</code> on <code>laps(session_id)</code></li>
        <li><code>idx_telemetry_session</code> on <code>telemetry(session_id)</code></li>
        <li><code>idx_telemetry_lap</code> on <code>telemetry(lap_number)</code></li>
        <li><code>idx_ai_session</code> on <code>ai_commentary(session_id)</code></li>
        <li><code>idx_voice_session</code> on <code>voice_queries(session_id)</code></li>
      </ul>

      <p><strong>Storage Estimates:</strong></p>
      <ul>
        <li>Telemetry row: ~50 columns &times; 8 bytes avg = ~400 bytes/row</li>
        <li>10-lap Monza session: ~66,000 rows &times; 400 bytes = ~26 MB</li>
        <li>Database file: <code>data/telemetry_sessions.db</code></li>
      </ul>

      <h2>Packages and APIs</h2>

      <h3>Internal Packages</h3>
      <table className="section-table">
        <thead>
          <tr><th>Package</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr><td><code>telemetry/</code></td><td>Backend workers and lap detection</td></tr>
          <tr><td><code>telemetry/backends/</code></td><td>Game-specific shared memory readers</td></tr>
          <tr><td><code>ui/</code></td><td>PyQt5 windows, canvases, styles</td></tr>
          <tr><td><code>ui/canvases/</code></td><td>Matplotlib graph widgets (track map, time-series, multi-line, camber)</td></tr>
          <tr><td><code>ui/post_race/</code></td><td>Post-race viewer with timeline, graphs, AI analysis tabs</td></tr>
          <tr><td><code>ai/</code></td><td>AI race engineer, voice input, TTS output</td></tr>
          <tr><td><code>ai/race_engineer_core/</code></td><td>Rule-based detection, LLM client, context, prompts, event models</td></tr>
          <tr><td><code>data/</code></td><td>Session/Lap/Telemetry models, recorder, exporter, loader</td></tr>
          <tr><td><code>analysis/</code></td><td>Post-race AI pipeline bridge and fallback</td></tr>
        </tbody>
      </table>

      <h3>External Dependencies</h3>
      <table className="section-table">
        <thead>
          <tr><th>Library</th><th>Version</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>PyQt5</strong></td><td>5.15+</td><td>GUI framework, threading (QThread), signals/slots</td></tr>
          <tr><td><strong>Matplotlib</strong></td><td>3.8+</td><td>Track map, time-series, multi-line graphs</td></tr>
          <tr><td><strong>NumPy</strong></td><td>1.24+</td><td>Array operations, unit conversions, interpolation</td></tr>
          <tr><td><strong>Pandas</strong></td><td>2.0+</td><td>Telemetry DataFrames, CSV I/O, column operations</td></tr>
          <tr><td><strong>Pydantic</strong></td><td>2.0+</td><td>Telemetry data validation and type-safe models</td></tr>
          <tr><td><strong>SQLite3</strong></td><td>(stdlib)</td><td>Session recording database</td></tr>
          <tr><td><strong>ctypes</strong></td><td>(stdlib)</td><td>Windows shared memory struct mapping</td></tr>
          <tr><td><strong>llama-cpp-python</strong></td><td>0.2+</td><td>Local GGUF model inference</td></tr>
          <tr><td><strong>huggingface-hub</strong></td><td>0.20+</td><td>Model download with caching</td></tr>
          <tr><td><strong>faster-whisper</strong></td><td>1.0+</td><td>Local speech-to-text (voice input)</td></tr>
          <tr><td><strong>pykokoro</strong></td><td>0.5+</td><td>Local text-to-speech output</td></tr>
          <tr><td><strong>PyAudio</strong></td><td>0.2+</td><td>Audio playback for TTS</td></tr>
          <tr><td><strong>webrtcvad</strong></td><td>2.0+</td><td>Voice activity detection</td></tr>
        </tbody>
      </table>

      <h3>Key APIs Defined</h3>
      <pre className="code-block"><code>{`# Telemetry Backend API (signals any new backend must emit)
lap_completed       = pyqtSignal(int, list)     # lap_id, samples
status_update       = pyqtSignal(str)           # message
session_info_update = pyqtSignal(dict)          # {track, car, player, ...}
live_data_update    = pyqtSignal(dict)          # {speed, gear, rpm, fuel, ...}
realtime_sample     = pyqtSignal(dict)          # full sample dict @ 60Hz

# AI Commentary API
ai_commentary       = pyqtSignal(str, str, int) # message, trigger, priority

# Session Export API (file format per session)
session_X_telemetry.csv       # All telemetry columns @ 60Hz
session_X_laps.csv            # Lap summary statistics
session_X_ai_commentary.csv   # AI messages with timestamps
session_X_metadata.json       # Session metadata sidecar`}</code></pre>
      </>)}

      {activeTab === 'AI Pipeline' && (<>
      <p>
        Detailed system architecture, component design, design patterns, class diagrams, data
        storage schema, and package/API definitions for the Jarvis AI pipeline. The data pipeline
        (how telemetry flows from game to storage) is covered in the Data Pipeline tab.
      </p>

      <h2>System Architecture</h2>
      <p>
        The system follows a <strong>multi-threaded, event-driven architecture</strong> built on
        PyQt5's signal/slot mechanism. Two major operating modes share a common data and UI
        foundation: <strong>Jarvis Live</strong> (real-time dashboard with AI race engineer)
        and <strong>Jarvis Post</strong> (post-race analysis with LLM-powered debrief agents).
      </p>

      <pre className="code-block"><code>{`+=====================================================================+
|                     UNIFIED LAUNCHER (main.py)                      |
|  +------------------+   +------------------+   +-----------------+  |
|  | Start Jarvis Live |   | Start Jarvis Post|   |    Settings     |  |
|  +--------+---------+   +--------+---------+   +--------+--------+  |
|           |                      |                       |          |
+===========|======================|=======================|==========+
            |                      |                       |
            v                      v                       v
+========================+  +======================+  +==============+
| JARVIS LIVE            |  | JARVIS POST          |  | LauncherWindow|
| (Real-Time Dashboard)  |  | (Post-Race Analysis) |  | (Settings UI) |
|                        |  |                      |  +==============+
| +--------------------+ |  | +------------------+ |
| | AC Telemetry       | |  | | Session Picker   | |
| | Worker (QThread)   | |  | | Dialog           | |
| +--------+-----------+ |  | +--------+---------+ |
|          |              |  |          |            |
|    realtime_sample      |  |   SessionExporter    |
|    signal (60Hz)        |  |   loads from SQLite  |
|          |              |  |          |            |
|    +-----+------+       |  | +--------v---------+ |
|    |            |       |  | | LapViewerWindow   | |
|    v            v       |  | | + Timeline Ctrl   | |
| MainWindow  AI Race     |  | | + AI Pipeline     | |
| (Dashboard) Engineer    |  | |   Bridge          | |
| + Canvases  (QThread)   |  | +------------------+ |
|    |            |       |  +======================+
|    |     +------+------+|
|    |     |      |      ||
|    |     v      v      v|
|    | Voice   TTS    Session|
|    | Input   Output Recorder|
|    | Worker  Worker (QThread)|
|    | (QThread)(QThread)     |
|    |     |                  |
|    |     v                  |
|    | PTT Controller         |
|    | (keyboard/joystick)    |
+============================+
            |
            v
    +===============+
    | SQLite Database|
    | (telemetry_   |
    |  sessions.db) |
    +===============+`}</code></pre>

      <h3>Component Descriptions</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Unified Launcher</strong></td>
            <td><code>QDialog</code></td>
            <td>Main menu offering three entry points: Start Jarvis Live, Start Jarvis Post, or open Settings. Loops back after each session ends.</td>
          </tr>
          <tr>
            <td><strong>Startup Loader</strong></td>
            <td><code>QThread</code> + <code>QWidget</code></td>
            <td>11-stage background loader that imports all modules, downloads models, and prewarms the LLM while displaying a progress splash screen.</td>
          </tr>
          <tr>
            <td><strong>MainWindow</strong></td>
            <td><code>QMainWindow</code></td>
            <td>Live telemetry dashboard with 3-column layout: left (track map + lap table + delta), middle (telemetry graphs), right (session info + AI comms transcript). Updates at ~12 Hz.</td>
          </tr>
          <tr>
            <td><strong>AcTelemetryWorker</strong></td>
            <td><code>QThread</code></td>
            <td>Reads Assetto Corsa shared memory at ~60 Hz using <code>ctypes.Structure</code> mappings. Emits telemetry signals.</td>
          </tr>
          <tr>
            <td><strong>LapBuffer</strong></td>
            <td>Plain class</td>
            <td>Detects lap completion by monitoring <code>lap_id</code> changes. Buffers samples per lap and fires a callback when the lap counter increments.</td>
          </tr>
          <tr>
            <td><strong>AIRaceEngineerWorker</strong></td>
            <td><code>QThread</code></td>
            <td>Orchestrates the AI pipeline: receives telemetry via queue, runs rule-based event detection, generates LLM responses, applies guardrails, and emits commentary signals.</td>
          </tr>
          <tr>
            <td><strong>TelemetryAgent</strong></td>
            <td>Plain class</td>
            <td>Rule-based event detector. Evaluates thresholds against each telemetry frame and returns prioritised <code>Event</code> objects. No LLM dependency.</td>
          </tr>
          <tr>
            <td><strong>RaceEngineerAgent</strong></td>
            <td>Plain class</td>
            <td>LLM response generator. Constructs prompts from events/queries and session context, calls the local LLM, and returns natural-language responses.</td>
          </tr>
          <tr>
            <td><strong>LocalLLMInference</strong></td>
            <td>Singleton class</td>
            <td>Loads and manages the GGUF-quantised Granite model via llama-cpp-python. Thread-safe generation with timeout and mutex. Shared singleton across restarts.</td>
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
            <td>Synthesises AI responses to audio using Kokoro TTS (ONNX). Plays via winsound (Windows) or PyAudio (cross-platform). Priority message queue.</td>
          </tr>
          <tr>
            <td><strong>SessionRecorder</strong></td>
            <td><code>QThread</code></td>
            <td>Writes all telemetry, laps, AI commentary, and voice queries to SQLite. Batch-inserts telemetry (60 samples per flush) for performance.</td>
          </tr>
          <tr>
            <td><strong>LapViewerWindow</strong></td>
            <td><code>QMainWindow</code></td>
            <td>Post-race analysis UI with YouTube-style timeline scrubber, track map with position marker, telemetry graphs with time cursor, and streaming AI analysis panel.</td>
          </tr>
          <tr>
            <td><strong>TimelineController</strong></td>
            <td><code>QObject</code></td>
            <td>Video-player-like controller: play/pause/seek/speed with <code>time_changed</code> signal that synchronises all post-race visualisations.</td>
          </tr>
          <tr>
            <td><strong>AIPipelineBridge</strong></td>
            <td>Plain class</td>
            <td>Adapter connecting the post-race UI to the LLM agents. Translates data formats, handles model availability checking, and falls back to heuristic analysis if unavailable.</td>
          </tr>
          <tr>
            <td><strong>SessionExporter</strong></td>
            <td>Plain class</td>
            <td>Reads sessions from SQLite. Exports to CSV or <code>.jsession</code> bundles (ZIP). Supports import for session sharing.</td>
          </tr>
          <tr>
            <td><strong>TelemetryLoader</strong></td>
            <td>Plain class</td>
            <td>Deserialises exported CSV files back into <code>Session</code>/<code>Lap</code>/<code>pd.DataFrame</code> objects for the post-race viewer.</td>
          </tr>
          <tr>
            <td><strong>ConfigManager</strong></td>
            <td>Module functions</td>
            <td>Loads/saves <code>config.json</code> with voice mode, PTT bindings, and LLM path settings.</td>
          </tr>
        </tbody>
      </table>

      <h2>Sequence Diagrams</h2>
      <p>
        Key interaction flows between system components, shown as sequence diagrams.
      </p>

      <h3>Live Telemetry Flow</h3>
      <p>
        Real-time sample flow from Assetto Corsa shared memory through the telemetry worker
        to the dashboard and AI race engineer.
      </p>
      <pre className="code-block"><code>{`Assetto Corsa         AcTelemetryWorker      MainWindow        AIRaceEngineerWorker
(Shared Memory)       (QThread, 60Hz)        (UI Thread)       (QThread)
     |                      |                     |                    |
     |--read_physics()----->|                     |                    |
     |--read_graphics()---->|                     |                    |
     |                      |                     |                    |
     |                      |--realtime_sample--->|                    |
     |                      |    signal (dict)    |                    |
     |                      |                     |--buffer sample---->|
     |                      |                     |  (every 12th       |
     |                      |                     |   sample via       |
     |                      |                     |   throttle fn)     |
     |                      |                     |                    |
     |                      |                     |<---update graphs   |
     |                      |                     | (every 5 samples)  |
     |                      |                     |                    |
     |                      |--realtime_sample--->| - - - - - - - - -->|
     |                      |                     |                    |--detect_events()
     |                      |                     |                    |  (TelemetryAgent)
     |                      |                     |                    |
     |                      |                     |                    |--[if event detected]
     |                      |                     |                    |  generate_response()
     |                      |                     |                    |  (LLM or fallback)
     |                      |                     |                    |
     |                      |                     |<--ai_commentary----|
     |                      |                     |    signal          |
     |                      |                     |                    |
     |                      |                     |--display in        |
     |                      |                     |  comms transcript  |`}</code></pre>

      <h3>Voice Query Flow</h3>
      <p>
        End-to-end flow when the driver asks a question via voice input, through transcription,
        LLM generation, and TTS playback.
      </p>
      <pre className="code-block"><code>{`Microphone      VoiceInputWorker    AIRaceEngineerWorker    TTSOutputWorker
                (QThread)           (QThread)                (QThread)
    |                |                    |                       |
    |--audio frame-->|                    |                       |
    |                |--VAD: is_speech?   |                       |
    |                |  [speech detected] |                       |
    |                |--buffer audio      |                       |
    |                |  [silence 150ms]   |                       |
    |                |--transcribe()      |                       |
    |                |  (faster-whisper)  |                       |
    |                |                    |                       |
    |                |--speech_detected-->|                       |
    |                |  signal (str)      |                       |
    |                |                    |--build reactive prompt |
    |                |                    |  (context pruning)     |
    |                |                    |--LLM generate()        |
    |                |                    |--guardrail checks      |
    |                |                    |                       |
    |                |                    |--ai_commentary-------->|
    |                |                    |  signal (str)         |--synthesize()
    |                |                    |                       |  (Kokoro TTS)
    |                |<---pause()---------|                       |--play audio
    |                |  (prevent echo)    |                       |
    |                |                    |                       |--playback_finished
    |                |<---resume()--------|                       |  signal`}</code></pre>

      <h3>Lap Completion Flow</h3>
      <p>
        How lap completions are detected, recorded, and displayed.
      </p>
      <pre className="code-block"><code>{`AcTelemetryWorker     LapBuffer         MainWindow          SessionRecorder
(QThread)             (plain class)     (UI Thread)         (QThread)
    |                      |                 |                    |
    |--add_sample()------->|                 |                    |
    |  (lap_id=N)          |                 |                    |
    |                      |--[lap_id        |                    |
    |                      |  incremented]   |                    |
    |                      |--on_lap_complete |                    |
    |                      |  callback       |                    |
    |                      |                 |                    |
    |--lap_completed signal----------------->|                    |
    |  (lap_id, samples,                     |                    |
    |   valid, last_time_ms)                 |                    |
    |                                        |--update lap table  |
    |                                        |  (time + delta)    |
    |                                        |                    |
    |--lap_completed signal----------------------------------->---|
    |                                        |                    |--record_lap()
    |                                        |                    |  (SQLite INSERT)`}</code></pre>

      <h3>Post-Race Analysis Flow</h3>
      <p>
        How a recorded session is loaded, analysed by LLM agents, and presented to the user.
      </p>
      <pre className="code-block"><code>{`SessionPickerDialog    SessionExporter    LapViewerWindow    AIPipelineBridge
(QDialog)              (plain class)      (QMainWindow)      (plain class)
    |                      |                   |                   |
    |--list_sessions()---->|                   |                   |
    |<--session list-------|                   |                   |
    |                      |                   |                   |
    |--[user selects]      |                   |                   |
    |--export_session()--->|                   |                   |
    |                      |--write CSVs       |                   |
    |                      |                   |                   |
    |                      |                   |<--load_session()  |
    |                      |                   |  (TelemetryLoader)|
    |                      |                   |                   |
    |                      |                   |--[user clicks     |
    |                      |                   |  Analyse]          |
    |                      |                   |--generate()------->|
    |                      |                   |                   |--RaceAnalysisAgent
    |                      |                   |                   |  .analyse_stream()
    |                      |                   |<--streaming text---|
    |                      |                   |                   |
    |                      |                   |--[user clicks     |
    |                      |                   |  lap in table]     |
    |                      |                   |--generate_coach()->|
    |                      |                   |                   |--CoachingAgent
    |                      |                   |                   |  .analyse_stream()
    |                      |                   |<--streaming text---|`}</code></pre>

      <h3>Application Startup Flow</h3>
      <p>
        The 11-stage startup loader that imports modules, downloads models, and prewarms the LLM.
      </p>
      <pre className="code-block"><code>{`main.py           LoadingScreen     StartupLoaderThread     UnifiedLauncher
                  (QWidget)         (QThread)               (QDialog)
    |                  |                  |                       |
    |--create app      |                  |                       |
    |--show()--------->|                  |                       |
    |--start()------------------------------>|                    |
    |                  |                  |--Stage 1: App shell   |
    |                  |<--stage_update---|                       |
    |                  |                  |--Stage 2: Native DLLs |
    |                  |                  |--Stage 3: UI imports  |
    |                  |                  |--Stage 4: Telemetry   |
    |                  |                  |--Stage 5: AI stack    |
    |                  |                  |--Stage 6: GGUF models |
    |                  |                  |  (download if needed) |
    |                  |                  |--Stage 7: Voice/Whisper|
    |                  |                  |--Stage 8: TTS/Kokoro  |
    |                  |                  |--Stage 9: Persistence |
    |                  |<--all_done(dict)-|                       |
    |--Stage 10: Fonts (main thread)      |                       |
    |--Stage 11: Complete                 |                       |
    |--close()-------->|                  |                       |
    |                                                             |
    |--exec_()-------------------------------------------------->|
    |                                     [user picks action]     |
    |<--ACTION_LIVE / ACTION_POST / ACTION_SETTINGS / ACTION_QUIT-|
    |                                                             |
    |--[loop: re-show launcher after each session ends]           |`}</code></pre>

      <h2>Design Patterns</h2>
      <p>
        The system uses established software design patterns for clean separation of concerns
        and maintainable inter-component communication.
      </p>

      <h3>Observer Pattern (Qt Signals/Slots)</h3>
      <p>
        The primary inter-component communication mechanism. All QThread workers emit typed
        signals that the UI thread connects to via slots, ensuring thread-safe communication
        without shared mutable state.
      </p>
      <ul>
        <li><code>AcTelemetryWorker.realtime_sample(dict)</code> &rarr; <code>MainWindow.handle_realtime_sample()</code></li>
        <li><code>AIRaceEngineerWorker.ai_commentary(str, str, int)</code> &rarr; <code>MainWindow.handle_ai_commentary()</code></li>
        <li><code>VoiceInputWorker.speech_detected(str)</code> &rarr; <code>AIRaceEngineerWorker.process_driver_query()</code></li>
        <li><code>TTSOutputWorker.playback_started()</code> &rarr; <code>VoiceInputWorker.pause()</code></li>
      </ul>
      <p>
        All signals are defined as class-level <code>QtCore.pyqtSignal()</code> declarations.
        Connection is performed in <code>main.py</code> during initialisation. This decouples
        components — workers have no reference to the UI, and the UI has no reference to
        workers beyond signal connections.
      </p>

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

      <h3>Producer-Consumer Pattern (Telemetry Queue)</h3>
      <p>
        The <code>AIRaceEngineerWorker</code> uses <code>asyncio.Queue(maxsize=5)</code> for
        telemetry processing. The telemetry thread produces samples (throttled to every 12th
        frame = ~5 Hz), and the AI worker's async event loop consumes them. The bounded queue
        provides natural backpressure — if the AI is busy generating a response, older samples
        are dropped rather than accumulating.
      </p>
      <p>
        A separate unbounded <code>query_queue</code> handles driver voice queries, ensuring no
        queries are lost even under load.
      </p>

      <h3>Strategy Pattern (Prompt Templates)</h3>
      <p>
        Prompt generation uses a registry of templates indexed by verbosity level, allowing
        the system to switch between ultra-brief radio messages and detailed analysis by
        changing a single configuration parameter.
      </p>
      <pre className="code-block"><code>{`# ai/race_engineer_core/prompts.py
PROACTIVE_PROMPTS = {
    "minimal": PROACTIVE_PROMPT_MINIMAL,
    "moderate": PROACTIVE_PROMPT_MODERATE,
    "verbose": PROACTIVE_PROMPT_VERBOSE,
}

def get_proactive_prompt(verbosity: str = "moderate") -> PromptTemplate:
    return PROACTIVE_PROMPTS.get(verbosity, PROACTIVE_PROMPT_MODERATE)`}</code></pre>

      <h3>Chain of Responsibility (Fallback Chain)</h3>
      <p>
        LLM response generation follows a priority fallback chain:
      </p>
      <ol>
        <li><strong>Local GGUF model</strong> (preferred) — generates response via llama-cpp-python</li>
        <li><strong>Rule-based fallback</strong> — deterministic template responses per event type</li>
        <li><strong>Guardrail override</strong> — if post-generation checks detect hallucination, substitute a safe fallback</li>
      </ol>
      <p>
        The same pattern applies to the fuel lookup (exact match &rarr; substring &rarr; Jaccard),
        TTS playback (winsound &rarr; PyAudio), and post-race coaching (LLM &rarr; retry with
        concise prompt &rarr; deterministic fallback).
      </p>

      <h3>Adapter Pattern (AIPipelineBridge)</h3>
      <p>
        <code>AIPipelineBridge</code> adapts between the post-race UI (<code>Session</code>/<code>Lap</code>{' '}
        objects) and the Jarvis Post LLM agents (which expect JSON payloads). It translates data
        formats, handles model availability checking, and falls back to heuristic analysis if
        the LLM is unavailable.
      </p>

      <h3>Template Method Pattern (Base Agent)</h3>
      <p>
        Post-race agents inherit from <code>BaseAgent</code> and implement
        an <code>analyse()</code> method. Each agent customises prompt construction, response
        parsing, and generation parameters while sharing the same interface.
      </p>
      <pre className="code-block"><code>{`class BaseAgent:
    async def analyse(self, session_data: dict) -> dict: ...

class RaceAnalysisAgent(BaseAgent):
    async def analyse(self, session_data: dict) -> dict: ...

class CoachingAgent(BaseAgent):
    async def analyse(self, session_data: dict) -> dict: ...`}</code></pre>

      <h3>Builder Pattern (Startup Loader)</h3>
      <p>
        The <code>StartupLoaderThread</code> progressively builds a results dictionary across 11
        stages, each adding component classes or availability flags. The
        final <code>all_done</code> signal passes this dictionary to <code>main.py</code>, which
        unpacks it into module-level variables. This avoids import-time failures and allows
        graceful degradation when optional components are unavailable.
      </p>

      <h2>Class Diagrams</h2>
      <p>
        Key class hierarchies showing inheritance relationships and composition.
      </p>

      <h3>Core QThread Workers</h3>
      <pre className="code-block"><code>{`QtCore.QThread
    |
    +-- AcTelemetryWorker
    |     Signals: lap_completed, status_update, session_info_update,
    |              live_data_update, realtime_sample, session_reset
    |     Uses: LapBuffer, ctypes.Structure (SPageFilePhysics,
    |            SPageFileGraphics, SPageFileStatic)
    |
    +-- AIRaceEngineerWorker
    |     Signals: ai_commentary, driver_query_received, status_update,
    |              processing_query
    |     Uses: TelemetryAgent, RaceEngineerAgent, LiveSessionContext,
    |            LocalLLMInference
    |
    +-- VoiceInputWorker
    |     Signals: speech_detected, vad_state_changed, status_update,
    |              error_occurred
    |     Uses: webrtcvad.Vad, faster_whisper.WhisperModel, pyaudio
    |
    +-- TTSOutputWorker
    |     Signals: status_update, error_occurred, playback_started,
    |              playback_finished
    |     Uses: KokoroTTSClient, pyaudio, asyncio.PriorityQueue
    |
    +-- SessionRecorder
    |     Signals: status_update, error_occurred, session_started
    |     Uses: sqlite3.Connection, threading.RLock
    |
    +-- StartupLoaderThread
          Signals: stage_update, all_done, fatal_error`}</code></pre>

      <h3>UI Class Hierarchy</h3>
      <pre className="code-block"><code>{`QMainWindow
    +-- MainWindow (live dashboard)
    |     Contains: TrackMapCanvas, TimeSeriesCanvas (x5),
    |               MultiLineCanvas, DeltaCanvas, QTableWidget,
    |               QTextEdit (comms transcript)
    |
    +-- LapViewerWindow (post-race viewer)
          Contains: TrackMapCanvas (post_race variant),
                    TimeSeriesCanvas (post_race variant),
                    TimelineController, AIPipelineBridge

QDialog
    +-- UnifiedLauncher (main menu)
    +-- LauncherWindow (settings)
    +-- SessionPickerDialog (session selection)

QWidget
    +-- LoadingScreen (startup splash)
    +-- StageRow (loading screen row)
    +-- PTTBindingWidget (PTT config UI)

QPushButton
    +-- KeyCaptureButton (keyboard key capture)
    +-- JoystickCaptureButton (joystick button capture)

FigureCanvas (matplotlib.backends.backend_qt5agg)
    +-- TrackMapCanvas (speed-colored track path)
    +-- TimeSeriesCanvas (single-line graph: speed, RPM, etc.)
    +-- MultiLineCanvas (4-line graph: tire temps by corner)
    +-- DeltaCanvas (delta-to-best visualization)`}</code></pre>

      <h3>AI Pipeline Classes</h3>
      <pre className="code-block"><code>{`TelemetryAgent
    Uses: ThresholdsConfig (Pydantic), TelemetryData (Pydantic)
    Produces: List[Event] (sorted by Priority enum)

RaceEngineerAgent
    Uses: LLMClient, PromptTemplate, LiveSessionContext
    Produces: str (radio message)

LLMClient
    Uses: LocalLLMInference (singleton)
    Fallback: rule-based response templates

LocalLLMInference
    Uses: llama_cpp.Llama (GGUF model)
    Pattern: Singleton (module-level _shared_instance)

LiveSessionContext
    Maintains: vehicle state, lap history, telemetry buffer (60s),
               conversation history (1 exchange), fuel tracking

KokoroTTSClient
    Uses: pykokoro.build_pipeline (ONNX backend)
    Produces: WAV bytes

PTTController (QObject)
    Uses: pynput.keyboard.Listener, pygame.joystick
    Signals: ptt_pressed, ptt_released, status_update`}</code></pre>

      <h3>Data Layer Classes</h3>
      <pre className="code-block"><code>{`Session
    Has: SessionMetadata (Pydantic)
    Has: List[Lap]
    Has: pd.DataFrame (full telemetry)
    Has: List[AIComment] (optional)
    Methods: get_lap(), get_fastest_lap(), calculate_consistency()

Lap
    Has: LapSummary (Pydantic)
    Has: pd.DataFrame (lap telemetry)
    Methods: get_speed_trace(), get_racing_line(), get_avg_tire_temps()

SessionRecorder (QThread)
    Uses: sqlite3.Connection
    Tables: sessions, laps, telemetry, ai_commentary, voice_queries

SessionExporter
    Uses: sqlite3 (reads), CSV/ZIP (writes)
    Methods: list_sessions(), export_session(), export_session_bundle(),
             import_session_bundle()

TelemetryLoader
    Uses: pd.read_csv, JSON
    Produces: Session (from CSV files)`}</code></pre>

      <h3>Pydantic Data Models</h3>
      <pre className="code-block"><code>{`pydantic.BaseModel
    +-- TireCorners (fl, fr, rl, rr: float)
    +-- SessionMetadata (session_id, game, track, car, player, times, laps)
    +-- LapSummary (lap_number, lap_time, fuel, speeds, valid)
    +-- AIComment (timestamp, message, trigger, priority, lap_number)
    +-- BrakePoint (distance, speed_before, speed_after, duration, pressure)
    +-- Corner (number, entry/apex/exit distance+speed, type)

    # AI Core Models (ai/race_engineer_core/telemetry.py)
    +-- TelemetryData (full telemetry snapshot with nested models)
    +-- TireTemps (fl, fr, rl, rr: float, >= 0)
    +-- TirePressure (fl, fr, rl, rr: float, >= 0)
    +-- TireWear (fl, fr, rl, rr: float, 0-100)
    +-- WheelSlip (fl, fr, rl, rr: float)
    +-- SuspensionTravel (fl, fr, rl, rr: float)
    +-- RideHeight (front, rear: float)
    +-- GForces (lateral, longitudinal: float)
    +-- OpponentSnapshot (car_index, position, lap_number, speed, track_position)

    # Threshold Configuration (ai/race_engineer_core/config.py)
    +-- ThresholdsConfig (all event detection thresholds with defaults)`}</code></pre>

      <h2>Data Storage</h2>
      <p>
        The application uses a single SQLite file (<code>data/telemetry_sessions.db</code>) for
        all persistent storage. SQLite was chosen for zero configuration (no server process, no
        credentials), portability (single file, easy to back up or share), adequate concurrency
        for single-writer with WAL mode, and performance (batch inserts handle 60 samples/second
        comfortably).
      </p>

      <h3>Entity-Relationship Diagram</h3>
      <pre className="code-block"><code>{`+==================+       +==================+       +===================+
|    sessions      |       |      laps        |       |    telemetry      |
+==================+       +==================+       +===================+
| PK session_id    |<------| FK session_id    |       | PK telemetry_id   |
|    start_time    |  1:N  | PK lap_id        |       | FK session_id     |----+
|    end_time      |       |    lap_number    |       |    lap_number     |    |
|    game          |       |    lap_time      |       |    elapsed_time   |    |
|    track_name    |       |    sector1_time  |       |    pos_x, pos_z   |    |
|    car_model     |       |    sector2_time  |       |    speed          |    |
|    player_name   |       |    sector3_time  |       |    gear, rpm      |    |
|    total_laps    |       |    valid         |       |    throttle, brake|    |
|    best_lap_time |       |    fuel_start    |       |    fuel           |    |
|    total_distance|       |    fuel_end      |       |    steer_angle    |    |
|    ai_enabled    |       |    avg_speed     |       |    g_force_lat/lon|    |
|    notes         |       |    max_speed     |       |    tyre_pressure  |    |
|    session_type  |       |    min_speed     |       |      _fl/fr/rl/rr |    |
+==================+       |    timestamp     |       |    tyre_temp      |    |
        |                  +==================+       |      _fl/fr/rl/rr |    |
        |                                             |    tyre_wear      |    |
        | 1:N                                         |      _fl/fr/rl/rr |    |
        |                                             |    wheel_slip     |    |
        v                                             |      _fl/fr/rl/rr |    |
+==================+       +===================+      |    suspension     |    |
| ai_commentary    |       |  voice_queries    |      |      _fl/fr/rl/rr |    |
+==================+       +===================+      |    camber         |    |
| PK commentary_id |       | PK query_id       |      |      _fl/fr/rl/rr |    |
| FK session_id    |----+  | FK session_id     |---+  |    ride_height    |    |
|    timestamp     |    |  |    timestamp       |   |  |      _front/rear |    |
|    message       |    |  |    query_text      |   |  |    car_damage    |    |
|    trigger       |    |  |    response_text   |   |  |      _front/rear/|    |
|    priority      |    |  |    lap_number      |   |  |      left/right/ |    |
|    lap_number    |    |  +===================+   |  |      centre      |    |
+==================+    |                          |  |    is_in_pit     |    |
                        +------ sessions.session_id|  |    pit_limiter   |    |
                               sessions.session_id-+  |    timestamp     |    |
                                                      +===================+    |
                                                             |                 |
                                                             +----- sessions --+
                                                              (FK session_id)`}</code></pre>
      <ul>
        <li><strong>sessions 1:N laps</strong> — Each session has many laps (FK: <code>laps.session_id</code>)</li>
        <li><strong>sessions 1:N telemetry</strong> — Each session has thousands of telemetry rows (FK: <code>telemetry.session_id</code>)</li>
        <li><strong>sessions 1:N ai_commentary</strong> — Each session has many AI messages (FK: <code>ai_commentary.session_id</code>)</li>
        <li><strong>sessions 1:N voice_queries</strong> — Each session has many voice Q&amp;A entries (FK: <code>voice_queries.session_id</code>)</li>
      </ul>

      <h3>Table Schemas</h3>

      <h4>sessions</h4>
      <table className="section-table">
        <thead>
          <tr>
            <th>Column</th>
            <th>Type</th>
            <th>Constraints</th>
            <th>Description</th>
          </tr>
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
          <tr>
            <th>Column</th>
            <th>Type</th>
            <th>Constraints</th>
            <th>Description</th>
          </tr>
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
          <tr>
            <th>Column</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>telemetry_id</td><td>INTEGER PK</td><td>Unique sample identifier</td></tr>
          <tr><td>session_id</td><td>INTEGER FK</td><td>Parent session</td></tr>
          <tr><td>lap_number</td><td>INTEGER</td><td>Lap number for this sample</td></tr>
          <tr><td>elapsed_time</td><td>REAL</td><td>Seconds since session start</td></tr>
          <tr><td>pos_x, pos_z</td><td>REAL</td><td>World position (metres)</td></tr>
          <tr><td>speed</td><td>REAL</td><td>Speed (km/h)</td></tr>
          <tr><td>gear</td><td>INTEGER</td><td>Gear (-1 to 8)</td></tr>
          <tr><td>rpm</td><td>INTEGER</td><td>Engine RPM</td></tr>
          <tr><td>throttle, brake</td><td>REAL</td><td>Input (0.0-1.0)</td></tr>
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
          <tr>
            <th>Column</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
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
          <tr>
            <th>Column</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
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
          <tr>
            <th>Table</th>
            <th>Write Rate</th>
            <th>Typical Session (20 laps, ~25 min)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>telemetry</td><td>~60 rows/sec (batched at 60)</td><td>~90,000 rows</td></tr>
          <tr><td>laps</td><td>1 row per lap</td><td>~20 rows</td></tr>
          <tr><td>ai_commentary</td><td>1-5 per lap</td><td>~40-100 rows</td></tr>
          <tr><td>voice_queries</td><td>0-3 per session</td><td>~0-3 rows</td></tr>
          <tr><td>sessions</td><td>1 per session</td><td>1 row</td></tr>
        </tbody>
      </table>

      <h3>Configuration Storage</h3>
      <p>
        User settings are stored in <code>config.json</code> (JSON file, not database):
      </p>
      <pre className="code-block"><code>{`{
  "voice_mode": "push_to_talk",
  "ptt_key": "v",
  "ptt_slot_1_type": "keyboard",
  "ptt_slot_1_value": "v",
  "ptt_slot_2_type": "joystick",
  "ptt_slot_2_value": "11",
  "use_local_llm": true,
  "local_model_path": "race_engineer_gguf/granite-race-engineer-Q4_K_M.gguf"
}`}</code></pre>

      <h3>Export Formats</h3>
      <p><strong>CSV Export</strong> (per session):</p>
      <ul>
        <li><code>session_X_telemetry.csv</code> — Full telemetry (all columns from telemetry table)</li>
        <li><code>session_X_laps.csv</code> — Lap summaries</li>
        <li><code>session_X_ai_commentary.csv</code> — AI messages (if present)</li>
        <li><code>session_X_metadata.json</code> — Session metadata</li>
      </ul>
      <p><strong>Bundle Export</strong> (<code>.jsession</code> file):</p>
      <ul>
        <li>ZIP archive containing all CSV files + metadata JSON</li>
        <li>Portable for sharing between installations</li>
        <li>Can be imported via <code>SessionExporter.import_session_bundle()</code></li>
      </ul>

      <h2>Packages and APIs</h2>

      <h3>External Dependencies</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Package</th>
            <th>Version</th>
            <th>Purpose</th>
            <th>Layer</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>PyQt5</strong></td><td>&ge; 5.15.0</td><td>UI framework, threading (QThread), signals/slots</td><td>UI</td></tr>
          <tr><td><strong>matplotlib</strong></td><td>&ge; 3.5.0</td><td>Telemetry graphs, track map (FigureCanvas, LineCollection)</td><td>UI</td></tr>
          <tr><td><strong>numpy</strong></td><td>&ge; 1.21.0</td><td>Array operations for telemetry data, audio processing</td><td>All</td></tr>
          <tr><td><strong>pandas</strong></td><td>(transitive)</td><td>DataFrame for telemetry storage and analysis</td><td>Data</td></tr>
          <tr><td><strong>pydantic</strong></td><td>&ge; 2.5.0</td><td>Data validation models (telemetry, config, session metadata)</td><td>AI, Data</td></tr>
          <tr><td><strong>llama-cpp-python</strong></td><td>&ge; 0.2.50</td><td>GGUF model inference (llama.cpp C++ bindings)</td><td>AI</td></tr>
          <tr><td><strong>huggingface-hub</strong></td><td>&ge; 0.23.0</td><td>Model auto-download from HF Hub</td><td>AI</td></tr>
          <tr><td><strong>hf_xet</strong></td><td>&ge; 1.1.0</td><td>Fast downloads from HF Hub (xet protocol)</td><td>AI</td></tr>
          <tr><td><strong>faster-whisper</strong></td><td>&ge; 1.0.0</td><td>Speech-to-text (CTranslate2 Whisper implementation)</td><td>Voice</td></tr>
          <tr><td><strong>webrtcvad</strong></td><td>&ge; 2.0.10</td><td>Voice Activity Detection (GMM-based)</td><td>Voice</td></tr>
          <tr><td><strong>pykokoro</strong></td><td>&ge; 0.6.5</td><td>Neural TTS synthesis (ONNX backend)</td><td>TTS</td></tr>
          <tr><td><strong>pyaudio</strong></td><td>&ge; 0.2.13</td><td>Audio capture (microphone) and playback</td><td>Voice, TTS</td></tr>
          <tr><td><strong>pynput</strong></td><td>&ge; 1.7.6</td><td>Global keyboard hooks for push-to-talk</td><td>Input</td></tr>
          <tr><td><strong>pygame</strong></td><td>&ge; 2.5.0</td><td>Joystick/racing wheel button detection</td><td>Input</td></tr>
          <tr><td><strong>tenacity</strong></td><td>&ge; 8.2.0</td><td>Retry logic for API calls</td><td>AI</td></tr>
          <tr><td><strong>python-dotenv</strong></td><td>&ge; 1.0.0</td><td>Environment variable loading from <code>.env</code></td><td>Config</td></tr>
          <tr><td><strong>sqlite3</strong></td><td>(stdlib)</td><td>Session recording database</td><td>Data</td></tr>
        </tbody>
      </table>

      <h3>Internal Module APIs</h3>

      <h4>Telemetry Backend API</h4>
      <pre className="code-block"><code>{`AcTelemetryWorker (QThread)
    Signals (outbound):
        realtime_sample(dict)       # Every frame (~60Hz)
        lap_completed(int, list, bool, int)  # Lap finished
        session_info_update(dict)   # Track/car/player metadata
        live_data_update(dict)      # Current speed/gear/fuel
        status_update(str)          # Status messages
        session_reset()             # AC restarted mid-session
    Methods:
        start()                     # Begin polling loop
        stop()                      # Signal shutdown`}</code></pre>

      <h4>AI Pipeline API</h4>
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

      <h4>Voice API</h4>
      <pre className="code-block"><code>{`VoiceInputWorker (QThread)
    Signals (outbound):
        speech_detected(str text)
        vad_state_changed(bool speaking)
        status_update(str) / error_occurred(str)
    Methods:
        start_recording() / stop_recording()  # PTT mode
        pause() / resume()                     # Echo prevention
        start() / stop()`}</code></pre>

      <h4>TTS API</h4>
      <pre className="code-block"><code>{`TTSOutputWorker (QThread)
    Signals (outbound):
        playback_started() / playback_finished()
        status_update(str) / error_occurred(str)
    Methods:
        speak(str text, int priority)  # Queue message for synthesis
        start() / stop()`}</code></pre>

      <h4>Data Layer API</h4>
      <pre className="code-block"><code>{`SessionRecorder (QThread)
    Methods:
        start_session(game, track, car, player, session_type)
        end_session()
        record_telemetry_sample(dict sample)
        record_lap(lap_number, lap_time, fuel_start, fuel_end, ...)
        record_ai_commentary(message, trigger, priority, lap_number)
        record_voice_query(query_text, response_text, lap_number)
        start() / stop()

SessionExporter
    Methods:
        list_sessions() -> List[dict]
        export_session(session_id) -> str (path)
        export_session_bundle(session_id, file_path)
        import_session_bundle(file_path) -> int (session_id)
        delete_session(session_id)
        rename_session(session_id, new_name)

TelemetryLoader
    Static Methods:
        load_session(path) -> Session`}</code></pre>

      <h3>Assetto Corsa Shared Memory</h3>
      <p>
        The telemetry backend interfaces with Assetto Corsa via three Windows shared memory
        blocks, mapped using Python <code>ctypes.Structure</code>:
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Memory Block</th>
            <th>Structure</th>
            <th>Access Pattern</th>
            <th>Key Fields</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>acpmf_static</code></td>
            <td><code>SPageFileStatic</code></td>
            <td>Read once at startup</td>
            <td>carModel, track, playerName, maxRpm, maxFuel</td>
          </tr>
          <tr>
            <td><code>acpmf_physics</code></td>
            <td><code>SPageFilePhysics</code></td>
            <td>Polled at 60 Hz</td>
            <td>speedKmh, rpms, gas, brake, fuel, wheelsPressure[4], tyreCoreTemperature[4], carDamage[5]</td>
          </tr>
          <tr>
            <td><code>acpmf_graphics</code></td>
            <td><code>SPageFileGraphics</code></td>
            <td>Polled at 60 Hz</td>
            <td>completedLaps, position, currentTimeMs, lastTimeMs, carCoordinates[3], isInPit</td>
          </tr>
        </tbody>
      </table>
      <p>
        Shared memory is opened via <code>mmap.mmap(-1, size, tagname=name)</code> on Windows.
        The same user context is required (the Python process and AC must run under the same
        Windows user).
      </p>

      <h2>Thread Model</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>Thread</th>
            <th>Type</th>
            <th>Lifetime</th>
            <th>Frequency</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Main (UI) thread</td>
            <td>Qt event loop</td>
            <td>Application lifetime</td>
            <td>Event-driven</td>
            <td>All UI rendering, signal dispatch</td>
          </tr>
          <tr>
            <td>AcTelemetryWorker</td>
            <td>QThread</td>
            <td>Session lifetime</td>
            <td>~60 Hz poll</td>
            <td>Read shared memory, emit samples</td>
          </tr>
          <tr>
            <td>AIRaceEngineerWorker</td>
            <td>QThread + asyncio</td>
            <td>Session lifetime</td>
            <td>~5 Hz (throttled)</td>
            <td>Event detection + LLM inference</td>
          </tr>
          <tr>
            <td>VoiceInputWorker</td>
            <td>QThread</td>
            <td>Session lifetime</td>
            <td>~33 Hz (30ms frames)</td>
            <td>Audio capture + VAD + Whisper STT</td>
          </tr>
          <tr>
            <td>TTSOutputWorker</td>
            <td>QThread + asyncio</td>
            <td>Session lifetime</td>
            <td>On-demand</td>
            <td>Kokoro synthesis + audio playback</td>
          </tr>
          <tr>
            <td>SessionRecorder</td>
            <td>QThread</td>
            <td>Session lifetime</td>
            <td>1 Hz flush</td>
            <td>Batch SQLite writes</td>
          </tr>
          <tr>
            <td>StartupLoaderThread</td>
            <td>QThread</td>
            <td>~5-30 seconds</td>
            <td>One-shot</td>
            <td>Module imports + model downloads</td>
          </tr>
          <tr>
            <td>PTTController</td>
            <td>QObject (timers)</td>
            <td>Session lifetime</td>
            <td>60 Hz (joystick poll)</td>
            <td>Input device monitoring</td>
          </tr>
        </tbody>
      </table>
      <p>
        All inter-thread communication uses Qt signals (thread-safe, queued connections)
        or <code>asyncio.Queue</code> (for the AI worker's internal async loop). No raw shared
        mutable state is used between threads.
      </p>

      <h2>Fine-Tuning Pipeline (F1 Fine-Tuning)</h2>
      <p>
        In addition to prompt engineering, we maintain a separate fine-tuning pipeline to adapt an
        instruct LLM to Formula 1 telemetry + team radio style outputs. This work lives in the
        <a href="https://github.com/athena-c-22/f1-fine-tuning" target="_blank" rel="noreferrer"> f1-fine-tuning</a> repository.
      </p>

      <h3>Architecture (Offline Training)</h3>
      <ul>
        <li><strong>OpenF1 data fetch</strong>: Pull race telemetry + radio metadata windows used as training inputs.</li>
        <li><strong>Dataset builders</strong>: Generate JSONL prompt/completion pairs for specific tasks (race engineer advice, post-race analyst reports).</li>
        <li><strong>Filtering</strong>: Remove low-quality entries (gibberish, non-English, non-technical chatter) before training.</li>
        <li><strong>QLoRA fine-tuning</strong>: Parameter-efficient tuning of an instruct model (e.g., IBM Granite) with 4-bit quantisation.</li>
        <li><strong>Inference</strong>: Load the fine-tuned adapter and generate responses for new telemetry windows.</li>
      </ul>

      <h3>Sequence (Build → Filter → Train → Infer)</h3>
      <ol>
        <li>Build raw dataset JSONL from telemetry + radio windows.</li>
        <li>Filter the dataset to improve label quality and reduce noise.</li>
        <li>Fine-tune the base model with QLoRA and save adapter weights.</li>
        <li>Run inference using the base model + adapter to generate advice/analysis.</li>
      </ol>

      <h3>Data Format (JSONL “Schema”)</h3>
      <p>
        The fine-tuning pipeline is file-based (JSONL), not database-driven. Each line is a single
        training example.
      </p>
      <ul>
        <li><strong>Race engineer dataset</strong>: <code>{"{ \"prompt\": \"Telemetry: ... Advice:\", \"completion\": \"Box this lap...\" }"}</code></li>
        <li><strong>Analyst dataset</strong>: <code>{"{ \"input\": \"{...telemetry JSON...}\", \"output\": \"Race debrief...\", \"metadata\": { \"year\": 2024, \"grand_prix\": \"Monaco\", ... } }"}</code></li>
      </ul>

      <h2>References</h2>
      <ol className="ref-list">
        <li>
          Gamma, E., Helm, R., Johnson, R. and Vlissides, J. (1994) <em>Design Patterns: Elements of Reusable Object-Oriented Software</em>. Reading, MA: Addison-Wesley.
        </li>
        <li>
          Gerganov, G. (2023) <em>llama.cpp: Inference of Meta's LLaMA model in pure C/C++</em>.{' '}
          <a href="https://github.com/ggerganov/llama.cpp" target="_blank" rel="noopener noreferrer">
            https://github.com/ggerganov/llama.cpp
          </a>
        </li>
        <li>
          Google (2011) <em>WebRTC: Real-Time Communication for the Web</em>.{' '}
          <a href="https://webrtc.org/" target="_blank" rel="noopener noreferrer">
            https://webrtc.org/
          </a>
        </li>
        <li>
          Hexgrad (2024) <em>Kokoro: Lightweight Neural Text-to-Speech</em>.{' '}
          <a href="https://github.com/hexgrad/kokoro" target="_blank" rel="noopener noreferrer">
            https://github.com/hexgrad/kokoro
          </a>
        </li>
        <li>
          Hunter, J.D. (2007) 'Matplotlib: A 2D Graphics Environment', <em>Computing in Science &amp; Engineering</em>, 9(3), pp. 90-95.
        </li>
        <li>
          Klein, G. (2020) <em>CTranslate2: Fast Inference Engine for Transformer Models</em>.{' '}
          <a href="https://github.com/OpenNMT/CTranslate2" target="_blank" rel="noopener noreferrer">
            https://github.com/OpenNMT/CTranslate2
          </a>
        </li>
        <li>
          Kunz, T. (2020) <em>Assetto Corsa Shared Memory Reference</em>.{' '}
          <a href="https://assettocorsamods.net/threads/doc-shared-memory-reference.58/" target="_blank" rel="noopener noreferrer">
            https://assettocorsamods.net/threads/doc-shared-memory-reference.58/
          </a>
        </li>
        <li>
          Mishra, M. <em>et al.</em> (2024) 'Granite Code Models: A Family of Open Foundation Models for Code Intelligence', <em>arXiv preprint arXiv:2405.04324</em>.
        </li>
        <li>
          ONNX Runtime developers (2019) <em>ONNX Runtime: Cross-Platform, High Performance ML Inferencing and Training Accelerator</em>.{' '}
          <a href="https://onnxruntime.ai/" target="_blank" rel="noopener noreferrer">
            https://onnxruntime.ai/
          </a>
        </li>
        <li>
          Radford, A., Kim, J.W., Xu, T., Brockman, G., McLeavey, C. and Sutskever, I. (2023) 'Robust Speech Recognition via Large-Scale Weak Supervision', in <em>Proceedings of the International Conference on Machine Learning (ICML)</em>, pp. 28492-28518.
        </li>
        <li>
          Riverbank Computing (2023) <em>PyQt5 Reference Guide</em>.{' '}
          <a href="https://www.riverbankcomputing.com/static/Docs/PyQt5/" target="_blank" rel="noopener noreferrer">
            https://www.riverbankcomputing.com/static/Docs/PyQt5/
          </a>
        </li>
        <li>
          Samuel, S. (2020) <em>pydantic: Data Validation Using Python Type Annotations</em>.{' '}
          <a href="https://docs.pydantic.dev/" target="_blank" rel="noopener noreferrer">
            https://docs.pydantic.dev/
          </a>
        </li>
        <li>
          SQLite Consortium (2000) <em>SQLite: A Self-Contained, Serverless, Zero-Configuration, Transactional SQL Database Engine</em>.{' '}
          <a href="https://www.sqlite.org/" target="_blank" rel="noopener noreferrer">
            https://www.sqlite.org/
          </a>
        </li>
        <li>
          The Qt Company (2023) <em>Signals &amp; Slots</em>, Qt Documentation.{' '}
          <a href="https://doc.qt.io/qt-5/signalsandslots.html" target="_blank" rel="noopener noreferrer">
            https://doc.qt.io/qt-5/signalsandslots.html
          </a>
        </li>
      </ol>
      </>)}

      {activeTab === 'VR' && (
        <p style={{ color: '#555', fontStyle: 'italic' }}>VR content coming soon.</p>
      )}
    </SectionPage>
  );
}

export default SystemDesign;
