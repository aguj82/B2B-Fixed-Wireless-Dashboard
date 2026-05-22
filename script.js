// Targets and mock data
const TARGETS = {
  availability: 99.5,
  lossP95: 0.5,
  latencyP95: 80,
};

const customers = [
  // ── Enterprise (Cisco / Ericsson) ──────────────────────────────────────────
  {
    name: "Acme Logistics",
    region: "west",
    site: "Seattle Hub",
    vendor: "cisco",
    technology: "5g",
    availability: 99.72,
    lossP95: 0.32,
    latencyP95: 68,
    usageTb: 42.5,
  },
  {
    name: "Bright Retail Group",
    region: "west",
    site: "Portland Edge",
    vendor: "ericsson",
    technology: "4g",
    availability: 99.61,
    lossP95: 0.38,
    latencyP95: 74,
    usageTb: 63.8,
  },
  {
    name: "CityCare Clinics",
    region: "central",
    site: "Denver Core",
    vendor: "cisco",
    technology: "5g",
    availability: 99.88,
    lossP95: 0.18,
    latencyP95: 54,
    usageTb: 57.1,
  },
  {
    // ⚠ WARN – central / Ericsson 4G — good drill-down target
    name: "NorthSteel Manufacturing",
    region: "central",
    site: "Kansas City",
    vendor: "ericsson",
    technology: "4g",
    availability: 99.31,
    lossP95: 0.58,
    latencyP95: 85,
    usageTb: 38.4,
  },
  {
    name: "OmniBank Branch Network",
    region: "east",
    site: "Philadelphia",
    vendor: "cisco",
    technology: "4g",
    availability: 99.63,
    lossP95: 0.42,
    latencyP95: 72,
    usageTb: 71.9,
  },
  {
    // 🔴 BREACH – east / Ericsson 4G — primary alert for ops team
    name: "MetroPublic Services",
    region: "east",
    site: "Richmond",
    vendor: "ericsson",
    technology: "4g",
    availability: 98.61,
    lossP95: 1.4,
    latencyP95: 108,
    usageTb: 29.7,
  },
  {
    name: "Horizon Media Offices",
    region: "west",
    site: "San Jose",
    vendor: "cisco",
    technology: "4g",
    availability: 99.58,
    lossP95: 0.34,
    latencyP95: 72,
    usageTb: 51.0,
  },
  {
    name: "EduConnect Campuses",
    region: "east",
    site: "Boston",
    vendor: "cisco",
    technology: "5g",
    availability: 99.62,
    lossP95: 0.41,
    latencyP95: 71,
    usageTb: 46.3,
  },
  {
    name: "UrbanGrid Utilities",
    region: "central",
    site: "St. Louis",
    vendor: "ericsson",
    technology: "5g",
    availability: 99.65,
    lossP95: 0.33,
    latencyP95: 64,
    usageTb: 34.2,
  },
  // ── Residential / SMB (Inseego 5G) ────────────────────────────────────────
  {
    name: "Pacific Connect Co.",
    region: "west",
    site: "LA Metro",
    vendor: "inseego",
    technology: "5g",
    availability: 99.42,
    lossP95: 0.49,
    latencyP95: 76,
    usageTb: 18.6,
  },
  {
    name: "SunCoast Shops",
    region: "west",
    site: "San Diego Edge",
    vendor: "inseego",
    technology: "5g",
    availability: 99.54,
    lossP95: 0.42,
    latencyP95: 72,
    usageTb: 12.3,
  },
  {
    // ⚠ WARN – rural central Inseego coverage gap
    name: "Plains Rural Network",
    region: "central",
    site: "Omaha Hub",
    vendor: "inseego",
    technology: "5g",
    availability: 99.11,
    lossP95: 0.66,
    latencyP95: 87,
    usageTb: 9.8,
  },
  {
    name: "NewWave Residences",
    region: "east",
    site: "Charlotte",
    vendor: "inseego",
    technology: "5g",
    availability: 99.38,
    lossP95: 0.51,
    latencyP95: 79,
    usageTb: 14.1,
  },
  {
    name: "Coastal SMB Group",
    region: "east",
    site: "Miami East",
    vendor: "inseego",
    technology: "5g",
    availability: 99.58,
    lossP95: 0.37,
    latencyP95: 69,
    usageTb: 11.7,
  },
  // ── SuperBroadband (5G + Satellite) ───────────────────────────────────────
  // vendor = 5G equipment vendor; satelliteVendor = satellite leg vendor
  {
    name: "MedGroup Hospitals",
    region: "west",
    site: "Phoenix Hub",
    vendor: "cisco",
    satelliteVendor: "starlink",
    technology: "hybrid",
    availability: 99.83,
    lossP95: 0.18,
    latencyP95: 52,
    usageTb: 88.4,
  },
  {
    name: "FinanceNet Corp",
    region: "east",
    site: "New York DC",
    vendor: "ericsson",
    satelliteVendor: "starlink",
    technology: "hybrid",
    availability: 99.79,
    lossP95: 0.21,
    latencyP95: 54,
    usageTb: 112.3,
  },
  {
    name: "RetailCore Network",
    region: "central",
    site: "Dallas Prime",
    vendor: "cisco",
    satelliteVendor: "starlink",
    technology: "hybrid",
    availability: 99.77,
    lossP95: 0.22,
    latencyP95: 57,
    usageTb: 95.1,
  },
  {
    name: "EnergyGrid Solutions",
    region: "west",
    site: "Sacramento",
    vendor: "ericsson",
    satelliteVendor: "starlink",
    technology: "hybrid",
    availability: 99.81,
    lossP95: 0.17,
    latencyP95: 50,
    usageTb: 76.8,
  },
  {
    // ⚠ WARN – just below 99.7% SuperBroadband SLA commitment
    name: "MultiSite Logistics",
    region: "east",
    site: "Atlanta Hub",
    vendor: "cisco",
    satelliteVendor: "starlink",
    technology: "hybrid",
    availability: 99.48,
    lossP95: 0.38,
    latencyP95: 78,
    usageTb: 68.2,
  },
];

const REGION_BASELINES = {
  west: { availability: 99.60, lossP95: 0.38, latencyP95: 68 },
  central: { availability: 99.38, lossP95: 0.52, latencyP95: 78 },
  east: { availability: 99.48, lossP95: 0.44, latencyP95: 72 },
};

const TECH_LABELS = {
  all: "All access",
  "4g": "4G/LTE",
  "5g": "5G",
  "hybrid": "Hybrid Access",
};

const VENDOR_LABELS = {
  cisco: "Cisco",
  ericsson: "Ericsson",
  inseego: "Inseego",
  starlink: "Starlink",
};

