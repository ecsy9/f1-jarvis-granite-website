import { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import './GanttChart.css';

const TOTAL_WEEKS   = 21;
const LABEL_W       = 180;
const PROJECT_START = new Date('2025-11-03');

const MONTHS = [
  { name: 'Nov', weeks: 4 },
  { name: 'Dec', weeks: 5 },
  { name: 'Jan', weeks: 4 },
  { name: 'Feb', weeks: 5 },
  { name: 'Mar', weeks: 3 },
];

const MEMBERS = {
  ece:    { name: 'Ece Okutan',    role: 'Team Lead',  initials: 'EO', color: '#c1121f', photo: '/images/team/ece-okutan.jpg',    path: '/team/ece-okutan'    },
  oltun:  { name: 'Oltun Ozavci',  role: 'Developer',  initials: 'OO', color: '#669bbc', photo: '/images/team/oltun-ozavci.jpg',   path: '/team/oltun-ozavci'  },
  athena: { name: 'Athena Chong',  role: 'Developer',  initials: 'AC', color: '#e85d04', photo: '/images/team/athena-chong.jpg',   path: '/team/athena-chong'  },
  elinor: { name: 'Elinor Cheung', role: 'Developer',  initials: 'EC', color: '#4a9e6b', photo: '/images/team/elinor-cheung.jpg',  path: '/team/elinor-cheung' },
  eima:   { name: 'Eima Miyasaka', role: 'Developer',  initials: 'EM', color: '#8b6fd4', photo: '/images/team/eima-miyasaka.jpg',  path: '/team/eima-miyasaka' },
};

const TASKS = [
  {
    id: 1, name: 'Planning & Design', start: 1, end: 3, cat: 'planning',
    deliverable: 'All',
    desc: 'Requirements gathering, system architecture design, UI/UX wireframes, and project scope definition across all three deliverables.',
    members: [],
  },
  {
    id: 2, name: 'Assetto Corsa Data Integration', start: 4, end: 8, cat: 'dev',
    deliverable: 'Jarvis Live',
    desc: 'Windows shared memory interface reading 50+ telemetry channels at ~60 Hz — speed, RPM, throttle, brake, tire temps/pressures, suspension travel, camber, fuel, and damage.',
    members: [],
  },
  {
    id: 3, name: '2D Live Telemetry Dashboard', start: 4, end: 13, cat: 'dev',
    deliverable: 'Jarvis Live',
    desc: 'PyQt5 + Matplotlib real-time dashboard displaying live telemetry, track map, lap delta, tire state, sector times, and AI race engineer commentary feed.',
    members: ['ece'],
  },
  {
    id: 4, name: 'Race Engineer Fine-Tuning', start: 7, end: 13, cat: 'ai',
    deliverable: 'Jarvis Live',
    desc: 'QLoRA fine-tuning of Granite 3B on 1,258 filtered F1 telemetry–radio pairs. Produces terse radio-style instructions (≤48 tokens) from live telemetry snapshots.',
    members: [],
  },
  {
    id: 5, name: 'Post-Race Analyst Fine-Tuning', start: 12, end: 18, cat: 'ai',
    deliverable: 'Jarvis Post',
    desc: 'Knowledge distillation from Gemini onto Granite 4.0 Micro using 1,360 FastF1 examples. Generates structured 9-section engineering debriefs from telemetry JSON.',
    members: [],
  },
  {
    id: 6, name: 'Unreal Engine Setup', start: 7, end: 13, cat: 'vr',
    deliverable: 'Jarvis VR',
    desc: 'UE5 project scaffolding, SteamVR / Meta Quest integration, Blueprint architecture, and F1 cockpit environment asset pipeline.',
    members: [],
  },
  {
    id: 7, name: 'User Interaction in VR', start: 11, end: 18, cat: 'vr',
    deliverable: 'Jarvis VR',
    desc: 'Immersive F1 cockpit with telemetry visualisation panels, interactive pit-wall displays, and AI race engineer voice interaction in VR.',
    members: ['oltun'],
  },
  {
    id: 8, name: 'Integration', start: 15, end: 18, cat: 'dev',
    deliverable: 'All',
    desc: 'End-to-end assembly: shared memory → SQLite → AI inference pipeline → PyQt5 UI → voice I/O. Packaged as a single PyInstaller executable.',
    members: [],
  },
  {
    id: 9, name: 'Testing', start: 15, end: 18, cat: 'dev',
    deliverable: 'All',
    desc: 'Unit testing of telemetry ingestion, AI inference latency benchmarking, VR frame-rate profiling, and full end-to-end session validation.',
    members: [],
  },
  {
    id: 10, name: 'Documentation & Finalisation', start: 18, end: 21, cat: 'docs',
    deliverable: 'All',
    desc: 'User & deployment manual, GDPR statement, project website, demonstration video, and final report submission.',
    members: [],
  },
];

const SHORT_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function weekToDate(week) {
  const d = new Date(PROJECT_START);
  d.setDate(d.getDate() + (week - 1) * 7);
  return `${d.getDate()} ${SHORT_MONTHS[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`;
}

function GanttInner() {
  const [hoveredId, setHoveredId] = useState(null);
  const leaveTimer = useRef(null);

  const elapsed   = (Date.now() - PROJECT_START.getTime()) / (7 * 24 * 60 * 60 * 1000);
  const todayWeek = Math.min(Math.max(elapsed, 0), TOTAL_WEEKS);

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
        {TASKS.map(task => {
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
              onMouseEnter={() => handleRowEnter(task.id)}
              onMouseLeave={handleRowLeave}
            >
              <div className="gc__task-label">{task.name}</div>
              <div className="gc__track">
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
                      {task.members.map(key => {
                        const m = MEMBERS[key];
                        return (
                          <Link
                            key={key}
                            to={m.path}
                            className="gc__avatar"
                            title={`${m.name} — click to view profile`}
                            onClick={e => e.stopPropagation()}
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
                      <span>{weekToDate(task.start)} → {weekToDate(task.end)}</span>
                      <span>Wks {task.start}–{task.end} · {barWeeks}w</span>
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
        {[
          ['planning', 'Planning'],
          ['dev',      'Development'],
          ['ai',       'AI / ML'],
          ['vr',       'VR'],
          ['docs',     'Documentation'],
        ].map(([cat, label]) => (
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
