import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import { ProductDetailModal } from './ProductDetailModal';
import { CartDrawer } from './CartDrawer';
import { CheckoutModal } from './CheckoutModal';
import {
  ShoppingBag,
  Search,
  Filter,
  Layers,
  Sparkles,
  ShieldCheck,
  Truck,
  Star,
  Plus,
  Zap,
  Eye,
  CheckCircle2,
  Tag,
  Phone,
  MessageSquare,
  ArrowRight,
  SlidersHorizontal,
  ChevronRight,
  PackageCheck,
  Droplets,
  Grid,
  Box,
  Building2,
  Paintbrush,
  Hammer
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Products', icon: Layers, countLabel: '30 Real Items' },
  { id: 'ceiling', label: 'Ceiling', icon: Box, countLabel: 'Gypsum, POP, Fluted & Panels' },
  { id: 'wall-paneling', label: 'Wall Paneling', icon: Grid, countLabel: 'Polygranite, WPC, Putty & Paint' },
  { id: 'flooring', label: 'Flooring', icon: Sparkles, countLabel: 'Kajaria Tiles, Italian Marble, Granite' },
  { id: 'electrical', label: 'Electrical', icon: Zap, countLabel: 'Copper Wiring, MCB Boards, Switches' },
  { id: 'cctv', label: 'CCTV & Security', icon: ShieldCheck, countLabel: 'DVR, NVR, 4G, Solar & Wired Cams' },
  { id: 'plumbing', label: 'Plumbing', icon: Droplets, countLabel: 'Sinks, Taps, Pipes, Commodes' }
];

const CATEGORY_BANNERS = {
  all: {
    title: 'Real Market Price Building Supplies & Security Hub',
    desc: 'Direct factory & distributor procurement for Ceiling, Wall Paneling, Flooring, Electrical, CCTV Surveillance, and Plumbing across Telangana. 100% genuine products with transparent market pricing.'
  },
  ceiling: {
    title: 'Ceiling Materials: Gypsum, POP, Waterproof PVC & GI Framing',
    desc: 'Saint-Gobain Gyproc false ceiling boards, Sakarni super-fine POP bags, 100% waterproof PVC fluted ceiling panels, Aerolite mineral acoustic tiles, and heavy-gauge galvanized iron channels.'
  },
  'wall-paneling': {
    title: 'Wall Paneling: WPC Fluted Louvers, Polygranite & Putty',
    desc: 'Exterior/interior heavy-duty WPC fluted louvers, 8x4ft high-gloss Polygranite marble sheets, Italian Statuario acrylic panels, and Birla White putty paired with Asian Paints Royale.'
  },
  flooring: {
    title: 'Flooring: Kajaria Vitrified Tiles, Italian Marble & Black Galaxy Granite',
    desc: 'Kajaria 600x1200mm double-charge vitrified floor tiles, authentic imported Italian Statuario/Botticino marble slabs, and 18mm high-gloss South Indian Black Galaxy granite.'
  },
  electrical: {
    title: 'Electrical: Pure Copper Wires, Power Distribution & Modular Switches',
    desc: 'Polycab 99.97% bright annealed copper FRLS house wiring, Schneider Electric IP43 SPN distribution MCB boards, and Legrand Mylinc modular switches and child-safe shuttered sockets.'
  },
  cctv: {
    title: 'CCTV Security: DVR, 4K NVR, Wired (4 to 64 Ch), 4G SIM & Solar Cameras',
    desc: 'Hikvision & CP PLUS 5MP/4K Turbo HD DVRs, 16-Ch PoE NVRs, wired commercial camera packages (4, 8, 16, 32 & 64 Channels), 360° 4G SIM Wi-Fi cameras, standalone solar PTZ cams, and office counter audio cameras.'
  },
  plumbing: {
    title: 'Plumbing & Sanitary: Sinks, Brass Taps, CPVC/HDPE Pipes & Commodes',
    desc: 'Franke/Nirali 304 SS & Quartz kitchen sinks, Jaquar single-lever brass mixers, Astral CPVC / Finolex UPVC / Supreme HDPE pressure pipes, and Hindware rimless wall-hung soft-close western toilets.'
  }
};

