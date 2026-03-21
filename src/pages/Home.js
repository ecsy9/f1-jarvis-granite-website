import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
const logo   = '/images/jarvis-logo.svg';
const carImage = '/images/sf26-overhead.png';
const logoIBM = '/images/logos/ibm.png';
const logoAC  = '/images/logos/assetto-corsa.png';
const logoUE  = '/images/logos/ucl.png';
const logoFS  = '/images/logos/formula-student.png';
const logoCM  = '/images/logos/content-manager.webp';
import './Home.css';

function Home() {
  const carRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (carRef.current) {
        carRef.current.style.transform = `translateX(${window.scrollY * 0.8}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <div className="home-hero__speed-line" />
        <div className="home-hero__speed-line" />
        <div className="home-hero__speed-line" />
        <div className="home-hero__speed-line" />
        <div className="home-hero__speed-line" />
        <div className="home-hero__speed-line" />
        <div className="home-hero__image-wrap" ref={carRef}>
          <img src={carImage} alt="F1 car overhead view" />
        </div>
        <div className="home-hero__inner">
          <img src={logo} alt="F1 Jarvis Granite logo" className="home-hero__logo" />
          <p className="home-hero__label">UCL &middot; Team 17</p>
          <h1 className="home-hero__title">F1 Jarvis Granite</h1>
          <p className="home-hero__sub">AI-Enhanced Racing Telemetry Analysis Platform</p>
        </div>
      </div>

      <div className="home-partners">
        <div className="home-partners__row">
          <span className="home-partners__label">Supervised by</span>
          <div className="home-partners__logos">
            <div className="home-partners__logo-wrap"><img src={logoIBM} alt="IBM" className="home-partners__logo" /></div>
            <div className="home-partners__logo-wrap home-partners__logo-wrap--lg"><img src={logoUE}  alt="UCL" className="home-partners__logo" /></div>
          </div>
        </div>
        <div className="home-partners__divider" />
        <div className="home-partners__row">
          <span className="home-partners__label">Built with</span>
          <div className="home-partners__logos">
            <div className="home-partners__logo-wrap"><img src={logoAC}  alt="Assetto Corsa" className="home-partners__logo" /></div>
            <div className="home-partners__logo-wrap"><img src={logoFS}  alt="Formula Student" className="home-partners__logo" /></div>
            <div className="home-partners__logo-wrap"><img src={logoCM}  alt="Content Manager" className="home-partners__logo" /></div>
          </div>
        </div>
      </div>

      <div className="home-cta">
        <Link to="/appendices/user-manual" className="home-cta__btn">
          <img src={logo} alt="" className="home-cta__logo" />
          Go To Download
        </Link>
      </div>

      <div className="home-content">
        <div className="fade-up">
          <h2>Problem Statement</h2>
          <p>
            Current telemetry analysis tools in motorsport present a significant barrier to entry for educational teams and competitive sim racers. Professional Formula 1 teams employ sophisticated engineering systems with dedicated staff for real-time data interpretation, however these solutions are prohibitively expensive and complex. As interpreting raw telemetry data is very difficult and has a steep learning curve, most simulation racers typically have limited access to the engineering insights that professional drivers receive during and after races.
          </p>
          <p>
            The challenge extends beyond mere data collection - the interpretation of high-frequency telemetry data requires domain expertise that many users lack. Without AI-assisted analysis, identifying optimal braking points, understanding tire degradation patterns, or making strategic pit stop decisions remains difficult for non-expert users.
          </p>
        </div>

        <div className="fade-up">
          <h2>Our Solution</h2>
          <p>
            The core innovation centres on an AI Race Engineer and Strategist powered by fine-tuned
            IBM Granite LLM models. The Live AI Race Engineer communicates verbally
            with drivers during races, providing real-time strategic decisions, performance
            insights, and warning critical situations. The platform integrates live telemetry from Assetto Corsa, the industry standard racing simulation. 2D visualisation dashboards, Jarvis Live and Jarvis Post, (Python-based, MoTeC-inspired) serve as the
            primary insight interface, while an Unreal Engine 5 VR platform enables immersive learning about sim racing and Formula 1.
          </p>
        </div>

        <div className="fade-up">
          <h2>Achievement &amp; Impact</h2>
          <p>
            The project delivers three components: A real-time telemetry dashboard (Jarvis Live),  a post-race telemetry analysis dashboard (Jarvis Post), and a VR environment (Jarvis VR).
            Together they bridge the gap between raw data and actionable insight for both
            professional motorsport engineers and amateur racers. By democratising AI-assisted race
            engineering through natural-language interaction, the platform lowers the barrier to
            high-quality performance coaching and advances the broader case for LLM integration in
            high-frequency, safety-critical feedback loops.
          </p>
        </div>

        <div className="fade-up">
          <h2>Motivation</h2>
          <h3>Educational Value</h3>
          <p>
            Formula Student teams need accessible tools to analyse vehicle performance data and make
            data-driven design decisions. By providing AI-guided insights, the platform allows access
            to sophisticated telemetry analysis without requiring deep domain expertise.
          </p>
          <h3>Competitive Enhancement</h3>
          <p>
            The competitive sim racing community has grown substantially, yet most racers lack the
            real-time engineering support that professional drivers receive. An AI race engineer
            providing live feedback and strategy recommendations can significantly improve both
            performance and the immersive racing experience.
          </p>
          <h3>Technology Demonstration</h3>
          <p>
            This project showcases practical applications of IBM's Granite foundation models in
            real-time data analysis, conversational AI, and decision support systems — use cases
            extending far beyond motorsport to industrial IoT, manufacturing optimisation, and
            remote monitoring applications.
          </p>
        </div>

        <div className="fade-up">
          <h2>The Three Deliverables</h2>
          <div className="deliverable-cards">
            <div className="deliverable-card fade-up delay-1">
              <div className="deliverable-card__num">01</div>
              <div className="deliverable-card__title">Jarvis Live</div>
              <div className="deliverable-card__desc">2D Real-time analysis platform inspired by Atlas</div>
            </div>
            <div className="deliverable-card fade-up delay-2">
              <div className="deliverable-card__num">02</div>
              <div className="deliverable-card__title">Jarvis Post</div>
              <div className="deliverable-card__desc">Customizable post-race analysis platform </div>
            </div>
            <div className="deliverable-card fade-up delay-3">
              <div className="deliverable-card__num">03</div>
              <div className="deliverable-card__title">Jarvis VR</div>
              <div className="deliverable-card__desc">Educational VR environment</div>
            </div>
          </div>
        </div>

        <div className="fade-up">
          <h2>Team</h2>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-card__label">Team Lead</div>
              <div className="info-card__value">
                <Link to="/team/ece-okutan" className="team-link">Ece Okutan ↗</Link>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card__label">Developer</div>
              <div className="info-card__value">
                <Link to="/team/oltun-ozavci" className="team-link">Oltun Ozavci ↗</Link>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card__label">Developer</div>
              <div className="info-card__value">
                <Link to="/team/athena-chong" className="team-link">Athena Chong ↗</Link>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card__label">Developer</div>
              <div className="info-card__value">
                <Link to="/team/elinor-cheung" className="team-link">Elinor Cheung ↗</Link>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card__label">Developer</div>
              <div className="info-card__value">
                <Link to="/team/eima-miyasaka" className="team-link">Eima Miyasaka ↗</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="fade-up">
          <h2>Supervisors</h2>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-card__label">Supervisor</div>
              <div className="info-card__value">Prof. John McNamara</div>
            </div>
            <div className="info-card">
              <div className="info-card__label">Supervisor</div>
              <div className="info-card__value">Prof. Stephen Hilton</div>
            </div>
          </div>
        </div>

        <div className="fade-up">
          <h2>GitHub Repositories</h2>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-card__label">AI Fine-tuning</div>
              <div className="info-card__value">
                <a href="https://github.com/athena-c-22/f1-fine-tuning" target="_blank" rel="noopener noreferrer" style={{color:'#DC0000'}}>
                  f1-fine-tuning
                </a>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card__label">Live Telemetry</div>
              <div className="info-card__value">
                <a href="https://github.com/eceokutan/f1-live-telemetry" target="_blank" rel="noopener noreferrer" style={{color:'#DC0000'}}>
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