const PRODUCTS = [
  {
    id: "smb",
    name: "Small/Medium Business",
    availability: 99.51,
    lossP95: 0.43,
    latencyP95: 75,
    slaWithin: 92,
    monthly: [
      { month: "Jan", availability: { p50: 99.38, p95: 99.72, mean: 99.48 }, loss: { p50: 0.42, p95: 0.72, mean: 0.48 }, latency: { p50: 70, p95: 88, mean: 76 } },
      { month: "Feb", availability: { p50: 99.40, p95: 99.74, mean: 99.50 }, loss: { p50: 0.40, p95: 0.70, mean: 0.46 }, latency: { p50: 69, p95: 87, mean: 75 } },
      { month: "Mar", availability: { p50: 99.35, p95: 99.70, mean: 99.44 }, loss: { p50: 0.46, p95: 0.76, mean: 0.52 }, latency: { p50: 72, p95: 90, mean: 78 } },
      { month: "Apr", availability: { p50: 99.44, p95: 99.76, mean: 99.52 }, loss: { p50: 0.38, p95: 0.68, mean: 0.44 }, latency: { p50: 70, p95: 87, mean: 75 } },
      { month: "May", availability: { p50: 99.50, p95: 99.80, mean: 99.58 }, loss: { p50: 0.36, p95: 0.64, mean: 0.42 }, latency: { p50: 68, p95: 85, mean: 74 } },
      { month: "Jun", availability: { p50: 99.48, p95: 99.78, mean: 99.56 }, loss: { p50: 0.38, p95: 0.66, mean: 0.44 }, latency: { p50: 69, p95: 85, mean: 74 } },
      { month: "Jul", availability: { p50: 99.42, p95: 99.74, mean: 99.50 }, loss: { p50: 0.42, p95: 0.72, mean: 0.48 }, latency: { p50: 71, p95: 88, mean: 76 } },
      { month: "Aug", availability: { p50: 99.40, p95: 99.72, mean: 99.48 }, loss: { p50: 0.44, p95: 0.74, mean: 0.50 }, latency: { p50: 72, p95: 89, mean: 77 } },
      { month: "Sep", availability: { p50: 99.46, p95: 99.78, mean: 99.54 }, loss: { p50: 0.38, p95: 0.66, mean: 0.44 }, latency: { p50: 70, p95: 86, mean: 75 } },
      { month: "Oct", availability: { p50: 99.54, p95: 99.82, mean: 99.60 }, loss: { p50: 0.34, p95: 0.62, mean: 0.40 }, latency: { p50: 68, p95: 84, mean: 73 } },
      { month: "Nov", availability: { p50: 99.52, p95: 99.80, mean: 99.58 }, loss: { p50: 0.36, p95: 0.64, mean: 0.42 }, latency: { p50: 69, p95: 85, mean: 74 } },
    ],
    carriers: {
      "4g": { availability: 99.38, lossP95: 0.52, latencyP95: 80, slaWithin: 88 },
      "5g": { availability: 99.62, lossP95: 0.34, latencyP95: 69, slaWithin: 95 },
    },
    customers: [
      { name: "Bank", slaWithin: 90, availability: 99.52, lossP95: 0.42, latencyP95: 76, status: "improved" },
      { name: "Healthcare provider", slaWithin: 92, availability: 99.56, lossP95: 0.38, latencyP95: 74, status: "improved" },
      { name: "Coffee chain", slaWithin: 88, availability: 99.46, lossP95: 0.48, latencyP95: 78, status: "improved" },
      { name: "Retail chain", slaWithin: 94, availability: 99.60, lossP95: 0.36, latencyP95: 72, status: "improved" },
      { name: "Production house", slaWithin: 91, availability: 99.54, lossP95: 0.40, latencyP95: 75, status: "improved" },
      { name: "Manufacturer", slaWithin: 87, availability: 99.44, lossP95: 0.48, latencyP95: 79, status: "steady" },
      { name: "Public agency", slaWithin: 93, availability: 99.62, lossP95: 0.34, latencyP95: 71, status: "improved" },
      { name: "College", slaWithin: 89, availability: 99.48, lossP95: 0.46, latencyP95: 77, status: "steady" },
      { name: "School", slaWithin: 93, availability: 99.60, lossP95: 0.36, latencyP95: 73, status: "improved" },
    ],
    regions: {
      west: { availability: 99.58, lossP95: 0.38, latencyP95: 74, slaWithin: 93 },
      central: { availability: 99.42, lossP95: 0.48, latencyP95: 78, slaWithin: 89 },
      east: { availability: 99.52, lossP95: 0.41, latencyP95: 76, slaWithin: 92 },
    },
    vendors: {
      cisco: { availability: 99.60, lossP95: 0.36, latencyP95: 72, slaWithin: 94 },
      ericsson: { availability: 99.44, lossP95: 0.49, latencyP95: 78, slaWithin: 89 },
      inseego: { availability: 99.22, lossP95: 0.61, latencyP95: 81, slaWithin: 83 },
    },
  },
  {
    id: "enterprise",
    name: "Enterprise Internet",
    availability: 99.44,
    lossP95: 0.42,
    latencyP95: 74,
    slaWithin: 91,
    monthly: [
      { month: "Jan", availability: { p50: 99.32, p95: 99.78, mean: 99.45 }, loss: { p50: 0.4, p95: 0.7, mean: 0.48 }, latency: { p50: 70, p95: 88, mean: 75 } },
      { month: "Feb", availability: { p50: 99.36, p95: 99.8, mean: 99.48 }, loss: { p50: 0.38, p95: 0.68, mean: 0.46 }, latency: { p50: 69, p95: 86, mean: 74 } },
      { month: "Mar", availability: { p50: 99.34, p95: 99.76, mean: 99.46 }, loss: { p50: 0.42, p95: 0.72, mean: 0.5 }, latency: { p50: 71, p95: 87, mean: 75 } },
      { month: "Apr", availability: { p50: 99.38, p95: 99.8, mean: 99.5 }, loss: { p50: 0.36, p95: 0.66, mean: 0.44 }, latency: { p50: 69, p95: 85, mean: 73 } },
      { month: "May", availability: { p50: 99.42, p95: 99.82, mean: 99.54 }, loss: { p50: 0.34, p95: 0.64, mean: 0.42 }, latency: { p50: 68, p95: 84, mean: 72 } },
      { month: "Jun", availability: { p50: 99.4, p95: 99.8, mean: 99.52 }, loss: { p50: 0.36, p95: 0.66, mean: 0.44 }, latency: { p50: 69, p95: 85, mean: 73 } },
      { month: "Jul", availability: { p50: 99.36, p95: 99.76, mean: 99.48 }, loss: { p50: 0.4, p95: 0.7, mean: 0.46 }, latency: { p50: 70, p95: 86, mean: 74 } },
      { month: "Aug", availability: { p50: 99.34, p95: 99.74, mean: 99.46 }, loss: { p50: 0.42, p95: 0.72, mean: 0.48 }, latency: { p50: 71, p95: 87, mean: 75 } },
      { month: "Sep", availability: { p50: 99.4, p95: 99.8, mean: 99.52 }, loss: { p50: 0.36, p95: 0.64, mean: 0.44 }, latency: { p50: 69, p95: 84, mean: 73 } },
      { month: "Oct", availability: { p50: 99.46, p95: 99.84, mean: 99.56 }, loss: { p50: 0.32, p95: 0.62, mean: 0.4 }, latency: { p50: 67, p95: 82, mean: 71 } },
      { month: "Nov", availability: { p50: 99.44, p95: 99.82, mean: 99.54 }, loss: { p50: 0.34, p95: 0.64, mean: 0.42 }, latency: { p50: 68, p95: 83, mean: 72 } },
    ],
    carriers: {
      "4g": { availability: 99.32, lossP95: 0.52, latencyP95: 79, slaWithin: 88 },
      "5g": { availability: 99.56, lossP95: 0.34, latencyP95: 69, slaWithin: 93 },
    },
    customers: [
      { name: "Bank", slaWithin: 92, availability: 99.5, lossP95: 0.32, latencyP95: 72, status: "improved" },
      { name: "Healthcare provider", slaWithin: 90, availability: 99.42, lossP95: 0.38, latencyP95: 76, status: "steady" },
      { name: "Coffee chain", slaWithin: 88, availability: 99.36, lossP95: 0.44, latencyP95: 78, status: "steady" },
      { name: "Retail chain", slaWithin: 94, availability: 99.58, lossP95: 0.3, latencyP95: 70, status: "improved" },
      { name: "Production house", slaWithin: 91, availability: 99.46, lossP95: 0.4, latencyP95: 74, status: "improved" },
      { name: "Manufacturer", slaWithin: 89, availability: 99.4, lossP95: 0.42, latencyP95: 76, status: "steady" },
      { name: "Public agency", slaWithin: 93, availability: 99.52, lossP95: 0.36, latencyP95: 72, status: "improved" },
      { name: "College", slaWithin: 87, availability: 99.34, lossP95: 0.46, latencyP95: 79, status: "failing" },
      { name: "School", slaWithin: 90, availability: 99.44, lossP95: 0.4, latencyP95: 74, status: "steady" },
    ],
    regions: {
      west: { availability: 99.5, lossP95: 0.36, latencyP95: 72, slaWithin: 93 },
      central: { availability: 99.42, lossP95: 0.44, latencyP95: 76, slaWithin: 90 },
      east: { availability: 99.46, lossP95: 0.38, latencyP95: 73, slaWithin: 92 },
    },
    vendors: {
      cisco: { availability: 99.54, lossP95: 0.34, latencyP95: 71, slaWithin: 94 },
      ericsson: { availability: 99.38, lossP95: 0.46, latencyP95: 77, slaWithin: 88 },
    },
  },
  {
    id: "government",
    name: "Government Internet",
    availability: 99.36,
    lossP95: 0.48,
    latencyP95: 76,
    slaWithin: 89,
    monthly: [
      { month: "Jan", availability: { p50: 99.28, p95: 99.7, mean: 99.4 }, loss: { p50: 0.46, p95: 0.78, mean: 0.52 }, latency: { p50: 72, p95: 88, mean: 76 } },
      { month: "Feb", availability: { p50: 99.3, p95: 99.72, mean: 99.42 }, loss: { p50: 0.44, p95: 0.76, mean: 0.5 }, latency: { p50: 71, p95: 87, mean: 75 } },
      { month: "Mar", availability: { p50: 99.26, p95: 99.68, mean: 99.38 }, loss: { p50: 0.48, p95: 0.8, mean: 0.54 }, latency: { p50: 73, p95: 89, mean: 77 } },
      { month: "Apr", availability: { p50: 99.32, p95: 99.72, mean: 99.44 }, loss: { p50: 0.42, p95: 0.74, mean: 0.5 }, latency: { p50: 72, p95: 87, mean: 75 } },
      { month: "May", availability: { p50: 99.36, p95: 99.74, mean: 99.46 }, loss: { p50: 0.4, p95: 0.72, mean: 0.48 }, latency: { p50: 71, p95: 86, mean: 74 } },
      { month: "Jun", availability: { p50: 99.34, p95: 99.72, mean: 99.44 }, loss: { p50: 0.42, p95: 0.74, mean: 0.5 }, latency: { p50: 72, p95: 86, mean: 75 } },
      { month: "Jul", availability: { p50: 99.3, p95: 99.7, mean: 99.4 }, loss: { p50: 0.46, p95: 0.78, mean: 0.52 }, latency: { p50: 72, p95: 87, mean: 76 } },
      { month: "Aug", availability: { p50: 99.28, p95: 99.68, mean: 99.38 }, loss: { p50: 0.48, p95: 0.8, mean: 0.54 }, latency: { p50: 73, p95: 88, mean: 77 } },
      { month: "Sep", availability: { p50: 99.34, p95: 99.72, mean: 99.44 }, loss: { p50: 0.42, p95: 0.74, mean: 0.5 }, latency: { p50: 72, p95: 86, mean: 75 } },
      { month: "Oct", availability: { p50: 99.4, p95: 99.76, mean: 99.5 }, loss: { p50: 0.38, p95: 0.7, mean: 0.46 }, latency: { p50: 70, p95: 85, mean: 73 } },
      { month: "Nov", availability: { p50: 99.38, p95: 99.74, mean: 99.48 }, loss: { p50: 0.4, p95: 0.72, mean: 0.48 }, latency: { p50: 71, p95: 85, mean: 74 } },
    ],
    carriers: {
      "4g": { availability: 99.24, lossP95: 0.58, latencyP95: 82, slaWithin: 86 },
      "5g": { availability: 99.48, lossP95: 0.38, latencyP95: 71, slaWithin: 92 },
    },
    customers: [
      { name: "Bank", slaWithin: 90, availability: 99.44, lossP95: 0.4, latencyP95: 74, status: "improved" },
      { name: "Healthcare provider", slaWithin: 88, availability: 99.36, lossP95: 0.46, latencyP95: 76, status: "steady" },
      { name: "Coffee chain", slaWithin: 86, availability: 99.28, lossP95: 0.5, latencyP95: 78, status: "steady" },
      { name: "Retail chain", slaWithin: 91, availability: 99.5, lossP95: 0.38, latencyP95: 72, status: "improved" },
      { name: "Production house", slaWithin: 89, availability: 99.4, lossP95: 0.44, latencyP95: 75, status: "steady" },
      { name: "Manufacturer", slaWithin: 87, availability: 99.32, lossP95: 0.48, latencyP95: 77, status: "failing" },
      { name: "Public agency", slaWithin: 92, availability: 99.54, lossP95: 0.36, latencyP95: 71, status: "improved" },
      { name: "College", slaWithin: 86, availability: 99.3, lossP95: 0.5, latencyP95: 79, status: "failing" },
      { name: "School", slaWithin: 88, availability: 99.36, lossP95: 0.46, latencyP95: 75, status: "steady" },
    ],
    regions: {
      west: { availability: 99.42, lossP95: 0.44, latencyP95: 74, slaWithin: 91 },
      central: { availability: 99.32, lossP95: 0.52, latencyP95: 79, slaWithin: 87 },
      east: { availability: 99.36, lossP95: 0.48, latencyP95: 75, slaWithin: 89 },
    },
    vendors: {
      cisco: { availability: 99.48, lossP95: 0.4, latencyP95: 73, slaWithin: 92 },
      ericsson: { availability: 99.3, lossP95: 0.52, latencyP95: 78, slaWithin: 86 },
    },
  },
  {
    id: "education",
    name: "Education Internet",
    availability: 99.18,
    lossP95: 0.62,
    latencyP95: 84,
    slaWithin: 84,
    monthly: [
      { month: "Jan", availability: { p50: 99.06, p95: 99.52, mean: 99.18 }, loss: { p50: 0.6, p95: 0.96, mean: 0.68 }, latency: { p50: 81, p95: 102, mean: 87 } },
      { month: "Feb", availability: { p50: 99.1, p95: 99.54, mean: 99.2 }, loss: { p50: 0.58, p95: 0.94, mean: 0.66 }, latency: { p50: 80, p95: 100, mean: 86 } },
      { month: "Mar", availability: { p50: 99.04, p95: 99.48, mean: 99.14 }, loss: { p50: 0.64, p95: 1.0, mean: 0.72 }, latency: { p50: 83, p95: 104, mean: 89 } },
      { month: "Apr", availability: { p50: 99.12, p95: 99.52, mean: 99.22 }, loss: { p50: 0.56, p95: 0.94, mean: 0.66 }, latency: { p50: 82, p95: 102, mean: 88 } },
      { month: "May", availability: { p50: 99.18, p95: 99.56, mean: 99.26 }, loss: { p50: 0.54, p95: 0.9, mean: 0.64 }, latency: { p50: 81, p95: 100, mean: 86 } },
      { month: "Jun", availability: { p50: 99.16, p95: 99.54, mean: 99.24 }, loss: { p50: 0.56, p95: 0.92, mean: 0.64 }, latency: { p50: 80, p95: 99, mean: 85 } },
      { month: "Jul", availability: { p50: 99.1, p95: 99.5, mean: 99.2 }, loss: { p50: 0.6, p95: 0.96, mean: 0.68 }, latency: { p50: 82, p95: 102, mean: 88 } },
      { month: "Aug", availability: { p50: 99.08, p95: 99.48, mean: 99.18 }, loss: { p50: 0.62, p95: 0.98, mean: 0.7 }, latency: { p50: 83, p95: 103, mean: 89 } },
      { month: "Sep", availability: { p50: 99.16, p95: 99.54, mean: 99.24 }, loss: { p50: 0.56, p95: 0.92, mean: 0.64 }, latency: { p50: 81, p95: 99, mean: 86 } },
      { month: "Oct", availability: { p50: 99.22, p95: 99.58, mean: 99.3 }, loss: { p50: 0.52, p95: 0.88, mean: 0.6 }, latency: { p50: 80, p95: 98, mean: 85 } },
      { month: "Nov", availability: { p50: 99.2, p95: 99.56, mean: 99.28 }, loss: { p50: 0.54, p95: 0.9, mean: 0.62 }, latency: { p50: 81, p95: 98, mean: 85 } },
    ],
    carriers: {
      "4g": { availability: 99.08, lossP95: 0.7, latencyP95: 90, slaWithin: 81 },
      "5g": { availability: 99.26, lossP95: 0.54, latencyP95: 78, slaWithin: 87 },
    },
    customers: [
      { name: "Bank", slaWithin: 80, availability: 99.12, lossP95: 0.66, latencyP95: 90, status: "failing" },
      { name: "Healthcare provider", slaWithin: 83, availability: 99.18, lossP95: 0.6, latencyP95: 86, status: "steady" },
      { name: "Coffee chain", slaWithin: 78, availability: 99.06, lossP95: 0.72, latencyP95: 93, status: "failing" },
      { name: "Retail chain", slaWithin: 86, availability: 99.24, lossP95: 0.56, latencyP95: 82, status: "improved" },
      { name: "Production house", slaWithin: 82, availability: 99.16, lossP95: 0.62, latencyP95: 88, status: "steady" },
      { name: "Manufacturer", slaWithin: 81, availability: 99.12, lossP95: 0.64, latencyP95: 89, status: "steady" },
      { name: "Public agency", slaWithin: 85, availability: 99.22, lossP95: 0.58, latencyP95: 84, status: "improved" },
      { name: "College", slaWithin: 79, availability: 99.08, lossP95: 0.68, latencyP95: 92, status: "failing" },
      { name: "School", slaWithin: 84, availability: 99.18, lossP95: 0.6, latencyP95: 86, status: "steady" },
    ],
    regions: {
      west: { availability: 99.22, lossP95: 0.58, latencyP95: 82, slaWithin: 86 },
      central: { availability: 99.12, lossP95: 0.66, latencyP95: 88, slaWithin: 82 },
      east: { availability: 99.18, lossP95: 0.62, latencyP95: 85, slaWithin: 84 },
    },
    vendors: {
      cisco: { availability: 99.26, lossP95: 0.56, latencyP95: 81, slaWithin: 87 },
      ericsson: { availability: 99.12, lossP95: 0.68, latencyP95: 88, slaWithin: 81 },
    },
  },
  {
    id: "hybrid-broadband",
    name: "SuperBroadband",
    availability: 99.76,
    lossP95: 0.21,
    latencyP95: 55,
    slaWithin: 96,
    monthly: [
      { month: "Jan", availability: { p50: 99.70, p95: 99.94, mean: 99.76 }, loss: { p50: 0.19, p95: 0.35, mean: 0.22 }, latency: { p50: 51, p95: 65, mean: 55 } },
      { month: "Feb", availability: { p50: 99.72, p95: 99.94, mean: 99.78 }, loss: { p50: 0.18, p95: 0.33, mean: 0.21 }, latency: { p50: 50, p95: 64, mean: 54 } },
      { month: "Mar", availability: { p50: 99.68, p95: 99.92, mean: 99.74 }, loss: { p50: 0.21, p95: 0.38, mean: 0.24 }, latency: { p50: 53, p95: 68, mean: 57 } },
      { month: "Apr", availability: { p50: 99.74, p95: 99.96, mean: 99.80 }, loss: { p50: 0.17, p95: 0.31, mean: 0.20 }, latency: { p50: 50, p95: 63, mean: 54 } },
      { month: "May", availability: { p50: 99.76, p95: 99.96, mean: 99.82 }, loss: { p50: 0.16, p95: 0.30, mean: 0.19 }, latency: { p50: 49, p95: 62, mean: 53 } },
      { month: "Jun", availability: { p50: 99.60, p95: 99.88, mean: 99.66 }, loss: { p50: 0.27, p95: 0.46, mean: 0.31 }, latency: { p50: 57, p95: 74, mean: 62 } },
      { month: "Jul", availability: { p50: 99.72, p95: 99.94, mean: 99.78 }, loss: { p50: 0.19, p95: 0.34, mean: 0.22 }, latency: { p50: 51, p95: 65, mean: 55 } },
      { month: "Aug", availability: { p50: 99.70, p95: 99.92, mean: 99.76 }, loss: { p50: 0.20, p95: 0.36, mean: 0.23 }, latency: { p50: 52, p95: 67, mean: 56 } },
      { month: "Sep", availability: { p50: 99.74, p95: 99.96, mean: 99.80 }, loss: { p50: 0.17, p95: 0.31, mean: 0.20 }, latency: { p50: 50, p95: 63, mean: 54 } },
      { month: "Oct", availability: { p50: 99.78, p95: 99.98, mean: 99.84 }, loss: { p50: 0.15, p95: 0.28, mean: 0.18 }, latency: { p50: 48, p95: 61, mean: 52 } },
      { month: "Nov", availability: { p50: 99.76, p95: 99.96, mean: 99.82 }, loss: { p50: 0.16, p95: 0.30, mean: 0.19 }, latency: { p50: 49, p95: 62, mean: 53 } },
    ],
    carriers: {
      "5g-primary": { availability: 99.84, lossP95: 0.16, latencyP95: 46, slaWithin: 98 },
      "satellite-backup": { availability: 99.61, lossP95: 0.32, latencyP95: 58, slaWithin: 94 },
    },
    customers: [
      { name: "Hospital group", slaWithin: 97, availability: 99.82, lossP95: 0.16, latencyP95: 50, status: "improved" },
      { name: "Retail network", slaWithin: 96, availability: 99.78, lossP95: 0.19, latencyP95: 52, status: "improved" },
      { name: "Energy provider", slaWithin: 98, availability: 99.88, lossP95: 0.12, latencyP95: 48, status: "improved" },
      { name: "Financial services", slaWithin: 95, availability: 99.74, lossP95: 0.23, latencyP95: 56, status: "steady" },
      { name: "Logistics company", slaWithin: 93, availability: 99.66, lossP95: 0.28, latencyP95: 61, status: "steady" },
      { name: "Multi-site operator", slaWithin: 84, availability: 99.38, lossP95: 0.52, latencyP95: 76, status: "steady" },
    ],
    regions: {
      west: { availability: 99.80, lossP95: 0.18, latencyP95: 52, slaWithin: 97 },
      central: { availability: 99.74, lossP95: 0.23, latencyP95: 58, slaWithin: 95 },
      east: { availability: 99.77, lossP95: 0.21, latencyP95: 54, slaWithin: 96 },
    },
    vendors: {
      cisco: { availability: 99.81, lossP95: 0.18, latencyP95: 53, slaWithin: 97 },
      ericsson: { availability: 99.73, lossP95: 0.24, latencyP95: 57, slaWithin: 95 },
      starlink: { availability: 99.61, lossP95: 0.32, latencyP95: 58, slaWithin: 94, downlinkMbps: 142, uplinkMbps: 18 },
    },
  },
];

