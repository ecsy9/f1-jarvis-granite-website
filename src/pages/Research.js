import { Link } from 'react-router-dom';
import SectionPage from '../components/SectionPage';

function Research() {
  return (
    <SectionPage title="Research">

    <h2>Existing Solutions & Limitations</h2>
    <table className="section-table">
      <thead>
        <tr>
          <th>Solution</th>
          <th>Type</th>
          <th>Key Strength</th>
          <th>Limitation</th>
          <th>Influence on F1 Jarvis Granite</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>MoTeC / Atlas</strong></td>
          <td>Professional telemetry suite</td>
          <td>Industry-standard data acquisition & visualisation</td>
          <td>Prohibitive licensing cost; requires dedicated specialist operators; inaccessible to amateur or sim racing contexts</td>
          <td>Our 2D dashboard is explicitly inspired by MoTeC's layout — clarity over data density, with AI guidance reducing the need for specialist operators</td>
        </tr>
        <tr>
          <td><strong>RaceLab</strong> [2]</td>
          <td>Sim racing overlay</td>
          <td>Polished real-time HUD for iRacing & ACC</td>
          <td>Display-only; no AI-driven analysis, strategy recommendations, or vocal feedback</td>
          <td>Validated the value of real-time overlays; informed our design principle that overlays must be non-intrusive and context-aware across both 2D and VR environments</td>
        </tr>
        <tr>
          <td><strong>FastF1</strong> [1]</td>
          <td>Python telemetry library</td>
          <td>Rich historical F1 data via the Ergast &amp; F1 Live APIs</td>
          <td>Post-race analysis only; no real-time ingestion, live strategy output, or voice interface</td>
          <td>Demonstrated scalable telemetry data structures and replay architectures; we extend this foundation with live ingestion and AI-driven strategy</td>
        </tr>
        <tr>
          <td><strong>Crew Chief</strong> [3]</td>
          <td>Rule-Based race engineer (sim)</td>
          <td>Voice-based spotter & engineer for iRacing / ACC</td>
          <td>Rule-based scripted responses; no generative AI or multi-simulator sensor fusion</td>
          <td>Established user appetite for a vocal race engineer; we replace scripted logic with a generative AI backend capable of dynamic, context-aware strategy</td>
        </tr>
        <tr>
          <td><strong>Custom Python scripts</strong></td>
          <td>Ad-hoc telemetry tooling</td>
          <td>Flexible & low-cost</td>
          <td>No standardised interface; single-simulator; no AI layer or vocal output</td>
          <td>Highlighted the need for a unified, simulator-agnostic platform — a core architectural goal of F1 Jarvis Granite</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>Critical Gap:</strong> No existing solution unifies real-time multi-simulator telemetry
      ingestion, physical sensor integration, and autonomous AI strategy generation with a natural
      language vocal interface — the combination that <em>F1 Jarvis Granite</em> is built to deliver.
    </p>

      <h2>Machine Learning Approach</h2>
      <p>
        The core challenge was producing a model that behaves like a real race engineer — not
        just one that knows some F1 facts, but one that has internalised the pacing and
        priorities of pit-wall communication. Fine-tuning on domain-specific telemetry data
        achieves this by adjusting the model weights directly, rather than trying to steer
        a generic model through prompts at each call. The platform uses two fine-tuned Granite 4.0 Micro [4]
        instances via QLoRA [5]: one for real-time radio-style commentary, and one for
        structured post-race debriefs. For a full technical breakdown, see
        the <Link to="/algorithms">Algorithms</Link> page.
      </p>
      <h2>Technology Review</h2>

      <h3>AI Solutions: LLM Selection</h3>
      <p>
        For detailed LLM platform trade-offs and selection rationale, see the <Link to="/algorithms">Algorithms</Link> page.
      </p>

      <h3>Fine-Tuning Algorithms</h3>
      <p>
        For technical details on QLoRA, parameter-efficient fine-tuning, and model training, see the <Link to="/algorithms">Algorithms</Link> page.
      </p>
      <h3>Simulator Selection</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Simulator</th>
            <th>Strengths</th>
            <th>Weaknesses</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Assetto Corsa ✓</strong></td>
            <td>
              Highly realistic physics engine; extensive shared memory API exposing 50+ telemetry channels;
              large active community; affordable price point; deep modding support allows custom cars with accurate
              physics models; widely used as a testing simulator by motorsport teams
            </td>
            <td>Shared memory is Windows-only; ageing graphics engine (2014)</td>
          </tr>
          <tr>
            <td>EA F1 Series</td>
            <td>Official F1 licence; large casual player base; UDP telemetry API</td>
            <td>
              Simplified physics model prioritising accessibility over realism; limited telemetry depth;
              no modding support; cannot replicate custom car physics; annual release cycle with breaking API changes
            </td>
          </tr>
          <tr>
            <td>iRacing</td>
            <td>Professional-grade physics; large competitive community; good telemetry API</td>
            <td>
              Expensive subscription model (~£13/month + per-track/car purchases); no modding or custom car support;
              closed ecosystem unsuitable for Formula Student car replication
            </td>
          </tr>
          <tr>
            <td>Assetto Corsa Competizione</td>
            <td>Modern graphics; official GT3/GT4 licence; UDP broadcasting API</td>
            <td>
              Broadcasting API provides very limited telemetry (no RPM, throttle, brake, fuel, tire data);
              no modding support; locked to GT racing categories; cannot import custom car models
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Decision:</strong> Assetto Corsa was selected as the primary platform for three reasons.
        First, its shared memory API provides the richest telemetry data of any consumer sim — over 50 channels
        at ~60Hz including tire temperatures, pressures, suspension travel, camber, fuel, and damage.
        Second, its modding ecosystem allows custom cars with fully configurable physics parameters, which is
        critical for our partnership with the UCLR Formula Student team. By modelling their actual car's physics
        in AC, the team can use Jarvis as a virtual testing environment to evaluate car performance, validate
        setup changes, and iterate on vehicle design before physical testing. Third, AC's large user base and
        low price point ensure accessibility for both professional and hobbyist users.
      </p>

      <h3>Telemetry Data Sourcing</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Technology</th>
            <th>Use Case</th>
            <th>Alternatives Considered</th>
            <th>Why Chosen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Windows Shared Memory (AC)</strong></td>
            <td>Primary telemetry source from Assetto Corsa</td>
            <td>UDP networking (higher latency); file-based logging (not real-time)</td>
            <td>
              AC's native telemetry protocol; zero network overhead; lowest possible latency;
              provides full telemetry — speed, RPM, throttle, brake, tire temps/pressures, suspension, camber, fuel, damage
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Data Storage</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Technology</th>
            <th>Use Case</th>
            <th>Alternatives Considered</th>
            <th>Why Chosen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>SQLite</strong> [10]</td>
            <td>Persistent storage of telemetry sessions, laps, AI commentary</td>
            <td>InfluxDB [11] (time-series optimised but heavy dependency); PostgreSQL (requires server); JSON files (no query capability)</td>
            <td>
              Zero-config embedded database; no server process required; portable single-file storage;
              works well with PyInstaller distribution; sufficient performance with batch inserts at 60 samples/sec
            </td>
          </tr>
        </tbody>
      </table>

      <h3>AI &amp; Speech Technologies</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Technology</th>
            <th>Use Case</th>
            <th>Alternatives Considered</th>
            <th>Why Chosen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>llama-cpp-python (GGUF)</strong> [6]</td>
            <td>Local LLM inference for race engineer and post-race analyst</td>
            <td>Hugging Face Transformers (higher VRAM); cloud APIs like OpenAI (requires internet, adds latency); ONNX Runtime (less model support)</td>
            <td>
              Runs quantised models on consumer CPUs; no GPU required; fully offline after first download;
              Q4_K_M quantisation balances quality and performance (~2GB per model)
            </td>
          </tr>
          <tr>
            <td><strong>Faster-Whisper</strong> [7]</td>
            <td>Speech-to-text for driver voice queries</td>
            <td>OpenAI Whisper API (requires internet); Google Speech-to-Text (cloud dependency); Vosk (lower accuracy)</td>
            <td>
              Runs entirely locally; no API keys needed; CTranslate2 backend for fast inference;
              custom initial prompt seeded with F1/racing vocabulary for domain-specific accuracy
            </td>
          </tr>
          <tr>
            <td><strong>Kokoro TTS</strong> [8]</td>
            <td>Text-to-speech for AI race engineer audio output</td>
            <td>Piper TTS (lighter but lower quality); cloud TTS services (latency, internet required); eSpeak (robotic quality)</td>
            <td>
              Natural-sounding local speech synthesis; no API keys; low latency; configurable voice selection
            </td>
          </tr>
          <tr>
            <td><strong>WebRTC VAD</strong> [9]</td>
            <td>Voice activity detection for push-to-talk and hands-free modes</td>
            <td>Energy-based VAD (simple but noisy); Silero VAD (heavier model); always-on recording (wastes resources)</td>
            <td>
              Lightweight C library; low CPU overhead; reliable speech/silence classification;
              enables auto-pause during TTS playback to prevent echo
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Programming Stack &amp; Frameworks</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Technology</th>
            <th>Alternatives Considered</th>
            <th>Rationale</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Application Framework</td>
            <td><strong>Python + PyQt5</strong></td>
            <td>Electron (heavier, web-based); Tkinter (limited widgets); C++ Qt (faster but slower development)</td>
            <td>
              Native desktop widgets; multi-threaded via QThread; direct integration with Python ML/AI libraries;
              Matplotlib embedding for telemetry graphs; cross-platform toolkit
            </td>
          </tr>
          <tr>
            <td>Telemetry Visualisation</td>
            <td><strong>Matplotlib</strong></td>
            <td>PyQtGraph (faster but less flexible); Plotly (web-focused); custom OpenGL (complex)</td>
            <td>
              Rich plotting API; easy PyQt5 embedding via FigureCanvas; supports track maps, time-series,
              multi-line tire plots, and XY scatter (camber gain); sufficient performance at 12Hz update rate
            </td>
          </tr>
          <tr>
            <td>Data Validation</td>
            <td><strong>Pydantic</strong></td>
            <td>dataclasses (no validation); marshmallow (less Pythonic); manual validation (error-prone)</td>
            <td>
              Type-safe telemetry models with field validation; automatic range checking on tire temps,
              pressures, and wear; clean schema definitions for AI pipeline
            </td>
          </tr>
          <tr>
            <td>VR Platform</td>
            <td><strong>Unreal Engine 5 (C++)</strong> [12]</td>
            <td>Unity (C#, smaller community for VR); Godot (less VR tooling); WebXR (limited performance)</td>
            <td>
              Industry-standard VR tooling; native SteamVR / Meta Quest support;
              performance optimisation for VR (90+ FPS); Blueprint scripting for rapid iteration
            </td>
          </tr>
          <tr>
            <td>Distribution</td>
            <td><strong>PyInstaller</strong></td>
            <td>cx_Freeze (less community support); Nuitka (compilation complexity); pip install (requires Python)</td>
            <td>
              Bundles Python runtime and all dependencies into single executable;
              end users need no Python installation; .spec file for reproducible builds
            </td>
          </tr>
          <tr>
            <td>Version Control</td>
            <td><strong>Git / GitHub</strong></td>
            <td>GitLab (self-hosted option); SVN (centralised); Bitbucket (smaller ecosystem)</td>
            <td>
              Distributed VCS; pull request workflow for team collaboration; GitHub Actions for CI/CD
            </td>
          </tr>
        </tbody>
      </table>


      <h2>Summary of Technical Decisions</h2>
      <p>
        The Jarvis platform consolidates multiple technical domains—AI/ML, real-time data integration,
        local inference, and immersive interfaces—into a cohesive architecture. Key decisions reflect constraints
        of academic development, computational resources, and the motorsport domain:
      </p>
      <ul>
        <li>
          <strong>Granite 4.0 Micro + QLoRA for AI:</strong> Prioritises domain specialisation and resource efficiency
          over raw model scale. QLoRA enables practical fine-tuning within academic GPU budgets while maintaining
          motorsport terminology and strategy generation quality. Models quantised to Q4_K_M GGUF for consumer CPU inference.
        </li>
        <li>
          <strong>Assetto Corsa shared memory for telemetry:</strong> Provides the richest available telemetry data
          at ~60Hz with zero network overhead — speed, RPM, tire temps/pressures, suspension travel, camber, fuel,
          and damage zones. The lowest-latency option for sim racing integration.
        </li>
        <li>
          <strong>SQLite for session storage:</strong> Embedded database requires no server process or configuration,
          making it ideal for single-executable distribution. Batch inserts handle 60 samples/sec without blocking the UI,
          and the portable single-file format enables .jsession export/import for sharing sessions between users.
        </li>
        <li>
          <strong>Fully offline AI pipeline:</strong> Local LLM inference via llama-cpp-python, local speech-to-text
          via Faster-Whisper, and local TTS via Kokoro. No cloud dependencies or API keys required during sessions,
          ensuring consistent performance regardless of internet connectivity.
        </li>
        <li>
          <strong>Python + PyQt5 desktop application:</strong> Tight integration between the AI/ML ecosystem and native
          desktop UI. QThread-based architecture isolates telemetry reading, AI inference, voice input, and TTS output
          into independent threads. PyInstaller bundles everything into a single executable requiring no Python installation.
        </li>
        <li>
          <strong>MoTeC-inspired 2D dashboard:</strong> Professional motorsport systems prioritise clarity over
          comprehensive data density. The dashboard borrows proven UX patterns from MoTeC while reducing cognitive
          load through AI-guided insights, making professional-grade telemetry accessible to non-experts.
        </li>
      </ul>

      <h2>References</h2>
      <ol className="ref-list">
        <li>
          [1] Schaefer, P. — <em>Fast-F1: A Python package for accessing and analysing Formula 1 results, schedules, timing data and telemetry</em> (GitHub, 2024):{' '}
          <a href="https://github.com/theOehrly/Fast-F1" target="_blank" rel="noopener noreferrer">
            https://github.com/theOehrly/Fast-F1
          </a>
        </li>
        <li>
          [2] All Creator Tools — <em>Overlays for Sim Racing: RaceLab and Its Alternatives</em> (2025):{' '}
          <a href="https://allcreatortools.com/blog/overlays-for-sim-racing-racelab-and-its-alternatives" target="_blank" rel="noopener noreferrer">
            https://allcreatortools.com/blog/overlays-for-sim-racing-racelab-and-its-alternatives
          </a>
        </li>
        <li>
          [3] JB418 — <em>CrewChiefV4: A race engineer app for multiple racing simulations</em> (GitHub, 2024):{' '}
          <a href="https://github.com/mrbelowski/CrewChiefV4" target="_blank" rel="noopener noreferrer">
            https://github.com/mrbelowski/CrewChiefV4
          </a>
        </li>
        <li>
          [4] IBM Research — <em>Granite 4.0: IBM's Compact Foundation Model Family</em> (2025):{' '}
          <a href="https://huggingface.co/collections/ibm-granite/granite-40-language-models-6822f6f92c8e5e62d3b59f25" target="_blank" rel="noopener noreferrer">
            https://huggingface.co/collections/ibm-granite/granite-40-language-models
          </a>
        </li>
        <li>
          [5] Dettmers, T. et al. — <em>QLoRA: Efficient Finetuning of Quantized LLMs</em> (NeurIPS 2023):{' '}
          <a href="https://arxiv.org/abs/2305.14314" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2305.14314
          </a>
        </li>
        <li>
          [6] Abella, A. — <em>llama-cpp-python: Python bindings for llama.cpp</em> (GitHub, 2024):{' '}
          <a href="https://github.com/abetlen/llama-cpp-python" target="_blank" rel="noopener noreferrer">
            https://github.com/abetlen/llama-cpp-python
          </a>
        </li>
        <li>
          [7] SYSTRAN — <em>faster-whisper: Faster Whisper transcription with CTranslate2</em> (GitHub, 2024):{' '}
          <a href="https://github.com/SYSTRAN/faster-whisper" target="_blank" rel="noopener noreferrer">
            https://github.com/SYSTRAN/faster-whisper
          </a>
        </li>
        <li>
          [8] hexgrad — <em>Kokoro: A lightweight TTS model</em> (GitHub, 2025):{' '}
          <a href="https://github.com/hexgrad/kokoro" target="_blank" rel="noopener noreferrer">
            https://github.com/hexgrad/kokoro
          </a>
        </li>
        <li>
          [9] Wiseman, J. — <em>py-webrtcvad: Python interface to the WebRTC Voice Activity Detector</em> (GitHub, 2022):{' '}
          <a href="https://github.com/wiseman/py-webrtcvad" target="_blank" rel="noopener noreferrer">
            https://github.com/wiseman/py-webrtcvad
          </a>
        </li>
        <li>
          [10] SQLite Consortium — <em>SQLite: A C-language library that implements a small, fast, self-contained SQL database engine</em>:{' '}
          <a href="https://www.sqlite.org" target="_blank" rel="noopener noreferrer">
            https://www.sqlite.org
          </a>
        </li>
        <li>
          [11] InfluxData — <em>InfluxDB v2.6 Documentation</em>:{' '}
          <a href="https://docs.influxdata.com/influxdb/v2.6/" target="_blank" rel="noopener noreferrer">
            https://docs.influxdata.com/influxdb/v2.6/
          </a>
        </li>
        <li>
          [12] Epic Games — <em>Unreal Engine 5 VR Development Documentation</em>:{' '}
          <a href="https://docs.unrealengine.com/5.3/en-US/unreal-engine-vr-development/" target="_blank" rel="noopener noreferrer">
            https://docs.unrealengine.com/5.3/en-US/unreal-engine-vr-development/
          </a>
        </li>
      </ol>
    </SectionPage>
  );
}

export default Research;
