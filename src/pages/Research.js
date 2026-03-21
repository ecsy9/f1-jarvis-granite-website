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
            <th>Limitation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>MoTeC / Atlas</td>
            <td>Professional telemetry</td>
            <td>Prohibitive cost; requires specialist operators</td>
          </tr>
          <tr>
            <td>RaceLab</td>
            <td>Sim racing overlay</td>
            <td>Display-only; no AI analysis or strategy</td>
          </tr>
          <tr>
            <td>FastF1</td>
            <td>Python analysis library</td>
            <td>Post-race only; no real-time or vocal output</td>
          </tr>
          <tr>
            <td>CAN bus loggers</td>
            <td>Hardware data logging</td>
            <td>Raw data only; requires manual analysis</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Critical Gap:</strong> No unified platform currently integrates real-time sensors,
        multiple simulators, and autonomous AI strategy generation with vocal output.
      </p>

      <h2>Machine Learning Approach</h2>
      <p>
        The core challenge was producing a model that sounds like a real race engineer — not
        just one that knows F1 facts, but one that has internalised the tone, pacing, and
        priorities of pit-wall communication. Fine-tuning on domain-specific telemetry data
        achieves this by adjusting the model weights directly, rather than trying to steer
        a generic model through prompts at each call. The platform uses two fine-tuned Granite 4.0 Micro
        instances via QLoRA: one for real-time radio-style commentary, and one for
        structured post-race debriefs. For a full technical breakdown, see
        the <Link to="/algorithms">Algorithms</Link> page.
      </p>

      <h2>Related Projects Review</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Main Features</th>
            <th>Learnings for F1 Jarvis Granite</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>FastF1</strong> [1]</td>
            <td>
              Python library for post-race Formula 1 telemetry analysis; data visualization;
              lap comparison; session replay
            </td>
            <td>
              Demonstrates scalable post-race replay architectures and telemetry data structures.
              However, FastF1 is limited to post-race analysis without real-time or AI features.
              Our project extends this by adding live analysis and AI-driven strategy recommendations.
            </td>
          </tr>
          <tr>
            <td><strong>RaceLab</strong> [2]</td>
            <td>
              Real-time sim racing overlay; lap time tracking; performance metrics; visual dashboard overlay
            </td>
            <td>
              Shows the value of real-time overlays for sim racing engagement. RaceLab lacks AI analysis
              and conversational interface. We learned that overlays must be non-intrusive and context-aware —
              design principles applied to both our 2D dashboard and VR environments.
            </td>
          </tr>
          <tr>
            <td><strong>MoTeC / Atlas</strong></td>
            <td>
              Professional telemetry system; real-time data visualization; post-race analysis;
              multi-car telemetry comparison; advanced signal processing
            </td>
            <td>
              Industry gold standard for telemetry visualisation. Our 2D dashboard is explicitly inspired
              by MoTeC's layout and interaction patterns. Key insight: professional systems prioritise
              clarity over data density. We adopted this principle while reducing complexity through AI guidance.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Technology Review</h2>

      <h3>AI Solutions: LLM Selection</h3>
      <p>
        For detailed LLM platform trade-offs and selection rationale, see the <Link to="/algorithms">Algorithms</Link> page.
      </p>

      <h3>Fine-Tuning Algorithms</h3>
      <p>
        For technical details on QLoRA, parameter-efficient fine-tuning, and model training, see the <Link to="/algorithms">Algorithms</Link> page.
      </p>

      <h3>Data Integration Technologies</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Technology</th>
            <th>Use Case</th>
            <th>Alternative</th>
            <th>Why Chosen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>CAN Bus (ISO 11898)</strong> [3] [4]</td>
            <td>Vehicle telemetry from Formula Student car via ECU</td>
            <td>OBD-II (simpler but lower frequency); custom wireless (complex)</td>
            <td>
              Industry standard in automotive/motorsport; high-frequency support (1+ kHz); reliable;
              proven in safety-critical systems
            </td>
          </tr>
          <tr>
            <td><strong>UDP for TORCS</strong> [5]</td>
            <td>Real-time simulator telemetry extraction</td>
            <td>TCP (more reliable but higher latency); shared memory (TORCS-specific)</td>
            <td>
              Minimises latency; stateless; TORCS natively supports UDP output; simple protocol
            </td>
          </tr>
          <tr>
            <td><strong>Shared Memory for Assetto Corsa</strong></td>
            <td>Live data from Assetto Corsa simulator</td>
            <td>UDP or network streaming</td>
            <td>
              Assetto Corsa's native protocol; lowest latency; reliable on same OS; industry standard for sim racing
            </td>
          </tr>
          <tr>
            <td><strong>InfluxDB (Time-Series DB)</strong> [6]</td>
            <td>Persistent storage of all telemetry sessions</td>
            <td>PostgreSQL (relational); MongoDB (document-oriented); Prometheus (metrics-focused)</td>
            <td>
              Optimised for high-frequency sensor data; columnar compression; tag-based indexing;
              sub-500ms query performance at scale
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Programming Stack & Frameworks</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Technology</th>
            <th>Rationale</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Backend API</td>
            <td><strong>Python + FastAPI</strong></td>
            <td>
              Fast async web framework; native integration with Python ML ecosystem;
              type hints for robustness; built-in WebSocket support for real-time streaming
            </td>
          </tr>
          <tr>
            <td>2D Dashboard</td>
            <td><strong>Python (Matplotlib / PyQt)</strong></td>
            <td>
              MoTeC-inspired visualisations easily constructed; tight integration with backend;
              real-time rendering at 60+ FPS feasible
            </td>
          </tr>
          <tr>
            <td>VR Platform</td>
            <td><strong>Unreal Engine 5 (C++)</strong> [7]</td>
            <td>
              Industry-standard VR tooling; native SteamVR / Meta Quest support; performance optimisation
              for VR (90+ FPS); 3D CAD model integration; Blueprint scripting for rapid iteration
            </td>
          </tr>
          <tr>
            <td>Multi-Agent Orchestration</td>
            <td><strong>Jarvis</strong></td>
            <td>
              Specialised multi-agent framework; fault isolation between AI components;
              independent scaling of telemetry, strategy, and conversation agents
            </td>
          </tr>
          <tr>
            <td>Version Control</td>
            <td><strong>Git / GitHub</strong></td>
            <td>
              Distributed VCS; CI/CD integration ready; team collaboration; academic free tier
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Summary of Technical Decisions</h2>
      <p>
        The F1 Jarvis Granite platform consolidates multiple technical domains—AI/ML, real-time data integration,
        database systems, and immersive interfaces—into a cohesive architecture. Key decisions reflect constraints
        of academic development, computational resources, and the motorsport domain:
      </p>
      <ul>
        <li>
          <strong>Granite 4.0 Micro + QLoRA for AI:</strong> Prioritises domain specialisation and resource efficiency
          over raw model scale. QLoRA enables practical fine-tuning within academic GPU budgets while maintaining
          motorsport terminology and strategy generation quality.
        </li>
        <li>
          <strong>Multi-source data integration (CAN bus, TORCS, Assetto Corsa):</strong> Reflects the project's
          dual focus on professional (Formula Student) and consumer (sim racing) audiences. Separate integration
          pipelines accept the complexity trade-off for breadth of telemetry sources.
        </li>
        <li>
          <strong>InfluxDB for telemetry storage:</strong> High-frequency sensor data demands time-series optimisation.
          InfluxDB's columnar compression and tag-based indexing enable efficient storage and sub-500ms queries
          critical for both real-time dashboards and post-race analysis.
        </li>
        <li>
          <strong>Python backend (FastAPI) + Unreal Engine 5 VR:</strong> Decouples data/AI services (Python ecosystem)
          from immersive rendering (UE5 expertise and performance). Fast iteration on backend logic while leveraging
          industry-standard VR tooling.
        </li>
        <li>
          <strong>MoTeC-inspired 2D dashboard:</strong> Professional motorsport systems prioritise clarity over
          comprehensive data density. Our dashboard borrows proven UX patterns from MoTeC while reducing cognitive
          load through AI-guided insights, making professional-grade telemetry accessible to non-experts.
        </li>
      </ul>

      <h2>References</h2>
      <ol className="ref-list">
        <li>
          [1] GitHub — <em>formula1-telemetry-tool</em> (2022):{' '}
          <a href="https://github.com/hynesconnor/formula1-telemetry-tool" target="_blank" rel="noopener noreferrer">
            https://github.com/hynesconnor/formula1-telemetry-tool
          </a>
        </li>
        <li>
          [2] All Creator Tools — <em>Overlays for Sim Racing: RaceLab and Its Alternatives</em> (2025):{' '}
          <a href="https://allcreatortools.com/blog/overlays-for-sim-racing-racelab-and-its-alternatives" target="_blank" rel="noopener noreferrer">
            https://allcreatortools.com/blog/overlays-for-sim-racing-racelab-and-its-alternatives
          </a>
        </li>
        <li>
          [3] EMQX — <em>CAN Bus: How It Works, Pros and Cons</em> (2025):{' '}
          <a href="https://www.emqx.com/en/blog/can-bus-how-it-works-pros-and-cons" target="_blank" rel="noopener noreferrer">
            https://www.emqx.com/en/blog/can-bus-how-it-works-pros-and-cons
          </a>
        </li>
        <li>
          [4] AutoPi — <em>How to Read CAN Bus Data</em> (2025):{' '}
          <a href="https://www.autopi.io/blog/how-to-read-can-bus-data/" target="_blank" rel="noopener noreferrer">
            https://www.autopi.io/blog/how-to-read-can-bus-data/
          </a>
        </li>
        <li>
          [5] Missouri State Computer Science — <em>TORCS Simulated Car Racing Championship Competition Software Manual</em>:{' '}
          <a href="https://computerscience.missouristate.edu/SAIL/_Files/Simulated-Car-Racing-Championship-Competition-Software-Manual.pdf" target="_blank" rel="noopener noreferrer">
            https://computerscience.missouristate.edu/SAIL/_Files/Simulated-Car-Racing-Championship-Competition-Software-Manual.pdf
          </a>
        </li>
        <li>
          [6] InfluxDB Documentation — <em>InfluxDB v2.6 Documentation</em>:{' '}
          <a href="https://docs.influxdata.com/influxdb/v2.6/" target="_blank" rel="noopener noreferrer">
            https://docs.influxdata.com/influxdb/v2.6/
          </a>
        </li>
        <li>
          [7] Epic Games — <em>Unreal Engine 5 VR Development Documentation</em>:{' '}
          <a href="https://docs.unrealengine.com/5.3/en-US/unreal-engine-vr-development/" target="_blank" rel="noopener noreferrer">
            https://docs.unrealengine.com/5.3/en-US/unreal-engine-vr-development/
          </a>
        </li>
      </ol>
    </SectionPage>
  );
}

export default Research;
