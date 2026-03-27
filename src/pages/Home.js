import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import GanttChart from '../components/GanttChart';

const logo     = `${process.env.PUBLIC_URL}/images/jarvis-logo.svg`;
const carImage = `${process.env.PUBLIC_URL}/images/sf26-overhead.png`;
const logoIBM  = `${process.env.PUBLIC_URL}/images/logos/ibm.png`;
const logoAC   = `${process.env.PUBLIC_URL}/images/logos/assetto-corsa.png`;
const logoUE   = `${process.env.PUBLIC_URL}/images/logos/ucl.png`;
const logoFS   = `${process.env.PUBLIC_URL}/images/logos/formula-student.png`;
const logoCM   = `${process.env.PUBLIC_URL}/images/logos/content-manager.webp`;

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

        <div className="fade-up deliverables-section">
          <h2>The Three Deliverables</h2>
          <div className="deliverable-rows">
            <div className="deliverable-row fade-up delay-1">
              <div className="deliverable-row__body">
                <div className="deliverable-row__accent" />
                <div className="deliverable-row__num">01</div>
                <div className="deliverable-row__text">
                  <div className="deliverable-row__title">Jarvis Live</div>
                  <div className="deliverable-row__desc">2D real-time telemetry analysis platform inspired by Atlas. Live speed, RPM, throttle, brake, tire state, lap delta, and AI race engineer commentary — all updated at 60 Hz during your session.</div>
                </div>
              </div>
              <div className="deliverable-row__img-wrap">
                <img src={`${process.env.PUBLIC_URL}/images/deliverables/jarvis-live.png`} alt="Jarvis Live screenshot" className="deliverable-row__img" />
              </div>
            </div>

            <div className="deliverable-row fade-up delay-2">
              <div className="deliverable-row__body">
                <div className="deliverable-row__accent" />
                <div className="deliverable-row__num">02</div>
                <div className="deliverable-row__text">
                  <div className="deliverable-row__title">Jarvis Post</div>
                  <div className="deliverable-row__desc">Post-race debrief powered by Granite 4.0 Micro. Generates a structured 9-section engineering debrief from session telemetry — sector breakdowns, tire wear, fuel strategy, and actionable coaching notes.</div>
                </div>
              </div>
              <div className="deliverable-row__img-wrap">
                <img src={`${process.env.PUBLIC_URL}/images/deliverables/jarvis-post.png`} alt="Jarvis Post screenshot" className="deliverable-row__img" />
              </div>
            </div>

            <div className="deliverable-row fade-up delay-3">
              <div className="deliverable-row__body">
                <div className="deliverable-row__accent" />
                <div className="deliverable-row__num">03</div>
                <div className="deliverable-row__text">
                  <div className="deliverable-row__title">Jarvis VR</div>
                  <div className="deliverable-row__desc">Immersive Unreal Engine 5 VR cockpit with interactive telemetry panels, pit-wall displays, and AI race engineer voice interaction — bridging simulation and real-world F1 engineering.</div>
                </div>
              </div>
              <div className="deliverable-row__img-wrap">
                <img src={`${process.env.PUBLIC_URL}/images/deliverables/jarvis-vr.png`} alt="Jarvis VR screenshot" className="deliverable-row__img" />
              </div>
            </div>
          </div>
        </div>

        <div className="fade-up">
          <h2>Team</h2>
          <div className="info-cards info-cards--team">
            {[
              { label: 'Team Lead', name: 'Ece Okutan',    path: '/team/ece-okutan',    photo: `${process.env.PUBLIC_URL}/images/team/ece-okutan.jpg`    },
              { label: 'Developer', name: 'Oltun Ozavci',  path: '/team/oltun-ozavci',  photo: `${process.env.PUBLIC_URL}/images/team/oltun-ozavci.jpg`  },
              { label: 'Developer', name: 'Athena Chong',  path: '/team/athena-chong',  photo: `${process.env.PUBLIC_URL}/images/team/athena-chong.jpg`  },
              { label: 'Developer', name: 'Elinor Cheung', path: '/team/elinor-cheung', photo: `${process.env.PUBLIC_URL}/images/team/elinor-cheung.jpg` },
              { label: 'Developer', name: 'Eima Miyasaka', path: '/team/eima-miyasaka', photo: `${process.env.PUBLIC_URL}/images/team/eima-miyasaka.jpg` },
            ].map(m => (
              <div key={m.path} className="info-card info-card--person">
                <img src={m.photo} alt={m.name} className="info-card__photo" />
                <div className="info-card__label">{m.label}</div>
                <div className="info-card__value">
                  <Link to={m.path} className="team-link">{m.name} ↗</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-up">
          <h2>Supervisors</h2>
          <div className="info-cards">
            {[
              { name: 'Prof. John McNamara',  label: 'IBM',                     linkedin: 'https://www.linkedin.com/in/jonmcnamara/'  },
              { name: 'Prof. Stephen Hilton', label: 'UCL School of Pharmacy', linkedin: 'https://www.linkedin.com/in/hiltonlab/'    },
            ].map(s => (
              <a
                key={s.name}
                href={s.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="info-card info-card--supervisor"
              >
                <div className="info-card__label">{s.label}</div>
                <div className="info-card__value">{s.name} ↗</div>
              </a>
            ))}
          </div>
        </div>

        <div className="fade-up">
          <h2>Project Timeline</h2>
          <GanttChart />
        </div>

        <div className="fade-up" style={{paddingTop: '3.5rem'}}>
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
          <h2>Final Video</h2>
          <div
            style={{
              position: 'relative',
              paddingTop: '56.25%',
              marginTop: '1.5rem',
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            <iframe
              src="https://drive.google.com/file/d/1kNOOO0j6PoPySxjw2H2uZimdM9lFdZN_/preview"
              title="Final Video — F1 Jarvis Granite"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
            If the embedded player does not load, you can open the video directly in Google Drive:
            {' '}
            <a
              href="https://drive.google.com/file/d/1kNOOO0j6PoPySxjw2H2uZimdM9lFdZN_/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              Final video
            </a>
            .
          </p>
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
