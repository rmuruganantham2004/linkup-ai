import { useState } from 'react';
import Navbar from '../components/Navbar';
import { demoUsers } from '../store/store';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HiOutlineSparkles, HiOutlineMap, HiOutlineChat } from 'react-icons/hi';
import { Link } from 'react-router-dom';

// Fix Leaflet default marker icons in React React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Neon Marker Creator
const createNeonMarker = (color) => {
  return new L.DivIcon({
    className: 'custom-neon-marker',
    html: `<div style="
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${color};
      box-shadow: 0 0 10px ${color}, 0 0 20px ${color};
      border: 2px solid white;
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const mapCenter = [37.7749, -122.4194]; // San Francisco center

export default function MapPage() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="min-h-screen bg-dark-900 cyber-grid flex flex-col pb-12">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex-1 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-white flex items-center gap-2">
            <HiOutlineMap className="text-neon-purple animate-pulse" />
            Live Attendee Map
          </h1>
          <p className="text-gray-400 text-sm">
            View nearby active users in your tech hackathon zone. Select a node to reveal coordinates & profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-[500px]">
          {/* Leaflet Map Frame */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-white/10 relative h-[500px] lg:h-auto shadow-2xl">
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ width: '100%', height: '100%' }}
              zoomControl={true}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              />
              
              {demoUsers.map((user) => {
                if (!user.location) return null;
                const isOnlineColor = user.isOnline ? '#10b981' : '#a855f7';
                return (
                  <Marker
                    key={user.id}
                    position={[user.location.lat, user.location.lng]}
                    icon={createNeonMarker(isOnlineColor)}
                    eventHandlers={{
                      click: () => {
                        setSelectedUser(user);
                      },
                    }}
                  >
                    <Popup className="custom-popup">
                      <div className="p-1">
                        <h4 className="font-bold text-white text-xs">{user.name}</h4>
                        <p className="text-[10px] text-neon-purple font-medium">{user.role}</p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>

          {/* Interactive Info Card Panel */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <HiOutlineSparkles className="text-neon-cyan" />
              Node Details
            </h3>

            {selectedUser ? (
              <div className="glass p-6 rounded-3xl border border-neon-purple/30 space-y-6 relative overflow-hidden shadow-2xl">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-purple/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-neon-purple to-neon-cyan p-[2px]">
                      <div className="w-full h-full bg-dark-800 rounded-[10px] flex items-center justify-center font-bold text-white text-lg">
                        {selectedUser.name[0]}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                        {selectedUser.name}
                        {selectedUser.isOnline && <span className="status-online inline-block" />}
                      </h4>
                      <p className="text-xs text-neon-purple">{selectedUser.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-neon-cyan bg-neon-cyan/10 px-2.5 py-1 rounded-full">
                    {selectedUser.matchScore}% Match
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block">Bio</span>
                  <p className="text-xs text-gray-300 italic">"{selectedUser.bio}"</p>
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block">Main Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedUser.skills.slice(0, 4).map((skill, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    to="/messages"
                    className="flex-1 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-neon-purple to-neon-cyan flex items-center justify-center gap-1.5 no-underline shadow-lg shadow-neon-purple/20 hover:shadow-neon-purple/40 hover:-translate-y-0.5 transition-all"
                  >
                    <HiOutlineChat size={14} /> Send Message
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center text-gray-400 text-sm">
                Click a neon marker node on the map to query attendee coordinates and reveal compatibility metrics.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
