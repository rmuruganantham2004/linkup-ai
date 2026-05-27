import { create } from 'zustand';

// Demo user data for showcasing the platform
const demoUsers = [
  {
    id: '1',
    name: 'Ananya Sharma',
    role: 'AI/ML Engineer',
    bio: 'Building the future of AI at IIT Delhi. Passionate about NLP and computer vision. Looking for co-founders who think big.',
    avatar: null,
    skills: ['Python', 'PyTorch', 'TensorFlow', 'NLP', 'Computer Vision'],
    interests: ['AI Ethics', 'Startups', 'Open Source'],
    github: 'ananyasharma',
    linkedin: 'ananya-sharma-ai',
    events: ['IIT Bombay Techfest 2026', 'Bengaluru AI Summit'],
    matchScore: 95,
    matchReason: 'You both work on AI systems and are attending the same hackathon in Bengaluru.',
    isOnline: true,
    location: { lat: 19.0760, lng: 72.8777 },
  },
  {
    id: '2',
    name: 'Arjun Reddy',
    role: 'Full-Stack Developer',
    bio: 'React wizard & Node.js ninja. Built 3 startups from Hyderabad. Currently exploring Web3 and decentralized apps.',
    avatar: null,
    skills: ['React', 'Node.js', 'TypeScript', 'Web3', 'Solidity'],
    interests: ['DeFi', 'Startup Life', 'Dev Tools'],
    github: 'arjunreddy',
    linkedin: 'arjun-reddy-dev',
    events: ['ETHIndia 2026', 'Hyderabad Web3 Summit'],
    matchScore: 88,
    matchReason: 'Complementary skills — your AI expertise pairs perfectly with his full-stack capabilities.',
    isOnline: true,
    location: { lat: 12.9716, lng: 77.5946 },
  },
  {
    id: '3',
    name: 'Priya Patel',
    role: 'Product Designer',
    bio: 'Design systems enthusiast from Ahmedabad. Turning complex problems into elegant solutions. Previously at Flipkart and Razorpay.',
    avatar: null,
    skills: ['UI/UX', 'Figma', 'Design Systems', 'Prototyping', 'User Research'],
    interests: ['Design Thinking', 'Accessibility', 'AI-Powered Design'],
    github: 'priyauxdesign',
    linkedin: 'priya-patel-design',
    events: ['IIT Bombay Techfest 2026', 'Figma Config India'],
    matchScore: 82,
    matchReason: 'Every great AI product needs great design. She can bring your ideas to life visually.',
    isOnline: false,
    location: { lat: 28.7041, lng: 77.1025 },
  },
  {
    id: '4',
    name: 'Vikram Nair',
    role: 'DevOps & Cloud Architect',
    bio: 'Scaling infrastructure to handle millions at Infosys. AWS certified. Love automating everything that can be automated.',
    avatar: null,
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
    interests: ['Cloud Native', 'MLOps', 'Serverless'],
    github: 'vikramnair',
    linkedin: 'vikram-nair-cloud',
    events: ['KubeCon India 2026', 'Bengaluru AI Summit'],
    matchScore: 79,
    matchReason: 'Your AI models need robust infrastructure. Vikram can help you deploy and scale.',
    isOnline: true,
    location: { lat: 13.0827, lng: 80.2707 },
  },
  {
    id: '5',
    name: 'Kavitha Menon',
    role: 'Blockchain Developer',
    bio: 'Smart contract auditor & DeFi protocol builder from Kochi. Bridging the gap between AI and blockchain technology.',
    avatar: null,
    skills: ['Solidity', 'Rust', 'Smart Contracts', 'DeFi', 'ZK-Proofs'],
    interests: ['Decentralized AI', 'Token Economics', 'Privacy Tech'],
    github: 'kavithamenon',
    linkedin: 'kavitha-menon-web3',
    events: ['ETHIndia 2026', 'Hyderabad Web3 Summit'],
    matchScore: 74,
    matchReason: 'Shared interest in decentralized AI systems and privacy-preserving technology.',
    isOnline: true,
    location: { lat: 17.3850, lng: 78.4867 },
  },
  {
    id: '6',
    name: 'Rohit Deshmukh',
    role: 'Data Scientist',
    bio: 'Turning data into actionable insights at TCS. Kaggle Grand Master. Published researcher in recommendation systems.',
    avatar: null,
    skills: ['Python', 'R', 'ML', 'Statistics', 'Data Viz'],
    interests: ['RecSys', 'A/B Testing', 'Causal Inference'],
    github: 'rohitdeshmukh',
    linkedin: 'rohit-deshmukh-data',
    events: ['Bengaluru AI Summit', 'NASSCOM AI Conclave'],
    matchScore: 91,
    matchReason: 'Both passionate about recommendation systems and attending the same AI summit in Bengaluru.',
    isOnline: false,
    location: { lat: 18.5204, lng: 73.8567 },
  },
  {
    id: '7',
    name: 'Deepika Iyer',
    role: 'Startup Founder & CEO',
    bio: 'Serial entrepreneur from Chennai. IIMA alumni. Currently building AI-first developer tools. Always looking for talented builders.',
    avatar: null,
    skills: ['Leadership', 'Fundraising', 'Product Strategy', 'Growth', 'GTM'],
    interests: ['B2B SaaS', 'Developer Experience', 'AI Tools'],
    github: 'deepikaiyer',
    linkedin: 'deepika-iyer-ceo',
    events: ['TiE Global Summit', 'Chennai Startup Networking Night'],
    matchScore: 86,
    matchReason: 'She\'s actively looking for AI engineers to join her IIMA-backed startup.',
    isOnline: true,
    location: { lat: 22.5726, lng: 88.3639 },
  },
  {
    id: '8',
    name: 'Raj Kapoor',
    role: 'Mobile Developer',
    bio: 'Building beautiful cross-platform apps with React Native and Flutter from Pune. 50M+ app downloads and counting.',
    avatar: null,
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    interests: ['Mobile UX', 'AR/VR', 'Wearables'],
    github: 'rajkapoor',
    linkedin: 'raj-kapoor-mobile',
    events: ['IIT Bombay Techfest 2026', 'Google I/O Extended Mumbai'],
    matchScore: 77,
    matchReason: 'Your AI backend + his mobile expertise = a winning hackathon team.',
    isOnline: false,
    location: { lat: 23.0225, lng: 72.5714 },
  },
];