const PRODUCT_CUSTOMER_MAP = {
  smb: ["Coffee chain", "Retail chain"],
  enterprise: ["Production house", "Manufacturer", "Bank", "Healthcare provider"],
  government: ["Public agency"],
  education: ["College", "School"],
  "hybrid-broadband": ["Hospital group", "Financial services", "Energy provider"],
};

const TECH_ADJUSTMENTS = {
  all: { availability: 0, lossP95: 0, latencyP95: 0 },
  "4g": { availability: -0.12, lossP95: 0.08, latencyP95: 7 },
  "5g": { availability: 0.12, lossP95: -0.07, latencyP95: -9 },
};

const TIME_RANGE_CONFIG = {
  hourly: {
    points: 60,
    labelFormatter: (offset) => (offset === 0 ? "Now" : `${offset}m ago`),
    variance: { availability: 0.18, lossP95: 0.12, latencyP95: 5 },
  },
  daily: {
    points: 24,
    labelFormatter: (offset) => (offset === 0 ? "Now" : `${offset}h ago`),
    variance: { availability: 0.14, lossP95: 0.1, latencyP95: 4 },
  },
  weekly: {
    points: 7,
    labelFormatter: (offset) => (offset === 0 ? "Today" : `Day -${offset}`),
    variance: { availability: 0.12, lossP95: 0.08, latencyP95: 3 },
  },
  monthly: {
    points: 30,
    labelFormatter: (offset) => (offset === 0 ? "Today" : `${offset}d ago`),
    variance: { availability: 0.15, lossP95: 0.09, latencyP95: 4 },
  },
};

const TIME_RANGE_LABELS = {
  hourly: "Last 60 minutes",
  daily: "Last 24 hours",
  weekly: "Last 7 days",
  monthly: "Last 30 days",
};

const transportTimeSeriesCache = {};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function buildTimeRangeSeries(rangeKey, technologyKey = "all") {
  const config = TIME_RANGE_CONFIG[rangeKey];
  const adjustments = TECH_ADJUSTMENTS[technologyKey] || TECH_ADJUSTMENTS.all;
  const labels = Array.from({ length: config.points }, (_, idx) => {
    const offset = config.points - idx - 1;
    return config.labelFormatter(offset);
  });

  const byRegion = {};
  Object.entries(REGION_BASELINES).forEach(([region, base]) => {
    const seed = region.charCodeAt(0) + region.charCodeAt(region.length - 1);
    byRegion[region] = labels.map((label, idx) => {
      const multiplier = Math.sin((idx + seed) * 0.55);
      const availability = clamp(
        base.availability + adjustments.availability + multiplier * config.variance.availability,
        98.6,
        99.9
      );
      const lossP95 = clamp(
        base.lossP95 + adjustments.lossP95 + multiplier * config.variance.lossP95,
        0.15,
        1.6
      );
      const latencyP95 = clamp(
        base.latencyP95 + adjustments.latencyP95 + multiplier * config.variance.latencyP95,
        60,
        115
      );
      return { label, availability, lossP95, latencyP95 };
    });
  });

  return { labels, byRegion };
}

function getTransportSeries(rangeKey, technologyKey) {
  const cacheKey = `${rangeKey}-${technologyKey}`;
  if (!transportTimeSeriesCache[cacheKey]) {
    transportTimeSeriesCache[cacheKey] = buildTimeRangeSeries(rangeKey, technologyKey);
  }
  return transportTimeSeriesCache[cacheKey];
}

function metricStatus(value, metric) {
  if (metric === "availability") {
    if (value >= TARGETS.availability) return "good";
    if (value >= TARGETS.availability - 0.4) return "warn";
    return "bad";
  }
  if (metric === "loss") {
    if (value <= TARGETS.lossP95) return "good";
    if (value <= TARGETS.lossP95 + 0.25) return "warn";
    return "bad";
  }
  if (metric === "latency") {
    if (value <= TARGETS.latencyP95) return "good";
    if (value <= TARGETS.latencyP95 + 10) return "warn";
    return "bad";
  }
  return "good";
}

function slaStatus(entry) {
  const statuses = [
    metricStatus(entry.availability, "availability"),
    metricStatus(entry.lossP95, "loss"),
    metricStatus(entry.latencyP95, "latency"),
  ];
  const goodCount = statuses.filter((s) => s === "good").length;
  const warnCount = statuses.filter((s) => s === "warn").length;
  if (goodCount === 3) return "good";
  if (goodCount >= 2 || warnCount >= 2) return "warn";
  return "bad";
}

function averageMetrics(list) {
  if (!list.length)
    return {
      availability: 0,
      lossP95: 0,
      latencyP95: 0,
      slaWithin: 0,
    };

  const avg = (arr) => arr.reduce((a, v) => a + v, 0) / arr.length;
  const availability = avg(list.map((c) => c.availability));
  const lossP95 = avg(list.map((c) => c.lossP95));
  const latencyP95 = avg(list.map((c) => c.latencyP95));
  const slaWithin =
    (list.filter((c) => slaStatus(c) === "good").length / list.length) * 100;

  return { availability, lossP95, latencyP95, slaWithin };
}

function selectionFilters(region, vendor, site, technology = "all") {
  return customers.filter(
    (c) =>
      (region === "all" || c.region === region) &&
      (vendor === "all" ||
        (vendor === "starlink" ? c.satelliteVendor === "starlink" : c.vendor === vendor)) &&
      (site === "all" || c.site === site) &&
      (technology === "all" || c.technology === technology)
  );
}

function updateKpiCards(region, vendor, site, technology) {
  const filtered = selectionFilters(region, vendor, site, technology);
  const kpis = averageMetrics(filtered);

  const availabilityEl = document.querySelector('[data-kpi="availability"]');
  const lossEl = document.querySelector('[data-kpi="lossP95"]');
  const latencyEl = document.querySelector('[data-kpi="latencyP95"]');
  const slaEl = document.querySelector('[data-kpi="slaWithin"]');

  const availabilityCard = availabilityEl.closest(".kpi-card");
  const lossCard = lossEl.closest(".kpi-card");
  const latencyCard = latencyEl.closest(".kpi-card");
  const slaCard = slaEl.closest(".kpi-card");

  availabilityEl.textContent = kpis.availability.toFixed(2) + "%";
  lossEl.textContent = kpis.lossP95.toFixed(2) + "%";
  latencyEl.textContent = kpis.latencyP95.toFixed(0) + " ms";
  slaEl.textContent = kpis.slaWithin.toFixed(0) + "%";

  availabilityCard.className = `kpi-card ${metricStatus(
    kpis.availability,
    "availability"
  )}`;
  lossCard.className = `kpi-card ${metricStatus(kpis.lossP95, "loss")}`;
  latencyCard.className = `kpi-card ${metricStatus(kpis.latencyP95, "latency")}`;
  const slaStatusClass = kpis.slaWithin >= 90 ? "good" : kpis.slaWithin >= 80 ? "warn" : "bad";
  slaCard.className = `kpi-card ${slaStatusClass}`;
}

