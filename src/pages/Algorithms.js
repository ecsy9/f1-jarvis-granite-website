import { useState } from 'react';
import SectionPage from '../components/SectionPage';
import './Algorithms.css';

const TABS = ['Fine Tuning', 'Telemetry Data', 'AI Pipeline'];

function Algorithms() {
  const [activeTab, setActiveTab] = useState('Fine Tuning');

  return (
    <SectionPage title="Algorithms">
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

      {activeTab === 'Telemetry Data' && (<>
      <p>
        This section covers the telemetry data pipeline: data gathering from Assetto Corsa's
        shared memory, how raw values are cleaned and normalised before use, the algorithms
        for fuel estimation and event detection, and experimental results. AI model fine-tuning
        and LLM inference are covered in the other tabs.
      </p>

      <h2>Data Acquisition</h2>
      <p>
        The system reads Assetto Corsa's Windows shared memory interface, which exposes three
        memory-mapped structs updated by the game engine at approximately 60 Hz. All three are
        polled every ~16.67 ms in a single tight loop.
      </p>
      <table className="section-table">
        <thead>
          <tr><th>Memory Block</th><th>Struct Name</th><th>Update Rate</th><th>Field Count</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Physics</strong></td><td><code>acpmf_physics</code></td><td>~60 Hz</td><td>52+</td></tr>
          <tr><td><strong>Graphics</strong></td><td><code>acpmf_graphics</code></td><td>~60 Hz</td><td>~20</td></tr>
          <tr><td><strong>Static</strong></td><td><code>acpmf_static</code></td><td>Session start only</td><td>~15</td></tr>
        </tbody>
      </table>
      <p>
        For a typical 10-lap session at Monza (~1:50 per lap) this produces:
      </p>
      <ul>
        <li>~66,000 telemetry samples (18.3 minutes &times; 60 Hz)</li>
        <li>~52 features per sample</li>
        <li>~3.4 million individual data points</li>
      </ul>

      <h3>Physics Block (<code>acpmf_physics</code>)</h3>
      <p>Updated at ~60 Hz. Contains all live vehicle dynamics, tyre state, and damage values.</p>
      <table className="section-table">
        <thead>
          <tr><th>Field</th><th>Type</th><th>Unit</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>speedKmh</code></td><td>float</td><td>km/h</td><td>Vehicle speed</td></tr>
          <tr><td><code>rpms</code></td><td>int</td><td>RPM</td><td>Engine revolutions per minute</td></tr>
          <tr><td><code>gas</code></td><td>float</td><td>0.0–1.0</td><td>Throttle pedal position</td></tr>
          <tr><td><code>brake</code></td><td>float</td><td>0.0–1.0</td><td>Brake pedal position</td></tr>
          <tr><td><code>fuel</code></td><td>float</td><td>litres</td><td>Remaining fuel</td></tr>
          <tr><td><code>gear</code></td><td>int</td><td>—</td><td>Raw gear index (0=R, 1=N, 2=1st, …) — remapped in preprocessing</td></tr>
          <tr><td><code>steerAngle</code></td><td>float</td><td>radians</td><td>Steering wheel angle</td></tr>
          <tr><td><code>tyreTemp[4]</code></td><td>float[4]</td><td>°C</td><td>Core tyre temperature per wheel (FL, FR, RL, RR)</td></tr>
          <tr><td><code>tyrePressure[4]</code></td><td>float[4]</td><td>PSI</td><td>Tyre pressure per wheel</td></tr>
          <tr><td><code>tyreWear[4]</code></td><td>float[4]</td><td>0.0–1.0</td><td>Tyre wear fraction per wheel</td></tr>
          <tr><td><code>wheelSlip[4]</code></td><td>float[4]</td><td>—</td><td>Wheel slip ratio per tyre</td></tr>
          <tr><td><code>camberRAD[4]</code></td><td>float[4]</td><td>radians</td><td>Camber angle per wheel — converted to degrees in preprocessing</td></tr>
          <tr><td><code>suspensionTravel[4]</code></td><td>float[4]</td><td>metres</td><td>Suspension travel per corner — converted to mm in preprocessing</td></tr>
          <tr><td><code>rideHeight[2]</code></td><td>float[2]</td><td>metres</td><td>Front/rear ride height</td></tr>
          <tr><td><code>carDamage[5]</code></td><td>float[5]</td><td>%</td><td>Damage per zone (front / rear / left / right / centre)</td></tr>
          <tr><td><code>accG[3]</code></td><td>float[3]</td><td>g</td><td>Lateral, longitudinal, vertical G-force</td></tr>
          <tr><td><code>drs</code></td><td>int</td><td>0/1</td><td>DRS active flag</td></tr>
          <tr><td><code>tc</code></td><td>float</td><td>0.0–1.0</td><td>Traction control intervention level</td></tr>
          <tr><td><code>heading</code></td><td>float</td><td>radians</td><td>Vehicle heading angle</td></tr>
          <tr><td><code>velocity[3]</code></td><td>float[3]</td><td>m/s</td><td>Velocity vector (X, Y, Z)</td></tr>
        </tbody>
      </table>

      <h3>Graphics Block (<code>acpmf_graphics</code>)</h3>
      <p>Updated at ~60 Hz. Contains session state, lap counters, position, and car coordinates.</p>
      <table className="section-table">
        <thead>
          <tr><th>Field</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>status</code></td><td>int</td><td>Session status (0=OFF, 1=REPLAY, 2=LIVE, 3=PAUSE)</td></tr>
          <tr><td><code>session</code></td><td>int</td><td>Session type (practice, qualifying, race)</td></tr>
          <tr><td><code>completedLaps</code></td><td>int</td><td>Laps completed this session — monitored for lap detection</td></tr>
          <tr><td><code>position</code></td><td>int</td><td>Current race position</td></tr>
          <tr><td><code>iCurrentTime</code></td><td>int</td><td>Current lap time (ms)</td></tr>
          <tr><td><code>iLastTime</code></td><td>int</td><td>Last completed lap time (ms) — used as ground truth for lap accuracy</td></tr>
          <tr><td><code>iBestTime</code></td><td>int</td><td>Best lap time (ms)</td></tr>
          <tr><td><code>sessionTimeLeft</code></td><td>float</td><td>Remaining session time (seconds)</td></tr>
          <tr><td><code>distanceTraveled</code></td><td>float</td><td>Total distance travelled (metres)</td></tr>
          <tr><td><code>isInPit</code></td><td>int</td><td>Pit lane flag (0/1)</td></tr>
          <tr><td><code>currentSectorIndex</code></td><td>int</td><td>Current track sector (0-based)</td></tr>
          <tr><td><code>lastSectorTime</code></td><td>int</td><td>Last sector time (ms)</td></tr>
          <tr><td><code>carCoordinates[3]</code></td><td>float[3]</td><td>World position (X, Y, Z) — validated in preprocessing</td></tr>
          <tr><td><code>tyreCompound</code></td><td>wchar[33]</td><td>Active tyre compound name</td></tr>
          <tr><td><code>numberOfLaps</code></td><td>int</td><td>Total scheduled laps</td></tr>
        </tbody>
      </table>

      <h3>Static Block (<code>acpmf_static</code>)</h3>
      <p>Written once at session start. Contains car, track, and configuration metadata used to initialise fuel lookup and thresholds.</p>
      <table className="section-table">
        <thead>
          <tr><th>Field</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>carModel</code></td><td>wchar[33]</td><td>Player car identifier — key for fuel lookup table</td></tr>
          <tr><td><code>track</code></td><td>wchar[33]</td><td>Track identifier — key for track scale factor lookup</td></tr>
          <tr><td><code>playerName</code></td><td>wchar[33]</td><td>Player display name</td></tr>
          <tr><td><code>playerNick</code></td><td>wchar[33]</td><td>Player nickname</td></tr>
          <tr><td><code>sectorCount</code></td><td>int</td><td>Number of track sectors</td></tr>
          <tr><td><code>maxRpm</code></td><td>int</td><td>Redline RPM</td></tr>
          <tr><td><code>maxFuel</code></td><td>float</td><td>Fuel tank capacity (litres)</td></tr>
          <tr><td><code>maxTorque</code></td><td>float</td><td>Peak engine torque (Nm)</td></tr>
          <tr><td><code>maxPower</code></td><td>float</td><td>Peak engine power (W)</td></tr>
          <tr><td><code>suspensionMaxTravel[4]</code></td><td>float[4]</td><td>Max suspension travel per corner (m)</td></tr>
          <tr><td><code>tyreRadius[4]</code></td><td>float[4]</td><td>Tyre radius per wheel (m)</td></tr>
          <tr><td><code>maxTurboBoost</code></td><td>float</td><td>Maximum turbo boost pressure (bar)</td></tr>
          <tr><td><code>smVersion</code></td><td>wchar[15]</td><td>Shared memory version string</td></tr>
          <tr><td><code>acVersion</code></td><td>wchar[15]</td><td>Game version string</td></tr>
          <tr><td><code>numCars</code></td><td>int</td><td>Number of cars in session</td></tr>
        </tbody>
      </table>

      <h2>Data Preprocessing</h2>
      <p>
        Raw shared memory values cannot be used directly — the game engine reports some fields in
        unconventional units, uses offset gear indices, and can emit garbage values during
        initialisation or loading screens. Every sample passes through the following pipeline
        before reaching any algorithm or storage layer:
      </p>

      <h3>Validity Checks and Filtering</h3>
      <p>Samples that fail any check are discarded entirely and never written to the database.</p>
      <table className="section-table">
        <thead>
          <tr><th>Check</th><th>Condition</th><th>Action</th><th>Reason</th></tr>
        </thead>
        <tbody>
          <tr><td>Warmup filter</td><td>First 60 frames after LIVE status</td><td>Discard sample</td><td>Memory uninitialised at session start produces garbage floats</td></tr>
          <tr><td>Status gate</td><td>Status &ne; LIVE</td><td>Pause processing</td><td>Replay and pause frames contain non-representative values</td></tr>
          <tr><td>Position validation</td><td><code>|x| &gt; 100,000</code> or <code>|z| &gt; 100,000</code></td><td>Reject sample</td><td>Physically impossible world coordinates indicate uninitialised memory</td></tr>
          <tr><td>Speed upper bound</td><td>Speed &gt; 500 km/h</td><td>Reject sample</td><td>No AC car can exceed this; indicates a corrupted read</td></tr>
          <tr><td>Stale detection</td><td>10 consecutive OFF frames (~167 ms)</td><td>Trigger session end</td><td>Game exited or loading; continued processing would log stale data</td></tr>
        </tbody>
      </table>

      <h3>Field Normalisation</h3>
      <p>Surviving samples are transformed to consistent units and conventions before being passed downstream.</p>
      <ol>
        <li>
          <strong>Speed dead zone</strong>: Speeds below 1.0 km/h are zeroed.
          The game occasionally returns tiny non-zero values when stationary due to physics solver jitter.
        </li>
        <li>
          <strong>Gear mapping</strong>: Raw gear index adjusted by <code>gear − 1</code>.
          AC reports <code>0 = reverse</code>, <code>1 = neutral</code>, <code>2 = 1st gear</code>, and so on.
          After mapping: <code>−1 = reverse</code>, <code>0 = neutral</code>, <code>1 = 1st gear</code> — matching
          conventional motorsport notation.
        </li>
        <li>
          <strong>Throttle and brake</strong>: Converted from normalised 0.0–1.0 floats to percentage (&times;100)
          for human-readable display and LLM prompt injection.
        </li>
        <li>
          <strong>Camber</strong>: Converted from radians to degrees via <code>np.degrees()</code>.
          The raw radian values are not intuitive for race engineers; degrees are the standard unit in setup sheets.
        </li>
        <li>
          <strong>Suspension travel</strong>: Converted from metres to millimetres (&times;1000).
          Typical travel values are in the range 0–100 mm; storing as metres would give values like 0.042.
        </li>
        <li>
          <strong>Pydantic validation</strong>: Normalised dicts are passed into strongly-typed Pydantic
          models (<code>TelemetryData</code>, <code>TireTemps</code>, <code>TirePressure</code>, <code>GForces</code>)
          with field-level constraints — e.g., <code>speed &ge; 0</code>, throttle clamped to <code>[0, 1]</code>.
          Any field that violates its constraint raises a validation error and the sample is logged but discarded.
        </li>
        <li>
          <strong>Post-race downsampling</strong>: For the post-race viewer, telemetry is downsampled from
          60 Hz to 20 Hz using time-bucket deduplication (bucket width 0.05 s). This reduces the render
          dataset by ~67% while preserving temporal fidelity for lap chart visualisation.
        </li>
      </ol>

      <h3>Training and Testing Sets</h3>
      <p>
        The rule-based detection system does not require training data — thresholds were calibrated
        empirically from Assetto Corsa's known tyre model ranges (core temperature operating window
        80–100 &#176;C, critical above 110 &#176;C) and fuel consumption patterns observed across
        multiple track/car combinations. The fuel lookup table values were derived from
        community-documented consumption figures and verified against in-game measurements. The LLM
        fine-tuning uses separate datasets from OpenF1 API and FastF1 (see the Fine Tuning tab).
      </p>

      <h2>Algorithms</h2>

      <h3>Fuel Consumption Estimation</h3>
      <p>
        Accurate fuel-laps-remaining estimation is critical for pit strategy. A two-phase approach
        handles the cold-start problem: before the first lap completes there is no measured
        consumption data, so the system bootstraps from a datasheet lookup table and switches to
        live telemetry once lap 1 is confirmed.
      </p>

      <h4>Phase 1 — Datasheet Lookup (Before First Lap)</h4>
      <p>
        <code>fuel_consumption_per_lap</code> is estimated from a pre-populated lookup table using
        the formula:
      </p>
      <pre className="code-block"><code>
{`fuel_per_lap = car.base_fuel_per_lap
             × track.fuel_scale_factor
             × (track.length_km / 5.0)`}
      </code></pre>
      <p>where <code>track.length_km / 5.0</code> normalises the track length to a 5 km baseline.</p>
      <p>Sample car lookup table (8 entries from internal dataset):</p>
      <table className="section-table">
        <thead>
          <tr><th>Car Model</th><th>Base Fuel/Lap (L)</th><th>Category</th></tr>
        </thead>
        <tbody>
          <tr><td>Ferrari 458 Italia</td><td>3.2</td><td>GT2</td></tr>
          <tr><td>BMW M3 GT2</td><td>3.5</td><td>GT2</td></tr>
          <tr><td>Lotus Exos 125 S1</td><td>1.8</td><td>Formula</td></tr>
          <tr><td>Lamborghini Huracán GT3</td><td>3.8</td><td>GT3</td></tr>
          <tr><td>Abarth 500</td><td>1.4</td><td>Road</td></tr>
          <tr><td>KTM X-Bow R</td><td>2.1</td><td>Track</td></tr>
          <tr><td>McLaren MP4-12C GT3</td><td>3.6</td><td>GT3</td></tr>
          <tr><td>Audi R8 LMS</td><td>3.7</td><td>GT3</td></tr>
        </tbody>
      </table>
      <p>Sample track scale factor table (6 entries):</p>
      <table className="section-table">
        <thead>
          <tr><th>Track</th><th>Length (km)</th><th>Scale Factor</th></tr>
        </thead>
        <tbody>
          <tr><td>Monza</td><td>5.79</td><td>1.00</td></tr>
          <tr><td>Spa-Francorchamps</td><td>7.00</td><td>1.15</td></tr>
          <tr><td>Mugello</td><td>5.25</td><td>0.98</td></tr>
          <tr><td>Nürburgring GP</td><td>5.15</td><td>1.05</td></tr>
          <tr><td>Silverstone GP</td><td>5.89</td><td>1.02</td></tr>
          <tr><td>Brands Hatch</td><td>3.91</td><td>0.95</td></tr>
        </tbody>
      </table>
      <p>
        Example: Ferrari 458 at Spa → <code>3.2 × 1.15 × (7.00 / 5.0) = 5.15 L/lap</code>.
        Unrecognised car/track combinations fall back to a global default of <strong>3.0 L/lap</strong>.
      </p>

      <h4>Phase 2 — Telemetry-Based (After First Lap)</h4>
      <p>
        Once the first lap completes, actual fuel consumption replaces the datasheet estimate and
        is recalculated at every subsequent lap boundary:
      </p>
      <pre className="code-block"><code>
{`fuel_per_lap = fuel_at_lap_start - fuel_at_lap_end
laps_remaining = fuel_remaining / fuel_per_lap`}
      </code></pre>
      <p>Warning thresholds applied after each recalculation:</p>
      <table className="section-table">
        <thead>
          <tr><th>Condition</th><th>Priority</th><th>Cooldown</th></tr>
        </thead>
        <tbody>
          <tr><td>Laps remaining &le; 5</td><td>HIGH</td><td>60 s</td></tr>
          <tr><td>Laps remaining &le; 2</td><td>CRITICAL</td><td>45 s</td></tr>
        </tbody>
      </table>

      <h3>Rule-Based Event Detection</h3>
      <p>
        The core detection algorithm is a threshold-and-cooldown finite state machine
        (<code>TelemetryAgent</code>) that processes telemetry snapshots in under 50 ms. Each rule
        compares a live telemetry value against a configured threshold, checks whether a cooldown
        timer has expired (to suppress duplicate alerts), and emits a prioritised event if both
        conditions are met. Events are assigned one of four priority levels using an integer enum
        compatible with Python's <code>heapq</code> min-heap: CRITICAL (0), HIGH (1), MEDIUM (2),
        and LOW (3) [1]. The orchestrator dequeues events in priority order and forwards them to the
        LLM agent for natural-language response generation.
      </p>
      <p>Ten independent detection rules run on every telemetry snapshot:</p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Rule</th><th>Metric</th><th>Warning Threshold</th><th>Critical Threshold</th><th>Cooldown</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Fuel Warning</td><td>Estimated laps remaining</td><td>&le; 5 laps</td><td>&le; 2 laps</td><td>60s / 45s</td></tr>
          <tr><td>Tire Temperature</td><td>Per-tire core temp (&#176;C)</td><td>&ge; 100 &#176;C</td><td>&ge; 110 &#176;C</td><td>—</td></tr>
          <tr><td>Tire Wear</td><td>Per-tire wear (%)</td><td>&ge; 70%</td><td>&ge; 85%</td><td>—</td></tr>
          <tr><td>Wheel Slip</td><td>Per-tire slip ratio</td><td>&ge; 50.0</td><td>&ge; 100.0</td><td>—</td></tr>
          <tr><td>Gap Change</td><td>Delta in gap (seconds)</td><td>&ge; 1.0s change</td><td>—</td><td>—</td></tr>
          <tr><td>Opponent Close Behind</td><td>Gap behind (seconds)</td><td>&le; 0.8s (activate)</td><td>—</td><td>15s</td></tr>
          <tr><td>Car Damage</td><td>Summed 5-zone damage</td><td>&ge; 5.0% total</td><td>&ge; 20.0% total</td><td>20s</td></tr>
          <tr><td>Position Change</td><td>Race position delta</td><td>Any change</td><td>—</td><td>5s</td></tr>
          <tr><td>Lap Completion</td><td>Lap counter increment</td><td>On increment</td><td>—</td><td>—</td></tr>
          <tr><td>Pit Window</td><td>Fuel or wear thresholds</td><td>Fuel &le; 5 laps OR wear &ge; 70%</td><td>—</td><td>—</td></tr>
        </tbody>
      </table>
      <p>
        The opponent-close-behind rule uses hysteresis to avoid flickering: the alert activates
        when <code>gap_behind &le; 0.8s</code> and only deactivates when{' '}
        <code>gap_behind &ge; 1.2s</code> [2]. Without the hysteresis band the alert flickered
        4–6 times per close-following event; with the 0.4s band it fires once and holds.
      </p>

      <h3>Sliding-Window Telemetry Buffering</h3>
      <p>
        A 60-second rolling window (Python <code>deque</code> with <code>maxlen=600</code> at
        10 Hz effective rate) maintains recent telemetry history for context injection into LLM
        prompts. The bounded buffer gives O(1) append and automatic eviction of stale data,
        keeping memory usage constant regardless of session length.
      </p>

      <h3>Lap Detection via Frame-Stabilised Counter</h3>
      <p>
        Lap boundaries are detected by monitoring the <code>completedLaps</code> counter in the
        Graphics block. To guard against transient counter glitches, the system requires{' '}
        <strong>10 consecutive stable frames</strong> (~167 ms at 60 Hz) before accepting a lap
        transition. If the counter reverts within this window the transition is discarded. On
        confirmed transition, <code>LapBuffer</code> fires its <code>on_lap_complete</code>{' '}
        callback with the full list of buffered samples for that lap.
      </p>

      <h3>Statistical Fallback Analysis</h3>
      <p>
        When the LLM is unavailable, a pure data-driven fallback generates analysis from recorded
        telemetry. For each numeric column in the telemetry DataFrame the system computes summary
        statistics (first, last, mean, min, max) and formats them into a structured text report.
        Session consistency is calculated as:{' '}
        <code>CoV = standard_deviation(lap_times) / mean(lap_times)</code>, providing a
        quantitative measure of driver consistency without any AI model.
      </p>

      <h2>Experiments</h2>

      <h3>Experiment Design</h3>
      <p>Four aspects of the data pipeline were evaluated:</p>
      <ol>
        <li><strong>Event Detection Latency</strong>: Wall-clock time of <code>TelemetryAgent.detect_events()</code> across 10,000 consecutive snapshots to verify the &lt;50ms budget.</li>
        <li><strong>Database Write Throughput</strong>: Batch insert performance of the <code>SessionRecorder</code> at 60 Hz sustained input to ensure no sample loss.</li>
        <li><strong>Lap Detection Accuracy</strong>: Detected lap boundaries compared against AC's authoritative <code>lastTimeMs</code> values across multi-lap sessions.</li>
        <li><strong>Fuel Estimation Accuracy</strong>: Phase 1 datasheet estimates compared against Phase 2 measured consumption across multiple car/track combinations.</li>
      </ol>

      <h3>Performance Evaluation Method</h3>
      <ul>
        <li><strong>Event Detection Latency</strong>: Mean and P99 wall-clock time per <code>detect_events()</code> call (ms).</li>
        <li><strong>Database Throughput</strong>: Sustained write rate (samples/s) vs. required rate (60 samples/s), measured over 10-minute sessions.</li>
        <li><strong>Lap Timing Accuracy</strong>: Absolute error = <code>|detected_lap_time &minus; game_authoritative_time|</code> in ms, averaged across all detected laps.</li>
        <li><strong>Visualisation Frame Rate</strong>: UI update rate (Hz) during live sessions to verify the 12 Hz target.</li>
        <li><strong>Fuel Estimation Error</strong>: Relative error = <code>|(datasheet_estimate &minus; measured) / measured|</code> expressed as a percentage.</li>
      </ul>

      <h3>Experiment Results</h3>
      <table className="section-table">
        <thead>
          <tr><th>Metric</th><th>Target</th><th>Measured</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td>Event detection latency (mean)</td><td>&lt; 50 ms</td><td>~2 ms</td><td>✓ Pass</td></tr>
          <tr><td>Event detection latency (P99)</td><td>&lt; 50 ms</td><td>~8 ms</td><td>✓ Pass</td></tr>
          <tr><td>DB write throughput</td><td>&ge; 60 samples/s</td><td>~3,600 samples/s (batch-60)</td><td>✓ Pass</td></tr>
          <tr><td>Lap timing error</td><td>&lt; 100 ms</td><td>&lt; 17 ms (1 frame)</td><td>✓ Pass</td></tr>
          <tr><td>UI update rate</td><td>~12 Hz</td><td>11–13 Hz</td><td>✓ Pass</td></tr>
          <tr><td>Post-race downsample ratio</td><td>~3&times; reduction</td><td>3.0&times; (60 Hz to 20 Hz)</td><td>✓ Pass</td></tr>
          <tr><td>Fuel estimation error (datasheet)</td><td>&lt; 20% avg</td><td>~15% avg</td><td>✓ Pass</td></tr>
        </tbody>
      </table>
      <p>
        The batch insert strategy (buffering 60 samples before a single <code>executemany()</code>{' '}
        call) reduced SQLite write overhead by approximately 50&times; compared to per-sample inserts.
      </p>

      <h3>Fuel Estimation Accuracy (Phase 1 vs Phase 2)</h3>
      <table className="section-table">
        <thead>
          <tr><th>Car</th><th>Track</th><th>Datasheet Est. (L/lap)</th><th>Measured (L/lap)</th><th>Error</th></tr>
        </thead>
        <tbody>
          <tr><td>Ferrari 458 Italia</td><td>Monza</td><td>3.71</td><td>3.45</td><td>+7.5%</td></tr>
          <tr><td>BMW M3 GT2</td><td>Spa</td><td>5.65</td><td>6.20</td><td>&minus;8.9%</td></tr>
          <tr><td>Lotus Exos 125 S1</td><td>Mugello</td><td>1.84</td><td>1.69</td><td>+8.7%</td></tr>
          <tr><td>Lamborghini Huracán GT3</td><td>Nürburgring GP</td><td>4.11</td><td>3.84</td><td>+6.8%</td></tr>
        </tbody>
      </table>

      <h3>Hyperparameter Investigation</h3>
      <p>
        We investigated the impact of the <code>opponent_close_behind_gap</code> threshold:
      </p>
      <table className="section-table">
        <thead>
          <tr><th>Gap Threshold (s)</th><th>Alerts per Lap (avg)</th><th>False Positives</th><th>Missed Overtakes</th></tr>
        </thead>
        <tbody>
          <tr><td>0.5</td><td>8.2</td><td>High (lapped traffic)</td><td>0</td></tr>
          <tr><td><strong>0.8 (selected)</strong></td><td>3.1</td><td>Low</td><td>0</td></tr>
          <tr><td>1.2</td><td>1.4</td><td>Very low</td><td>2</td></tr>
        </tbody>
      </table>
      <p>
        The hysteresis band (activate at 0.8s, deactivate at 1.2s) was chosen to balance
        responsiveness against alert fatigue. Without hysteresis, the alert flickered 4–6 times
        per close-following event; with the 0.4s band, it fires once and holds.
      </p>

      <h2>Discussions</h2>

      <h3>Why the Algorithm Fails for Some Cases</h3>
      <ol>
        <li><strong>Fuel estimation inaccuracy on first lap</strong>: <code>fuel_consumption_per_lap</code> requires at least one completed lap. During lap 1 the datasheet estimate is used, which averages ~15% error and may cause premature or missed fuel warnings before Phase 2 kicks in.</li>
        <li><strong>Fuel lookup table coverage gaps</strong>: The internal lookup table covers only a subset of Assetto Corsa's 100+ car models. Unrecognised cars fall back to a global 3.0 L/lap default, which may be significantly inaccurate for unusual vehicles (e.g., historic Formula cars or high-downforce prototypes).</li>
        <li><strong>Tire temperature transients</strong>: Brief spikes during hard braking can trigger false tire warnings. The system has no temporal smoothing — a single sample above 100 &#176;C fires the alert even if temperature returns to normal within 200ms.</li>
        <li><strong>Position change false positives at race start</strong>: The initial position assignment can trigger a spurious position change event. We suppress changes when <code>old_position is None</code>, but edge cases remain.</li>
        <li><strong>No opponent data in AC original</strong>: Assetto Corsa (original, not ACC) does not expose gap-to-car-ahead/behind via shared memory. <code>gap_ahead</code> and <code>gap_behind</code> are always <code>None</code>, making gap-based overtake detection impossible.</li>
        <li><strong>Shared memory stale reads</strong>: If the game freezes or enters a loading screen, shared memory blocks retain their last values. Processing continues on stale data until OFF status is detected (10 consecutive OFF frames = 167ms).</li>
      </ol>

      <h3>Suggestions to Improve Performance</h3>
      <ol>
        <li><strong>Expand fuel lookup table</strong>: Extend the car lookup table to cover the full Assetto Corsa car roster using community-documented fuel consumption figures, reducing cold-start estimation error for previously unrecognised vehicles.</li>
        <li><strong>Exponential moving average for tire temps</strong>: Apply an EMA (alpha = 0.3) to tire temperature readings before threshold comparison, eliminating transient spike false positives while maintaining responsiveness to genuine overheating.</li>
        <li><strong>Adaptive fuel estimation</strong>: Use a weighted average of the last 3 laps' fuel consumption (more recent laps weighted higher) instead of single-lap calculation.</li>
        <li><strong>Lap-based tire wear projection</strong>: Fit a linear regression to tire wear across laps and predict the lap at which each tire will reach critical wear, enabling proactive pit strategy recommendations.</li>
        <li><strong>Temporal event correlation</strong>: Group events occurring within a short time window (e.g., tire critical + wheel slip critical within 2 seconds) into a single compound event, reducing alert volume.</li>
      </ol>

      <h2>Conclusion</h2>
      <p>
        The data pipeline demonstrates that a rule-based event detection system operating at
        under 50ms latency can reliably identify safety-critical and strategically-relevant
        racing events from raw shared memory telemetry. The two-phase fuel estimation approach —
        combining datasheet lookup tables for cold-start coverage with telemetry-derived
        per-lap consumption from the first completed lap — achieves an average error of ~15%
        in Phase 1, converging to exact measurement in Phase 2. The threshold-and-cooldown
        architecture achieves a practical balance between alert sensitivity and driver
        distraction, with configurable parameters allowing adaptation to different car/track
        combinations. The SQLite recording layer sustains 60 Hz write throughput through batch
        inserts, preserving full-fidelity telemetry for post-race analysis. Key limitations
        stem from the data source: Assetto Corsa's shared memory provides no opponent
        telemetry, restricting competitive awareness features to position-change detection
        only. Future work should explore temporal smoothing for transient-prone signals,
        adaptive threshold calibration, and an expanded fuel lookup table covering the full
        AC car roster.
      </p>

      <h2>References</h2>
      <ol className="ref-list">
        <li>Python Software Foundation, "heapq — Heap queue algorithm," <em>Python 3.12 Documentation</em>, 2024. [Online]. Available: <a href="https://docs.python.org/3/library/heapq.html" target="_blank" rel="noopener noreferrer">https://docs.python.org/3/library/heapq.html</a></li>
        <li>R. C. Dorf and R. H. Bishop, "Hysteresis in Control Systems," in <em>Modern Control Systems</em>, 14th ed. Pearson, 2022, ch. 4, pp. 178–182.</li>
        <li>Assetto Corsa Modding Community, "Shared Memory Reference," 2023. [Online]. Available: <a href="https://www.assettocorsa.net/forum/index.php?threads/shared-memory-reference.3352/" target="_blank" rel="noopener noreferrer">assettocorsa.net</a></li>
        <li>Pydantic, "Pydantic V2 Documentation," 2024. [Online]. Available: <a href="https://docs.pydantic.dev/latest/" target="_blank" rel="noopener noreferrer">https://docs.pydantic.dev/latest/</a></li>
        <li>The Qt Company, "Signals &amp; Slots," <em>Qt 5.15 Documentation</em>, 2023. [Online]. Available: <a href="https://doc.qt.io/qt-5/signalsandslots.html" target="_blank" rel="noopener noreferrer">https://doc.qt.io/qt-5/signalsandslots.html</a></li>
        <li>D. R. Hipp, "SQLite Documentation," 2024. [Online]. Available: <a href="https://www.sqlite.org/docs.html" target="_blank" rel="noopener noreferrer">https://www.sqlite.org/docs.html</a></li>
        <li>Matplotlib Development Team, "Matplotlib: Visualization with Python," 2024. [Online]. Available: <a href="https://matplotlib.org/stable/" target="_blank" rel="noopener noreferrer">https://matplotlib.org/stable/</a></li>
      </ol>
      </>)}

      {activeTab === 'AI Pipeline' && (<>
      <p>
        This tab covers the algorithms that operate within the AI pipeline: LLM inference and
        prompt engineering, voice input (VAD + Whisper STT), text-to-speech output, post-race
        analysis agents, and end-to-end evaluation. Telemetry event detection and the data
        pipeline are documented in the <strong>Telemetry Data</strong> tab; model training
        and fine-tuning are in the <strong>Fine Tuning</strong> tab.
      </p>

      <h2>Pipeline Overview</h2>
      <p>
        The AI pipeline employs a hybrid architecture combining deterministic rule-based event
        detection and a full voice I/O loop with LLM-powered natural language generation. Five
        distinct algorithmic components are chosen for specific latency and accuracy trade-offs
        within a real-time sim racing context.
      </p>
      <p>
        The system operates in two modes. In <strong>proactive mode</strong>, the telemetry agent
        detects an event (e.g., fuel critical) and generates a rule-based radio message
        from the event type, event data, and current session context. In <strong>reactive
        mode</strong>, the driver asks a question via voice input, and the LLM receives the query,
        relevant session context (pruned by query keywords), and conversation history.
      </p>

      <table className="section-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Target Latency</th>
            <th>Measured Latency</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rule-based event detection</td>
            <td>&lt; 50 ms</td>
            <td>&lt; 5 ms</td>
            <td>Well within budget</td>
          </tr>
          <tr>
            <td>LLM proactive response (CPU)</td>
            <td>&lt; 3 s</td>
            <td>1-2 s</td>
            <td>Within budget</td>
          </tr>
          <tr>
            <td>LLM reactive response (CPU)</td>
            <td>&lt; 7 s</td>
            <td>2-5 s</td>
            <td>Within budget</td>
          </tr>
          <tr>
            <td>Voice activity detection</td>
            <td>Real-time</td>
            <td>&lt; 1 ms per frame</td>
            <td>Negligible</td>
          </tr>
          <tr>
            <td>Speech-to-text (Whisper base, INT8)</td>
            <td>&lt; 2 s</td>
            <td>&lt; 1 s (for 2-8 s audio)</td>
            <td>Acceptable</td>
          </tr>
          <tr>
            <td>TTS synthesis (Kokoro, CPU)</td>
            <td>&lt; 2 s</td>
            <td>&lt; 1 s</td>
            <td>Acceptable</td>
          </tr>
          <tr>
            <td><strong>Full voice query round-trip</strong></td>
            <td><strong>&lt; 12 s</strong></td>
            <td><strong>4-9 s</strong></td>
            <td><strong>Within budget</strong></td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Fallback chain:</strong> If the LLM is unavailable, times out, or produces
        low-quality output, the system falls back to deterministic rule-based responses (e.g.,
        "Box box box! Fuel critical, pit this lap.") to ensure the driver always receives a
        message.
      </p>

      <h2>Voice Input Pipeline</h2>

      <h3>Voice Activity Detection (WebRTC VAD)</h3>
      <p>
        Before transcription, audio is segmented into speech and non-speech regions
        using <strong>WebRTC's Voice Activity Detection</strong> algorithm, a lightweight
        Gaussian Mixture Model (GMM)-based classifier originally developed by Google for real-time
        communication. This avoids sending silence or background noise to the more computationally
        expensive Whisper model.
      </p>
      <p>
        WebRTC VAD operates on 30 ms audio frames at 16 kHz and classifies each frame as speech
        or non-speech. The implementation uses aggressiveness level 2 (scale 0-3) -- aggressive
        enough to reject engine noise and ambient sound, but sensitive enough to capture natural
        speech onset.
      </p>
      <p>
        The segmentation logic:
      </p>
      <ol>
        <li><strong>Onset detection:</strong> When VAD classifies a frame as speech, recording begins.</li>
        <li><strong>Padding:</strong> 150 ms of audio is buffered before and after detected speech boundaries to avoid clipping word beginnings/endings.</li>
        <li><strong>Minimum duration filter:</strong> Segments shorter than 300 ms are discarded as noise (e.g., coughs, button clicks).</li>
        <li><strong>Offset detection:</strong> Recording ends after 150 ms of continuous silence following speech.</li>
      </ol>
      <p>
        An alternative <strong>Push-to-Talk (PTT) mode</strong> bypasses VAD entirely, recording
        only while the driver holds a physical button (keyboard or racing wheel). This mode skips
        VAD model loading, saving approximately 30 MB of memory.
      </p>

      <h3>Speech Recognition (Faster-Whisper)</h3>
      <p>
        Driver voice queries are transcribed using <strong>OpenAI's Whisper</strong>, an
        encoder-decoder transformer trained on 680,000 hours of multilingual audio via large-scale
        weak supervision. The implementation uses <strong>base-faster-whisper</strong>, which
        re-implements Whisper using CTranslate2 for up to 4x faster inference with INT8
        quantisation on CPU.
      </p>
      <p>
        The <strong>encoder</strong> processes log-Mel spectrogram features (80-channel, 30-second
        windows) through transformer blocks to produce audio representations.
        The <strong>decoder</strong> autoregressively generates text tokens conditioned on the
        encoder output, using beam search (beam_size=5) for improved transcription quality.
      </p>
      <p>
        <strong>Domain adaptation</strong> is achieved without fine-tuning through
        Whisper's <code>initial_prompt</code> mechanism, which seeds the decoder with
        domain-specific vocabulary:
      </p>
      <pre className="code-block"><code>{`"F1 racing, telemetry, tires, brakes, fuel, pit stop, lap time, sector"`}</code></pre>
      <p>
        This biases the model's token predictions toward racing terminology, improving recognition
        of domain-specific terms like "understeer," "pit window," and "tyre degradation".
      </p>

      <h3>Configuration</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Rationale</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Whisper model size</td>
            <td>base (~140 MB)</td>
            <td>Balance of accuracy and CPU inference speed</td>
          </tr>
          <tr>
            <td>Whisper compute type</td>
            <td>INT8</td>
            <td>~2x faster than FP32 on CPU with minimal quality loss</td>
          </tr>
          <tr>
            <td>Beam size</td>
            <td>5</td>
            <td>Standard setting; higher values showed diminishing returns</td>
          </tr>
          <tr>
            <td>Language</td>
            <td>"en" (fixed)</td>
            <td>Single-language mode avoids language detection overhead</td>
          </tr>
          <tr>
            <td>VAD aggressiveness</td>
            <td>2 (of 0-3)</td>
            <td>Level 3 rejected soft-spoken queries; level 1 triggered on engine noise</td>
          </tr>
          <tr>
            <td>VAD frame size</td>
            <td>30 ms</td>
            <td>Required by WebRTC VAD algorithm</td>
          </tr>
          <tr>
            <td>Min speech duration</td>
            <td>300 ms</td>
            <td>Filters momentary noises (clicks, coughs)</td>
          </tr>
        </tbody>
      </table>

      <h2>LLM Response Generation</h2>

      <h3>Inference Modes</h3>
      <p>
        The quantised <strong>IBM Granite 4.0-Micro</strong> model, fine-tuned with QLoRA
        and converted to <strong>GGUF Q4_K_M</strong> format, generates natural-language race
        engineer radio messages from structured telemetry context. Inference is performed
        via <strong>llama-cpp-python</strong>, a C++ backend that avoids Python-level overhead.
      </p>
      <ul>
        <li>
          <strong>Proactive mode</strong> (event-triggered): When the telemetry agent detects an
          event, a prompt is constructed from the event type, event data, and current session
          context. The model generates a 1-3 sentence radio message. Latency target: &lt; 5 seconds.
        </li>
        <li>
          <strong>Reactive mode</strong> (driver query): When the driver asks a question via voice
          input, the prompt includes the query, relevant session context (pruned by query keywords),
          and conversation history. Latency target: &lt; 7 seconds.
        </li>
      </ul>
      <p>
        Prompt formatting uses Granite's chat template with explicit role markers:
      </p>
      <pre className="code-block"><code>{`<|start_of_role|>system<|end_of_role|>{system_prompt}<|end_of_text|>
<|start_of_role|>user<|end_of_role|>{user_prompt}<|end_of_text|>
<|start_of_role|>assistant<|end_of_role|>`}</code></pre>

      <h3>Prompt Construction</h3>
      <p>
        Telemetry data undergoes <strong>query-aware context pruning</strong> before being included
        in LLM prompts. This was implemented to minimise the LLM pre-processing latency, by removing unnecessary data from the input prompts. The <code>to_prompt_context()</code> method dynamically includes or excludes
        context lines based on keyword analysis of the driver's query:
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Query Keywords</th>
            <th>Context Lines Included</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>"fuel", "tank"</td>
            <td>Fuel remaining, fuel laps, consumption rate</td>
          </tr>
          <tr>
            <td>"tire", "tyre", "temp"</td>
            <td>Tyre temperatures, pressures, wear</td>
          </tr>
          <tr>
            <td>"gap", "opponent", "defend"</td>
            <td>Gap ahead/behind, nearby opponents</td>
          </tr>
          <tr>
            <td>"pit", "box", "refuel"</td>
            <td>Pit summary, fuel data</td>
          </tr>
          <tr>
            <td>"damage", "crash"</td>
            <td>Car damage zones</td>
          </tr>
          <tr>
            <td>"lap", "time", "pace"</td>
            <td>Best/last lap times</td>
          </tr>
        </tbody>
      </table>
      <p>
        Core data (track name, lap/position, speed/gear/RPM) is always included. This reduces
        prompt token count by 30-60% for targeted queries, keeping inference within the 2048-token
        context window.
      </p>
      <p>
        <strong>Constraint injection:</strong> For specific query categories, additional constraints
        are dynamically injected into the prompt to prevent hallucination. Pit constraints prevent
        the model from recommending pitting when fuel data is unavailable or sufficient
        (&ge; 4 laps remaining). Opponent constraints prevent the model from fabricating gap times
        when the sim does not provide this data.
      </p>

      <h3>Guardrail System</h3>
      <p>
        Generated responses pass through three post-generation checks before being emitted to the driver:
      </p>
      <ol>
        <li>
          <strong>Ungrounded number detection:</strong> Regex checks whether the response contains
          numeric values not present in the input prompt, flagging potential hallucinations.
        </li>
        <li>
          <strong>Pit response validation:</strong> If the query is pit-related but the response
          appears low-confidence, a deterministic fallback is substituted.
        </li>
        <li>
          <strong>Low-quality detection:</strong> Checks for incomplete sentences, vague language
          patterns, or excessively short responses.
        </li>
      </ol>
      <p>
        The guardrail system reduced hallucination rates by approximately 50% — from ~8-15%
        pre-guardrail to ~3-7% post-guardrail.
      </p>

      <h3>Generation Parameters</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Live Mode</th>
            <th>Post-Race Analysis</th>
            <th>Post-Race Coaching</th>
            <th>Rationale</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>max_tokens</td>
            <td>24</td>
            <td>2000</td>
            <td>500</td>
            <td>Live must be ultra-brief for radio; post-race has time for detail</td>
          </tr>
          <tr>
            <td>temperature</td>
            <td>0.15</td>
            <td>0.3</td>
            <td>0.6</td>
            <td>Lower for deterministic live responses; higher for creative coaching</td>
          </tr>
          <tr>
            <td>top_p</td>
            <td>0.95</td>
            <td>0.95</td>
            <td>0.95</td>
            <td>Nucleus sampling held constant across modes</td>
          </tr>
          <tr>
            <td>top_k</td>
            <td>50</td>
            <td>50</td>
            <td>50</td>
            <td>Vocabulary filtering held constant</td>
          </tr>
          <tr>
            <td>context window</td>
            <td>2,048</td>
            <td>8,192</td>
            <td>8,192</td>
            <td>Larger window for post-race to accommodate full session data</td>
          </tr>
          <tr>
            <td>max_prompt_tokens</td>
            <td>1,024</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Truncation limit for live mode to prevent latency spikes</td>
          </tr>
        </tbody>
      </table>
      <p>
        A temperature of 0.15 was selected for live mode through iterative testing. At
        temperature 0.0 (greedy), responses became repetitive across similar events. At
        temperature 0.3, occasional hallucinations appeared under time pressure. The value 0.15
        provided sufficient variety while maintaining factual grounding.
      </p>

      <h2>Text-to-Speech Output</h2>
      <p>
        AI responses are vocalised using <strong>Kokoro</strong>, a lightweight neural TTS
        system that runs inference via the <strong>ONNX Runtime</strong> without requiring
        PyTorch. Kokoro uses a neural acoustic model to generate speech waveforms from text,
        producing natural-sounding output suitable for a race engineer persona.
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Rationale</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Voice</td>
            <td><code>bm_lewis</code></td>
            <td>British male voice matching the race engineer persona</td>
          </tr>
          <tr>
            <td>Language</td>
            <td><code>en-gb</code> (British English)</td>
            <td>Consistent with F1 race engineer communication style</td>
          </tr>
          <tr>
            <td>Speed</td>
            <td>1.3x</td>
            <td>Matches urgency of real F1 race radio; 1.0x felt too slow during testing</td>
          </tr>
          <tr>
            <td>Inference backend</td>
            <td>ONNX on CPU</td>
            <td>No PyTorch dependency; runs on consumer hardware; avoids GPU contention</td>
          </tr>
        </tbody>
      </table>
      <p>
        A regex-based <strong>text preprocessor</strong> converts decimal numbers to spoken form
        before synthesis to prevent mispronunciation of numerical data:
      </p>
      <pre className="code-block"><code>{`"1.5" → "1 point 5"`}</code></pre>
      <p>
        <strong>Sentence splitting</strong> uses a custom non-spaCy parser to avoid the spaCy
        dependency (~500 MB). The parser segments text using punctuation-based heuristics and
        inserts appropriate pauses between sentences.
      </p>

      <h2>Post-Race Analysis</h2>

      <h3>Post-Race Analysis Agents</h3>
      <p>
        After a session ends, two specialised LLM agents process the recorded telemetry data for
        structured analysis. Both use the same Granite 4.0-Micro architecture as the live race
        engineer, but with a separate fine-tuned model optimised for longer-form analytical
        output.
      </p>
      <ul>
        <li>
          <strong>Race Analysis Agent:</strong> Receives a JSON payload containing lap times, fuel
          data, stint information, and per-lap telemetry aggregates. Generates a comprehensive
          technical breakdown covering pace, consistency, tyre behaviour, and fuel consumption
          patterns. Uses <code>max_tokens=2000</code> and <code>temperature=0.3</code> for
          detailed, deterministic analysis.
        </li>
        <li>
          <strong>Coaching Agent:</strong> Receives preprocessed telemetry summaries (statistical
          aggregates rather than raw data) and generates 3-5 actionable coaching tips.
          Uses <code>max_tokens=500</code> and <code>temperature=0.6</code> for slightly more
          creative, encouraging output. Includes a <strong>truncation detection and retry
          mechanism</strong> -- if the response appears cut off, a more concise prompt is retried.
          If the retry also truncates, a deterministic fallback generates coaching tips from the
          statistical summary without LLM involvement.
        </li>
      </ul>

      <table className="section-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Live Model</th>
            <th>Post-Race Model</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Context window</td>
            <td>2,048 tokens</td>
            <td>8,192 tokens</td>
          </tr>
          <tr>
            <td>Max output tokens</td>
            <td>24</td>
            <td>500-2,000</td>
          </tr>
          <tr>
            <td>Temperature</td>
            <td>0.15</td>
            <td>0.3-0.6</td>
          </tr>
          <tr>
            <td>Time cap</td>
            <td>8 seconds</td>
            <td>No hard limit</td>
          </tr>
        </tbody>
      </table>

      <h3>Session Context</h3>
      <p>
        The <code>LiveSessionContext</code> maintains a <strong>60-second rolling telemetry
        buffer</strong> (600 samples at 10 Hz) alongside aggregated state: lap times history
        (all completed laps), best and last lap times, fuel consumption per lap (auto-calculated
        on each lap completion), and conversation history (last 1 exchange to maintain coherence
        without excessive token usage).
      </p>
      <p>
        For <strong>post-race analysis</strong>, raw telemetry (potentially tens of thousands of
        samples at 60 Hz) is preprocessed into per-lap statistical aggregates before being fed to
        the LLM:
      </p>
      <ol>
        <li><strong>Lap grouping:</strong> Samples are grouped by lap number.</li>
        <li><strong>Statistical aggregation:</strong> Per-lap metrics are computed: average/max speed, average throttle/brake percentage, average tyre temperature/pressure, fuel start/end values, and maximum damage sum.</li>
        <li><strong>Downsampling:</strong> If more than 60 laps exist, rows are evenly spaced across the lap range to keep the prompt bounded.</li>
        <li><strong>Throttle pattern analysis:</strong> Detects "hesitations" — instances where throttle drops from &ge; 0.6 to &lt; 0.5 during acceleration, indicating driver confidence issues on corner exit.</li>
        <li><strong>Braking zone detection:</strong> Counts transitions from brake &lt; 0.1 to brake &gt; 0.1, identifying individual braking events.</li>
        <li><strong>Tyre balance analysis:</strong> Computes front-rear and left-right temperature differentials to identify setup or driving style imbalances.</li>
      </ol>

      <h2>Evaluation</h2>

      <h3>Latency Performance</h3>
      <p>
        End-to-end response time was measured for each pipeline component under realistic racing
        conditions (continuous 60 Hz telemetry input, concurrent voice queries) using wall-clock
        time via <code>time.monotonic()</code> instrumentation.
      </p>
      <p>
        The rule-based event detection operates well within its 50 ms budget, with typical
        execution under 5 ms. LLM inference latency is dominated by token generation speed, which
        varies by prompt length and hardware (CPU thread count). See the Pipeline Overview table
        above for full results.
      </p>

      <h3>Response Quality</h3>
      <p>
        LLM-generated responses were manually evaluated for correctness, relevance, and
        conciseness:
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Proactive Alerts</th>
            <th>Reactive Queries</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Factual grounding rate</td>
            <td>~95%</td>
            <td>~90%</td>
          </tr>
          <tr>
            <td>Relevance rate</td>
            <td>~98%</td>
            <td>~92%</td>
          </tr>
          <tr>
            <td>Hallucination rate (pre-guardrail)</td>
            <td>~8%</td>
            <td>~15%</td>
          </tr>
          <tr>
            <td>Hallucination rate (post-guardrail)</td>
            <td>~3%</td>
            <td>~7%</td>
          </tr>
          <tr>
            <td>Average response length</td>
            <td>12-18 words</td>
            <td>15-30 words</td>
          </tr>
        </tbody>
      </table>
      <p>
        Proactive alerts have higher grounding rates because the prompt is more tightly constrained
        (specific event type + data), whereas reactive queries are open-ended and may prompt the
        model to speculate.
      </p>

      <h3>Speech Recognition Accuracy</h3>
      <p>
        Transcription accuracy was measured using Word Error Rate (WER):
      </p>
      <pre className="code-block"><code>{`WER = (Substitutions + Insertions + Deletions) / Total Words in Reference`}</code></pre>
      <table className="section-table">
        <thead>
          <tr>
            <th>Condition</th>
            <th>WER (Whisper base, INT8)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Quiet environment, headset mic</td>
            <td>~5-8%</td>
          </tr>
          <tr>
            <td>Racing environment (engine noise), headset mic</td>
            <td>~10-15%</td>
          </tr>
          <tr>
            <td>Racing environment, open mic (speakers)</td>
            <td>~20-30%</td>
          </tr>
        </tbody>
      </table>
      <p>
        The <code>initial_prompt</code> seeding with racing vocabulary reduced domain-specific term
        errors by an estimated 15-20% compared to default Whisper.
      </p>

      <h2>Limitations and Future Work</h2>

      <h3>Known Limitations</h3>
      <ul>
        <li>
          <strong>LLM hallucinations under sparse context:</strong> When telemetry data is
          incomplete (e.g., gap data unavailable in certain modes), the model occasionally
          fabricates gap times or opponent information despite explicit prompt constraints. The
          4-bit quantised model has reduced capacity to follow negative instructions compared to
          full-precision models. The guardrail system catches approximately 50% of these cases.
        </li>
        <li>
          <strong>Voice recognition in high-noise environments:</strong> The Whisper base model
          struggles with short, domain-specific queries in noisy racing environments (WER &gt; 20%).
          Common failure modes include:
          <ul>
            <li>Misrecognition of similar-sounding terms</li>
            <li>Truncation of very short queries (1-2 words) when the VAD triggers late</li>
            <li>False positive VAD activations from engine note changes or gear shifts</li>
          </ul>
        </li>
        <li>
          <strong>Context window limitations:</strong> The 2048-token context window for live
          inference occasionally forces aggressive context pruning, especially for verbose-mode
          prompts with conversation history. When pruning removes relevant data, response quality
          degrades.
        </li>
        <li>
          <strong>Post-race truncation:</strong> The coaching agent's 500-token limit occasionally
          truncates responses mid-thought. While the truncation detection and retry mechanism
          handles most cases, the deterministic fallback produces formulaic, less personalised
          coaching.
        </li>
        <li>
          <strong>Fuel lookup false matches:</strong> The Jaccard threshold of 0.4 occasionally
          produces false matches for cars with similar names (e.g., "BMW M3" vs. "BMW M4"). The
          substring containment pass also matches overly broadly when one car name is a substring
          of another.
        </li>
      </ul>

      <h3>Planned Improvements</h3>
      <ol>
        <li>
          <strong>Larger Whisper model with GPU offload:</strong> Upgrading from Whisper base to
          small or medium would significantly reduce WER in noisy environments, but requires
          GPU acceleration to maintain acceptable latency. Alternatively, domain-specific
          fine-tuning of the Whisper model on racing audio data would improve recognition without
          increasing model size.
        </li>
        <li>
          <strong>Retrieval-augmented generation (RAG):</strong> Rather than relying solely on the
          current telemetry frame and rolling buffer, a RAG system could retrieve relevant
          historical data (previous session performance, track-specific insights) to provide richer
          context for LLM responses.
        </li>
        <li>
          <strong>Adaptive threshold tuning:</strong> The current fixed thresholds do not account
          for car-specific characteristics (e.g., different tyre operating temperature windows for
          GT vs. formula cars). A learning system that adjusts thresholds based on observed
          telemetry distributions per car/track combination would reduce both false positives and
          missed events.
        </li>
        <li>
          <strong>Streaming TTS:</strong> Currently, the full response is synthesised before
          playback begins. Implementing streaming synthesis (generating audio chunk-by-chunk as LLM
          tokens are produced) would reduce perceived latency by 1-2 seconds for longer
          responses This implementation was attempted, but regressed pereived latency due to the minimal verbosity of live race engineer responses..
        </li>
      </ol>

      <h2>LLM Configuration</h2>

      <h3>Verbosity Levels</h3>
      <p>
        The LLM response length is controlled by three verbosity modes, each with a dedicated
        prompt template:
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Mode</th>
            <th>Max Length</th>
            <th>Style</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Minimal</td>
            <td>&lt;15 words</td>
            <td>Urgent, clipped</td>
            <td>"Box box! Fuel critical."</td>
          </tr>
          <tr>
            <td>Moderate (default)</td>
            <td>1–2 sentences</td>
            <td>Direct, informative</td>
            <td>"Fuel for two more laps. We need to box this lap, confirm box."</td>
          </tr>
          <tr>
            <td>Verbose</td>
            <td>Up to 4 sentences</td>
            <td>Detailed with reasoning</td>
            <td>"Fuel is critical at 1.8 laps remaining. Gap behind is 3.2 seconds so we have clean air for an in-lap. Box this lap, we'll switch to hards for the final stint."</td>
          </tr>
        </tbody>
      </table>

      <h3>Conversation History</h3>
      <p>
        The race engineer maintains a rolling conversation history of the last 3 driver–engineer
        exchanges. This allows the LLM to maintain context across interactions — for example,
        if the driver asks "what about the rears?" after a fronts discussion, the model has
        the prior exchange available to interpret the follow-up correctly.
      </p>

      <h3>Inference Parameters</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Max Tokens</td>
            <td>48</td>
            <td>Enforces brevity for live radio-style responses</td>
          </tr>
          <tr>
            <td>Temperature</td>
            <td>0.3</td>
            <td>Low variance for consistent, deterministic outputs</td>
          </tr>
          <tr>
            <td>Top K</td>
            <td>50</td>
            <td>Limits token sampling pool</td>
          </tr>
          <tr>
            <td>Top P (nucleus)</td>
            <td>0.95</td>
            <td>Cumulative probability cutoff for sampling</td>
          </tr>
          <tr>
            <td>Context Window</td>
            <td>2,048 tokens</td>
            <td>Maximum input + output length per inference call</td>
          </tr>
          <tr>
            <td>Generation Timeout</td>
            <td>5 seconds</td>
            <td>Prevents blocking the telemetry pipeline on slow hardware</td>
          </tr>
        </tbody>
      </table>

      <h2>References</h2>
      <ol className="ref-list">
        <li>
          Erman, L.D., Hayes-Roth, F., Lesser, V.R. and Reddy, D.R. (1980) 'The Hearsay-II
          speech-understanding system: Integrating knowledge to resolve uncertainty', <em>ACM
          Computing Surveys</em>, 12(2), pp. 213-253.
        </li>
        <li>
          Mishra, M. <em>et al.</em> (2024) 'Granite code models: A family of open foundation
          models for code intelligence', <em>arXiv</em>, 2405.04324. Available at:{' '}
          <a href="https://arxiv.org/abs/2405.04324" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2405.04324
          </a>{' '}
          (Accessed: 25 March 2026).
        </li>
        <li>
          Dettmers, T., Pagnoni, A., Holtzman, A. and Zettlemoyer, L. (2023) 'QLoRA: Efficient
          finetuning of quantized language models', <em>Advances in Neural Information Processing
          Systems</em>. Available at:{' '}
          <a href="https://arxiv.org/abs/2305.14314" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2305.14314
          </a>{' '}
          (Accessed: 25 March 2026).
        </li>
        <li>
          Gerganov, G. (2023) <em>llama.cpp: Inference of Meta's LLaMA model in pure C/C++</em>.
          GitHub. Available at:{' '}
          <a href="https://github.com/ggerganov/llama.cpp" target="_blank" rel="noopener noreferrer">
            https://github.com/ggerganov/llama.cpp
          </a>{' '}
          (Accessed: 25 March 2026).
        </li>
        <li>
          Radford, A., Kim, J.W., Xu, T., Brockman, G., McLeavey, C. and Sutskever, I. (2023)
          'Robust speech recognition via large-scale weak supervision', in <em>Proceedings of the
          40th International Conference on Machine Learning</em>, pp. 28492-28518. Available at:{' '}
          <a href="https://arxiv.org/abs/2212.04356" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2212.04356
          </a>{' '}
          (Accessed: 25 March 2026).
        </li>
        <li>
          Klein, G. (2020) <em>CTranslate2: Fast inference engine for Transformer models</em>.
          GitHub. Available at:{' '}
          <a href="https://github.com/OpenNMT/CTranslate2" target="_blank" rel="noopener noreferrer">
            https://github.com/OpenNMT/CTranslate2
          </a>{' '}
          (Accessed: 25 March 2026).
        </li>
        <li>
          Google (2011) <em>WebRTC: Real-time communication for the web</em>. Available at:{' '}
          <a href="https://webrtc.org/" target="_blank" rel="noopener noreferrer">
            https://webrtc.org/
          </a>{' '}
          (Accessed: 25 March 2026).
        </li>
        <li>
          Hexgrad (2024) <em>Kokoro: Lightweight neural text-to-speech</em>. GitHub. Available at:{' '}
          <a href="https://github.com/hexgrad/kokoro" target="_blank" rel="noopener noreferrer">
            https://github.com/hexgrad/kokoro
          </a>{' '}
          (Accessed: 25 March 2026).
        </li>
        <li>
          ONNX Runtime developers (2019) <em>ONNX Runtime: Cross-platform, high performance ML
          inferencing and training accelerator</em>. Microsoft. Available at:{' '}
          <a href="https://onnxruntime.ai/" target="_blank" rel="noopener noreferrer">
            https://onnxruntime.ai/
          </a>{' '}
          (Accessed: 25 March 2026).
        </li>
        <li>
          Jaccard, P. (1912) 'The distribution of the flora in the alpine zone', <em>New
          Phytologist</em>, 11(2), pp. 37-50.
        </li>
        <li>
          Lewis, P. <em>et al.</em> (2020) 'Retrieval-augmented generation for knowledge-intensive
          NLP tasks', <em>Advances in Neural Information Processing Systems</em>, 33, pp. 9459-9474.
          Available at:{' '}
          <a href="https://arxiv.org/abs/2005.11401" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2005.11401
          </a>{' '}
          (Accessed: 25 March 2026).
        </li>
        <li>
          Leviathan, Y., Kalman, M. and Matias, Y. (2023) 'Fast inference from transformers via
          speculative decoding', in <em>Proceedings of the 40th International Conference on Machine
          Learning</em>, pp. 19274-19286. Available at:{' '}
          <a href="https://arxiv.org/abs/2211.17192" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2211.17192
          </a>{' '}
          (Accessed: 25 March 2026).
        </li>
      </ol>
      </>)}

      {activeTab === 'Fine Tuning' && (<>
      <p>
        A detailed account of the machine learning approach underpinning Jarvis:
        why fine-tuning was chosen over alternative LLM strategies, how QLoRA makes it
        feasible, and how two specialised models were trained for distinct inference contexts.
        Runtime LLM behaviour and voice pipeline algorithms are covered in the <strong>AI Pipeline</strong> tab;
        the data pipeline and event detection algorithms are in the <strong>Telemetry Data</strong> tab.
      </p>

      <h2>Fine-Tuning Strategy</h2>

      <h3>Teaching the Model to Think Like an F1 Engineer</h3>
      <p>
        Prompt engineering alone cannot reliably reproduce the terse, data-first communication
        style of a race engineer — every response depends on careful prompt construction and there
        is no persistent memory of domain conventions between calls.
      </p>
      <p>
        Fine-tuning was chosen because it bakes the engineering voice and domain reasoning
        directly into the model weights. This allows the model to generate race debriefs, telemetry
        summaries, and strategic analysis that consistently reflects how a real race engineer would frame
        observations — prioritising lap delta, tyre state, and sector-by-sector breakdowns. The live
        inference layer pairs this with lightweight rule-based event detection (fuel thresholds, tyre
        wear, gap changes), which feeds structured events to the model. This hybrid approach avoids
        expensive data retrieval while keeping responses grounded in detected race conditions. [1]
      </p>

      <h3>QLoRA: Parameter-Efficient Fine-Tuning</h3>
      <p>
        Full fine-tuning of a multi-billion parameter model demands tens of gigabytes of GPU
        memory and hours of compute — resources unavailable in a student project environment.
        QLoRA (Quantized Low-Rank Adaptation) resolves this by combining two complementary
        techniques: [1]
      </p>
      <ul>
        <li>
          <strong>4-bit NF4 quantisation</strong> — the base model's weights are loaded in
          4-bit normal-float format, reducing memory footprint by roughly 75% compared
          to full-precision loading while preserving model quality.
        </li>
        <li>
          <strong>LoRA adapters</strong> — instead of updating every weight in the network,
          small low-rank matrices are inserted at each attention layer. Only these adapter
          parameters — ~0.5% of the total parameter count — are trained, leaving the
          frozen quantised base untouched.
        </li>
      </ul>
      <p>
        Together these techniques make fine-tuning specialist LLMs feasible on a single
        consumer-grade GPU, fitting the full training process in ~8–12 GB of VRAM. The resulting
        adapter is compact, loads on top of the frozen base at inference time, and delivers near
        full fine-tune quality at a fraction of the compute cost.
      </p>

      <h3>QLoRA Configuration</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Quantisation</td>
            <td>4-bit NF4 with double quantisation</td>
            <td>Reduces base model memory by ~75%; double quantisation further compresses quantisation constants</td>
          </tr>
          <tr>
            <td>Compute Dtype</td>
            <td>float16</td>
            <td>Half-precision for adapter computations during training</td>
          </tr>
          <tr>
            <td>LoRA Rank (r)</td>
            <td>8</td>
            <td>Dimensionality of the low-rank decomposition — controls adapter capacity</td>
          </tr>
          <tr>
            <td>LoRA Alpha</td>
            <td>16</td>
            <td>Scaling factor applied to adapter outputs (alpha/r = 2x scaling)</td>
          </tr>
          <tr>
            <td>LoRA Dropout</td>
            <td>0.05</td>
            <td>Regularisation to prevent overfitting on small datasets</td>
          </tr>
          <tr>
            <td>Target Modules</td>
            <td>q_proj, k_proj, v_proj, o_proj</td>
            <td>All attention projection layers</td>
          </tr>
        </tbody>
      </table>

      <h2>LLM Selection</h2>
      <p>
        Three leading open-source foundation models were evaluated: IBM Granite, Llama 2/Mistral,
        and closed-source alternatives like GPT-4. The choice of base model affects fine-tuning
        cost, latency, and domain-specific output quality.
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Key Strengths</th>
            <th>Key Limitations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Granite 4.0 Micro (Selected)</strong></td>
            <td>
              Enterprise-grade; domain-optimised; built for QLoRA; compact size runs on consumer CPUs
            </td>
            <td>
              Smaller than GPT-4; requires curated fine-tuning data
            </td>
          </tr>
          <tr>
            <td>ChatGPT / GPT-4</td>
            <td>
              State-of-the-art; minimal fine-tuning needed; robust across domains
            </td>
            <td>
              Closed-source; expensive; requires internet; latency from API calls;
              licensing constraints prevent local deployment
            </td>
          </tr>
          <tr>
            <td>Llama 2 / Mistral</td>
            <td>
              Open-source; large community; flexible; proven at scale
            </td>
            <td>
              Not domain-optimised; higher memory for larger variants; community support only
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Granite 4.0 Micro was selected primarily because it enables fully offline inference
        on consumer hardware. After fine-tuning, the model is quantised to Q4_K_M GGUF format
        (~2 GB per model), reducing the original floating-point weights by approximately 75%
        with minimal quality loss. Inference runs via llama-cpp-python with no GPU required —
        critical for a desktop application distributed to end users who may not have dedicated
        graphics hardware.
      </p>

      <h2>Two Specialised Models</h2>
      <p>
        Rather than a single general-purpose model, the platform uses two fine-tuned Granite
        instances — each trained for a distinct inference context with different input formats,
        output styles, and latency requirements.
      </p>
      <figure className="page-figure">
        <img
          src={`${process.env.PUBLIC_URL}/images/finetuning_comparison.png`}
          alt="Comparison of base model vs fine-tuned model outputs for live race engineer and post-race analyst tasks"
        />
        <figcaption>
          Base model vs fine-tuned model outputs for both tasks. The fine-tuned model gives
          specific, structured responses; the base model gives generic ones.
          Training: QLoRA on ~1,000 F1 examples per task.
        </figcaption>
      </figure>

      <h3>Live Race Engineer Model</h3>
      <p>
        The live model operates on a completely different cadence. It receives a short telemetry
        snapshot — current speed, RPM, throttle percentage, and brake pressure — and returns a
        brief, radio-style instruction in the voice of a race engineer. Responses are intentionally
        terse: the driver is at speed and cannot process a paragraph. Training data was structured
        as prompt–completion pairs to reinforce this concise output format.
      </p>
      <pre className="code-block"><code>{`// Training pair
Prompt:     "Telemetry: speed 256.4, rpm 10647.8,
             throttle 82.8, brake 12.3. Advice:"

Completion: "Good job Oscar, these tyres are now in,
             based on the first stint we can use the rear
             a bit more, tyres look good."`}</code></pre>
      <p>
        At inference time, the live model is constrained to a maximum of 48 tokens per response
        with a temperature of 0.3 to ensure deterministic, consistent outputs. A 5-second
        generation timeout prevents the model from blocking the telemetry pipeline.
      </p>

      <h3>Post-Race Debrief Model</h3>
      <p>
        This model ingests a structured JSON payload produced at the end of each session: race
        result, lap-by-lap times, stint breakdowns including compound and average pace, pit stop
        data, and a sample of low-frequency car telemetry (speed, RPM, gear, throttle, brake,
        DRS). From this it generates a multi-section engineering debrief — covering pace
        consistency, tyre degradation analysis, strategy effectiveness, driver strengths and
        weaknesses, and actionable recommendations — written in the formal register of an F1
        post-race report.
      </p>
      <pre className="code-block"><code>{`// Training pair (abridged)
Input:  { "result": {"start":1,"finish":1},
          "lap_summary": {"total":57,"avg":98.89,
            "fastest":{"lap":44,"time":96.236}},
          "stints": [
            {"compound":"SOFT","laps":"1-36","avg_time":98.624},
            {"compound":"HARD","laps":"37-57","avg_time":99.347}
          ], ... }

Output: "### 1. Overall Performance and Result
         Max Verstappen secured a P1 finish, delivering a dominant
         and controlled performance throughout the 57-lap event...
         ### 2. Pace Consistency and Key Lap Times
         The driver's pace was exceptionally stable...
         ### 3. Tire Management and Degradation
         Analysis of the Soft compound (Stint 1) reveals minimal
         degradation — only +0.508s over 11 laps (~0.046s/lap)...
         ### 4. Strategy Effectiveness
         The strategy utilised two primary pit windows...
         ### 5. Strengths
         Exceptional Consistency: sub-98s laps maintained regardless
         of fuel load or compound...
         ### 6. Weaknesses
         Lap 36 Variance: a 100.964s lap just prior to the second
         pit stop suggests a 3.1s drop-off from the previous lap...
         ### 7. Comparison to Teammate / Field
         The driver's ability to maintain 97s pace on used Softs
         suggests a significant aerodynamic platform advantage...
         ### 8. Analysis of Car Data
         Telemetry samples show 254 km/h in 7th gear at 9861 RPM
         with 1% braking — consistent with high-speed stabilisation...
         ### 9. Recommendations
         Investigate Laps 20–30 to determine whether ERS deployment
         or tyre surface temperature drove the mid-stint improvement..."`}</code></pre>
      <p>
        The two-model approach means each adapter is optimised for its task: the debrief model
        is allowed full markdown output and multi-paragraph reasoning, while the live model is
        penalised during training for verbose completions. Neither use case was well served by a
        single combined model.
      </p>

      <h2>Data</h2>

      <h3>Training Hyperparameters</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Live Race Engineer</th>
            <th>Post-Race Analyst</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Base Model</td>
            <td>ibm-granite/granite-4.0-micro [3]</td>
            <td>ibm-granite/granite-4.0-micro [3]</td>
          </tr>
          <tr>
            <td>Epochs</td>
            <td>3</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Batch Size</td>
            <td>4</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Gradient Accumulation Steps</td>
            <td>8</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Effective Batch Size</td>
            <td>16</td>
            <td>16</td>
          </tr>
          <tr>
            <td>Learning Rate</td>
            <td>2e-4</td>
            <td>2e-4</td>
          </tr>
          <tr>
            <td>Warmup Steps</td>
            <td>50</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Scheduler</td>
            <td>Linear with warmup</td>
            <td>Linear with warmup</td>
          </tr>
          <tr>
            <td>Optimiser</td>
            <td>paged_adamw_8bit</td>
            <td>paged_adamw_8bit</td>
          </tr>
          <tr>
            <td>Precision</td>
            <td>fp16</td>
            <td>fp16</td>
          </tr>
          <tr>
            <td>Max Sequence Length</td>
            <td>512 tokens</td>
            <td>2,048 tokens</td>
          </tr>
          <tr>
            <td>Train/Validation Split</td>
            <td>90/10 (seed=42)</td>
            <td>90/10 (seed=42)</td>
          </tr>
          <tr>
            <td>Best Model Selection</td>
            <td>Lowest eval_loss</td>
            <td>Lowest eval_loss</td>
          </tr>
          <tr>
            <td>Eval Frequency</td>
            <td>Every 50 steps</td>
            <td>Every 50 steps</td>
          </tr>
        </tbody>
      </table>
      <p>
        The post-race model uses a longer sequence length (2,048 vs 512) to accommodate the structured
        JSON telemetry input and multi-section debrief output. The live model's shorter context reflects
        the brevity of radio-style exchanges.
      </p>

      <h3>Dataset</h3>

      <h4>Live Race Engineer Dataset</h4>
      <p>
        The live model was trained on <strong>1,258 filtered examples</strong> sourced from real
        F1 telemetry and team radio recordings across the 2023, 2024, and 2025 seasons.
      </p>
      <ul>
        <li>
          <strong>Telemetry source:</strong> OpenF1 API [5] — a 30-second telemetry window before
          each radio message is averaged into key metrics (speed, RPM, throttle, brake).
        </li>
        <li>
          <strong>Radio transcription:</strong> Team radio audio clips are transcribed locally
          using OpenAI Whisper [6], then paired with the corresponding telemetry snapshot.
        </li>
        <li>
          <strong>Format:</strong> JSONL with <code>prompt</code>/<code>completion</code> fields.
          Each prompt contains a telemetry summary; each completion is the engineer's radio message.
        </li>
      </ul>

      <h4>Post-Race Analyst Dataset</h4>
      <p>
        The post-race model was trained on <strong>~1,320 examples</strong> across the 2023, 2024,
        and 2025 seasons (~440 per year: 20 drivers × ~22 races), generated using a knowledge distillation approach.
      </p>
      <ul>
        <li>
          <strong>Telemetry source:</strong> FastF1 library [7] — provides lap times, positions,
          pit stops, stint data, and high-frequency car telemetry for every driver in every session.
        </li>
        <li>
          <strong>Teacher model:</strong> Google Gemini [8] (<code>gemini-3-flash-preview</code>) receives
          both telemetry data and race event context (safety cars, incidents, weather) to generate
          rich 9-section engineering debriefs.
        </li>
        <li>
          <strong>Knowledge distillation:</strong> The fine-tuned Granite model only receives
          telemetry data at inference time — not the race events that Gemini used. This forces
          the model to learn to infer strategic insights from telemetry patterns alone, rather
          than relying on event descriptions.
        </li>
        <li>
          <strong>Hallucination prevention:</strong> Gemini's prompt explicitly forbids referencing
          race events directly, ensuring the generated debriefs are grounded in telemetry data.
        </li>
        <li>
          <strong>Format:</strong> JSONL with <code>input</code>/<code>output</code>/<code>metadata</code>{' '}
          fields. Inputs average ~13,400 characters raw, compressed to ~1,391 characters for training.
        </li>
      </ul>

      <h3>Data Preprocessing</h3>

      <h4>Live Race Engineer Data Filtering</h4>
      <p>
        Raw telemetry–radio pairs undergo automated quality filtering to remove unusable examples:
      </p>
      <ul>
        <li>
          <strong>Gibberish detection:</strong> Messages with &lt;60% ASCII ratio, &lt;50% letter ratio,
          or &gt;30% special characters are removed (Whisper transcription artefacts).
        </li>
        <li>
          <strong>Language filtering:</strong> Non-English messages are detected and removed
          using the langid library [10] with a high-confidence threshold, as the model targets English-language output.
        </li>
        <li>
          <strong>Conversational filtering:</strong> Purely acknowledgement messages (e.g., "copy", "okay", "well done")
          containing no technical content are removed — checked against ~120 technical keywords
          (tire, fuel, gap, brake, etc.).
        </li>
        <li>
          <strong>Filtering impact:</strong> Of 826 raw examples (2023 + 2024), 106 were removed
          (~13% rejection rate), yielding 721 filtered examples from those two seasons.
        </li>
      </ul>

      <h4>Post-Race Data Compression</h4>
      <p>
        Raw FastF1 telemetry inputs are too large for the model's context window. A compression
        step reduces input size by ~90%:
      </p>
      <ul>
        <li>
          <strong>Telemetry resampling:</strong> High-frequency car data is resampled to 1 row
          per 5 seconds, reducing thousands of rows to a manageable summary.
        </li>
        <li>
          <strong>Array-of-arrays format:</strong> Column headers are stored once, with data rows
          as compact arrays rather than repeated key-value objects.
        </li>
        <li>
          <strong>Result:</strong> Average input size drops from ~2,800 tokens to ~600 tokens,
          fitting within the 2,048-token context window alongside the model's response.
        </li>
      </ul>

      <h4>Label Masking</h4>
      <p>
        The post-race training script masks prompt tokens by setting their labels to <code>-100</code>,
        so the training loss is computed only on the model's response — not the input JSON. This
        prevents the model from wasting capacity learning to reproduce telemetry inputs and focuses
        all learning on generating high-quality analysis outputs.
      </p>

      <h3>Training</h3>
      <p>
        Both models were trained using the same QLoRA configuration on their respective Granite base
        models. After training, a three-stage conversion pipeline produces the final deployable models:
      </p>
      <ol>
        <li>
          <strong>Merge:</strong> The LoRA adapter weights are merged back into the base model,
          producing a full-precision merged checkpoint.
        </li>
        <li>
          <strong>Convert:</strong> The merged model is converted to GGUF format (f16
          intermediate) using llama.cpp tooling [9].
        </li>
        <li>
          <strong>Quantise:</strong> The f16 GGUF is quantised to Q4_K_M — a medium quantisation
          level that balances model quality against file size and inference speed. The resulting
          ~2 GB files run efficiently on consumer CPUs without GPU acceleration.
        </li>
      </ol>
      <p>
        The final GGUF models are hosted on Hugging Face Hub and automatically downloaded on
        first launch, with a progress dialog informing the user of download status.
      </p>

      <h2>References</h2>
      <ol className="ref-list">
        <li>
          [1] Dettmers, T. et al. — <em>QLoRA: Efficient Finetuning of Quantized LLMs</em> (NeurIPS 2023):{' '}
          <a href="https://arxiv.org/abs/2305.14314" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2305.14314
          </a>
        </li>
        <li>
          [2] Hugging Face — <em>QLoRA: Efficient Finetuning of Quantized LLMs</em> (blog, 2023):{' '}
          <a href="https://huggingface.co/blog/qlora" target="_blank" rel="noopener noreferrer">
            https://huggingface.co/blog/qlora
          </a>
        </li>
        <li>
          [3] IBM Research — <em>Granite 4.0 Micro (ibm-granite/granite-4.0-micro)</em> (Hugging Face, 2025):{' '}
          <a href="https://huggingface.co/ibm-granite/granite-4.0-micro-instruct" target="_blank" rel="noopener noreferrer">
            https://huggingface.co/ibm-granite/granite-4.0-micro-instruct
          </a>
        </li>
        <li>
          [4] IBM Research — <em>Granite 3B Code Instruct 128k (ibm-granite/granite-3b-code-instruct-128k)</em> (Hugging Face, 2024):{' '}
          <a href="https://huggingface.co/ibm-granite/granite-3b-code-instruct-128k" target="_blank" rel="noopener noreferrer">
            https://huggingface.co/ibm-granite/granite-3b-code-instruct-128k
          </a>
        </li>
        <li>
          [5] Jacint, B. — <em>OpenF1: A free and open-source API providing real-time and historical Formula 1 data</em> (2024):{' '}
          <a href="https://openf1.org" target="_blank" rel="noopener noreferrer">
            https://openf1.org
          </a>
        </li>
        <li>
          [6] Radford, A. et al. — <em>Robust Speech Recognition via Large-Scale Weak Supervision</em> (OpenAI / ICML 2023):{' '}
          <a href="https://arxiv.org/abs/2212.04356" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2212.04356
          </a>
        </li>
        <li>
          [7] Schaefer, P. — <em>Fast-F1: A Python package for accessing and analysing Formula 1 results, schedules, timing data and telemetry</em> (GitHub, 2024):{' '}
          <a href="https://github.com/theOehrly/Fast-F1" target="_blank" rel="noopener noreferrer">
            https://github.com/theOehrly/Fast-F1
          </a>
        </li>
        <li>
          [8] Google DeepMind — <em>Gemini: A Family of Highly Capable Multimodal Models</em> (2023):{' '}
          <a href="https://arxiv.org/abs/2312.11805" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2312.11805
          </a>
        </li>
        <li>
          [9] Gerganov, G. — <em>llama.cpp: LLM inference in C/C++</em> (GitHub, 2024):{' '}
          <a href="https://github.com/ggerganov/llama.cpp" target="_blank" rel="noopener noreferrer">
            https://github.com/ggerganov/llama.cpp
          </a>
        </li>
        <li>
          [10] Lui, M. &amp; Baldwin, T. — <em>langid.py: An Off-the-shelf Language Identification Tool</em> (ACL 2012 / GitHub):{' '}
          <a href="https://github.com/saffsd/langid.py" target="_blank" rel="noopener noreferrer">
            https://github.com/saffsd/langid.py
          </a>
        </li>
      </ol>
      </>)}
    </SectionPage>
  );
}

export default Algorithms;