const demoEvents = [
  {
    id: 'evt1',
    name: 'IIT Bombay Techfest 2026',
    description: 'Build the next generation of AI applications in 48 hours. ₹40 Lakh in prizes.',
    date: '2026-06-15',
    location: 'Mumbai, Maharashtra',
    attendees: 342,
    category: 'Hackathon',
    image: null,
    tags: ['AI', 'ML', 'Deep Learning'],
  },
  {
    id: 'evt2',
    name: 'ETHIndia 2026',
    description: 'Connect with the top Web3 builders in India and explore the future of decentralized technology.',
    date: '2026-07-01',
    location: 'Bengaluru, Karnataka',
    attendees: 218,
    category: 'Conference',
    image: null,
    tags: ['Web3', 'Blockchain', 'DeFi'],
  },
  {
    id: 'evt3',
    name: 'Chennai Startup Networking Night',
    description: 'Meet founders, investors, and engineers building the future in India. Pitch your idea.',
    date: '2026-06-20',
    location: 'Chennai, Tamil Nadu',
    attendees: 156,
    category: 'Networking',
    image: null,
    tags: ['Startups', 'Funding', 'Networking'],
  },
  {
    id: 'evt4',
    name: 'Bengaluru Frontend Dev Conference',
    description: 'Deep dive into React, Vue, and the modern frontend ecosystem. Workshops included.',
    date: '2026-08-10',
    location: 'Bengaluru, Karnataka',
    attendees: 480,
    category: 'Conference',
    image: null,
    tags: ['React', 'Frontend', 'CSS'],
  },
];

const demoRooms = [
  {
    id: 'room1',
    name: 'AI Hackathon Mumbai',
    description: 'General discussion for IIT Bombay Techfest 2026 participants',
    icon: '🤖',
    members: 142,
    isLive: true,
    category: 'hackathon',
  },
  {
    id: 'room2',
    name: 'Web3 Builders India',
    description: 'Connect with blockchain developers and Web3 enthusiasts across India',
    icon: '⛓️',
    members: 89,
    isLive: true,
    category: 'tech',
  },
  {
    id: 'room3',
    name: 'Startup India Network',
    description: 'Find co-founders, mentors, and investors in the Indian startup ecosystem',
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
    name: 'Bengaluru Frontend Devs',
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
    message: 'Ananya Sharma wants to connect with you',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
  },
  {
    id: 'n2',
    type: 'match',
    from: demoUsers[5],
    message: 'New AI match: Rohit Deshmukh (91% compatibility)',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
  },
  {
    id: 'n3',
    type: 'event',
    message: 'IIT Bombay Techfest 2026 starts in 3 days!',
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
