
// Mock data for customers and transport
const customers = [
  {
    name: "Acme Logistics",
    region: "west",
    vertical: "Logistics",
    availability: 99.72,
    lossP95: 0.32,
    latencyP95: 68,
    downP50: 180,
    usageTb: 42.5,
  },
  {
    name: "Bright Retail Group",
    region: "west",
    vertical: "Retail",
    availability: 99.18,
    lossP95: 0.7,
    latencyP95: 82,
    downP50: 155,
    usageTb: 63.8,
  },
  {
    name: "CityCare Clinics",
    region: "central",
    vertical: "Healthcare",
    availability: 99.88,
    lossP95: 0.18,
    latencyP95: 54,
    downP50: 210,
    usageTb: 57.1,
  },
  {
    name: "NorthSteel Manufacturing",
    region: "central",
    vertical: "Manufacturing",
    availability: 98.94,
    lossP95: 1.1,
    latencyP95: 95,
    downP50: 140,
    usageTb: 38.4,
  },
  {
    name: "OmniBank Branch Network",
    region: "east",
    vertical: "Finance",
    availability: 99.63,
    lossP95: 0.42,
    latencyP95: 72,
    downP50: 190,
    usageTb: 71.9,
  },
  {
    name: "MetroPublic Services",
    region: "east",
    vertical: "Public Sector",
    availability: 98.61,
    lossP95: 1.4,
    latencyP95: 108,
    downP50: 132,
    usageTb: 29.7,
  },
  {
    name: "Horizon Media Offices",
    region: "west",
    vertical: "Media",
    availability: 99.4,
    lossP95: 0.55,
    latencyP95: 75,
    downP50: 230,
    usageTb: 51.0,
  },
  {
    name: "EduConnect Campuses",
    region: "east",
    vertical: "Education",
    availability: 99.27,
    lossP95: 0.5,
    latencyP95: 78,
    downP50: 175,
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

function getSlaStatus(c) {
  const availOk = c.availability >= 99.5;
  const lossOk = c.lossP95 <= 0.5;
  const latOk = c.latencyP95 <= 80;

  const okCount = [availOk, lossOk, latOk].filter(Boolean).length;
  if (okCount === 3) return "good";
  if (okCount === 2) return "warn";
  return "bad";
}

function formatStatusLabel(status) {
  if (status === "good") return "Good";
  if (status === "warn") return "At Risk";
  return "Breach";
}

function computeKpis(region) {
  const base =
    region === "all" ? customers : customers.filter((c) => c.region === region);
  if (!base.length) {
    return {
      availability: 0,
      slaWithin: 0,
      lossP95: 0,
      latencyP95: 0,
      goodput: 0,
    };
  }

  const avg = (arr) => arr.reduce((a, v) => a + v, 0) / arr.length;

  const availability = avg(base.map((c) => c.availability));
  const lossP95 = avg(base.map((c) => c.lossP95));
  const latencyP95 = avg(base.map((c) => c.latencyP95));
  const goodput = avg(base.map((c) => c.downP50));
  const total = base.length;
  const goodCount = base.filter((c) => getSlaStatus(c) === "good").length;
  const slaWithin = (goodCount / total) * 100;

  return { availability, slaWithin, lossP95, latencyP95, goodput };
}

function renderCustomerTable(region) {
  const tbody = document.getElementById("customerTableBody");
  tbody.innerHTML = "";

  const base =
    region === "all" ? customers : customers.filter((c) => c.region === region);

  base.forEach((c) => {
    const tr = document.createElement("tr");

    const status = getSlaStatus(c);

    tr.innerHTML = `
      <td>${c.name}</td>
      <td>${c.region.charAt(0).toUpperCase() + c.region.slice(1)}</td>
      <td>${c.vertical}</td>
      <td>${c.availability.toFixed(2)}</td>
      <td>${c.lossP95.toFixed(2)}</td>
      <td>${c.latencyP95.toFixed(0)}</td>
      <td>${c.downP50.toFixed(0)}</td>
      <td>${c.usageTb.toFixed(1)}</td>
      <td><span class="badge ${status}">${formatStatusLabel(status)}</span></td>
    `;

    tbody.appendChild(tr);
  });
}

let transportChart;
let topConsumersChart;

function buildTransportChart(region) {
  const ctx = document.getElementById("transportChart").getContext("2d");
  const base =
    region === "all"
      ? transportTimeSeries
      : transportTimeSeries.filter((p) => p.region === region);

  const labels = base.filter((p) => p.region === (region === "all" ? "west" : region)).map((p) => p.date);
  const byRegion = (r, field) =>
    base.filter((p) => p.region === r).map((p) => p[field]);

  const westAvail = byRegion("west", "availability");
  const centralAvail = byRegion("central", "availability");
  const eastAvail = byRegion("east", "availability");

  if (transportChart) transportChart.destroy();

  transportChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Availability % (West)",
          data: westAvail,
          borderColor: "#22c55e",
          tension: 0.3,
        },
        {
          label: "Availability % (Central)",
          data: centralAvail,
          borderColor: "#eab308",
          tension: 0.3,
        },
        {
          label: "Availability % (East)",
          data: eastAvail,
          borderColor: "#38bdf8",
          tension: 0.3,
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
          grid: { color: "#1e293b" },
        },
      },
    },
  });
}

function buildTopConsumers(region) {
  const ctx = document.getElementById("topConsumersChart").getContext("2d");

  const base =
    region === "all" ? customers : customers.filter((c) => c.region === region);

  const sorted = [...base]
    .sort((a, b) => b.usageTb - a.usageTb)
    .slice(0, 6);

  if (topConsumersChart) topConsumersChart.destroy();

  topConsumersChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: sorted.map((c) => c.name),
      datasets: [
        {
          label: "Usage TB (30 days)",
          data: sorted.map((c) => c.usageTb),
          backgroundColor: "rgba(96, 165, 250, 0.9)",
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
          ticks: { color: "#cbd5f5", font: { size: 9 } },
          grid: { display: false },
        },
        y: {
          ticks: { color: "#cbd5f5", font: { size: 10 } },
          grid: { color: "#1e293b" },
        },
      },
    },
  });
}

function updateKpiCards(region) {
  const kpis = computeKpis(region);

  const availabilityEl = document.querySelector('[data-kpi="availability"]');
  const slaWithinEl = document.querySelector('[data-kpi="slaWithin"]');
  const lossLatencyEl = document.querySelector('[data-kpi="lossLatency"]');
  const goodputEl = document.querySelector('[data-kpi="goodput"]');

  availabilityEl.textContent = kpis.availability.toFixed(2) + "%";
  slaWithinEl.textContent = kpis.slaWithin.toFixed(0) + "%";
  lossLatencyEl.textContent =
    kpis.lossP95.toFixed(2) + "% • " + kpis.latencyP95.toFixed(0) + " ms";
  goodputEl.textContent = kpis.goodput.toFixed(0) + " Mbps";
}

function initDashboard() {
  const regionSelect = document.getElementById("regionSelect");

  function refresh() {
    const region = regionSelect.value;
    renderCustomerTable(region);
    updateKpiCards(region);
    buildTransportChart(region);
    buildTopConsumers(region);
  }

  regionSelect.addEventListener("change", refresh);

  refresh();
}

document.addEventListener("DOMContentLoaded", initDashboard);
