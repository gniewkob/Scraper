// Ustawienia Chart.js
Chart.defaults.color = '#f1f1f1';
Chart.defaults.plugins.legend.labels.color = '#f1f1f1';

// --- WYBÓR MIASTA ---
let selectedCity = '';
let currentProduct = '';
let currentOffset = 0;
let currentLimit = 10;
let currentSort = 'price';
let currentOrder = 'asc';
let userLat = null, userLon = null, selectedRadius = 10;

// --- INICJALIZACJA SELECTÓW PRODUKTÓW I MIAST ---
const productSelect = document.getElementById("productSelect");
const alertProductSelect = document.getElementById("alertProductSelect");

// Ładowanie produktów
async function loadProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();
  productSelect.innerHTML = '';
  if (alertProductSelect) alertProductSelect.innerHTML = '';
  products.forEach(p => {
    const opt1 = document.createElement("option");
    opt1.value = p.name;
    opt1.textContent = p.label;
    productSelect.appendChild(opt1);
    if (alertProductSelect) {
      const opt2 = opt1.cloneNode(true);
      alertProductSelect.appendChild(opt2);
    }
  });
  if (products.length > 0) {
    productSelect.value = products[0].name;
    currentProduct = products[0].name;
    if (alertProductSelect) alertProductSelect.value = products[0].name;
    loadProductData(products[0].name);
  }
}

// Ładowanie miast
async function loadCities() {
  const res = await fetch("/api/cities");
  const cities = await res.json();
  const sel = document.getElementById('citySelect');
  sel.innerHTML = '<option value="">Wszystkie miasta...</option>';
  cities.forEach(city => {
    const o = document.createElement('option');
    o.value = city;
    o.textContent = city;
    sel.appendChild(o);
  });
}

// Obsługa wyboru miasta
document.getElementById('citySelect').onchange = function() {
  selectedCity = this.value;
  currentOffset = 0;
  loadProductData(currentProduct);
  loadGroupedAlerts();
  updateFilterInfo();
};

document.getElementById('radiusSelect').onchange = function() {
  selectedRadius = parseInt(this.value, 10);
  if (userLat && userLon) {
    loadProductData(currentProduct);
  }
};

document.getElementById('geoBtn').onclick = function() {
  if (!navigator.geolocation) {
    alert("Twoja przeglądarka nie obsługuje geolokalizacji.");
    return;
  }
  navigator.geolocation.getCurrentPosition(function(pos) {
    userLat = pos.coords.latitude;
    userLon = pos.coords.longitude;
    // reset miasta - wybieramy tylko po geolokalizacji
    document.getElementById('citySelect').value = '';
    selectedCity = '';
    loadProductData(currentProduct);
    loadGroupedAlerts();
    updateFilterInfo();
  }, function() {
    alert("Nie udało się pobrać lokalizacji.");
  });
};

// Obsługa wyboru produktu
productSelect.addEventListener("change", e => {
  currentOffset = 0;
  currentProduct = e.target.value;
  loadProductData(currentProduct);
  updateFilterInfo();
});

// Pasek informacyjny z aktywnym filtrem
function updateFilterInfo() {
  const info = document.getElementById('filterInfo');
  const product = productSelect.selectedOptions[0]?.textContent || '';
  if (userLat && userLon && selectedRadius) {
    info.textContent = `Filtr: ${selectedRadius} km od Twojej lokalizacji | Produkt: ${product}`;
  } else {
    const city = selectedCity ? `Miasto: ${selectedCity}` : "Wszystkie miasta";
    info.textContent = `Filtr: ${city} | Produkt: ${product}`;
  }
}

// --- GŁÓWNE ŁADOWANIE DANYCH PRODUKTU Z FILTREM MIASTA ---
async function loadProductData(name) {
  currentProduct = name;
  let url = `/api/product/${encodeURIComponent(name)}?limit=50&offset=0&sort=price&order=asc`;
  if (selectedCity) url += `&city=${encodeURIComponent(selectedCity)}`;
  if (userLat && userLon && selectedRadius) url += `&lat=${userLat}&lon=${userLon}&radius=${selectedRadius}`;
  const res = await fetch(url);
  const data = await res.json();
  renderTopOffers(data.top3);
  const prices = data.trend.map(p => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  renderPriceChart(data.trend, min, max);
  updateAlertBanner(data.trend, min);
  updateFilterInfo();
}

// --- SORTOWANIE & PAGINACJA ---
// document.getElementById('sortSelect').onchange = function() {
//   currentSort = this.value;
//   currentOffset = 0;
//   loadProductData(currentProduct);
// };
// document.getElementById('orderSelect').onchange = function() {
//   currentOrder = this.value;
//   currentOffset = 0;
//   loadProductData(currentProduct);
// };

function renderPagination(total, limit, offset) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;
  const paginationDiv = document.getElementById('pagination');
  paginationDiv.innerHTML = '';
  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-light btn-sm mx-1';
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;
    btn.onclick = () => {
      currentOffset = (i - 1) * limit;
      loadProductData(currentProduct);
    };
    paginationDiv.appendChild(btn);
  }
}

