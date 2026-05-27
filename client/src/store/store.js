import { create } from 'zustand';

// Demo user data for showcasing the platform
const demoUsers = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'AI/ML Engineer',
    bio: 'Building the future of AI at scale. Passionate about NLP and computer vision. Looking for co-founders who think big.',
    avatar: null,
    skills: ['Python', 'PyTorch', 'TensorFlow', 'NLP', 'Computer Vision'],
    interests: ['AI Ethics', 'Startups', 'Open Source'],
    github: 'sarahchen',
    linkedin: 'sarah-chen-ai',
    events: ['AI Hackathon 2026', 'TechCrunch Disrupt'],
    matchScore: 95,
    matchReason: 'You both work on AI systems and are attending the same hackathon.',
    isOnline: true,
    location: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'Full-Stack Developer',
    bio: 'React wizard & Node.js ninja. Built 3 startups from scratch. Currently exploring Web3 and decentralized apps.',
    avatar: null,
    skills: ['React', 'Node.js', 'TypeScript', 'Web3', 'Solidity'],
    interests: ['DeFi', 'Startup Life', 'Dev Tools'],
    github: 'marcusj',
    linkedin: 'marcus-johnson-dev',
    events: ['Web3 Builders Summit', 'ETH Denver'],
    matchScore: 88,
    matchReason: 'Complementary skills — your AI expertise pairs perfectly with his full-stack capabilities.',
    isOnline: true,
    location: { lat: 37.7849, lng: -122.4094 },
  },
  {
    id: '3',
    name: 'Priya Patel',
    role: 'Product Designer',
    bio: 'Design systems enthusiast. Turning complex problems into elegant solutions. Previously at Figma and Stripe.',
    avatar: null,
    skills: ['UI/UX', 'Figma', 'Design Systems', 'Prototyping', 'User Research'],
    interests: ['Design Thinking', 'Accessibility', 'AI-Powered Design'],
    github: 'priyauxdesign',
    linkedin: 'priya-patel-design',
    events: ['AI Hackathon 2026', 'Config 2026'],
    matchScore: 82,
    matchReason: 'Every great AI product needs great design. She can bring your ideas to life visually.',
    isOnline: false,
    location: { lat: 37.7649, lng: -122.4294 },
  },
  {
    id: '4',
    name: 'Alex Rivera',
    role: 'DevOps & Cloud Architect',
    bio: 'Scaling infrastructure to handle millions. AWS certified. Love automating everything that can be automated.',
    avatar: null,
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
    interests: ['Cloud Native', 'MLOps', 'Serverless'],
    github: 'alexrivera',
    linkedin: 'alex-rivera-cloud',
    events: ['KubeCon 2026', 'AI Hackathon 2026'],
    matchScore: 79,
    matchReason: 'Your AI models need robust infrastructure. Alex can help you deploy and scale.',
    isOnline: true,
    location: { lat: 37.7949, lng: -122.3994 },
  },
  {
    id: '5',
    name: 'Luna Zhang',
    role: 'Blockchain Developer',
    bio: 'Smart contract auditor & DeFi protocol builder. Bridging the gap between AI and blockchain technology.',
    avatar: null,
    skills: ['Solidity', 'Rust', 'Smart Contracts', 'DeFi', 'ZK-Proofs'],
    interests: ['Decentralized AI', 'Token Economics', 'Privacy Tech'],
    github: 'lunazhang',
    linkedin: 'luna-zhang-web3',
    events: ['ETH Denver', 'Web3 Builders Summit'],
    matchScore: 74,
    matchReason: 'Shared interest in decentralized AI systems and privacy-preserving technology.',
    isOnline: true,
    location: { lat: 37.7549, lng: -122.4394 },
  },
  {
    id: '6',
    name: 'Jordan Kim',
    role: 'Data Scientist',
    bio: 'Turning data into actionable insights. Kaggle Grand Master. Published researcher in recommendation systems.',
    avatar: null,
    skills: ['Python', 'R', 'ML', 'Statistics', 'Data Viz'],
    interests: ['RecSys', 'A/B Testing', 'Causal Inference'],
    github: 'jordankim',
    linkedin: 'jordan-kim-data',
    events: ['AI Hackathon 2026', 'NeurIPS'],
    matchScore: 91,
    matchReason: 'Both passionate about recommendation systems and attending the same AI hackathon.',
    isOnline: false,
    location: { lat: 37.7849, lng: -122.4494 },
  },
  {
    id: '7',
    name: 'Emma Thompson',
    role: 'Startup Founder & CEO',
    bio: 'Serial entrepreneur. Y Combinator alumni. Currently building AI-first developer tools. Always looking for talented builders.',
    avatar: null,
    skills: ['Leadership', 'Fundraising', 'Product Strategy', 'Growth', 'GTM'],
    interests: ['B2B SaaS', 'Developer Experience', 'AI Tools'],
    github: 'emmathompson',
    linkedin: 'emma-thompson-ceo',
    events: ['TechCrunch Disrupt', 'Startup Networking Night'],
    matchScore: 86,
    matchReason: 'She\'s actively looking for AI engineers to join her Y Combinator startup.',
    isOnline: true,
    location: { lat: 37.8049, lng: -122.4094 },
  },
  {
    id: '8',
    name: 'Raj Kapoor',
    role: 'Mobile Developer',
    bio: 'Building beautiful cross-platform apps with React Native and Flutter. 50M+ app downloads and counting.',
    avatar: null,
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    interests: ['Mobile UX', 'AR/VR', 'Wearables'],
    github: 'rajkapoor',
    linkedin: 'raj-kapoor-mobile',
    events: ['AI Hackathon 2026', 'Google I/O'],
    matchScore: 77,
    matchReason: 'Your AI backend + his mobile expertise = a winning hackathon team.',
    isOnline: false,
    location: { lat: 37.7749, lng: -122.3894 },
  },
];

