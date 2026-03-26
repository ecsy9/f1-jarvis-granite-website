import { useState } from 'react';
import SectionPage from '../components/SectionPage';
import './Algorithms.css';

const TABS = ['2D Dashboards', 'VR'];

function UIDesign() {
  const [activeTab, setActiveTab] = useState('2D Dashboards');

  return (
    <SectionPage title="UI Design">
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
        The VR component of the system renders interactive telemetry charts directly inside an
        Unreal Engine 4.27 VR scene. Each chart is an independent actor instance displaying a
        chosen metric from a loaded <code>.jsession</code> telemetry file, allowing users to
        compose a fully custom 3D dashboard by placing chart actors freely in world space.
      </p>

      <h2>Telemetry Visualizer Charts</h2>
      <p>
        <code>ATelemetryVisualizer</code> is a C++ Unreal actor that renders a Kantan Charts
        <code>USimpleCartesianPlot</code> onto a <code>UWidgetComponent</code> surface. A single
        keypress (<strong>'O'</strong>) opens a file dialog, parses the selected JSON session file,
        and broadcasts the data to every chart instance in the level simultaneously. Per-instance
        configuration (metric type, draw resolution, world-scale, line colour, line thickness)
        lets users tailor each chart without touching code.
      </p>

      <h3>Design Principles</h3>
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
              All chart instances update simultaneously via a broadcast after file load — the user
              sees every metric respond at once, with no manual refresh required. Axis ranges are
              computed dynamically from the actual data min/max (with padding), so the scale always
              reflects the loaded session.
            </td>
          </tr>
          <tr>
            <td><strong>Consistency &amp; Standards</strong></td>
            <td>
              Grouped metrics (Tyre Pressure, Tyre Temperature, Tyre Wear, Wheel Slip, Suspension
              Travel) always use the same colour mapping across every chart: FL = green, FR = blue,
              RL = orange, RR = red-pink. Users learn the colour legend once and it applies
              everywhere.
            </td>
          </tr>
          <tr>
            <td><strong>Flexibility &amp; Efficiency of Use</strong></td>
            <td>
              A single keypress (<strong>'O'</strong>) triggers the file-load flow for all charts
              in the scene. Per-instance metric selection (via the Unreal Details panel dropdown)
              lets expert users compose custom multi-metric dashboard layouts. Draw size, world
              scale, line colour, and thickness are all exposed as per-instance properties.
            </td>
          </tr>
          <tr>
            <td><strong>Aesthetic &amp; Minimalist Design</strong></td>
            <td>
              Charts use a near-black background (<code>0.03, 0.03, 0.07, 0.92</code> alpha) and
              high-contrast lines chosen for VR headset legibility. No extraneous UI chrome is
              rendered. Grouped metrics consolidate multiple data series onto a single chart actor,
              reducing scene complexity (one 4-line chart vs. four separate actors).
            </td>
          </tr>
          <tr>
            <td><strong>Error Prevention &amp; Tolerance</strong></td>
            <td>
              Zero-range safety guards expand the axis by ±1 when min ≈ max, preventing a
              degenerate plot. Failed datapoint insertions are counted and logged as warnings.
              Null-guards on <code>WidgetTree</code> creation prevent crashes when widget
              initialisation is incomplete.
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Metric Types</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Metrics</th>
            <th>Lines per Chart</th>
            <th>Colour Scheme</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Single-value</strong></td>
            <td>Speed, RPM, Gear, Throttle, Brake, Fuel, Steer Angle, G-Forces, Elapsed Time, Lap Number, Position</td>
            <td>1</td>
            <td>Configurable per-instance (<code>LineColor</code> property)</td>
          </tr>
          <tr>
            <td><strong>4-Corner Grouped</strong></td>
            <td>Tyre Pressure, Tyre Temperature, Tyre Wear, Wheel Slip, Suspension Travel</td>
            <td>4</td>
            <td>FL = green, FR = blue, RL = orange, RR = red-pink</td>
          </tr>
          <tr>
            <td><strong>Front/Rear Grouped</strong></td>
            <td>Ride Height</td>
            <td>2</td>
            <td>Front = green, Rear = red</td>
          </tr>
          <tr>
            <td><strong>5-Zone Grouped</strong></td>
            <td>Car Damage</td>
            <td>5</td>
            <td>Front = green, Rear = red, Left = blue, Right = orange, Centre = yellow</td>
          </tr>
        </tbody>
      </table>

      <h3>Key Design Decisions</h3>

      <div className="design-decision">
        <strong>Widget Lifecycle Ordering — attach before populate:</strong> The
        <code> UChartContainerWidget</code> must be assigned to the <code>UWidgetComponent</code>{' '}
        <em>before</em> data is pushed via <code>BP_AddSeriesWithId</code> and{' '}
        <code>BP_AddDatapoint</code>. Attaching first triggers <code>TakeWidget()</code> →{' '}
        <code>SynchronizeProperties()</code>, which binds the Slate chart's datasource interface.
        Populating data before attachment causes axes to render but leaves all data lines invisible —
        a subtle ordering bug with no compile-time or runtime error.
      </div>

      <div className="design-decision">
        <strong>Native Win32 File Dialog (commdlg.h) instead of DesktopPlatform:</strong> Unreal's{' '}
        <code>IDesktopPlatform</code> module is editor-only and causes linker errors in Shipping
        builds. The implementation uses <code>GetOpenFileName</code> from <code>commdlg.h</code>{' '}
        directly, which is available in all build configurations. After the dialog closes,{' '}
        <code>SetInputMode(FInputModeGameOnly)</code> is called to recapture mouse look, preventing
        the "lost mouse after alt-tab" issue that occurs when a Win32 dialog temporarily gives the
        OS cursor control.
      </div>

      <div className="design-decision">
        <strong>Consistent colour-coding across all 4-corner grouped metrics:</strong> The same
        FL/FR/RL/RR colour mapping (green/blue/orange/red-pink) is enforced by the shared{' '}
        <code>GetSubSeries()</code> function, which returns a <code>TArray&lt;FTelemetrySubSeries&gt;</code>{' '}
        (JsonKey, DisplayName, Color) for each metric enum value. This means Tyre Pressure, Tyre
        Temperature, Tyre Wear, Wheel Slip, and Suspension Travel all share identical colour
        semantics — a user who reads the legend for one metric can immediately interpret any other.
      </div>

      <div className="design-decision">
        <strong>Automatic down-sampling for VR performance:</strong> Datasets exceeding 6,000
        datapoints are uniformly down-sampled before being pushed to the chart widget. This keeps
        frame times stable in VR (where dropping below 90 fps causes discomfort) while preserving
        overall shape and trend visibility. The threshold and step are applied per-series, so
        grouped charts with multiple lines each benefit from the reduction.
      </div>

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
