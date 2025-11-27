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
    vendor: "meraki",
    availability: 99.72,
    lossP95: 0.32,
    latencyP95: 68,
    usageTb: 42.5,
  },
  {
    name: "Bright Retail Group",
    region: "west",
    site: "Portland Edge",
    vendor: "cradlepoint",
    availability: 99.18,
    lossP95: 0.7,
    latencyP95: 82,
    usageTb: 63.8,
  },
  {
    name: "CityCare Clinics",
    region: "central",
    site: "Denver Core",
    vendor: "meraki",
    availability: 99.88,
    lossP95: 0.18,
    latencyP95: 54,
    usageTb: 57.1,
  },
  {
    name: "NorthSteel Manufacturing",
    region: "central",
    site: "Kansas City",
    vendor: "cradlepoint",
    availability: 98.94,
    lossP95: 1.1,
    latencyP95: 95,
    usageTb: 38.4,
  },
  {
    name: "OmniBank Branch Network",
    region: "east",
    site: "Philadelphia",
    vendor: "meraki",
    availability: 99.63,
    lossP95: 0.42,
    latencyP95: 72,
    usageTb: 71.9,
  },
  {
    name: "MetroPublic Services",
    region: "east",
    site: "Richmond",
    vendor: "cradlepoint",
    availability: 98.61,
    lossP95: 1.4,
    latencyP95: 108,
    usageTb: 29.7,
  },
  {
    name: "Horizon Media Offices",
    region: "west",
    site: "San Jose",
    vendor: "meraki",
    availability: 99.4,
    lossP95: 0.55,
    latencyP95: 75,
    usageTb: 51.0,
  },
  {
    name: "EduConnect Campuses",
    region: "east",
    site: "Boston",
    vendor: "meraki",
    availability: 99.27,
    lossP95: 0.5,
    latencyP95: 78,
    usageTb: 46.3,
  },
];

const transportTimeSeries = [
  { date: "Day -6", region: "west", availability: 99.4, lossP95: 0.45, latencyP95: 72 },
  { date: "Day -5", region: "west", availability: 99.3, lossP95: 0.52, latencyP95: 78 },
  { date: "Day -4", region: "west", availability: 99.5, lossP95: 0.4, latencyP95: 70 },
  { date: "Day -3", region: "west", availability: 99.2, lossP95: 0.48, latencyP95: 74 },
  { date: "Day -2", region: "west", availability: 99.6, lossP95: 0.36, latencyP95: 68 },
  { date: "Day -1", region: "west", availability: 99.7, lossP95: 0.39, latencyP95: 69 },
  { date: "Today", region: "west", availability: 99.5, lossP95: 0.42, latencyP95: 71 },

  { date: "Day -6", region: "central", availability: 99.1, lossP95: 0.68, latencyP95: 84 },
  { date: "Day -5", region: "central", availability: 98.9, lossP95: 0.74, latencyP95: 88 },
  { date: "Day -4", region: "central", availability: 99.0, lossP95: 0.63, latencyP95: 80 },
  { date: "Day -3", region: "central", availability: 98.8, lossP95: 0.79, latencyP95: 92 },
  { date: "Day -2", region: "central", availability: 99.0, lossP95: 0.71, latencyP95: 86 },
  { date: "Day -1", region: "central", availability: 99.1, lossP95: 0.67, latencyP95: 83 },
  { date: "Today", region: "central", availability: 99.0, lossP95: 0.69, latencyP95: 85 },

  { date: "Day -6", region: "east", availability: 99.2, lossP95: 0.55, latencyP95: 76 },
  { date: "Day -5", region: "east", availability: 99.0, lossP95: 0.61, latencyP95: 80 },
  { date: "Day -4", region: "east", availability: 99.3, lossP95: 0.53, latencyP95: 74 },
  { date: "Day -3", region: "east", availability: 99.1, lossP95: 0.59, latencyP95: 79 },
  { date: "Day -2", region: "east", availability: 99.4, lossP95: 0.51, latencyP95: 73 },
  { date: "Day -1", region: "east", availability: 99.5, lossP95: 0.48, latencyP95: 71 },
  { date: "Today", region: "east", availability: 99.3, lossP95: 0.52, latencyP95: 75 },
];

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

