import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import {
  Building2,
  Shield,
  Lock,
  Mail,
  Phone,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  HardHat,
  Fingerprint,
  Layers,
  KeyRound,
  Compass,
  Zap,
  ArrowLeft
} from 'lucide-react';

export function AuthPage() {
  const {
    adminUser,
    customerUser,
    loginAdmin,
    loginCustomer,
    logoutAdmin,
    logoutCustomer,
    navigateTo,
    showToast,
    addNotification
  } = useApp();

  // Mode: 'customer-login' | 'customer-register' | 'admin-login'
  const [authMode, setAuthMode] = useState('customer-login');
  
  // Form inputs
  const [identifier, setIdentifier] = useState(''); // phone or email
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [useOtpMode, setUseOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const maxTilt = 8; // degrees
    setTilt({
      x: -(y / (rect.height / 2)) * maxTilt,
      y: (x / (rect.width / 2)) * maxTilt
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: 'Empty', color: 'bg-neutral-300' };
    let s = 0;
    if (password.length >= 6) s += 1;
    if (password.length >= 10) s += 1;
    if (/[A-Z]/.test(password)) s += 1;
    if (/[0-9]/.test(password)) s += 1;
    if (/[^A-Za-z0-9]/.test(password)) s += 1;

    if (s <= 2) return { score: 33, label: 'Moderate', color: 'bg-[#F59E0B]' };
    if (s <= 4) return { score: 66, label: 'Strong', color: 'bg-blue-600' };
    return { score: 100, label: 'Ultra Secure 3D Encrypted', color: 'bg-emerald-600' };
  };

  const strength = getPasswordStrength();

  // 1. Submit Customer Login
  const handleCustomerLoginSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      showToast('Missing Field', 'Please enter your registered phone or email.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await api.loginCustomer(identifier.trim(), password);
      if (res.success) {
        loginCustomer(res.user);
        addNotification({
          title: 'Client Portal Connected',
          message: `Welcome ${res.user.name}. You can track your projects live.`,
          type: 'success'
        });
        navigateTo('tracker');
      } else {
        showToast('Login Failed', res.message || 'Invalid credentials', 'error');
      }
    } catch (err) {
      showToast('Error', 'Could not authenticate. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 2. Submit Customer Registration
  const handleCustomerRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      showToast('Missing Fields', 'Name and phone number are required.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await api.registerCustomer({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        password
      });

      if (res.success) {
        loginCustomer(res.user);
        showToast('Account Created!', `Welcome to AMK INFRA, ${res.user.name}.`, 'success');
        navigateTo('request');
      } else {
        showToast('Registration Error', res.message, 'error');
      }
    } catch (err) {
      showToast('Error', 'Could not register user.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 3. Submit Admin Login
  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.loginAdmin(identifier || 'admin@amkinfra.com', password || 'amk1234');
      if (res.success) {
        loginAdmin(res.user);
        navigateTo('admin');
      } else {
        showToast('Access Denied', res.message || 'Invalid admin credentials.', 'error');
      }
    } catch (err) {
      showToast('Error', 'Admin authentication failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Demo Fast Login Presets
  const setDemoCustomer = (name, phone, trackId) => {
    setIdentifier(phone);
    setPassword('customer2026');
    showToast('Demo Preset Loaded', `Loaded client ${name} (${phone})`, 'info');
  };

  const setDemoAdmin = () => {
    setAuthMode('admin-login');
    setIdentifier('admin@amkinfra.com');
    setPassword('amk1234');
    showToast('Admin Demo Loaded', 'A. Charan Patel (Managing Director) credentials set.', 'info');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] text-[#1C1C1C] relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      
      {/* 3D Blueprint Grid Canvas Background */}
      <div className="absolute inset-0 blueprint-pattern opacity-10 pointer-events-none" />

      {/* Floating Geometric Meshes */}
      <div className="absolute top-20 right-10 lg:right-32 w-28 h-28 border-2 border-[#F59E0B]/20 rounded-2xl rotate-45 transform animate-float opacity-40 pointer-events-none" />
      <div className="absolute bottom-20 left-10 lg:left-32 w-20 h-20 border border-neutral-300 rounded-xl -rotate-12 transform animate-float opacity-30 pointer-events-none" />

      <div className="max-w-5xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Col: Visual Architectural Showcase */}
        <div className="lg:col-span-5 space-y-6 hidden lg:block">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#F59E0B]/40 text-[#D97706] text-xs font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>SECURE CLIENT & STAFF LOGIN / SIGN IN</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-black font-display tracking-tight text-[#1C1C1C] leading-tight">
              Building Trust &{' '}
              <span className="text-[#D97706]">
                Reliable Services.
              </span>
            </h1>
            <p className="text-[#4B4B4B] text-xs leading-relaxed">
              Access your real-time project milestones, inspect itemized architectural quotations, or log in to the AMK INFRA managing director desk.
            </p>
          </div>

          {/* Isometric Building Card */}
          <div className="relative p-6 rounded-3xl bg-[#FFFFFF] border border-neutral-200 shadow-xl overflow-hidden group">
            <div className="w-full h-44 flex items-center justify-center relative">
              <svg className="w-48 h-40 transform hover:scale-105 transition-transform duration-500" viewBox="0 0 200 160">
                {/* Isometric Base Grid */}
                <polygon points="100,20 180,65 100,110 20,65" fill="#E8E8E5" stroke="#F59E0B" strokeWidth="2" opacity="0.8" />
                <polygon points="100,50 180,95 100,140 20,95" fill="#D4D4D0" stroke="#1C1C1C" strokeWidth="1.5" opacity="0.6" />
                
                {/* Vertical Support Columns */}
                <line x1="100" y1="20" x2="100" y2="140" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="180" y1="65" x2="180" y2="145" stroke="#F59E0B" strokeWidth="1.5" />
                <line x1="20" y1="65" x2="20" y2="145" stroke="#F59E0B" strokeWidth="1.5" />
                
                {/* 3D Modern Top Roof Core */}
                <polygon points="100,10 140,32 100,55 60,32" fill="#F59E0B" opacity="0.9" />
                <polygon points="100,10 140,32 140,45 100,25" fill="#D97706" />
                <polygon points="100,10 60,32 60,45 100,25" fill="#B45309" />
                
                {/* Laser Point nodes */}
                <circle cx="100" cy="10" r="4" fill="#1C1C1C" className="animate-ping" />
                <circle cx="180" cy="65" r="3" fill="#10B981" />
                <circle cx="20" cy="65" r="3" fill="#10B981" />
                <circle cx="100" cy="110" r="3" fill="#10B981" />
              </svg>
            </div>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="text-[#737373] font-semibold">CAD / 3D BIM Live Sync</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping inline-block" />
                Connected
              </span>
            </div>
          </div>

          {/* Quick Demo Credentials Pinned */}
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-neutral-200 shadow-sm space-y-2 text-xs">
            <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wider block">
              1-Click Demo Accounts:
            </span>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('customer-login');
                  setDemoCustomer('Suresh Reddy', '9848022334', 'AMK-2026-1042');
                }}
                className="text-left px-3 py-1.5 rounded-xl bg-[#F5F5F3] hover:bg-[#E8E8E5] text-[#1C1C1C] transition-colors flex items-center justify-between"
              >
                <span>👤 Suresh Reddy (Hunter Road Villa)</span>
                <span className="text-[#D97706] text-[10px] font-bold">Use Login &rarr;</span>
              </button>

              <button
                type="button"
                onClick={setDemoAdmin}
                className="text-left px-3 py-1.5 rounded-xl bg-[#F59E0B]/10 hover:bg-[#F59E0B]/20 text-[#1C1C1C] border border-[#F59E0B]/30 transition-colors flex items-center justify-between"
              >
                <span>🛡️ A. Charan Patel (Managing Director)</span>
                <span className="text-[#D97706] text-[10px] font-bold">Admin Portal &rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Parallax Glassmorphic Card */}
        <div
          className="lg:col-span-7"
          style={{ perspective: '1000px' }}
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="relative bg-[#FFFFFF] border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6"
          >
            
            {/* Top Logo & Portal Switcher */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white p-0.5 flex items-center justify-center border border-amber-500/50 shadow-md overflow-hidden shrink-0">
                  <img
                    src="/assets/logo.png"
                    alt="AMK INFRA Emblem"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="font-display font-black text-xl text-[#1C1C1C]">
                    AMK <span className="text-[#D97706]">INFRA</span>
                  </h2>
                  <p className="text-[10px] text-[#737373] font-semibold tracking-wider uppercase">
                    Client &amp; Staff Secure Portal
                  </p>
                </div>
              </div>

              {/* Portal Mode Tabs (Customer vs Admin) */}
              <div className="flex p-1 bg-[#F5F5F3] rounded-2xl border border-neutral-200 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('customer-login');
                    setIdentifier('');
                    setPassword('');
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    authMode === 'customer-login' || authMode === 'customer-register'
                      ? 'bg-[#F59E0B] text-[#1C1C1C] shadow-sm'
                      : 'text-[#737373] hover:text-[#1C1C1C]'
                  }`}
                >
                  Client Portal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('admin-login');
                    setIdentifier('admin@amkinfra.com');
                    setPassword('amk1234');
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    authMode === 'admin-login'
                      ? 'bg-[#F59E0B] text-[#1C1C1C] shadow-sm'
                      : 'text-[#737373] hover:text-[#1C1C1C]'
                  }`}
                >
                  Staff / Admin
                </button>
              </div>
            </div>

            {/* Sub-Header Title */}
            <div>
              <h3 className="text-2xl font-bold text-[#1C1C1C] font-display">
                {authMode === 'customer-login'
                  ? 'Login / Sign In to Client Portal'
                  : authMode === 'customer-register'
                  ? 'Create New Client Account'
                  : 'Staff & Managing Director Sign In'}
              </h3>
              <p className="text-xs text-[#737373] mt-0.5">
                {authMode === 'customer-login'
                  ? 'Track your project status, review BOQ quotes, and chat with your engineer.'
                  : authMode === 'customer-register'
                  ? 'Register with your phone number to manage all inquiries under one roof.'
                  : 'Managing Director A. Charan Patel & Civil Site Leads.'}
              </p>
            </div>

            {/* FORM: Customer Login */}
            {authMode === 'customer-login' && (
              <form onSubmit={handleCustomerLoginSubmit} className="space-y-4 text-xs animate-in fade-in duration-200">
                <div>
                  <label className="block font-bold text-[#1C1C1C] mb-1.5">
                    Phone Number or Registered Email *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#737373]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. 9848022334 or client@amkinfra.com"
                      value={identifier}
                      onChange={e => setIdentifier(e.target.value)}
                      className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl pl-10 pr-4 py-3 text-[#1C1C1C] outline-none"
                    />
                  </div>
                </div>

                {!useOtpMode ? (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="font-bold text-[#1C1C1C]">Password / Access Code</label>
                      <button
                        type="button"
                        onClick={() => setUseOtpMode(true)}
                        className="text-[11px] text-[#D97706] hover:underline font-semibold"
                      >
                        Use Instant WhatsApp OTP instead
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#737373]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl pl-10 pr-10 py-3 text-[#1C1C1C] outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-[#737373] hover:text-[#1C1C1C]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="font-bold text-[#1C1C1C]">Instant WhatsApp / SMS OTP</label>
                      <button
                        type="button"
                        onClick={() => setUseOtpMode(false)}
                        className="text-[11px] text-[#D97706] hover:underline font-semibold"
                      >
                        Use Password instead
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter 4-digit code (e.g. 2026)"
                        value={otpCode}
                        onChange={e => setOtpCode(e.target.value)}
                        className="flex-1 bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl px-4 py-3 text-[#1C1C1C] font-mono text-center tracking-widest outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(true);
                          setOtpCode('2026');
                          showToast('OTP Dispatched', 'Simulated OTP [2026] prefilled for demo.', 'success');
                        }}
                        className="px-4 py-3 rounded-xl bg-[#F5F5F3] hover:bg-[#E8E8E5] text-[#D97706] font-bold border border-neutral-200"
                      >
                        {otpSent ? 'Resend' : 'Send Code'}
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-[#737373]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="rounded bg-[#F5F5F3] border-neutral-300 text-[#F59E0B] focus:ring-0"
                    />
                    <span>Remember this session</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => navigateTo('tracker')}
                    className="text-[#D97706] hover:underline font-semibold"
                  >
                    Track by ID only &rarr;
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{loading ? 'Authenticating...' : 'Login / Sign In'}</span>
                </button>

                <div className="text-center pt-2 text-[#737373]">
                  Don't have a client account yet?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('customer-register')}
                    className="text-[#D97706] font-bold hover:underline"
                  >
                    Register here
                  </button>
                </div>
              </form>
            )}

            {/* FORM: Customer Register */}
            {authMode === 'customer-register' && (
              <form onSubmit={handleCustomerRegisterSubmit} className="space-y-4 text-xs animate-in fade-in duration-200">
                <div>
                  <label className="block font-bold text-[#1C1C1C] mb-1.5">Your Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-[#737373]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl pl-10 pr-4 py-3 text-[#1C1C1C] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#1C1C1C] mb-1.5">WhatsApp Mobile No. *</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#737373]" />
                      <input
                        type="tel"
                        required
                        placeholder="98XXXXXXXX"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl pl-10 pr-4 py-3 text-[#1C1C1C] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#1C1C1C] mb-1.5">Email Address (Optional)</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#737373]" />
                      <input
                        type="email"
                        placeholder="client@gmail.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl pl-10 pr-4 py-3 text-[#1C1C1C] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#1C1C1C] mb-1.5">Create Secure Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#737373]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Min 6 characters"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl pl-10 pr-10 py-3 text-[#1C1C1C] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-[#737373] hover:text-[#1C1C1C]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  {password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-[10px] text-[#737373]">
                        <span>Security Level:</span>
                        <span className="font-bold text-[#1C1C1C]">{strength.label}</span>
                      </div>
                      <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${strength.color}`}
                          style={{ width: `${strength.score}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{loading ? 'Creating Account...' : 'Complete Registration & Enter'}</span>
                </button>

                <div className="text-center pt-2 text-[#737373]">
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('customer-login')}
                    className="text-[#D97706] font-bold hover:underline"
                  >
                    Sign in here
                  </button>
                </div>
              </form>
            )}

            {/* FORM: Admin & Staff Login */}
            {authMode === 'admin-login' && (
              <form onSubmit={handleAdminLoginSubmit} className="space-y-4 text-xs animate-in fade-in duration-200">
                <div className="p-3.5 bg-[#F59E0B]/10 rounded-2xl border border-[#F59E0B]/30 flex items-center gap-3 text-[#1C1C1C]">
                  <Shield className="w-5 h-5 flex-shrink-0 text-[#D97706]" />
                  <span>
                    Protected Managing Director & Staff Area for <strong>A. Charan Patel</strong>.
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-[#1C1C1C] mb-1.5">Staff Email / ID *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#737373]" />
                    <input
                      type="text"
                      required
                      placeholder="admin@amkinfra.com"
                      value={identifier}
                      onChange={e => setIdentifier(e.target.value)}
                      className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl pl-10 pr-4 py-3 text-[#1C1C1C] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#1C1C1C] mb-1.5">Staff Master Key *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#737373]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl pl-10 pr-10 py-3 text-[#1C1C1C] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-[#737373] hover:text-[#1C1C1C]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIdentifier('admin@amkinfra.com');
                      setPassword('amk1234');
                      showToast('Credentials Filled', 'admin@amkinfra.com / amk1234', 'info');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#F5F5F3] hover:bg-[#E8E8E5] text-[#D97706] font-bold text-[11px] border border-neutral-200"
                  >
                    Prefill Demo Credentials
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>{loading ? 'Verifying Key...' : 'Sign In as Managing Director'}</span>
                </button>
              </form>
            )}

            {/* Bottom 2FA & Security Badge */}
            <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[10px] text-[#737373]">
              <span className="flex items-center gap-1">
                <Fingerprint className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted Access</span>
              </span>
              <span>AMK INFRA Warangal HQ</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
