import SectionPage from '../components/SectionPage';

function Home() {
  return (
    <SectionPage title="F1 Jarvis TORCS">
      <p>
        An AI-enhanced telemetry analysis platform bridging professional motorsport engineering
        with accessible tools for Formula Student teams and competitive simulation racers.
        Developed for COMP0016 Systems Engineering at UCL — Team 17.
      </p>

      <h2>Project Summary</h2>
      <p>
        The core innovation centres on an AI Race Engineer/Strategist powered by fine-tuned
        IBM Granite LLM models and Jarvis multi-agent orchestration. The AI communicates verbally
        with drivers and gamers during races, providing real-time strategic decisions, performance
        insights, and personalised coaching.
      </p>
      <p>
        The platform integrates live telemetry from the UCL Racing Formula Student vehicle via CAN
        bus and from racing simulators (TORCS and Assetto Corsa). A custom 2D visualisation
        platform (Python-based, MoTeC-inspired) serves as the primary engineer interface.
      </p>

      <h2>Four Deliverables</h2>
      <ol>
        <li><strong>2D Telemetry Dashboard</strong> — Real-time and post-race analysis inspired by MoTeC/Atlas</li>
        <li><strong>TORCS Integration</strong> — Live telemetry extraction from TORCS simulator via UDP</li>
        <li><strong>Assetto Corsa Integration</strong> — Broader sim racing access via shared memory protocol</li>
        <li><strong>VR Platform</strong> — Unreal Engine 5 immersive 3D data exploration environment</li>
      </ol>

      <h2>Team</h2>
      <div className="info-cards">
        <div className="info-card">
          <div className="info-card__label">Team Lead</div>
          <div className="info-card__value">Ece Okutan</div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Developer</div>
          <div className="info-card__value">Oltun Ozavci</div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Developer</div>
          <div className="info-card__value">Athena Chong</div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Developer</div>
          <div className="info-card__value">Elinor Cheung</div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Developer</div>
          <div className="info-card__value">Eima Miyasaka</div>
        </div>
      </div>

      <h2>Supervisors</h2>
      <div className="info-cards">
        <div className="info-card">
          <div className="info-card__label">Supervisor</div>
          <div className="info-card__value">Prof. Stephen Hilton</div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Supervisor</div>
          <div className="info-card__value">Prof. John McNamara</div>
        </div>
      </div>

      <h2>GitHub Repositories</h2>
      <div className="info-cards">
        <div className="info-card">
          <div className="info-card__label">Website</div>
          <div className="info-card__value">
            <a href="https://github.com/ecsy9/f1-jarvis-granite-website" target="_blank" rel="noopener noreferrer" style={{color:'#e85d04'}}>
              f1-jarvis-granite-website
            </a>
          </div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Main Platform</div>
          <div className="info-card__value">
            <a href="https://github.com/ecsy9/f1-jarvis-granite" target="_blank" rel="noopener noreferrer" style={{color:'#e85d04'}}>
              f1-jarvis-granite
            </a>
          </div>
        </div>
      </div>
    </SectionPage>
  );
}

export default Home;
