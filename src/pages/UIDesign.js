import { useState } from 'react';
import SectionPage from '../components/SectionPage';
import './Algorithms.css';

const TABS = ['2D Dashboards', 'VR'];

function UIDesign() {
  const [activeTab, setActiveTab] = useState('2D Dashboards');

  return (
    <SectionPage
      title="UI Design"
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

      {activeTab === 'VR' && (<>

      <p>
        The VR Racing &amp; Engineering Hub is an Unreal Engine 4.27 virtual reality environment
        built on a proven VR lab template and transformed into a motorsport engineering space. It
        combines an immersive environment (sim rig, F1 tyres, engineering workstations), interactive
        media displays (video playback, Convai AI presentations), detailed vehicle assets (Lewis
        Hamilton's Ferrari, the UCL Formula Student car, and a TORCS car with custom IBM livery),
        and the <code>ATelemetryVisualizer</code> C++ telemetry chart system — all within a single
        VR scene navigated via grab interaction and teleportation.
      </p>

      <h2>Design Principles</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>Principle</th>
            <th>Implementation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Visibility of System Status</strong></td>
            <td>
              Telemetry charts: all instances update simultaneously on file load; axis ranges
              dynamically match data bounds so the scale always reflects the loaded session.
              Media displays: video play/pause state is directly user-controllable via Blueprint
              interaction. Elevator screens show available teleport destinations, giving the user
              a clear map of the navigable space.
            </td>
          </tr>
          <tr>
            <td><strong>Consistency &amp; Standards</strong></td>
            <td>
              Grouped tyre and suspension metrics always use the same FL/FR/RL/RR colour mapping
              (green/blue/orange/red-pink) across every chart instance. Emissive screen materials
              consistently mimic real backlit displays across all screens in the environment. VR
              interaction patterns — grab, teleport, locomotion — are inherited from the proven VR
              lab template, giving users a familiar foundation.
            </td>
          </tr>
          <tr>
            <td><strong>Flexibility &amp; Efficiency of Use</strong></td>
            <td>
              A single keypress (<strong>'O'</strong>) loads all telemetry charts simultaneously.
              Per-instance metric selection lets users compose custom 3D dashboard layouts freely in
              world space. Convai AI presentations are dynamic — slides update by changing hosted
              image URLs without rebuilding the project. Expert users can adjust chart draw size,
              world scale, line colour, and line thickness per chart instance.
            </td>
          </tr>
          <tr>
            <td><strong>Aesthetic &amp; Minimalist Design</strong></td>
            <td>
              Dark chart backgrounds with high-contrast lines, no extraneous chrome. Environment
              set dressing is thematic — sim rig, F1 tyres, engineering workstations — without
              visual clutter. Emissive/unlit screen materials keep displays bright and vivid without
              dependence on scene lighting conditions.
            </td>
          </tr>
          <tr>
            <td><strong>Error Prevention &amp; Tolerance</strong></td>
            <td>
              Chart zero-range safety guards expand the axis by ±1 when min ≈ max, preventing
              degenerate plots. Datapoint failure counting with log warnings surfaces parsing issues
              without crashing. Mesh optimisation (9.5 M → 250 K triangles on the Formula Student
              car) prevents VR frame-rate drops. The <code>OFN_NOCHANGEDIR</code> flag on the Win32
              file dialog prevents working directory corruption. Collision generation on all objects
              prevents player clipping through the environment.
            </td>
          </tr>
          <tr>
            <td><strong>Recognition Rather Than Recall</strong></td>
            <td>
              The metric dropdown uses human-readable display names from UENUM reflection (e.g.
              "Tyre Pressure (all)" rather than an internal JSON key). The FL/FR/RL/RR colour
              legend is consistent across all grouped metrics — learn the mapping once, recognise
              it everywhere. F1 tyres, the sim rig, and engineering workstations are immediately
              recognisable motorsport elements that require no explanation.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>VR Environment &amp; Interaction</h2>
      <p>
        The project was built upon a pre-existing VR Chemistry Lab template, which provided the
        external building architecture and core VR mechanics — player locomotion, grab interaction,
        and a <strong>working elevator with destination screens</strong> that teleports the player
        to preset locations in the space. Inheriting these proven systems allowed the team to focus
        entirely on domain-specific motorsport content rather than VR infrastructure.
      </p>
      <p>
        The internal layout was completely reconfigured from a laboratory into a racing and
        engineering environment. Set dressing includes:
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Element</th>
            <th>Implementation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Sim Racer Setup</strong></td>
            <td>
              Multiple static mesh actors (seat, wheel, pedals, monitor stand, display) merged into
              a single cohesive rig actor for scene organisation. Collision generated on all
              components for VR interaction.
            </td>
          </tr>
          <tr>
            <td><strong>F1 Tyres</strong></td>
            <td>
              Highly detailed tyre meshes placed as recognisable motorsport landmarks. All tyre
              assets required collision generation for proper physical presence in the VR scene.
            </td>
          </tr>
          <tr>
            <td><strong>Engineering Workstations</strong></td>
            <td>
              Custom computer workstation meshes arranged to simulate a telemetry engineering
              deck. Screens are live media surfaces (see Interactive Media below). Collision
              generated on all furniture and hardware assets.
            </td>
          </tr>
          <tr>
            <td><strong>Elevator Navigation</strong></td>
            <td>
              Retained from the VR lab template. Screens inside the elevator show available
              destinations; the player selects a floor to teleport to a pre-configured location
              in the hub — providing clear spatial navigation without a minimap.
            </td>
          </tr>
        </tbody>
      </table>

      <div className="design-decision">
        <strong>Design Decision — Building on an Existing VR Lab Template:</strong> Rather than
        constructing a VR environment from scratch, the team adopted a pre-built VR Chemistry Lab
        template as the base. This eliminated the need to implement locomotion, grab mechanics, and
        building architecture, significantly reducing development risk and time. The proven
        interaction model also meant the VR controls were already tuned for comfort and usability,
        letting the team direct all remaining effort toward the motorsport-specific content:
        telemetry charts, vehicle assets, media displays, and AI presentations.
      </div>

      <h2>Interactive Media &amp; Displays</h2>
      <p>
        In UI terms, these displays are designed as <strong>in-world information surfaces</strong>
        so users can consume media without breaking immersion or opening external menus.
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Surface</th>
            <th>User-facing behaviour</th>
            <th>UI value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Video screen</strong></td>
            <td>Users can play/pause race footage from inside the scene.</td>
            <td>Supports guided demos and contextual explanations during walkthroughs.</td>
          </tr>
          <tr>
            <td><strong>Static branding screens</strong></td>
            <td>Key project and partner visuals remain readable from distance.</td>
            <td>Acts as orientation and identity cues in the VR hub.</td>
          </tr>
          <tr>
            <td><strong>AI presentation screen</strong></td>
            <td>A Convai avatar presents slide-like content as part of interaction.</td>
            <td>Turns documentation-style content into an interactive UX element.</td>
          </tr>
        </tbody>
      </table>

      <div className="design-decision">
        <strong>Design Decision — One Space, Multiple Content Modes:</strong> Instead of splitting
        media, branding, and AI guidance into separate rooms or UIs, the design keeps them in a
        single navigable space with consistent screen behaviour. This reduces context-switching
        and keeps the user focused on the engineering narrative.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0 2rem' }}>
        <img
          src={`${process.env.PUBLIC_URL}/images/UI_images/VR-Interactive-Media-And-Displays-1.png`}
          alt="VR lounge with static branding screens showing Ferrari and F1 logos"
          style={{ width: '100%', borderRadius: '4px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/UI_images/VR-Interactive-Media-And-Displays-2.png`}
          alt="Convai AI avatar presenting a UCL and IBM project slide on a VR screen"
          style={{ width: '100%', borderRadius: '4px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
        />
      </div>

      <h2>Vehicle Assets</h2>
      <p>
        Vehicle placement supports both realism and wayfinding. Each asset acts as a visual anchor
        tied to a distinct project narrative (professional motorsport, Formula Student partnership,
        and modding pipeline experimentation).
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>UI/UX role in the scene</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Lewis Hamilton's Ferrari</strong></td>
            <td>Immediate recognition cue for users entering the hub.</td>
          </tr>
          <tr>
            <td><strong>UCL Formula Student Car</strong></td>
            <td>Connects the interface to the team's real project partner context.</td>
          </tr>
          <tr>
            <td><strong>TORCS car1-ow1 (IBM Livery)</strong></td>
            <td>Shows custom asset workflow outcomes as a tangible scene element.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Detailed import/optimisation pipelines are covered in Implementation; here the focus is the
        user-facing composition and interpretability of the environment.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0 2rem' }}>
        <img
          src={`${process.env.PUBLIC_URL}/images/UI_images/VR-Vehicle-Assets-Ferrari.png`}
          alt="Ferrari F1 car in the VR lab with telemetry upload prompt on wall"
          style={{ width: '100%', borderRadius: '4px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/UI_images/VR-Vehicle-Assets-UCLR.png`}
          alt="UCL Racing Formula Student car in the VR lab with UCL Racing branding"
          style={{ width: '100%', borderRadius: '4px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
        />
      </div>

      <h2>Telemetry Visualizer Charts</h2>
      <p>
        From a UI perspective, the chart wall is designed for fast pattern recognition in 3D space:
        users should identify state changes quickly without reading dense text or navigating deep
        menus.
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>UI decision</th>
            <th>Why it improves usability</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Consistent FL/FR/RL/RR colour semantics</td>
            <td>Users learn one mapping and can interpret all grouped tyre/suspension charts.</td>
          </tr>
          <tr>
            <td>Multi-line grouped views for related metrics</td>
            <td>Enables direct corner-to-corner comparisons at a glance.</td>
          </tr>
          <tr>
            <td>In-world chart placement rather than modal windows</td>
            <td>Preserves immersion and spatial memory while analysing telemetry.</td>
          </tr>
          <tr>
            <td>Configurable metric per chart surface</td>
            <td>Supports both novice walkthroughs and expert custom analysis layouts.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Architectural and C++ lifecycle details for this subsystem are documented in System Design
        and Implementation; this page keeps the focus on user interaction and visual communication.
      </p>
      <img
        src={`${process.env.PUBLIC_URL}/images/UI_images/VR-Telemetry-Visualizer-Charts.png`}
        alt="Two Kantan Charts telemetry graphs mounted on the VR lab wall showing tyre pressures and RPM"
        style={{ width: '100%', borderRadius: '4px', margin: '1rem 0 2rem', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
      />
      </>)}


      {activeTab === '2D Dashboards' && (<>

      <h2>Sketches</h2>
      <p>
        We drew two options of sketches to better visualise the user interface of the
        application, and to help receive more detailed feedback on the users' preferences.
      </p>

      <h3>Option 1 — Information Abundance</h3>
      <p>Emphasising comprehensive data availability.</p>
      <div className="sketch-grid">
        <figure className="sketch-grid__item">
          <img
            src={`${process.env.PUBLIC_URL}/images/UI_images/option1_1.jpg`}
            alt="Option 1 sketch — screen 1"
          />
          <figcaption>Screen 1</figcaption>
        </figure>
        <figure className="sketch-grid__item">
          <img
            src={`${process.env.PUBLIC_URL}/images/UI_images/option1_2.jpg`}
            alt="Option 1 sketch — screen 2"
          />
          <figcaption>Screen 2</figcaption>
        </figure>
        <figure className="sketch-grid__item">
          <img
            src={`${process.env.PUBLIC_URL}/images/UI_images/option1_3.jpg`}
            alt="Option 1 sketch — screen 3"
          />
          <figcaption>Screen 3</figcaption>
        </figure>
      </div>

      <h3>Option 2 — Progressive Disclosure</h3>
      <p>Prioritising critical data based on current context.</p>
      <div className="sketch-grid">
        <figure className="sketch-grid__item">
          <img
            src={`${process.env.PUBLIC_URL}/images/UI_images/option2_1.jpg`}
            alt="Option 2 sketch — screen 1"
          />
          <figcaption>Screen 1</figcaption>
        </figure>
        <figure className="sketch-grid__item">
          <img
            src={`${process.env.PUBLIC_URL}/images/UI_images/option2_2.jpg`}
            alt="Option 2 sketch — screen 2"
          />
          <figcaption>Screen 2</figcaption>
        </figure>
        <figure className="sketch-grid__item">
          <img
            src={`${process.env.PUBLIC_URL}/images/UI_images/option2_3.jpg`}
            alt="Option 2 sketch — screen 3"
          />
          <figcaption>Screen 3</figcaption>
        </figure>
      </div>

      <h2>Evaluation of Sketches</h2>
      <p>
        Before moving onto prototype development, we decided to make use of feedback from
        the users on the design alternatives for a formal evaluation. The participant
        demographics from the user consultation are as follows: 12 participants (6 gamers
        and 6 engineers); age range of 25–48; 58% male, 42% female; range of 2–18 years
        of experience in the field. [1]
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Heuristic</th>
            <th>Option 1 — "Information Abundance"</th>
            <th>Option 2 — "Progressive Disclosure"</th>
            <th>Key Insights</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Visibility of System Status</strong></td>
            <td>
              All telemetry data is displayed simultaneously, but the overload of graphs
              makes it hard to track updates. (avg. task completion time: 8.3 secs)
            </td>
            <td>
              Clearly indicates live data streams and AI analysis stages with real-time
              highlights and dynamic graphs. (avg. task completion time: 2.7 secs)
            </td>
            <td>
              Option 2 offers better real-time awareness and visual clarity under time
              pressure.
            </td>
          </tr>
          <tr>
            <td><strong>Error Prevention</strong></td>
            <td>
              Dense layout increases chance of selecting or interpreting the wrong
              dataset. (avg. error rate: 23%)
            </td>
            <td>
              Displays only contextually relevant information, preventing user confusion.
              (avg. error rate: 8%)
            </td>
            <td>
              Option 2 minimises cognitive load and supports safer, more accurate
              interaction.
            </td>
          </tr>
          <tr>
            <td><strong>Error Recognition &amp; Recovery (AI Support)</strong></td>
            <td>
              AI feedback exists only in a small text box, disconnected from visual
              graphs — users must interpret meaning manually.
            </td>
            <td>
              AI integrates directly into telemetry visualisations (real vs. ideal
              performance graphs) and suggests corrective actions visually and textually.
            </td>
            <td>
              Option 2 enables faster error recognition and guided recovery through
              AI-driven visual feedback.
            </td>
          </tr>
        </tbody>
      </table>

      <div className="design-decision">
        <strong>Design Decision:</strong> Proceed with Option 2's adaptive approach for
        the wireframe prototype, but incorporate user preference toggle for "Expert Mode"
        that enables Option 1-style comprehensive dashboard for post-race analysis and
        advanced users who prefer manual control.
      </div>

      <h2>Prototypes</h2>
      <p>
        Following the previous evaluation, we developed prototypes by hand to gather usability data
        before any code is written, to minimise development risk and cost.
      </p>

      <h3>Racing Simulation Overlay</h3>
      <p>
        Real-time AI commentary and coaching during active simulation. The overlay provides
        contextual recommendations, performance metrics, and strategic insights without
        obstructing the driver's view of the track.
      </p>
      <figure className="page-figure">
        <img
          src={`${process.env.PUBLIC_URL}/images/UI_images/prototype_overlay.png`}
          alt="Racing Simulation Overlay Prototype"
        />
        <figcaption>Real-time telemetry overlay with AI race engineer feedback during simulation</figcaption>
      </figure>

      <h3>Telemetry Analysis Dashboard</h3>
      <p>
        Post-race and live analysis interface with location mapping, multi-channel telemetry
        graphs (speed, gear, RPM, brake pressure), and AI-generated performance insights.
        Supports both single-lap review and session-wide trend analysis.
      </p>
      <figure className="page-figure page-figure--dark">
        <img
          src={`${process.env.PUBLIC_URL}/images/UI_images/prototype_telemetry_analysis_1.png`}
          alt="Telemetry Analysis Dashboard Prototype"
        />
        <figcaption>Comprehensive telemetry dashboard with real-time and post-race analysis capabilities</figcaption>
      </figure>
      <figure className="page-figure page-figure--dark">
        <img
          src={`${process.env.PUBLIC_URL}/images/UI_images/prototype_telemetry_analysis_2.png`}
          alt="Telemetry Analysis Dashboard — Advanced View"
        />
        <figcaption>Advanced telemetry analysis view with multi-lap comparison and trend analysis</figcaption>
      </figure>

      <h2>Evaluation of Prototypes</h2>
      <p>
        We then chose to carry out a heuristic evaluation on the prototypes as it is quick to complete in our limited time, requires no participants, and allows expert inspectors to rapidly identify major usability issues in both sketches and prototypes without the logistical overhead of user testing. [2]
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Heuristic</th>
            <th>Issue (from prototypes)</th>
            <th>Severity (0–4)</th>
            <th>Solution/Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Aesthetic &amp; Minimalist Design</strong></td>
            <td>
              Requires multiple clicks on "add graph" to see all graphs. Live analysis cluttered with 3+ graphs; hard to scan on small screen.
            </td>
            <td>4</td>
            <td>Remove "add graph" button. Collapsible panels: Expand only on click.</td>
          </tr>
          <tr>
            <td><strong>Flexibility &amp; Efficiency of Use</strong></td>
            <td>
              No keyboard shortcuts for frequent actions, forcing users to use mouse for every interaction.
            </td>
            <td>2</td>
            <td>Implement keyboard shortcuts: Space (activate Jarvis), Ctrl + P (pit strategy), etc. Shortcuts displayed on tooltip.</td>
          </tr>
          <tr>
            <td><strong>Match between System &amp; World</strong></td>
            <td>
              Commentary overlay uses real F1 phrasing ("Yellow is 0.7s away"), but lap delta not color-coded (green/red).
            </td>
            <td>2</td>
            <td>Color-code deltas: Green (+), Red (−).</td>
          </tr>
        </tbody>
      </table>

      <div className="design-decision">
        <strong>Conclusion:</strong> All evaluators agreed that the adaptive display issue was the highest priority fix, as it fundamentally affected the interface's usability.
      </div>

      <h2>Final Implemented UI</h2>
      <p>
        The following screenshots show the final implemented interfaces across Jarvis Live and Jarvis Post.
      </p>

      <h3>Launcher — Loading, Main Menu &amp; Settings</h3>
      <p>
        On launch, a loading screen sequences through every subsystem — native runtimes, UI stack,
        telemetry backend, AI pipeline, voice and TTS — displaying a green check as each component
        becomes ready. The main menu then presents the three entry points: Jarvis Live, Jarvis Post,
        and the VR download. Setup &amp; Settings exposes voice input configuration (disabled,
        push-to-talk, or continuous) with assignable keys for both keyboard and wheel/joystick.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', margin: '1rem 0 2rem' }}>
        <img
          src={`${process.env.PUBLIC_URL}/images/UI_images/jarvis-loading-screen.png`}
          alt="Jarvis loading screen showing component initialisation checklist"
          style={{ width: '100%', borderRadius: '4px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/UI_images/jarvis-main-menu.png`}
          alt="Jarvis main menu with Start Jarvis Live, Start Jarvis Post, and Download Jarvis VR"
          style={{ width: '100%', borderRadius: '4px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/UI_images/jarvis-settings.png`}
          alt="Jarvis Setup and Settings panel with voice input configuration"
          style={{ width: '100%', borderRadius: '4px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
        />
      </div>

      <h3>Jarvis Live — Dashboard</h3>
      <p>
        The full live dashboard during an active session. The left panel shows the track position map,
        delta to best lap graph, and lap times table. The centre panel displays real-time telemetry
        graphs — speed, brake, RPM, and tyre temperature — updating continuously from the Assetto
        Corsa shared memory feed. The right panel shows session metadata and the live AI commentary
        transcript from the Granite race engineer.
      </p>
      <img
        src={`${process.env.PUBLIC_URL}/images/UI_images/jarvis-live-dashboard.png`}
        alt="Jarvis Live dashboard showing track map, telemetry graphs, and AI commentary"
        style={{ width: '100%', borderRadius: '4px', margin: '1rem 0 2rem', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
      />

      <h3>Jarvis Post — Session Selection</h3>
      <p>
        The session selector dialog on launch. Past sessions are listed with their track, car,
        mode, duration, lap count, and best lap time. The highlighted row is the most recent
        session; the "Use Last Recorded Session" button loads it immediately without scrolling.
        Sessions can also be exported, imported, renamed, or deleted from this screen.
      </p>
      <img
        src={`${process.env.PUBLIC_URL}/images/UI_images/jarvis-post-select-lap.png`}
        alt="Jarvis Post session selection dialog"
        style={{ width: '100%', borderRadius: '4px', margin: '1rem 0 2rem', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
      />

      <h3>Jarvis Post — Telemetry Graphs</h3>
      <p>
        The Lap Render tab with a session loaded. The track map on the left updates a positional
        cursor as the timeline scrubs. The main area shows six simultaneous graph panels —
        speed, gear, engine RPM, throttle &amp; brake, tyre temperatures, and tyre pressures —
        all time-aligned so any point on one graph corresponds to the same moment across all others.
        Lap info is displayed below the track map.
      </p>
      <img
        src={`${process.env.PUBLIC_URL}/images/UI_images/jarvis-post-data.png`}
        alt="Jarvis Post telemetry graphs view with track map and six channel panels"
        style={{ width: '100%', borderRadius: '4px', margin: '1rem 0 2rem', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
      />

      <h3>Jarvis Post — Graph Channel Selector</h3>
      <p>
        The graph dropdown open, showing the full list of available telemetry channels. In addition
        to the default set, users can switch any panel to steering angle, G-forces, fuel, tyre wear,
        wheel slip, suspension travel, ride height, car damage, or delta to best lap. The current
        view shows steering angle, tyre temperatures, G-forces, and suspension travel selected.
      </p>
      <img
        src={`${process.env.PUBLIC_URL}/images/UI_images/jarvis-post-graph-dropdown.png`}
        alt="Jarvis Post graph channel selector dropdown with full channel list"
        style={{ width: '100%', borderRadius: '4px', margin: '1rem 0 2rem', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
      />

      <h3>Jarvis Post — AI Analysis</h3>
      <p>
        The Analysis tab showing the post-race debrief output from the Granite model. The left
        Coach panel provides prioritised, actionable feedback for the driver — sector-by-sector
        observations with specific setup and technique recommendations. The right Analyst panel
        delivers a more detailed engineering breakdown, flagging anomalies in tyre management,
        braking stability, and sector consistency, with numbered findings and suggested follow-up actions.
      </p>
      <img
        src={`${process.env.PUBLIC_URL}/images/UI_images/jarvis-post-analysis.png`}
        alt="Jarvis Post AI analysis tab showing Coach and Analyst debrief panels"
        style={{ width: '100%', borderRadius: '4px', margin: '1rem 0 2rem', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
      />

      <h2>Design Principles</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>Principle</th>
            <th>Jarvis Live</th>
            <th>Jarvis Post</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Visibility of System Status</strong></td>
            <td>
              Delta to best lap is colour-coded in real time — green when ahead, red when behind —
              giving immediate status without reading a number. The live AI commentary transcript
              updates as the race engineer speaks, so the user always knows whether the AI is active.
              Session info panel shows current lap, position, speed, gear, RPM, and fuel continuously.
            </td>
            <td>
              All six telemetry graph panels update simultaneously on session load and share a
              time-aligned cursor, so scrubbing one graph moves the position marker on all others.
              The track map updates the car position dot in sync with the timeline.
            </td>
          </tr>
          <tr>
            <td><strong>Match Between System &amp; World</strong></td>
            <td>
              Terminology mirrors what a real race engineer uses: delta, sector, gap, tyre compound.
              The AI commentary is voiced and phrased in natural race-engineer language rather than
              raw data readouts. The FL/FR/RL/RR tyre layout matches the physical corners of the car.
            </td>
            <td>
              Graph channels use human-readable labels ("Tyre Pressure (all)", "Suspension Travel")
              rather than internal JSON keys. The Coach panel gives feedback as a driver would hear
              it; the Analyst panel mirrors a post-race engineering debrief format.
            </td>
          </tr>
          <tr>
            <td><strong>Consistency &amp; Standards</strong></td>
            <td>
              FL/FR/RL/RR colour mapping (green/blue/orange/red-pink) is used consistently across
              every grouped metric — tyre temperature, tyre pressure, tyre wear, wheel slip, and
              suspension travel all use the same corner colours so the user learns the mapping once.
            </td>
            <td>
              The same corner colour convention carries over from the live dashboard into all
              post-race graphs. Channel names and units are identical across both tools so switching
              between live and post-race views requires no relearning.
            </td>
          </tr>
          <tr>
            <td><strong>Error Prevention</strong></td>
            <td>
              AI voice commentary is gated to straights and low-input zones — the system will not
              speak during braking zones to avoid distracting the driver at a critical moment.
              Alerts for high tyre temperature, wheel slip, and low fuel fire only when thresholds
              are exceeded, not continuously.
            </td>
            <td>
              The session selector shows track, car, mode, duration, and best lap before opening a
              file, preventing the user from loading the wrong session. Export and Import buttons are
              clearly separated from destructive actions (Delete, Rename).
            </td>
          </tr>
          <tr>
            <td><strong>Recognition Rather Than Recall</strong></td>
            <td>
              Colour-coded delta removes the need to remember whether a positive or negative number
              is good. The tyre compound legend uses the same visual cues as the actual Assetto Corsa
              HUD. A small inline legend accompanies the tyre colour display for non-expert users.
            </td>
            <td>
              The graph channel dropdown lists all available metrics by display name so the user
              selects from a visible list rather than remembering channel identifiers. The Coach panel
              leads with a single prioritised finding so the user does not need to read all output to
              find the most important point.
            </td>
          </tr>
          <tr>
            <td><strong>Flexibility &amp; Efficiency of Use</strong></td>
            <td>
              Expert Mode toggle enables the full comprehensive dashboard for users who want all
              channels visible simultaneously. Default view uses progressive disclosure — only the
              most critical metrics are shown until the user expands panels. Push-to-talk or
              continuous voice input can be configured depending on the user's preference.
            </td>
            <td>
              Any of the six graph panels can be switched to any of 20+ available channels via the
              dropdown without reloading the session. Sessions can be exported as CSV bundles or
              .jsession files for analysis outside the tool. "Use Last Recorded Session" loads the
              most recent session in one click.
            </td>
          </tr>
          <tr>
            <td><strong>Aesthetic &amp; Minimalist Design</strong></td>
            <td>
              Dark background with high-contrast coloured lines; no extraneous chrome or decoration.
              Only the live delta graph, track map, session info, and AI transcript are visible by
              default — additional telemetry graphs are shown only when needed. The overlay is
              designed to remain readable at racing speeds without demanding focused attention.
            </td>
            <td>
              The Lap Render tab uses a clean two-column layout: navigation and lap info on the
              left, graphs on the right. The Analysis tab separates Coach (driver-facing) and
              Analyst (engineering-facing) into two distinct panels so users can go directly to
              whichever perspective is relevant to them.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>References</h2>
      <ol className="ref-list">
        <li>[1] Research Consent Form — participant data collected under informed consent.</li>
        <li>[2] Nielsen, J. (1994). <em>Usability Inspection Methods.</em> <a href="https://doi.org/10.1145/191666.191743" target="_blank" rel="noopener noreferrer">Conference Companion on Human Factors in Computing Systems</a>.</li>
      </ol>

      </>)}
    </SectionPage>
  );
}

export default UIDesign;
