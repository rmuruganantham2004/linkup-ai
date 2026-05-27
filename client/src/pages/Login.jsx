import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/store';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineArrowRight, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const panelVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const floatVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' } }),
};

const STATS = [
  { value: '12K+', label: 'Developers' },
  { value: '340+', label: 'Hackathons' },
  { value: '95%', label: 'Match Rate' },
];

const TESTIMONIAL = {
  text: '"Found my co-founder in 3 hours at HackMIT. The AI match was spot-on."',
  name: 'Priya S.',
  role: 'AI/ML Engineer',
  avatar: 'P',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill in all fields'); return; }
    try {
      const success = await login(email, password);
      if (success) {
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials — check your email or password');
      }
    } catch {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleOAuth = (provider) => {
    toast(`Authenticating with ${provider}...`, { icon: '🔐' });
    setTimeout(() => {
      login('oauth@linkup.ai', 'oauth-password');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#0a0a0f', fontFamily: 'Inter, sans-serif' }}>
      <Toaster position="top-right" toastOptions={{ style: { background: '#1a1a2e', color: '#e2e8f0', border: '1px solid rgba(168,85,247,0.3)' } }} />

      {/* ── Left Panel: Form ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: '440px' }}>

          {/* Logo */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Orbitron, sans-serif', fontWeight: 800, color: 'white', fontSize: '16px', boxShadow: '0 0 16px rgba(168,85,247,0.4)' }}>L</div>
              <span style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '18px', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LinkUp AI</span>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: '36px' }}>
            <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.9rem', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Welcome Back</h2>
            <p style={{ color: 'rgba(226,232,240,0.5)', fontSize: '0.9rem' }}>Sign in to access your network</p>
          </motion.div>

          {/* OAuth Buttons */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
            {[
              { provider: 'GitHub', icon: <FaGithub size={18} />, label: 'GitHub' },
              { provider: 'Google', icon: <FaGoogle size={16} />, label: 'Google' },
            ].map(({ provider, icon, label }) => (
              <motion.button key={provider} type="button" onClick={() => handleOAuth(provider)}
                whileHover={{ scale: 1.03, background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(168,85,247,0.4)' }}
                whileTap={{ scale: 0.97 }}
                style={{ padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(226,232,240,0.8)', fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}>
                {icon} {label}
              </motion.button>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontSize: '0.75rem', color: 'rgba(226,232,240,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>or continue with email</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          </motion.div>

          {/* Form */}
          <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} onSubmit={handleSubmit}>

            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Email Address</label>
              <div style={{ position: 'relative', marginTop: '8px' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focusedField === 'email' ? '#a855f7' : 'rgba(226,232,240,0.3)', fontSize: '18px', display: 'flex', transition: 'color 0.2s', pointerEvents: 'none' }}>
                  <HiOutlineMail />
                </span>
                <input
                  type="email" placeholder="you@example.com" value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  style={{ ...inputStyle, ...(focusedField === 'email' ? inputFocusStyle : {}) }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative', marginTop: '8px' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focusedField === 'password' ? '#a855f7' : 'rgba(226,232,240,0.3)', fontSize: '18px', display: 'flex', transition: 'color 0.2s', pointerEvents: 'none' }}>
                  <HiOutlineLockClosed />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  style={{ ...inputStyle, ...(focusedField === 'password' ? inputFocusStyle : {}), paddingRight: '44px' }}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(226,232,240,0.4)', fontSize: '18px', display: 'flex', padding: 0 }}>
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right', marginBottom: '28px' }}>
              <span style={{ fontSize: '0.8rem', color: '#a855f7', cursor: 'pointer', fontWeight: 500 }}>Forgot password?</span>
            </div>

            <motion.button type="submit" disabled={isLoading}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(168,85,247,0.5)' }}
              whileTap={{ scale: 0.98 }}
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', color: 'white', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 20px rgba(168,85,247,0.35)', opacity: isLoading ? 0.7 : 1, marginBottom: '24px' }}>
              {isLoading ? (
                <><span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} /> Authenticating...</>
              ) : (
                <>Connect to Platform <HiOutlineArrowRight /></>
              )}
            </motion.button>

            <p style={{ textAlign: 'center', color: 'rgba(226,232,240,0.5)', fontSize: '0.875rem' }}>
              New here?{' '}
              <Link to="/signup" style={{ color: '#a855f7', fontWeight: 600, textDecoration: 'none' }}>Create an account</Link>
            </p>
          </motion.form>
        </div>
      </div>

      {/* ── Right Panel: Visual ── */}
      <motion.div variants={panelVariant} initial="hidden" animate="visible"
        style={{ flex: '0 0 46%', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #0a0520 0%, #050f1a 60%, #0a0a0f 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 50px' }}>

        {/* Orbs */}
        <div style={{ position: 'absolute', top: '-100px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)', filter: 'blur(50px)', animation: 'floatOrb2 14s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'floatOrb1 18s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '40%', left: '10%', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)', filter: 'blur(30px)' }} />

        {/* Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Headline */}
          <motion.h2 custom={0} variants={floatVariant} initial="hidden" animate="visible"
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: 'white', lineHeight: 1.25, marginBottom: '20px' }}>
            Your Network,{' '}
            <span style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Supercharged</span>
          </motion.h2>

          <motion.p custom={1} variants={floatVariant} initial="hidden" animate="visible"
            style={{ color: 'rgba(226,232,240,0.55)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '44px' }}>
            Real-time AI matchmaking connects you with builders who complement your skills — instantly, at any event.
          </motion.p>

          {/* Stats */}
          <motion.div custom={2} variants={floatVariant} initial="hidden" animate="visible"
            style={{ display: 'flex', gap: '32px', marginBottom: '44px' }}>
            {STATS.map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.6rem', fontWeight: 800, background: 'linear-gradient(135deg, #06b6d4, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(226,232,240,0.45)', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Testimonial card */}
          <motion.div custom={3} variants={floatVariant} initial="hidden" animate="visible"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '24px', backdropFilter: 'blur(20px)' }}>
            <p style={{ color: 'rgba(226,232,240,0.75)', fontSize: '0.9rem', fontStyle: 'italic', lineHeight: 1.65, marginBottom: '16px' }}>{TESTIMONIAL.text}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: '14px' }}>{TESTIMONIAL.avatar}</div>
              <div>
                <div style={{ fontWeight: 600, color: 'white', fontSize: '0.85rem' }}>{TESTIMONIAL.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#a855f7' }}>{TESTIMONIAL.role}</div>
              </div>
            </div>
          </motion.div>

          {/* Live activity indicator */}
          <motion.div custom={4} variants={floatVariant} initial="hidden" animate="visible"
            style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.8)', animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: '0.8rem', color: 'rgba(226,232,240,0.5)' }}>
              <span style={{ color: '#10b981', fontWeight: 600 }}>247 developers</span> active right now
            </span>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @keyframes floatOrb1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-30px) scale(1.1)} }
        @keyframes floatOrb2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-25px,25px) scale(1.08)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '13px 16px 13px 44px',
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px', color: '#e2e8f0', fontFamily: 'Inter, sans-serif',
  fontSize: '0.95rem', outline: 'none', transition: 'all 0.25s', boxSizing: 'border-box',
};

const inputFocusStyle = {
  borderColor: 'rgba(168,85,247,0.6)',
  boxShadow: '0 0 0 3px rgba(168,85,247,0.1)',
  background: 'rgba(168,85,247,0.06)',
};

const labelStyle = {
  display: 'block', fontSize: '0.75rem', fontWeight: 600,
  color: 'rgba(226,232,240,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em',
};
