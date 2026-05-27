import { useConnectionStore } from '../store/store';
import Navbar from '../components/Navbar';
import { HiOutlineUserGroup, HiOutlineCheck, HiOutlineX, HiOutlineChat, HiOutlineMailOpen } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Connections() {
  const { connections, pendingRequests, acceptRequest, declineRequest } = useConnectionStore();

  const handleAccept = (userId, name) => {
    acceptRequest(userId);
    toast.success(`Connected with ${name}!`);
  };

  const handleDecline = (userId, name) => {
    declineRequest(userId);
    toast.error(`Request from ${name} declined`);
  };

  return (
    <div className="min-h-screen bg-dark-900 cyber-grid pb-12">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="text-3xl font-extrabold font-display text-white mb-2">My Network</h1>
        <p className="text-gray-400 text-sm mb-8">Manage connection requests and active network matches.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Requests Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <HiOutlineMailOpen className="text-neon-cyan animate-pulse" />
              Pending Requests ({pendingRequests.length})
            </h3>

            {pendingRequests.length === 0 ? (
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center text-gray-400 text-sm">
                No pending requests. Check discover page to initiate matches.
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((reqUser) => (
                  <div key={reqUser.id} className="glass p-5 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-purple to-neon-cyan p-[1.5px]">
                        <div className="w-full h-full bg-dark-800 rounded-[9px] flex items-center justify-center font-bold text-white text-sm">
                          {reqUser.name[0]}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{reqUser.name}</h4>
                        <p className="text-[11px] text-neon-purple">{reqUser.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(reqUser.id, reqUser.name)}
                        className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-neon-cyan/20 border border-neon-cyan/40 hover:bg-neon-cyan/40 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <HiOutlineCheck /> Accept
                      </button>
                      <button
                        onClick={() => handleDecline(reqUser.id, reqUser.name)}
                        className="flex-1 py-2 rounded-xl text-xs font-bold text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <HiOutlineX /> Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Connected Network Column */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <HiOutlineUserGroup className="text-neon-purple" />
              Active Connections ({connections.length})
            </h3>

            {connections.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center text-gray-400 text-sm">
                No connections made yet. Go to Discover page to find like-minded builders.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {connections.map((cUser) => (
                  <div key={cUser.id} className="glass p-5 rounded-2xl border border-white/5 flex flex-col justify-between space-y-4 hover:border-neon-purple/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-neon-purple to-neon-cyan p-[2px]">
                          <div className="w-full h-full bg-dark-800 rounded-[10px] flex items-center justify-center font-bold text-white text-md">
                            {cUser.name[0]}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                            {cUser.name}
                            {cUser.isOnline && <span className="status-online inline-block" />}
                          </h4>
                          <p className="text-xs text-neon-purple">{cUser.role}</p>
                        </div>
                      </div>
                      
                      <span className="text-[10px] font-mono text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded">
                        {cUser.matchScore}% Match
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 line-clamp-2 italic">"{cUser.bio || 'Developer profile updated.'}"</p>

                    <div className="flex gap-2">
                      <Link
                        to="/messages"
                        className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-neon-purple to-neon-cyan flex items-center justify-center gap-1.5 no-underline shadow-md hover:shadow-neon-purple/20 transition-all"
                      >
                        <HiOutlineChat size={14} /> Send Message
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
