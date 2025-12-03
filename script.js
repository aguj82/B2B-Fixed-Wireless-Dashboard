// Targets and mock data
const TARGETS = {
  availability: 99.5,
  lossP95: 0.5,
  latencyP95: 80,
};

const customers = [
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
    availability: 99.18,
    lossP95: 0.7,
    latencyP95: 82,
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
    name: "NorthSteel Manufacturing",
    region: "central",
    site: "Kansas City",
    vendor: "ericsson",
    technology: "4g",
    availability: 98.94,
    lossP95: 1.1,
    latencyP95: 95,
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
    availability: 99.4,
    lossP95: 0.55,
    latencyP95: 75,
    usageTb: 51.0,
  },
  {
    name: "EduConnect Campuses",
    region: "east",
    site: "Boston",
    vendor: "cisco",
    technology: "5g",
    availability: 99.27,
    lossP95: 0.5,
    latencyP95: 78,
    usageTb: 46.3,
  },
  {
    name: "UrbanGrid Utilities",
    region: "central",
    site: "St. Louis",
    vendor: "ericsson",
    technology: "5g",
    availability: 99.4,
    lossP95: 0.4,
    latencyP95: 70,
    usageTb: 34.2,
  },
];

const REGION_BASELINES = {
  west: { availability: 99.45, lossP95: 0.46, latencyP95: 72 },
  central: { availability: 99.05, lossP95: 0.7, latencyP95: 86 },
  east: { availability: 99.2, lossP95: 0.55, latencyP95: 76 },
};

const TECH_LABELS = {
  all: "All access",
  "4g": "4G/LTE",
  "5g": "5G",
};

const VENDOR_LABELS = {
  cisco: "Cisco",
  ericsson: "Ericsson",
};

