import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

const INITIAL_DATA = {
  company: {
    name: "AMK INFRA",
    tagline: "Building Better Spaces, Reliable Services",
    taglineSecondary: "Your Vision, Our Commitment",
    founder: "A. Charan Patel",
    founderTitle: "Founder & Managing Director",
    phone: "9032477292",
    displayPhone: "+91 90324 77292",
    whatsapp: "919032477292",
    email: "contact@amkinfra.com",
    address: "Opp. Collectorate Office, Subedari, Hanamkonda, Warangal, Telangana - 506001",
    city: "Hanamkonda, Warangal",
    state: "Telangana, India",
    workingHours: "Mon - Sat: 8:30 AM - 8:00 PM | Sun: 10:00 AM - 4:00 PM",
    isoCertification: "ISO 9001:2015 Quality Certified Contractor",
    govtRegistration: "Telangana Class-I Registered Civil Contractor",
    about: "AMK INFRA is a premier multi-disciplinary infrastructure conglomerate in Telangana, structured into 7 specialized corporate divisions. From large-scale commercial civil engineering and custom luxury villas to heavy urban roadways, smart electrical grids, 4K AI security, turnkey interior architecture, and advanced surface waterproofing, we deliver engineering excellence with 100% milestone transparency.",
    stats: {
      completedProjects: "180+",
      happyClients: "250+",
      yearsExperience: "12+",
      onTimeDelivery: "100%",
      skilledEngineers: "45+",
      divisionsCount: "7 Specialized Wings"
    },
    coreValues: [
      { title: "Quality", desc: "Top-grade materials and uncompromising structural integrity tested to national standards.", icon: "ShieldCheck" },
      { title: "Trust", desc: "100% transparent cost estimates, milestone billing, and zero hidden charges.", icon: "Handshake" },
      { title: "Innovation", desc: "Modern architectural 3D modeling, advanced surveying, and sustainable techniques.", icon: "Lightbulb" },
      { title: "Commitment", desc: "Strict adherence to delivery timelines with dedicated project managers.", icon: "Clock" }
    ],
    whyChooseUs: [
      { id: 1, title: "7 Specialized Divisions", desc: "Dedicated engineering teams with specialized directors for every civil & interior discipline.", icon: "Layers" },
      { id: 2, title: "On-Time Project Delivery", desc: "Structured milestone schedules with penalty-backed delivery guarantees.", icon: "CalendarCheck" },
      { id: 3, title: "Affordable & Transparent Pricing", desc: "Itemized BOQ with competitive rate per sq.ft and no surprise overruns.", icon: "BadgeIndianRupee" },
      { id: 4, title: "Customer-Centric Approach", desc: "Regular WhatsApp video site updates, client review checkpoints, and 24/7 helpline.", icon: "HeartHandshake" },
      { id: 5, title: "End-to-End Solutions", desc: "From municipal permissions, plan approvals to foundation, interiors, and key handover.", icon: "CheckCircle2" },
      { id: 6, title: "One-Stop Conglomerate", desc: "Civil construction, interior fit-outs, CCTV security, electricals, and painting all under one roof.", icon: "Building2" },
      { id: 7, title: "Modern Machinery Fleet", desc: "Laser levels, automated concrete mixers, heavy-duty scaffolding, and vibration compactors.", icon: "Wrench" },
      { id: 8, title: "HSE Safe Work Process", desc: "Strict HSE safety protocols, worker insurance, and zero-accident site standards.", icon: "HardHat" }
    ]
  },
  divisions: [
    {
      id: "civil-commercial",
      code: "AMK-DIV-01",
      name: "Civil Infrastructure & Commercial Division",
      shortName: "Civil & Commercial",
      tagline: "Large-Scale RCC Structures, Commercial Complexes, G+5 Buildings & Industrial Units",
      badge: "Commercial & Civil Infrastructure",
      badgeColor: "amk-accent-blue",
      accentHex: "#3B82F6",
      icon: "Building2",
      heroImage: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80",
      divisionHead: "Er. Sandeep Goud",
      headTitle: "Chief Structural Engineer & Director of Civil Works",
      headPhone: "9032477292",
      headEmail: "civil@amkinfra.com",
      stats: {
        completedProjects: "64+",
        ongoingSites: "12",
        engineers: "18+",
        sqftConstructed: "8,50,000+ sq.ft"
      },
      keyCapabilities: [
        "High-Rise Commercial Towers & Shopping Plazas (G+5)",
        "Industrial Pre-Engineered Buildings (PEB) & Warehouses",
        "Fe-550 TMT Structural Steel Reinforcement & Soil Load Profiling",
        "GWMC & GHMC Fast-Track Building Plan Clearances & Approvals",
        "Automated Laser-Guided Grade & Column Plumb Alignment"
      ],
      equipmentFleet: [
        "Batching Plant RMC Concrete Mixers",
        "Multi-Tier Heavy Scaffolding Systems",
        "Digital Laser Level Alignment Station",
        "High-Frequency Concrete Needle Vibrators"
      ],
      certifications: ["ISO 9001:2015 Quality Certified", "BIS 456 Structural Standard Compliant"],
      serviceIds: ["construction"],
      startingPrice: "₹1,650 / sq.ft",
      turnaround: "6 - 14 Months"
    },
    {
      id: "residential-villas",
      code: "AMK-DIV-02",
      name: "Luxury Residential & Bespoke Villas Division",
      shortName: "Residential & Villas",
      tagline: "Bespoke Architect-Designed Custom Homes, Duplexes, Triplexes & Vastu Living",
      badge: "Custom Homes & Luxury Villas",
      badgeColor: "amk-amber-500",
      accentHex: "#F5A11E",
      icon: "Home",
      heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      divisionHead: "Ar. Radhika Varma",
      headTitle: "Principal Architect & Residential Wing Lead",
      headPhone: "9032477292",
      headEmail: "villas@amkinfra.com",
      stats: {
        completedProjects: "88+",
        ongoingSites: "15",
        engineers: "14+",
        sqftConstructed: "4,20,000+ sq.ft"
      },
      keyCapabilities: [
        "100% Vastu-Compliant 3D Architectural Space Planning",
        "Italian Marble, Teak Wood Joinery & UPVC Soundproof Glazing",
        "Terrace Infinity Gardens & Rainwater Recharge Chambers",
        "Custom Elevations: Contemporary, Ultra-Modern & Heritage Haveli",
        "Pre-Wired Smart Home Alexa Automation Infrastructure"
      ],
      equipmentFleet: [
        "Laser Floor Leveling Machines",
        "Precision Wet Tile & Marble Cutters",
        "Dust-Free Sanding Units",
        "Moisture Diagnostic Scanners"
      ],
      certifications: ["10-Year Structural Guarantee", "Vastu Certification Verified"],
      serviceIds: ["residential", "renovation"],
      startingPrice: "₹1,750 / sq.ft",
      turnaround: "5 - 10 Months"
    },
    {
      id: "infrastructure-public",
      code: "AMK-DIV-03",
      name: "Heavy Works, Roads & Urban Canals Division",
      shortName: "Infrastructure & Roads",
      tagline: "Heavy PWD Public Roads, Stormwater Box Canals, Culverts & Site Earthmoving",
      badge: "Heavy Civil & Municipal Works",
      badgeColor: "amk-navy-700",
      accentHex: "#143C66",
      icon: "Construction",
      heroImage: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=80",
      divisionHead: "Er. K. V. Raman",
      headTitle: "Infra Projects General Manager",
      headPhone: "9032477292",
      headEmail: "infrastructure@amkinfra.com",
      stats: {
        completedProjects: "32+",
        ongoingSites: "6",
        engineers: "12+",
        sqftConstructed: "48+ KMs Paved"
      },
      keyCapabilities: [
        "Concrete Cement (CC) & Bituminous (BT) Heavy Arterial Roads",
        "Underground Box Culverts & High-Flow Stormwater Channels",
        "Excavation, Site Grading & Heavy Earthmoving Operations",
        "Gated Community Internal Paved Infrastructure Networks",
        "Solar Streetlight Integration & Reinforced Retaining Walls"
      ],
      equipmentFleet: [
        "Hydraulic Excavators & JCB Fleet",
        "Heavy Vibratory Soil Compactor Rollers",
        "Pre-cast Concrete Box Drainage Molds",
        "Asphalt Paver & Bitumen Spraying Units"
      ],
      certifications: ["PWD Class-I Approved Contractor", "MoRTH Highway Compliance"],
      serviceIds: ["infrastructure"],
      startingPrice: "Custom Tender / BOQ",
      turnaround: "Project Based"
    },
    {
      id: "interiors-living",
      code: "AMK-DIV-04",
      name: "Luxury Living, Interiors & Turnkey Fitouts Division",
      shortName: "Interiors & Fitouts",
      tagline: "Turnkey Modular Living, Acrylic Kitchens, 3D VR Paneling & Acoustic Ceilings",
      badge: "Turnkey Luxury Interiors",
      badgeColor: "amk-accent-purple",
      accentHex: "#9333EA",
      icon: "Sparkles",
      heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      divisionHead: "V. Naveen",
      headTitle: "Creative Director & Turnkey Interior Head",
      headPhone: "9032477292",
      headEmail: "interiors@amkinfra.com",
      stats: {
        completedProjects: "110+",
        ongoingSites: "18",
        engineers: "16+",
        sqftConstructed: "3,10,000+ sq.ft"
      },
      keyCapabilities: [
        "Photorealistic 3D Renders & Virtual Reality Walkthroughs",
        "Factory-Precision CNC Cutting & Edge-Banded Modular Kitchens",
        "German Soft-Close Hardware (Hettich & Hafele Lifetime Warranty)",
        "Designer Gypsum False Ceilings with Warm Profile LED Ambient Lighting",
        "Acoustic Paneling, Custom Wardrobes & Pooja Mandir Fabrication"
      ],
      equipmentFleet: [
        "CNC Multi-Axis Wood Router Machines",
        "Automatic Edge-Banding Systems",
        "Laser Distance Meters & Levelers",
        "Pneumatic Brad Nailers & Staplers"
      ],
      certifications: ["BWP Grade 710 Marine Certified", "10-Year Hardware Guarantee"],
      serviceIds: ["interior"],
      startingPrice: "₹1,200 / sq.ft",
      turnaround: "4 - 8 Weeks"
    },
    {
      id: "power-automation",
      code: "AMK-DIV-05",
      name: "Electrical Grids, Power & Smart Automation Division",
      shortName: "Power & Automation",
      tagline: "3-Phase HT/LT Grids, Smart Home Automation, Industrial Panels & Solar",
      badge: "Smart Power & Electrical Grids",
      badgeColor: "amk-accent-purple",
      accentHex: "#8B5CF6",
      icon: "Zap",
      heroImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
      divisionHead: "K. Rajesh",
      headTitle: "Chief Electrical Contracting Specialist",
      headPhone: "9032477292",
      headEmail: "electrical@amkinfra.com",
      stats: {
        completedProjects: "140+",
        ongoingSites: "14",
        engineers: "10+",
        sqftConstructed: "100% Megger Certified"
      },
      keyCapabilities: [
        "Concealed FRLS Copper Wiring (Finolex/Polycab Certified)",
        "3-Phase Industrial Panel Boards with Schneider MCB/RCCB Protection",
        "Smart Home Alexa & Google Assistant Lighting/Fan Automation",
        "Chemical Copper Plate Earthing with Megger Resistance Audits",
        "Zero-Downtime Industrial Generator & Solar Hybrid Line Setup"
      ],
      equipmentFleet: [
        "Megger Insulation Resistance Testers",
        "Digital Earth Resistance Meters",
        "Wall Grooving Concrete Slot Cutters",
        "Thermal Imaging Load Cameras"
      ],
      certifications: ["Licensed Electrical Contractor 'A' Grade", "CEA Safety Standards"],
      serviceIds: ["electrical"],
      startingPrice: "₹45 / sq.ft (Labor + Conduits)",
      turnaround: "1 - 3 Weeks"
    },
    {
      id: "surveillance-security",
      code: "AMK-DIV-06",
      name: "Surveillance, AI Security & Shield Systems Division",
      shortName: "Security & CCTV",
      tagline: "4K AI Night Vision, Biometrics, Smart Locks, ANPR & 24/7 Monitoring",
      badge: "24/7 Smart Surveillance & Security",
      badgeColor: "amk-accent-green",
      accentHex: "#10B981",
      icon: "Camera",
      heroImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
      divisionHead: "R. Prashanth",
      headTitle: "Head of Surveillance & Electronic Security",
      headPhone: "9032477292",
      headEmail: "security@amkinfra.com",
      stats: {
        completedProjects: "210+",
        ongoingSites: "20",
        engineers: "8+",
        sqftConstructed: "1,200+ Cams Deployed"
      },
      keyCapabilities: [
        "5MP / 4K Ultra-HD Color Night-Vision IP Cameras (Hikvision/CP Plus)",
        "Automatic Number Plate Recognition (ANPR) for Gated Enclaves",
        "Encrypted 30-Day NVR Storage with Mobile App Multi-Stream Access",
        "Biometric Fingerprint & Facial Recognition Turnstile Systems",
        "Smart Video Door Phones & Remote Digital Lock Integration"
      ],
      equipmentFleet: [
        "CAT6/Fiber Optical Fusion Splicers",
        "CCTV Test Monitors & PoE Checkers",
        "RF Wireless Long-Range Bridges",
        "Cable Path Tracers"
      ],
      certifications: ["Authorized OEM Hikvision Partner", "Cyber-Secure Encryption Certified"],
      serviceIds: ["security"],
      startingPrice: "₹14,999 (4-Cam HD Kit)",
      turnaround: "1 - 2 Days"
    },
    {
      id: "surface-protection",
      code: "AMK-DIV-07",
      name: "Surface Protection, Royale Painting & Waterproofing Division",
      shortName: "Painting & Waterproofing",
      tagline: "Apex Ultima Weatherproof Coatings, Dr. Fixit Polyurethane Roof Seals & Royale",
      badge: "Surface & Structural Care",
      badgeColor: "amk-accent-red",
      accentHex: "#EF4444",
      icon: "PaintBucket",
      heroImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80",
      divisionHead: "M. Srinivas",
      headTitle: "Lead Coating Specialist & Waterproofing Engineer",
      headPhone: "9032477292",
      headEmail: "painting@amkinfra.com",
      stats: {
        completedProjects: "175+",
        ongoingSites: "22",
        engineers: "12+",
        sqftConstructed: "12,00,000+ sq.ft"
      },
      keyCapabilities: [
        "Asian Paints Royale Velvet Luxury Interior Wall Finishes",
        "Apex Ultima Anti-Fungal Weatherproof Exterior Coating",
        "Dr. Fixit Multi-Layer Polyurethane Roof Waterproofing (7-Year Guarantee)",
        "Digital Moisture Meter Wall Diagnostics & Epoxy Crack Injection",
        "Dust-Free Vacuum Sanding & Furniture Protective Masking"
      ],
      equipmentFleet: [
        "Airless High-Pressure Paint Sprayers",
        "Vacuum Orbital Sanding Machines",
        "Digital Moisture Meters",
        "High-Pressure Surface Washers"
      ],
      certifications: ["Dr. Fixit Certified Waterproofing Master", "Asian Paints Certified Pro"],
      serviceIds: ["painting"],
      startingPrice: "₹18 / sq.ft (Labor + Paint)",
      turnaround: "3 - 10 Days"
    }
  ],
  services: [
    {
      id: "construction",
      slug: "construction",
      divisionId: "civil-commercial",
      divisionName: "Civil Infrastructure & Commercial Division",
      title: "Construction (Residential, Commercial & Industrial)",
      shortDesc: "End-to-end civil construction for villas, commercial complexes, and industrial warehouses with premium structural engineering.",
      badge: "Commercial & Civil",
      badgeColor: "amk-accent-blue",
      accentHex: "#3B82F6",
      icon: "Building2",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80",
      featuredImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      startingPrice: "₹1,650 / sq.ft",
      duration: "6 - 14 Months",
      features: [
        "Architectural 2D/3D Elevations & Structural Drawings",
        "Soil Testing & Foundation Engineering",
        "Fe-550 TMT Steel & UltraTech/Birla Grade Cement",
        "Red Brick / AAC Block Masonry as per choice",
        "Municipal Building Permission Assistance (GHMC/GWMC)"
      ],
      scope: [
        "Site clearing, excavation & PCC foundation",
        "RCC columns, beams and slab casting with machine compaction",
        "Brickwork, internal & external plastering",
        "Plumbing, concealed electrical conduits, and vitrified tile flooring",
        "Anti-termite treatment with 10-year warranty"
      ]
    },
    {
      id: "residential",
      slug: "residential",
      divisionId: "residential-villas",
      divisionName: "Luxury Residential & Bespoke Villas Division",
      title: "Residential (Custom Home Building)",
      shortDesc: "Bespoke custom villas, independent homes, and duplexes designed to match your family's lifestyle, Vastu compliance, and comfort.",
      badge: "Custom Villas",
      badgeColor: "amk-amber-500",
      accentHex: "#F5A11E",
      icon: "Home",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      featuredImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      startingPrice: "₹1,750 / sq.ft",
      duration: "5 - 10 Months",
      features: [
        "100% Vastu-Compliant Space Planning",
        "Custom Elevations (Modern, Contemporary, Traditional)",
        "Italian Marble or Premium Vitrified Tile Flooring",
        "Teak Wood Main Doors & UPVC Windows",
        "Waterproofing & Terrace Heat-Proofing Included"
      ],
      scope: [
        "Personalized client architecture workshop",
        "Foundation, RCC frame structure and load-bearing walls",
        "Designer bathrooms with Jaguar/Kohler fittings",
        "Rainwater harvesting pit & septic tank construction",
        "Complete electrical switches (Legrand/Schneider) & plumbing"
      ]
    },
    {
      id: "infrastructure",
      slug: "infrastructure",
      divisionId: "infrastructure-public",
      divisionName: "Heavy Works, Roads & Urban Canals Division",
      title: "Infrastructure (Roads, Bridges & Drainage)",
      shortDesc: "Heavy civil infrastructure, CC/BT road construction, stormwater drainage systems, culverts, and municipal public works.",
      badge: "Heavy Civil",
      badgeColor: "amk-navy-700",
      accentHex: "#143C66",
      icon: "Construction",
      image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=80",
      featuredImage: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=80",
      startingPrice: "Custom Tender / BOQ",
      duration: "Project Based",
      features: [
        "Concrete Cement (CC) & Bituminous (BT) Roadways",
        "Underground Box Drains & Stormwater Channels",
        "Box Culverts, Retaining Walls & Embankments",
        "Heavy Earthmoving & Grading Equipment",
        "Strict PWD / National Highway Specifications"
      ],
      scope: [
        "Sub-base compaction, WMM and stone aggregate layering",
        "Paving grade ready-mix concrete with wire mesh reinforcement",
        "Pre-cast drainage canal installations",
        "Road kerbing, safety barriers, and solar streetlights",
        "Government contractor compliance & quality testing"
      ]
    },
    {
      id: "renovation",
      slug: "renovation",
      divisionId: "residential-villas",
      divisionName: "Luxury Residential & Bespoke Villas Division",
      title: "Renovation & Remodeling",
      shortDesc: "Transform existing residential and commercial properties with structural strengthening, layout redesign, and modern luxury finishes.",
      badge: "Modernization",
      badgeColor: "amk-accent-cyan",
      accentHex: "#06B6D4",
      icon: "Hammer",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      featuredImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      startingPrice: "₹450 / sq.ft",
      duration: "2 - 6 Weeks",
      features: [
        "Wall Demolition & Open-Concept Layout Remodeling",
        "Structural Retrofitting & Column Jacketing",
        "Bathroom & Kitchen Complete Overhaul",
        "Flooring Replacement & Wall Leveling",
        "Facade Face-Lift & Balcony Enclosures"
      ],
      scope: [
        "Structural health assessment by senior civil engineer",
        "Debris removal and site dust-shield isolation",
        "Plumbing line replacement with CPVC pipes",
        "New electrical rewiring for modern appliances",
        "Premium tile laying and fresh painting"
      ]
    },
    {
      id: "electrical",
      slug: "electrical",
      divisionId: "power-automation",
      divisionName: "Electrical Grids, Power & Smart Automation Division",
      title: "Electrical Works & Smart Power",
      shortDesc: "Comprehensive electrical contracting, 3-phase panels, industrial wiring, smart home automation, and solar backup systems.",
      badge: "Power & Automation",
      badgeColor: "amk-accent-purple",
      accentHex: "#8B5CF6",
      icon: "Zap",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
      featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      startingPrice: "₹45 / sq.ft (Labor + Conduits)",
      duration: "1 - 3 Weeks",
      features: [
        "Concealed FRLS Copper Wiring (Finolex/Polycab)",
        "Distribution Board & MCB/RCCB Protection (Schneider/L&T)",
        "Smart Home Alexa/Google Lighting & Fan Automation",
        "Inverter & Commercial Generator Backup Line Setup",
        "Earthing (Chemical/Copper Plate) with Megger Certification"
      ],
      scope: [
        "Load calculation and single-line diagram (SLD) engineering",
        "Wall groove cutting, conduit fixing, and junction boxes",
        "Wire pulling, color coding, and circuit segregation",
        "Switchboard mounting and architectural lighting fixture installation",
        "Safety trip and load endurance testing"
      ]
    },
    {
      id: "security",
      slug: "security",
      divisionId: "surveillance-security",
      divisionName: "Surveillance, AI Security & Shield Systems Division",
      title: "CC Camera & Security Installation",
      shortDesc: "High-definition IP surveillance cameras, biometric access control, video door phones, and smart intruder alarm systems.",
      badge: "24/7 Protection",
      badgeColor: "amk-accent-green",
      accentHex: "#10B981",
      icon: "Camera",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
      featuredImage: "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?auto=format&fit=crop&w=1200&q=80",
      startingPrice: "₹14,999 (4-Cam HD Kit Installed)",
      duration: "1 - 2 Days",
      features: [
        "5MP / 4K Ultra-HD Color Night-Vision Cameras (Hikvision/CP Plus)",
        "Mobile App Live Streaming & Two-Way Audio",
        "NVR / DVR Storage with 30-Day Auto Backup",
        "Motion Detection & AI Human/Vehicle Recognition Alerts",
        "Smart Video Door Phones & Digital Door Locks"
      ],
      scope: [
        "Security site survey to eliminate camera blind spots",
        "CAT6 outdoor shielded cabling & POE switches",
        "Camera mounting with weather-proof junction boxes",
        "Router port forwarding and mobile app setup for all family members",
        "1-Year On-Site Maintenance & Warranty"
      ]
    },
    {
      id: "interior",
      slug: "interior",
      divisionId: "interiors-living",
      divisionName: "Luxury Living, Interiors & Turnkey Fitouts Division",
      title: "Interior Design & Turnkey Fitouts",
      shortDesc: "Luxurious bespoke interiors, modular kitchens, custom wardrobes, designer false ceilings, and 3D photorealistic renderings.",
      badge: "Luxury Living",
      badgeColor: "amk-accent-purple",
      accentHex: "#9333EA",
      icon: "Sparkles",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      featuredImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      startingPrice: "₹1,200 / sq.ft",
      duration: "4 - 8 Weeks",
      features: [
        "3D Photorealistic Renders & VR Room Walkthroughs",
        "BWP Marine Ply (Century/Greenply) + Acrylic/PU Finish",
        "Soft-Close German Hardware (Hettich / Hafele)",
        "Gypsum False Ceiling with Warm LED Profile Lighting",
        "Custom TV Units, Bar Units & Pooja Mandir Fabrication"
      ],
      scope: [
        "Initial concept design & mood board curation",
        "Factory-precision CNC cutting & edge-banding for moisture resistance",
        "On-site assembly and structural alignment",
        "Lighting integration and wallpaper/veneer accents",
        "Deep cleaning and final styling handover"
      ]
    },
    {
      id: "painting",
      slug: "painting",
      divisionId: "surface-protection",
      divisionName: "Surface Protection, Royale Painting & Waterproofing Division",
      title: "Painting Works & Waterproofing",
      shortDesc: "Premium interior wall stylings, royal velvet finishes, weatherproof exterior coatings, and comprehensive roof waterproofing.",
      badge: "Aesthetic & Protection",
      badgeColor: "amk-accent-red",
      accentHex: "#EF4444",
      icon: "PaintBucket",
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80",
      featuredImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
      startingPrice: "₹18 / sq.ft (Labor + Paint)",
      duration: "3 - 10 Days",
      features: [
        "Asian Paints Royale / Apex Ultima & Berger Premium Paints",
        "Mechanized Sanding with Vacuum Dust Collection",
        "Waterproofing with Dr. Fixit Polyurethane Coatings",
        "Texture Walls, Stencils & Metallic Accent Finishes",
        "5-Year Paint Anti-Peel & Color-Fast Guarantee"
      ],
      scope: [
        "Moisture meter wall inspection & crack filling with epoxy putty",
        "2 coats of Birla White wall care putty application",
        "1 coat of primer + 2 coats of premium emulsion with roller finish",
        "Flooring & furniture masking protection before starting",
        "Post-painting thorough cleanup & gloss inspection"
      ]
    }
  ],
  portfolio: [
    {
      id: "proj-1",
      title: "Grand Royal 4BHK Villa",
      category: "residential",
      divisionId: "residential-villas",
      categoryLabel: "Residential Custom Homes",
      divisionLabel: "Luxury Residential & Bespoke Villas",
      location: "Ramnagar, Hanamkonda",
      area: "3,850 sq.ft",
      cost: "₹68,00,000",
      completionDate: "January 2026",
      client: "Dr. K. Srinivas Rao",
      description: "A luxury 3-storey contemporary villa featuring expansive double-height living room, imported Italian marble, terrace garden, and smart home automation.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      beforeImage: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1000&q=80",
      hasBeforeAfter: true,
      featured: true,
      highlights: ["G+2 Structure", "100% Vastu Compliant", "Italian Marble", "Solar 5KW"]
    },
    {
      id: "proj-2",
      title: "AMK Commercial Tower & Retail Complex",
      category: "construction",
      divisionId: "civil-commercial",
      categoryLabel: "Commercial Construction",
      divisionLabel: "Civil Infrastructure & Commercial",
      location: "Kazipet Main Road, Warangal",
      area: "14,500 sq.ft",
      cost: "₹2,10,00,000",
      completionDate: "November 2025",
      client: "Sri Balaji Group",
      description: "Modern commercial multi-tier structure with glass curtain wall facade, basement parking, high-speed elevator shafts, and fire hydrant safety network.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
      beforeImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
      hasBeforeAfter: true,
      featured: true,
      highlights: ["Basement + 4 Floors", "Glass Facade", "Fire Safety", "Elevator Setup"]
    },
    {
      id: "proj-3",
      title: "4-Lane Arterial Road & Storm Drainage",
      category: "infrastructure",
      divisionId: "infrastructure-public",
      categoryLabel: "Heavy Infrastructure",
      divisionLabel: "Heavy Works, Roads & Urban Canals",
      location: "Warangal Outer Ring Road Corridor",
      area: "3.2 Kilometers",
      cost: "₹1,45,00,000",
      completionDate: "December 2025",
      client: "Municipal Infrastructure Dept",
      description: "Heavy-duty concrete road with reinforced underground storm-water channels, paver footpaths, and high-durability culvert junctions.",
      image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1000&q=80",
      hasBeforeAfter: false,
      featured: true,
      highlights: ["M40 Concrete Grade", "Precast Drainage", "Solar Streetlights", "Zero Waterlogging"]
    },
    {
      id: "proj-4",
      title: "Modern Minimalist Penthouse Interior",
      category: "interior",
      divisionId: "interiors-living",
      categoryLabel: "Turnkey Interiors",
      divisionLabel: "Luxury Living & Interiors",
      location: "Nakkalagutta, Hanamkonda",
      area: "2,400 sq.ft",
      cost: "₹22,50,000",
      completionDate: "February 2026",
      client: "A. Madhusudhan Reddy",
      description: "Full turnkey interior transformation including custom acrylic modular kitchen with quartz counter, acoustic wooden paneling, and warm LED profile channels.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80",
      beforeImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
      hasBeforeAfter: true,
      featured: true,
      highlights: ["Hettich Hardware", "Quartz Countertops", "Profile LED", "3D Wall Paneling"]
    },
    {
      id: "proj-5",
      title: "Heritage Residence Restoration & Remodeling",
      category: "renovation",
      divisionId: "residential-villas",
      categoryLabel: "Renovation",
      divisionLabel: "Luxury Residential & Bespoke Villas",
      location: "Subedari, Hanamkonda",
      area: "2,900 sq.ft",
      cost: "₹28,00,000",
      completionDate: "October 2025",
      client: "V. Raghunath",
      description: "Complete structural strengthening and modernization of a 30-year-old house into a sleek open-floor contemporary residence without altering foundation.",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80",
      beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
      hasBeforeAfter: true,
      featured: false,
      highlights: ["Open Plan Living", "Jacketing Columns", "Modern Bathrooms", "UPVC French Doors"]
    },
    {
      id: "proj-6",
      title: "Industrial 48-Cam Smart CCTV & Access Hub",
      category: "security",
      divisionId: "surveillance-security",
      categoryLabel: "Surveillance & AI Security",
      divisionLabel: "Surveillance & Shield Systems",
      location: "Kakatiya Mega Textile Park, Warangal",
      area: "4.5 Acre Facility",
      cost: "₹6,80,000",
      completionDate: "December 2025",
      client: "Apex Agro Industries",
      description: "High-definition IP surveillance grid with AI perimeter intrusion detection, automatic number plate recognition (ANPR), and biometric access turnstiles.",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1000&q=80",
      hasBeforeAfter: false,
      featured: false,
      highlights: ["4K Night Vision", "ANPR License Cam", "Biometric Access", "Centralized NOC"]
    },
    {
      id: "proj-7",
      title: "Turnkey 3-Phase Industrial Power & Substation",
      category: "electrical",
      divisionId: "power-automation",
      categoryLabel: "Electrical & Smart Automation",
      divisionLabel: "Electrical Grids & Smart Power",
      location: "Rampally Industrial Zone",
      area: "12,000 sq.ft Plant",
      cost: "₹18,50,000",
      completionDate: "January 2026",
      client: "Telangana Engineering Works",
      description: "Complete HT/LT panel installation, copper earthing pits, bus-duct wiring, and automatic load changeover generators for zero-downtime manufacturing.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80",
      hasBeforeAfter: false,
      featured: false,
      highlights: ["Schneider Panels", "100kVA Transformer Line", "FRLS Industrial Cabling", "Megger Tested"]
    },
    {
      id: "proj-8",
      title: "Weatherproof Apex Ultima & Roof Waterproofing",
      category: "painting",
      divisionId: "surface-protection",
      categoryLabel: "Painting & Waterproofing",
      divisionLabel: "Surface Protection & Waterproofing",
      location: "Waddepally Lake View Estates",
      area: "5,200 sq.ft Surface",
      cost: "₹3,40,000",
      completionDate: "February 2026",
      client: "M. Ramachandra",
      description: "Multi-layered elastomeric weatherproof exterior coating with Dr. Fixit roof polyurethane leak prevention, guaranteed against monsoons for 7 years.",
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1000&q=80",
      hasBeforeAfter: false,
      featured: false,
      highlights: ["Apex Ultima", "Polyurethane Coating", "7-Year Warranty", "Dust Repellent"]
    }
  ],
  inquiries: [
    {
      id: "AMK-2026-1042",
      customerName: "Suresh Reddy",
      phone: "9848022334",
      email: "suresh.reddy@gmail.com",
      serviceCategory: "residential",
      divisionId: "residential-villas",
      divisionName: "Luxury Residential & Bespoke Villas Division",
      serviceTitle: "Residential (Custom Home Building)",
      projectType: "3BHK Luxury Duplex Villa (G+1)",
      location: "Hunter Road, Hanamkonda",
      siteSize: "2,400 sq.ft Plot (3,100 sq.ft Built-up)",
      budgetRange: "₹45 Lakh - ₹55 Lakh",
      timeline: "Within 6 Months",
      details: "Planning to construct a custom duplex home with East-facing entrance. Need full architectural drawings, structural calculation, and premium finishes.",
      status: "Quoted",
      statusNote: "Detailed BOQ estimation of ₹48.5L shared via WhatsApp and PDF quote. Site visit conducted on 14th Feb.",
      estimatedQuote: "₹48,50,000",
      assignedEngineer: "Er. Sandeep Goud (Civil Lead)",
      createdAt: "2026-02-10T10:30:00.000Z",
      updatedAt: "2026-02-14T15:20:00.000Z",
      history: [
        { status: "Received", time: "2026-02-10T10:30:00.000Z", note: "Online request submitted via AMK Portal." },
        { status: "Contacted", time: "2026-02-11T11:00:00.000Z", note: "A. Charan Patel called client to schedule initial site inspection." },
        { status: "Quoted", time: "2026-02-14T15:20:00.000Z", note: "Architectural plan & itemized estimate of ₹48,50,000 delivered." }
      ]
    },
    {
      id: "AMK-2026-1088",
      customerName: "Rajeshwari Sharma",
      phone: "9440188721",
      email: "rajeshwari.sharma@yahoo.com",
      serviceCategory: "interior",
      divisionId: "interiors-living",
      divisionName: "Luxury Living, Interiors & Turnkey Fitouts Division",
      serviceTitle: "Interior Design & Turnkey Fitouts",
      projectType: "Complete Interior for 3BHK Apartment",
      location: "Balasamudram, Hanamkonda",
      siteSize: "1,850 sq.ft Flat",
      budgetRange: "₹7 Lakh - ₹10 Lakh",
      timeline: "Immediately",
      details: "Need modular kitchen with acrylic finish, master bedroom wardrobe with loft, and gypsum false ceiling with warm lighting.",
      status: "In Progress",
      statusNote: "Carpentry framing & factory CNC cutting completed. On-site installation and electrical fitouts underway.",
      estimatedQuote: "₹8,20,000",
      assignedEngineer: "V. Naveen (Interior Head)",
      createdAt: "2026-01-28T09:15:00.000Z",
      updatedAt: "2026-02-18T16:45:00.000Z",
      history: [
        { status: "Received", time: "2026-01-28T09:15:00.000Z", note: "Inquiry received for interior package." },
        { status: "Contacted", time: "2026-01-29T10:00:00.000Z", note: "Design catalog shared on WhatsApp." },
        { status: "Quoted", time: "2026-02-02T14:30:00.000Z", note: "3D Renders and ₹8,20,000 estimate approved by client." },
        { status: "In Progress", time: "2026-02-08T09:00:00.000Z", note: "Material delivered to site, assembly started." }
      ]
    },
    {
      id: "AMK-2026-1120",
      customerName: "Venkat Rao",
      phone: "9989012345",
      email: "venkat.rao@kakatagro.com",
      serviceCategory: "security",
      divisionId: "surveillance-security",
      divisionName: "Surveillance, AI Security & Shield Systems Division",
      serviceTitle: "CC Camera & Security Installation",
      projectType: "Commercial Warehouse 16-Cam Setup",
      location: "Kakatiya Industrial Estate, Warangal",
      siteSize: "8,000 sq.ft Warehouse",
      budgetRange: "₹1 Lakh - ₹2 Lakh",
      timeline: "Completed",
      details: "Required 16 full-color night vision IP cameras, CAT6 shielded wiring, and mobile monitoring for 3 directors.",
      status: "Completed",
      statusNote: "All 16 cameras tested, NVR configured, mobile apps synced on client devices. Warranty card handed over.",
      estimatedQuote: "₹1,45,000",
      assignedEngineer: "R. Prashanth (Security Specialist)",
      createdAt: "2026-01-15T11:20:00.000Z",
      updatedAt: "2026-01-20T17:00:00.000Z",
      history: [
        { status: "Received", time: "2026-01-15T11:20:00.000Z", note: "Inquiry logged." },
        { status: "Contacted", time: "2026-01-15T14:00:00.000Z", note: "Site survey completed." },
        { status: "Quoted", time: "2026-01-16T12:00:00.000Z", note: "Quotation of ₹1,45,000 accepted." },
        { status: "In Progress", time: "2026-01-18T09:00:00.000Z", note: "Wiring and mounting completed." },
        { status: "Completed", time: "2026-01-20T17:00:00.000Z", note: "System handed over with 1-year service warranty." }
      ]
    },
    {
      id: "AMK-2026-1155",
      customerName: "K. Srinivas",
      phone: "9849567890",
      email: "ksrinivas.civil@gmail.com",
      serviceCategory: "infrastructure",
      divisionId: "infrastructure-public",
      divisionName: "Heavy Works, Roads & Urban Canals Division",
      serviceTitle: "Infrastructure (Roads, Bridges & Drainage)",
      projectType: "Gated Community Internal CC Road & Storm Drain",
      location: "Kazipet Extension, Warangal",
      siteSize: "600 Running Meters",
      budgetRange: "₹25 Lakh - ₹35 Lakh",
      timeline: "Within 2 Months",
      details: "Internal concrete road paving and dual-side precast box drainage for a 40-plot residential layout.",
      status: "Contacted",
      statusNote: "Site topography survey scheduled with A. Charan Patel for coming Saturday.",
      estimatedQuote: "Pending Survey",
      assignedEngineer: "Er. K. V. Raman",
      createdAt: "2026-02-16T08:45:00.000Z",
      updatedAt: "2026-02-16T11:15:00.000Z",
      history: [
        { status: "Received", time: "2026-02-16T08:45:00.000Z", note: "New infrastructure tender inquiry registered." },
        { status: "Contacted", time: "2026-02-16T11:15:00.000Z", note: "Discussed layout blueprints and scheduled leveling survey." }
      ]
    },
    {
      id: "AMK-2026-1199",
      customerName: "Anita Varma",
      phone: "9177234567",
      email: "anita.varma@outlook.com",
      serviceCategory: "painting",
      divisionId: "surface-protection",
      divisionName: "Surface Protection, Royale Painting & Waterproofing Division",
      serviceTitle: "Painting Works & Waterproofing",
      projectType: "Complete Interior & Exterior Repainting",
      location: "Kishanpura, Hanamkonda",
      siteSize: "2,200 sq.ft Independent House",
      budgetRange: "₹1 Lakh - ₹2 Lakh",
      timeline: "Next 2 Weeks",
      details: "Water seepage on terrace requires Dr. Fixit treatment, plus Asian Paints Royale for all bedrooms.",
      status: "Received",
      statusNote: "New customer inquiry received. Notification alert sent to admin.",
      estimatedQuote: "Under Evaluation",
      assignedEngineer: "M. Srinivas (Coating Specialist)",
      createdAt: "2026-02-18T14:10:00.000Z",
      updatedAt: "2026-02-18T14:10:00.000Z",
      history: [
        { status: "Received", time: "2026-02-18T14:10:00.000Z", note: "Inquiry submitted online. Tracking code assigned." }
      ]
    }
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Dr. K. Srinivas Rao",
      role: "Homeowner, 4BHK Villa",
      location: "Ramnagar, Hanamkonda",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      content: "AMK INFRA and A. Charan Patel delivered our dream home right on schedule. The structural quality, marble finishing, and Vastu compliance exceeded all our expectations. Charan garu’s transparent billing and daily WhatsApp video updates gave us complete peace of mind.",
      serviceTag: "Residential Construction",
      divisionTag: "Luxury Residential & Bespoke Villas",
      verified: true
    },
    {
      id: "test-2",
      name: "V. Madhusudhan Reddy",
      role: "Managing Director, Sri Balaji Group",
      location: "Kazipet, Warangal",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      content: "We partnered with AMK INFRA for our 4-storey commercial shopping complex in Kazipet. Their engineering expertise, modern machinery, and swift municipal clearance assistance saved us months of delay. Truly Warangal's most dependable construction firm.",
      serviceTag: "Commercial Construction",
      divisionTag: "Civil Infrastructure & Commercial",
      verified: true
    },
    {
      id: "test-3",
      name: "Rajeshwari Sharma",
      role: "Architect & Homeowner",
      location: "Balasamudram, Hanamkonda",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      content: "The interior team transformed our 3BHK flat with factory-precision modular woodwork and gorgeous ambient lighting. Charan Patel and his team were polite, meticulous, and delivered a showroom-grade finish within our exact budget.",
      serviceTag: "Interior Design",
      divisionTag: "Luxury Living & Turnkey Interiors",
      verified: true
    },
    {
      id: "test-4",
      name: "P. Raghava Rao",
      role: "Warehouse Operations Head",
      location: "Kakatiya Industrial Area",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      content: "From 32-camera IP CCTV installation to 3-phase heavy industrial power panels, AMK INFRA executed the entire project with zero downtime to our factory. Super responsive after-sales support.",
      serviceTag: "Electrical & Security",
      divisionTag: "Surveillance & Smart Power",
      verified: true
    }
  ],
  careersJobs: [
    {
      id: "JOB-CIVIL-01",
      divisionId: "civil-commercial",
      divisionName: "Civil Infrastructure & Commercial Division",
      title: "Senior Structural Project Engineer (RCC & High-Rise)",
      location: "Warangal & Hanamkonda, Telangana",
      type: "Full-Time • On-Site",
      experience: "4 - 8 Years",
      salaryRange: "₹6.5 - ₹10.5 LPA + Performance Incentives",
      openings: 3,
      department: "Structural Engineering",
      summary: "Lead multi-storey RCC commercial & residential structural execution, bar bending schedules (BBS), laser plumb alignment, and concrete cube quality tests.",
      requirements: [
        "B.Tech / M.Tech in Civil Engineering with strong site execution track record.",
        "Proficiency in AutoCAD, STAAD.Pro / ETABS, and bar-bending calculations.",
        "Experience managing field sub-contractors, concrete batching, and GWMC/GHMC compliance.",
        "Strict adherence to IS 456 & IS 13920 seismic ductile detailing codes."
      ],
      perks: [
        "Provident Fund (PF) + Medical Insurance Coverage (₹5 Lakh family floater)",
        "Zero-LTI Site Safety Completion Bonuses",
        "Continuous CPD Engineering Certification Sponsorship",
        "Company Site Vehicle & Fuel Allowance"
      ]
    },
    {
      id: "JOB-ARCH-02",
      divisionId: "residential-villas",
      divisionName: "Luxury Residential & Bespoke Villas Division",
      title: "Lead Architect & 3D BIM Visualization Specialist",
      location: "Hanamkonda HQ Office",
      type: "Full-Time • Hybrid",
      experience: "3 - 6 Years",
      salaryRange: "₹5.5 - ₹9.0 LPA + Design Royalty",
      openings: 2,
      department: "Architectural Design",
      summary: "Create bespoke Vastu-compliant villa floorplans, photorealistic 3D Lumion/V-Ray walkthroughs, and executive client presentations.",
      requirements: [
        "B.Arch from a recognized COA accredited institute.",
        "Mastery in Revit BIM, SketchUp, Lumion 2024, V-Ray, and Adobe Suite.",
        "Deep knowledge of Vastu Shastra space planning principles.",
        "Strong portfolio of modern contemporary and luxury Indian villas."
      ],
      perks: [
        "High-performance NVIDIA RTX workstation setup & VR headsets",
        "Annual architectural study tour & design conferences sponsorship",
        "Client project sign-off performance incentives",
        "Comprehensive health & wellness coverage"
      ]
    },
    {
      id: "JOB-INFRA-03",
      divisionId: "infrastructure-public",
      divisionName: "Heavy Works, Roads & Urban Canals Division",
      title: "Heavy Infra Site Manager & PWD Tender Quality Lead",
      location: "Warangal Outer Ring Road & Municipal Corridors",
      type: "Full-Time • Field",
      experience: "5 - 10 Years",
      salaryRange: "₹7.0 - ₹12.0 LPA + Field Perks",
      openings: 2,
      department: "Heavy Civil Works",
      summary: "Direct heavy road grading, CC/BT paving, pre-cast box canal installations, hydraulic earthmoving fleet deployment, and PWD quality inspection dossiers.",
      requirements: [
        "Diploma or B.Tech in Civil / Highway Engineering.",
        "Hands-on experience in M40 paving, asphalt mixing plants, and drainage excavation.",
        "Proficiency in MoRTH specifications, total station surveying, and soil compaction testing.",
        "Proven leadership managing 50+ on-site machinery operators and field crews."
      ],
      perks: [
        "Site hardship allowance & monthly mobile/travel reimbursement",
        "Accidental death & disability insurance (₹25 Lakh)",
        "Overtime compensation & project milestone delivery bonuses",
        "Company accommodation for outstation highway stretches"
      ]
    },
    {
      id: "JOB-INT-04",
      divisionId: "interiors-living",
      divisionName: "Luxury Living, Interiors & Turnkey Fitouts Division",
      title: "Turnkey Interior Site Supervisor & Modular Specialist",
      location: "Hanamkonda & Kazipet Sites",
      type: "Full-Time • On-Site",
      experience: "2 - 5 Years",
      salaryRange: "₹4.2 - ₹6.8 LPA",
      openings: 4,
      department: "Interior Execution",
      summary: "Oversee precision CNC woodwork installation, Hafele/Hettich hardware fitting, gypsum false ceilings, profile LED ambient lighting, and acrylic finishes.",
      requirements: [
        "Diploma in Interior Design / Civil / Woodworking Technology.",
        "Experience reading detailed CAD millwork drawings & elevation sections.",
        "Familiarity with BWP marine ply grades, edge-banding, and PU paint inspection.",
        "Sharp eye for millimeter gap alignments and scratch-free handover."
      ],
      perks: [
        "Factory training on advanced German woodworking machinery",
        "Performance incentives on every client 5-star handover",
        "Medical insurance & annual paid leave package"
      ]
    },
    {
      id: "JOB-ELEC-05",
      divisionId: "power-automation",
      divisionName: "Electrical Grids, Power & Smart Automation Division",
      title: "Electrical Project Engineer & Smart Home Specialist",
      location: "Warangal Urban Sites",
      type: "Full-Time • Field",
      experience: "3 - 7 Years",
      salaryRange: "₹4.8 - ₹7.5 LPA",
      openings: 2,
      department: "Power & Automation",
      summary: "Execute 3-phase industrial panel board installations, copper bus-bar layout, Megger insulation audits, and Alexa/KNX smart lighting automation.",
      requirements: [
        "Diploma / B.Tech in Electrical & Electronics Engineering (EEE).",
        "Valid Electrical Supervisor License 'A' Grade (TS Licensing Board).",
        "Experience in single line diagrams (SLD), Schneider MCB/RCCB sizing, and earthing pits.",
        "Hands-on configuration of IoT smart switches and Wi-Fi relay controllers."
      ],
      perks: [
        "Full safety PPE & Fluke digital testing meter kit provided",
        "Certification sponsorship for KNX / Schneider Automation",
        "Group health insurance & safety performance bonus"
      ]
    },
    {
      id: "JOB-SAFE-06",
      divisionId: "civil-commercial",
      divisionName: "Civil Infrastructure & Commercial Division",
      title: "Site Quality & HSE Safety Auditor (NABL Standards)",
      location: "All AMK Site Locations",
      type: "Full-Time • Field & Lab",
      experience: "3 - 6 Years",
      salaryRange: "₹5.0 - ₹8.0 LPA",
      openings: 2,
      department: "Quality & Safety",
      summary: "Conduct daily toolbox talks, manage NABL concrete cube crushing tests, slump checks, ultrasonic pulse velocity audits, and zero-incident enforcement.",
      requirements: [
        "B.Sc / B.Tech with NEBOSH / IOSH / OSHA Safety Certification.",
        "Knowledge of ISO 9001:2015 and ISO 45001:2018 audit standards.",
        "Experience managing field QA/QC registers and non-conformance reports (NCR).",
        "Zero-tolerance mindset for hazardous unshielded work."
      ],
      perks: [
        "Direct reporting to Managing Director A. Charan Patel",
        "Quarterly Zero-LTI safety leadership awards",
        "Health insurance, fuel allowance & mobile reimbursement"
      ]
    }
  ],
  careerApplications: [],
  tenders: {
    contractorClass: "Telangana Class-I Registered Infrastructure Contractor",
    registrationNo: "TS-PWD-CL1-2018-8842",
    bankSolvencyCapacity: "₹25.00 Crore (State Bank of India Consortium)",
    epfEsiRegistration: "100% EPF & ESIC Compliant for 450+ Workforce",
    gstin: "36AAKFA9842C1Z5",
    pan: "AAKFA9842C",
    nablQualityLab: "In-House NABL Accredited Materials & Concrete Testing Facility",
    certifications: [
      { code: "ISO 9001:2015", title: "Quality Management Systems in Civil & Turnkey Infrastructure", authority: "TUV SUD India" },
      { code: "ISO 45001:2018", title: "Occupational Health & Safety Management Systems", authority: "Bureau Veritas" },
      { code: "ISO 14001:2015", title: "Environmental Management Systems & Green Construction", authority: "Intertek" },
      { code: "RERA TS Approved", title: "Telangana Real Estate Regulatory Authority Compliant", authority: "Govt of Telangana" }
    ],
    machineryFleet: [
      { name: "Hydraulic Excavators (JCB 3DX & Tata Hitachi EX200)", qty: "8 Units", owned: true },
      { name: "Vibratory Soil Compactor Rollers (10-Ton Escorts/L&T)", qty: "4 Units", owned: true },
      { name: "Batching Plant Ready-Mix Transit Mixers (6 Cu.m)", qty: "6 Units", owned: true },
      { name: "Laser-Guided Concrete Screed & Total Station Surveyors", qty: "12 Sets", owned: true },
      { name: "Multi-Tier Heavy Steel Cuplock Scaffolding", qty: "1,50,000 sq.ft Capacity", owned: true },
      { name: "Drone LiDAR & 4K Aerial Telemetry Units (DJI Enterprise)", qty: "3 Units", owned: true }
    ],
    landmarkContracts: [
      { name: "Kakatiya Mega Textile Park Internal Road & Storm Box Drainage", value: "₹4.85 Crore", authority: "TSIIC / PWD Telangana", status: "Delivered Ahead of Schedule" },
      { name: "Warangal Smart City Outer Corridor Paving & Precast Culverts", value: "₹6.20 Crore", authority: "GWMC Smart City Corp", status: "100% Quality Audited" },
      { name: "Sri Balaji Commercial 5-Storey Tower & Retail Plaza", value: "₹2.10 Crore", authority: "Private Commercial RFP", status: "Handed Over (Zero Defect)" }
    ]
  },
  tenderSubmissions: [],
  safetyQuality: {
    safeManHours: "1,280,000+ Safe Man-Hours",
    lostTimeInjuryRate: "0.00 LTI (Zero Lost Time Incident Record)",
    qualityPassRate: "99.8% First-Pass NABL Cube Test Clearance",
    activeSitesAudited: "100% Bi-Weekly Safety & QA Site Inspections",
    testingParameters: [
      { test: "Compressive Strength (7 & 28 Days)", standard: "IS 516 / IS 456", target: "M25: ≥25 N/mm² | M40: ≥40 N/mm²", result: "100% Passed" },
      { test: "Concrete Slump Consistency", standard: "IS 1199", target: "100 - 120 mm (Pumping Grade)", result: "Optimal Workability" },
      { test: "TMT Steel Yield & Tensile Rebar", standard: "IS 1786 (Fe-550D)", target: "Yield Strength ≥550 N/mm²", result: "Certified Primary Mills" },
      { test: "Moisture & Seepage Diagnostics", standard: "Digital Non-Destructive Probe", target: "< 12% Moisture in Plaster", result: "Zero Seepage Barrier" }
    ]
  },
  staffDprLogs: [
    {
      id: "DPR-2026-088",
      siteCode: "AMK-SITE-COMM-02",
      siteName: "Kazipet Commercial Shopping Tower",
      divisionId: "civil-commercial",
      supervisorName: "Er. Sandeep Goud",
      date: "2026-02-18",
      weather: "Clear / 31°C",
      workforceCount: 38,
      machineryRunning: "RMC Transit Mixer, Concrete Boom Pump, 3 Vibrators",
      activitiesCompleted: "Poured 110 cu.m M30 grade concrete for 3rd floor slab casting. Slump checked at 115mm. 12 test cubes cast for 7-day lab crushing.",
      safetyToolboxTopic: "Working at Heights: Full-body harness tie-off & perimeter safety netting verification.",
      incidentReported: "None. Zero hazard logged.",
      status: "Verified by MD"
    },
    {
      id: "DPR-2026-089",
      siteCode: "AMK-SITE-VILLA-07",
      siteName: "Ramnagar Luxury 4BHK Villa",
      divisionId: "residential-villas",
      supervisorName: "Ar. Radhika Varma",
      date: "2026-02-18",
      weather: "Clear / 30°C",
      workforceCount: 18,
      machineryRunning: "Laser Floor Leveler, Precision Marble Wet Saw",
      activitiesCompleted: "Completed Italian marble floor dry-lay and laser leveling in ground floor double-height living room. Concealed UPVC window framing anchored.",
      safetyToolboxTopic: "Dust suppression and protective eye goggles during wet marble cutting.",
      incidentReported: "None. Clean site maintained.",
      status: "Verified by MD"
    }
  ],
  liveCameras: [
    {
      id: "CAM-WGL-01",
      name: "Warangal Commercial Tech Hub RCC",
      location: "Hunter Road, Warangal",
      divisionId: "civil-commercial",
      divisionName: "Civil Infrastructure & Commercial",
      status: "LIVE STREAMING",
      photo: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=85",
      thumbnail: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=400&q=80",
      stage: "Level 4 Slab & Column Reinforcement",
      weather: "31°C Clear / Humidity 42%",
      gps: "17.9689° N, 79.5941° E",
      crewCount: 34,
      progress: 68,
      elevation: "+18.4m",
      supervisor: "Er. Sandeep Goud",
      fps: 30,
      activeMachinery: "Concrete Transit Mixer, Boom Pump",
      lensType: "Wide 24mm F/2.8 4K",
      panAngle: "North-West 310°"
    },
    {
      id: "CAM-HNK-02",
      name: "Horizon Grand Luxury Duplex Villa",
      location: "Greenwood Colony, Hanamkonda",
      divisionId: "residential-villas",
      divisionName: "Luxury Residential & Villas",
      status: "LIVE STREAMING",
      photo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
      stage: "Exterior Glass Balustrades & Landscaping",
      weather: "30°C Sunny / 0 km/h Wind",
      gps: "18.0125° N, 79.5512° E",
      crewCount: 16,
      progress: 92,
      elevation: "+9.2m",
      supervisor: "Ar. Radhika Varma",
      fps: 30,
      activeMachinery: "Laser Leveler, Wet Tile Saw",
      lensType: "Telephoto 70mm F/4.0",
      panAngle: "East 90°"
    },
    {
      id: "CAM-HWY-03",
      name: "Telangana Corridor Heavy Box Canal",
      location: "NH-163 Outer Bypass Corridor",
      divisionId: "infrastructure-public",
      divisionName: "Heavy Roads & Public Infrastructure",
      status: "LIVE STREAMING",
      photo: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=85",
      thumbnail: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80",
      stage: "Precast Concrete Culvert Alignment & Compaction",
      weather: "33°C Dry / Wind 12 km/h",
      gps: "17.8841° N, 79.6210° E",
      crewCount: 28,
      progress: 75,
      elevation: "Grade Level 0.0m",
      supervisor: "Er. K. Venkat Reddy",
      fps: 30,
      activeMachinery: "JCB 3DX Excavator, 10T Vibratory Roller",
      lensType: "Ultra-Wide 16mm F/2.8",
      panAngle: "South-West 225°"
    },
    {
      id: "CAM-INT-04",
      name: "Penthouse Italian Marble & Architectural Wood",
      location: "Subedari VIP Enclave, Hanamkonda",
      divisionId: "interiors-living",
      divisionName: "Turnkey Interiors & Architecture",
      status: "LIVE STREAMING",
      photo: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
      thumbnail: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=400&q=80",
      stage: "Bespoke Acoustic Paneling & Recessed LED",
      weather: "Indoor Climate 24°C",
      gps: "18.0089° N, 79.5644° E",
      crewCount: 12,
      progress: 88,
      elevation: "+14.0m",
      supervisor: "Ar. Sneha Rao",
      fps: 30,
      activeMachinery: "Festool Dustless Router, Laser Align",
      lensType: "Cine Prime 35mm T/1.5",
      panAngle: "Interior 360° Axis"
    },
    {
      id: "CAM-SEC-05",
      name: "Madikonda Smart Security & Solar NOC",
      location: "IT SEZ, Madikonda, Warangal",
      divisionId: "surveillance-security",
      divisionName: "4K CCTV & Security Infrastructure",
      status: "LIVE STREAMING",
      photo: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1600&q=85",
      thumbnail: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80",
      stage: "Optical Fiber Splicing & AI NVR Server Rack Mount",
      weather: "31°C Clear",
      gps: "17.9312° N, 79.4890° E",
      crewCount: 8,
      progress: 95,
      elevation: "NOC Control Deck",
      supervisor: "Er. Ramesh Naidu",
      fps: 30,
      activeMachinery: "Fusion Splicer, OTDR Fiber Tester",
      lensType: "Fixed Dome 4K AI PTZ",
      panAngle: "North 0°"
    }
  ],
  photoFeed: [
    {
      id: "PHOTO-001",
      title: "Warangal Commercial Tower Skyward RCC Columns",
      divisionId: "civil-commercial",
      category: "Civil Construction",
      stage: "RCC Superstructure",
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=85",
      caption: "High-grade M35 concrete casting with Fe-550 TMT steel rebar cage.",
      date: "2026-02-19",
      location: "Hunter Road, Warangal",
      featured: true,
      dimensions: "4K UHD"
    },
    {
      id: "PHOTO-002",
      title: "Bespoke Contemporary 5BHK Villa Facade",
      divisionId: "residential-villas",
      category: "Luxury Residential",
      stage: "Handover Ready",
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
      caption: "Cantilevered luxury balcony, exterior teak cladding, and mood perimeter lights.",
      date: "2026-02-15",
      location: "Ramnagar, Hanamkonda",
      featured: true,
      dimensions: "4K UHD"
    },
    {
      id: "PHOTO-003",
      title: "Modern Glass Facade Retail Plaza Handover",
      divisionId: "civil-commercial",
      category: "Commercial Civil",
      stage: "Completed",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
      caption: "Double-glazed acoustic curtain walling with solar reflective tint.",
      date: "2026-02-10",
      location: "Kazipet Junction, Warangal",
      featured: true,
      dimensions: "4K UHD"
    },
    {
      id: "PHOTO-004",
      title: "NH Outer Bypass Heavy Canal Culvert Compaction",
      divisionId: "infrastructure-public",
      category: "Heavy Roads",
      stage: "Earthworks & Paving",
      imageUrl: "https://images.unsplash.com/photo-1584463699039-3882a0b16892?auto=format&fit=crop&w=1600&q=85",
      caption: "Class-I heavy pavement grading and precast box culvert storm drainage.",
      date: "2026-02-12",
      location: "NH-163 Warangal Outer Ring",
      featured: true,
      dimensions: "4K UHD"
    },
    {
      id: "PHOTO-005",
      title: "Minimalist Italian Statuario Marble Great Room",
      divisionId: "interiors-living",
      category: "Turnkey Interiors",
      stage: "Finished Interior",
      imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
      caption: "Custom book-matched marble flooring, flush LED profiles, and architectural veneers.",
      date: "2026-02-14",
      location: "Subedari, Hanamkonda",
      featured: true,
      dimensions: "4K UHD"
    },
    {
      id: "PHOTO-006",
      title: "High-Efficiency 25kW Rooftop Solar Hybrid Array",
      divisionId: "power-automation",
      category: "Power & Automation",
      stage: "Commissioned",
      imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1600&q=85",
      caption: "Mono-PERC solar photovoltaic panels integrated with automatic net-metering switchgear.",
      date: "2026-02-08",
      location: "Kakatiya Industrial Estate",
      featured: false,
      dimensions: "4K UHD"
    },
    {
      id: "PHOTO-007",
      title: "4K Smart Perimeter Optical AI Surveillance Grid",
      divisionId: "surveillance-security",
      category: "Security Infrastructure",
      stage: "Active 24/7",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85",
      caption: "High-resolution AI PTZ security cameras monitoring entry portals with facial recognition.",
      date: "2026-02-06",
      location: "Madikonda IT Corridor",
      featured: false,
      dimensions: "4K UHD"
    },
    {
      id: "PHOTO-008",
      title: "Elastomeric 5-Layer Waterproof Thermal Coating",
      divisionId: "surface-protection",
      category: "Waterproofing & Paint",
      stage: "Completed & Cured",
      imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1600&q=85",
      caption: "UV-resistant polyurethane membrane tested for 10-year zero seepage warranty.",
      date: "2026-02-04",
      location: "Balasamudram, Hanamkonda",
      featured: false,
      dimensions: "4K UHD"
    }
  ],
  droneReels: [
    {
      id: "DRONE-01",
      title: "Aerial 4K Survey: 18-Acre Commercial Complex",
      altitude: "120m AGL",
      gps: "17.9689° N, 79.5941° E",
      photo: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85",
      divisionId: "civil-commercial",
      date: "2026-02-18",
      flightDuration: "24 Mins",
      sensor: "Hasselblad 4/3 CMOS 20MP"
    },
    {
      id: "DRONE-02",
      title: "Aerial Orthomosaic: NH-163 Canal Corridor",
      altitude: "150m AGL",
      gps: "17.8841° N, 79.6210° E",
      photo: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=85",
      divisionId: "infrastructure-public",
      date: "2026-02-16",
      flightDuration: "35 Mins",
      sensor: "RTK Precision LiDAR Drone"
    }
  ],
  projectTimelapses: [
    {
      id: "TL-01",
      projectTitle: "Sri Balaji Commercial 5-Storey Tower",
      location: "Kazipet Junction, Warangal",
      divisionId: "civil-commercial",
      totalMonths: 11,
      cost: "₹2.10 Crore",
      steps: [
        {
          phase: "Month 1: Soil Piling & Foundation RCC",
          photo: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
          notes: "Excavated 12m deep basement with automated dewatering and pile load testing."
        },
        {
          phase: "Month 4: G+3 Frame & Fe-550 Steel Slabs",
          photo: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80",
          notes: "Automated batching plant casting 180 cu.m concrete per floor slab cycle."
        },
        {
          phase: "Month 8: Aerated AAC Block Masonry & Electricals",
          photo: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
          notes: "Laser-aligned conduits, fire sprinkler piping, and high-speed elevator shafts."
        },
        {
          phase: "Month 11: Glass Curtain Wall Handover",
          photo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
          notes: "100% occupancy certificate and client key handover achieved 14 days ahead of schedule."
        }
      ]
    },
    {
      id: "TL-02",
      projectTitle: "Ramnagar Luxury Custom 4BHK Villa",
      location: "Ramnagar, Hanamkonda",
      divisionId: "residential-villas",
      totalMonths: 7,
      cost: "₹68 Lakh",
      steps: [
        {
          phase: "Month 1: Vastu Layout & Plinth Beam Casting",
          photo: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80",
          notes: "Anti-termite chemical soil injection and heavy stone masonry plinth."
        },
        {
          phase: "Month 3: Duplex Double Height Slabs & Cantilevers",
          photo: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
          notes: "Post-tensioned cantilevered balconies and high-ceiling structural frame."
        },
        {
          phase: "Month 5: Italian Marble & UPVC Double Glazing",
          photo: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
          notes: "Laser-leveled marble flooring with 0.5mm precision seamless epoxy joints."
        },
        {
          phase: "Month 7: Finished Luxury Villa Handover",
          photo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
          notes: "Landscaped courtyard, modular German kitchen, and smart home automation live."
        }
      ]
    }
  ],
  panoramas: [
    {
      id: "PANO-01",
      title: "Double-Height Grand Living Room (360°)",
      location: "Ramnagar Villa",
      divisionId: "interiors-living",
      photo: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90",
      fov: 90
    },
    {
      id: "PANO-02",
      title: "Commercial Atrium & Sky Lounge (360°)",
      location: "Warangal Tech Hub",
      divisionId: "civil-commercial",
      photo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=90",
      fov: 85
    }
  ]
};

