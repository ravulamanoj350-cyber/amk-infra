const BASE_URL = '/api';

export const api = {
  // Company
  async getCompany() {
    const res = await fetch(`${BASE_URL}/company`);
    return res.json();
  },

  // Divisions (NEW: Corporate Divisions)
  async getDivisions() {
    const res = await fetch(`${BASE_URL}/divisions`);
    return res.json();
  },

  async getDivisionById(id) {
    const res = await fetch(`${BASE_URL}/divisions/${id}`);
    return res.json();
  },

  // Services
  async getServices(division = 'all') {
    const url = division && division !== 'all' ? `${BASE_URL}/services?division=${encodeURIComponent(division)}` : `${BASE_URL}/services`;
    const res = await fetch(url);
    return res.json();
  },

  async getServiceById(id) {
    const res = await fetch(`${BASE_URL}/services/${id}`);
    return res.json();
  },

  // Inquiries / Requests
  async createInquiry(payload) {
    const res = await fetch(`${BASE_URL}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async getInquiries(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/inquiries?${query}`);
    return res.json();
  },

  async getInquiryById(id) {
    const res = await fetch(`${BASE_URL}/inquiries/${id}`);
    return res.json();
  },

  async updateInquiryStatus(id, payload) {
    const res = await fetch(`${BASE_URL}/inquiries/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async deleteInquiry(id) {
    const res = await fetch(`${BASE_URL}/inquiries/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // Portfolio
  async getPortfolio(category = 'all', featured = false, division = 'all') {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (division && division !== 'all') params.append('division', division);
    if (featured) params.append('featured', 'true');
    const res = await fetch(`${BASE_URL}/portfolio?${params.toString()}`);
    return res.json();
  },

  async createPortfolioProject(payload) {
    const res = await fetch(`${BASE_URL}/portfolio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async updatePortfolioProject(id, payload) {
    const res = await fetch(`${BASE_URL}/portfolio/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async deletePortfolioProject(id) {
    const res = await fetch(`${BASE_URL}/portfolio/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // Testimonials
  async getTestimonials() {
    const res = await fetch(`${BASE_URL}/testimonials`);
    return res.json();
  },

  async createTestimonial(payload) {
    const res = await fetch(`${BASE_URL}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  // Stats
  async getStats() {
    const res = await fetch(`${BASE_URL}/stats`);
    return res.json();
  },

  // Cost Estimator
  async calculateEstimate(payload) {
    const res = await fetch(`${BASE_URL}/estimate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  // Mobile Sync Info
  async getMobileSyncInfo() {
    const res = await fetch(`${BASE_URL}/mobile-sync/info`);
    return res.json();
  },

  // Auth
  async loginAdmin(email, password) {
    const res = await fetch(`${BASE_URL}/auth/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async loginCustomer(identifier, password) {
    const res = await fetch(`${BASE_URL}/auth/customer-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });
    return res.json();
  },

  async registerCustomer(payload) {
    const res = await fetch(`${BASE_URL}/auth/customer-register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  // Careers & Recruitment
  async getCareersJobs(division = 'all') {
    const url = division && division !== 'all' ? `${BASE_URL}/careers/jobs?division=${encodeURIComponent(division)}` : `${BASE_URL}/careers/jobs`;
    const res = await fetch(url);
    return res.json();
  },

  async getCareerJobById(id) {
    const res = await fetch(`${BASE_URL}/careers/jobs/${id}`);
    return res.json();
  },

  async applyForJob(payload) {
    const res = await fetch(`${BASE_URL}/careers/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  // Tenders & RFP
  async getTendersPreQual() {
    const res = await fetch(`${BASE_URL}/tenders/pre-qual`);
    return res.json();
  },

  async submitTenderRfp(payload) {
    const res = await fetch(`${BASE_URL}/tenders/submit-rfp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  // Safety & Quality Lab
  async getSafetyQuality() {
    const res = await fetch(`${BASE_URL}/safety-quality`);
    return res.json();
  },

  // Staff & Field Crew DPR Logs
  async getStaffDprLogs() {
    const res = await fetch(`${BASE_URL}/staff/dpr`);
    return res.json();
  },

  async submitStaffDpr(payload) {
    const res = await fetch(`${BASE_URL}/staff/dpr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  // Photographic Feeds & Live Cameras (NEW)
  async getLiveCameras(division = 'all') {
    const url = division && division !== 'all' ? `${BASE_URL}/live-cameras?division=${encodeURIComponent(division)}` : `${BASE_URL}/live-cameras`;
    const res = await fetch(url);
    return res.json();
  },

  async getLiveCameraById(id) {
    const res = await fetch(`${BASE_URL}/live-cameras/${id}`);
    return res.json();
  },

  async getPhotoFeed(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/photo-feed?${query}`);
    return res.json();
  },

  async uploadPhotoFeed(payload) {
    const res = await fetch(`${BASE_URL}/photo-feed/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async getDroneReels() {
    const res = await fetch(`${BASE_URL}/drone-reels`);
    return res.json();
  },

  async getProjectTimelapses(division = 'all') {
    const url = division && division !== 'all' ? `${BASE_URL}/project-timelapses?division=${encodeURIComponent(division)}` : `${BASE_URL}/project-timelapses`;
    const res = await fetch(url);
    return res.json();
  },

  async getPanoramas() {
    const res = await fetch(`${BASE_URL}/panoramas`);
    return res.json();
  },

  // Products & Pipeline Materials Store
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/products${query ? `?${query}` : ''}`);
    return res.json();
  },

  async getProductById(id) {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    return res.json();
  },

  async createProductOrder(payload) {
    const res = await fetch(`${BASE_URL}/products/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async getProductOrders() {
    const res = await fetch(`${BASE_URL}/products/orders`);
    return res.json();
  },

  async updateProductOrderStatus(id, payload) {
    const res = await fetch(`${BASE_URL}/products/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async createProduct(payload) {
    const res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async updateProduct(id, payload) {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async deleteProduct(id) {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // Admin Profile Management
  async getAdminProfile() {
    const res = await fetch(`${BASE_URL}/admin/profile`);
    return res.json();
  },

  async updateAdminProfile(payload) {
    const res = await fetch(`${BASE_URL}/admin/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }
};

