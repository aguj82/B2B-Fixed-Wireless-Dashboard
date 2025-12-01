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

const REGION_BASELINES = {
  west: { availability: 99.45, lossP95: 0.46, latencyP95: 72 },
  central: { availability: 99.05, lossP95: 0.7, latencyP95: 86 },
  east: { availability: 99.2, lossP95: 0.55, latencyP95: 76 },
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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function buildTimeRangeSeries(rangeKey) {
  const config = TIME_RANGE_CONFIG[rangeKey];
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
        base.availability + multiplier * config.variance.availability,
        98.6,
        99.9
      );
      const lossP95 = clamp(
        base.lossP95 + multiplier * config.variance.lossP95,
        0.15,
        1.6
      );
      const latencyP95 = clamp(
        base.latencyP95 + multiplier * config.variance.latencyP95,
        60,
        115
      );
      return { label, availability, lossP95, latencyP95 };
    });
  });

  return { labels, byRegion };
}

const transportTimeSeries = {
  hourly: buildTimeRangeSeries("hourly"),
  daily: buildTimeRangeSeries("daily"),
  weekly: buildTimeRangeSeries("weekly"),
  monthly: buildTimeRangeSeries("monthly"),
};

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
let topCustomersChart;

function renderTopCustomersChart(region, vendor, site) {
  const canvas = document.getElementById("topCustomersChart");
  const legend = document.getElementById("topCustomersLegend");
  if (!canvas || !legend) return;

  const filtered = selectionFilters(region, vendor, site)
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
        <p>${customer.name}</p>
        <small>${usageLabel} • ${customer.site}</small>
      </div>
    `;
    legend.appendChild(item);
  });
}

function transportSeriesForRange(rangeKey, region) {
  const series = transportTimeSeries[rangeKey];
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

function buildTransportChart(region, rangeKey) {
  const ctx = document.getElementById("transportChart").getContext("2d");
  const { labels, availabilitySeries, lossSeries, latencySeries } = transportSeriesForRange(rangeKey, region);

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

  function refresh() {
    updateKpiCards(selectedRegion, selectedVendor, selectedSite);
    renderCustomerTable(selectedRegion, selectedVendor, selectedSite);
    buildTransportChart(selectedRegion, selectedTimeRange);
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
    renderTopCustomersChart(selectedRegion, selectedVendor, selectedSite);
    updateSelectionPill(selectedRegion, selectedVendor, selectedSite);
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
};

let dashboardTabsInitialized = false;
let operationsInitialized = false;
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
      responsive: false,
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
