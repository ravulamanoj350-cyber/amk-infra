import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Handshake,
  Lightbulb,
  Award,
  ArrowUpRight,
  MessageSquare,
  ChevronRight,
  Layers,
  Smartphone,
  QrCode,
  Briefcase,
  FileText,
  ClipboardList
} from 'lucide-react';

export function Footer() {
  const {
    navigateTo,
    setEstimatorModalOpen,
    setWebMobileSyncModalOpen,
    openJobApplication,
    openStaffIntranet,
    services,
    divisions,
    t
  } = useApp();

  return (
    <footer className="bg-[#141414] text-[#A8A8A2] border-t border-neutral-800 pt-16 pb-8 backdrop-blur-xl relative">
      {/* Top Hazard Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 hazard-stripes-subtle" />

      {/* Value Badges Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#1C1C1C] p-6 rounded-2xl border border-neutral-800 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">0.00 LTI Safety</h4>
              <p className="text-xs text-[#737373]">{t('stat_safety_sub', '1.28M Safe Man-Hours')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#F59E0B] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Quality Certified</h4>
              <p className="text-xs text-[#737373]">ISO 9001:2015 Standards</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Lab Tested Materials</h4>
              <p className="text-xs text-[#737373]">{t('check_nabl_tested', 'NABL Tested Concrete')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#F59E0B] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">{t('wings_count', '7 Corporate Wings')}</h4>
              <p className="text-xs text-[#737373]">Dedicated Chief Engineers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Col 1: About & Founder */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center shadow-lg border border-amber-500/50 overflow-hidden shrink-0">
                <img
                  src="/assets/logo.png"
                  alt="AMK INFRA Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-display font-extrabold text-2xl text-white tracking-wide">
                  AMK <span className="text-[#F59E0B]">INFRA</span>
                </span>
                <p className="text-xs text-[#F59E0B] font-semibold tracking-wider uppercase">
                  {t('tagline', 'Building Better Spaces, Reliable Services')}
                </p>
              </div>
            </div>

            <p className="text-[#A8A8A2] text-sm leading-relaxed pr-4">
              {t('hero_bio', "AMK INFRA is Telangana's premier civil infrastructure and construction conglomerate. Structured into 7 specialized corporate divisions, we deliver high-rise commercial structures, custom luxury villas, heavy urban roadways, turnkey interiors, and 4K security grids under Founder & MD A. Charan Patel.")}
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href="https://wa.me/919032477292?text=Hello%20AMK%20INFRA%2C%20I%20would%20like%20to%20consult%20on%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-md"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href="tel:9032477292"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#262626] hover:bg-[#333333] text-white text-xs font-bold transition-colors border border-neutral-700"
              >
                <Phone className="w-4 h-4 text-[#F59E0B]" />
                <span>Call 9032477292</span>
              </a>

              <button
                onClick={() => setWebMobileSyncModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-[#F59E0B] hover:text-[#1C1C1C] text-[#F59E0B] text-xs font-bold transition-all border border-amber-500/30"
              >
                <QrCode className="w-4 h-4" />
                <span>Mobile App Sync</span>
              </button>
            </div>
          </div>

          {/* Col 2: Corporate Divisions */}
          <div>
            <h3 className="text-white font-display font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
              Corporate Wings
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A8A8A2]">
              {(divisions || []).map(d => (
                <li key={d.id}>
                  <button
                    onClick={() => navigateTo('divisions', { divisionId: d.id })}
                    className="hover:text-[#F59E0B] flex items-center gap-1.5 transition-colors text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-[#F59E0B] flex-shrink-0" />
                    <span>{d.shortName || d.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: For Clients & Staff */}
          <div>
            <h3 className="text-white font-display font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Clients & Careers
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A8A8A2]">
              <li>
                <button onClick={() => navigateTo('store')} className="text-[#F59E0B] font-bold hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse"></span>
                  <span>Materials &amp; Pipeline Store (Buy Online)</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('divisions')} className="text-white font-bold hover:text-[#F59E0B] transition-colors flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>7 Specialized Divisions</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('careers')} className="text-emerald-400 font-bold hover:underline flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Careers (We're Hiring!)</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('safety-quality')} className="hover:text-[#F59E0B] transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Safety & NABL Quality Lab</span>
                </button>
              </li>
              <li>
                <button onClick={openStaffIntranet} className="hover:text-blue-300 text-blue-400 font-semibold transition-colors flex items-center gap-1.5">
                  <ClipboardList className="w-3.5 h-3.5" />
                  <span>Field Staff DPR Desk</span>
                </button>
              </li>
              <li>
                <button onClick={() => setEstimatorModalOpen(true)} className="hover:text-[#F59E0B] transition-colors">
                  Cost Estimator Calculator
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tracker')} className="hover:text-[#F59E0B] transition-colors">
                  Live Project Status Tracker
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="text-[#737373] hover:text-white transition-colors">
                  Executive Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Coverage */}
          <div>
            <h3 className="text-white font-display font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
              Headquarters
            </h3>
            <div className="space-y-3 text-xs text-[#A8A8A2]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                <span>
                  Opp. Collectorate Office, Subedari, Hanamkonda, Warangal, Telangana - 506001
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                <a href="tel:9032477292" className="text-white font-bold hover:text-[#F59E0B]">
                  +91 90324 77292
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                <a href="mailto:contact@amkinfra.com" className="hover:text-white">
                  contact@amkinfra.com
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                <span>
                  Mon - Sat: 8:30 AM - 8:00 PM<br />Sun: 10:00 AM - 4:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Coverage Tags */}
        <div className="py-6 border-b border-neutral-800/80 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#737373] font-semibold">Service Coverage:</span>
          {['Hanamkonda', 'Warangal Urban', 'Kazipet', 'Subedari', 'Nakkalagutta', 'Balasamudram', 'Waddepally', 'Hunter Road', 'Kakatiya Industrial Area', 'Narsampet', 'Jangaon', 'Hyderabad'].map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded-full bg-[#1C1C1C] text-neutral-300 text-[11px] border border-neutral-800">
              {tag}
            </span>
          ))}
        </div>

        {/* Copyright & Sign-off */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737373]">
          <p>© {new Date().getFullYear()} AMK INFRA. All Rights Reserved. Founder & Director: A. Charan Patel.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('divisions')} className="hover:text-neutral-300">7 Specialized Wings</button>
            <span>•</span>
            <button onClick={() => navigateTo('safety-quality')} className="hover:text-neutral-300">ISO 9001 / ISO 45001</button>
            <span>•</span>
            <button onClick={() => navigateTo('careers')} className="text-emerald-400 hover:underline font-medium">Careers</button>
            <span>•</span>
            <button onClick={() => navigateTo('admin')} className="text-[#F59E0B] hover:underline font-medium">Staff Portal</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
