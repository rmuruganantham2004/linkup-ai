import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/store';
import { HiOutlineUser, HiOutlineGlobe, HiOutlineSparkles, HiOutlineBookmark } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

export default function Profile() {
  const { user, updateProfile } = useAuthStore();
  const [name, setName] = useState(user?.name || 'Developer');
  const [role, setRole] = useState(user?.role || 'AI/ML Engineer');
  const [bio, setBio] = useState(user?.bio || 'Building state of the art recommendation models.');
  const [skills, setSkills] = useState(user?.skills?.join(', ') || 'Python, PyTorch, React, FastAPI');
  const [interests, setInterests] = useState(user?.interests?.join(', ') || 'AI, Hackathons, Startups');
  const [github, setGithub] = useState(user?.github || 'github-handle');
  const [linkedin, setLinkedin] = useState(user?.linkedin || 'linkedin-handle');

  const handleSave = (e) => {
    e.preventDefault();
    const skillsArray = skills.split(',').map((s) => s.trim()).filter(Boolean);
    const interestsArray = interests.split(',').map((i) => i.trim()).filter(Boolean);

    updateProfile({
      name,
      role,
      bio,
      skills: skillsArray,
      interests: interestsArray,
      github,
      linkedin,
    });

    toast.success('System configuration saved!');
  };

  return (
    <div className="min-h-screen bg-dark-900 cyber-grid pb-12">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />

      <main className="max-w-3xl mx-auto px-4 pt-8">
        <h1 className="text-3xl font-extrabold font-display text-white mb-2">Configure Profile</h1>
        <p className="text-gray-400 text-sm mb-8">Update your match parameters and developer nodes.</p>

        <form onSubmit={handleSave} className="glass rounded-3xl p-8 border border-white/5 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <HiOutlineSparkles size={80} className="text-neon-cyan" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-neon"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Role / Headline</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-neon"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Short Biography</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="input-neon py-3"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                Skills (comma separated)
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="input-neon"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                Interests (comma separated)
              </label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="input-neon"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block flex items-center gap-1.5">
                <FaGithub /> GitHub Username
              </label>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="input-neon"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block flex items-center gap-1.5">
                <FaLinkedin /> LinkedIn Username
              </label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="input-neon"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-neon-purple to-neon-cyan shadow-lg shadow-neon-purple/20 hover:shadow-neon-purple/40 hover:-translate-y-0.5 transition-all border-none cursor-pointer"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