// Initialize file if not existing or outdated
function getDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
      return INITIAL_DATA;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    let dirty = false;

    // Ensure divisions exist in loaded DB
    if (!parsed.divisions || parsed.divisions.length === 0) {
      parsed.divisions = INITIAL_DATA.divisions;
      dirty = true;
    }
    if (!parsed.liveCameras || parsed.liveCameras.length === 0) {
      parsed.liveCameras = INITIAL_DATA.liveCameras;
      dirty = true;
    }
    if (!parsed.photoFeed || parsed.photoFeed.length === 0) {
      parsed.photoFeed = INITIAL_DATA.photoFeed;
      dirty = true;
    }
    if (!parsed.droneReels || parsed.droneReels.length === 0) {
      parsed.droneReels = INITIAL_DATA.droneReels;
      dirty = true;
    }
    if (!parsed.projectTimelapses || parsed.projectTimelapses.length === 0) {
      parsed.projectTimelapses = INITIAL_DATA.projectTimelapses;
      dirty = true;
    }
    if (!parsed.panoramas || parsed.panoramas.length === 0) {
      parsed.panoramas = INITIAL_DATA.panoramas;
      dirty = true;
    }
    if (!parsed.careersJobs || parsed.careersJobs.length === 0) {
      parsed.careersJobs = INITIAL_DATA.careersJobs;
      dirty = true;
    }
    if (!parsed.tenders) {
      parsed.tenders = INITIAL_DATA.tenders;
      dirty = true;
    }
    if (!parsed.safetyQuality) {
      parsed.safetyQuality = INITIAL_DATA.safetyQuality;
      dirty = true;
    }
    if (!parsed.staffDprLogs || parsed.staffDprLogs.length === 0) {
      parsed.staffDprLogs = INITIAL_DATA.staffDprLogs;
      dirty = true;
    }
    if (!parsed.careerApplications) {
      parsed.careerApplications = [];
      dirty = true;
    }
    if (!parsed.products || parsed.products.length === 0) {
      parsed.products = [];
      dirty = true;
    }
    if (!parsed.productOrders) {
      parsed.productOrders = [];
      dirty = true;
    }
    if (!parsed.adminProfile) {
      parsed.adminProfile = {
        name: "A. Charan Patel",
        title: "Founder & Managing Director",
        email: "admin@amkinfra.com",
        phone: "9032477292",
        avatar: "/assets/logo.png",
        officeAddress: "Opp. Collectorate Office, Subedari, Hanamkonda, Warangal, Telangana - 506001",
        bio: "Leading AMK INFRA with 12+ years of engineering rigor across 7 specialized corporate divisions. Committed to on-time milestone delivery, Class-I standards, and client trust.",
        role: "Super Admin",
        lastActive: "Just now"
      };
      dirty = true;
    }

    if (dirty) {
      fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
    }
    return parsed;
  } catch (err) {
    console.error('Error reading db.json, returning initial data', err);
    return INITIAL_DATA;
  }
}

function saveDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing db.json', err);
    return false;
  }
}

export const db = {
  get: getDb,
  save: saveDb,
  INITIAL_DATA
};
