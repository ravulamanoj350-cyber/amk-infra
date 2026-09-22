import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import { AdminProfileModal } from './AdminProfileModal';
import {
  Shield,
  Lock,
  User,
  LogOut,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  Building2,
  TrendingUp,
  Search,
  Filter,
  Phone,
  MessageSquare,
  IndianRupee,
  Layers,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  HardHat,
  Award,
  ShoppingBag,
  Truck,
  PackageCheck,
  Camera,
  UserCheck
} from 'lucide-react';

export function AdminDashboard() {
  const { adminUser, loginAdmin, logoutAdmin, adminProfile, showToast, addNotification, services, divisions } = useApp();

  // Auth inputs
  const [email, setEmail] = useState('admin@amkinfra.com');
  const [password, setPassword] = useState('amk1234');
  const [loginLoading, setLoginLoading] = useState(false);

  // Admin View tab
  const [adminTab, setAdminTab] = useState('inquiries'); // 'inquiries' | 'orders' | 'portfolio' | 'divisions' | 'stats'
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Inquiries data & filters
  const [inquiries, setInquiries] = useState([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [divisionFilter, setDivisionFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Material Orders data & filters
  const [materialOrders, setMaterialOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newOrderStatus, setNewOrderStatus] = useState('Confirmed');
  const [newOrderDriver, setNewOrderDriver] = useState('');
  const [newOrderNote, setNewOrderNote] = useState('');
  const [updatingOrderStatus, setUpdatingOrderStatus] = useState(false);

  // Selected Inquiry for Status Update Drawer
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [newStatus, setNewStatus] = useState('Received');
  const [newStatusNote, setNewStatusNote] = useState('');
  const [newQuoteAmount, setNewQuoteAmount] = useState('');
  const [newAssignedEngineer, setNewAssignedEngineer] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Portfolio items & new item modal
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [newProjectModal, setNewProjectModal] = useState(false);
  
  // New project form state
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState('residential');
  const [projDivisionId, setProjDivisionId] = useState('residential-villas');
  const [projLocation, setProjLocation] = useState('Hanamkonda, Warangal');
  const [projArea, setProjArea] = useState('3,200 sq.ft');
  const [projCost, setProjCost] = useState('₹55,00,000');
  const [projCompletion, setProjCompletion] = useState('Recently Completed');
  const [projClient, setProjClient] = useState('Private Client');
  const [projDesc, setProjDesc] = useState('');
  const [projImage, setProjImage] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80');
  const [projBeforeImage, setProjBeforeImage] = useState('');
  const [projHighlights, setProjHighlights] = useState('Vastu Compliant, Fe-550 Steel, Premium Teak');
  const [creatingProject, setCreatingProject] = useState(false);

  // Stats data
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (adminUser) {
      loadInquiries();
      loadMaterialOrders();
      loadPortfolio();
      loadStats();
    }
  }, [adminUser, statusFilter, serviceFilter, divisionFilter, orderStatusFilter]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await api.loginAdmin(email, password);
      if (res.success) {
        loginAdmin(res.user);
      } else {
        showToast('Login Failed', res.message, 'error');
      }
    } catch (err) {
      showToast('Error', 'Could not authenticate admin.', 'error');
    } finally {
      setLoginLoading(false);
    }
  };

  const loadInquiries = async () => {
    setInquiriesLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (serviceFilter !== 'all') params.service = serviceFilter;
      if (divisionFilter !== 'all') params.division = divisionFilter;
      if (searchFilter.trim()) params.search = searchFilter.trim();

      const res = await api.getInquiries(params);
      if (res.success) {
        setInquiries(res.data);
      }
    } catch (err) {
      console.error('Error loading inquiries', err);
    } finally {
      setInquiriesLoading(false);
    }
  };

  const loadPortfolio = async () => {
    setPortfolioLoading(true);
    try {
      const res = await api.getPortfolio('all');
      if (res.success) {
        setPortfolioItems(res.data);
      }
    } catch (err) {
      console.error('Error loading portfolio', err);
    } finally {
      setPortfolioLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const res = await api.getStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (err) {
      console.error('Error loading stats', err);
    }
  };

  const loadMaterialOrders = async () => {
    setOrdersLoading(true);
    try {
      const res = await api.getProductOrders();
      if (res.success) {
        setMaterialOrders(res.data);
      }
    } catch (err) {
      console.error('Error loading material orders', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const openOrderStatusEditor = (order) => {
    setSelectedOrder(order);
    setNewOrderStatus(order.orderStatus || 'Confirmed');
    setNewOrderDriver(order.assignedDriver || 'AMK Logistics Fleet (Hanamkonda Central Warehouse)');
    setNewOrderNote(order.notes || '');
  };

  const handleSaveOrderStatus = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setUpdatingOrderStatus(true);
    try {
      const res = await api.updateProductOrderStatus(selectedOrder.id, {
        status: newOrderStatus,
        assignedDriver: newOrderDriver,
        note: newOrderNote
      });
      if (res.success) {
        showToast('Order Status Updated', `Order ${selectedOrder.id} is now ${newOrderStatus}.`, 'success');
        addNotification({
          title: `Material Order: ${newOrderStatus}`,
          message: `Order #${selectedOrder.id} for ${selectedOrder.customerName} marked as ${newOrderStatus}.`,
          type: 'success'
        });
        setSelectedOrder(null);
        loadMaterialOrders();
      }
    } catch (err) {
      console.error(err);
      showToast('Error', 'Failed to update order status', 'error');
    } finally {
      setUpdatingOrderStatus(false);
    }
  };

  const openStatusEditor = (inq) => {
    setSelectedInquiry(inq);
    setNewStatus(inq.status);
    setNewStatusNote(inq.statusNote || '');
    setNewQuoteAmount(inq.estimatedQuote || '');
    setNewAssignedEngineer(inq.assignedEngineer || 'A. Charan Patel (Site Director)');
  };

  const handleSaveStatus = async (e) => {
    e.preventDefault();
    if (!selectedInquiry) return;

    setUpdatingStatus(true);
    try {
      const res = await api.updateInquiryStatus(selectedInquiry.id, {
        status: newStatus,
        statusNote: newStatusNote,
        estimatedQuote: newQuoteAmount,
        assignedEngineer: newAssignedEngineer
      });

      if (res.success) {
        showToast('Status Updated', `Inquiry ${selectedInquiry.id} updated to ${newStatus}`, 'success');
        addNotification({
          title: `Project Status: ${newStatus}`,
          message: `${selectedInquiry.customerName}'s request (${selectedInquiry.id}) is now ${newStatus}.`,
          type: 'info'
        });
        setSelectedInquiry(null);
        loadInquiries();
        loadStats();
      }
    } catch (err) {
      showToast('Error', 'Could not update status', 'error');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm(`Are you sure you want to delete inquiry ${id}?`)) return;
    try {
      const res = await api.deleteInquiry(id);
      if (res.success) {
        showToast('Inquiry Deleted', `Inquiry ${id} was removed.`, 'info');
        loadInquiries();
        loadStats();
      }
    } catch (err) {
      showToast('Error', 'Could not delete inquiry', 'error');
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projTitle.trim() || !projImage.trim()) {
      showToast('Missing Fields', 'Title and image URL are required.', 'error');
      return;
    }

    setCreatingProject(true);
    try {
      const res = await api.createPortfolioProject({
        title: projTitle.trim(),
        category: projCategory,
        divisionId: projDivisionId,
        location: projLocation.trim(),
        area: projArea.trim(),
        cost: projCost.trim(),
        completionDate: projCompletion.trim(),
        client: projClient.trim(),
        description: projDesc.trim(),
        image: projImage.trim(),
        beforeImage: projBeforeImage.trim(),
        highlights: projHighlights
      });

      if (res.success) {
        showToast('Project Added', 'New project published to AMK portfolio.', 'success');
        setNewProjectModal(false);
        setProjTitle('');
        setProjDesc('');
        loadPortfolio();
        loadStats();
      }
    } catch (err) {
      showToast('Error', 'Could not create project.', 'error');
    } finally {
      setCreatingProject(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project from public portfolio?')) return;
    try {
      const res = await api.deletePortfolioProject(id);
      if (res.success) {
        showToast('Project Removed', 'Item removed from portfolio.', 'info');
        loadPortfolio();
        loadStats();
      }
    } catch (err) {
      showToast('Error', 'Could not delete project', 'error');
    }
  };

  // 1. If not logged in, render Secure Login Screen
  if (!adminUser) {
    return (
      <div className="py-20 bg-[#F5F5F3] text-[#1C1C1C] min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#FFFFFF] border border-neutral-200 rounded-3xl p-8 shadow-xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-black mx-auto shadow-md">
              <Shield className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl font-bold font-display text-[#1C1C1C]">
              AMK INFRA Admin Portal
            </h1>
            <p className="text-xs text-[#737373]">
              Authorized Staff & Managing Director Login (A. Charan Patel)
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#1C1C1C] mb-1">Email / Staff ID</label>
              <input
                type="text"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl px-4 py-3 text-[#1C1C1C] outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1C1C1C] mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl px-4 py-3 text-[#1C1C1C] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-sm shadow-md transition-all"
            >
              {loginLoading ? 'Signing In...' : 'Sign In as Managing Director'}
            </button>
          </form>

          {/* Quick Demo Login Preset Helper */}
          <div className="p-4 bg-[#F5F5F3] rounded-2xl border border-neutral-200 text-center space-y-2 text-xs">
            <span className="text-[11px] text-[#737373] block font-semibold">Demo Credentials Pre-filled:</span>
            <div className="text-[11px] font-mono text-[#D97706] font-bold">
              admin@amkinfra.com / amk1234
            </div>
            <p className="text-[10px] text-[#737373]">
              Click the button above to access live dashboard, manage incoming requests across 7 corporate divisions, and assign engineers.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Admin Dashboard Logged-in View
  return (
    <div className="py-12 bg-[#F5F5F3] text-[#1C1C1C] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Bar with Staff Header & Profile Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FFFFFF] p-6 rounded-3xl border border-neutral-200 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-[#F59E0B] border-2 border-amber-500 shadow-md shrink-0">
              <img
                src={adminProfile?.avatar || adminUser?.photo || '/assets/logo.png'}
                alt={adminProfile?.name || adminUser?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-[#1C1C1C] font-display">
                  {adminProfile?.name || adminUser?.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F59E0B]/20 text-[#D97706] text-[10px] font-bold border border-[#F59E0B]/40">
                  {adminProfile?.title || adminUser?.role || 'Founder & MD'}
                </span>
              </div>
              <p className="text-xs text-[#737373] mt-0.5">
                AMK INFRA Headquarters, Subedari, Hanamkonda • Phone: <strong className="text-[#1C1C1C]">{adminProfile?.phone || '9032477292'}</strong> • Email: <strong className="text-[#1C1C1C]">{adminProfile?.email || 'admin@amkinfra.com'}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Edit Profile Button */}
            <button
              onClick={() => setProfileModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-[#F59E0B] hover:text-[#1C1C1C] text-[#D97706] text-xs font-black transition-all border border-amber-500/40 flex items-center gap-1.5 shadow-sm"
            >
              <UserCheck className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => {
                loadInquiries();
                loadMaterialOrders();
                loadPortfolio();
                loadStats();
                showToast('Refreshed', 'Latest data loaded from server.', 'info');
              }}
              className="p-2.5 rounded-xl bg-[#E8E8E5] text-[#1C1C1C] hover:bg-neutral-300 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={logoutAdmin}
              className="px-4 py-2.5 rounded-xl bg-red-100 text-red-700 hover:bg-red-600 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* KPI Stats Bar */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#FFFFFF] p-5 rounded-3xl border border-neutral-200 shadow-sm">
              <span className="text-[11px] text-[#737373] font-semibold uppercase block">Total Inquiries</span>
              <div className="text-3xl font-black text-[#1C1C1C] font-display mt-1">{stats.totalInquiries}</div>
              <span className="text-[10px] text-emerald-700 font-bold">● Active 7 Divisions Pipeline</span>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded-3xl border border-neutral-200 shadow-sm">
              <span className="text-[11px] text-[#737373] font-semibold uppercase block">Material Orders (Store)</span>
              <div className="text-3xl font-black text-[#D97706] font-display mt-1">{materialOrders.length}</div>
              <span className="text-[10px] text-[#D97706] font-bold">Pipelines, Tiles, Taps &amp; Supplies</span>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded-3xl border border-neutral-200 shadow-sm">
              <span className="text-[11px] text-[#737373] font-semibold uppercase block">Handed Over (Completed)</span>
              <div className="text-3xl font-black text-emerald-700 font-display mt-1">{stats.completedInquiries}</div>
              <span className="text-[10px] text-emerald-700 font-bold">100% On-Time Delivery</span>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded-3xl border border-neutral-200 shadow-sm">
              <span className="text-[11px] text-[#737373] font-semibold uppercase block">Conversion Rate</span>
              <div className="text-3xl font-black text-blue-700 font-display mt-1">{stats.conversionRate}</div>
              <span className="text-[10px] text-[#737373]">{stats.portfolioCount} Portfolio Projects</span>
            </div>
          </div>
        )}

        {/* Tab Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-300 pb-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setAdminTab('inquiries')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                adminTab === 'inquiries'
                  ? 'bg-[#F59E0B] text-[#1C1C1C] font-extrabold shadow-md'
                  : 'bg-[#FFFFFF] text-[#4B4B4B] border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              Inquiries &amp; Workflow ({inquiries.length})
            </button>

            <button
              onClick={() => setAdminTab('orders')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                adminTab === 'orders'
                  ? 'bg-[#F59E0B] text-[#1C1C1C] font-extrabold shadow-md'
                  : 'bg-[#FFFFFF] text-[#4B4B4B] border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Material &amp; Supply Orders ({materialOrders.length})</span>
            </button>

            <button
              onClick={() => setAdminTab('portfolio')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                adminTab === 'portfolio'
                  ? 'bg-[#F59E0B] text-[#1C1C1C] font-extrabold shadow-md'
                  : 'bg-[#FFFFFF] text-[#4B4B4B] border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              Portfolio Projects ({portfolioItems.length})
            </button>
          </div>

          {adminTab === 'portfolio' && (
            <button
              onClick={() => setNewProjectModal(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          )}
        </div>

        {/* TAB 1: Inquiries Manager */}
        {adminTab === 'inquiries' && (
          <div className="space-y-6">
            
            {/* Filter Toolbar with Division Filter */}
            <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Search */}
                <div className="relative w-56">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#737373]" />
                  <input
                    type="text"
                    placeholder="Search name, code, phone..."
                    value={searchFilter}
                    onChange={e => {
                      setSearchFilter(e.target.value);
                      loadInquiries();
                    }}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl pl-9 pr-3 py-1.5 text-[#1C1C1C] outline-none focus:border-[#F59E0B] text-xs"
                  />
                </div>

                {/* Status Dropdown */}
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-1.5 text-[#1C1C1C] outline-none focus:border-[#F59E0B] text-xs"
                >
                  <option value="all">All Statuses</option>
                  <option value="Received">1. Received</option>
                  <option value="Contacted">2. Contacted</option>
                  <option value="Quoted">3. Quoted</option>
                  <option value="In Progress">4. In Progress</option>
                  <option value="Completed">5. Completed</option>
                </select>

                {/* Corporate Division Dropdown */}
                <select
                  value={divisionFilter}
                  onChange={e => setDivisionFilter(e.target.value)}
                  className="bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-1.5 text-[#D97706] outline-none focus:border-[#F59E0B] text-xs font-semibold"
                >
                  <option value="all">All Corporate Divisions</option>
                  {(divisions || []).map(div => (
                    <option key={div.id} value={div.id}>{div.shortName || div.name}</option>
                  ))}
                </select>

                {/* Service Dropdown */}
                <select
                  value={serviceFilter}
                  onChange={e => setServiceFilter(e.target.value)}
                  className="bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-1.5 text-[#1C1C1C] outline-none focus:border-[#F59E0B] text-xs"
                >
                  <option value="all">All Services</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.title.split('(')[0]}</option>
                  ))}
                </select>
              </div>

              <div className="text-[#737373] font-semibold">
                Showing {inquiries.length} Requests
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-[#FFFFFF] rounded-3xl border border-neutral-200 overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#E8E8E5] text-[#1C1C1C] uppercase text-[10px] font-bold tracking-wider border-b border-neutral-300">
                    <tr>
                      <th className="px-5 py-4">Tracking ID & Date</th>
                      <th className="px-5 py-4">Client Contact</th>
                      <th className="px-5 py-4">Assigned Corporate Wing</th>
                      <th className="px-5 py-4">Project & Location</th>
                      <th className="px-5 py-4">Status & Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 text-[#1C1C1C]">
                    {inquiries.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-12 text-[#737373]">
                          No inquiries found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      inquiries.map(item => (
                        <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="px-5 py-4">
                            <span className="font-mono font-bold text-[#D97706] text-sm block">
                              {item.id}
                            </span>
                            <span className="text-[10px] text-[#737373]">
                              {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <strong className="text-[#1C1C1C] block text-sm">{item.customerName}</strong>
                            <div className="flex items-center gap-2 mt-0.5">
                              <a
                                href={`tel:${item.phone}`}
                                className="text-[#D97706] hover:underline font-mono"
                              >
                                {item.phone}
                              </a>
                              <a
                                href={`https://wa.me/91${item.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(item.customerName)}%2C%20this%20is%20A.%20Charan%20Patel%20from%20AMK%20INFRA%20regarding%20your%20inquiry%20${item.id}.`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-600 hover:text-emerald-700"
                                title="Open WhatsApp Chat"
                              >
                                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                              </a>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span className="font-bold text-[#D97706] block text-xs">
                              {item.divisionName || 'Civil Infrastructure Wing'}
                            </span>
                            <span className="text-[10px] text-[#737373] block mt-0.5">
                              Lead: {item.assignedEngineer || 'Er. Sandeep Goud'}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <span className="font-semibold text-[#1C1C1C] block">{item.serviceTitle}</span>
                            <span className="text-[11px] text-[#737373] block">{item.projectType} • 📍 {item.location}</span>
                            <span className="text-[10px] text-[#D97706] font-bold block">{item.budgetRange}</span>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openStatusEditor(item)}
                                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                                  item.status === 'Completed'
                                    ? 'bg-emerald-600 text-white'
                                    : item.status === 'In Progress'
                                    ? 'bg-blue-600 text-white'
                                    : item.status === 'Quoted'
                                    ? 'bg-[#F59E0B] text-[#1C1C1C]'
                                    : item.status === 'Contacted'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-[#E8E8E5] text-[#1C1C1C] border border-neutral-300'
                                }`}
                              >
                                <span>{item.status}</span>
                                <Edit className="w-3 h-3 opacity-70" />
                              </button>

                              <button
                                onClick={() => handleDeleteInquiry(item.id)}
                                className="p-1.5 rounded-lg text-[#737373] hover:text-red-600 hover:bg-neutral-100"
                                title="Delete Inquiry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Material & Pipeline Orders Manager */}
        {adminTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Orders Toolbar */}
            <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-bold text-neutral-700 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Dispatch Status:</span>
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {['all', 'Confirmed', 'Dispatched', 'In Transit', 'Delivered', 'Cancelled'].map(st => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                        orderStatusFilter === st
                          ? 'bg-[#1C1C1C] text-[#F59E0B] shadow'
                          : 'bg-[#F5F5F3] text-neutral-600 hover:text-black hover:bg-neutral-200'
                      }`}
                    >
                      {st === 'all' ? 'All Orders' : st}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={loadMaterialOrders}
                className="px-3.5 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold flex items-center gap-1.5 border border-neutral-300 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Refresh Orders</span>
              </button>
            </div>

            {/* Orders Table Container */}
            <div className="bg-[#FFFFFF] rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F5F5F3] text-[#737373] uppercase font-bold border-b border-neutral-200">
                      <th className="p-4">Order ID &amp; Date</th>
                      <th className="p-4">Customer &amp; Phone</th>
                      <th className="p-4">Delivery Site Address</th>
                      <th className="p-4">Ordered Items</th>
                      <th className="p-4">Total &amp; Payment</th>
                      <th className="p-4">Dispatch Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {ordersLoading ? (
                      <tr>
                        <td colSpan="7" className="p-8 text-center text-neutral-400">
                          <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                          <span>Loading site material orders...</span>
                        </td>
                      </tr>
                    ) : materialOrders.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="p-8 text-center text-neutral-400">
                          No material purchase orders found.
                        </td>
                      </tr>
                    ) : (
                      materialOrders
                        .filter(order => orderStatusFilter === 'all' || (order.orderStatus || '').toLowerCase() === orderStatusFilter.toLowerCase())
                        .map(order => (
                          <tr key={order.id} className="hover:bg-amber-50/40 transition-colors">
                            <td className="p-4">
                              <span className="font-mono font-black text-sm text-[#1C1C1C] block">
                                {order.id}
                              </span>
                              <span className="text-[10px] text-neutral-400">
                                {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                              </span>
                              <span className="text-[10px] text-[#D97706] font-semibold block">
                                {order.deliverySlot}
                              </span>
                            </td>

                            <td className="p-4">
                              <span className="font-bold text-neutral-900 block text-xs">
                                {order.customerName}
                              </span>
                              <a
                                href={`tel:${order.phone}`}
                                className="text-[11px] text-[#D97706] font-semibold hover:underline flex items-center gap-1 mt-0.5"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{order.phone}</span>
                              </a>
                            </td>

                            <td className="p-4 max-w-xs">
                              <div className="text-xs text-neutral-800 line-clamp-2" title={order.siteAddress}>
                                <MapPin className="w-3 h-3 text-[#F59E0B] inline mr-1" />
                                {order.siteAddress}
                              </div>
                            </td>

                            <td className="p-4 max-w-xs">
                              <div className="space-y-1">
                                <span className="font-semibold text-neutral-800 text-[11px] block">
                                  {order.items?.length || 0} Items:
                                </span>
                                <div className="text-[10px] text-neutral-500 line-clamp-2">
                                  {order.items?.map(it => `${it.quantity}x ${it.name}`).join(', ')}
                                </div>
                              </div>
                            </td>

                            <td className="p-4 whitespace-nowrap">
                              <div className="font-black text-sm text-[#1C1C1C] font-display">
                                ₹{(order.finalTotal || order.itemsTotal || 0).toLocaleString('en-IN')}
                              </div>
                              <span className="text-[10px] text-neutral-500 block">
                                {order.paymentMethod}
                              </span>
                              <span className="text-[10px] text-emerald-600 font-bold">
                                {order.paymentStatus}
                              </span>
                            </td>

                            <td className="p-4 whitespace-nowrap">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border inline-flex items-center gap-1 ${
                                  order.orderStatus === 'Delivered'
                                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                    : order.orderStatus === 'In Transit' || order.orderStatus === 'Dispatched'
                                    ? 'bg-blue-100 text-blue-800 border-blue-300'
                                    : order.orderStatus === 'Confirmed'
                                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                                    : 'bg-neutral-100 text-neutral-700 border-neutral-300'
                                }`}
                              >
                                <Truck className="w-3 h-3" />
                                <span>{order.orderStatus || 'Confirmed'}</span>
                              </span>
                            </td>

                            <td className="p-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => openOrderStatusEditor(order)}
                                className="px-3 py-1.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] text-xs font-bold transition-colors shadow-sm inline-flex items-center gap-1.5"
                              >
                                <Edit className="w-3 h-3" />
                                <span>Manage Dispatch</span>
                              </button>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: Portfolio Project Manager */}
        {adminTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {portfolioItems.map(proj => (
                <div
                  key={proj.id}
                  className="bg-[#FFFFFF] rounded-3xl overflow-hidden border border-neutral-200 hover:border-neutral-300 shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#1C1C1C]/80 text-[#F59E0B] text-[10px] font-bold">
                        {proj.categoryLabel || proj.category}
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-[#1C1C1C] text-sm line-clamp-1">{proj.title}</h3>
                      <p className="text-xs text-[#4B4B4B] line-clamp-2">{proj.description}</p>
                      <div className="flex justify-between text-xs text-[#737373] pt-1 border-t border-neutral-200">
                        <span>Area: <strong className="text-[#1C1C1C]">{proj.area}</strong></span>
                        <span>Cost: <strong className="text-[#D97706]">{proj.cost}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex justify-end gap-2">
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="px-3 py-1.5 rounded-xl bg-red-100 text-red-700 hover:bg-red-600 hover:text-white text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Status Update Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FFFFFF] border border-neutral-200 rounded-3xl p-6 max-w-lg w-full text-[#1C1C1C] shadow-2xl space-y-4">
            
            <div className="flex justify-between items-start pb-3 border-b border-neutral-200">
              <div>
                <span className="text-[10px] text-[#737373] uppercase font-bold block">Update Request Status</span>
                <h3 className="text-lg font-bold text-[#1C1C1C] font-mono">{selectedInquiry.id}</h3>
                <p className="text-xs text-[#D97706] font-semibold">{selectedInquiry.customerName} ({selectedInquiry.phone})</p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-[#737373] hover:text-[#1C1C1C] p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStatus} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#1C1C1C] mb-1">Status Transition</label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value)}
                  className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl px-3 py-2.5 text-[#1C1C1C] font-bold"
                >
                  <option value="Received">1. Received (Initial online registration)</option>
                  <option value="Contacted">2. Contacted (Site survey scheduled)</option>
                  <option value="Quoted">3. Quoted (BOQ & pricing sheet provided)</option>
                  <option value="In Progress">4. In Progress (Active site construction/execution)</option>
                  <option value="Completed">5. Completed (Audited & handed over)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1C1C1C] mb-1">Quoted Estimate / Project Value (₹)</label>
                <input
                  type="text"
                  placeholder="e.g. ₹48,50,000"
                  value={newQuoteAmount}
                  onChange={e => setNewQuoteAmount(e.target.value)}
                  className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-[#1C1C1C]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1C1C1C] mb-1">Assigned Division Lead Engineer</label>
                <select
                  value={newAssignedEngineer}
                  onChange={e => setNewAssignedEngineer(e.target.value)}
                  className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-[#1C1C1C] font-semibold"
                >
                  <option value="Er. Sandeep Goud (Civil Lead)">Er. Sandeep Goud (Civil & Commercial Lead)</option>
                  <option value="Ar. Radhika Varma (Residential Lead)">Ar. Radhika Varma (Residential Villas Lead)</option>
                  <option value="Er. K. V. Raman (Infra GM)">Er. K. V. Raman (Heavy Works & Roads GM)</option>
                  <option value="V. Naveen (Interior Head)">V. Naveen (Turnkey Interiors Head)</option>
                  <option value="K. Rajesh (Electrical Lead)">K. Rajesh (Power & Automation Lead)</option>
                  <option value="R. Prashanth (Security Specialist)">R. Prashanth (Surveillance & Security Lead)</option>
                  <option value="M. Srinivas (Coating Head)">M. Srinivas (Coating & Waterproofing Head)</option>
                  <option value="A. Charan Patel (Site Director)">A. Charan Patel (Managing Director)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1C1C1C] mb-1">Engineering Milestone Note (Visible to Customer Tracker)</label>
                <textarea
                  rows="3"
                  placeholder="Add site progress details, inspection summary, or material delivery notes..."
                  value={newStatusNote}
                  onChange={e => setNewStatusNote(e.target.value)}
                  className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl p-3 text-[#1C1C1C] outline-none resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="flex-1 py-2.5 rounded-xl bg-[#E8E8E5] text-[#1C1C1C] font-bold hover:bg-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingStatus}
                  className="flex-1 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold shadow-md"
                >
                  {updatingStatus ? 'Updating...' : 'Save & Publish Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Project Modal */}
      {newProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FFFFFF] border border-neutral-200 rounded-3xl p-6 max-w-lg w-full text-[#1C1C1C] shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            
            <div className="flex justify-between items-start pb-3 border-b border-neutral-200">
              <div>
                <h3 className="text-lg font-bold text-[#1C1C1C] font-display">Add Completed Project to Portfolio</h3>
                <p className="text-xs text-[#737373]">Published to public gallery and case studies</p>
              </div>
              <button
                onClick={() => setNewProjectModal(false)}
                className="text-[#737373] hover:text-[#1C1C1C] p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#1C1C1C] mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 4BHK Grand Villa at Hunter Road"
                  value={projTitle}
                  onChange={e => setProjTitle(e.target.value)}
                  className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-[#1C1C1C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#1C1C1C] mb-1">Category</label>
                  <select
                    value={projCategory}
                    onChange={e => setProjCategory(e.target.value)}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-[#1C1C1C]"
                  >
                    <option value="residential">Residential Custom Home</option>
                    <option value="construction">Commercial Construction</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="renovation">Renovation</option>
                    <option value="interior">Interior Design</option>
                    <option value="security">CC Camera Security</option>
                    <option value="electrical">Electrical Works</option>
                    <option value="painting">Painting Works</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1C1C1C] mb-1">Corporate Division</label>
                  <select
                    value={projDivisionId}
                    onChange={e => setProjDivisionId(e.target.value)}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-[#1C1C1C]"
                  >
                    {(divisions || []).map(div => (
                      <option key={div.id} value={div.id}>{div.shortName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#1C1C1C] mb-1">Location in Telangana</label>
                  <input
                    type="text"
                    placeholder="e.g. Hanamkonda, Warangal"
                    value={projLocation}
                    onChange={e => setProjLocation(e.target.value)}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-[#1C1C1C]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1C1C1C] mb-1">Built-Up Area</label>
                  <input
                    type="text"
                    placeholder="e.g. 3,500 sq.ft"
                    value={projArea}
                    onChange={e => setProjArea(e.target.value)}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-[#1C1C1C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#1C1C1C] mb-1">Project Cost / Value</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹65,00,000"
                    value={projCost}
                    onChange={e => setProjCost(e.target.value)}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-[#1C1C1C]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1C1C1C] mb-1">Completion Schedule</label>
                  <input
                    type="text"
                    placeholder="e.g. January 2026"
                    value={projCompletion}
                    onChange={e => setProjCompletion(e.target.value)}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-[#1C1C1C]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1C1C1C] mb-1">Finished Project Photo URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={projImage}
                  onChange={e => setProjImage(e.target.value)}
                  className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-[#1C1C1C]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1C1C1C] mb-1">Before / Raw Site Photo URL (Optional for Slider)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={projBeforeImage}
                  onChange={e => setProjBeforeImage(e.target.value)}
                  className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-[#1C1C1C]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1C1C1C] mb-1">Project Summary Description</label>
                <textarea
                  rows="3"
                  placeholder="Describe architectural style, RCC specifications, and client satisfaction..."
                  value={projDesc}
                  onChange={e => setProjDesc(e.target.value)}
                  className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl p-3 text-[#1C1C1C] outline-none resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewProjectModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#E8E8E5] text-[#1C1C1C] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingProject}
                  className="flex-1 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold shadow-md"
                >
                  {creatingProject ? 'Publishing...' : 'Publish to Portfolio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Material Order Dispatch Status Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FFFFFF] border border-neutral-200 rounded-3xl p-6 max-w-lg w-full text-[#1C1C1C] shadow-2xl space-y-4">
            <div className="flex justify-between items-start pb-3 border-b border-neutral-200">
              <div>
                <span className="text-[10px] text-[#737373] uppercase font-bold block">Update Material Order Dispatch</span>
                <h3 className="text-lg font-bold text-[#1C1C1C] font-mono">{selectedOrder.id}</h3>
                <p className="text-xs text-[#D97706] font-semibold">{selectedOrder.customerName} • {selectedOrder.phone}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-[#737373] hover:text-[#1C1C1C] p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveOrderStatus} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#1C1C1C] mb-1">Dispatch Pipeline Status</label>
                <select
                  value={newOrderStatus}
                  onChange={e => setNewOrderStatus(e.target.value)}
                  className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl px-3 py-2.5 text-[#1C1C1C] font-bold"
                >
                  <option value="Confirmed">1. Confirmed (Order validated at Central Logistics)</option>
                  <option value="Warehouse Packed">2. Warehouse Packed (Loaded into Tipper/Truck)</option>
                  <option value="Dispatched">3. Dispatched (En route to site)</option>
                  <option value="In Transit">4. In Transit (Driver on-road)</option>
                  <option value="Delivered">5. Delivered (Unloaded &amp; client signature received)</option>
                  <option value="Cancelled">6. Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1C1C1C] mb-1">Assigned Delivery Fleet / Driver</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh (Tata Ace TS-03-EB-4412) / Logistics Desk"
                  value={newOrderDriver}
                  onChange={e => setNewOrderDriver(e.target.value)}
                  className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl px-3 py-2 text-[#1C1C1C]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1C1C1C] mb-1">Dispatch Tracking Note</label>
                <textarea
                  rows="2"
                  placeholder="e.g. 120m HDPE pipe and tiles loaded on truck. Estimated site delivery 11:30 AM."
                  value={newOrderNote}
                  onChange={e => setNewOrderNote(e.target.value)}
                  className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl p-2.5 text-[#1C1C1C] resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-2.5 rounded-xl bg-[#E8E8E5] text-[#1C1C1C] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingOrderStatus}
                  className="flex-1 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] font-extrabold shadow-md"
                >
                  {updatingOrderStatus ? 'Updating...' : 'Save Order Status'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Profile Editor Modal */}
      <AdminProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

    </div>
  );
}