function renderCountInfo(total, limit, offset) {
  const countInfo = document.getElementById('countInfo');
  const first = offset + 1;
  const last = Math.min(offset + limit, total);
  countInfo.textContent = `Wyświetlasz ${first}–${last} z ${total} ofert`;
}

// --- 3 NAJTAŃSZE OFERTY ---
function renderTopOffers(offers) {
  const container = document.getElementById("productTable");
  container.innerHTML = `<div class="table-responsive"><table class="table table-dark table-bordered">
    <thead><tr><th>Cena</th><th>Apteka</th><th>Adres</th><th>Mapa</th></tr></thead><tbody>
    ${offers.map(o => `
      <tr>
        <td>${o.price.toFixed(2)} zł</td>
        <td>${o.pharmacy || "–"}</td>
        <td>${o.address || "–"}</td>
        <td>${o.map_url ? `<a href="${o.map_url}" target="_blank" class="btn btn-sm btn-outline-light">Mapa</a>` : "–"}</td>
      </tr>`).join("")}
    </tbody></table></div>`;
}

// --- CHART: TREND CEN ---
const priceTrendChartCtx = document.getElementById("priceTrendChart").getContext("2d");
let priceChart;

function renderPriceChart(data, min, max) {
  if (priceChart) priceChart.destroy();
  const grouped = {};
  data.forEach(p => {
    const day = p.fetched_at.slice(0, 10);
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(p.price);
  });

  const points = Object.entries(grouped)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([day, prices]) => ({
      x: new Date(day),
      y: prices.reduce((a, b) => a + b, 0) / prices.length
    }));

  priceChart = new Chart(priceTrendChartCtx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Średnia cena dzienna [zł]',
        data: points,
        borderColor: '#4be2c2',
        backgroundColor: '#4be2c2',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#4be2c2',
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 0 },
      plugins: {
        legend: { labels: { color: '#f1f1f1' } },
        title: {
          display: true,
          text: 'Trend cen w czasie',
          color: '#f1f1f1',
          font: { size: 16 }
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: { day: 'dd.MM' },
            tooltipFormat: 'yyyy-MM-dd'
          },
          ticks: { color: '#f1f1f1' },
          grid: { color: '#444' }
        },
        y: {
          min: 0,
          suggestedMax: Math.ceil(max + 5),
          title: {
            display: true,
            text: 'Cena [zł]',
            color: '#f1f1f1'
          },
          ticks: {
            color: '#f1f1f1',
            callback: function (value) {
              const rounded = Math.round(value * 100) / 100;
              return rounded % 1 === 0
                ? `${rounded.toFixed(0)} zł`
                : `${rounded.toFixed(2).replace('.', ',')} zł`;
            }
          },
          grid: { color: '#444' },
        }
      }
    }
  });
}

// --- ALERT CENOWY NAJLEPSZA CENA ---
const alertBanner = document.getElementById("alertBanner");
function updateAlertBanner(trendData, min) {
  const current = trendData[trendData.length - 1]?.price;
  if (current <= min) {
    alertBanner.innerHTML = `<div class="alert alert-success">📉 Obecna cena (${current.toFixed(2)} zł) jest najniższa w historii!</div>`;
  } else {
    alertBanner.innerHTML = '';
  }
}