const demoEvents = [
  {
    id: 'evt1',
    name: 'AI Hackathon 2026',
    description: 'Build the next generation of AI applications in 48 hours. $50K in prizes.',
    date: '2026-06-15',
    location: 'San Francisco, CA',
    attendees: 342,
    category: 'Hackathon',
    image: null,
    tags: ['AI', 'ML', 'Deep Learning'],
  },
  {
    id: 'evt2',
    name: 'Web3 Builders Summit',
    description: 'Connect with the top Web3 builders and explore the future of decentralized technology.',
    date: '2026-07-01',
    location: 'Austin, TX',
    attendees: 218,
    category: 'Conference',
    image: null,
    tags: ['Web3', 'Blockchain', 'DeFi'],
  },
  {
    id: 'evt3',
    name: 'Startup Networking Night',
    description: 'Meet founders, investors, and engineers building the future. Pitch your idea.',
    date: '2026-06-20',
    location: 'New York, NY',
    attendees: 156,
    category: 'Networking',
    image: null,
    tags: ['Startups', 'Funding', 'Networking'],
  },
  {
    id: 'evt4',
    name: 'Frontend Dev Conference',
    description: 'Deep dive into React, Vue, and the modern frontend ecosystem. Workshops included.',
    date: '2026-08-10',
    location: 'Seattle, WA',
    attendees: 480,
    category: 'Conference',
    image: null,
    tags: ['React', 'Frontend', 'CSS'],
  },
];

const demoRooms = [
  {
    id: 'room1',
    name: 'AI Hackathon',
    description: 'General discussion for AI Hackathon 2026 participants',
    icon: '🤖',
    members: 142,
    isLive: true,
    category: 'hackathon',
  },
  {
    id: 'room2',
    name: 'Web3 Builders',
    description: 'Connect with blockchain developers and Web3 enthusiasts',
    icon: '⛓️',
    members: 89,
    isLive: true,
    category: 'tech',
  },
  {
    id: 'room3',
    name: 'Startup Networking',
    description: 'Find co-founders, mentors, and investors',
    icon: '🚀',
    members: 203,
    isLive: true,
    category: 'networking',
  },
  {
    id: 'room4',
    name: 'Team Formation',
    description: 'Looking for teammates? Post your skills and find your dream team',
    icon: '👥',
    members: 167,
    isLive: true,
    category: 'hackathon',
  },
  {
    id: 'room5',
    name: 'Frontend Developers',
    description: 'React, Vue, Svelte — discuss the latest in frontend tech',
    icon: '🎨',
    members: 94,
    isLive: false,
    category: 'tech',
  },
];

const demoNotifications = [
  {
    id: 'n1',
    type: 'connection_request',
    from: demoUsers[0],
    message: 'Sarah Chen wants to connect with you',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
  },
  {
    id: 'n2',
    type: 'match',
    from: demoUsers[5],
    message: 'New AI match: Jordan Kim (91% compatibility)',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
  },
  {
    id: 'n3',
    type: 'event',
    message: 'AI Hackathon 2026 starts in 3 days!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: true,
  },
];

