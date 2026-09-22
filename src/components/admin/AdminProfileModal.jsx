import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  User,
  Camera,
  Shield,
  Phone,
  Mail,
  MapPin,
  FileText,
  CheckCircle2,
  Sparkles,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

const PRESET_AVATARS = [
  { id: 'logo', label: 'AMK Official Emblem', url: '/assets/logo.png' },
  { id: 'exec-1', label: 'Executive Lead', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
  { id: 'exec-2', label: 'Chief Engineer', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { id: 'exec-3', label: 'Managing Director', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' }
];

export function AdminProfileModal({ isOpen, onClose }) {
  const { adminProfile, updateAdminProfile, showToast } = useApp();

  const [name, setName] = useState(adminProfile?.name || 'A. Charan Patel');
  const [title, setTitle] = useState(adminProfile?.title || 'Founder & Managing Director');
  const [email, setEmail] = useState(adminProfile?.email || 'admin@amkinfra.com');
  const [phone, setPhone] = useState(adminProfile?.phone || '9032477292');
  const [avatar, setAvatar] = useState(adminProfile?.avatar || '/assets/logo.png');
  const [officeAddress, setOfficeAddress] = useState(adminProfile?.officeAddress || 'Opp. Collectorate Office, Subedari, Hanamkonda, Warangal, Telangana - 506001');
  const [bio, setBio] = useState(adminProfile?.bio || 'Leading AMK INFRA with 12+ years of engineering rigor across 7 specialized corporate divisions.');
  const [role, setRole] = useState(adminProfile?.role || 'Super Admin');
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        showToast('Photo Loaded', 'Profile photo uploaded. Click Save to apply.', 'info');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateAdminProfile({
        name,
        title,
        email,
        phone,
        avatar,
        officeAddress,
        bio,
        role
      });
      onClose();
    } catch (err) {
      console.error(err);
      showToast('Error', 'Failed to update profile.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#1C1C1C] text-neutral-100 rounded-3xl border border-neutral-700 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-[#161616]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-black">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display text-white">
                Admin Profile Management
              </h2>
              <p className="text-xs text-neutral-400">
                Update founder credentials, photo, contact details &amp; executive bio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          {/* Avatar Photo Section */}
          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <h3 className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span>1. Profile Photo &amp; Avatar</span>
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              
              {/* Avatar Preview */}
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-neutral-800 border-2 border-amber-500 shadow-lg shrink-0 group">
                <img
                  src={avatar || '/assets/logo.png'}
                  alt="Admin Avatar"
                  className="w-full h-full object-cover"
                />
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-[10px] text-white cursor-pointer">
                  <Upload className="w-4 h-4 mb-0.5" />
                  <span>Change</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Photo Options */}
              <div className="flex-1 space-y-3 w-full">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                    Photo URL or Upload File
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://... or /assets/logo.png"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                    <label className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-neutral-200 border border-neutral-700 cursor-pointer flex items-center gap-1.5 shrink-0 transition-colors">
                      <Upload className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Preset Avatars */}
                <div>
                  <span className="text-[10px] text-neutral-400 font-semibold block mb-1.5">
                    Quick Preset Badges:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_AVATARS.map((av) => (
                      <button
                        type="button"
                        key={av.id}
                        onClick={() => setAvatar(av.url)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                          avatar === av.url
                            ? 'bg-amber-500/20 text-[#F59E0B] border-amber-500'
                            : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
                        }`}
                      >
                        <img src={av.url} alt="" className="w-3.5 h-3.5 rounded-full object-cover" />
                        <span>{av.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Personal Information */}
          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <h3 className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>2. Executive Credentials &amp; Contact</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. A. Charan Patel"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                  Designation / Role Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Founder & Managing Director"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                  Official Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@amkinfra.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                  Direct Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9032477292"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                Headquarters / Desk Address
              </label>
              <input
                type="text"
                value={officeAddress}
                onChange={(e) => setOfficeAddress(e.target.value)}
                placeholder="Subedari, Hanamkonda, Warangal, Telangana"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                Executive Bio / Vision Quote
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Summary of engineering leadership and commitment..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#1C1C1C] text-xs font-black shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{saving ? 'Saving Profile...' : 'Save Profile Changes'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
