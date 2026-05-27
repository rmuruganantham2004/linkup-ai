import { motion } from 'framer-motion';
import { useAuthStore, useConnectionStore, useEventStore } from '../store/store';
import { Link } from 'react-router-dom';
import {
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineUserGroup,
  HiOutlineTrendingUp,
  HiOutlineCalendar,
  HiOutlineChat,
  HiOutlineArrowRight,
} from 'react-icons/hi';
import Navbar from '../components/Navbar';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { recommendations, connections } = useConnectionStore();
  const { rooms } = useEventStore();

  const analytics = [
    { label: 'Match Heatmap', value: 'Active Peak (8-10 PM)', desc: 'Higher response rate' },
    { label: 'Event Analytics', value: '4 Ongoing Hubs', desc: 'Participating in AI Hackathon' },
  ];

  const trendingSkills = ['PyTorch', 'FastAPI', 'React', 'Solidity', 'Kubernetes', 'TailwindCSS'];

  return (
    <div className="min-h-screen bg-dark-900 cyber-grid pb-12">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10"
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '4px', height: '32px', borderRadius: '4px', background: 'linear-gradient(180deg, #a855f7, #06b6d4)' }} />
              <h1 className="text-3xl font-extrabold font-display text-white">
                System Dashboard
              </h1>
            </div>
            <p className="text-gray-400 text-sm" style={{ paddingLeft: '14px' }}>
              Welcome back, <span className="text-neon-cyan font-bold">{user?.name || 'Developer'}</span>. AI recommendation engine is online.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/discover"
              className="px-5 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-neon-purple to-neon-cyan shadow-lg shadow-neon-purple/20 hover:shadow-neon-purple/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 no-underline text-sm"
            >
              <HiOutlineLightningBolt /> Start Swiping
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column: Recommendations & Matching */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Recommendations section */}
            <motion.div variants={staggerItem} className="glass rounded-3xl p-6 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <HiOutlineSparkles size={100} className="text-neon-purple" />
              </div>
              <div className="flex items-center gap-2 mb-6">
                <HiOutlineSparkles className="text-neon-purple text-xl animate-pulse" />
                <h3 className="text-xl font-bold font-display text-white">AI Recommendations</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.slice(0, 2).map((recUser) => (
                  <div key={recUser.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-neon-cyan/50 transition-colors">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded">
                          {recUser.matchScore}% Compatibility
                        </span>
                        {recUser.isOnline && <span className="status-online" />}
                      </div>
                      <h4 className="font-bold text-white text-md">{recUser.name}</h4>
                      <p className="text-xs text-neon-purple font-medium mb-2">{recUser.role}</p>
                      <p className="text-xs text-gray-400 line-clamp-2 italic">"{recUser.matchReason}"</p>
                    </div>
                    <Link
                      to="/discover"
                      className="mt-4 text-xs font-bold text-neon-cyan flex items-center gap-1 hover:underline no-underline"
                    >
                      View Profile <HiOutlineArrowRight />
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Match Heatmap & Event Analytics */}
            <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analytics.map((anal, i) => (
                <div key={i} className="glass rounded-3xl p-6 border border-white/5 relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-neon-cyan/5 rounded-full blur-xl pointer-events-none" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">{anal.label}</span>
                  <h4 className="text-xl font-bold text-white font-display mb-1">{anal.value}</h4>
                  <p className="text-xs text-gray-400">{anal.desc}</p>

                  {/* Micro Visual representation of Heatmap or chart */}
                  {anal.label === 'Match Heatmap' && (
                    <div className="mt-4 flex gap-1 items-end h-8">
                      {[30, 45, 60, 80, 95, 70, 50, 40, 60, 90, 85, 55].map((val, idx) => (
                        <div
                          key={idx}
                          style={{ height: `${val}%` }}
                          className={`w-full rounded-sm ${idx === 4 || idx === 9 ? 'bg-neon-purple shadow-lg shadow-neon-purple/50' : 'bg-white/10'}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Trending Skills, Active Rooms & Stats */}
          <div className="space-y-8">
            {/* Active Event Rooms */}
            <motion.div variants={staggerItem} className="glass rounded-3xl p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-6">
                <HiOutlineUserGroup className="text-neon-cyan text-xl" />
                <h3 className="text-xl font-bold font-display text-white">Active Rooms</h3>
              </div>

              <div className="space-y-4">
                {rooms.slice(0, 3).map((room) => (
                  <Link
                    key={room.id}
                    to="/events"
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-neon-purple/50 hover:bg-white/10 transition-all no-underline"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{room.icon}</span>
                      <div>
                        <h4 className="font-bold text-white text-sm">{room.name}</h4>
                        <p className="text-xs text-gray-400">{room.members} members online</p>
                      </div>
                    </div>
                    {room.isLive && <span className="status-online" />}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Trending Skills Section */}
            <motion.div variants={staggerItem} className="glass rounded-3xl p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineTrendingUp className="text-neon-pink text-xl" />
                <h3 className="text-xl font-bold font-display text-white">Trending Skills</h3>
              </div>
              <p className="text-xs text-gray-400 mb-4">Most requested skills at your current hackathon hubs.</p>
              
              <div className="flex flex-wrap gap-2">
                {trendingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1.5 rounded-xl bg-neon-purple/10 border border-neon-purple/30 text-purple-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