function summarizeRegions(vendor = "all", technology = "all") {
  const regionIds = [...new Set(customers.map((c) => c.region))];
  return regionIds.map((id) => {
    const regionCustomers = selectionFilters(id, vendor, "all", technology);
    const summary = averageMetrics(regionCustomers);
    return {
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      ...summary,
    };
  });
}

function regionStatusText(summary) {
  const status = slaStatus(summary);
  if (status === "good") return "On target";
  if (status === "warn") return "At risk";
  return "Breach";
}

function renderRegionCards(selectedRegion, vendor, technology, onClick) {
  const container = document.getElementById("regionCards");
  container.innerHTML = "";
  const regions = summarizeRegions(vendor, technology);

  regions.forEach((region) => {
    const card = document.createElement("div");
    card.className = `region-card ${selectedRegion === region.id ? "active" : ""}`;
    const status = slaStatus(region);
    card.innerHTML = `
      <div class="title-row">
        <h3>${region.name}</h3>
        <span class="status-pill ${status}">${regionStatusText(region)}</span>
      </div>
      <div class="metric-line"><span>Availability</span><strong>${region.availability.toFixed(2)}%</strong></div>
      <div class="metric-line"><span>Packet loss p95</span><strong>${region.lossP95.toFixed(2)}%</strong></div>
      <div class="metric-line"><span>Latency p95</span><strong>${region.latencyP95.toFixed(0)} ms</strong></div>
      <div class="metric-line"><span>SLA within target</span><strong>${region.slaWithin.toFixed(0)}%</strong></div>
    `;
    card.addEventListener("click", () => onClick(region.id));
    container.appendChild(card);
  });
}

function renderVendorScorecards(region, technology, site, selectedVendor, onClick) {
  const container = document.getElementById("vendorScorecards");
  if (!container) return;
  container.innerHTML = "";

  const vendors = [
    { id: "cisco", label: VENDOR_LABELS.cisco },
    { id: "ericsson", label: VENDOR_LABELS.ericsson },
    { id: "inseego", label: VENDOR_LABELS.inseego },
  ];

  // Starlink is the satellite leg vendor for all SuperBroadband customers.
  // Show its scorecard whenever Starlink is selected as a vendor filter OR
  // when the SuperBroadband technology filter is active.
  if (technology === "hybrid" || selectedVendor === "starlink") {
    vendors.push({ id: "starlink", label: VENDOR_LABELS.starlink, satelliteLeg: true });
  }

  vendors.forEach((vendor) => {
    let summary, unavailable;

    if (vendor.satelliteLeg) {
      const superBroadband = PRODUCTS.find((p) => p.id === "hybrid-broadband");
      summary = superBroadband?.vendors?.starlink || null;
      unavailable = !summary;
    } else {
      const scoped = selectionFilters(region, vendor.id, site, technology);
      summary = averageMetrics(scoped);
      unavailable = scoped.length === 0;
    }

    const status = unavailable ? "na" : slaStatus(summary);
    const statusText = unavailable ? "Not Available" : regionStatusText(summary);
    const metrics = [
      { label: "Availability", key: "availability" },
      { label: "Packet loss p95", key: "lossP95" },
      { label: "Latency p95", key: "latencyP95" },
    ];
    let metricsHtml = metrics
      .map(({ label, key }) => {
        const value = summary?.[key];
        const metricClass = unavailable ? "" : statusForMetricKey(key, value);
        return `<div class="metric-line"><span>${label}</span><strong class="${metricClass}">${formatMetricValue(key, value)}</strong></div>`;
      })
      .join("");
    // Satellite leg: append throughput lines (SLA-relevant for managed broadband)
    if (vendor.satelliteLeg && summary?.downlinkMbps != null) {
      metricsHtml += `<div class="metric-line"><span>Downlink</span><strong>${summary.downlinkMbps} Mbps</strong></div>`;
      metricsHtml += `<div class="metric-line"><span>Uplink</span><strong>${summary.uplinkMbps} Mbps</strong></div>`;
    }

    const card = document.createElement("div");
    card.className = [
      "vendor-card",
      selectedVendor === vendor.id ? "active" : "",
      unavailable ? "unavailable" : "",
    ]
      .filter(Boolean)
      .join(" ");
    card.innerHTML = `
      <div class="title-row">
        <h4>${vendor.label} scorecard</h4>
        <span class="status-pill ${status}">${statusText}</span>
      </div>
      ${metricsHtml}
    `;
    if (!unavailable && !vendor.satelliteLeg) {
      card.addEventListener("click", () => onClick(vendor.id));
    } else if (!unavailable && vendor.satelliteLeg) {
      card.title = "Satellite leg — aggregate KPIs from SuperBroadband product data";
    } else {
      card.setAttribute("aria-disabled", "true");
    }
    container.appendChild(card);
  });
}

function renderVendorChips(selectedVendor, onClick) {
  const container = document.getElementById("vendorChips");
  container.innerHTML = "";
  const vendors = [
    { id: "all", label: "All vendors" },
    { id: "cisco", label: "Cisco" },
    { id: "ericsson", label: "Ericsson" },
    { id: "inseego", label: "Inseego" },
    { id: "starlink", label: "Starlink" },
  ];

  vendors.forEach((v) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `vendor-chip ${selectedVendor === v.id ? "active" : ""}`;
    chip.textContent = v.label;
    chip.addEventListener("click", () => onClick(v.id));
    container.appendChild(chip);
  });
}

function renderTechChips(selectedTech, onClick) {
  const container = document.getElementById("techChips");
  if (!container) return;
  container.innerHTML = "";
  const technologies = [
    { id: "all", label: TECH_LABELS.all },
    { id: "4g", label: TECH_LABELS["4g"] },
    { id: "5g", label: TECH_LABELS["5g"] },
    { id: "hybrid", label: TECH_LABELS["hybrid"] },
  ];

  technologies.forEach((tech) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `tech-chip ${selectedTech === tech.id ? "active" : ""}`;
    chip.textContent = tech.label;
    chip.addEventListener("click", () => onClick(tech.id));
    container.appendChild(chip);
  });
}

function renderSiteList(region, vendor, technology, selectedSite, onClick) {
  const container = document.getElementById("siteList");
  container.innerHTML = "";
  const scopedCustomers = selectionFilters(region, vendor, "all", technology);
  const siteIds = [...new Set(scopedCustomers.map((c) => c.site))];

  const allItem = document.createElement("div");
  allItem.className = `site-item ${selectedSite === "all" ? "active" : ""}`;
  allItem.innerHTML = `<span class="name">All sites</span><span class="stats">${scopedCustomers.length} customers</span>`;
  allItem.addEventListener("click", () => onClick("all"));
  container.appendChild(allItem);

  siteIds.forEach((id) => {
    const siteCustomers = scopedCustomers.filter((c) => c.site === id);
    const summary = averageMetrics(siteCustomers);
    const item = document.createElement("div");
    item.className = `site-item ${selectedSite === id ? "active" : ""}`;
    item.innerHTML = `
      <span class="name">${id}</span>
      <span class="stats">${summary.availability.toFixed(2)}% • ${summary.latencyP95.toFixed(0)} ms</span>
    `;
    item.addEventListener("click", () => onClick(id));
    container.appendChild(item);
  });
}

function formatMetricValue(metricKey, value) {
  if (metricKey === "latencyP95") return `${value.toFixed(0)} ms`;
  const decimals = metricKey === "slaWithin" ? 0 : 2;
  return `${value.toFixed(decimals)}%`;
}

function statusForMetricKey(metricKey, value) {
  if (metricKey === "slaWithin") {
    return value >= 90 ? "good" : value >= 80 ? "warn" : "bad";
  }
  if (metricKey === "availability") return metricStatus(value, "availability");
  if (metricKey === "lossP95") return metricStatus(value, "loss");
  if (metricKey === "latencyP95") return metricStatus(value, "latency");
  return "good";
}

function renderKpiDrilldowns(region, vendor, site, selectedTech, onSelectTech) {
  const techs = [
    { id: "4g", label: TECH_LABELS["4g"] },
    { id: "5g", label: TECH_LABELS["5g"] },
  ];

  const metricTargets = [
    { key: "availability" },
    { key: "lossP95" },
    { key: "latencyP95" },
    { key: "slaWithin" },
  ];

  metricTargets.forEach((metric) => {
    const container = document.querySelector(`.kpi-drilldowns[data-drilldown-for="${metric.key}"]`);
    if (!container) return;
    container.innerHTML = "";

    const header = document.createElement("div");
    header.className = "kpi-drilldown-title";
    header.textContent = "Access drill-down";
    container.appendChild(header);

    techs.forEach((tech) => {
      const summary = averageMetrics(selectionFilters(region, vendor, site, tech.id));
      const value = summary[metric.key];
      const status = statusForMetricKey(metric.key, value);
      const row = document.createElement("div");
      row.className = `kpi-drilldown-row ${selectedTech === tech.id ? "active" : ""}`;
      row.innerHTML = `
        <span class="tech-label">${tech.label}</span>
        <span class="metric-value ${status}">${formatMetricValue(metric.key, value)}</span>
      `;
      row.addEventListener("click", () => onSelectTech(tech.id));
      container.appendChild(row);
    });
  });
}

function renderCustomerTable(region, vendor, site, technology) {
  const tbody = document.getElementById("customerTableBody");
  tbody.innerHTML = "";
  const filtered = selectionFilters(region, vendor, site, technology);

  filtered.forEach((c) => {
    const row = document.createElement("tr");
    const sla = slaStatus(c);
    row.innerHTML = `
      <td>${c.name}</td>
      <td>${c.region.charAt(0).toUpperCase() + c.region.slice(1)}</td>
      <td>${c.site}</td>
      <td>${VENDOR_LABELS[c.vendor] || c.vendor}</td>
      <td class="${metricStatus(c.availability, "availability")}">${c.availability.toFixed(2)}</td>
      <td class="${metricStatus(c.lossP95, "loss")}">${c.lossP95.toFixed(2)}</td>
      <td class="${metricStatus(c.latencyP95, "latency")}">${c.latencyP95.toFixed(0)}</td>
      <td>${c.usageTb.toFixed(1)}</td>
      <td><span class="badge ${sla}">${sla === "good" ? "Good" : sla === "warn" ? "At Risk" : "Breach"}</span></td>
    `;
    tbody.appendChild(row);
  });
}

let transportChart;
let topCustomersChart;
let productTrendChart;
let carrierChart;
let customerParetoChart;

function renderTopCustomersChart(region, vendor, site, technology) {
  const canvas = document.getElementById("topCustomersChart");
  const legend = document.getElementById("topCustomersLegend");
  if (!canvas || !legend) return;

  const donutSize = 320;
  canvas.width = donutSize;
  canvas.height = donutSize;

  const filtered = selectionFilters(region, vendor, site, technology)
    .map((customer) => ({ ...customer, usageGb: customer.usageTb * 1024 }))
    .sort((a, b) => b.usageGb - a.usageGb)
    .slice(0, 5);

  legend.innerHTML = "";

  if (!filtered.length) {
    legend.textContent = "No customers match the current filters.";
    if (topCustomersChart) {
      topCustomersChart.destroy();
      topCustomersChart = null;
    }
    return;
  }

  const palette = ["#7c3aed", "#22c55e", "#38bdf8", "#f59e0b", "#f97373", "#a855f7"];
  const ctx = canvas.getContext("2d");

  if (topCustomersChart) topCustomersChart.destroy();

  topCustomersChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: filtered.map((c) => c.name),
      datasets: [
        {
          data: filtered.map((c) => c.usageGb),
          backgroundColor: filtered.map((_, idx) => palette[idx % palette.length]),
          borderColor: "#0f172a",
          borderWidth: 1.5,
          hoverOffset: 6,
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      cutout: "58%",
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.parsed;
              return `${context.label}: ${value.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })} GB`;
            },
          },
        },
      },
    },
  });

  filtered.forEach((customer, idx) => {
    const item = document.createElement("div");
    item.className = "donut-legend-item";
    const usageLabel = `${customer.usageGb.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })} GB`;
    item.innerHTML = `
      <span class="swatch" style="background:${palette[idx % palette.length]}"></span>
      <div>
        <div class="donut-legend-row">
          <p>${customer.name}</p>
          <span class="donut-legend-usage">${usageLabel}</span>
        </div>
        <small>${customer.site}</small>
      </div>
    `;
    legend.appendChild(item);
  });
}

