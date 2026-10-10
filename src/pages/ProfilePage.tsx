import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Edit3,
  CheckCircle2,
  Flame,
  Layers,
  Award,
  Zap,
  ShieldCheck,
  Cpu,
  Plus,
  X,
  AlertTriangle,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [roleInput, setRoleInput] = useState(profile.role);
  const [bioInput, setBioInput] = useState(profile.bio);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: nameInput,
      role: roleInput,
      bio: bioInput,
      avatarInitials: nameInput.trim().charAt(0).toUpperCase() || 'U',
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          My Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review your developer stats, debug achievements, and firmware skill profile.
        </p>
      </div>

      {/* Main Profile Header Card */}
      <div className="rounded-2xl border border-slate-800 bg-[#090f1d] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-5">
          {/* Avatar Circle */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 border-2 border-cyan-300 flex items-center justify-center text-2xl font-black text-slate-950 shadow-lg shadow-cyan-950/40 shrink-0">
            {profile.avatarInitials}
          </div>

          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>{profile.name}</span>
            </h2>
            <p className="text-xs font-mono text-cyan-400 font-medium">
              {profile.role}
            </p>
            <p className="text-xs text-slate-400 max-w-lg leading-relaxed pt-0.5">
              {profile.bio}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setNameInput(profile.name);
            setRoleInput(profile.role);
            setBioInput(profile.bio);
            setIsEditing(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors border border-slate-700 self-start sm:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Numerical Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border border-slate-800 bg-[#090f1d] flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Total Analyses</span>
            <div className="text-3xl font-extrabold text-white font-mono tabular-nums mt-1">
              {profile.totalAnalyses}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Completed C reviews</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-800 bg-[#090f1d] flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Issues Detected</span>
            <div className="text-3xl font-extrabold text-amber-400 font-mono tabular-nums mt-1">
              {profile.issuesDetected}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Flagged for review</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-800/40 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-800 bg-[#090f1d] flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Issues Fixed</span>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono tabular-nums mt-1">
              {profile.fixedIssues}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Bugs & hazards resolved</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-800 bg-[#090f1d] flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Learning Streak</span>
            <div className="text-3xl font-extrabold text-rose-400 font-mono tabular-nums mt-1 flex items-baseline gap-1.5">
              <span>{profile.learningStreak}</span>
              <span className="text-xs font-normal text-slate-400">Days</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Active learning streak</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-800/40 flex items-center justify-center text-rose-400">
            <Flame className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Skills & Interests */}
      <div className="rounded-xl border border-slate-800 bg-[#090f1d] p-5 space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
          Skills & Focus Areas
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-xs font-medium rounded-lg bg-slate-900 border border-slate-700/80 text-cyan-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Achievements List */}
      <div className="rounded-xl border border-slate-800 bg-[#090f1d] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
            Achievements
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {profile.achievements.filter((a) => a.unlocked).length} / {profile.achievements.length} Unlocked
          </span>
        </div>

        <div className="space-y-3">
          {profile.achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                ach.unlocked
                  ? 'border-emerald-500/20 bg-emerald-950/10'
                  : 'border-slate-800 bg-[#070b14] opacity-50'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    ach.unlocked
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                  <p className="text-xs text-slate-400">{ach.description}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span
                  className={`text-xs font-mono font-medium ${
                    ach.unlocked ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                >
                  {ach.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#090f1d] p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-base font-bold text-white">Edit Profile</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs bg-[#060a12] border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Role / Title
                </label>
                <input
                  type="text"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs bg-[#060a12] border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Bio
                </label>
                <textarea
                  rows={3}
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#060a12] border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
