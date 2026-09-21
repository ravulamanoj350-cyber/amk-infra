import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Smartphone,
  QrCode,
  Layers,
  CheckCircle2,
  ExternalLink,
  X,
  Copy,
  Check,
  Shield,
  Bell,
  Camera,
  Share2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export function WebMobileSyncModal({ isOpen, onClose }) {
  const { setMobileMode, setDeviceSkin, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('android'); // 'android' | 'ios' | 'simulator'

  if (!isOpen) return null;

  const appUrl = typeof window !== 'undefined' ? `${window.location.origin}/?mode=mobile` : 'http://localhost:5173/?mode=mobile';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    showToast('Link Copied!', 'Mobile companion URL copied to clipboard.', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLaunchSimulator = (skin = 'iphone') => {
    setDeviceSkin(skin);
    setMobileMode(true);
    onClose();
    showToast('Mobile Simulator Activated', `Switched to ${skin.toUpperCase()} companion view.`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-neutral-200 rounded-3xl p-6 sm:p-8 text-[#4B4B4B] shadow-2xl overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F5F5F3] hover:bg-[#E8E8E5] text-[#1C1C1C] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-black text-xl shadow-sm">
            <Smartphone className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-black text-xl sm:text-2xl text-[#1C1C1C]">
                Web & Mobile App Bridge
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                ● Live Sync Active
              </span>
            </div>
            <p className="text-xs text-[#737373]">
              Seamlessly link and test the AMK INFRA mobile experience on your phone or built-in simulator.
            </p>
          </div>
        </div>

        {/* Platform Tabs */}
        <div className="flex bg-[#F5F5F3] p-1 rounded-2xl border border-neutral-200 mb-6 text-xs font-bold">
          <button
            onClick={() => setSelectedPlatform('simulator')}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              selectedPlatform === 'simulator'
                ? 'bg-[#F59E0B] text-[#1C1C1C] font-black shadow-sm'
                : 'text-[#737373] hover:text-[#1C1C1C]'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Interactive Simulator</span>
          </button>
          
          <button
            onClick={() => setSelectedPlatform('android')}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              selectedPlatform === 'android'
                ? 'bg-[#F59E0B] text-[#1C1C1C] font-black shadow-sm'
                : 'text-[#737373] hover:text-[#1C1C1C]'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Scan QR on Mobile</span>
          </button>

          <button
            onClick={() => setSelectedPlatform('ios')}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              selectedPlatform === 'ios'
                ? 'bg-[#F59E0B] text-[#1C1C1C] font-black shadow-sm'
                : 'text-[#737373] hover:text-[#1C1C1C]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>PWA & Web App</span>
          </button>
        </div>

        {/* Tab Content: Simulator */}
        {selectedPlatform === 'simulator' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-[#F5F5F3] p-5 rounded-2xl border border-neutral-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1C1C1C] uppercase tracking-wider">
                  Select Companion Device Skin:
                </span>
                <span className="text-[11px] text-[#D97706] font-semibold">100% Synchronized State</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleLaunchSimulator('iphone')}
                  className="p-4 rounded-xl bg-[#FFFFFF] hover:bg-neutral-50 border border-neutral-200 hover:border-[#F59E0B] text-left transition-all group shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-sm text-[#1C1C1C] group-hover:text-[#D97706]">iPhone 15 Pro</strong>
                    <Smartphone className="w-4 h-4 text-[#D97706]" />
                  </div>
                  <p className="text-[11px] text-[#737373]">Dynamic Island, 390x844 layout, touch gestures</p>
                </button>

                <button
                  onClick={() => handleLaunchSimulator('android')}
                  className="p-4 rounded-xl bg-[#FFFFFF] hover:bg-neutral-50 border border-neutral-200 hover:border-[#F59E0B] text-left transition-all group shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-sm text-[#1C1C1C] group-hover:text-[#D97706]">Samsung S24</strong>
                    <Smartphone className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-[11px] text-[#737373]">Punch hole camera, 412x860 layout, Android FAB</p>
                </button>

                <button
                  onClick={() => handleLaunchSimulator('fullscreen')}
                  className="p-4 rounded-xl bg-[#FFFFFF] hover:bg-neutral-50 border border-neutral-200 hover:border-[#F59E0B] text-left transition-all group shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-sm text-[#1C1C1C] group-hover:text-[#D97706]">Responsive PWA</strong>
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-[#737373]">Adaptive mobile browser view, full width container</p>
                </button>
              </div>
            </div>

            {/* Feature checklist */}
            <div className="grid grid-cols-2 gap-3 text-xs text-[#4B4B4B]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Simulated Push Milestone Notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Live Project Tracker with WhatsApp Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Corporate Divisions 1-Tap Filter Grid</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Biometric & Customer Login Sync</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Scan QR code */}
        {selectedPlatform === 'android' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#F5F5F3] p-5 rounded-2xl border border-neutral-200">
              
              {/* Dynamic SVG QR Graphic */}
              <div className="p-3 bg-white rounded-2xl flex-shrink-0 shadow-md border border-neutral-200">
                <svg viewBox="0 0 100 100" className="w-36 h-36">
                  {/* Position detection patterns */}
                  <rect x="5" y="5" width="28" height="28" fill="#363535ff" rx="3" />
                  <rect x="9" y="9" width="20" height="20" fill="#FFFFFF" />
                  <rect x="13" y="13" width="12" height="12" fill="#F59E0B" />

                  <rect x="67" y="5" width="28" height="28" fill="#1C1C1C" rx="3" />
                  <rect x="71" y="9" width="20" height="20" fill="#FFFFFF" />
                  <rect x="75" y="13" width="12" height="12" fill="#ffa200ff" />

                  <rect x="5" y="67" width="28" height="28" fill="#1C1C1C" rx="3" />
                  <rect x="9" y="71" width="20" height="20" fill="#FFFFFF" />
                  <rect x="13" y="75" width="12" height="12" fill="#F59E0B" />

                  {/* QR Matrix Bits */}
                  <rect x="38" y="10" width="6" height="6" fill="#1C1C1C" />
                  <rect x="48" y="10" width="6" height="6" fill="#383737ff" />
                  <rect x="38" y="22" width="6" height="6" fill="#1C1C1C" />
                  <rect x="48" y="28" width="6" height="6" fill="#1C1C1C" />
                  <rect x="10" y="38" width="6" height="6" fill="#1C1C1C" />
                  <rect x="22" y="38" width="6" height="6" fill="#1C1C1C" />
                  <rect x="38" y="38" width="6" height="6" fill="#F59E0B" />
                  <rect x="48" y="48" width="8" height="8" fill="#1C1C1C" rx="2" />
                  <rect x="60" y="38" width="6" height="6" fill="#1C1C1C" />
                  <rect x="75" y="38" width="6" height="6" fill="#1C1C1C" />
                  <rect x="88" y="38" width="6" height="6" fill="#1C1C1C" />
                  <rect x="38" y="60" width="6" height="6" fill="#1C1C1C" />
                  <rect x="48" y="68" width="6" height="6" fill="#1C1C1C" />
                  <rect x="68" y="60" width="6" height="6" fill="#1C1C1C" />
                  <rect x="78" y="68" width="6" height="6" fill="#1C1C1C" />
                  <rect x="88" y="78" width="6" height="6" fill="#1C1C1C" />
                  <rect x="60" y="85" width="6" height="6" fill="#1C1C1C" />
                </svg>
              </div>

              {/* Instructions */}
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-[#1C1C1C] text-sm">
                  Scan to Open on Android or iOS Phone
                </h4>
                <p className="text-[#4B4B4B] leading-relaxed">
                  Point your mobile phone camera at this QR code to load the AMK INFRA mobile web companion app instantly on your local network.
                </p>

                {/* Direct Link Copy */}
                <div className="flex items-center gap-2 bg-[#FFFFFF] p-2 rounded-xl border border-neutral-200">
                  <span className="text-[11px] font-mono text-[#D97706] truncate flex-1 font-bold">
                    {appUrl}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: iOS & PWA Install */}
        {selectedPlatform === 'ios' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="bg-[#F5F5F3] p-5 rounded-2xl border border-neutral-200 space-y-3 text-xs">
              <h4 className="font-bold text-[#1C1C1C] text-sm">
                How to Install as a Native App on iOS & Android:
              </h4>
              
              <div className="space-y-2 text-[#4B4B4B]">
                <div className="p-3 bg-[#FFFFFF] rounded-xl border border-neutral-200 flex items-start gap-2">
                  <strong className="text-[#D97706] font-mono">1.</strong>
                  <span>On iPhone (Safari), tap the <strong>Share Icon</strong> at the bottom bar.</span>
                </div>
                <div className="p-3 bg-[#FFFFFF] rounded-xl border border-neutral-200 flex items-start gap-2">
                  <strong className="text-[#D97706] font-mono">2.</strong>
                  <span>Select <strong>"Add to Home Screen"</strong> and tap Add.</span>
                </div>
                <div className="p-3 bg-[#FFFFFF] rounded-xl border border-neutral-200 flex items-start gap-2">
                  <strong className="text-[#D97706] font-mono">3.</strong>
                  <span>On Android (Chrome), tap the three dots & select <strong>"Install App"</strong>.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => handleLaunchSimulator('iphone')}
            className="px-5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <span>Launch iPhone Simulator</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#F5F5F3] hover:bg-[#E8E8E5] text-[#1C1C1C] font-bold text-xs border border-neutral-200 transition-colors"
          >
            Close Bridge
          </button>
        </div>

      </div>
    </div>
  );
}
