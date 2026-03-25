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

      {activeTab === 'Telemetry Data' && (
        <p style={{ color: '#555', fontStyle: 'italic' }}>Telemetry Data content coming soon.</p>
      )}

      {activeTab === 'AI Pipeline' && (<>
      <p>
        A detailed account of the algorithms that execute during a live race session: how telemetry
        events are detected, how the LLM generates natural-language responses, how driver voice input
        is processed, how speech is synthesised, and how post-race analysis is produced. For
        fine-tuning methodology and training data, see the Fine Tuning tab.
      </p>

      <h2>Pipeline Overview</h2>
      <p>
        The AI pipeline employs a hybrid architecture combining deterministic rule-based event
        detection with LLM-powered natural language generation and a full voice I/O loop. Five
        distinct algorithmic components are chosen for specific latency and accuracy trade-offs
        within a real-time sim racing context [2].
      </p>
      <p>
        The system operates in two modes. In <strong>proactive mode</strong>, the telemetry agent
        detects an event (e.g., fuel critical) and triggers the LLM to generate a radio message
        from the event type, event data, and current session context. In <strong>reactive
        mode</strong>, the driver asks a question via voice input, and the LLM receives the query,
        relevant session context (pruned by query keywords), and conversation history [1].
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
            <td>&lt; 5 s</td>
            <td>1-3 s</td>
            <td>Within budget</td>
          </tr>
          <tr>
            <td>LLM reactive response (CPU)</td>
            <td>&lt; 10 s</td>
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
            <td>&lt; 5 s</td>
            <td>1-3 s (for 2-8 s audio)</td>
            <td>Acceptable</td>
          </tr>
          <tr>
            <td>TTS synthesis (Kokoro, CPU)</td>
            <td>&lt; 3 s</td>
            <td>1-2 s</td>
            <td>Acceptable</td>
          </tr>
          <tr>
            <td><strong>Full voice query round-trip</strong></td>
            <td><strong>&lt; 15 s</strong></td>
            <td><strong>5-12 s</strong></td>
            <td><strong>Within budget</strong></td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Fallback chain:</strong> If the LLM is unavailable, times out, or produces
        low-quality output, the system falls back to deterministic rule-based responses (e.g.,
        "Box box box! Fuel critical, pit this lap.") to ensure the driver always receives a
        message [1].
      </p>
      <p>
        The rule-based telemetry agent evaluates 12 event categories against configurable
        thresholds (see the Fine Tuning tab for full threshold details). Each event type has an
        independent <strong>cooldown timer</strong> (5-60 seconds depending on severity) to
        prevent alert fatigue. Events are sorted by a 4-level priority enum (CRITICAL, HIGH,
        MEDIUM, LOW) before being passed to the LLM [1]. Additional detection features include:
      </p>
      <ul>
        <li>
          <strong>Opponent close behind:</strong> Uses hysteresis — triggers at 0.8 s gap,
          resets at 1.2 s to prevent oscillation.
        </li>
        <li>
          <strong>Position change:</strong> First-change suppression avoids alerting on the
          initial position assignment at session start.
        </li>
        <li>
          <strong>Fuel laps remaining:</strong> Calculated as <code>current_fuel /
          fuel_consumption_per_lap</code>, where consumption is either looked up from a
          pre-computed datasheet (see Fuel Consumption Lookup below) or calculated from real
          telemetry after the first completed lap.
        </li>
      </ul>

      <h2>Voice Input Pipeline</h2>

      <h3>Voice Activity Detection (WebRTC VAD)</h3>
      <p>
        Before transcription, audio is segmented into speech and non-speech regions
        using <strong>WebRTC's Voice Activity Detection</strong> algorithm [7], a lightweight
        Gaussian Mixture Model (GMM)-based classifier originally developed by Google for real-time
        communication. This avoids sending silence or background noise to the more computationally
        expensive Whisper model.
      </p>
      <p>
        WebRTC VAD operates on 30 ms audio frames at 16 kHz and classifies each frame as speech
        or non-speech. The implementation uses aggressiveness level 2 (scale 0-3) — aggressive
        enough to reject engine noise and ambient sound, but sensitive enough to capture natural
        speech onset [7]. The segmentation logic:
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
        Driver voice queries are transcribed using <strong>OpenAI's Whisper</strong> [5], an
        encoder-decoder transformer trained on 680,000 hours of multilingual audio via large-scale
        weak supervision. The implementation uses <strong>faster-whisper</strong> [6], which
        re-implements Whisper using CTranslate2 for up to 4x faster inference with INT8
        quantisation on CPU.
      </p>
      <p>
        The <strong>encoder</strong> processes log-Mel spectrogram features (80-channel, 30-second
        windows) through transformer blocks to produce audio representations.
        The <strong>decoder</strong> autoregressively generates text tokens conditioned on the
        encoder output, using beam search (beam_size=5) for improved transcription quality [5].
      </p>
      <p>
        <strong>Domain adaptation</strong> is achieved without fine-tuning through
        Whisper's <code>initial_prompt</code> mechanism, which seeds the decoder with
        domain-specific vocabulary:
      </p>
      <pre className="code-block"><code>{`"F1 racing, telemetry, tires, brakes, fuel, pit stop, lap time, sector"`}</code></pre>
      <p>
        This biases the model's token predictions toward racing terminology, improving recognition
        of domain-specific terms like "understeer," "pit window," and "tyre degradation" [5].
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
            <td>Balance of accuracy and CPU inference speed [5]</td>
          </tr>
          <tr>
            <td>Whisper compute type</td>
            <td>INT8</td>
            <td>~2x faster than FP32 on CPU with minimal quality loss [6]</td>
          </tr>
          <tr>
            <td>Beam size</td>
            <td>5</td>
            <td>Standard setting; higher values showed diminishing returns [5]</td>
          </tr>
          <tr>
            <td>Language</td>
            <td>"en" (fixed)</td>
            <td>Single-language mode avoids language detection overhead [5]</td>
          </tr>
          <tr>
            <td>VAD aggressiveness</td>
            <td>2 (of 0-3)</td>
            <td>Level 3 rejected soft-spoken queries; level 1 triggered on engine noise [7]</td>
          </tr>
          <tr>
            <td>VAD frame size</td>
            <td>30 ms</td>
            <td>Required by WebRTC VAD algorithm [7]</td>
          </tr>
          <tr>
            <td>Speech padding</td>
            <td>150 ms</td>
            <td>Prevents clipping of plosive consonants at word boundaries</td>
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
        The quantised <strong>IBM Granite 4.0-Micro</strong> model [2], fine-tuned with QLoRA [3]
        and converted to <strong>GGUF Q4_K_M</strong> format [4], generates natural-language race
        engineer radio messages from structured telemetry context. Inference is performed
        via <strong>llama-cpp-python</strong> [4], a C++ backend that avoids Python-level overhead.
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
          and conversation history. Latency target: &lt; 10 seconds.
        </li>
      </ul>
      <p>
        Prompt formatting uses Granite's chat template with explicit role markers [2]:
      </p>
      <pre className="code-block"><code>{`<|start_of_role|>system<|end_of_role|>{system_prompt}<|end_of_text|>
<|start_of_role|>user<|end_of_role|>{user_prompt}<|end_of_text|>
<|start_of_role|>assistant<|end_of_role|>`}</code></pre>

      <h3>Prompt Construction</h3>
      <p>
        Telemetry data undergoes <strong>query-aware context pruning</strong> before being included
        in LLM prompts. The <code>to_prompt_context()</code> method dynamically includes or excludes
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
        context window [2].
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
        The guardrail system reduces hallucination rates by approximately 50% — from ~8-15%
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
        provided sufficient variety while maintaining factual grounding [2].
      </p>

      <h2>Text-to-Speech Output</h2>
      <p>
        AI responses are vocalised using <strong>Kokoro</strong> [8], a lightweight neural TTS
        system that runs inference via the <strong>ONNX Runtime</strong> [9] without requiring
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
            <td>ONNX on CPU (CUDA optional)</td>
            <td>No PyTorch dependency; runs on consumer hardware</td>
          </tr>
        </tbody>
      </table>
      <p>
        A regex-based <strong>text preprocessor</strong> converts decimal numbers to spoken form
        before synthesis to prevent mispronunciation of numerical data [8]:
      </p>
      <pre className="code-block"><code>{`"1.5" → "1 point 5"
"3.2s gap" → "3 point 2 s gap"`}</code></pre>
      <p>
        <strong>Sentence splitting</strong> uses a custom non-spaCy parser to avoid the spaCy
        dependency (~500 MB). The parser segments text using punctuation-based heuristics and
        inserts appropriate pauses between sentences.
      </p>

      <h2>Supporting Algorithms</h2>

      <h3>Fuel Consumption Lookup</h3>
      <p>
        Before real telemetry data is available (i.e., before the first lap completes), fuel
        consumption is estimated using a pre-computed datasheet of car/track combinations. Matching
        the game's internal IDs (e.g., <code>ks_ferrari_458</code>) to the datasheet entries
        requires <strong>fuzzy string matching</strong> using a three-pass cascade [10]:
      </p>
      <ol>
        <li><strong>Pass 1 — Exact match:</strong> Normalised strings are compared for equality (after lowercasing, accent stripping, prefix removal, and whitespace collapsing).</li>
        <li><strong>Pass 2 — Substring containment:</strong> Either string is checked as a substring of the other.</li>
        <li><strong>Pass 3 — Jaccard token overlap:</strong> Token sets are compared using the Jaccard similarity coefficient [10]:</li>
      </ol>
      <pre className="code-block"><code>{`J(A, B) = |A ∩ B| / |A ∪ B|`}</code></pre>
      <p>
        A match is accepted if <code>J &ge; 0.4</code>. This threshold was chosen empirically to
        balance precision (avoiding false matches between similarly-named cars) and recall (matching
        despite naming variations between game versions).
      </p>
      <p>
        <strong>Fuel estimation formula:</strong>
      </p>
      <pre className="code-block"><code>{`fuel_per_lap = car_base × track_scaling_factor × (track_km / 5.0)`}</code></pre>
      <p>
        Where <code>car_base</code> is the car's baseline consumption (litres/lap at a reference
        track), <code>track_scaling_factor</code> accounts for track characteristics
        (high-speed circuits consume more fuel), and <code>track_km / 5.0</code> normalises
        against the 5 km reference length.
      </p>

      <h3>Post-Race Analysis Agents</h3>
      <p>
        After a session ends, two specialised LLM agents process the recorded telemetry data for
        structured analysis. Both use the same Granite 4.0-Micro architecture as the live race
        engineer, but with a separate fine-tuned model optimised for longer-form analytical
        output [2].
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
          mechanism</strong> — if the response appears cut off, a more concise prompt is retried.
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
            <td>5 seconds</td>
            <td>No hard limit</td>
          </tr>
        </tbody>
      </table>

      <h3>Input Telemetry Schema</h3>
      <p>
        Telemetry is read from Assetto Corsa's Windows shared memory interface at ~60 Hz. Each
        telemetry frame is a structured dictionary validated using Pydantic models with type
        constraints (e.g., temperatures &ge; 0, throttle/brake clamped to 0.0-1.0). Invalid frames
        are rejected before reaching the event detection pipeline.
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>speed</td>
            <td>float</td>
            <td>Vehicle speed (km/h)</td>
          </tr>
          <tr>
            <td>rpm</td>
            <td>int</td>
            <td>Engine RPM</td>
          </tr>
          <tr>
            <td>gear</td>
            <td>int</td>
            <td>Current gear (-1=reverse, 0=neutral, 1-8)</td>
          </tr>
          <tr>
            <td>throttle</td>
            <td>float</td>
            <td>Throttle input (0.0-1.0)</td>
          </tr>
          <tr>
            <td>brake</td>
            <td>float</td>
            <td>Brake input (0.0-1.0)</td>
          </tr>
          <tr>
            <td>fuel</td>
            <td>float</td>
            <td>Remaining fuel (litres)</td>
          </tr>
          <tr>
            <td>tyre_temp_&#123;fl,fr,rl,rr&#125;</td>
            <td>float</td>
            <td>Tyre core temperature (&#176;C) per corner</td>
          </tr>
          <tr>
            <td>tyre_pressure_&#123;fl,fr,rl,rr&#125;</td>
            <td>float</td>
            <td>Tyre pressure (PSI) per corner</td>
          </tr>
          <tr>
            <td>position_x, position_z</td>
            <td>float</td>
            <td>World position (metres)</td>
          </tr>
          <tr>
            <td>lap_number</td>
            <td>int</td>
            <td>Current lap index (0-indexed)</td>
          </tr>
          <tr>
            <td>position</td>
            <td>int</td>
            <td>Race position (1-indexed)</td>
          </tr>
          <tr>
            <td>gap_ahead, gap_behind</td>
            <td>float</td>
            <td>Gap to adjacent cars (seconds)</td>
          </tr>
          <tr>
            <td>car_damage_&#123;front,rear,left,right,centre&#125;</td>
            <td>float</td>
            <td>Damage per zone (0.0 = none)</td>
          </tr>
          <tr>
            <td>g_force_lat, g_force_lon</td>
            <td>float</td>
            <td>G-forces (g)</td>
          </tr>
          <tr>
            <td>wheel_slip_&#123;fl,fr,rl,rr&#125;</td>
            <td>float</td>
            <td>Wheel slip ratio per corner</td>
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
            <td>15-25 words</td>
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
        errors by an estimated 15-20% compared to default Whisper (e.g., "pit stop" instead of "pet
        stop", "tyre" instead of "tire" for British English) [5].
      </p>

      <h2>Limitations and Future Work</h2>

      <h3>Known Limitations</h3>
      <ul>
        <li>
          <strong>LLM hallucinations under sparse context:</strong> When telemetry data is
          incomplete (e.g., gap data unavailable in certain modes), the model occasionally
          fabricates gap times or opponent information despite explicit prompt constraints. The
          4-bit quantised model has reduced capacity to follow negative instructions compared to
          full-precision models [3]. The guardrail system catches approximately 50% of these cases.
        </li>
        <li>
          <strong>Voice recognition in high-noise environments:</strong> The Whisper base model
          struggles with short, domain-specific queries in noisy racing environments (WER &gt; 20%).
          Common failure modes include:
          <ul>
            <li>Misrecognition of similar-sounding terms ("brake" vs. "break", "tyre" vs. "tire")</li>
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
          small or medium would significantly reduce WER in noisy environments [5], but requires
          GPU acceleration to maintain acceptable latency. Alternatively, domain-specific
          fine-tuning of the Whisper model on racing audio data would improve recognition without
          increasing model size.
        </li>
        <li>
          <strong>Retrieval-augmented generation (RAG):</strong> Rather than relying solely on the
          current telemetry frame and rolling buffer, a RAG system could retrieve relevant
          historical data (previous session performance, track-specific insights) to provide richer
          context for LLM responses [11].
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
          responses.
        </li>
      </ol>

      <h2>References</h2>
      <ol className="ref-list">
        <li>
          [1] Erman, L. D. et al. — <em>The Hearsay-II Speech-Understanding System: Integrating Knowledge to Resolve Uncertainty</em> (ACM Computing Surveys, 1980)
        </li>
        <li>
          [2] Mishra, M. et al. — <em>Granite Code Models: A Family of Open Foundation Models for Code Intelligence</em> (IBM Research, 2024):{' '}
          <a href="https://arxiv.org/abs/2405.04324" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2405.04324
          </a>
        </li>
        <li>
          [3] Dettmers, T. et al. — <em>QLoRA: Efficient Finetuning of Quantized Language Models</em> (NeurIPS 2023):{' '}
          <a href="https://arxiv.org/abs/2305.14314" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2305.14314
          </a>
        </li>
        <li>
          [4] Gerganov, G. — <em>llama.cpp: LLM Inference in C/C++</em> (GitHub, 2023):{' '}
          <a href="https://github.com/ggerganov/llama.cpp" target="_blank" rel="noopener noreferrer">
            https://github.com/ggerganov/llama.cpp
          </a>
        </li>
        <li>
          [5] Radford, A. et al. — <em>Robust Speech Recognition via Large-Scale Weak Supervision</em> (ICML 2023):{' '}
          <a href="https://arxiv.org/abs/2212.04356" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2212.04356
          </a>
        </li>
        <li>
          [6] Klein, G. — <em>CTranslate2: Fast Inference Engine for Transformer Models</em> (GitHub, 2020):{' '}
          <a href="https://github.com/OpenNMT/CTranslate2" target="_blank" rel="noopener noreferrer">
            https://github.com/OpenNMT/CTranslate2
          </a>
        </li>
        <li>
          [7] Google — <em>WebRTC: Real-Time Communication for the Web</em> (2011):{' '}
          <a href="https://webrtc.org/" target="_blank" rel="noopener noreferrer">
            https://webrtc.org/
          </a>
        </li>
        <li>
          [8] Hexgrad — <em>Kokoro: Lightweight Neural Text-to-Speech</em> (GitHub, 2024):{' '}
          <a href="https://github.com/hexgrad/kokoro" target="_blank" rel="noopener noreferrer">
            https://github.com/hexgrad/kokoro
          </a>
        </li>
        <li>
          [9] ONNX Runtime developers — <em>ONNX Runtime: Cross-Platform, High Performance ML Inferencing and Training Accelerator</em> (Microsoft, 2019):{' '}
          <a href="https://onnxruntime.ai/" target="_blank" rel="noopener noreferrer">
            https://onnxruntime.ai/
          </a>
        </li>
        <li>
          [10] Jaccard, P. — <em>The Distribution of the Flora in the Alpine Zone</em> (New Phytologist, 1912)
        </li>
        <li>
          [11] Lewis, P. et al. — <em>Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks</em> (NeurIPS 2020):{' '}
          <a href="https://arxiv.org/abs/2005.11401" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2005.11401
          </a>
        </li>
        <li>
          [12] Leviathan, Y. et al. — <em>Fast Inference from Transformers via Speculative Decoding</em> (ICML 2023):{' '}
          <a href="https://arxiv.org/abs/2211.17192" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2211.17192
          </a>
        </li>
      </ol>
      </>)}

      {activeTab === 'Fine Tuning' && (<>
      <p>
        A detailed account of the machine learning approach underpinning Jarvis:
        why fine-tuning was chosen over alternative LLM strategies, how QLoRA makes it
        feasible, how two specialised models were trained for distinct inference contexts,
        and the rule-based event detection system that operates alongside the LLM.
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

      <h2>Inference Architecture</h2>

      <h3>Two-Layer Detection System</h3>
      <p>
        The live AI race engineer operates as a two-layer system: a fast rule-based telemetry
        agent for event detection, and a slower LLM agent for natural language response
        generation.
      </p>

      <table className="section-table">
        <thead>
          <tr>
            <th>Layer</th>
            <th>Component</th>
            <th>Latency</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1 — Detection</td>
            <td>TelemetryAgent (rule-based)</td>
            <td>&lt;50ms</td>
            <td>Evaluates telemetry against thresholds; emits typed events with priority levels</td>
          </tr>
          <tr>
            <td>2 — Generation</td>
            <td>RaceEngineerAgent (LLM)</td>
            <td>~2–5s</td>
            <td>Receives events + session context; generates natural language response via GGUF inference</td>
          </tr>
        </tbody>
      </table>

      <h3>Event Detection Thresholds</h3>
      <p>
        The rule-based TelemetryAgent monitors live telemetry against configurable thresholds
        to detect race-critical events without LLM involvement:
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Event Category</th>
            <th>Warning Threshold</th>
            <th>Critical Threshold</th>
            <th>Cooldown</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fuel Remaining</td>
            <td>≤ 5 laps</td>
            <td>≤ 2 laps</td>
            <td>60s / 45s</td>
          </tr>
          <tr>
            <td>Tire Temperature</td>
            <td>≥ 100°C</td>
            <td>≥ 110°C</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Tire Wear</td>
            <td>≥ 70%</td>
            <td>≥ 85%</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Wheel Slip</td>
            <td>≥ 50.0 ratio</td>
            <td>≥ 100.0 ratio</td>
            <td>Speed &gt; 10 km/h filter</td>
          </tr>
          <tr>
            <td>Gap Change</td>
            <td colSpan="2">≥ 1.0s change (ahead or behind)</td>
            <td>—</td>
          </tr>
        </tbody>
      </table>

      <h3>Event Priority System</h3>
      <p>
        Detected events are assigned one of four priority levels that determine how they
        are queued and whether they interrupt ongoing LLM generation:
      </p>
      <ul>
        <li><strong>CRITICAL (0):</strong> Immediate interrupts — fuel critical, brake failure, collision</li>
        <li><strong>HIGH (1):</strong> Urgent alerts — pit now, tire failure, wheel slip critical</li>
        <li><strong>MEDIUM (2):</strong> Queued normally — pit window open, gap changes, lap summary</li>
        <li><strong>LOW (3):</strong> Skipped if busy — sector times, minor telemetry updates</li>
      </ul>

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