function transportSeriesForRange(rangeKey, region, technology) {
  const series = getTransportSeries(rangeKey, technology);
  const labels = series?.labels || [];

  if (!series || !labels.length) {
    return { labels: [], availabilitySeries: [], lossSeries: [], latencySeries: [] };
  }

  if (region === "all") {
    const regionIds = Object.keys(series.byRegion);
    const availabilitySeries = labels.map((_, idx) => {
      const sum = regionIds.reduce((acc, id) => acc + series.byRegion[id][idx].availability, 0);
      return sum / regionIds.length;
    });
    const lossSeries = labels.map((_, idx) => {
      const sum = regionIds.reduce((acc, id) => acc + series.byRegion[id][idx].lossP95, 0);
      return sum / regionIds.length;
    });
    const latencySeries = labels.map((_, idx) => {
      const sum = regionIds.reduce((acc, id) => acc + series.byRegion[id][idx].latencyP95, 0);
      return sum / regionIds.length;
    });
    return { labels, availabilitySeries, lossSeries, latencySeries };
  }

  const regionSeries = series.byRegion[region] || [];
  return {
    labels,
    availabilitySeries: regionSeries.map((p) => p.availability),
    lossSeries: regionSeries.map((p) => p.lossP95),
    latencySeries: regionSeries.map((p) => p.latencyP95),
  };
}

function buildTransportChart(region, rangeKey, technology) {
  const ctx = document.getElementById("transportChart").getContext("2d");
  const { labels, availabilitySeries, lossSeries, latencySeries } = transportSeriesForRange(rangeKey, region, technology);

  if (transportChart) transportChart.destroy();

  transportChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Availability %",
          data: availabilitySeries,
          borderColor: "#22c55e",
          tension: 0.35,
          yAxisID: "y",
        },
        {
          label: "Packet Loss p95 %",
          data: lossSeries,
          borderColor: "#f59e0b",
          tension: 0.35,
          yAxisID: "yLoss",
        },
        {
          label: "Latency p95 ms",
          data: latencySeries,
          borderColor: "#38bdf8",
          tension: 0.35,
          yAxisID: "yLatency",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "#cbd5f5",
            font: { size: 10 },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#cbd5f5",
            font: { size: 10 },
          },
          grid: { color: "#1e293b" },
        },
        y: {
          ticks: {
            color: "#cbd5f5",
            font: { size: 10 },
            callback: (value) => value.toFixed(1) + "%",
          },
          min: 98.5,
          max: 100,
          grid: { color: "#1e293b" },
        },
        yLoss: {
          position: "right",
          ticks: {
            color: "#cbd5f5",
            font: { size: 10 },
            callback: (value) => value + "%",
          },
          min: 0,
          max: 1.5,
          grid: { display: false },
        },
        yLatency: {
          position: "right",
          ticks: {
            color: "#cbd5f5",
            font: { size: 10 },
            callback: (value) => value + " ms",
          },
          min: 60,
          max: 110,
          grid: { display: false },
        },
      },
    },
  });
}

function updateSelectionPill(region, vendor, site, technology) {
  const regionLabel = region === "all" ? "All regions" : region.charAt(0).toUpperCase() + region.slice(1);
  const vendorLabel = vendor === "all" ? "All vendors" : VENDOR_LABELS[vendor] || vendor;
  const siteLabel = site === "all" ? "All sites" : site;
  const techLabel = technology === "all" ? TECH_LABELS.all : TECH_LABELS[technology] || technology.toUpperCase();
  document.getElementById("selectionPill").textContent = `${regionLabel} • ${vendorLabel} • ${siteLabel} • ${techLabel}`;
}

function initTimeRangeControl(currentRange, onRangeChange) {
  const control = document.getElementById("timeRangeControl");
  const button = document.getElementById("timeRangeButton");
  const menu = document.getElementById("timeRangeMenu");
  const options = Array.from(menu.querySelectorAll("[data-range]"));

  function setActiveRange(rangeKey) {
    options.forEach((opt) => opt.classList.toggle("active", opt.dataset.range === rangeKey));
    button.textContent = TIME_RANGE_LABELS[rangeKey];
  }

  function closeMenu() {
    control.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
  }

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    control.classList.add("open");
    button.setAttribute("aria-expanded", "true");
  });

  options.forEach((opt) => {
    opt.addEventListener("click", (event) => {
      event.stopPropagation();
      const rangeKey = opt.dataset.range;
      setActiveRange(rangeKey);
      onRangeChange(rangeKey);
      closeMenu();
    });
  });

  setActiveRange(currentRange);
}

function initDashboard() {
  let selectedRegion = "all";
  let selectedVendor = "all";
  let selectedSite = "all";
  let selectedTimeRange = "monthly";
  let selectedTech = "all";

  function refresh() {
    updateKpiCards(selectedRegion, selectedVendor, selectedSite, selectedTech);
    renderCustomerTable(selectedRegion, selectedVendor, selectedSite, selectedTech);
    buildTransportChart(selectedRegion, selectedTimeRange, selectedTech);
    renderRegionCards(selectedRegion, selectedVendor, selectedTech, (region) => {
      selectedRegion = region;
      selectedSite = "all";
      refresh();
    });
    renderVendorChips(selectedVendor, (vendor) => {
      selectedVendor = vendor;
      selectedSite = "all";
      refresh();
    });
    renderTechChips(selectedTech, (tech) => {
      selectedTech = tech;
      selectedSite = "all";
      refresh();
    });
    renderVendorScorecards(selectedRegion, selectedTech, selectedSite, selectedVendor, (vendor) => {
      selectedVendor = vendor;
      selectedSite = "all";
      refresh();
    });
    renderSiteList(selectedRegion, selectedVendor, selectedTech, selectedSite, (site) => {
      selectedSite = site;
      refresh();
    });
    renderKpiDrilldowns(selectedRegion, selectedVendor, selectedSite, selectedTech, (tech) => {
      selectedTech = tech;
      selectedSite = "all";
      refresh();
    });
    renderTopCustomersChart(selectedRegion, selectedVendor, selectedSite, selectedTech);
    updateSelectionPill(selectedRegion, selectedVendor, selectedSite, selectedTech);
  }

  initTimeRangeControl(selectedTimeRange, (rangeKey) => {
    selectedTimeRange = rangeKey;
    refresh();
  });

  refresh();
}

document.addEventListener("DOMContentLoaded", initDashboard);

// Operations & Engineering dashboard
const DASHBOARD_IDS = {
  executive: "executiveDashboard",
  operations: "operationsDashboard",
  product: "productDashboard",
};

let dashboardTabsInitialized = false;
let operationsInitialized = false;
let productInitialized = false;
let opsTransportChart;
let radioQualityChart;

function switchDashboard(target) {
  Object.entries(DASHBOARD_IDS).forEach(([key, id]) => {
    const isActive = key === target;
    const main = document.getElementById(id);
    if (main) {
      main.classList.toggle("hidden", !isActive);
    }
    const tab = document.querySelector(`.dashboard-tab[data-dashboard="${key}"]`);
    if (tab) {
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    }
  });

  if (target === "operations" && !operationsInitialized) {
    initOperationsDashboard();
    operationsInitialized = true;
  }

  if (target === "product" && !productInitialized) {
    initProductDashboard();
    productInitialized = true;
  }
}

function initDashboardTabs() {
  if (dashboardTabsInitialized) return;
  dashboardTabsInitialized = true;
  const tabs = document.querySelectorAll(".dashboard-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.dashboard;
      switchDashboard(target);
    });
  });
}

function productStatusClass(value, metricKey) {
  if (metricKey === "availability") return metricStatus(value, "availability");
  if (metricKey === "lossP95") return metricStatus(value, "loss");
  if (metricKey === "latencyP95") return metricStatus(value, "latency");
  return value >= 90 ? "good" : value >= 80 ? "warn" : "bad";
}

function renderProductCards(selectedId, onSelect) {
  const container = document.getElementById("productCards");
  if (!container) return;
  container.innerHTML = "";

  PRODUCTS.forEach((product) => {
    const status = productStatusClass(product.slaWithin, "slaWithin");
    const card = document.createElement("div");
    card.className = `product-card ${selectedId === product.id ? "active" : ""}`;
    card.innerHTML = `
      <div class="product-card-header">
        <div>
          <h3>${product.name}</h3>
          <p class="caption">Today</p>
        </div>
        <span class="status-pill ${status}">${status === "good" ? "On target" : status === "warn" ? "At risk" : "Breach"}</span>
      </div>
      <div class="product-metrics">
        <div><span>Availability</span><strong>${product.availability.toFixed(2)}%</strong></div>
        <div><span>Loss p95</span><strong>${product.lossP95.toFixed(2)}%</strong></div>
        <div><span>Latency p95</span><strong>${product.latencyP95.toFixed(0)} ms</strong></div>
        <div><span>SLA within</span><strong>${product.slaWithin.toFixed(0)}%</strong></div>
      </div>
    `;
    card.addEventListener("click", () => onSelect(product.id));
    container.appendChild(card);
  });
}

function renderProductKpis(product) {
  const container = document.getElementById("productKpiRow");
  if (!container) return;
  container.innerHTML = "";
  const metrics = [
    { key: "availability", label: "Availability" },
    { key: "lossP95", label: "Packet loss p95" },
    { key: "latencyP95", label: "Latency p95" },
    { key: "slaWithin", label: "Customers within SLA" },
  ];

  metrics.forEach((metric) => {
    const value = product[metric.key];
    const status = productStatusClass(value, metric.key);
    const valueText = metric.key === "latencyP95" ? `${value.toFixed(0)} ms` : `${value.toFixed(metric.key === "slaWithin" ? 0 : 2)}%`;
    const subtitle =
      metric.key === "availability"
        ? "Target ≥ 99.5%"
        : metric.key === "lossP95"
        ? "Target ≤ 0.50%"
        : metric.key === "latencyP95"
        ? "Target ≤ 80 ms"
        : "Availability + Loss + Latency";

    const card = document.createElement("div");
    card.className = `kpi-card ${status}`;
    card.innerHTML = `
      <div class="kpi-label">${metric.label}</div>
      <div class="kpi-value">${valueText}</div>
      <div class="kpi-subtitle">${subtitle}</div>
    `;
    container.appendChild(card);
  });
}

