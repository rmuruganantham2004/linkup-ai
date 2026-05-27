import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useConnectionStore } from '../store/store';
import Navbar from '../components/Navbar';
import SwipeCard from '../components/SwipeCard';
import { HiOutlineSparkles, HiOutlineRefresh, HiBadgeCheck, HiStar } from 'react-icons/hi';
import toast, { Toaster } from 'react-hot-toast';

export default function Discover() {
  const { recommendations, currentIndex, swipeLeft, swipeRight, superConnect } = useConnectionStore();
  const [matchOverlay, setMatchOverlay] = useState(null);

  const activeUser = recommendations[currentIndex];

  const handleSwipeLeft = () => {
    swipeLeft();
    toast.error('Skipped', { duration: 800 });
  };

  const handleSwipeRight = () => {
    swipeRight(activeUser.id);
    // 30% chance to simulate an instant match!
    if (Math.random() < 0.4) {
      setMatchOverlay(activeUser);
      toast.success('It\'s a Match! 🎉', { duration: 3000 });
    } else {
      toast.success('Connected!', { duration: 800 });
    }
  };

  const handleSuperConnect = () => {
    superConnect(activeUser.id);
    // 60% chance to simulate a match on super connect!
    if (Math.random() < 0.7) {
      setMatchOverlay(activeUser);
    } else {
      toast.success('Super Connected! 🚀', { duration: 1200 });
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 cyber-grid pb-12 relative overflow-hidden">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 flex flex-col items-center justify-center relative min-h-[calc(100vh-80px)]">
        {/* Background glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8 z-10">
          <h1 className="text-3xl font-extrabold font-display text-white flex items-center justify-center gap-2">
            <HiOutlineSparkles className="text-neon-cyan animate-pulse" />
            Discover Connections
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Swipe right to connect, left to skip, and star to super-connect.
          </p>
        </div>

        {/* Card Deck Area */}
        <div className="relative w-full max-w-md h-[550px] flex items-center justify-center z-10">
          <AnimatePresence>
            {activeUser ? (
              <SwipeCard
                key={activeUser.id}
                user={activeUser}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                onSuperConnect={handleSuperConnect}
                active={true}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md h-[400px] glass rounded-3xl p-8 border border-white/10 flex flex-col justify-center items-center text-center space-y-6 shadow-2xl"
              >
                <div className="w-16 h-16 rounded-full bg-neon-purple/10 flex items-center justify-center border border-neon-purple/30 text-neon-purple text-2xl">
                  🛰️
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-display text-white">Out of Attendee Recommendations</h3>
                  <p className="text-xs text-gray-400 max-w-xs">
                    Try expanding your search query or check back later once more developers join the hackathon room.
                  </p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-neon-purple to-neon-cyan flex items-center gap-2 shadow-lg shadow-neon-purple/20 hover:shadow-neon-purple/40 transition-all border-none cursor-pointer"
                >
                  <HiOutlineRefresh /> Refresh Recommendations
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Match Celebration Overlay */}
      <AnimatePresence>
        {matchOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-900/90 backdrop-blur-md z-50 flex flex-col items-center justify-center px-4"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-purple/15 rounded-full blur-3xl pointer-events-none" />
            
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="text-center space-y-8 max-w-md z-10"
            >
              <div className="inline-flex p-3 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-4xl animate-bounce">
                🚀
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-extrabold font-display text-white">System Match Found!</h1>
                <p className="text-gray-400 text-sm">
                  You and <span className="text-neon-cyan font-bold">{matchOverlay.name}</span> connected.
                </p>
              </div>

              {/* Both user circles merging visual */}
              <div className="flex justify-center items-center gap-6 py-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-neon-purple to-neon-cyan p-[2px]">
                  <div className="w-full h-full bg-dark-800 rounded-[14px] flex items-center justify-center font-display font-bold text-white text-xl">
                    You
                  </div>
                </div>
                <div className="text-neon-pink font-bold text-2xl animate-pulse">⚡</div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-neon-cyan to-neon-purple p-[2px]">
                  <div className="w-full h-full bg-dark-800 rounded-[14px] flex items-center justify-center font-display font-bold text-white text-xl">
                    {matchOverlay.name[0]}
                  </div>
                </div>
              </div>

              {/* Match message template helper */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left space-y-2">
                <span className="text-[10px] font-bold text-neon-cyan uppercase tracking-wider block">AI Icebreaker Suggestion</span>
                <p className="text-xs text-gray-300 italic">
                  "Hey {matchOverlay.name}, saw you're attending {matchOverlay.events[0]} and work on {matchOverlay.skills[0]}! Let's team up."
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  to="/messages"
                  onClick={() => setMatchOverlay(null)}
                  className="py-4 rounded-xl font-bold text-white bg-gradient-to-r from-neon-purple to-neon-cyan shadow-xl shadow-neon-purple/20 hover:shadow-neon-purple/40 hover:-translate-y-0.5 transition-all text-center no-underline"
                >
                  Send Direct Message
                </Link>
                <button
                  onClick={() => setMatchOverlay(null)}
                  className="py-4 rounded-xl font-bold text-gray-400 hover:text-white transition-colors border-none bg-transparent cursor-pointer"
                >
                  Keep Swiping
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
