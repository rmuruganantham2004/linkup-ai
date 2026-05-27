import { useState, useEffect, useRef } from 'react';
import { useEventStore, demoUsers } from '../store/store';
import Navbar from '../components/Navbar';
import {
  HiOutlineUserGroup,
  HiOutlineChat,
  HiOutlineVolumeUp,
  HiOutlinePaperAirplane,
  HiOutlineSparkles,
} from 'react-icons/hi';
import toast, { Toaster } from 'react-hot-toast';

export default function Events() {
  const { rooms, currentRoom, messages, joinRoom, leaveRoom, addMessage } = useEventStore();
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'members', 'teams'
  const chatEndRef = useRef(null);

  // Default join the first room on load
  useEffect(() => {
    if (rooms.length > 0 && !currentRoom) {
      joinRoom(rooms[0].id);
    }
  }, [rooms, currentRoom, joinRoom]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      user: {
        name: 'You',
        role: 'AI Developer',
      },
      content: text,
      timestamp: new Date().toISOString(),
    };

    addMessage(newMessage);
    setText('');
    toast.success('Message broadcasted!', { duration: 800 });

    // Simulate standard cyber reply after 2.5 seconds
    setTimeout(() => {
      const simulatedReplies = [
        "That sounds super cool, let's connect and discuss!",
        "Working on a similar stack! Let's check out the team formation tab.",
        "Anyone up for a Zoom/Discord call inside the Team room?",
      ];
      const randomUser = demoUsers[Math.floor(Math.random() * demoUsers.length)];
      const replyMessage = {
        id: (Date.now() + 1).toString(),
        user: randomUser,
        content: simulatedReplies[Math.floor(Math.random() * simulatedReplies.length)],
        timestamp: new Date().toISOString(),
      };
      addMessage(replyMessage);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-dark-900 cyber-grid flex flex-col">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex-1 flex flex-col md:flex-row gap-6 pb-8 h-[calc(100vh-100px)]">
        {/* Rooms Sidebar */}
        <div className="w-full md:w-64 flex flex-col gap-4 flex-shrink-0">
          <h2 className="text-xl font-bold font-display text-white">Event Hubs</h2>
          <div className="flex-1 overflow-y-auto space-y-2">
            {rooms.map((room) => {
              const isSelected = currentRoom?.id === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => joinRoom(room.id)}
                  className={`w-full text-left p-3.5 rounded-2xl flex items-center justify-between transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-neon-purple/10 border-neon-purple/50 text-white'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{room.icon}</span>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm truncate">{room.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{room.members} members</p>
                    </div>
                  </div>
                  {room.isLive && <span className="status-online flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat / Content Panel */}
        <div className="flex-1 glass rounded-3xl border border-white/5 flex flex-col overflow-hidden">
          {/* Room Header */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-dark-800/40">
            <div>
              <h3 className="font-bold text-white font-display text-md">
                {currentRoom?.name || 'Loading Hub...'}
              </h3>
              <p className="text-xs text-gray-400">{currentRoom?.description}</p>
            </div>
            
            <div className="flex gap-2">
              {['chat', 'members', 'teams'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border-none cursor-pointer ${
                    activeTab === tab
                      ? 'bg-neon-cyan text-black'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Render Active Tab */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTab === 'chat' && (
              <>
                {/* Simulated Announcements */}
                <div className="p-3.5 bg-neon-purple/5 border border-neon-purple/20 rounded-2xl flex items-start gap-2.5">
                  <HiOutlineVolumeUp className="text-neon-purple text-lg mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-purple-200">
                    <span className="font-bold">SYSTEM ANNOUNCEMENT:</span> Hackathon project submissions close in 18 hours. Make sure to link your team in the system.
                  </div>
                </div>

                {/* Messages List */}
                <div className="space-y-4 pt-2">
                  {messages.map((msg) => {
                    const isYou = msg.user.name === 'You';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 max-w-[80%] ${isYou ? 'ml-auto flex-row-reverse' : ''}`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-purple to-neon-cyan p-[1.5px] flex-shrink-0">
                          <div className="w-full h-full bg-dark-800 rounded-[7px] flex items-center justify-center font-bold text-white text-xs">
                            {msg.user.name[0]}
                          </div>
                        </div>
                        <div className={`space-y-1 ${isYou ? 'text-right' : ''}`}>
                          <div className="flex items-center gap-1.5 justify-start">
                            <span className="text-xs font-semibold text-white">{msg.user.name}</span>
                            <span className="text-[10px] text-gray-500">{msg.user.role}</span>
                          </div>
                          <div className={`p-3 rounded-2xl text-sm ${
                            isYou
                              ? 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white rounded-tr-none'
                              : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'
                          }`}>
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={chatEndRef} />
                </div>
              </>
            )}

            {activeTab === 'members' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {demoUsers.slice(0, 5).map((mUser) => (
                  <div key={mUser.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-purple to-neon-cyan p-[1.5px]">
                        <div className="w-full h-full bg-dark-800 rounded-[7px] flex items-center justify-center font-bold text-white text-xs">
                          {mUser.name[0]}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                          {mUser.name}
                          {mUser.isOnline && <span className="status-online" />}
                        </h4>
                        <p className="text-[10px] text-neon-purple">{mUser.role}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded">
                      {mUser.matchScore}% Match
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'teams' && (
              <div className="space-y-6">
                <div className="p-4 bg-neon-cyan/5 border border-neon-cyan/20 rounded-2xl flex items-start gap-3">
                  <HiOutlineSparkles className="text-neon-cyan text-xl flex-shrink-0 animate-pulse" />
                  <div className="text-xs text-cyan-200">
                    <span className="font-bold">AI Team Recommender:</span> Based on your profile skills (Python, PyTorch, React, FastAPI), these attendees are recommended to complement your technical project requirements.
                  </div>
                </div>

                <div className="space-y-4">
                  {demoUsers.slice(1, 4).map((mUser) => (
                    <div key={mUser.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div>
                        <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                          {mUser.name}
                          <span className="text-[10px] text-neon-purple">({mUser.role})</span>
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">Skills needed: {mUser.skills.slice(0, 3).join(', ')}</p>
                      </div>
                      <button
                        onClick={() => toast.success(`Team invitation sent to ${mUser.name}!`)}
                        className="px-4 py-2 bg-neon-purple hover:bg-neon-purple/80 text-white rounded-xl text-xs font-bold transition-all border-none cursor-pointer"
                      >
                        Invite to Team
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Message Input Box (only shown for chat tab) */}
          {activeTab === 'chat' && (
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-dark-800/40 flex gap-2">
              <input
                type="text"
                placeholder="Broadcast a message to the room..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 input-neon"
              />
              <button
                type="submit"
                className="w-12 h-12 bg-neon-purple hover:bg-neon-purple/80 text-white rounded-xl flex items-center justify-center transition-all border-none cursor-pointer"
              >
                <HiOutlinePaperAirplane className="rotate-90 text-lg" />
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
