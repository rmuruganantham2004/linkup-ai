import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore, useConnectionStore, useEventStore } from '../store/store';
import { Link } from 'react-router-dom';
import {
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineUserGroup,
  HiOutlineTrendingUp,
  HiOutlineArrowRight,
  HiOutlineChat,
  HiOutlineFire,
  HiOutlineCalendar,
} from 'react-icons/hi';
import Navbar from '../components/Navbar';
import { staggerContainer, staggerItem } from '../animations/variants';

const heatmapValues = [30, 45, 60, 80, 95, 70, 50, 40, 60, 90, 85, 55];
const hours = ['6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm', '12am'];

export default function Dashboard() {
  const { user } = useAuthStore();
  const { recommendations } = useConnectionStore();
  const { rooms } = useEventStore();
  const [activeRoom, setActiveRoom] = useState(null);

  const trendingSkills = [
    { name: 'PyTorch', color: '#ef4444' },
    { name: 'FastAPI', color: '#06b6d4' },
    { name: 'React', color: '#61dafb' },
    { name: 'Solidity', color: '#a855f7' },
    { name: 'Kubernetes', color: '#326ce5' },
    { name: 'TailwindCSS', color: '#38bdf8' },
    { name: 'LangChain', color: '#10b981' },
    { name: 'Rust', color: '#f97316' },
  ];

  return (
    <div className="min-h-screen bg-dark-900 cyber-grid pb-16">
      <Navbar />

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 0' }}>

        {/* ── Header Row ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
              <div style={{ width: '4px', height: '36px', borderRadius: '4px', background: 'linear-gradient(180deg, #a855f7, #06b6d4)' }} />
              <h1 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: "'Orbitron', sans-serif", color: 'white', margin: 0 }}>
                System Dashboard
              </h1>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginLeft: '16px', marginTop: 0 }}>
              Welcome back, <span style={{ color: '#06b6d4', fontWeight: 700 }}>{user?.name || 'Developer'}</span>. AI engine is online.
            </p>
          </div>
          <Link
            to="/discover"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 24px', borderRadius: '12px', fontWeight: 700,
              color: 'white', textDecoration: 'none', fontSize: '0.875rem',
              background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
              boxShadow: '0 4px 20px rgba(168,85,247,0.35)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <HiOutlineLightningBolt /> Start Swiping
          </Link>
        </motion.div>

        {/* ══════════════════════════════════════
             SECTION 1 — AI Recommendations
        ══════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(168,85,247,0.2)',
            borderRadius: '20px',
            padding: '28px',
            marginBottom: '20px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '200px', height: '200px',
            background: 'radial-gradient(circle, rgba(168,85,247,0.08), transparent)',
            borderRadius: '50%', pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <HiOutlineSparkles style={{ color: '#a855f7', fontSize: '1.25rem', animation: 'pulse 2s infinite' }} />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', margin: 0, fontFamily: "'Orbitron', sans-serif" }}>
              AI Recommendations
            </h2>
            <span style={{
              fontSize: '0.65rem', fontWeight: 700, color: '#a855f7',
              background: 'rgba(168,85,247,0.12)', padding: '2px 8px', borderRadius: '99px',
              border: '1px solid rgba(168,85,247,0.3)', marginLeft: 'auto',
            }}>
              LIVE ENGINE
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {recommendations.slice(0, 4).map((u, i) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '14px', padding: '16px',
                  display: 'flex', flexDirection: 'column', gap: '10px',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.border = '1px solid rgba(6,182,212,0.4)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(6,182,212,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 700, color: '#06b6d4',
                    background: 'rgba(6,182,212,0.1)', padding: '2px 8px', borderRadius: '99px',
                  }}>
                    {u.matchScore}% Match
                  </span>
                  {u.isOnline && (
                    <span style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: '#10b981', boxShadow: '0 0 6px #10b981',
                    }} />
                  )}
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem', margin: '0 0 2px' }}>{u.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: '#a855f7', margin: '0 0 6px', fontWeight: 600 }}>{u.role}</p>
                  <p style={{ fontSize: '0.7rem', color: '#6b7280', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>"{u.matchReason}"</p>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {u.skills.slice(0, 2).map(s => (
                    <span key={s} style={{
                      fontSize: '0.6rem', color: '#d1d5db',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: '1px 6px', borderRadius: '6px',
                    }}>{s}</span>
                  ))}
                </div>
                <Link
                  to="/discover"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    fontSize: '0.72rem', fontWeight: 700, color: '#06b6d4',
                    textDecoration: 'none', marginTop: '4px',
                  }}
                >
                  View Profile <HiOutlineArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════
             SECTIONS 2 & 3 — Heatmap + Analytics (side by side)
        ══════════════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>

          {/* Section 2 — Match Heatmap */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(6,182,212,0.2)',
              borderRadius: '20px', padding: '28px',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <HiOutlineFire style={{ color: '#f59e0b', fontSize: '1.2rem' }} />
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', margin: 0, fontFamily: "'Orbitron', sans-serif" }}>
                Match Heatmap
              </h2>
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.75rem', marginBottom: '20px', marginTop: 0 }}>
              Active Peak (8–10 PM) — Higher response rate
            </p>

            {/* Bar chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '80px' }}>
              {heatmapValues.map((val, idx) => (
                <div
                  key={idx}
                  title={`${hours[idx] || ''}: ${val}% activity`}
                  style={{
                    flex: 1,
                    height: `${val}%`,
                    borderRadius: '4px',
                    background: idx === 4 || idx === 9
                      ? 'linear-gradient(180deg, #a855f7, #7c3aed)'
                      : 'rgba(255,255,255,0.1)',
                    boxShadow: idx === 4 || idx === 9 ? '0 0 12px rgba(168,85,247,0.6)' : 'none',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.7'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ fontSize: '0.6rem', color: '#4b5563' }}>6am</span>
              <span style={{ fontSize: '0.6rem', color: '#a855f7', fontWeight: 700 }}>8–10pm ★</span>
              <span style={{ fontSize: '0.6rem', color: '#4b5563' }}>12am</span>
            </div>
          </motion.section>

          {/* Section 3 — Event Analytics */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: '20px', padding: '28px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <HiOutlineCalendar style={{ color: '#10b981', fontSize: '1.2rem' }} />
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', margin: 0, fontFamily: "'Orbitron', sans-serif" }}>
                Event Analytics
              </h2>
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.75rem', marginBottom: '20px', marginTop: 0 }}>
              Participating in AI Hackathon
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'Ongoing Hubs', value: '4', icon: '🔴', color: '#ef4444' },
                { label: 'New Matches', value: '12', icon: '✨', color: '#a855f7' },
                { label: 'Connections', value: '38', icon: '🤝', color: '#06b6d4' },
                { label: 'Events Joined', value: '3', icon: '📅', color: '#10b981' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${stat.color}22`,
                    borderRadius: '12px', padding: '14px',
                    transition: 'all 0.2s', cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.border = `1px solid ${stat.color}55`;
                    e.currentTarget.style.background = `${stat.color}08`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.border = `1px solid ${stat.color}22`;
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }}
                >
                  <div style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{stat.icon}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: stat.color, fontFamily: "'Orbitron', sans-serif" }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#6b7280', marginTop: '2px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* ══════════════════════════════════════
             SECTIONS 4a & 4b — Active Rooms + Trending Skills (side by side)
        ══════════════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '20px' }}>

          {/* Section 4a — Active Rooms */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px', padding: '28px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <HiOutlineUserGroup style={{ color: '#06b6d4', fontSize: '1.2rem' }} />
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', margin: 0, fontFamily: "'Orbitron', sans-serif" }}>
                Active Rooms
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {rooms.slice(0, 5).map((room) => (
                <Link
                  key={room.id}
                  to="/events"
                  onClick={() => setActiveRoom(room.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 16px', borderRadius: '12px', textDecoration: 'none',
                    background: activeRoom === room.id ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.04)',
                    border: activeRoom === room.id ? '1px solid rgba(168,85,247,0.4)' : '1px solid rgba(255,255,255,0.07)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(168,85,247,0.08)';
                    e.currentTarget.style.border = '1px solid rgba(168,85,247,0.35)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    if (activeRoom !== room.id) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)';
                    }
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{room.icon}</span>
                    <div>
                      <h4 style={{ fontWeight: 700, color: 'white', fontSize: '0.875rem', margin: '0 0 2px' }}>{room.name}</h4>
                      <p style={{ fontSize: '0.7rem', color: '#6b7280', margin: 0 }}>{room.members} members online</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {room.isLive && (
                      <span style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.7)',
                      }} />
                    )}
                    <HiOutlineChat style={{ color: '#6b7280', fontSize: '1rem' }} />
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Section 4b — Trending Skills */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px', padding: '28px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <HiOutlineTrendingUp style={{ color: '#ec4899', fontSize: '1.2rem' }} />
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', margin: 0, fontFamily: "'Orbitron', sans-serif" }}>
                Trending Skills
              </h2>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#6b7280', marginBottom: '18px', marginTop: 0 }}>
              Most requested at your hackathon hubs
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {trendingSkills.map((skill, i) => (
                <div
                  key={skill.name}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700, color: '#6b7280',
                      width: '16px', textAlign: 'right',
                    }}>#{i + 1}</span>
                    <div style={{
                      flex: 1, height: '6px', borderRadius: '3px',
                      background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${100 - i * 10}%`,
                        background: skill.color,
                        borderRadius: '3px',
                        boxShadow: `0 0 6px ${skill.color}80`,
                      }} />
                    </div>
                  </div>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 700,
                    color: skill.color, marginLeft: '12px',
                    minWidth: '80px', textAlign: 'right',
                  }}>
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

        </div>
      </main>
    </div>
  );
}