function buildProductTrendChart(product) {
  const canvas = document.getElementById("productTrendChart");
  if (!canvas || !product) return;
  canvas.width = 320;
  canvas.height = 320;
  const labels = product.monthly.map((m) => `${m.month} 2025`);
  const colorMap = {
    availability: "#22c55e",
    loss: "#38bdf8",
    latency: "#a78bfa",
  };

  const datasets = [];
  [
    { key: "availability", label: "Availability %", accessor: (m) => m.availability },
    { key: "loss", label: "Packet loss p95 %", accessor: (m) => m.loss },
    { key: "latency", label: "Latency p95 ms", accessor: (m) => m.latency },
  ].forEach(({ key, label, accessor }) => {
    const color = colorMap[key === "availability" ? "availability" : key];
    const points = product.monthly.map((m) => accessor(m));
    datasets.push({
      label: `${label} p95`,
      data: points.map((p) => p.p95),
      borderColor: "transparent",
      backgroundColor: `${color}33`,
      fill: false,
      pointRadius: 0,
      yAxisID: key === "availability" ? "yAvail" : key === "loss" ? "yLoss" : "yLatency",
      tension: 0.35,
    });
    datasets.push({
      label: `${label} p50`,
      data: points.map((p) => p.p50),
      borderColor: "transparent",
      backgroundColor: `${color}2a`,
      fill: -1,
      pointRadius: 0,
      yAxisID: key === "availability" ? "yAvail" : key === "loss" ? "yLoss" : "yLatency",
      tension: 0.35,
    });
    datasets.push({
      label,
      data: points.map((p) => p.mean),
      borderColor: color,
      backgroundColor: color,
      pointRadius: 3,
      pointHoverRadius: 5,
      fill: false,
      yAxisID: key === "availability" ? "yAvail" : key === "loss" ? "yLoss" : "yLatency",
      tension: 0.35,
    });
  });

  if (productTrendChart) productTrendChart.destroy();
  productTrendChart = new Chart(canvas, {
    type: "line",
    data: { labels, datasets },
    options: {
      plugins: {
        legend: { labels: { color: "#cbd5f5", boxWidth: 12 } },
        tooltip: { mode: "index", intersect: false },
      },
      scales: {
        x: {
          ticks: { color: "#cbd5f5" },
          grid: { color: "#1e293b" },
        },
        yAvail: {
          position: "left",
          ticks: { color: "#cbd5f5", callback: (v) => v.toFixed(2) + "%" },
          min: 98.8,
          max: 100,
          grid: { color: "#1e293b" },
        },
        yLoss: {
          position: "right",
          ticks: { color: "#cbd5f5", callback: (v) => v + "%" },
          min: 0,
          max: 1.2,
          grid: { color: "#0b1227" },
        },
        yLatency: {
          position: "right",
          ticks: { color: "#cbd5f5", callback: (v) => v + " ms" },
          min: 65,
          max: 110,
          grid: { display: false },
        },
      },
      maintainAspectRatio: false,
    },
  });
}

const CARRIER_DISPLAY = {
  "4g":               { label: "4G",               color: "rgba(56, 189, 248, 0.65)" },
  "5g":               { label: "5G",               color: "rgba(124, 58, 237, 0.65)" },
  "5g-primary":       { label: "5G Primary",       color: "rgba(56, 189, 248, 0.65)" },
  "satellite-backup": { label: "Satellite Backup", color: "rgba(245, 158, 11, 0.65)"  },
};

function buildCarrierChart(product) {
  const canvas = document.getElementById("carrierChart");
  if (!canvas || !product) return;
  const labels = ["Availability", "Loss p95", "Latency p95", "SLA within"];

  const valueLabelPlugin = {
    id: "carrierValueLabels",
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      ctx.save();
      const formatValue = (value, index) => {
        const precision = index === 2 || index === 3 ? 0 : 2;
        const unit = index === 2 ? " ms" : "%";
        return `${Number(value).toFixed(precision)}${unit}`;
      };
      chart.data.datasets.forEach((dataset, datasetIndex) => {
        const meta = chart.getDatasetMeta(datasetIndex);
        meta.data.forEach((bar, index) => {
          const value = dataset.data[index];
          if (value === null || value === undefined) return;
          const { x, y } = bar.tooltipPosition();
          ctx.fillStyle = "#ffffff";
          ctx.font = "12px Inter, system-ui, -apple-system, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          ctx.fillText(formatValue(value, index), x, y - 8);
        });
      });
      ctx.restore();
    },
  };

  const datasets = Object.entries(product.carriers).map(([key, data]) => {
    const display = CARRIER_DISPLAY[key] || { label: key, color: "rgba(148, 163, 184, 0.6)" };
    return {
      label: display.label,
      data: [data.availability, data.lossP95, data.latencyP95, data.slaWithin],
      backgroundColor: display.color,
    };
  });

  if (carrierChart) carrierChart.destroy();
  carrierChart = new Chart(canvas, {
    type: "bar",
    data: { labels, datasets },
    plugins: [valueLabelPlugin],
    options: {
      plugins: {
        legend: { labels: { color: "#cbd5f5" } },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const unit = ctx.dataIndex === 2 ? " ms" : "%";
              return `${ctx.dataset.label}: ${ctx.formattedValue}${unit}`;
            },
          },
        },
      },
      scales: {
        x: { ticks: { color: "#cbd5f5" }, grid: { color: "#1e293b" } },
        y: {
          ticks: { color: "#cbd5f5" },
          min: 0,
          max: 110,
          grid: { color: "#1e293b" },
        },
      },
      maintainAspectRatio: false,
    },
  });
}

function buildCustomerParetoChart(product) {
  const canvas = document.getElementById("customerParetoChart");
  if (!canvas || !product) return;
  const sorted = [...product.customers].sort((a, b) => b.slaWithin - a.slaWithin);
  const gaps = sorted.map((c) => 100 - c.slaWithin);
  const totalGap = gaps.reduce((a, v) => a + v, 0) || 1;
  let cumulative = 0;
  const cumulativePct = gaps.map((gap) => {
    cumulative += gap;
    return (cumulative / totalGap) * 100;
  });

  if (customerParetoChart) customerParetoChart.destroy();
  customerParetoChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: sorted.map((c) => c.name),
      datasets: [
        {
          type: "bar",
          label: "SLA gap",
          data: gaps,
          backgroundColor: "rgba(249, 115, 115, 0.7)",
          yAxisID: "yGap",
        },
        {
          type: "line",
          label: "Cumulative %",
          data: cumulativePct,
          borderColor: "#22c55e",
          backgroundColor: "#22c55e",
          yAxisID: "yCum",
          tension: 0.3,
          fill: false,
          pointRadius: 4,
        },
      ],
    },
    options: {
      plugins: {
        legend: { labels: { color: "#cbd5f5" } },
      },
      scales: {
        x: { ticks: { color: "#cbd5f5", autoSkip: false }, grid: { color: "#1e293b" } },
        yGap: {
          position: "left",
          ticks: { color: "#cbd5f5", callback: (v) => v + "%" },
          grid: { color: "#1e293b" },
          min: 0,
          max: Math.max(30, Math.ceil(Math.max(...gaps, 0) / 10) * 10),
        },
        yCum: {
          position: "right",
          ticks: { color: "#cbd5f5", callback: (v) => v + "%" },
          grid: { display: false },
          min: 0,
          max: 100,
        },
      },
      maintainAspectRatio: false,
    },
  });
}

