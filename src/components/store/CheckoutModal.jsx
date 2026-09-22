import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import {
  X,
  CheckCircle2,
  Truck,
  ShieldCheck,
  CreditCard,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Copy,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export function CheckoutModal({ isOpen, onClose, directItem, onOrderSuccess }) {
  const { cart, clearCart, showToast, addNotification, navigateTo } = useApp();

  const checkoutItems = directItem ? [directItem] : cart;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Hanamkonda, Warangal');
  const [siteAddress, setSiteAddress] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('Express 24h Site Delivery');
  const [paymentMethod, setPaymentMethod] = useState('Pay on Site Delivery (COD)');
  const [couponCode, setCouponCode] = useState('AMKBUILD10');
  const [couponApplied, setCouponApplied] = useState('AMKBUILD10');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Success modal state
  const [placedOrder, setPlacedOrder] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const itemsTotal = checkoutItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const gstAmount = Math.round(itemsTotal * 0.18);
  const discountRate = couponApplied === 'AMKBUILD10' ? 0.10 : (couponApplied === 'AMKVIP' ? 0.15 : 0);
  const discountAmount = Math.round(itemsTotal * discountRate);
  const deliveryFee = itemsTotal > 5000 ? 0 : 450;
  const finalTotal = itemsTotal + gstAmount + deliveryFee - discountAmount;

  const applyCoupon = () => {
    const c = couponCode.trim().toUpperCase();
    if (c === 'AMKBUILD10' || c === 'AMKVIP') {
      setCouponApplied(c);
      showToast('Coupon Applied', `Code ${c} discount activated!`, 'success');
    } else {
      showToast('Invalid Coupon', 'Valid codes: AMKBUILD10 (10% off), AMKVIP (15% off)', 'error');
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!customerName || !phone || !siteAddress) {
      showToast('Required Fields Missing', 'Please provide name, phone and site address.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const fullAddress = `${siteAddress}, ${city}`;
      const payload = {
        customerName,
        phone,
        email,
        siteAddress: fullAddress,
        items: checkoutItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          unit: item.unit,
          quantity: item.quantity || 1,
          image: item.image
        })),
        notes,
        paymentMethod,
        deliverySlot,
        couponApplied
      };

      const res = await api.createProductOrder(payload);
      if (res.success) {
        setPlacedOrder(res.data);
        if (!directItem) clearCart();
        addNotification({
          title: 'Material Order Placed',
          message: `Order #${res.data.id} booked. Total: ₹${finalTotal.toLocaleString('en-IN')}. Dispatch to ${city}.`,
          type: 'success'
        });
        if (onOrderSuccess) onOrderSuccess(res.data);
      } else {
        showToast('Order Failed', res.message || 'Could not place order', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Order Error', 'Network error placing order.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    showToast('Copied', `Order Tracking Code ${code} copied!`, 'info');
    setTimeout(() => setCopiedCode(false), 3000);
  };

  // 1. Success Screen View
  if (placedOrder) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-xl bg-[#1C1C1C] text-neutral-100 rounded-3xl border border-emerald-500/40 shadow-2xl p-6 sm:p-8 space-y-6">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="text-2xl font-bold font-display text-white">
              Material Purchase Confirmed!
            </h2>
            <p className="text-xs text-neutral-300">
              Your construction supplies order has been received by AMK INFRA Central Logistics Fleet.
            </p>
          </div>

          {/* Tracking Code Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/40 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#F59E0B] font-bold uppercase tracking-wider block">
                Official Order Tracking Code
              </span>
              <div className="text-2xl font-black text-white font-mono tracking-widest mt-0.5">
                {placedOrder.id}
              </div>
            </div>

            <button
              onClick={() => handleCopyCode(placedOrder.id)}
              className="px-3.5 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] text-xs font-black flex items-center gap-1.5 transition-colors shadow-md"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Order Summary Grid */}
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2.5 text-xs">
            <div className="flex justify-between text-neutral-400">
              <span>Customer:</span>
              <strong className="text-white">{placedOrder.customerName} ({placedOrder.phone})</strong>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Delivery Site:</span>
              <strong className="text-white text-right max-w-[280px] truncate">{placedOrder.siteAddress}</strong>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Delivery Slot:</span>
              <strong className="text-[#F59E0B]">{placedOrder.deliverySlot}</strong>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Payment Mode:</span>
              <strong className="text-emerald-400">{placedOrder.paymentMethod}</strong>
            </div>
            <div className="border-t border-neutral-800 pt-2 flex justify-between font-bold text-sm">
              <span className="text-white">Total Amount:</span>
              <span className="text-[#F59E0B] font-display">₹{placedOrder.finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* WhatsApp Direct Dispatch & Track Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={`https://wa.me/919032477292?text=Hello%20AMK%20INFRA%2C%20I%20have%20placed%20Materials%20Order%20${placedOrder.id}%20for%20Rs.${placedOrder.finalTotal}.%20Please%20confirm%20dispatch%20schedule.`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Dispatch Alert</span>
            </a>

            <button
              onClick={() => {
                onClose();
                navigateTo('tracker', { trackingCode: placedOrder.id });
              }}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] text-xs font-black flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <span>Track Live Delivery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    );
  }

  // 2. Main Checkout Form Modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#1C1C1C] text-neutral-100 rounded-3xl border border-neutral-700 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-[#161616]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-black">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display text-white">
                Construction Supplies Site Checkout
              </h2>
              <p className="text-xs text-neutral-400">
                Direct Dispatch from AMK Logistics Center, Hanamkonda & Warangal
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

        {/* Modal Scrollable Form */}
        <form onSubmit={handleSubmitOrder} className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 7 Cols: Customer & Site Details */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="space-y-4 bg-neutral-900/90 p-5 rounded-2xl border border-neutral-800">
                <h3 className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>1. Client & Site Delivery Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar / Patel Infra"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98480 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="client@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      City / Region *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs focus:outline-none focus:border-[#F59E0B]"
                    >
                      <option value="Hanamkonda, Warangal">Hanamkonda, Warangal Urban</option>
                      <option value="Warangal Fort City">Warangal Fort City / Pochamma Maidan</option>
                      <option value="Kazipet & NIT Area">Kazipet & NIT Area</option>
                      <option value="Hunter Road / Mulugu Road">Hunter Road / Mulugu Road</option>
                      <option value="Hyderabad & Outer Ring Road">Hyderabad & Outer Ring Road</option>
                      <option value="Karimnagar District">Karimnagar District</option>
                      <option value="Khammam & Siddipet">Khammam & Siddipet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                    Site Delivery Address / Plot Landmark *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Plot No, Near Landmark, Construction Site Gate A..."
                    value={siteAddress}
                    onChange={(e) => setSiteAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
              </div>

              {/* Delivery Slot & Unloading */}
              <div className="space-y-4 bg-neutral-900/90 p-5 rounded-2xl border border-neutral-800">
                <h3 className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>2. Dispatch Slot & Unloading Instructions</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      Preferred Delivery Window
                    </label>
                    <select
                      value={deliverySlot}
                      onChange={(e) => setDeliverySlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs focus:outline-none focus:border-[#F59E0B]"
                    >
                      <option value="Express 24h Site Delivery">⚡ Express 24h Site Delivery</option>
                      <option value="Scheduled Morning (8:00 AM - 12:00 PM)">🌅 Morning Slot (8 AM - 12 PM)</option>
                      <option value="Scheduled Afternoon (1:00 PM - 6:00 PM)">☀️ Afternoon Slot (1 PM - 6 PM)</option>
                      <option value="Bulk Tipper Truck (48h Scheduled)">🚛 Bulk Tipper Truck Transit</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      Payment Mode
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs focus:outline-none focus:border-[#F59E0B]"
                    >
                      <option value="Pay on Site Delivery (COD)">💵 Pay on Site Delivery / COD</option>
                      <option value="Online UPI / Scanner">📱 Online UPI / Instant QR</option>
                      <option value="NEFT / RTGS Bank Transfer">🏛️ NEFT / RTGS Bank Transfer</option>
                      <option value="Milestone Contractor Credit">📄 Milestone Contractor Credit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                    Special Unloading Notes (Crane needed, Gate code, Driver contact)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Unload near column block C. Call driver 15 mins before arrival."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
              </div>

            </div>

            {/* Right 5 Cols: Items Review & Billing */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Items List */}
              <div className="bg-neutral-900/90 p-5 rounded-2xl border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Order Items ({checkoutItems.length})
                  </h3>
                  <span className="text-[11px] text-[#F59E0B] font-semibold">
                    100% Genuine
                  </span>
                </div>

                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                  {checkoutItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-neutral-800/80 border border-neutral-700/60 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover bg-neutral-900 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-white truncate text-[11px]">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-neutral-400">
                            {item.quantity || 1} x ₹{item.price.toLocaleString('en-IN')} /{item.unit || 'unit'}
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-[#F59E0B] shrink-0">
                        ₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Code Strip */}
                <div className="pt-2 border-t border-neutral-800">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. AMKBUILD10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs uppercase focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 hover:text-[#1C1C1C] text-[#F59E0B] text-xs font-bold transition-colors border border-amber-500/40"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-1.5 pt-2 border-t border-neutral-800 text-xs text-neutral-300">
                  <div className="flex justify-between">
                    <span>Items Subtotal:</span>
                    <span>₹{itemsTotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST (18% Input Tax Credit):</span>
                    <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Site Express Delivery:</span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE (Orders &gt; ₹5,000)</span>
                    ) : (
                      <span>₹{deliveryFee}</span>
                    )}
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Contractor Discount ({couponApplied}):</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="border-t border-neutral-700 pt-2 flex justify-between text-base font-bold text-white">
                    <span>Grand Total:</span>
                    <span className="text-[#F59E0B] font-display text-xl">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || checkoutItems.length === 0}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F59E0B] via-[#E68A00] to-[#D97706] text-[#1C1C1C] text-sm font-black flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.99] transition-transform shadow-xl shadow-amber-500/20 disabled:opacity-50"
              >
                {submitting ? (
                  <span>Processing Site Order...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Confirm & Book Site Delivery (₹{finalTotal.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-neutral-400 flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>GST Tax Invoice + Tracking ID generated immediately</span>
              </div>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
