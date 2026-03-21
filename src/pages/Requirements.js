import SectionPage from '../components/SectionPage';

function Requirements() {
  return (
    <SectionPage title="Project Requirements">
      <h2>Partner Introduction and Project Background</h2>
      <p>
        F1 Jarvis Granite is a research project developed in collaboration with IBM
        and UCL School Of Pharmacy to create an intelligent telemetry analysis and coaching system
        for competitive racing simulations and real-world Formula Student applications. The project
        bridges the gap between professional motorsport engineering tools and accessible AI-powered
        performance coaching, enabling both sim racers and engineers to extract
        actionable insights from complex telemetry data.
      </p>

      <h2>Project Goals</h2>
      <ul>
        <li>Design and implement a unified platform that integrates telemetry from racing simulators </li>
        <li>Develop an AI Race Engineer that provides real-time strategic recommendations and vocal coaching during active racing based on real-time data</li>
        <li>Create an intuitive 2D telemetry dashboards for real-time and post-race performance data plotting and analysis</li>
        <li>Build an immersive VR platform using Unreal Engine 5 for educational motorsports exploration</li>
        <li>Apply LLM fine-tuning methodologies to optimise Granite models for motorsport-specific terminology, strategic decision-making, and domain expertise.</li>
        <li>Establish HCI best practices through iterative design and user-centered evaluation</li>
        <li>Support both casual and expert users through adaptive interface modes</li>
      </ul>

      <h2>Gathering User Requirements</h2>
      <p>
        Requirements were gathered through a structured HCI process: semi-structured interviews,
        persona construction, scenario-based design, low-fidelity sketches, and iterative prototype
        evaluation. Two professional-grade sim racers were interviewed to talk about necessities and what could be done to make the experience enhanced. While the development continued, these sim-racers were contacted for feedback. 
        
      </p>
      <p>
        The UCL Racing Formula Student Team's engineers were also contacted to gather information about what plots would be useful for them to see to understand car performance. Our team created a modded Assetto Corsa car with the help of the Formula Student team, mimicing their designed car to a very high accuracy in the simulation environment (AC). By contacting both sim racers and vehicle design engineers we made the platform useful for both use cases.
        This pipeline ensured that system requirements reflect genuine user needs
        rather than developer assumptions.
      </p>
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
          <div className="profile-card__title">Vehicle Design Engineer</div>
          <div className="profile-card__body">
            <p><strong>Do you use AI-powered tools in your race strategy or performance analysis?</strong></p>
            <p>"Yes, our team already integrates ML models into telemetry analysis. But the process still feels fragmented — different tools for data visualisation, diagnostics, and communication. I'd like to see more unification."</p>
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

      <h2>Use Cases</h2>
      <p>
        Use cases define the core interactions between users and the system. The following key use
        cases capture the primary functionality required to support both competitive gamers and
        professional race engineers.
      </p>

      <h3>Actors</h3>
      <ul>
        <li><strong>Driver</strong>: Primary User</li>
        <li><strong>Assetto Corsa</strong>: External simulation environment providing telemetry data</li>
        <li><strong>Local LLM</strong>: AI System</li>
        <li><strong>Jarvis Post and Jarvis Live</strong>: 2D platforms that display data and graphs</li>
        <li><strong>Jarvis VR</strong>: Educational VR environment</li>
      </ul>

      <h3>Key Use Cases</h3>
      <ul>
        <li><strong>UC1 — View Live Telemetry</strong>: Driver launches Jarvis Live, connects to AC, and sees real-time speed, RPM, gear, brake, tire data, track map</li>
        <li><strong>UC2 — Complete a Lap</strong>: System detects lap completion, records lap time, updates lap table</li>
        <li><strong>UC3 — Receive Race Engineer Warnings</strong>: AI proactively alerts driver about tire temps, fuel, wheel slip, gap changes during a session</li>
        <li><strong>UC4 — Ask AI a Question via Voice</strong>:  Driver speaks a question (e.g., "how are my tires?"), AI responds with audio</li>
        <li><strong>UC5 — Compare Lap Times</strong>: Driver views delta-to-best-lap in real-time while driving, seeing where they are losing and gaining time compared to their best lap</li>
        <li><strong>UC6 — Review Post-Race Analysis</strong>:  Driver opens Jarvis Post, selects a recorded session, reviews lap-by-lap telemetry and AI analysis and coaching</li>
        <li><strong>UC7 — Post-Race Coach Chatbot</strong>:  Driver can ask post-race coach AI questions about their session and ask for specific areas of improvement through a chatbot</li>
        <li><strong>UC8 — Customize Dashboard Layout</strong>: Expert user saves custom dashboard presets with preferred graph arrangements and metric displays</li>
        <li><strong>UC9 — Export/Import Session Data</strong>: Driver exports/imports recorded session telemetry</li>
        <li><strong>UC10 — Browse Session History</strong>:  Driver views list of past sessions with track, car, lap count, best time</li>
      </ul>

      <h2>Functional Requirements</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Requirement</th>
            <th>MoSCoW</th>
            <th>Acceptance Criteria</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FR1</td>
            <td>Extract live telemetry from Assetto Corsa via shared memory</td>
            <td><span className="badge badge--must">Must</span></td>
            <td>All 7 data fields (speed, RPM, gear, throttle, brake, fuel, tire temps) read without error; sampling rate ≥60Hz sustained over a 30-min session with 0 dropped frames</td>
          </tr>
          <tr>
            <td>FR2</td>
            <td>2D dashboard displays real-time telemetry graphs and track map</td>
            <td><span className="badge badge--must">Must</span></td>
            <td>≥6 graphs render and update at ≥12Hz; track map re-draws each lap colored by speed; no visible lag at 60Hz input rate</td>
          </tr>
          <tr>
            <td>FR3</td>
            <td>Detect lap completion and record lap times</td>
            <td><span className="badge badge--must">Must</span></td>
            <td>Start/finish crossing detected within 1 data frame; lap time displayed to ±1ms accuracy; all completed laps appear in lap table by session end</td>
          </tr>
          <tr>
            <td>FR4</td>
            <td>Generate proactive strategic alerts based on data</td>
            <td><span className="badge badge--must">Must</span></td>
            <td>≥4 alert types triggered correctly (fuel, tire temp, wheel slip, gap change) across a test session; AI response generated and delivered within ≤2s of trigger event</td>
          </tr>
          <tr>
            <td>FR5</td>
            <td>AI Race Engineer delivers responses via text-to-speech</td>
            <td><span className="badge badge--must">Must</span></td>
            <td>TTS audio begins playing within ≤1s of AI response completion; speech is intelligible at default system volume on a standard headset</td>
          </tr>
          <tr>
            <td>FR6</td>
            <td>Voice input for driver queries to AI</td>
            <td><span className="badge badge--should">Should</span></td>
            <td>Voice activity detected within ≤0.5s; Whisper transcription completes locally within ≤3s; spoken AI response returned within ≤5s of query end; push-to-talk and continuous modes both functional</td>
          </tr>
          <tr>
            <td>FR7</td>
            <td>Record all session telemetry to local database</td>
            <td><span className="badge badge--must">Must</span></td>
            <td>0 telemetry samples dropped at 60Hz over a 30-min session; all lap stats, AI commentary and voice queries present in SQLite DB on session close; DB readable after app restart</td>
          </tr>
          <tr>
            <td>FR8</td>
            <td>Post-race replay with timeline scrubbing and graph selection</td>
            <td><span className="badge badge--should">Should</span></td>
            <td>Any recorded session loads within ≤3s; timeline scrubbing updates graphs within ≤200ms per step; user can select any combination of up to 6 from 14 available metrics</td>
          </tr>
          <tr>
            <td>FR9</td>
            <td>Delta-to-best-lap comparison in real-time</td>
            <td><span className="badge badge--should">Should</span></td>
            <td>Delta graph updates every data frame; correctly shows green when ahead and red when behind best lap; delta value matches manual calculation to ±50ms</td>
          </tr>
          <tr>
            <td>FR10</td>
            <td>Export and import session data as .jsession bundles</td>
            <td><span className="badge badge--could">Could</span></td>
            <td>Exported .jsession file contains all metadata, laps and telemetry samples; file imports successfully on a different machine and loads correctly in Jarvis Post</td>
          </tr>
          <tr>
            <td>FR11</td>
            <td>VR platform renders interactive 3D car model</td>
            <td><span className="badge badge--should">Should</span></td>
            <td>3D car model loads without error; sustained ≥60 FPS in VR headset; ≥3 telemetry values displayed and updating live in the VR environment</td>
          </tr>
          <tr>
            <td>FR12</td>
            <td>VR platform provides educational information</td>
            <td><span className="badge badge--must">Must</span></td>
            <td>User can interact with ≥3 labelled telemetry or car-component elements; each element displays a readable explanation; navigable without external instruction</td>
          </tr>
          <tr>
            <td>FR13</td>
            <td>Auto-download AI models on first launch</td>
            <td><span className="badge badge--could">Could</span></td>
            <td>Both GGUF models download from Hugging Face Hub on first run; progress dialog shown with % complete; models cached locally and not re-downloaded on subsequent launches</td>
          </tr>
          <tr>
            <td>FR14</td>
            <td>Main Menu UI for unified navigation</td>
            <td><span className="badge badge--could">Could</span></td>
            <td>User can launch Jarvis Live, Jarvis Post and Settings from a single menu without manual file management; sessions recorded in Live are immediately available in Post without user intervention</td>
          </tr>
          <tr>
            <td>FR15</td>
            <td>Ingest real-time CAN bus data from Formula Student sensors</td>
            <td><span className="badge badge--wont">Won't</span></td>
            <td>Out of scope for current version; no implementation planned</td>
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
          {/* ── Performance ── */}
          <tr>
            <td>NFR1</td>
            <td>End-to-end latency from shared memory to dashboard</td>
            <td><span className="badge badge--cat-performance">Performance</span></td>
            <td>Telemetry read at ~60Hz; UI graphs update at ~12Hz; &lt;100ms perceived latency</td>
          </tr>
          <tr>
            <td>NFR2</td>
            <td>AI Race Engineer response latency</td>
            <td><span className="badge badge--cat-performance">Performance</span></td>
            <td>Rule-based event detection &lt;50ms; LLM response generation &lt;3s</td>
          </tr>
          <tr>
            <td>NFR3</td>
            <td>TTS audio output latency</td>
            <td><span className="badge badge--cat-performance">Performance</span></td>
            <td>Speech playback begins within 500ms of AI response</td>
          </tr>
          <tr>
            <td>NFR4</td>
            <td>VR platform frame rate</td>
            <td><span className="badge badge--cat-performance">Performance</span></td>
            <td>&gt;60 FPS standard; &gt;90 FPS for VR headsets</td>
          </tr>
          <tr>
            <td>NFR5</td>
            <td>Database write performance under continuous telemetry</td>
            <td><span className="badge badge--cat-performance">Performance</span></td>
            <td>Batch insert 60 samples/sec to SQLite without blocking UI thread</td>
          </tr>
          <tr>
            <td>NFR6</td>
            <td>AI model quantisation for consumer hardware</td>
            <td><span className="badge badge--cat-performance">Performance</span></td>
            <td>LLM models quantised to Q4_K_M GGUF format (~2GB each); runs on consumer CPUs without dedicated GPU</td>
          </tr>
          {/* ── Reliability ── */}
          <tr>
            <td>NFR7</td>
            <td>Application runs without internet after first launch</td>
            <td><span className="badge badge--cat-reliability">Reliability</span></td>
            <td>AI models cached locally; all inference runs offline; no external API dependencies during sessions</td>
          </tr>
          <tr>
            <td>NFR8</td>
            <td>Automatic reconnection on game restart</td>
            <td><span className="badge badge--cat-reliability">Reliability</span></td>
            <td>Detect stale shared memory; release handles; reconnect when AC restarts without manual intervention</td>
          </tr>
          <tr>
            <td>NFR9</td>
            <td>AI output sanitisation before TTS</td>
            <td><span className="badge badge--cat-reliability">Reliability</span></td>
            <td>LLM responses cleaned of markdown, asterisks, and formatting artefacts before text-to-speech playback</td>
          </tr>
          <tr>
            <td>NFR10</td>
            <td>LLM inference timeout with graceful fallback</td>
            <td><span className="badge badge--cat-reliability">Reliability</span></td>
            <td>12-second timeout on LLM inference; system recovers to ready state without UI hang or crash</td>
          </tr>
          {/* ── Usability ── */}
          <tr>
            <td>NFR11</td>
            <td>No Python installation required for end users</td>
            <td><span className="badge badge--cat-usability">Usability</span></td>
            <td>PyInstaller bundles all dependencies; single executable distribution</td>
          </tr>
          <tr>
            <td>NFR12</td>
            <td>UI intuitiveness for non-technical users</td>
            <td><span className="badge badge--cat-usability">Usability</span></td>
            <td>Launcher with clear mode selection; no command-line knowledge required; dark themed dashboard</td>
          </tr>
          <tr>
            <td>NFR13</td>
            <td>Transparent first-launch download progress</td>
            <td><span className="badge badge--cat-usability">Usability</span></td>
            <td>Progress dialog displays model name and download status during first-run AI model downloads; user is never left on a frozen screen</td>
          </tr>
          {/* ── Maintainability ── */}
          <tr>
            <td>NFR14</td>
            <td>Modular backend architecture</td>
            <td><span className="badge badge--cat-maintainability">Maintainability</span></td>
            <td>New sim backends can be added by implementing a QThread subclass with defined signals; no changes to UI required</td>
          </tr>
          <tr>
            <td>NFR15</td>
            <td>AI pipeline modularity</td>
            <td><span className="badge badge--cat-maintainability">Maintainability</span></td>
            <td>Telemetry agent (rule-based) and race engineer agent (LLM) are independently replaceable; prompt templates separated from logic</td>
          </tr>
          {/* ── Interoperability ── */}
          <tr>
            <td>NFR16</td>
            <td>Session data portability</td>
            <td><span className="badge badge--cat-interoperability">Interoperability</span></td>
            <td>Sessions exportable as .jsession bundles; importable on another machine with no data loss</td>
          </tr>
        </tbody>
      </table>

      <h2>References</h2>
      <ol className="ref-list">
        <li>[1] DeJonckheere, M., & Vaughn, L. M. (2019). Semistructured interviewing in primary care research: A balance of relationship and rigour. <em>Family Medicine and Community Health</em>, 7(2), e000057. <a href="https://doi.org/10.1136/fmch-2018-000057" target="_blank" rel="noopener noreferrer">https://doi.org/10.1136/fmch-2018-000057</a></li>
        <li>[2] Cooper, A., Reimann, R., Cronin, D., & Noessel, C. (2014). <em>About Face: The Essentials of Interaction Design</em> (4th ed.). John Wiley & Sons.</li>
        <li>[3] Carroll, J. M. (2000). Five reasons for scenario-based design. <em>Interacting with Computers</em>, 13(1), 43–60. <a href="https://doi.org/10.1016/S0953-5438(00)00023-0" target="_blank" rel="noopener noreferrer">https://doi.org/10.1016/S0953-5438(00)00023-0</a></li>
      </ol>

    </SectionPage>
  );
}

export default Requirements;
