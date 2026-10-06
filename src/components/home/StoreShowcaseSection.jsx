import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Tag,
  Star,
  Zap,
  ArrowRight,
  Sparkles,
  Layers,
  Droplets,
  Grid,
  Box,
  Building2,
  Paintbrush,
  Hammer,
  Lock,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

const STORE_CATEGORY_PREVIEWS = [
  {
    id: 'ceiling',
    title: 'Ceiling',
    desc: 'Gypsum, POP, Fluted & Panels',
    icon: Box,
    badge: 'Fire Rated',
    color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400'
  },
  {
    id: 'wall-paneling',
    title: 'Wall Paneling',
    desc: 'WPC Louvers, Polygranite & Putty',
    icon: Grid,
    badge: '100% Waterproof',
    color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400'
  },
  {
    id: 'flooring',
    title: 'Flooring',
    desc: 'Kajaria Tiles, Italian Marble, Granite',
    icon: Sparkles,
    badge: 'Book-Match Slabs',
    color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400'
  },
  {
    id: 'electrical',
    title: 'Electrical',
    desc: 'Polycab Wire, MCB Boards & Switches',
    icon: Zap,
    badge: '100% Pure Copper',
    color: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400'
  },
  {
    id: 'cctv',
    title: 'CCTV Security',
    desc: 'DVR, NVR, Wired (4-64Ch), Solar & 4G',
    icon: ShieldCheck,
    badge: 'AI Smart Detect',
    color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400'
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    desc: 'SS Sinks, Jaquar Taps, Pipes & EWCs',
    icon: Droplets,
    badge: '10-Yr Warranty',
    color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400'
  }
];

export function StoreShowcaseSection() {
  const { navigateTo, addToCart } = useApp();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await api.getProducts({ featured: 'true' });
        if (res.success) {
          setFeaturedProducts((res.data || []).slice(0, 8));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <section className="py-20 bg-[#161616] text-white relative overflow-hidden border-t border-b border-neutral-800">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-[#F59E0B] text-xs font-extrabold border border-amber-500/30 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Material &amp; Construction Supplies Hub</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              Procure Pipelines, Tiles, Cardboards, Taps &amp; Heavy Materials
            </h2>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Order genuine building materials directly to your site across Telangana. Tested to NABL standards with same-day loading, contractor bulk discounts, and 24h express transit.
            </p>
          </div>

          <button
            onClick={() => navigateTo('store', { category: 'all' })}
            className="px-6 py-3.5 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] text-xs font-black flex items-center gap-2 transition-transform hover:scale-105 shadow-xl shadow-amber-500/20 shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore Full Supplies Store</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 8 Category Shortcut Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {STORE_CATEGORY_PREVIEWS.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => navigateTo('store', { category: cat.id })}
                className="p-3.5 rounded-2xl bg-[#1F1F1F] border border-neutral-800 hover:border-amber-500/50 hover:bg-[#262626] transition-all flex flex-col items-center text-center space-y-2 group shadow-md"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center border group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-white block group-hover:text-[#F59E0B] transition-colors leading-tight">
                    {cat.title}
                  </span>
                  <span className="text-[9px] text-neutral-400 block truncate">
                    {cat.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured Products Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Contractor Top Picks • Ready for Site Transit</span>
            </h3>
            <span className="text-xs text-neutral-400">
              Direct Factory Invoicing &amp; Mill Certificates
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="bg-[#202020] rounded-3xl border border-neutral-700/80 p-5 flex flex-col justify-between space-y-4 hover:border-amber-500/60 transition-all duration-300 group shadow-lg"
                >
                  
                  {/* Image */}
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-[#F59E0B] text-[#1C1C1C] text-[10px] font-black shadow-md">
                        {product.badge}
                      </span>
                    )}
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[9px] font-bold uppercase text-white">
                      {product.categoryLabel || product.category}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#F59E0B] font-bold uppercase tracking-wider">
                        {product.brand}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-bold">{product.rating}</span>
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-white line-clamp-2 leading-snug group-hover:text-[#F59E0B] transition-colors">
                      {product.name}
                    </h4>

                    <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-3 border-t border-neutral-700/60 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xl font-black text-[#F59E0B] font-display">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-neutral-400 ml-1">
                          /{product.unit}
                        </span>
                      </div>

                      <span className="text-[10px] text-emerald-400 font-semibold">
                        ● In Stock
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => addToCart(product, product.minOrderQty || 1)}
                        className="py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-neutral-700"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>Add to Cart</span>
                      </button>

                      <button
                        onClick={() => {
                          addToCart(product, product.minOrderQty || 1);
                          navigateTo('store', { category: product.category });
                        }}
                        className="py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] text-xs font-black flex items-center justify-center gap-1 transition-colors shadow-sm"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>Order Now</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Live Dispatch Ticker */}
        <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-neutral-300">
              Live Fleet Dispatches: 150x Kajaria Vitrified Tiles &bull; 40x Supreme HDPE Pipes &bull; 8 Rolls 300 GSM Floor Shield Cardboards in Transit.
            </span>
          </div>

          <button
            onClick={() => navigateTo('tracker')}
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 whitespace-nowrap"
          >
            <span>Track Live Site Consignment</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </section>
  );
}
