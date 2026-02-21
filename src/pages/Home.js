import { useEffect } from 'react';
import './Home.css';

function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className="home-hero">
        <div className="home-hero__image-wrap">
          <img src="/images/title_photo.png" alt="F1 Jarvis Granite platform" />
        </div>
        <div className="home-hero__inner">
          <p className="home-hero__label">UCL &middot; Team 17</p>
          <h1 className="home-hero__title">F1 Jarvis Granite</h1>
          <p className="home-hero__sub">AI-Enhanced Racing Telemetry Analysis Platform</p>
        </div>
      </div>

      <div className="home-content">
        <div className="fade-up">
          <h2>Problem Statement</h2>
          <p>
            Current telemetry analysis tools in motorsport present a significant barrier to entry for educational teams and competitive sim racers. Professional Formula 1 teams employ sophisticated engineering systems with dedicated staff for real-time data interpretation, however these solutions are prohibitively expensive and complex. Formula Student teams often rely on basic data logging without intelligent analysis capabilities, while sim racers typically have limited access to the engineering insights that professional drivers receive during races.
          </p>
          <p>
            The challenge extends beyond mere data collection - the interpretation of high-frequency telemetry data requires domain expertise that many users lack. Without AI-assisted analysis, identifying optimal braking points, understanding tire degradation patterns, or making strategic pit stop decisions remains difficult for non-expert users.
          </p>
        </div>

        <div className="fade-up">
          <h2>Our Solution</h2>
          <p>
            The core innovation centres on an AI Race Engineer and Strategist powered by fine-tuned
            IBM Granite LLM models. The AI communicates verbally
            with drivers and gamers during races, providing real-time strategic decisions, performance
            insights, and personalised coaching. The platform integrates live telemetry from the UCL
            Racing Formula Student vehicle via CAN bus and from racing simulators (TORCS and Assetto
            Corsa). A 2D visualisation dashboard (Python-based, MoTeC-inspired) serves as the
            primary engineer interface, while an Unreal Engine 5 VR platform enables immersive
            3D data exploration.
          </p>
        </div>

        <div className="fade-up">
          <h2>Achievement &amp; Impact</h2>
          <p>
            The project delivers four integrated components: a real-time telemetry dashboard, TORCS
            simulator integration, Assetto Corsa integration, and a VR visualisation environment.
            Together they bridge the gap between raw sensor data and actionable insight for both
            professional motorsport engineers and amateur racers. By democratising AI-assisted race
            engineering through natural-language interaction, the platform lowers the barrier to
            high-quality performance coaching and advances the broader case for LLM integration in
            high-frequency, safety-critical feedback loops.
          </p>
        </div>

        <div className="fade-up">
          <h2>Four Deliverables</h2>
          <div className="deliverable-cards">
            <div className="deliverable-card fade-up delay-1">
              <div className="deliverable-card__num">01</div>
              <div className="deliverable-card__title">2D Telemetry Dashboard</div>
              <div className="deliverable-card__desc">Real-time and post-race analysis inspired by MoTeC/Atlas</div>
            </div>
            <div className="deliverable-card fade-up delay-2">
              <div className="deliverable-card__num">02</div>
              <div className="deliverable-card__title">TORCS Integration</div>
              <div className="deliverable-card__desc">Live telemetry extraction via UDP data packets</div>
            </div>
            <div className="deliverable-card fade-up delay-3">
              <div className="deliverable-card__num">03</div>
              <div className="deliverable-card__title">Assetto Corsa Integration</div>
              <div className="deliverable-card__desc">Sim racing access via shared memory protocol</div>
            </div>
            <div className="deliverable-card fade-up delay-4">
              <div className="deliverable-card__num">04</div>
              <div className="deliverable-card__title">VR Platform</div>
              <div className="deliverable-card__desc">Unreal Engine 5 immersive 3D data exploration</div>
            </div>
          </div>
        </div>

        <div className="fade-up">
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
        </div>

        <div className="fade-up">
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
        </div>

        <div className="fade-up">
          <h2>GitHub Repositories</h2>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-card__label">AI Fine-tuning</div>
              <div className="info-card__value">
                <a href="https://github.com/athena-c-22/f1-fine-tuning" target="_blank" rel="noopener noreferrer" style={{color:'#e85d04'}}>
                  f1-fine-tuning
                </a>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card__label">Live Telemetry</div>
              <div className="info-card__value">
                <a href="https://github.com/eceokutan/f1-live-telemetry" target="_blank" rel="noopener noreferrer" style={{color:'#e85d04'}}>
                  f1-live-telemetry
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
