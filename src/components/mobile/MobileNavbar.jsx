import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Bell, Phone, Shield, Smartphone, Layers, QrCode, ShoppingBag } from 'lucide-react';

export function MobileNavbar({ onOpenNotifications }) {
  const { navigateTo, unreadCount, setMobileMode, setWebMobileSyncModalOpen, activeTab, cartCount, setCartDrawerOpen } = useApp();

  return (
    <div className="sticky top-0 z-40 bg-[#181818] backdrop-blur-md border-b border-neutral-800 px-3.5 py-2.5 flex items-center justify-between shadow-lg">
      {/* Brand logo */}
      <div
        onClick={() => navigateTo('home')}
        className="flex items-center gap-2.5 cursor-pointer select-none"
      >
        <div className="w-9 h-9 rounded-xl bg-white p-0.5 flex items-center justify-center shadow-md border border-amber-500/50 overflow-hidden shrink-0">
          <img
            src="/assets/logo.png"
            alt="AMK INFRA Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <span className="font-display font-black text-sm text-white tracking-wider">
            AMK <span className="text-[#F59E0B]">INFRA</span>
          </span>
          <span className="text-[9px] text-neutral-400 block -mt-0.5 font-mono">
            7 Wings • Telangana
          </span>
        </div>
      </div>

      {/* Right tools */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setCartDrawerOpen(true)}
          className="relative p-1.5 rounded-lg bg-[#242424] text-[#F59E0B] border border-neutral-700"
          title="Materials Cart"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={() => navigateTo('store')}
          className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors flex items-center gap-1 ${
            activeTab === 'store'
              ? 'bg-[#F59E0B] text-[#1C1C1C] border-[#F59E0B]'
              : 'bg-[#242424] text-neutral-300 border-neutral-700'
          }`}
          title="Store"
        >
          <span>Store</span>
        </button>

        <a
          href="tel:9032477292"
          className="p-1.5 rounded-lg bg-[#242424] text-[#F59E0B]"
          title="Direct Call"
        >
          <Phone className="w-3.5 h-3.5" />
        </a>

        <button
          onClick={onOpenNotifications}
          className="relative p-1.5 rounded-lg bg-[#242424] text-neutral-300"
        >
          <Bell className="w-3.5 h-3.5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setMobileMode(false)}
          className="px-2 py-1 rounded-lg bg-[#242424] text-emerald-400 text-[10px] font-bold border border-emerald-500/30"
          title="Switch to Desktop Web View"
        >
          Web
        </button>
      </div>
    </div>
  );
}