const PRODUCTS = [
  {
    id: "smb",
    name: "Small/Medium Business",
    availability: 99.22,
    lossP95: 0.58,
    latencyP95: 82,
    slaWithin: 86,
    monthly: [
      { month: "Jan", availability: { p50: 99.1, p95: 99.6, mean: 99.25 }, loss: { p50: 0.55, p95: 0.9, mean: 0.62 }, latency: { p50: 78, p95: 96, mean: 84 } },
      { month: "Feb", availability: { p50: 99.12, p95: 99.62, mean: 99.2 }, loss: { p50: 0.52, p95: 0.86, mean: 0.6 }, latency: { p50: 77, p95: 95, mean: 83 } },
      { month: "Mar", availability: { p50: 99.08, p95: 99.58, mean: 99.18 }, loss: { p50: 0.58, p95: 0.94, mean: 0.65 }, latency: { p50: 80, p95: 98, mean: 85 } },
      { month: "Apr", availability: { p50: 99.2, p95: 99.64, mean: 99.28 }, loss: { p50: 0.5, p95: 0.88, mean: 0.58 }, latency: { p50: 79, p95: 95, mean: 83 } },
      { month: "May", availability: { p50: 99.26, p95: 99.7, mean: 99.34 }, loss: { p50: 0.48, p95: 0.82, mean: 0.55 }, latency: { p50: 78, p95: 93, mean: 82 } },
      { month: "Jun", availability: { p50: 99.24, p95: 99.68, mean: 99.32 }, loss: { p50: 0.5, p95: 0.86, mean: 0.56 }, latency: { p50: 77, p95: 92, mean: 81 } },
      { month: "Jul", availability: { p50: 99.18, p95: 99.62, mean: 99.24 }, loss: { p50: 0.55, p95: 0.9, mean: 0.6 }, latency: { p50: 79, p95: 96, mean: 84 } },
      { month: "Aug", availability: { p50: 99.16, p95: 99.6, mean: 99.22 }, loss: { p50: 0.57, p95: 0.92, mean: 0.62 }, latency: { p50: 80, p95: 97, mean: 85 } },
      { month: "Sep", availability: { p50: 99.22, p95: 99.66, mean: 99.3 }, loss: { p50: 0.5, p95: 0.84, mean: 0.55 }, latency: { p50: 78, p95: 92, mean: 82 } },
      { month: "Oct", availability: { p50: 99.3, p95: 99.72, mean: 99.38 }, loss: { p50: 0.46, p95: 0.8, mean: 0.52 }, latency: { p50: 76, p95: 90, mean: 80 } },
      { month: "Nov", availability: { p50: 99.28, p95: 99.7, mean: 99.35 }, loss: { p50: 0.48, p95: 0.82, mean: 0.54 }, latency: { p50: 77, p95: 91, mean: 81 } },
    ],
    carriers: {
      "4g": { availability: 99.1, lossP95: 0.68, latencyP95: 88, slaWithin: 83 },
      "5g": { availability: 99.34, lossP95: 0.48, latencyP95: 77, slaWithin: 89 },
    },
    customers: [
      { name: "Bank", slaWithin: 82, availability: 99.12, lossP95: 0.66, latencyP95: 88, status: "improved" },
      { name: "Healthcare provider", slaWithin: 85, availability: 99.2, lossP95: 0.6, latencyP95: 85, status: "steady" },
      { name: "Coffee chain", slaWithin: 81, availability: 99.05, lossP95: 0.74, latencyP95: 90, status: "failing" },
      { name: "Retail chain", slaWithin: 88, availability: 99.32, lossP95: 0.52, latencyP95: 80, status: "improved" },
      { name: "Production house", slaWithin: 84, availability: 99.18, lossP95: 0.62, latencyP95: 86, status: "steady" },
      { name: "Manufacturer", slaWithin: 83, availability: 99.14, lossP95: 0.64, latencyP95: 87, status: "steady" },
      { name: "Public agency", slaWithin: 86, availability: 99.26, lossP95: 0.58, latencyP95: 84, status: "improved" },
      { name: "College", slaWithin: 82, availability: 99.1, lossP95: 0.66, latencyP95: 89, status: "failing" },
      { name: "School", slaWithin: 87, availability: 99.28, lossP95: 0.56, latencyP95: 83, status: "improved" },
    ],
    regions: {
      west: { availability: 99.3, lossP95: 0.52, latencyP95: 81, slaWithin: 89 },
      central: { availability: 99.1, lossP95: 0.64, latencyP95: 86, slaWithin: 84 },
      east: { availability: 99.2, lossP95: 0.58, latencyP95: 83, slaWithin: 87 },
    },
    vendors: {
      cisco: { availability: 99.34, lossP95: 0.48, latencyP95: 79, slaWithin: 90 },
      ericsson: { availability: 99.1, lossP95: 0.66, latencyP95: 86, slaWithin: 83 },
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
];

const PRODUCT_CUSTOMER_MAP = {
  smb: ["Coffee chain", "Retail chain"],
  enterprise: ["Production house", "Manufacturer", "Bank", "Healthcare provider"],
  government: ["Public agency"],
  education: ["College", "School"],
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
      (vendor === "all" || c.vendor === vendor) &&
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
  ];

  vendors.forEach((vendor) => {
    const scoped = selectionFilters(region, vendor.id, site, technology);
    const summary = averageMetrics(scoped);
    const unavailable = scoped.length === 0;
    const status = unavailable ? "na" : slaStatus(summary);
    const statusText = unavailable ? "Not Available" : regionStatusText(summary);
    const metrics = [
      { label: "Availability", key: "availability" },
      { label: "Packet loss p95", key: "lossP95" },
      { label: "Latency p95", key: "latencyP95" },
    ];
    const metricsHtml = metrics
      .map(({ label, key }) => {
        const value = summary[key];
        const metricClass = unavailable ? "" : statusForMetricKey(key, value);
        return `<div class="metric-line"><span>${label}</span><strong class="${metricClass}">${formatMetricValue(key, value)}</strong></div>`;
      })
      .join("");
    const card = document.createElement("div");
    const classNames = [
      "vendor-card",
      selectedVendor === vendor.id ? "active" : "",
      unavailable ? "unavailable" : "",
    ]
      .filter(Boolean)
      .join(" ");
    card.className = classNames;
    card.innerHTML = `
      <div class="title-row">
        <h4>${vendor.label} scorecard</h4>
        <span class="status-pill ${status}">${statusText}</span>
      </div>
      ${metricsHtml}
    `;
    if (!unavailable) {
      card.addEventListener("click", () => onClick(vendor.id));
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

function buildCarrierChart(product) {
  const canvas = document.getElementById("carrierChart");
  if (!canvas || !product) return;
  const labels = ["Availability", "Loss p95", "Latency p95", "SLA within"];
  const datasetFor = (tech) => [
    product.carriers[tech].availability,
    product.carriers[tech].lossP95,
    product.carriers[tech].latencyP95,
    product.carriers[tech].slaWithin,
  ];

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

  if (carrierChart) carrierChart.destroy();
  carrierChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "4G",
          data: datasetFor("4g"),
          backgroundColor: "rgba(56, 189, 248, 0.6)",
        },
        {
          label: "5G",
          data: datasetFor("5g"),
          backgroundColor: "rgba(124, 58, 237, 0.65)",
        },
      ],
    },
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
  product.customers.forEach((cust) => {
    const statusClass = cust.status === "improved" ? "good" : cust.status === "steady" ? "warn" : "bad";
    const statusIcon = statusClass === "good" ? "▲" : statusClass === "warn" ? "–" : "▼";
    const availabilityStatus = metricStatus(cust.availability, "availability");
    const lossStatus = metricStatus(cust.lossP95, "loss");
    const latencyStatus = metricStatus(cust.latencyP95, "latency");
    const slaStatusClass = productStatusClass(cust.slaWithin, "slaWithin");
    const isLinkedToProduct = linkedCustomers.has(cust.name);
    const card = document.createElement("div");
    card.className = `customer-card ${isLinkedToProduct ? "highlighted" : ""}`;
    card.innerHTML = `
      <div class="customer-card-header">
        <div class="customer-name-group">
          <h4>${cust.name}</h4>
          ${isLinkedToProduct ? "<span class=\"customer-product-tag\">Mapped to product</span>" : ""}
        </div>
        <span class="status-pill ${statusClass}" aria-label="${cust.status} trend" title="${cust.status}">
          <span class="status-icon">${statusIcon}</span>
        </span>
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
  [
    { id: "cisco", label: "Cisco" },
    { id: "ericsson", label: "Ericsson" },
  ].forEach((vendor) => {
    const summary = product.vendors[vendor.id];
    const status = productStatusClass(summary.slaWithin, "slaWithin");
    const card = document.createElement("div");
    card.className = "vendor-card";
    card.innerHTML = `
      <div class="title-row">
        <h4>${vendor.label}</h4>
        <span class="status-pill ${status}">${status === "good" ? "On target" : status === "warn" ? "At risk" : "Breach"}</span>
      </div>
      <div class="metric-line"><span>Availability</span><strong>${summary.availability.toFixed(2)}%</strong></div>
      <div class="metric-line"><span>Packet loss p95</span><strong>${summary.lossP95.toFixed(2)}%</strong></div>
      <div class="metric-line"><span>Latency p95</span><strong>${summary.latencyP95.toFixed(0)} ms</strong></div>
      <div class="metric-line"><span>SLA within</span><strong>${summary.slaWithin.toFixed(0)}%</strong></div>
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
  if (!input || !button || !status) return;

  button.addEventListener("click", () => {
    const note = input.value.trim();
    status.textContent = note ? `Annotation applied: ${note}` : "No recent annotations.";
    if (note) input.value = "";
  });
}

function initOperationsDashboard() {
  buildOpsTransportChart();
  buildRadioQualityChart();
  renderHeatmap();
  initHeatmapAnnotations();
}

document.addEventListener("DOMContentLoaded", () => {
  initDashboardTabs();
  switchDashboard("executive");
});
