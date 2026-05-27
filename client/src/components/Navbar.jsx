import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore, useNotificationStore } from '../store/store';
import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineLightningBolt,
  HiOutlineChatAlt2,
  HiOutlineMap,
  HiOutlineBell,
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineMenu,
  HiOutlineX,
} from 'react-icons/hi';

const navLinks = [
  { path: '/dashboard', label: 'Dashboard', icon: HiOutlineHome },
  { path: '/discover', label: 'Discover', icon: HiOutlineLightningBolt },
  { path: '/connections', label: 'Connections', icon: HiOutlineUserGroup },
  { path: '/events', label: 'Events', icon: HiOutlineCalendar },
  { path: '/messages', label: 'Messages', icon: HiOutlineChatAlt2 },
  { path: '/map', label: 'Map', icon: HiOutlineMap },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Don't render on landing page if not authenticated
  if (!isAuthenticated && location.pathname === '/') return null;

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(10, 10, 15, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2 no-underline">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
                }}
              >
                <span style={{ fontFamily: 'Orbitron', fontWeight: 800, fontSize: '0.8rem', color: 'white' }}>L</span>
              </div>
              <span
                style={{
                  fontFamily: 'Orbitron',
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Event Network Platform
              </span>
            </Link>

            {/* Nav Links (Desktop) */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="relative px-3 py-2 rounded-lg flex items-center gap-2 text-sm no-underline transition-all duration-200"
                      style={{
                        color: isActive ? '#a855f7' : 'rgba(255,255,255,0.6)',
                        background: isActive ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
                      }}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                          style={{ background: 'linear-gradient(90deg, #a855f7, #06b6d4)' }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <div ref={notifRef} className="relative">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="relative p-2 rounded-lg transition-all duration-200 border-none cursor-pointer"
                      style={{
                        background: showNotifications ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
                        color: 'rgba(255,255,255,0.7)',
                      }}
                    >
                      <HiOutlineBell size={20} />
                      {unreadCount > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{
                            background: 'linear-gradient(135deg, #ec4899, #a855f7)',
                            fontSize: '0.65rem',
                          }}
                        >
                          {unreadCount}
                        </motion.span>
                      )}
                    </button>

                    <AnimatePresence>
                      {showNotifications && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 top-12 w-80 rounded-2xl overflow-hidden"
                          style={{
                            background: 'rgba(15, 15, 26, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                          }}
                        >
                          <div className="p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                            <h3 className="font-semibold text-white">Notifications</h3>
                          </div>
                          <div className="max-h-80 overflow-y-auto">
                            <NotificationItem type="connection" name="Sarah Chen" text="wants to connect" time="5m ago" />
                            <NotificationItem type="match" name="Jordan Kim" text="91% match found" time="30m ago" />
                            <NotificationItem type="event" name="" text="AI Hackathon starts in 3 days!" time="2h ago" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Profile */}
                  <div ref={profileRef} className="relative">
                    <button
                      onClick={() => setShowProfile(!showProfile)}
                      className="flex items-center gap-2 p-1.5 rounded-xl transition-all duration-200 border-none cursor-pointer"
                      style={{
                        background: showProfile ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                        style={{
                          background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
                        }}
                      >
                        {user?.name?.[0] || 'U'}
                      </div>
                    </button>

                    <AnimatePresence>
                      {showProfile && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 top-12 w-56 rounded-2xl overflow-hidden"
                          style={{
                            background: 'rgba(15, 15, 26, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                          }}
                        >
                          <div className="p-3">
                            <Link
                              to="/profile"
                              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm no-underline transition-all duration-200"
                              style={{ color: 'rgba(255,255,255,0.8)' }}
                              onClick={() => setShowProfile(false)}
                            >
                              <HiOutlineUser size={16} />
                              Profile
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm w-full text-left border-none cursor-pointer transition-all duration-200"
                              style={{ color: '#ef4444', background: 'transparent' }}
                            >
                              <HiOutlineLogout size={16} />
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium no-underline transition-all duration-200"
                    style={{ color: 'rgba(255,255,255,0.8)' }}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-white no-underline transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                      boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)',
                    }}
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              {isAuthenticated && (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg border-none cursor-pointer"
                  style={{ background: 'transparent', color: 'rgba(255,255,255,0.7)' }}
                >
                  {isMenuOpen ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && isAuthenticated && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
              style={{
                background: 'rgba(10, 10, 15, 0.95)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm no-underline"
                      style={{
                        color: isActive ? '#a855f7' : 'rgba(255,255,255,0.6)',
                        background: isActive ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon size={18} />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer */}
      {(isAuthenticated || location.pathname !== '/') && <div className="h-16" />}
    </>
  );
}

function NotificationItem({ type, name, text, time }) {
  const colors = {
    connection: '#a855f7',
    match: '#06b6d4',
    event: '#f59e0b',
  };
  const icons = {
    connection: '🤝',
    match: '✨',
    event: '📅',
  };

  return (
    <div
      className="flex items-start gap-3 px-4 py-3 transition-all duration-200 cursor-pointer"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <span className="text-lg mt-0.5">{icons[type]}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
          {name && <span className="font-semibold" style={{ color: colors[type] }}>{name} </span>}
          {text}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{time}</p>
      </div>
    </div>
  );
}
