import SectionPage from '../components/SectionPage';

function Requirements() {
  return (
    <SectionPage title="Requirements">
      <p>
        Requirements were gathered through a structured HCI process: semi-structured interviews,
        persona construction, scenario-based design, low-fidelity sketches, and iterative prototype
        evaluation. This pipeline ensured that system requirements reflect genuine user needs
        rather than developer assumptions.
      </p>

      <h2>Gathering User Requirements</h2>
      <p>
        Semi-structured interviews were selected as the primary requirements gathering technique
        since they provide the optimal balance between structured data collection and exploratory
        flexibility. [1] This approach allowed us to probe deeply into users' mental models while
        maintaining consistency across interviews, following established HCI best practices for
        understanding domain-specific user needs. Below are representative responses from two
        user groups: a competitive racing simulation gamer and an F1 race engineer.
      </p>

      <div className="profile-cards">
        <div className="profile-card">
          <div className="profile-card__title">Competitive Gamer</div>
          <div className="profile-card__body">
            <p><strong>Do you use any AI-powered tools to analyse your race performance?</strong></p>
            <p>"Not really. I've tried a few telemetry overlays in Assetto Corsa or F1 22, but they only give me lap times and a few charts. They don't tell me why I'm slower in certain corners. I'd love something that interprets the data for me — like having a virtual race engineer."</p>
            <p><strong>What features do you look for?</strong></p>
            <p>"Something interactive, like a replay where the AI pauses and explains my mistakes. It should adapt to me over time, noticing patterns in my driving. A clean UI is important — some telemetry tools are just messy spreadsheets. It should feel like working with an engineer who knows how to teach, not just show data."</p>
          </div>
        </div>
        <div className="profile-card">
          <div className="profile-card__title">F1 Race Engineer</div>
          <div className="profile-card__body">
            <p><strong>Do you use AI-powered tools in your race strategy or performance analysis?</strong></p>
            <p>"Yes, our team already integrates ML models into telemetry analysis and pit-stop strategy predictions. But the process still feels fragmented — different tools for data visualisation, diagnostics, and communication. I'd like to see more unification."</p>
            <p><strong>What would you look for in an improved platform?</strong></p>
            <p>"Real-time collaboration between human engineers and the AI. A unified 'Jarvis-style' interface that aggregates telemetry, strategy models, and diagnostics in a single clear view. Compliance logging would also be great — we spend too much time writing reports after races."</p>
          </div>
        </div>
      </div>

      <h2>Personas</h2>
      <p>
        Having conducted the interviews, detailed personas were constructed to capture outlook,
        motivations, and behavioural patterns in order to better identify goals and requirements.
        Through persona-driven design, we avoid the critical error of self-referential design where
        developers create systems for people like themselves. [2]
      </p>

      <div className="profile-cards">
        <div className="profile-card">
          <div className="profile-card__title">Persona — Competitive Gamer</div>
          <div className="profile-card__body">
            <p><strong>Alex Chen</strong> &mdash; Primary user, data-driven racer</p>
            <p><em>"I don't just want to drive fast — I want to understand why I'm fast, or why I'm not."</em></p>
            <p><strong>Motivations:</strong> Wants the realism and strategy of Formula 1 with cutting-edge AI. Feels satisfaction from measurable progress — lap time reduction, consistent braking zones.</p>
            <p><strong>Goals:</strong> Learn and improve through AI-powered performance analysis and personalised coaching. Interact naturally with an AI race engineer for strategy and feedback mid-race.</p>
            <p><strong>Pain points:</strong> Generic post-race summaries with no actionable advice. Static AI opponents that don't learn or adjust. Lack of immersive communication — traditional menus instead of conversational interfaces.</p>
          </div>
        </div>
        <div className="profile-card">
          <div className="profile-card__title">Persona — F1 Race Engineer</div>
          <div className="profile-card__body">
            <p><strong>Peter Capaldi</strong>, 47 &mdash; Lead engineer, performance &amp; strategy, F1 team</p>
            <p><em>"I need real-time data and direct control, especially when milliseconds can decide the outcome."</em></p>
            <p><strong>Motivations:</strong> Use live sensor data to improve race performance. Rely on AI models for instant strategy suggestions and pit decisions. Integrate hardware, software, and AI for a smoother workflow.</p>
            <p><strong>Goals:</strong> Instantly access and act on car telemetry through the unified Jarvis interface. Automate regular tasks using smart firmware and AI. Maintain logs automatically for compliance and review.</p>
            <p><strong>Pain points:</strong> Disconnected data sources slow decisions in real-time. Hard to align hardware, dashboard, and AI data under race pressure. Poor integration between platforms adds complexity and delays.</p>
          </div>
        </div>
      </div>

      <h2>Scenarios</h2>
      <p>
        Scenario-based design adds to the interviews and personas by revealing context-based
        requirements that they alone cannot capture. [3] By walking through detailed user journeys,
        critical interaction needs were identified — Alex needs accessible real-time racing advice,
        Peter needs fast-paced analysis — that informed specific design decisions.
      </p>

      <h3>Alex Chen — Competitive Gamer</h3>
      <p>
        On a quiet Saturday afternoon in his London flat, Alex sits before his triple-monitor setup,
        ready to challenge the AI race bot in the F1 Race Car Simulator. After reviewing telemetry
        with his AI engineer, Astra, they tweak the rear wing and tyre pressure. As the lights go out,
        Alex makes a clean start while adaptive AI bots adjust to his driving. Mid-race, Astra notes
        he is braking early and suggests delaying by a few metres, improving lap times. In the final
        lap, Alex executes a perfect late apex at Blanchimont to overtake before the final chicane.
        Post-race, Astra highlights throttle inconsistencies and proposes drills. Alex feels like a
        professional driver, guided by an AI team that understands him.
      </p>

      <h3>Peter Capaldi — F1 Race Engineer</h3>
      <p>
        Lead Engineer Peter Capaldi needs to make a critical pit strategy decision. Previously, this
        required manually integrating data from disconnected telemetry screens under significant time
        pressure. Using the unified Jarvis/Granite AI dashboard, he has instant access to all live data
        on one interface. Peter asks the AI to analyse the relevant telemetry and recommend a pit
        strategy. Within seconds, the AI provides a clear, data-driven recommendation. Trusting the
        analysis, Peter hits a single "CONFIRM PIT" button, which automatically alerts the driver,
        notifies the pit crew, and logs the decision for compliance. The integrated system transformed
        a complex, high-pressure data problem into a single, confident strategic command.
      </p>

      <h2>Functional Requirements</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Requirement</th>
            <th>Priority</th>
            <th>Acceptance Criteria</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FR1</td>
            <td>Ingest real-time CAN bus data from Formula Student sensors</td>
            <td><span className="badge badge--high">High</span></td>
            <td>Parse CAN messages; validate data integrity; ≥99% frame reception</td>
          </tr>
          <tr>
            <td>FR2</td>
            <td>Extract telemetry from TORCS simulator during live sessions</td>
            <td><span className="badge badge--high">High</span></td>
            <td>Extract vehicle telemetry; accuracy &gt;95%; latency &lt;200ms</td>
          </tr>
          <tr>
            <td>FR3</td>
            <td>Extract telemetry from Assetto Corsa via network protocol</td>
            <td><span className="badge badge--high">High</span></td>
            <td>Decode AC protocol; extract core metrics; support multi-car scenarios</td>
          </tr>
          <tr>
            <td>FR4</td>
            <td>Normalise heterogeneous telemetry sources into unified schema</td>
            <td><span className="badge badge--medium">Medium</span></td>
            <td>Parse TORCS, AC, CAN formats into common structure</td>
          </tr>
          <tr>
            <td>FR5</td>
            <td>Store telemetry in time-series database with efficient indexing</td>
            <td><span className="badge badge--medium">Medium</span></td>
            <td>Ingest ≥1000 data points/sec; query performance &lt;100ms</td>
          </tr>
          <tr>
            <td>FR6</td>
            <td>2D dashboard displays real-time telemetry with live refresh</td>
            <td><span className="badge badge--high">High</span></td>
            <td>All metrics visible; refresh rate ≥1 Hz; &lt;500ms latency</td>
          </tr>
          <tr>
            <td>FR7</td>
            <td>Post-race replay with scrubbing and multi-lap comparison</td>
            <td><span className="badge badge--medium">Medium</span></td>
            <td>Playback sessions; overlay multiple laps for comparison</td>
          </tr>
          <tr>
            <td>FR8</td>
            <td>AI Race Engineer generates strategic recommendations</td>
            <td><span className="badge badge--high">High</span></td>
            <td>Recommendations aligned with race situation; contextually relevant</td>
          </tr>
          <tr>
            <td>FR9</td>
            <td>AI Race Engineer provides real-time vocal output</td>
            <td><span className="badge badge--high">High</span></td>
            <td>Natural speech; &lt;2 sec latency</td>
          </tr>
          <tr>
            <td>FR10</td>
            <td>Conversational telemetry query interface</td>
            <td><span className="badge badge--medium">Medium</span></td>
            <td>Accept open-ended questions; generate accurate responses; &gt;85% accuracy</td>
          </tr>
          <tr>
            <td>FR11</td>
            <td>VR platform renders interactive 3D car model</td>
            <td><span className="badge badge--high">High</span></td>
            <td>Load 3D CAD model; render at &gt;60 FPS</td>
          </tr>
        </tbody>
      </table>

      <h2>Non-Functional Requirements</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Requirement</th>
            <th>Category</th>
            <th>Acceptance Criteria</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NFR1</td>
            <td>End-to-end latency from sensor to visualisation</td>
            <td>Performance</td>
            <td>&lt;500ms for CAN/TORCS</td>
          </tr>
          <tr>
            <td>NFR2</td>
            <td>Data throughput capacity</td>
            <td>Performance</td>
            <td>≥1000 telemetry samples/sec</td>
          </tr>
          <tr>
            <td>NFR3</td>
            <td>VR platform frame rate minimum</td>
            <td>Performance</td>
            <td>&gt;60 FPS standard; &gt;90 FPS for VR headsets</td>
          </tr>
          <tr>
            <td>NFR4</td>
            <td>AI response latency</td>
            <td>Performance</td>
            <td>&lt;3 sec for recommendations</td>
          </tr>
          <tr>
            <td>NFR5</td>
            <td>UI intuitiveness for non-technical users</td>
            <td>Usability</td>
            <td>&gt;85% task completion; SUS score &gt;70</td>
          </tr>
          <tr>
            <td>NFR6</td>
            <td>System modularity and extensibility</td>
            <td>Maintainability</td>
            <td>Component replacement without full redesign</td>
          </tr>
          <tr>
            <td>NFR7</td>
            <td>Code quality and documentation</td>
            <td>Maintainability</td>
            <td>Minimum 80% test coverage; comprehensive documentation</td>
          </tr>
        </tbody>
      </table>

    </SectionPage>
  );
}

export default Requirements;