function renderCustomerScorecards(product) {
  const container = document.getElementById("customerScorecards");
  if (!container) return;
  container.innerHTML = "";
  const linkedCustomers = new Set(PRODUCT_CUSTOMER_MAP[product.id] || []);
  const scopedCustomers =
    linkedCustomers.size === 0
      ? product.customers
      : product.customers.filter((cust) => linkedCustomers.has(cust.name));

  scopedCustomers.forEach((cust) => {
    const statusClass = cust.status === "improved" ? "good" : cust.status === "steady" ? "warn" : "bad";
    const statusIcon = statusClass === "good" ? "▲" : statusClass === "warn" ? "–" : "▼";
    const availabilityStatus = metricStatus(cust.availability, "availability");
    const lossStatus = metricStatus(cust.lossP95, "loss");
    const latencyStatus = metricStatus(cust.latencyP95, "latency");
    const slaStatusClass = productStatusClass(cust.slaWithin, "slaWithin");
    const slaLabel = slaStatusClass === "good" ? "On Target" : slaStatusClass === "warn" ? "At Risk" : "Breaching";
    const isLinkedToProduct = linkedCustomers.has(cust.name);
    const card = document.createElement("div");
    card.className = `customer-card ${isLinkedToProduct ? "highlighted" : ""}`;
    card.innerHTML = `
      <div class="customer-card-header">
        <div class="customer-name-group">
          <h4>${cust.name}</h4>
          ${isLinkedToProduct ? "<span class=\"customer-product-tag\">Mapped to product</span>" : ""}
        </div>
        <div class="customer-badges" aria-label="Customer SLA and trend status">
          <span class="sla-pill ${slaStatusClass}" title="SLA ${slaLabel}">${slaLabel}</span>
          <span class="status-pill ${statusClass}" aria-label="${cust.status} trend" title="${cust.status}">
            <span class="status-icon">${statusIcon}</span>
          </span>
        </div>
      </div>
      <div class="customer-metrics">
        <div><span>Availability</span><strong class="${availabilityStatus}">${cust.availability.toFixed(2)}%</strong></div>
        <div><span>Loss p95</span><strong class="${lossStatus}">${cust.lossP95.toFixed(2)}%</strong></div>
        <div><span>Latency p95</span><strong class="${latencyStatus}">${cust.latencyP95.toFixed(0)} ms</strong></div>
        <div><span>SLA within</span><strong class="${slaStatusClass}">${cust.slaWithin.toFixed(0)}%</strong></div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderProductRegions(product) {
  const container = document.getElementById("productRegionCards");
  if (!container) return;
  container.innerHTML = "";
  ["west", "central", "east"].forEach((region) => {
    const summary = product.regions[region];
    const status = productStatusClass(summary.slaWithin, "slaWithin");
    const card = document.createElement("div");
    card.className = `region-card ${status}`;
    card.innerHTML = `
      <div class="title-row">
        <h3>${region.charAt(0).toUpperCase() + region.slice(1)}</h3>
        <span class="status-pill ${status}">${status === "good" ? "On target" : status === "warn" ? "At risk" : "Breach"}</span>
      </div>
      <div class="metric-line"><span>Availability</span><strong>${summary.availability.toFixed(2)}%</strong></div>
      <div class="metric-line"><span>Packet loss p95</span><strong>${summary.lossP95.toFixed(2)}%</strong></div>
      <div class="metric-line"><span>Latency p95</span><strong>${summary.latencyP95.toFixed(0)} ms</strong></div>
      <div class="metric-line"><span>SLA within target</span><strong>${summary.slaWithin.toFixed(0)}%</strong></div>
    `;
    container.appendChild(card);
  });
}

function renderProductVendors(product) {
  const container = document.getElementById("productVendorCards");
  if (!container) return;
  container.innerHTML = "";
  Object.entries(product.vendors).forEach(([id, summary]) => {
    const label = VENDOR_LABELS[id] || id;
    const status = productStatusClass(summary.slaWithin, "slaWithin");
    const card = document.createElement("div");
    card.className = "vendor-card";
    card.innerHTML = `
      <div class="title-row">
        <h4>${label}</h4>
        <span class="status-pill ${status}">${status === "good" ? "On target" : status === "warn" ? "At risk" : "Breach"}</span>
      </div>
      <div class="metric-line"><span>Availability</span><strong>${summary.availability.toFixed(2)}%</strong></div>
      <div class="metric-line"><span>Packet loss p95</span><strong>${summary.lossP95.toFixed(2)}%</strong></div>
      <div class="metric-line"><span>Latency p95</span><strong>${summary.latencyP95.toFixed(0)} ms</strong></div>
      <div class="metric-line"><span>SLA within</span><strong>${summary.slaWithin.toFixed(0)}%</strong></div>
      ${summary.downlinkMbps != null ? `<div class="metric-line"><span>Downlink</span><strong>${summary.downlinkMbps} Mbps</strong></div>` : ""}
      ${summary.uplinkMbps != null ? `<div class="metric-line"><span>Uplink</span><strong>${summary.uplinkMbps} Mbps</strong></div>` : ""}
    `;
    container.appendChild(card);
  });
}

function updateProductPill(product) {
  const pill = document.getElementById("productSelectionPill");
  if (!pill || !product) return;
  pill.textContent = `${product.name} • Today`;
}

function initProductDashboard() {
  let selectedProduct = PRODUCTS[0];

  function refresh() {
    renderProductCards(selectedProduct.id, (id) => {
      selectedProduct = PRODUCTS.find((p) => p.id === id) || selectedProduct;
      refresh();
    });
    renderProductKpis(selectedProduct);
    buildProductTrendChart(selectedProduct);
    buildCarrierChart(selectedProduct);
    buildCustomerParetoChart(selectedProduct);
    renderCustomerScorecards(selectedProduct);
    renderProductRegions(selectedProduct);
    renderProductVendors(selectedProduct);
    updateProductPill(selectedProduct);
  }

  refresh();
}

function generateOpsTransportSeries() {
  const labels = Array.from({ length: 14 }, (_, idx) => `Day ${idx + 1}`);
  const baseGoodput = 420;
  const baseLatency = 65;
  const baseLoss = 0.35;
  const incidents = [
    { index: 3, type: "MW maintenance", impact: "Brief loss spike" },
    { index: 8, type: "Failover", impact: "Latency & goodput dip" },
    { index: 12, type: "MW maintenance", impact: "Loss window" },
  ];

  const data = labels.map((label, idx) => {
    const multiplier = Math.sin(idx * 0.55);
    let goodput = baseGoodput + multiplier * 60;
    let latency = baseLatency + multiplier * 10;
    let loss = baseLoss + Math.cos(idx * 0.45) * 0.08;

    const incident = incidents.find((i) => i.index === idx);
    if (incident) {
      goodput -= 110;
      latency += 18;
      loss += 0.4;
    }

    return {
      label,
      goodput: Math.max(220, goodput),
      latencyP95: Math.min(120, latency),
      lossP95: Math.max(0.15, Math.min(2, loss)),
    };
  });

  return { labels, data, incidents };
}

function buildOpsTransportChart() {
  const ctx = document.getElementById("opsTransportChart");
  if (!ctx) return;
  const { labels, data, incidents } = generateOpsTransportSeries();

  if (opsTransportChart) opsTransportChart.destroy();

  opsTransportChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Goodput (Mbps)",
          data: data.map((p) => p.goodput),
          borderColor: "#22c55e",
          backgroundColor: "rgba(34, 197, 94, 0.25)",
          tension: 0.35,
          fill: true,
          yAxisID: "yGoodput",
        },
        {
          label: "Packet Loss p95 %",
          data: data.map((p) => p.lossP95),
          borderColor: "#f97316",
          pointRadius: 3,
          tension: 0.3,
          yAxisID: "yLoss",
        },
        {
          label: "Latency p95 (ms)",
          data: data.map((p) => p.latencyP95),
          borderColor: "#38bdf8",
          pointRadius: 3,
          tension: 0.3,
          yAxisID: "yLatency",
        },
        {
          type: "scatter",
          label: "MW / Failover windows",
          data: incidents.map((incident) => ({
            x: labels[incident.index],
            y: data[incident.index].lossP95 + 0.1,
            description: `${incident.type} – ${incident.impact}`,
          })),
          borderColor: "#facc15",
          backgroundColor: "#facc15",
          pointStyle: "triangle",
          pointRadius: 7,
          yAxisID: "yLoss",
        },
      ],
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              if (context.dataset.type === "scatter") {
                const { description } = context.raw;
                return description;
              }
              return `${context.dataset.label}: ${context.formattedValue}`;
            },
          },
        },
        legend: {
          labels: { color: "#cbd5f5", font: { size: 11 } },
        },
      },
      scales: {
        x: {
          ticks: { color: "#cbd5f5" },
          grid: { color: "#1e293b" },
        },
        yGoodput: {
          type: "linear",
          position: "left",
          ticks: { color: "#22c55e", callback: (v) => `${v} Mbps` },
          grid: { color: "#1e293b" },
          min: 200,
          max: 520,
        },
        yLoss: {
          type: "linear",
          position: "right",
          ticks: { color: "#f97316", callback: (v) => `${v.toFixed(2)}%` },
          grid: { display: false },
          min: 0,
          max: 2,
        },
        yLatency: {
          type: "linear",
          position: "right",
          ticks: { color: "#38bdf8", callback: (v) => `${v} ms` },
          grid: { display: false },
          min: 40,
          max: 130,
        },
      },
    },
  });
}

function buildRadioQualityChart() {
  const ctx = document.getElementById("radioQualityChart");
  if (!ctx) return;
  const samples = Array.from({ length: 40 }, () => {
    const sinr = -150 + Math.random() * 60;
    const rsrp = -115 + Math.random() * 25;
    const noise = Math.random() * 6;
    const goodput = Math.max(40, (sinr + 150) * 2 + rsrp * -0.4 + 300 - noise * 10);
    return { x: sinr, y: clamp(goodput / 10, 0, 100), rsrp };
  });

  const regression = linearRegression(samples.map((s) => [s.x, s.y]));
  const minX = Math.min(...samples.map((s) => s.x));
  const maxX = Math.max(...samples.map((s) => s.x));
  const trendLine = [
    { x: minX, y: regression.predict(minX) },
    { x: maxX, y: regression.predict(maxX) },
  ];

  const quadrantPlugin = {
    id: "quadrantBackground",
    beforeDraw(chart) {
      const { ctx, chartArea } = chart;
      if (!chartArea) return;
      const xMid = chart.scales.x.getPixelForValue(-120);
      const yMid = chart.scales.y.getPixelForValue(28);
      ctx.save();
      ctx.fillStyle = "rgba(34, 197, 94, 0.08)";
      ctx.fillRect(xMid, chartArea.top, chartArea.right - xMid, yMid - chartArea.top);
      ctx.fillStyle = "rgba(245, 158, 11, 0.08)";
      ctx.fillRect(chartArea.left, chartArea.top, xMid - chartArea.left, yMid - chartArea.top);
      ctx.fillRect(xMid, yMid, chartArea.right - xMid, chartArea.bottom - yMid);
      ctx.fillStyle = "rgba(248, 113, 113, 0.08)";
      ctx.fillRect(chartArea.left, yMid, xMid - chartArea.left, chartArea.bottom - yMid);
      ctx.restore();
    },
  };

  if (radioQualityChart) radioQualityChart.destroy();

  radioQualityChart = new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Radio samples (SINR vs Goodput)",
          data: samples,
          backgroundColor: samples.map((s) => {
            if (s.x >= -100 && s.rsrp >= -100) return "rgba(34, 197, 94, 0.7)";
            if (s.x >= -120 && s.rsrp >= -108) return "rgba(245, 158, 11, 0.8)";
            return "rgba(248, 113, 113, 0.8)";
          }),
          borderWidth: 0,
          pointRadius: 5,
        },
        {
          type: "line",
          label: "Trend line",
          data: trendLine,
          borderColor: "#a855f7",
          borderDash: [6, 6],
          pointRadius: 0,
          tension: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "#cbd5f5", font: { size: 11 } } },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              if (ctx.datasetIndex === 1) return "Trend";
              const sample = ctx.raw;
              return `SINR ${sample.x.toFixed(1)} dB, Goodput ${(sample.y * 10).toFixed(0)} Mbps, RSRP ${sample.rsrp.toFixed(0)} dBm`;
            },
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: "SINR (dB)", color: "#cbd5f5" },
          min: -150,
          max: -90,
          grid: { color: "#1e293b" },
          ticks: { color: "#cbd5f5" },
        },
        y: {
          title: { display: true, text: "Downlink goodput (Mbps)", color: "#cbd5f5" },
          min: 0,
          max: 100,
          grid: { color: "#1e293b" },
          ticks: { color: "#cbd5f5" },
        },
      },
      maintainAspectRatio: false,
    },
    plugins: [quadrantPlugin],
  });
}

function linearRegression(points) {
  const n = points.length;
  const sum = points.reduce(
    (acc, [x, y]) => {
      acc.x += x;
      acc.y += y;
      acc.xy += x * y;
      acc.xx += x * x;
      return acc;
    },
    { x: 0, y: 0, xy: 0, xx: 0 }
  );

  const slope = (n * sum.xy - sum.x * sum.y) / (n * sum.xx - sum.x ** 2 || 1);
  const intercept = sum.y / n - (slope * sum.x) / n;

  return {
    slope,
    intercept,
    predict(x) {
      return slope * x + intercept;
    },
  };
}

const heatmapData = [
  { ap: "AP-12 (HQ)", values: [82, 77, 69, 58, 62, 71, 80, 88, 91, 86, 72, 65] },
  { ap: "AP-07 (Branch)", values: [64, 61, 58, 55, 54, 63, 72, 78, 82, 80, 74, 69] },
  { ap: "AP-19 (Warehouse)", values: [58, 54, 50, 47, 52, 64, 76, 85, 89, 83, 70, 62] },
  { ap: "AP-03 (Retail)", values: [45, 42, 41, 39, 46, 58, 69, 75, 79, 71, 59, 52] },
  { ap: "AP-25 (DC)", values: [71, 66, 61, 55, 57, 68, 79, 86, 90, 88, 77, 69] },
];

let heatmapAnnotations = [];
let heatmapEditingId = null;

function renderHeatmap() {
  const container = document.getElementById("accessHeatmap");
  if (!container) return;
  container.innerHTML = "";

  const sorted = [...heatmapData].sort(
    (a, b) => Math.max(...b.values) - Math.max(...a.values)
  );

  sorted.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "heatmap-row";
    const label = document.createElement("div");
    label.className = "heatmap-label";
    label.textContent = row.ap;
    rowEl.appendChild(label);

    const cellsWrapper = document.createElement("div");
    cellsWrapper.className = "heatmap-cells";

    row.values.forEach((val, idx) => {
      const cell = document.createElement("div");
      cell.className = "heatmap-cell";
      cell.dataset.hour = idx + 7;
      const intensity = Math.min(1, val / 100);
      const hue = 120 - intensity * 120;
      cell.style.background = `linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)), hsl(${hue}, 70%, ${30 + intensity * 25}%)`;
      cell.innerHTML = `<span>${val}%</span><small>${idx + 7}:00</small>`;
      cell.title = `${row.ap} • ${idx + 7}:00 • ${val}% utilization`;
      cellsWrapper.appendChild(cell);
    });

    rowEl.appendChild(cellsWrapper);
    container.appendChild(rowEl);
  });
}

function initHeatmapAnnotations() {
  const input = document.getElementById("heatmapNote");
  const button = document.getElementById("applyHeatmapNote");
  const status = document.getElementById("heatmapNoteStatus");
  const list = document.getElementById("heatmapNotesList");
  if (!input || !button || !status || !list) return;

  const timeFormatter = new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  });

  const renderNotes = () => {
    list.innerHTML = "";

    if (!heatmapAnnotations.length) {
      const empty = document.createElement("div");
      empty.className = "heatmap-note heatmap-note-empty";
      empty.textContent = "No annotations yet. Add a note to explain heatmap changes.";
      list.appendChild(empty);
      return;
    }

    heatmapAnnotations.forEach((note) => {
      const noteEl = document.createElement("div");
      noteEl.className = "heatmap-note";

      const text = document.createElement("div");
      text.className = "heatmap-note-text";
      const strong = document.createElement("strong");
      strong.textContent = note.text;
      const timestamp = document.createElement("small");
      timestamp.textContent = `Captured ${timeFormatter.format(new Date(note.updatedAt || note.createdAt))}`;
      text.appendChild(strong);
      text.appendChild(timestamp);

      const actions = document.createElement("div");
      actions.className = "heatmap-note-actions";
      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => {
        heatmapEditingId = note.id;
        input.value = note.text;
        button.textContent = "Save annotation";
        status.textContent = "Editing annotation…";
        input.focus();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.classList.add("delete");
      deleteBtn.textContent = "Remove";
      deleteBtn.addEventListener("click", () => {
        heatmapAnnotations = heatmapAnnotations.filter((item) => item.id !== note.id);
        if (heatmapEditingId === note.id) {
          heatmapEditingId = null;
          input.value = "";
          button.textContent = "Apply note";
        }
        status.textContent = heatmapAnnotations.length
          ? "Annotation removed."
          : "No recent annotations.";
        renderNotes();
      });

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      noteEl.appendChild(text);
      noteEl.appendChild(actions);
      list.appendChild(noteEl);
    });
  };

  button.addEventListener("click", () => {
    const noteText = input.value.trim();
    if (!noteText) {
      status.textContent = "Enter an annotation before applying.";
      return;
    }

    if (heatmapEditingId) {
      const target = heatmapAnnotations.find((item) => item.id === heatmapEditingId);
      if (target) {
        target.text = noteText;
        target.updatedAt = Date.now();
      }
      status.textContent = "Annotation updated.";
    } else {
      heatmapAnnotations.unshift({
        id: crypto.randomUUID ? crypto.randomUUID() : `note-${Date.now()}-${Math.random()}`,
        text: noteText,
        createdAt: Date.now(),
      });
      status.textContent = `Annotation added: ${noteText}`;
    }

    heatmapEditingId = null;
    input.value = "";
    button.textContent = "Apply note";
    renderNotes();
  });

  renderNotes();
}

const HYBRID_DATA = {
  activeLink: "5G Primary",
  failoverEvents: 3,
  satelliteAvailability: 99.2,
  satelliteLatencyP95: 48,
  obstructionRate: 0.31,
  satelliteSNR: 11.2,
  satelliteDownlink: 142,
  satelliteUplink: 18,
  // Operational detail KPIs
  outageDurationMins: 4,
  activeAlerts: 1,
  activeAlertType: "Obstructed",
  pingDropRateRT: 0.18,
  priorityDataUsedPct: 62,
  // Dish alert detail — shown when alert card is clicked
  dishAlertDetail: {
    customer: "RetailCore Network",
    siteName: "Dallas Prime",
    region: "Central",
    coordinates: "32.77° N, 96.79° W",
    alertSince: "2h 14m",
    skyObstructionPct: 18,
    baselineDownlink: 142,
    currentDownlink: 89,
    baselineUplink: 18,
    currentUplink: 14,
  },
  utilizationHistory: [
    { label: "Mon", fiveG: 82, satellite: 18 },
    { label: "Tue", fiveG: 79, satellite: 21 },
    { label: "Wed", fiveG: 85, satellite: 15 },
    { label: "Thu", fiveG: 71, satellite: 29 },
    { label: "Fri", fiveG: 88, satellite: 12 },
    { label: "Sat", fiveG: 76, satellite: 24 },
    { label: "Sun", fiveG: 91, satellite: 9 },
  ],
};

function renderHybridKpis() {
  const row = document.getElementById("hybridKpiRow");
  const pill = document.getElementById("hybridActiveLinkPill");
  if (!row) return;

  if (pill) pill.textContent = `Active link: ${HYBRID_DATA.activeLink}`;

  const kpis = [
    {
      label: "Failover events (30d)",
      value: HYBRID_DATA.failoverEvents,
      subtitle: "Target ≤ 5 / month",
      status: HYBRID_DATA.failoverEvents <= 5 ? "good" : HYBRID_DATA.failoverEvents <= 8 ? "warn" : "bad",
    },
    {
      label: "Satellite availability",
      value: `${HYBRID_DATA.satelliteAvailability}%`,
      subtitle: "Target ≥ 99.0%",
      status: HYBRID_DATA.satelliteAvailability >= 99.0 ? "good" : HYBRID_DATA.satelliteAvailability >= 98.5 ? "warn" : "bad",
    },
    {
      label: "Satellite latency p95",
      value: `${HYBRID_DATA.satelliteLatencyP95} ms`,
      subtitle: "Target ≤ 60 ms (LEO)",
      status: HYBRID_DATA.satelliteLatencyP95 <= 60 ? "good" : HYBRID_DATA.satelliteLatencyP95 <= 80 ? "warn" : "bad",
    },
    {
      label: "Obstruction rate",
      value: `${HYBRID_DATA.obstructionRate}%`,
      subtitle: "Target ≤ 0.27%",
      status: HYBRID_DATA.obstructionRate <= 0.27 ? "good" : HYBRID_DATA.obstructionRate <= 0.30 ? "warn" : "bad",
    },
    {
      label: "Satellite downlink / uplink",
      value: `↓${HYBRID_DATA.satelliteDownlink} / ↑${HYBRID_DATA.satelliteUplink} Mbps`,
      subtitle: "Target ↓≥100 / ↑≥10 Mbps",
      status: HYBRID_DATA.satelliteDownlink >= 100 && HYBRID_DATA.satelliteUplink >= 10 ? "good" : "warn",
    },
    {
      label: "Satellite SNR",
      value: `${HYBRID_DATA.satelliteSNR} dB`,
      subtitle: "Target ≥ 9 dB",
      status: HYBRID_DATA.satelliteSNR >= 9 ? "good" : HYBRID_DATA.satelliteSNR >= 7 ? "warn" : "bad",
    },
  ];

  row.innerHTML = "";
  kpis.forEach(({ label, value, subtitle, status }) => {
    const card = document.createElement("div");
    card.className = `kpi-card ${status}`;
    card.innerHTML = `
      <div class="kpi-label">${label}</div>
      <div class="kpi-value">${value}</div>
      <div class="kpi-subtitle">${subtitle}</div>
    `;
    row.appendChild(card);
  });

  // Operational detail row
  const opsRow = document.getElementById("hybridOpsKpiRow");
  if (!opsRow) return;

  const alertStatus = HYBRID_DATA.activeAlerts === 0 ? "good" : "warn";
  const alertValue = HYBRID_DATA.activeAlerts === 0
    ? "None"
    : `${HYBRID_DATA.activeAlerts} — ${HYBRID_DATA.activeAlertType}`;

  const opsKpis = [
    {
      label: "Outage duration (24h)",
      value: `${HYBRID_DATA.outageDurationMins} min`,
      subtitle: "Target ≤ 10 min / day",
      status: HYBRID_DATA.outageDurationMins <= 10 ? "good" : HYBRID_DATA.outageDurationMins <= 20 ? "warn" : "bad",
    },
    {
      label: "Active dish alerts",
      value: alertValue,
      subtitle: HYBRID_DATA.activeAlerts > 0 ? "Target: none — click for details" : "Target: none",
      status: alertStatus,
      clickable: HYBRID_DATA.activeAlerts > 0,
    },
    {
      label: "Ping drop rate (real-time)",
      value: `${HYBRID_DATA.pingDropRateRT}%`,
      subtitle: "Target ≤ 0.5%",
      status: HYBRID_DATA.pingDropRateRT <= 0.5 ? "good" : HYBRID_DATA.pingDropRateRT <= 1.0 ? "warn" : "bad",
    },
    {
      label: "Priority data used",
      value: `${HYBRID_DATA.priorityDataUsedPct}%`,
      subtitle: "Target ≤ 80% of cap",
      status: HYBRID_DATA.priorityDataUsedPct <= 80 ? "good" : HYBRID_DATA.priorityDataUsedPct <= 90 ? "warn" : "bad",
    },
  ];

  opsRow.innerHTML = "";
  opsKpis.forEach(({ label, value, subtitle, status, clickable }) => {
    const card = document.createElement("div");
    card.className = `kpi-card ${status}${clickable ? " kpi-card-clickable" : ""}`;
    card.innerHTML = `
      <div class="kpi-label">${label}</div>
      <div class="kpi-value">${value}</div>
      <div class="kpi-subtitle">${subtitle}</div>
    `;
    if (clickable) {
      card.addEventListener("click", toggleDishAlertDetail);
    }
    opsRow.appendChild(card);
  });
}

function toggleDishAlertDetail() {
  const overlay = document.getElementById("dishAlertModal");
  if (!overlay) return;
  renderDishAlertModal();
  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeDishAlertModal() {
  const overlay = document.getElementById("dishAlertModal");
  if (!overlay) return;
  overlay.classList.add("hidden");
  document.body.style.overflow = "";
}

function renderDishAlertModal() {
  const panel = document.getElementById("dishAlertPanel");
  if (!panel) return;
  const d = HYBRID_DATA.dishAlertDetail;
  const downlinkDrop = Math.round((1 - d.currentDownlink / d.baselineDownlink) * 100);
  const uplinkDrop = Math.round((1 - d.currentUplink / d.baselineUplink) * 100);

  panel.innerHTML = `
    <div class="modal-header">
      <div class="modal-title-group">
        <span class="status-pill bad">Breach</span>
        <div>
          <div class="modal-title" id="dishAlertModalTitle">${HYBRID_DATA.activeAlertType} — Starlink dish obstructed</div>
          <div class="modal-subtitle">Active for ${d.alertSince} &nbsp;·&nbsp; ${d.customer} &nbsp;·&nbsp; ${d.siteName}</div>
        </div>
      </div>
      <button class="modal-close-btn" id="dishAlertClose" aria-label="Close">✕</button>
    </div>

    <div class="modal-body">
      <div class="modal-col">
        <div class="modal-section-label">Site details</div>
        <div class="alert-row"><span>Customer</span><strong>${d.customer}</strong></div>
        <div class="alert-row"><span>Site</span><strong>${d.siteName}</strong></div>
        <div class="alert-row"><span>Region</span><strong>${d.region}</strong></div>
        <div class="alert-row"><span>Coordinates</span><strong>${d.coordinates}</strong></div>

        <div class="modal-section-label" style="margin-top:1.25rem">Sky obstruction</div>
        <div class="obstruction-bar-wrap">
          <div class="obstruction-bar-track">
            <div class="obstruction-bar-fill" style="width:${d.skyObstructionPct}%"></div>
          </div>
          <div class="obstruction-bar-labels">
            <span class="obstruction-bar-pct">${d.skyObstructionPct}% of sky view blocked</span>
            <span class="obstruction-bar-target">Target: &lt;10%</span>
          </div>
        </div>
      </div>

      <div class="modal-col">
        <div class="modal-section-label">Performance impact</div>
        <div class="impact-metric">
          <div class="impact-label">Downlink throughput</div>
          <div class="impact-values">
            <span class="impact-baseline">${d.baselineDownlink} Mbps</span>
            <span class="impact-arrow">→</span>
            <strong class="bad-text">${d.currentDownlink} Mbps &nbsp;<span class="impact-drop">−${downlinkDrop}%</span></strong>
          </div>
          <div class="impact-bar-track">
            <div class="impact-bar-fill bad" style="width:${Math.round(d.currentDownlink/d.baselineDownlink*100)}%"></div>
          </div>
        </div>
        <div class="impact-metric">
          <div class="impact-label">Uplink throughput</div>
          <div class="impact-values">
            <span class="impact-baseline">${d.baselineUplink} Mbps</span>
            <span class="impact-arrow">→</span>
            <strong class="bad-text">${d.currentUplink} Mbps &nbsp;<span class="impact-drop">−${uplinkDrop}%</span></strong>
          </div>
          <div class="impact-bar-track">
            <div class="impact-bar-fill bad" style="width:${Math.round(d.currentUplink/d.baselineUplink*100)}%"></div>
          </div>
        </div>

        <div class="modal-action-box">
          <div class="modal-action-icon">⚑</div>
          <div>
            <div class="modal-action-title">Field inspection required</div>
            <div class="modal-action-body">Dish repositioning or obstruction clearance needed at <strong>${d.siteName}</strong>. Log a site visit to restore full throughput.</div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("dishAlertClose")?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeDishAlertModal();
  });
}

