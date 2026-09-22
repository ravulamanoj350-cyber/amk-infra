import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  Tag,
  Check,
  Building2,
  Sparkles
} from 'lucide-react';

export function CartDrawer({ isOpen, onClose, onOpenCheckout }) {
  const {
    cart,
    removeFromCart,
    updateCartQty,
    clearCart,
    cartTotal,
    cartCount,
    navigateTo,
    showToast
  } = useApp();

  const [couponInput, setCouponInput] = useState('AMKBUILD10');
  const [activeCoupon, setActiveCoupon] = useState('AMKBUILD10');

  if (!isOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const c = couponInput.trim().toUpperCase();
    if (c === 'AMKBUILD10' || c === 'AMKVIP') {
      setActiveCoupon(c);
      showToast('Coupon Applied', `Code ${c} discount applied!`, 'success');
    } else {
      showToast('Invalid Coupon', 'Valid codes: AMKBUILD10 (10% off), AMKVIP (15% off)', 'error');
    }
  };

  const discountRate = activeCoupon === 'AMKBUILD10' ? 0.10 : (activeCoupon === 'AMKVIP' ? 0.15 : 0);
  const discountAmount = Math.round(cartTotal * discountRate);
  const gstAmount = Math.round(cartTotal * 0.18);
  const freeDeliveryThreshold = 5000;
  const deliveryFee = cartTotal >= freeDeliveryThreshold || cartTotal === 0 ? 0 : 450;
  const grandTotal = cartTotal + gstAmount + deliveryFee - discountAmount;
  const progressToFreeDelivery = Math.min(100, Math.round((cartTotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#181818] text-neutral-100 shadow-2xl border-l border-neutral-800 flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 bg-[#141414] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-black">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold font-display text-white">
                  Procurement Cart ({cartCount})
                </h2>
                <p className="text-[11px] text-neutral-400">
                  AMK Construction Supplies & Pipeline Hub
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

          {/* Free Delivery Bar */}
          <div className="px-6 py-3 bg-neutral-900 border-b border-neutral-800 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 text-neutral-300 font-semibold">
                <Truck className="w-3.5 h-3.5 text-[#F59E0B]" />
                {cartTotal >= freeDeliveryThreshold ? (
                  <span className="text-emerald-400 font-bold">You qualify for FREE Site Delivery!</span>
                ) : (
                  <span>Add ₹{(freeDeliveryThreshold - cartTotal).toLocaleString('en-IN')} for FREE Delivery</span>
                )}
              </span>
              <span className="font-bold text-[#F59E0B]">{progressToFreeDelivery}%</span>
            </div>
            <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#F59E0B] to-emerald-500 h-full transition-all duration-500"
                style={{ width: `${progressToFreeDelivery}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-800/80 text-neutral-500 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">Your Cart is Empty</h3>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                    Browse our construction pipelines, tiles, taps, cardboards, and structural supplies to build your site order.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigateTo('store');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] text-xs font-black shadow-md transition-colors"
                >
                  Explore Store Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-[#202020] border border-neutral-700/80 flex items-start justify-between gap-3 text-xs group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-neutral-900 border border-neutral-700 shrink-0"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] text-[#F59E0B] font-bold uppercase tracking-wider block truncate">
                      {item.brand || 'AMK Verified'}
                    </span>
                    <h4 className="font-semibold text-white leading-snug text-xs line-clamp-2">
                      {item.name}
                    </h4>
                    <div className="text-[11px] text-neutral-400">
                      ₹{item.price.toLocaleString('en-IN')} <span className="text-[10px]">/{item.unit || 'unit'}</span>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex items-center border border-neutral-700 bg-neutral-900 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-neutral-300 hover:bg-neutral-800 font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-white font-bold text-[11px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-neutral-300 hover:bg-neutral-800 font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-neutral-500">•</span>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 text-[10px] font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right shrink-0">
                    <span className="font-bold text-[#F59E0B] text-sm block font-display">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#141414] border-t border-neutral-800 space-y-4">
              
              {/* Coupon Bar */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#F59E0B]" />
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. AMKBUILD10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white uppercase focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-[#F59E0B] hover:text-[#1C1C1C] text-[#F59E0B] text-xs font-bold transition-colors border border-amber-500/40"
                >
                  Apply
                </button>
              </form>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items):</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between">
                  <span>GST (18% ITC Invoice):</span>
                  <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between">
                  <span>Express Site Delivery:</span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-bold">FREE</span>
                  ) : (
                    <span>₹{deliveryFee}</span>
                  )}
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Discount ({activeCoupon}):</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="border-t border-neutral-700 pt-2 flex justify-between text-base font-bold text-white">
                  <span>Estimated Total:</span>
                  <span className="text-[#F59E0B] font-display text-xl">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenCheckout) onOpenCheckout();
                  }}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#1C1C1C] text-xs font-black flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-amber-500/20"
                >
                  <span>Proceed to Site Delivery Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                  <button
                    onClick={clearCart}
                    className="hover:text-red-400 transition-colors"
                  >
                    Clear All Items
                  </button>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Milestone Quality Guarantee</span>
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
