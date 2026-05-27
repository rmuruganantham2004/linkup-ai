import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { demoUsers } from '../store/store';
import { HiOutlinePaperAirplane, HiOutlineSearch, HiOutlineChatAlt2 } from 'react-icons/hi';
import toast, { Toaster } from 'react-hot-toast';

export default function Messages() {
  const [selectedConvo, setSelectedConvo] = useState(demoUsers[0]);
  const [messages, setMessages] = useState({});
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Load initial simulated history
  useEffect(() => {
    const initialHistories = {};
    demoUsers.forEach(user => {
      initialHistories[user.id] = [
        { id: '1', sender: 'them', content: `Hey! I saw we matched at the event. Ready to build?`, timestamp: '10:02 AM' },
        { id: '2', sender: 'you', content: `Absolutely! What are you planning to construct?`, timestamp: '10:05 AM' },
        { id: '3', sender: 'them', content: `I'm setting up a Next.js frontend with some FastAPI ML nodes. What about you?`, timestamp: '10:06 AM' }
      ];
    });
    setMessages(initialHistories);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedConvo]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsgs = messages[selectedConvo.id] || [];
    const newMsg = {
      id: Date.now().toString(),
      sender: 'you',
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages({
      ...messages,
      [selectedConvo.id]: [...userMsgs, newMsg]
    });
    setInputText('');

    // Simulate Typing Indicator + Simulated Reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply = {
        id: (Date.now() + 1).toString(),
        sender: 'them',
        content: `Acknowledged. Let's sync up near the frontend developers room.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => ({
        ...prev,
        [selectedConvo.id]: [...(prev[selectedConvo.id] || []), reply]
      }));
      toast.success('New message received!', { id: 'msg-alert', duration: 1500 });
    }, 3000);
  };

  const currentChatHistory = messages[selectedConvo?.id] || [];

  return (
    <div className="min-h-screen bg-dark-900 cyber-grid flex flex-col">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 flex-1 flex flex-row gap-6 pb-8 h-[calc(100vh-100px)]">
        {/* Conversations List Sidebar */}
        <div className="w-80 flex flex-col gap-4 flex-shrink-0">
          <h2 className="text-xl font-bold font-display text-white">Direct Messages</h2>
          
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <HiOutlineSearch size={18} />
            </span>
            <input type="text" placeholder="Search matches..." className="input-neon pl-10 py-2.5 text-xs" />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {demoUsers.slice(0, 4).map((user) => {
              const isSelected = selectedConvo?.id === user.id;
              return (
                <button
                  key={user.id}
                  onClick={() => setSelectedConvo(user)}
                  className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border cursor-pointer hover:-translate-y-0.5 hover:shadow-lg ${
                    isSelected
                      ? 'bg-neon-purple/10 border-neon-purple/50 text-white shadow-neon-purple/20'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-purple to-neon-cyan p-[1.5px] relative flex-shrink-0">
                    <div className="w-full h-full bg-dark-800 rounded-[9px] flex items-center justify-center font-bold text-white text-sm">
                      {user.name[0]}
                    </div>
                    {user.isOnline && <span className="absolute -bottom-0.5 -right-0.5 status-online" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-start mb-0.5">
                      <h4 className="font-bold text-sm truncate">{user.name}</h4>
                      <span className="text-[9px] text-gray-500">10:06 AM</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{user.role}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Conversation Panel */}
        <div className="flex-1 glass rounded-3xl border border-white/5 flex flex-col overflow-hidden">
          {/* Selected Chat Header */}
          <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-dark-800/40">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-purple to-neon-cyan p-[1.5px] relative">
              <div className="w-full h-full bg-dark-800 rounded-[9px] flex items-center justify-center font-bold text-white text-sm">
                {selectedConvo?.name[0]}
              </div>
              {selectedConvo?.isOnline && <span className="absolute -bottom-0.5 -right-0.5 status-online" />}
            </div>
            <div>
              <h3 className="font-bold text-white font-display text-sm">{selectedConvo?.name}</h3>
              <p className="text-[11px] text-neon-purple font-medium">{selectedConvo?.role}</p>
            </div>
          </div>

          {/* Chat Bubble Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentChatHistory.map((msg) => {
              const isYou = msg.sender === 'you';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[80%] ${isYou ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-purple to-neon-cyan p-[1.5px] flex-shrink-0">
                    <div className="w-full h-full bg-dark-800 rounded-[7px] flex items-center justify-center font-bold text-white text-xs">
                      {isYou ? 'Y' : selectedConvo.name[0]}
                    </div>
                  </div>
                  <div className={`space-y-1 ${isYou ? 'text-right' : ''}`}>
                    <div className={`p-3 rounded-2xl text-sm ${
                      isYou
                        ? 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white rounded-tr-none'
                        : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                    <span className="text-[9px] text-gray-500 block">{msg.timestamp}</span>
                  </div>
                </div>
              );
            })}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-purple to-neon-cyan p-[1.5px]">
                  <div className="w-full h-full bg-dark-800 rounded-[7px] flex items-center justify-center font-bold text-white text-xs">
                    {selectedConvo.name[0]}
                  </div>
                </div>
                <div className="flex gap-1.5 p-3 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Send Form */}
          <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-dark-800/40 flex gap-2">
            <input
              type="text"
              placeholder={`Send message to ${selectedConvo?.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 input-neon"
            />
            <button
              type="submit"
              className="w-12 h-12 bg-neon-purple hover:bg-neon-purple/80 text-white rounded-xl flex items-center justify-center transition-all border-none cursor-pointer"
            >
              <HiOutlinePaperAirplane className="rotate-90 text-lg" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
