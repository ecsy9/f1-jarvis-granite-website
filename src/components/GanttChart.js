import { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import './GanttChart.css';

const TOTAL_WEEKS   = 22;
const LABEL_W       = 180;
const PROJECT_START = new Date('2025-11-03');

const MONTHS = [
  { name: 'Nov', weeks: 4 },
  { name: 'Dec', weeks: 5 },
  { name: 'Jan', weeks: 4 },
  { name: 'Feb', weeks: 5 },
  { name: 'Mar', weeks: 4 },
];

const MEMBERS = {
  ece:    { name: 'Ece Okutan',    role: 'Team Lead',  photo: '/images/team/ece-okutan.jpg',    path: '/team/ece-okutan'    },
  oltun:  { name: 'Oltun Ozavci',  role: 'Developer',  photo: '/images/team/oltun-ozavci.jpg',   path: '/team/oltun-ozavci'  },
  athena: { name: 'Athena Chong',  role: 'Developer',  photo: '/images/team/athena-chong.jpg',   path: '/team/athena-chong'  },
  elinor: { name: 'Elinor Cheung', role: 'Developer',  photo: '/images/team/elinor-cheung.jpg',  path: '/team/elinor-cheung' },
  eima:   { name: 'Eima Miyasaka', role: 'Developer',  photo: '/images/team/eima-miyasaka.jpg',  path: '/team/eima-miyasaka' },
};

const TASKS = [
  {
    id: 1, name: 'Planning & Design', start: 1, end: 3, cat: 'other',
    deliverable: 'All',
    desc: 'Requirements gathering, system architecture design, UI/UX wireframes, and project scope definition across all three deliverables.',
    members: ['ece','eima','elinor','athena','oltun'],
  },
  {
    id: 2, name: 'Sim Data Integration', start: 4, end: 6, cat: 'integration',
    deliverable: 'Both Dashboards',
    desc: 'Windows shared memory interface reading 50+ telemetry channels at ~60 Hz — speed, RPM, throttle, brake, tire temps/pressures, suspension travel, camber, fuel, damage, and more',
    members: ['ece', 'elinor'],
  },
  {
    id: 3, name: '2D Live Telemetry Dashboard', start: 4, end: 11, cat: 'dev',
    deliverable: 'Jarvis Live',
    desc: 'PyQt5 + Matplotlib real-time dashboard displaying live telemetry, track map, lap delta, tire state, sector times, and AI race engineer commentary feed.',
    members: ['ece'],
  },
  {
    id: 4, name: '2D Post Telemetry Dashboard', start: 7, end: 14, cat: 'dev',
    deliverable: 'Jarvis Post',
    desc: 'PyQt5 + Matplotlib post-race dashboard displaying post-race telemetry graphs. Users can choose which graphs to show from a selection of 14 graphs, scroll through the timestamped race data',
    members: ['ece'],
  },
  {
    id: 5, name: 'Setting up STT-LLM-TTS Pipeline', start: 6, end: 12, cat: 'ai',
    deliverable: 'Jarvis Live',
    desc: '',
    members: ['eima'],
  },
  {
    id: 6, name: 'Integrating AI Pipeline to Dashboards', start: 7, end: 15, cat: 'integration',
    deliverable: 'Both Dashboards',
    desc: '',
    members: ['ece', 'eima'],
  },
  {
    id: 7, name: 'Race Engineer Fine-Tuning', start: 7, end: 13, cat: 'ai',
    deliverable: 'Jarvis Live',
    desc: 'QLoRA fine-tuning of Granite 3B on 1,258 filtered F1 telemetry–radio pairs. Produces terse radio-style instructions (≤48 tokens) from live telemetry snapshots.',
    members: ['elinor', 'athena'],
  },
  {
    id: 8, name: 'Post-Race Analyst Fine-Tuning', start: 12, end: 18, cat: 'ai',
    deliverable: 'Jarvis Post',
    desc: 'Knowledge distillation from Gemini onto Granite 4.0 Micro using 1,360 FastF1 examples. Generates structured 9-section engineering debriefs from telemetry JSON.',
    members: ['elinor', 'athena'],
  },
  {
    id: 9, name: 'Unreal Engine Environment Development', start: 6, end: 16, cat: 'vr',
    deliverable: 'Jarvis VR',
    desc: 'UE5 project scaffolding, SteamVR / Meta Quest integration, Blueprint architecture, and F1 cockpit environment asset pipeline.',
    members: ['oltun'],
  },
  {
    id: 10, name: 'User Interaction in VR', start: 14, end: 18, cat: 'vr',
    deliverable: 'Jarvis VR',
    desc: 'Immersive F1 cockpit with telemetry visualisation panels, interactive pit-wall displays, and AI race engineer voice interaction in VR.',
    members: ['oltun','eima'],
  },
  {
    id: 11, name: 'Integrating finetuned models into pipeline', start: 15, end: 18, cat: 'integration',
    deliverable: 'Both Dashboards',
    desc: '',
    members: ['eima'],
  },
  {
    id: 12, name: 'Testing', start: 14, end: 17, cat: 'other',
    deliverable: 'All',
    desc: 'Unit testing of telemetry ingestion, AI inference latency benchmarking, VR frame-rate profiling, and full end-to-end session validation.',
    members: ['ece','eima','elinor','athena','oltun'],
  },
  {
    id: 13, name: 'Interviews with Sim Racers & UCLR Engineers', start: 16, end: 18, cat: 'other',
    deliverable: 'Both Dashboards',
    desc: '',
    members: ['ece','eima'],
  },
  {
    id: 14, name: 'Dashboard & AI Improvements After Feedback', start: 16, end: 19, cat: 'dev',
    deliverable: 'Both Dashboards',
    desc: '',
    members: ['ece','eima'],
  },
  {
    id: 15, name: 'Packaging & Distribution', start: 18, end: 20, cat: 'dev',
    deliverable: 'Both Dashboards',
    desc: 'Connected all subsystems and the dataflow between them. Created a main page and settings page, making sure that the user would have a smooth experience navigating the app with all functionalities',
    members: ['ece'],
  },
  {
    id: 17, name: 'Website', start: 18, end: 21, cat: 'other',
    deliverable: 'All',
    desc: '',
    members: ['ece','athena','elinor'],
  },
  {
    id: 18, name: 'Documentation & Finalisation', start: 18, end: 21, cat: 'other',
    deliverable: 'All',
    desc: 'User & deployment manual, GDPR statement, project website, demonstration video, and final report submission.',
    members: ['ece','eima','elinor','athena','oltun'],
  },
];


const DELIVERABLES = ['Jarvis Live', 'Jarvis Post', 'Jarvis VR', 'Both Dashboards', 'All'];
const TAGS = [
  ['dev',         'Development'],
  ['ai',          'AI'],
  ['integration', 'Integration'],
  ['vr',          'VR'],
  ['other',       'Other'],
];

function GanttInner() {
  const [hoveredId, setHoveredId]   = useState(null);
  const [filterType, setFilterType] = useState('default');
  const [filterVal,  setFilterVal]  = useState(null);
  const [menuOpen,   setMenuOpen]   = useState(null);
  const leaveTimer = useRef(null);
  const menuTimer  = useRef(null);

  const elapsed   = (Date.now() - PROJECT_START.getTime()) / (7 * 24 * 60 * 60 * 1000);
  const todayWeek = Math.min(Math.max(elapsed, 0), TOTAL_WEEKS);

  const setFilter = useCallback((type, val) => {
    if (filterType === type && filterVal === val) {
      setFilterType('default');
      setFilterVal(null);
    } else {
      setFilterType(type);
      setFilterVal(val);
    }
    setMenuOpen(null);
  }, [filterType, filterVal]);

  const openMenu = useCallback((name) => {
    clearTimeout(menuTimer.current);
    setMenuOpen(name);
  }, []);

  const closeMenu = useCallback(() => {
    menuTimer.current = setTimeout(() => setMenuOpen(null), 200);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(menuTimer.current);
  }, []);

  const visibleTasks = TASKS.filter(task => {
    if (filterType === 'default') return true;
    if (filterType === 'person') return task.members.includes(filterVal);
    if (filterType === 'deliverable') {
      if (filterVal === 'All') return true;
      if (task.deliverable === 'All') return true;
      if (task.deliverable === filterVal) return true;
      if (filterVal === 'Both Dashboards') return task.deliverable === 'Jarvis Live' || task.deliverable === 'Jarvis Post';
      if (task.deliverable === 'Both Dashboards') return filterVal === 'Jarvis Live' || filterVal === 'Jarvis Post';
      return false;
    }
    if (filterType === 'tag') return task.cat === filterVal;
    return true;
  });

  const handleRowEnter = useCallback((id) => {
    clearTimeout(leaveTimer.current);
    setHoveredId(id);
  }, []);

  const handleRowLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setHoveredId(null), 400);
  }, []);

  const handleTooltipEnter = useCallback(() => {
    clearTimeout(leaveTimer.current);
  }, []);

  const handleTooltipLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setHoveredId(null), 400);
  }, []);

  return (
    <>
      {/* ── Filters ── */}
      <div className="gc__filters">
        <span className="gc__filter-label">Filter:</span>

        <button
          className={`gc__filter-tab${filterType === 'default' ? ' gc__filter-tab--active' : ''}`}
          onClick={() => { setFilterType('default'); setFilterVal(null); }}
        >All</button>

        <span className="gc__filter-sep" />

        {[
          { key: 'person',      label: 'By Person',      active: filterType === 'person' },
          { key: 'deliverable', label: 'By Deliverable', active: filterType === 'deliverable' },
          { key: 'tag',         label: 'By Tag',         active: filterType === 'tag' },
        ].map(({ key, label, active }) => (
          <div
            key={key}
            className="gc__filter-menu"
            onMouseEnter={() => openMenu(key)}
            onMouseLeave={closeMenu}
          >
            <button className={`gc__filter-tab${active ? ' gc__filter-tab--active' : ''}`}>
              {label}
              {active && filterVal && (
                <span className="gc__filter-tab-val">
                  {key === 'person' ? MEMBERS[filterVal].name.split(' ')[0] : filterVal}
                </span>
              )}
              <span className="gc__filter-tab-arrow">▾</span>
            </button>

            {menuOpen === key && (
              <div className="gc__filter-dropdown" onMouseEnter={cancelClose} onMouseLeave={closeMenu}>
                {key === 'person' && Object.entries(MEMBERS).map(([mKey, m]) => (
                  <button
                    key={mKey}
                    className={`gc__filter-pill gc__filter-pill--avatar${filterType === 'person' && filterVal === mKey ? ' gc__filter-pill--active' : ''}`}
                    onClick={() => setFilter('person', mKey)}
                  >
                    <img src={m.photo} alt={m.name} className="gc__filter-avatar" />
                    <span>{m.name.split(' ')[0]}</span>
                  </button>
                ))}
                {key === 'deliverable' && DELIVERABLES.map(d => (
                  <button
                    key={d}
                    className={`gc__filter-pill${filterType === 'deliverable' && filterVal === d ? ' gc__filter-pill--active' : ''}`}
                    onClick={() => setFilter('deliverable', d)}
                  >{d}</button>
                ))}
                {key === 'tag' && TAGS.map(([cat, tagLabel]) => (
                  <button
                    key={cat}
                    className={`gc__filter-pill gc__filter-pill--tag${filterType === 'tag' && filterVal === cat ? ' gc__filter-pill--active' : ''}`}
                    onClick={() => setFilter('tag', cat)}
                  >
                    <span className="gc__filter-tag-dot" style={{ background: `var(--cat-${cat})` }} />
                    {tagLabel}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Header ── */}
      <div className="gc__head">
        <div className="gc__head-corner">Task</div>
        <div className="gc__head-timeline">
          <div className="gc__months">
            {MONTHS.map(m => (
              <div key={m.name} className="gc__month" style={{ flex: m.weeks }}>{m.name}</div>
            ))}
          </div>
          <div className="gc__weeks">
            {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
              <div key={i + 1} className="gc__week">{i + 1}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="gc__body">
        {visibleTasks.map(task => {
          const barWeeks = task.end - task.start + 1;
          const barLeft  = `${((task.start - 1) / TOTAL_WEEKS) * 100}%`;
          const barWidth = `${(barWeeks / TOTAL_WEEKS) * 100}%`;
          const done     = task.end < todayWeek;
          const hov      = hoveredId === task.id;
          const progress = Math.min(100, Math.max(0,
            ((todayWeek - (task.start - 1)) / barWeeks) * 100
          ));
          const tooltipRight = task.start > 13;

          return (
            <div
              key={task.id}
              className={`gc__row${hov ? ' gc__row--hov' : ''}`}
            >
              <div className="gc__task-label">{task.name}</div>
              <div
                className="gc__track"
                onMouseEnter={() => handleRowEnter(task.id)}
                onMouseLeave={handleRowLeave}
              >
                <div
                  className={[
                    'gc__bar',
                    `gc__bar--${task.cat}`,
                    done ? 'gc__bar--done' : '',
                    hov  ? 'gc__bar--hov'  : '',
                  ].filter(Boolean).join(' ')}
                  style={{ left: barLeft, width: barWidth }}
                >
                  <div className="gc__bar-fill" style={{ width: `${progress}%` }} />
                  {barWeeks >= 6 && (
                    <span className="gc__bar-label">{task.deliverable}</span>
                  )}
                  {task.members.length > 0 && (
                    <div className="gc__bar-avatars">
                      {task.members.map((key, i) => {
                        const m = MEMBERS[key];
                        const total = task.members.length;
                        const overlap = total >= 4 ? -13 : -8;
                        return (
                          <Link
                            key={key}
                            to={m.path}
                            className="gc__avatar"
                            title={`${m.name} — click to view profile`}
                            onClick={e => e.stopPropagation()}
                            style={i < total - 1 ? { marginLeft: overlap } : {}}
                          >
                            <img src={m.photo} alt={m.name} className="gc__avatar-img" />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Sticky tooltip — stays visible when cursor moves into it */}
                {hov && (
                  <div
                    className="gc__tooltip"
                    style={tooltipRight
                      ? { right: `${(1 - task.end / TOTAL_WEEKS) * 100}%` }
                      : { left: barLeft }
                    }
                    onMouseEnter={handleTooltipEnter}
                    onMouseLeave={handleTooltipLeave}
                  >
                    <div className="gc__tooltip-head">
                      <strong>{task.name}</strong>
                      <span className={`gc__badge gc__badge--${task.cat}`}>{task.deliverable}</span>
                    </div>
                    <p className="gc__tooltip-desc">{task.desc}</p>
                    <div className="gc__tooltip-meta">
                      <span>Wk {task.start} → Wk {task.end} · {barWeeks}w</span>
                    </div>
                    {task.members.length > 0 && (
                      <div className="gc__tooltip-members">
                        <span className="gc__tooltip-members-label">Team</span>
                        {task.members.map(key => {
                          const m = MEMBERS[key];
                          return (
                            <Link key={key} to={m.path} className="gc__tooltip-member">
                              <img src={m.photo} alt={m.name} className="gc__tooltip-avatar" />
                              <span className="gc__tooltip-member-info">
                                <span className="gc__tooltip-member-name">{m.name} ↗</span>
                                <span className="gc__tooltip-member-role">{m.role}</span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Legend ── */}
      <div className="gc__legend">
        {TAGS.map(([cat, label]) => (
          <div key={cat} className="gc__legend-item">
            <span className={`gc__legend-dot gc__legend-dot--${cat}`} />
            {label}
          </div>
        ))}
        <div className="gc__legend-item gc__legend-item--right">
          <span className="gc__legend-dot gc__legend-dot--done" />
          Completed
        </div>
      </div>
    </>
  );
}

export default function GanttChart() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="gc">
        <button className="gc__expand-btn" onClick={() => setExpanded(true)} title="Expand chart">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Expand
        </button>
        <GanttInner />
      </div>

      {expanded && createPortal(
        <div className="gc-modal-overlay" onClick={() => setExpanded(false)}>
          <div className="gc-modal" onClick={e => e.stopPropagation()}>
            <button className="gc-modal__close" onClick={() => setExpanded(false)}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Close
            </button>
            <div className="gc gc--modal">
              <GanttInner />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