// Auth Store
export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('linkup_token') || null,
  isAuthenticated: !!localStorage.getItem('linkup_token'),
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    // Demo login
    await new Promise((r) => setTimeout(r, 800));
    const demoUser = {
      id: 'demo-user',
      name: 'You',
      email: email || 'demo@linkup.ai',
      role: 'AI/ML Engineer',
      bio: 'Passionate about building intelligent systems. Looking for co-founders and collaborators.',
      avatar: null,
      skills: ['Python', 'PyTorch', 'React', 'FastAPI', 'NLP'],
      interests: ['AI', 'Startups', 'Open Source'],
      github: 'demo-user',
      linkedin: 'demo-user',
      events: ['AI Hackathon 2026'],
    };
    const token = 'demo-jwt-token-' + Date.now();
    localStorage.setItem('linkup_token', token);
    set({ user: demoUser, token, isAuthenticated: true, isLoading: false });
    return true;
  },

  signup: async (data) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 800));
    const newUser = {
      id: 'demo-user',
      name: data.name || 'New User',
      email: data.email,
      role: data.role || 'Developer',
      bio: '',
      avatar: null,
      skills: [],
      interests: [],
      github: '',
      linkedin: '',
      events: [],
    };
    const token = 'demo-jwt-token-' + Date.now();
    localStorage.setItem('linkup_token', token);
    set({ user: newUser, token, isAuthenticated: true, isLoading: false });
    return true;
  },

  logout: () => {
    localStorage.removeItem('linkup_token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateProfile: (data) => {
    set((state) => ({ user: { ...state.user, ...data } }));
  },
}));

// Connection Store
export const useConnectionStore = create((set, get) => ({
  recommendations: demoUsers,
  connections: demoUsers.slice(0, 3),
  pendingRequests: [demoUsers[3]],
  currentIndex: 0,
  isLoading: false,

  swipeRight: (userId) => {
    const { recommendations, currentIndex, connections } = get();
    const user = recommendations.find((u) => u.id === userId);
    if (user) {
      set({
        connections: [...connections, user],
        currentIndex: currentIndex + 1,
      });
    }
  },

  swipeLeft: () => {
    set((state) => ({ currentIndex: state.currentIndex + 1 }));
  },

  superConnect: (userId) => {
    const { recommendations, currentIndex, connections } = get();
    const user = recommendations.find((u) => u.id === userId);
    if (user) {
      set({
        connections: [...connections, { ...user, superConnected: true }],
        currentIndex: currentIndex + 1,
      });
    }
  },

  acceptRequest: (userId) => {
    set((state) => ({
      pendingRequests: state.pendingRequests.filter((u) => u.id !== userId),
      connections: [...state.connections, state.pendingRequests.find((u) => u.id === userId)],
    }));
  },

  declineRequest: (userId) => {
    set((state) => ({
      pendingRequests: state.pendingRequests.filter((u) => u.id !== userId),
    }));
  },
}));

// Event Store
export const useEventStore = create((set) => ({
  events: demoEvents,
  rooms: demoRooms,
  currentRoom: null,
  messages: [],

  joinRoom: (roomId) => {
    const room = demoRooms.find((r) => r.id === roomId);
    set({
      currentRoom: room,
      messages: [
        { id: 'm1', user: demoUsers[0], content: 'Hey everyone! Excited for the hackathon 🚀', timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
        { id: 'm2', user: demoUsers[1], content: 'Looking for a frontend dev for our team. Anyone interested?', timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString() },
        { id: 'm3', user: demoUsers[5], content: 'I\'m working on an AI recommendation engine. Would love to collaborate!', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
        { id: 'm4', user: demoUsers[6], content: 'Just submitted our project! The AI-powered code review tool is live 🎉', timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
      ],
    });
  },

  leaveRoom: () => set({ currentRoom: null, messages: [] }),

  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },
}));

// Notification Store
export const useNotificationStore = create((set) => ({
  notifications: demoNotifications,
  unreadCount: demoNotifications.filter((n) => !n.read).length,

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: state.notifications.filter((n) => !n.read && n.id !== id).length,
    }));
  },

  markAllRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  },

  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },
}));

// Export demo data for use in components
export { demoUsers, demoEvents, demoRooms };
