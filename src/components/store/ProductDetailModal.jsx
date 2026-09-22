import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Check,
  ShieldCheck,
  Truck,
  Award,
  ShoppingCart,
  Zap,
  Star,
  Layers,
  FileText,
  BadgePercent,
  Phone,
  MessageSquare
} from 'lucide-react';

export function ProductDetailModal({ product, isOpen, onClose, onBuyNow }) {
  const { addToCart, t } = useApp();
  const [qty, setQty] = useState(product?.minOrderQty || 1);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product, qty);
    onClose();
  };

  const handleDirectBuy = () => {
    if (onBuyNow) {
      onBuyNow(product, qty);
    }
    onClose();
  };

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  const savingsPercent = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#1C1C1C] text-neutral-100 rounded-3xl border border-neutral-700 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-[#161616]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-[#F59E0B] text-xs font-extrabold border border-amber-500/40 uppercase tracking-wider">
              {product.categoryLabel || product.category}
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              SKU: {product.sku || product.id}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Image & Trust Badges */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-900 aspect-4/3 group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#F59E0B] text-[#1C1C1C] text-xs font-black shadow-lg">
                    {product.badge}
                  </span>
                )}
                {savingsPercent > 0 && (
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-lg">
                    {savingsPercent}% OFF
                  </span>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Genuine Tested</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>Express 24h Site Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Details */}
            <div className="space-y-4">
              <div>
                <span className="text-xs text-[#F59E0B] font-bold tracking-wider uppercase">
                  {product.brand}
                </span>
                <h2 className="text-xl font-bold font-display text-white mt-1 leading-snug">
                  {product.name}
                </h2>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold">{product.rating}</span>
                  </div>
                  <span className="text-xs text-neutral-400">
                    ({product.reviewsCount} Contractor Reviews)
                  </span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-xs text-emerald-400 font-semibold">
                    ● In Stock ({product.inStock} {product.unit})
                  </span>
                </div>
              </div>

              {/* Price Display */}
              <div className="p-4 rounded-2xl bg-[#242424] border border-neutral-700 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#F59E0B] font-display">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-neutral-400">
                      /{product.unit}
                    </span>
                  </div>
                  {product.originalPrice && (
                    <div className="text-xs text-neutral-400 line-through mt-0.5">
                      MRP ₹{product.originalPrice.toLocaleString('en-IN')}
                    </div>
                  )}
                </div>

                {savings > 0 && (
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                    Save ₹{savings.toLocaleString('en-IN')} / unit
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-300 leading-relaxed">
                {product.description}
              </p>

              {/* Contractor Bulk Discount Banner */}
              {product.contractorDiscount && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
                  <BadgePercent className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-[#F59E0B] font-bold">Contractor Bulk Tier: </strong>
                    <span className="text-neutral-300">{product.contractorDiscount}</span>
                  </div>
                </div>
              )}

              {/* Corporate Division Alignment */}
              <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Procured under: <strong className="text-neutral-200">{product.divisionName}</strong></span>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#F59E0B]" />
                <span>Technical Specifications & Lab Standards</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.specifications.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#242424] border border-neutral-800 text-xs"
                  >
                    <span className="text-neutral-400 font-medium">{spec.key}</span>
                    <span className="text-white font-semibold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Actions Bar */}
          <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs text-neutral-400 font-semibold whitespace-nowrap">Quantity:</span>
              <div className="flex items-center border border-neutral-700 bg-neutral-900 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(product.minOrderQty || 1, qty - 1))}
                  className="px-3 py-1.5 text-neutral-300 hover:bg-neutral-800 text-sm font-bold transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  min={product.minOrderQty || 1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(product.minOrderQty || 1, Number(e.target.value) || 1))}
                  className="w-14 text-center bg-transparent text-white text-xs font-bold focus:outline-none"
                />
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-1.5 text-neutral-300 hover:bg-neutral-800 text-sm font-bold transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-neutral-400">
                (Total: <strong className="text-[#F59E0B]">₹{(product.price * qty).toLocaleString('en-IN')}</strong>)
              </span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleAddToCart}
                className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-neutral-700"
              >
                <ShoppingCart className="w-4 h-4 text-[#F59E0B]" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleDirectBuy}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#1C1C1C] text-xs font-black flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-amber-500/20"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now</span>
              </button>
            </div>

          </div>

          {/* Quick WhatsApp Procurement Assistance */}
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs">
            <span className="text-emerald-300">Need customized site quantity or instant BOQ invoice?</span>
            <a
              href={`https://wa.me/919032477292?text=Hello%20AMK%20INFRA%2C%20I%20am%20interested%20in%20ordering%20${encodeURIComponent(product.name)}%20(SKU%3A%20${product.sku}).%20Please%20provide%20bulk%20quote.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
