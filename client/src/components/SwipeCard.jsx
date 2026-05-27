import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineCode, HiOutlineExternalLink, HiOutlineSparkles, HiCheck, HiX, HiStar } from 'react-icons/hi';

export default function SwipeCard({ user, onSwipeLeft, onSwipeRight, onSuperConnect, active }) {
  const motionValue = useMotionValue(0);
  const rotate = useTransform(motionValue, [-200, 200], [-30, 30]);
  const opacity = useTransform(motionValue, [-200, -150, 0, 150, 200], [0.5, 1, 1, 1, 0.5]);
  const controls = useAnimation();

  const handleDragEnd = async (event, info) => {
    const threshold = 120;
    if (info.offset.x < -threshold) {
      // Swiped left
      await controls.start({ x: -300, opacity: 0, transition: { duration: 0.2 } });
      onSwipeLeft();
    } else if (info.offset.x > threshold) {
      // Swiped right
      await controls.start({ x: 300, opacity: 0, transition: { duration: 0.2 } });
      onSwipeRight();
    } else {
      // Return to center
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  const forceSwipeRight = async () => {
    await controls.start({ x: 300, opacity: 0, transition: { duration: 0.2 } });
    onSwipeRight();
  };

  const forceSwipeLeft = async () => {
    await controls.start({ x: -300, opacity: 0, transition: { duration: 0.2 } });
    onSwipeLeft();
  };

  const forceSuperConnect = async () => {
    await controls.start({ y: -300, opacity: 0, scale: 0.8, transition: { duration: 0.3 } });
    onSuperConnect();
  };

  if (!active) return null;

  return (
    <div className="absolute w-full max-w-md h-[550px] flex items-center justify-center">
      <motion.div
        drag="x"
        dragConstraints={{ left: -300, right: 300 }}
        style={{ x: motionValue, rotate, opacity }}
        animate={controls}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.02 }}
        className="w-full h-full glass rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between cursor-grab active:cursor-grabbing border border-white/10 shadow-2xl"
      >
        {/* Neon Gradient Glow Overlay */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none" />

        {/* Compatibility Badge */}
        <div className="flex justify-between items-start z-10">
          <div className="glass px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10 text-xs font-semibold text-neon-cyan">
            <HiOutlineSparkles className="animate-pulse" />
            AI MATCH: {user.matchScore}%
          </div>
          <div className="flex gap-2">
            {user.github && (
              <a
                href={`https://github.com/${user.github}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full glass hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              >
                <HiOutlineCode size={16} />
              </a>
            )}
            {user.linkedin && (
              <a
                href={`https://linkedin.com/in/${user.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full glass hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              >
                <HiOutlineExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Profile Card Main Info */}
        <div className="flex-1 flex flex-col justify-center items-center text-center mt-6 z-10">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-neon-purple to-neon-cyan p-[2px] mb-4 shadow-lg shadow-neon-purple/20">
            <div className="w-full h-full bg-dark-800 rounded-[14px] flex items-center justify-center font-display font-extrabold text-3xl text-white">
              {user.name[0]}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2">
            {user.name}
            {user.isOnline && <span className="status-online inline-block" />}
          </h2>
          <p className="text-neon-purple font-medium text-sm mt-1">{user.role}</p>

          <div className="mt-4 px-4">
            <p className="text-gray-300 text-sm line-clamp-3 italic">"{user.bio}"</p>
          </div>

          {/* AI Recommendation Reason */}
          {user.matchReason && (
            <div className="mt-4 mx-2 p-3 bg-neon-purple/5 border border-neon-purple/20 rounded-2xl text-left">
              <span className="text-[10px] font-bold text-neon-purple uppercase tracking-wider block mb-1">
                AI Match Reasoning
              </span>
              <p className="text-xs text-purple-200/90">{user.matchReason}</p>
            </div>
          )}

          {/* Skills Badges */}
          <div className="mt-5 flex flex-wrap justify-center gap-1.5 max-h-[85px] overflow-hidden">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Tinder Swipe Action Buttons */}
        <div className="flex justify-center items-center gap-4 mt-6 z-10">
          <button
            onClick={forceSwipeLeft}
            className="w-12 h-12 rounded-full border border-red-500/20 bg-red-950/10 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg hover:shadow-red-500/20 duration-200 cursor-pointer"
          >
            <HiX size={20} />
          </button>
          
          <button
            onClick={forceSuperConnect}
            className="w-14 h-14 rounded-full border border-yellow-500/30 bg-yellow-950/20 text-yellow-400 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all shadow-lg hover:shadow-yellow-500/30 duration-300 animate-pulse cursor-pointer"
          >
            <HiStar size={24} />
          </button>

          <button
            onClick={forceSwipeRight}
            className="w-12 h-12 rounded-full border border-neon-cyan/20 bg-cyan-950/10 text-neon-cyan flex items-center justify-center hover:bg-neon-cyan hover:text-black transition-all shadow-lg hover:shadow-neon-cyan/20 duration-200 cursor-pointer"
          >
            <HiCheck size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
