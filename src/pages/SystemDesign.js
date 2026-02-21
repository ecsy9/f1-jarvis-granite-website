import SectionPage from '../components/SectionPage';

function SystemDesign() {
  return (
    <SectionPage title="System Design">
      <p>
        The F1 Jarvis Granite platform uses a modular layered architecture enabling parallel
        development across four tracks and future extensibility beyond the project deadline.
      </p>

      <h2>Architecture Overview</h2>
      <p>The platform is organised into six layers, each with a clear responsibility:</p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Layer</th>
            <th>Components</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Data Sources</strong></td>
            <td>CAN bus (Formula Student vehicle), TORCS simulator, Assetto Corsa simulator</td>
          </tr>
          <tr>
            <td><strong>Data Ingestion</strong></td>
            <td>Protocol handlers per source, validation pipeline, normalisation to unified schema</td>
          </tr>
          <tr>
            <td><strong>Storage</strong></td>
            <td>InfluxDB for time-series telemetry; relational storage for session metadata</td>
          </tr>
          <tr>
            <td><strong>API</strong></td>
            <td>FastAPI RESTful endpoints; WebSocket support for real-time streaming</td>
          </tr>
          <tr>
            <td><strong>AI Services</strong></td>
            <td>IBM Granite LLM with Jarvis multi-agent orchestration; text-to-speech synthesis</td>
          </tr>
          <tr>
            <td><strong>Presentation</strong></td>
            <td>2D Python visualisation platform; Unreal Engine 5 VR environment</td>
          </tr>
        </tbody>
      </table>

      <h2>Data Model</h2>
      <h3>Telemetry Schema</h3>
      <p>
        Timestamp, Session ID, Data Source, Vehicle ID, Sensor Readings (speed, throttle, brake,
        RPM, gear, steering angle, tire temps, G-forces, track position).
      </p>
      <h3>Session Schema</h3>
      <p>
        Session ID, Type (practice / qualifying / race), start/end times, track name, weather
        conditions, participant info.
      </p>
      <h3>AI Interaction Schema</h3>
      <p>
        Interaction ID, timestamp, user ID, query text, AI response, confidence score, session
        context reference.
      </p>

      <h2>Technology Stack</h2>
      <h3>Data Integration</h3>
      <ul>
        <li>CAN bus protocol handling (ISO 11898)</li>
        <li>TORCS telemetry via UDP data packets</li>
        <li>Assetto Corsa telemetry via shared memory</li>
        <li>Data normalisation and validation pipeline</li>
      </ul>
      <h3>Backend Services</h3>
      <ul>
        <li>Python backend with FastAPI</li>
        <li>InfluxDB for time-series telemetry storage</li>
        <li>Caching layer for frequent queries</li>
        <li>WebSocket support for real-time streaming</li>
      </ul>
      <h3>AI & Machine Learning</h3>
      <ul>
        <li>IBM Granite LLM for race strategy and conversational AI</li>
        <li>Jarvis multi-agent orchestration</li>
        <li>LLM fine-tuning via LoRA/QLoRA (parameter-efficient methods)</li>
        <li>Text-to-speech synthesis for vocal output</li>
      </ul>
      <h3>2D Visualisation Platform</h3>
      <ul>
        <li>Python-based GUI framework</li>
        <li>Custom visualisation components inspired by MoTeC</li>
        <li>Real-time data rendering with interactive controls</li>
      </ul>
      <h3>VR Platform</h3>
      <ul>
        <li>Unreal Engine 5 for immersive 3D environment</li>
        <li>VR headset support (Meta Quest or SteamVR)</li>
        <li>3D CAD model integration from UCL Racing</li>
      </ul>

      <h2>AI Integration with Jarvis</h2>
      <p>
        The AI Race Engineer uses Jarvis as a multi-agent orchestrator to coordinate IBM Granite
        LLM tools. Each agent specialises in a distinct task:
      </p>
      <div className="info-cards">
        <div className="info-card">
          <div className="info-card__label">Telemetry Analysis Agent</div>
          <div className="info-card__value">Processes incoming sensor data and extracts meaningful patterns</div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Strategy Agent</div>
          <div className="info-card__value">Generates pit stop timing, tyre management, and fuel conservation recommendations</div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Conversation Agent</div>
          <div className="info-card__value">Handles natural language queries about performance data</div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Voice Output Agent</div>
          <div className="info-card__value">Converts text recommendations to natural speech output</div>
        </div>
      </div>
      <p>
        This multi-agent approach allows specialised handling of different tasks while maintaining
        coherent, contextual responses to the driver throughout a session.
      </p>
    </SectionPage>
  );
}

export default SystemDesign;