export function StorePage() {
  const {
    cart,
    addToCart,
    cartCount,
    cartDrawerOpen,
    setCartDrawerOpen,
    checkoutModalOpen,
    setCheckoutModalOpen,
    selectedStoreCategory,
    setSelectedStoreCategory,
    showToast,
    navigateTo,
    divisions,
    t
  } = useApp();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(selectedStoreCategory || 'all');
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Modals
  const [selectedProductForDetail, setSelectedProductForDetail] = useState(null);
  const [directCheckoutItem, setDirectCheckoutItem] = useState(null);

  // Sync when selectedStoreCategory changes from external navigation
  useEffect(() => {
    if (selectedStoreCategory && selectedStoreCategory !== activeCategory) {
      setActiveCategory(selectedStoreCategory);
    }
  }, [selectedStoreCategory]);

  useEffect(() => {
    loadProducts();
  }, [activeCategory, selectedDivision, sortBy, onlyInStock]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (setSelectedStoreCategory) {
      setSelectedStoreCategory(catId);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (activeCategory !== 'all') params.category = activeCategory;
      if (selectedDivision !== 'all') params.division = selectedDivision;
      if (onlyInStock) params.inStock = 'true';
      if (sortBy !== 'featured') params.sort = sortBy;
      if (searchQuery) params.search = searchQuery;

      const res = await api.getProducts(params);
      if (res.success) {
        setProducts(res.data);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadProducts();
  };

  const handleQuickBuy = (product, quantity = 1) => {
    setDirectCheckoutItem({
      ...product,
      quantity: quantity || product.minOrderQty || 1
    });
    setCheckoutModalOpen(true);
  };

  const currentBanner = CATEGORY_BANNERS[activeCategory] || CATEGORY_BANNERS.all;

  return (
    <div className="py-10 bg-[#F5F5F3] text-[#1C1C1C] min-h-screen">
      
      {/* Top Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#141414] via-[#1C1C1C] to-[#262626] text-white p-8 sm:p-12 border border-neutral-800 shadow-2xl">
          
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F59E0B]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-[#F59E0B] text-xs font-extrabold border border-amber-500/40 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AMK Building Supplies &bull; Factory Procurement</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight">
              {currentBanner.title}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
              {currentBanner.desc}
            </p>

            {/* Value Highlights */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 bg-neutral-900/80 px-3.5 py-2 rounded-xl border border-neutral-800">
                <Truck className="w-4 h-4 text-[#F59E0B]" />
                <span className="font-semibold text-white">Express 24h Site Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-900/80 px-3.5 py-2 rounded-xl border border-neutral-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">100% Genuine NABL Tested</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-900/80 px-3.5 py-2 rounded-xl border border-neutral-800">
                <Tag className="w-4 h-4 text-[#F59E0B]" />
                <span className="font-semibold text-white">Contractor Bulk Discounts</span>
              </div>
            </div>
          </div>

          {/* Quick Action Hotline Button */}
          <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2">
            <a
              href="https://wa.me/919032477292?text=Hello%20AMK%20INFRA%2C%20I%20need%20a%20bulk%20materials%2C%20tiles%2C%20cardboards%2C%20and%20pipelines%20quote%20for%20my%20site."
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Direct Bulk BOQ WhatsApp</span>
            </a>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Selector Tabs with Visual Icons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2.5 shadow-sm ${
                  isActive
                    ? 'bg-[#1C1C1C] text-[#F59E0B] shadow-md border border-[#F59E0B]/60 scale-102'
                    : 'bg-[#FFFFFF] text-[#4B4B4B] border border-neutral-200 hover:bg-neutral-100 hover:text-[#1C1C1C]'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#F59E0B]' : 'text-neutral-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#FFFFFF] p-4 sm:p-5 rounded-3xl border border-neutral-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#737373]" />
            <input
              type="text"
              placeholder="Search Kajaria tiles, Jaquar taps, floor protection cardboards, HDPE pipelines, cement, TMT steel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-24 py-2.5 rounded-2xl bg-[#F5F5F3] border border-neutral-300 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#F59E0B]"
            />
            <button
              type="submit"
              className="absolute right-2 top-1.5 px-3 py-1.5 rounded-xl bg-[#F59E0B] text-[#1C1C1C] text-xs font-bold hover:bg-[#D97706] transition-colors"
            >
              Search
            </button>
          </form>

          {/* Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            
            {/* Division Filter */}
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#F59E0B]" />
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#F5F5F3] border border-neutral-300 text-xs text-[#1C1C1C] font-semibold focus:outline-none"
              >
                <option value="all">All 7 Corporate Wings</option>
                <option value="civil-commercial">Civil Infrastructure</option>
                <option value="residential-villas">Residential & Villas</option>
                <option value="infrastructure-public">Heavy Roads & Canals</option>
                <option value="interiors-turnkey">Interiors & Turnkey</option>
                <option value="electrical-smart">Electrical & Smart Grid</option>
                <option value="surface-paint">Surface Protection & Paint</option>
              </select>
            </div>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#F5F5F3] border border-neutral-300 text-xs text-[#1C1C1C] font-semibold focus:outline-none"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* In Stock Only Check */}
            <label className="flex items-center gap-1.5 cursor-pointer select-none text-neutral-700 font-semibold px-2">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded text-[#F59E0B] focus:ring-[#F59E0B]"
              />
              <span>In Stock Only</span>
            </label>

          </div>

        </div>

        {/* Products Count Indicator */}
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>
            Showing <strong className="text-[#1C1C1C]">{products.length}</strong> construction items &amp; pipeline supplies
          </span>
          <span className="hidden sm:inline-block">
            Prices inclusive of GST &bull; Transit insurance included
          </span>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-neutral-600">Loading catalog items &amp; current stock...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-neutral-200 p-8 space-y-4">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-[#F59E0B]">
              <PackageCheck className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-neutral-800">No items match your criteria</h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              Try switching categories or clearing search filters. For custom items or bulk factory indenting, call our procurement desk.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedDivision('all');
                setSearchQuery('');
                setOnlyInStock(false);
              }}
              className="px-5 py-2 rounded-xl bg-[#1C1C1C] text-[#F59E0B] text-xs font-bold hover:bg-neutral-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              return (
                <div
                  key={product.id}
                  className="bg-[#FFFFFF] rounded-3xl border border-neutral-200/80 p-5 flex flex-col justify-between space-y-4 hover:shadow-xl hover:border-[#F59E0B]/50 transition-all duration-300 group"
                >
                  
                  {/* Image & Badges */}
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/60">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                      {product.badge && (
                        <span className="px-2.5 py-0.5 rounded-lg bg-[#F59E0B] text-[#1C1C1C] text-[10px] font-black shadow-sm">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[9px] font-bold uppercase text-white tracking-wider">
                      {product.categoryLabel || product.category}
                    </span>

                    {/* Quick View Button */}
                    <button
                      onClick={() => setSelectedProductForDetail(product)}
                      className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Specifications</span>
                    </button>
                  </div>

                  {/* Body Details */}
                  <div className="space-y-2 flex-1">
                    
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#D97706] font-bold uppercase tracking-wider">
                        {product.brand}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold text-[#1C1C1C]">{product.rating}</span>
                        <span className="text-neutral-400 text-[10px]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => setSelectedProductForDetail(product)}
                      className="font-bold text-sm text-[#1C1C1C] line-clamp-2 leading-snug hover:text-[#D97706] cursor-pointer transition-colors"
                    >
                      {product.name}
                    </h3>

                    <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Key Specs Pills */}
                    {product.specifications && product.specifications.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {product.specifications.slice(0, 2).map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[10px] font-medium border border-neutral-200 truncate max-w-full"
                          >
                            {spec.key}: <strong>{spec.value}</strong>
                          </span>
                        ))}
                      </div>
                    )}

                  </div>

                  {/* Pricing and Actions */}
                  <div className="pt-3 border-t border-neutral-100 space-y-3">
                    
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xl font-black text-[#1C1C1C] font-display">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-neutral-500 ml-1">
                          /{product.unit}
                        </span>
                      </div>

                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs text-neutral-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Contractor Discount Note */}
                    {product.contractorDiscount && (
                      <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                        <Tag className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{product.contractorDiscount}</span>
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => addToCart(product, product.minOrderQty || 1)}
                        className="py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-[#1C1C1C] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-neutral-300"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>Add to Cart</span>
                      </button>

                      <button
                        onClick={() => handleQuickBuy(product)}
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
        )}

      </div>

      {/* Floating Cart Button (Mobile & Desktop) */}
      {cartCount > 0 && (
        <button
          onClick={() => setCartDrawerOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-5 py-3.5 rounded-full bg-[#1C1C1C] text-[#F59E0B] border-2 border-[#F59E0B] shadow-2xl flex items-center gap-3 transition-transform hover:scale-105"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#F59E0B]" />
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#F59E0B] text-[#1C1C1C] text-[10px] font-black flex items-center justify-center">
              {cartCount}
            </span>
          </div>
          <span className="text-xs font-extrabold text-white">View Site Cart ({cartCount})</span>
        </button>
      )}

      {/* Product Detail Modal */}
      {selectedProductForDetail && (
        <ProductDetailModal
          product={selectedProductForDetail}
          onClose={() => setSelectedProductForDetail(null)}
          onAddToCart={(product, qty) => {
            addToCart(product, qty);
            setSelectedProductForDetail(null);
          }}
          onBuyNow={(product, qty) => {
            setSelectedProductForDetail(null);
            handleQuickBuy(product, qty);
          }}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Checkout Modal */}
      <CheckoutModal directItem={directCheckoutItem} />

    </div>
  );
}
