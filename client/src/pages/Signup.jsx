import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/store';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineArrowRight,
  HiOutlineLightningBolt,
  HiOutlineSparkles,
  HiOutlineChip,
  HiCheck,
} from 'react-icons/hi';
import toast, { Toaster } from 'react-hot-toast';

const PRESET_SKILLS = ['React', 'Python', 'Node.js', 'FastAPI', 'PyTorch', 'TypeScript', 'Solidity', 'Kubernetes', 'AWS', 'TensorFlow', 'Rust', 'Go'];
const PRESET_INTERESTS = ['AI/ML', 'Web3', 'DevOps', 'Startups', 'Open Source', 'Robotics', 'AR/VR', 'Cybersecurity'];
const ROLE_OPTIONS = ['Full-Stack Developer', 'AI/ML Engineer', 'Product Designer', 'Data Scientist', 'DevOps Engineer', 'Startup Founder', 'Blockchain Dev', 'Mobile Developer'];

const floatVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
};

const panelVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const formVariant = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3 } },
};

export default function Signup() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [customSkill, setCustomSkill] = useState('');

  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();

  const toggleTag = (tag, list, setList) => {
    setList(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const addCustomSkill = (e) => {
    if (e.key === 'Enter' && customSkill.trim()) {
      e.preventDefault();
      if (!selectedSkills.includes(customSkill.trim())) {
        setSelectedSkills(prev => [...prev, customSkill.trim()]);
      }
      setCustomSkill('');
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!name || !email || !password) { toast.error('Please fill in all fields'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) { toast.error('Please select your role'); return; }
    if (selectedSkills.length === 0) { toast.error('Please select at least one skill'); return; }

    try {
      const success = await signup({
        name, email, password, role,
        skills: selectedSkills,
        interests: selectedInterests,
      });
      if (success) {
        toast.success('Welcome to LinkUp AI!');
        navigate('/dashboard');
      } else {
        toast.error('Registration failed — email may already be in use');
      }
    } catch {
      toast.error('An error occurred. Please try again.');
    }
  };

  const features = [
    { icon: <HiOutlineSparkles />, text: 'AI-powered match scoring' },
    { icon: <HiOutlineLightningBolt />, text: 'Real-time event rooms' },
    { icon: <HiOutlineChip />, text: 'TF-IDF skill compatibility' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#0a0a0f', fontFamily: 'Inter, sans-serif' }}>
      <Toaster position="top-right" toastOptions={{ style: { background: '#1a1a2e', color: '#e2e8f0', border: '1px solid rgba(168,85,247,0.3)' } }} />

      {/* ── Left Panel ── */}
      <motion.div
        variants={panelVariant} initial="hidden" animate="visible"
        style={{
          flex: '0 0 42%', position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg, #0f0520 0%, #0a0f1a 50%, #050a15 100%)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 50px',
        }}
      >
        {/* Animated background orbs */}
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'floatOrb1 12s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'floatOrb2 16s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '50%', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)', filter: 'blur(30px)' }} />

        {/* Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Logo */}
          <motion.div custom={0} variants={floatVariant} initial="hidden" animate="visible" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Orbitron, sans-serif', fontWeight: 800, color: 'white', fontSize: '18px', boxShadow: '0 0 20px rgba(168,85,247,0.4)' }}>L</div>
            <span style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '20px', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LinkUp AI</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 custom={1} variants={floatVariant} initial="hidden" animate="visible"
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '2.4rem', fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: '20px' }}>
            Build Your <br />
            <span style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dream Team</span>
          </motion.h1>

          <motion.p custom={2} variants={floatVariant} initial="hidden" animate="visible"
            style={{ color: 'rgba(226,232,240,0.6)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '44px' }}>
            AI matches you with developers, designers, and founders who complement your stack — at hackathons and beyond.
          </motion.p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
            {features.map((f, i) => (
              <motion.div key={i} custom={i + 3} variants={floatVariant} initial="hidden" animate="visible"
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7', fontSize: '16px' }}>{f.icon}</div>
                <span style={{ color: 'rgba(226,232,240,0.75)', fontSize: '0.9rem' }}>{f.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Progress indicator */}
          <motion.div custom={6} variants={floatVariant} initial="hidden" animate="visible" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {[1, 2].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <motion.div animate={{ background: step >= s ? 'linear-gradient(135deg, #a855f7, #06b6d4)' : 'rgba(255,255,255,0.1)', boxShadow: step >= s ? '0 0 12px rgba(168,85,247,0.5)' : 'none' }}
                  transition={{ duration: 0.4 }}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'white', border: step < s ? '1px solid rgba(255,255,255,0.2)' : 'none' }}>
                  {step > s ? <HiCheck /> : s}
                </motion.div>
                <span style={{ fontSize: '0.75rem', color: step >= s ? 'rgba(226,232,240,0.8)' : 'rgba(226,232,240,0.35)', fontWeight: step === s ? 600 : 400 }}>
                  {s === 1 ? 'Account' : 'Profile'}
                </span>
                {s < 2 && <div style={{ width: '32px', height: '1px', background: step > s ? 'linear-gradient(90deg, #a855f7, #06b6d4)' : 'rgba(255,255,255,0.1)', marginLeft: '4px' }} />}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Right Panel: Form ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form key="step1" variants={formVariant} initial="hidden" animate="visible" exit="exit" onSubmit={handleNextStep}>
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '36px' }}>
                  <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Create Account</h2>
                  <p style={{ color: 'rgba(226,232,240,0.5)', fontSize: '0.9rem' }}>Step 1 of 2 — Set up your credentials</p>
                </motion.div>

                {/* Name */}
                <FieldGroup label="Full Name" icon={<HiOutlineUser />}>
                  <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)}
                    style={inputStyle} onFocus={e => Object.assign(e.target.style, inputFocusStyle)} onBlur={e => Object.assign(e.target.style, inputStyle)} />
                </FieldGroup>

                {/* Email */}
                <FieldGroup label="Email Address" icon={<HiOutlineMail />}>
                  <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
                    style={inputStyle} onFocus={e => Object.assign(e.target.style, inputFocusStyle)} onBlur={e => Object.assign(e.target.style, inputStyle)} />
                </FieldGroup>

                {/* Password */}
                <FieldGroup label="Password" icon={<HiOutlineLockClosed />}>
                  <input type="password" placeholder="Min. 6 characters" value={password} onChange={e => setPassword(e.target.value)}
                    style={inputStyle} onFocus={e => Object.assign(e.target.style, inputFocusStyle)} onBlur={e => Object.assign(e.target.style, inputStyle)} />
                </FieldGroup>

                {/* Password strength bar */}
                {password.length > 0 && (
                  <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} style={{ marginTop: '-12px', marginBottom: '24px' }}>
                    <div style={{ height: '3px', borderRadius: '99px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                      <motion.div animate={{ width: password.length < 6 ? '30%' : password.length < 10 ? '65%' : '100%', background: password.length < 6 ? '#ef4444' : password.length < 10 ? '#f59e0b' : '#10b981' }}
                        transition={{ duration: 0.4 }} style={{ height: '100%', borderRadius: '99px' }} />
                    </div>
                    <span style={{ fontSize: '0.7rem', color: password.length < 6 ? '#ef4444' : password.length < 10 ? '#f59e0b' : '#10b981', marginTop: '4px', display: 'block' }}>
                      {password.length < 6 ? 'Weak' : password.length < 10 ? 'Good' : 'Strong'}
                    </span>
                  </motion.div>
                )}

                <motion.button type="submit" whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(168,85,247,0.5)' }} whileTap={{ scale: 0.98 }}
                  style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', color: 'white', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 20px rgba(168,85,247,0.35)', marginBottom: '24px' }}>
                  Continue to Profile <HiOutlineArrowRight />
                </motion.button>

                <p style={{ textAlign: 'center', color: 'rgba(226,232,240,0.5)', fontSize: '0.875rem' }}>
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: '#a855f7', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
                </p>
              </motion.form>

            ) : (
              <motion.form key="step2" variants={formVariant} initial="hidden" animate="visible" exit="exit" onSubmit={handleSubmit}>
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '28px' }}>
                  <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Your Profile</h2>
                  <p style={{ color: 'rgba(226,232,240,0.5)', fontSize: '0.9rem' }}>Step 2 of 2 — Tell us what you build</p>
                </motion.div>

                {/* Role */}
                <div style={{ marginBottom: '22px' }}>
                  <label style={labelStyle}>Your Role</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                    {ROLE_OPTIONS.map(r => (
                      <motion.button key={r} type="button" onClick={() => setRole(r)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        style={{ padding: '7px 14px', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', border: role === r ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.12)', background: role === r ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.04)', color: role === r ? '#c084fc' : 'rgba(226,232,240,0.6)', transition: 'all 0.2s' }}>
                        {r}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div style={{ marginBottom: '22px' }}>
                  <label style={labelStyle}>Skills <span style={{ color: 'rgba(226,232,240,0.35)', fontWeight: 400 }}>({selectedSkills.length} selected)</span></label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px', marginBottom: '10px' }}>
                    {PRESET_SKILLS.map(s => (
                      <motion.button key={s} type="button" onClick={() => toggleTag(s, selectedSkills, setSelectedSkills)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        style={{ padding: '7px 14px', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', border: selectedSkills.includes(s) ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.12)', background: selectedSkills.includes(s) ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.04)', color: selectedSkills.includes(s) ? '#67e8f9' : 'rgba(226,232,240,0.6)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {selectedSkills.includes(s) && <HiCheck style={{ fontSize: '11px' }} />} {s}
                      </motion.button>
                    ))}
                  </div>
                  <input placeholder="+ Add custom skill (press Enter)" value={customSkill} onChange={e => setCustomSkill(e.target.value)} onKeyDown={addCustomSkill}
                    style={{ ...inputStyle, paddingTop: '9px', paddingBottom: '9px', fontSize: '0.85rem' }}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyle)} onBlur={e => Object.assign(e.target.style, inputStyle)} />
                </div>

                {/* Interests */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={labelStyle}>Interests <span style={{ color: 'rgba(226,232,240,0.35)', fontWeight: 400 }}>(optional)</span></label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                    {PRESET_INTERESTS.map(i => (
                      <motion.button key={i} type="button" onClick={() => toggleTag(i, selectedInterests, setSelectedInterests)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        style={{ padding: '7px 14px', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', border: selectedInterests.includes(i) ? '1px solid #ec4899' : '1px solid rgba(255,255,255,0.12)', background: selectedInterests.includes(i) ? 'rgba(236,72,153,0.15)' : 'rgba(255,255,255,0.04)', color: selectedInterests.includes(i) ? '#f9a8d4' : 'rgba(226,232,240,0.6)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {selectedInterests.includes(i) && <HiCheck style={{ fontSize: '11px' }} />} {i}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <motion.button type="button" onClick={() => setStep(1)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    style={{ flex: '0 0 100px', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'rgba(226,232,240,0.7)', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
                    ← Back
                  </motion.button>
                  <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(168,85,247,0.5)' }} whileTap={{ scale: 0.98 }}
                    style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', color: 'white', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 20px rgba(168,85,247,0.35)', opacity: isLoading ? 0.7 : 1 }}>
                    {isLoading ? (
                      <><span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} /> Configuring...</>
                    ) : (
                      <>Launch Profile <HiOutlineArrowRight /></>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @keyframes floatOrb1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-30px) scale(1.1)} }
        @keyframes floatOrb2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-25px,25px) scale(1.08)} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}

function FieldGroup({ label, icon, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: 'relative', marginTop: '8px' }}>
        <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(226,232,240,0.35)', fontSize: '18px', display: 'flex', pointerEvents: 'none' }}>{icon}</span>
        {children}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '13px 16px 13px 44px',
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px', color: '#e2e8f0', fontFamily: 'Inter, sans-serif',
  fontSize: '0.95rem', outline: 'none', transition: 'all 0.25s',
  boxSizing: 'border-box',
};

const inputFocusStyle = {
  ...inputStyle,
  borderColor: 'rgba(168,85,247,0.6)',
  boxShadow: '0 0 0 3px rgba(168,85,247,0.1), 0 0 20px rgba(168,85,247,0.08)',
  background: 'rgba(168,85,247,0.06)',
};

const labelStyle = {
  display: 'block', fontSize: '0.75rem', fontWeight: 600,
  color: 'rgba(226,232,240,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em',
};
