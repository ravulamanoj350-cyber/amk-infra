import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageSelector } from './LanguageSelector';
import {
  Phone,
  MessageSquare,
  Calculator,
  Shield,
  Search,
  Bell,
  Menu,
  X,
  Smartphone,
  CheckCircle,
  ExternalLink,
  Building2,
  HardHat,
  ChevronRight,
  ChevronDown,
  User,
  Layers,
  QrCode,
  Sparkles,
  Award,
  Briefcase,
  FileText,
  ShieldCheck,
  ClipboardList,
  Globe,
  ShoppingBag
} from 'lucide-react';

export function Navbar({ onOpenNotifications }) {
  const {
    activeTab,
    navigateTo,
    mobileMode,
    setMobileMode,
    setEstimatorModalOpen,
    setWebMobileSyncModalOpen,
    openJobApplication,
    openStaffIntranet,
    cart,
    cartCount,
    setCartDrawerOpen,
    adminUser,
    customerUser,
    unreadCount,
    divisions,
    company,
    t
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [divisionsDropdownOpen, setDivisionsDropdownOpen] = useState(false);
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [careersDropdownOpen, setCareersDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t('nav_home', 'Home') },
    { id: 'divisions', label: t('nav_divisions', 'Divisions'), hasDivisionsDropdown: true },
    { id: 'services', label: t('nav_services', 'Services') },
    { id: 'store', label: t('nav_store', 'Store / Materials'), badge: 'Buy Now', isStore: true },
    { id: 'safety-quality', label: t('nav_safety_qa', 'Safety & QA') },
    { id: 'careers', label: t('nav_careers', 'Careers'), hasCareersDropdown: true, badge: t('hiring_badge', 'Hiring') },
    { id: 'request', label: t('nav_request', 'Request Service'), highlight: true },
    { id: 'portfolio', label: t('nav_portfolio', 'Portfolio') },
    { id: 'tracker', label: t('nav_tracker', 'Tracker') },
    { id: 'about', label: t('nav_about', 'About') },
  ];

  const handleLinkClick = (tabId, options = {}) => {
    navigateTo(tabId, options);
    setMobileMenuOpen(false);
    setDivisionsDropdownOpen(false);
    setClientDropdownOpen(false);
    setCareersDropdownOpen(false);
  };

  return (
    <>
      {/* Top Notification / Corporate Credentials Bar */}
      <div className="bg-[#141414] text-[#A8A8A2] text-xs py-2 px-4 border-b border-neutral-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#F59E0B] font-extrabold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
              {t('corp_badge', 'PREMIER MULTI-DISCIPLINARY INFRASTRUCTURE CONGLOMERATE')}
            </span>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-emerald-400 font-medium">
              <Award className="w-3.5 h-3.5" /> {t('iso_badge', 'ISO 9001:2015 & ISO 45001 (0.00 LTI)')}
            </span>
            <span className="hidden xl:inline text-neutral-600">|</span>
            <span className="hidden xl:inline text-neutral-400">
              {t('location_badge', '📍 Hanamkonda & Warangal Urban, Telangana')}
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            {/* Multi-Language Selector Switcher */}
            <LanguageSelector variant="topbar" />

            {/* Quick Staff DPR Trigger */}
            <button
              onClick={openStaffIntranet}
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold transition-colors bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30"
              title="Site Field Crew DPR Filing Desk"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('field_dpr_btn', 'Field DPR Desk')}</span>
            </button>

            {/* Mobile Sync / QR */}
            <button
              onClick={() => setWebMobileSyncModalOpen(true)}
              className="flex items-center gap-1 text-[#F59E0B] hover:text-amber-300 font-bold transition-colors bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30"
              title="Open Mobile App QR & Sync Bridge"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>{t('mobile_qr_btn', 'Mobile QR')}</span>
            </button>

            <span className="text-neutral-600">|</span>

            {/* Direct MD Hotline */}
            <a
              href="tel:9032477292"
              className="flex items-center gap-1.5 hover:text-[#F59E0B] font-medium text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>9032477292</span>
            </a>

            <span className="text-neutral-600">|</span>

            {/* Client Portal Login */}
            <button
              onClick={() => handleLinkClick('auth')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                customerUser
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
              }`}
            >
              <User className="w-3 h-3" />
              <span>{customerUser ? customerUser.name.split(' ')[0] : t('client_portal_btn', 'Client Portal')}</span>
            </button>

            {/* Staff / Admin Login */}
            <button
              onClick={() => handleLinkClick('admin')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                adminUser
                  ? 'bg-amber-500/20 text-[#F59E0B] border border-amber-500/40'
                  : 'bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
              }`}
            >
              <Shield className="w-3 h-3 text-[#F59E0B]" />
              <span>{adminUser ? 'Admin Portal' : t('staff_login_btn', 'Staff Login')}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Glass Navbar */}
      <header className="sticky top-0 z-40 bg-[#181818]/98 backdrop-blur-md border-b border-neutral-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Corporate Logo with Official Emblem */}
            <div
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-14 h-14 rounded-2xl bg-white p-1 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 border border-amber-500/50 overflow-hidden shrink-0">
                <img
                  src="/assets/logo.png"
                  alt="AMK INFRA Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-2xl tracking-wider text-white">
                    AMK <span className="text-[#F59E0B]">INFRA</span>
                  </span>
                  <span className="bg-amber-500/20 text-[#F59E0B] text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded border border-amber-500/30">
                    7 WINGS
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 font-medium tracking-wide">
                  Building Better Spaces, Reliable Services
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = activeTab === link.id;

                // Divisions Dropdown
                if (link.hasDivisionsDropdown) {
                  return (
                    <div
                      key={link.id}
                      className="relative"
                      onMouseEnter={() => setDivisionsDropdownOpen(true)}
                      onMouseLeave={() => setDivisionsDropdownOpen(false)}
                    >
                      <button
                        onClick={() => handleLinkClick(link.id)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                          isActive
                            ? 'bg-[#2A2A2A] text-[#F59E0B] shadow-inner'
                            : 'text-neutral-200 hover:text-white hover:bg-[#2A2A2A]'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>{link.label}</span>
                        <ChevronDown className="w-3 h-3 opacity-70" />
                      </button>

                      {divisionsDropdownOpen && (
                        <div className="absolute top-full left-0 w-[580px] bg-[#1C1C1C]/98 border border-neutral-700 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800">
                            <div>
                              <span className="text-[10px] text-[#F59E0B] font-bold uppercase tracking-wider block">
                                AMK INFRA Enterprise Wings
                              </span>
                              <strong className="text-white text-sm">7 Specialized Corporate Divisions</strong>
                            </div>
                            <button
                              onClick={() => handleLinkClick('divisions')}
                              className="text-xs text-[#F59E0B] hover:underline font-bold flex items-center gap-1"
                            >
                              <span>View All Specs</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {(divisions || []).map(div => (
                              <button
                                key={div.id}
                                onClick={() => handleLinkClick('divisions', { divisionId: div.id })}
                                className="text-left p-2.5 rounded-xl hover:bg-[#262626] border border-transparent hover:border-neutral-700 transition-all flex items-start gap-2.5 group"
                              >
                                <div className="w-8 h-8 rounded-lg bg-neutral-800 group-hover:bg-[#F59E0B] group-hover:text-[#1C1C1C] text-[#F59E0B] flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors">
                                  {div.code.split('-')[2] || '01'}
                                </div>
                                <div className="min-w-0">
                                  <span className="text-xs font-bold text-white group-hover:text-[#F59E0B] block truncate">
                                    {div.shortName || div.name}
                                  </span>
                                  <span className="text-[10px] text-neutral-400 block truncate">
                                    {div.divisionHead}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Careers Dropdown
                if (link.hasCareersDropdown) {
                  return (
                    <div
                      key={link.id}
                      className="relative"
                      onMouseEnter={() => setCareersDropdownOpen(true)}
                      onMouseLeave={() => setCareersDropdownOpen(false)}
                    >
                      <button
                        onClick={() => handleLinkClick(link.id)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                          isActive
                            ? 'bg-[#2A2A2A] text-[#F59E0B] shadow-inner'
                            : 'text-neutral-200 hover:text-white hover:bg-[#2A2A2A]'
                        }`}
                      >
                        <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{link.label}</span>
                        <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-extrabold px-1.5 py-0.2 rounded border border-emerald-500/30">
                          HIRING
                        </span>
                        <ChevronDown className="w-3 h-3 opacity-70" />
                      </button>

                      {careersDropdownOpen && (
                        <div className="absolute top-full left-0 w-72 bg-[#1C1C1C]/98 border border-neutral-700 rounded-2xl p-3 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50 space-y-1.5">
                          <button
                            onClick={() => handleLinkClick('careers')}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-[#262626] text-xs font-bold text-white flex items-center justify-between group"
                          >
                            <span>Open Engineering Positions</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#F59E0B] group-hover:translate-x-1 transition-transform" />
                          </button>
                          <button
                            onClick={() => {
                              openJobApplication();
                              setCareersDropdownOpen(false);
                            }}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-[#262626] text-xs font-bold text-emerald-400 flex items-center justify-between group"
                          >
                            <span>Fast-Track CV Application</span>
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                          </button>
                          <button
                            onClick={() => {
                              openStaffIntranet();
                              setCareersDropdownOpen(false);
                            }}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-[#262626] text-xs font-bold text-blue-400 flex items-center justify-between group"
                          >
                            <span>Field Staff DPR Desk</span>
                            <ClipboardList className="w-3.5 h-3.5 text-blue-400" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1 ${
                      link.highlight
                        ? 'bg-[#F59E0B] text-[#1C1C1C] font-black shadow-sm hover:bg-[#D97706] hover:text-white hover:scale-105 ml-0.5'
                        : isActive
                        ? 'bg-[#2A2A2A] text-[#F59E0B] shadow-inner font-bold'
                        : 'text-neutral-200 hover:text-white hover:bg-[#2A2A2A]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="bg-amber-500/20 text-[#F59E0B] text-[9px] font-bold px-1.5 py-0.2 rounded border border-amber-500/30">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Quick Action Tools */}
            <div className="hidden sm:flex items-center gap-2">
              
              {/* Materials & Supplies Cart Button */}
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-[#F59E0B] hover:text-[#1C1C1C] text-[#F59E0B] text-xs font-bold border border-amber-500/40 transition-all shadow-sm group"
                title="View Materials & Supplies Cart"
              >
                <ShoppingBag className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>{t('nav_cart', 'Cart')}</span>
                {cartCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-red-600 text-white text-[10px] font-black rounded-full shadow animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Cost Estimator */}
              <button
                onClick={() => setEstimatorModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#262626] hover:bg-[#333333] text-neutral-200 hover:text-[#F59E0B] text-xs font-semibold border border-neutral-700 transition-colors"
                title="Calculate Construction Estimate"
              >
                <Calculator className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span className="hidden 2xl:inline">{t('nav_estimator', 'Estimator')}</span>
              </button>

              {/* Mobile Simulator Toggle */}
              <button
                onClick={() => setMobileMode(!mobileMode)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mobileMode
                    ? 'bg-emerald-500 text-neutral-900 shadow-md'
                    : 'bg-[#262626] text-neutral-300 hover:text-white border border-neutral-700 hover:border-[#F59E0B]'
                }`}
                title="Toggle Simulator Frame"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>{mobileMode ? t('nav_web_view', 'Web View') : t('nav_app_view', 'App View')}</span>
              </button>

              {/* Notification Bell */}
              <button
                onClick={onOpenNotifications}
                className="relative p-2 rounded-lg bg-[#262626] hover:bg-[#333333] text-neutral-300 hover:text-white transition-colors border border-neutral-700"
                title="View Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile / Tablet Menu Hamburger */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="relative p-2 rounded-lg bg-[#262626] text-[#F59E0B] border border-neutral-700"
                title="Materials Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setWebMobileSyncModalOpen(true)}
                className="p-2 rounded-lg bg-[#262626] text-[#F59E0B] border border-neutral-700"
                title="Mobile QR Sync"
              >
                <QrCode className="w-4 h-4" />
              </button>
              
              <button
                onClick={onOpenNotifications}
                className="relative p-2 rounded-lg bg-[#262626] text-neutral-200 border border-neutral-700"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-[#262626] text-white hover:text-[#F59E0B] border border-neutral-700 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile / Tablet Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#181818] border-b border-neutral-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
            
            {/* Mobile Language Switcher */}
            <LanguageSelector variant="mobile" />

            <div className="space-y-1.5">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                    link.highlight
                      ? 'bg-[#F59E0B] text-[#1C1C1C] font-black'
                      : activeTab === link.id
                      ? 'bg-[#2A2A2A] text-[#F59E0B]'
                      : 'text-neutral-200 hover:bg-[#262626]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="bg-amber-500/20 text-[#F59E0B] text-[9px] font-bold px-1.5 py-0.2 rounded border border-amber-500/30">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-800 grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setEstimatorModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#262626] text-[#F59E0B] text-xs font-bold border border-neutral-700"
              >
                <Calculator className="w-4 h-4" />
                <span>{t('nav_estimator', 'Estimate')}</span>
              </button>

              <button
                onClick={() => {
                  openStaffIntranet();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#262626] text-blue-400 text-xs font-bold border border-blue-500/40"
              >
                <ClipboardList className="w-4 h-4" />
                <span>{t('field_dpr_btn', 'DPR Desk')}</span>
              </button>

              <button
                onClick={() => {
                  handleLinkClick('auth');
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#262626] text-emerald-400 text-xs font-bold border border-neutral-700"
              >
                <User className="w-4 h-4" />
                <span>{t('client_portal_btn', 'Portal')}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