function selectionFilters(region, vendor, site) {
  return customers.filter(
    (c) =>
      (region === "all" || c.region === region) &&
      (vendor === "all" || c.vendor === vendor) &&
      (site === "all" || c.site === site)
  );
}

function updateKpiCards(region, vendor, site) {
  const filtered = selectionFilters(region, vendor, site);
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

function summarizeRegions() {
  const regionIds = [...new Set(customers.map((c) => c.region))];
  return regionIds.map((id) => {
    const regionCustomers = customers.filter((c) => c.region === id);
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
  return "Out of SLA";
}

function renderRegionCards(selectedRegion, onClick) {
  const container = document.getElementById("regionCards");
  container.innerHTML = "";
  const regions = summarizeRegions();

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

function renderVendorChips(selectedVendor, onClick) {
  const container = document.getElementById("vendorChips");
  container.innerHTML = "";
  const vendors = [
    { id: "all", label: "All vendors" },
    { id: "meraki", label: "Cisco Meraki" },
    { id: "cradlepoint", label: "ERC Cradlepoint" },
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

function renderSiteList(region, vendor, selectedSite, onClick) {
  const container = document.getElementById("siteList");
  container.innerHTML = "";
  const scopedCustomers = selectionFilters(region, vendor, "all");
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

function renderCustomerTable(region, vendor, site) {
  const tbody = document.getElementById("customerTableBody");
  tbody.innerHTML = "";
  const filtered = selectionFilters(region, vendor, site);

  filtered.forEach((c) => {
    const row = document.createElement("tr");
    const sla = slaStatus(c);
    row.innerHTML = `
      <td>${c.name}</td>
      <td>${c.region.charAt(0).toUpperCase() + c.region.slice(1)}</td>
      <td>${c.site}</td>
      <td>${c.vendor === "meraki" ? "Cisco Meraki" : "ERC Cradlepoint"}</td>
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

function buildTransportChart(region) {
  const ctx = document.getElementById("transportChart").getContext("2d");
  let labels = [];
  let availabilitySeries = [];
  let lossSeries = [];
  let latencySeries = [];

  if (region === "all") {
    labels = [...new Set(transportTimeSeries.map((p) => p.date))];
    labels.forEach((label) => {
      const points = transportTimeSeries.filter((p) => p.date === label);
      const avg = (field) => points.reduce((sum, p) => sum + p[field], 0) / points.length;
      availabilitySeries.push(avg("availability"));
      lossSeries.push(avg("lossP95"));
      latencySeries.push(avg("latencyP95"));
    });
  } else {
    const base = transportTimeSeries.filter((p) => p.region === region);
    labels = base.map((p) => p.date);
    availabilitySeries = base.map((p) => p.availability);
    lossSeries = base.map((p) => p.lossP95);
    latencySeries = base.map((p) => p.latencyP95);
  }

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

function updateSelectionPill(region, vendor, site) {
  const regionLabel = region === "all" ? "All regions" : region.charAt(0).toUpperCase() + region.slice(1);
  const vendorLabel =
    vendor === "all" ? "All vendors" : vendor === "meraki" ? "Cisco Meraki" : "ERC Cradlepoint";
  const siteLabel = site === "all" ? "All sites" : site;
  document.getElementById("selectionPill").textContent = `${regionLabel} • ${vendorLabel} • ${siteLabel}`;
}

function initDashboard() {
  let selectedRegion = "all";
  let selectedVendor = "all";
  let selectedSite = "all";

  function refresh() {
    updateKpiCards(selectedRegion, selectedVendor, selectedSite);
    renderCustomerTable(selectedRegion, selectedVendor, selectedSite);
    buildTransportChart(selectedRegion);
    renderRegionCards(selectedRegion, (region) => {
      selectedRegion = region;
      selectedSite = "all";
      refresh();
    });
    renderVendorChips(selectedVendor, (vendor) => {
      selectedVendor = vendor;
      selectedSite = "all";
      refresh();
    });
    renderSiteList(selectedRegion, selectedVendor, selectedSite, (site) => {
      selectedSite = site;
      refresh();
    });
    updateSelectionPill(selectedRegion, selectedVendor, selectedSite);
  }

  refresh();
}

document.addEventListener("DOMContentLoaded", initDashboard);