// --- GROUPED OFFERS & ALL OFFERS TABLE ---
let groupedOffersCache = [];
async function loadGroupedAlerts() {
  let url = "/api/alerts_grouped";
  if (selectedCity) {
    url += `?city=${encodeURIComponent(selectedCity)}`;
  }
  const res = await fetch(url);
  const groups = await res.json();
  groupedOffersCache = groups;

  const container = document.getElementById("groupedOffersContainer");
  container.innerHTML = "";

  groups.forEach((group, i) => {
    const productId = `accordion-${i}`;
    const panel = document.createElement("div");
    panel.className = "accordion-item mb-2";
    panel.innerHTML = `
      <h2 class="accordion-header" id="heading-${productId}">
        <button class="accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${productId}" aria-expanded="false" aria-controls="collapse-${productId}">
          <a href="${group.offers[0].map_url || '#'}" target="_blank" class="text-decoration-none text-light">
            ${group.product}
          </a>
          <strong class="ms-2">${group.min_price.toFixed(2)} zł</strong>
        </button>
      </h2>
      <div id="collapse-${productId}" class="accordion-collapse collapse" aria-labelledby="heading-${productId}" data-bs-parent="#groupedOffersContainer">
        <div class="accordion-body p-0">
          <table class="table table-dark table-bordered m-0">
            <thead>
              <tr>
                <th>Apteka</th><th>Cena</th><th>Ważność</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
            ${[...new Map(group.offers.map(o => [
              `${o.pharmacy}-${o.price}-${o.expiration}-${o.map_url}`,
              o
            ])).values()].map(o => `
              <tr class="${o.short_expiry && o.price < 30 ? "short-expiry good-deal" : o.short_expiry ? "short-expiry" : ""}">
                <td>
                  <a href="${o.map_url}" target="_blank" class="text-decoration-underline text-light">
                    ${o.pharmacy}
                  </a>
                </td>
                <td>${o.price.toFixed(2)} zł</td>
                <td>${o.expiration || "–"}</td>
                <td>${o.short_expiry ? "❗ Krótka ważność" : o.fetched_at}</td>
              </tr>
            `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
    container.appendChild(panel);
  });
}

function renderAllOffersTable(groups) {
  const tbody = document.getElementById("allOffersBody");
  const seen = new Set();

  tbody.innerHTML = "";

  groups.forEach(group => {
    group.offers.forEach(o => {
      const key = `${group.product}-${o.pharmacy}-${o.price}-${o.expiration}`;
      if (seen.has(key)) return;
      seen.add(key);

      const row = document.createElement("tr");
      if (o.short_expiry && o.price < 30) row.classList.add("good-deal");

      row.innerHTML = `
        <td>${group.product}</td>
        <td>
          <a href="${o.map_url}" target="_blank" class="text-decoration-underline text-light">
            ${o.pharmacy}
          </a>
        </td>
        <td>${o.price.toFixed(2)} zł</td>
        <td>${o.expiration || "–"}</td>
        <td>${o.short_expiry ? "❗ Krótka ważność" : o.fetched_at}</td>
        <td>${o.map_url ? `<a href="${o.map_url}" target="_blank" class="btn btn-sm btn-outline-light">Mapa</a>` : "–"}</td>
      `;
      tbody.appendChild(row);
    });
  });
}

// --- ALERTY MAILOWE (opcjonalnie, jeśli używasz) ---
const alertForm = document.getElementById("alertForm");
if (alertForm) {
  alertForm.onsubmit = async function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    if (!email && !phone) {
      document.getElementById("alertMessage").textContent = "Podaj e-mail lub telefon.";
      return;
    }
    const threshold = document.getElementById("threshold").value;
    const productName = alertProductSelect ? alertProductSelect.value : productSelect.value;
    const res = await fetch("/api/alerts/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone, threshold, product_name: productName })
    });
    const data = await res.json();
    document.getElementById("alertMessage").textContent = data.status === "ok"
      ? "Alert został zapisany!"
      : (data.message || "Błąd zapisu alertu.");
  };
}

// --- TOOLTIPY BOOTSTRAP ---
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
  new bootstrap.Tooltip(el);
});

// --- INIT ---
window.addEventListener("DOMContentLoaded", async () => {
  await loadCities();
  loadProducts();
  await loadGroupedAlerts();

  // Obsługa rozwijania "Pokaż wszystkie okazje"
  const expandBtn = document.getElementById("expandBtn");
  let expanded = false;
  expandBtn.onclick = () => {
    expanded = !expanded;
    document.getElementById("allOffersTable").style.display = expanded ? "block" : "none";
    expandBtn.textContent = expanded ? "Ukryj wszystkie okazje" : "Pokaż wszystkie okazje";
    if (expanded && groupedOffersCache.length > 0) {
      renderAllOffersTable(groupedOffersCache);
    }
  };
});