let hybridUtilizationChart;

function buildHybridUtilizationChart() {
  const ctx = document.getElementById("hybridUtilizationChart");
  if (!ctx) return;

  if (hybridUtilizationChart) hybridUtilizationChart.destroy();

  hybridUtilizationChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: HYBRID_DATA.utilizationHistory.map((d) => d.label),
      datasets: [
        {
          label: "5G (%)",
          data: HYBRID_DATA.utilizationHistory.map((d) => d.fiveG),
          backgroundColor: "rgba(56, 189, 248, 0.7)",
          borderRadius: 4,
          stack: "utilization",
        },
        {
          label: "Satellite (%)",
          data: HYBRID_DATA.utilizationHistory.map((d) => d.satellite),
          backgroundColor: "rgba(168, 85, 247, 0.7)",
          borderRadius: 4,
          stack: "utilization",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: { color: "#cbd5f5" },
          grid: { color: "#1e293b" },
        },
        y: {
          stacked: true,
          min: 0,
          max: 100,
          ticks: { color: "#cbd5f5", callback: (v) => `${v}%` },
          grid: { color: "#1e293b" },
        },
      },
      plugins: {
        legend: { labels: { color: "#cbd5f5", font: { size: 11 } } },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.formattedValue}%`,
          },
        },
      },
    },
  });
}

function initOperationsDashboard() {
  buildOpsTransportChart();
  buildRadioQualityChart();
  renderHeatmap();
  initHeatmapAnnotations();
  renderHybridKpis();
  buildHybridUtilizationChart();

  // Close dish alert modal when clicking the backdrop
  const overlay = document.getElementById("dishAlertModal");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeDishAlertModal();
    });
  }
  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDishAlertModal();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initDashboardTabs();
  switchDashboard("executive");
});
