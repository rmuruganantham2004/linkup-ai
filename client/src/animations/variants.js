/* ========================================
   Framer Motion Animation Variants
   LinkUp AI - Cyberpunk Animations
   ======================================== */

// Fade in from bottom
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// Fade in from left
export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// Fade in from right
export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// Scale up entrance
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// Stagger container
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Stagger children
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

// Card flip
export const cardFlip = {
  hidden: { rotateY: 90, opacity: 0 },
  visible: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Neon pulse
export const neonPulse = {
  animate: {
    boxShadow: [
      '0 0 15px rgba(168, 85, 247, 0.3)',
      '0 0 30px rgba(168, 85, 247, 0.5)',
      '0 0 15px rgba(168, 85, 247, 0.3)'
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
  }
};

// Page transition
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  }
};

// Floating animation
export const floating = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
  }
};

// Glow border animation
export const glowBorder = {
  animate: {
    boxShadow: [
      '0 0 5px rgba(6, 182, 212, 0.3), inset 0 0 5px rgba(6, 182, 212, 0.1)',
      '0 0 20px rgba(168, 85, 247, 0.4), inset 0 0 10px rgba(168, 85, 247, 0.1)',
      '0 0 5px rgba(6, 182, 212, 0.3), inset 0 0 5px rgba(6, 182, 212, 0.1)'
    ],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
  }
};

// Slide in overlay
export const slideOverlay = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', damping: 25, stiffness: 200 }
  },
  exit: {
    x: '100%',
    transition: { duration: 0.3 }
  }
};

// Counter animation config
export const counterSpring = {
  type: 'spring',
  damping: 20,
  stiffness: 100
};

// Swipe card drag constraints
export const swipeConstraints = {
  left: -200,
  right: 200,
  top: -100,
  bottom: 0
};

// Hero text character stagger
export const heroTextContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.2
    }
  }
};

export const heroTextChar = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring', damping: 12, stiffness: 200 }
  }
};

// Modal backdrop
export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

// Modal content
export const modalContent = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 20, stiffness: 300 }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 }
  }
};
