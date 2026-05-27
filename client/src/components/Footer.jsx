import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/5 bg-dark-900 py-12 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
                  boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)',
                }}
              >
                <span className="font-bold text-white text-xs">L</span>
              </div>
              <span className="font-bold text-white text-md tracking-wider font-display">
                Event Network Platform
              </span>
            </Link>
            <p className="text-sm">
              The futuristic networking platform for developer events, hackathons, and tech conferences. Find your team, co-founders, or peers in real-time.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/discover" className="hover:text-neon-cyan transition-colors">Discover</Link></li>
              <li><Link to="/events" className="hover:text-neon-cyan transition-colors">Events</Link></li>
              <li><Link to="/map" className="hover:text-neon-cyan transition-colors">Attendee Map</Link></li>
              <li><Link to="/rooms" className="hover:text-neon-cyan transition-colors">Event Rooms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/discover" className="hover:text-neon-cyan transition-colors">AI Recommendations</Link></li>
              <li><Link to="/discover" className="hover:text-neon-cyan transition-colors">Swipe Networking</Link></li>
              <li><Link to="/messages" className="hover:text-neon-cyan transition-colors">Real-time Chat</Link></li>
              <li><Link to="/connections" className="hover:text-neon-cyan transition-colors">Team Formation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><span onClick={() => toast('Privacy Policy is being updated for 2026.', { icon: '🔒' })} className="hover:text-neon-cyan transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span onClick={() => toast('Terms of Service are coming soon.', { icon: '📜' })} className="hover:text-neon-cyan transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span onClick={() => toast('Please follow our community guidelines!', { icon: '🤝' })} className="hover:text-neon-cyan transition-colors cursor-pointer">Code of Conduct</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/5 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Event Network Platform. Powered by Cosine Similarity & WebSockets.</p>
        </div>
      </div>
    </footer>
  );
}
