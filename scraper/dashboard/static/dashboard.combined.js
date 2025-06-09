// Ustawienia Chart.js
Chart.defaults.color = '#f1f1f1';
Chart.defaults.plugins.legend.labels.color = '#f1f1f1';

const productSelect = document.getElementById("productSelect");
const priceTrendChartCtx = document.getElementById("priceTrendChart").getContext("2d");
const alertBanner = document.getElementById("alertBanner");

let priceChart;

async function loadProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();
  products.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.name;
    opt.textContent = p.label;
    productSelect.appendChild(opt);
  });
  if (products.length > 0) {
    productSelect.value = products[0].name;
    loadProductData(products[0].name);
  }
}

async function loadProductData(name) {
  const res = await fetch(`/api/product/${encodeURIComponent(name)}`);
  const data = await res.json();
  renderTopOffers(data.top3);
  const prices = data.trend.map(p => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  renderPriceChart(data.trend, min, max);
  updateAlertBanner(data.trend, min);
}

let groupedOffersCache = [];

async function loadGroupedAlerts() {
  const res = await fetch("/api/alerts_grouped");
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

function renderTopOffers(offers) {
  const container = document.getElementById("productTable");
  container.innerHTML = `<div class="table-responsive"><table class="table table-dark table-bordered">
    <thead><tr><th>Cena</th><th>Apteka</th><th>Adres</th><th>Mapa</th></tr></thead><tbody>
    ${offers.map(o => `
      <tr>
        <td>${o.price.toFixed(2)} zł</td>
        <td>${o.pharmacy || "–"}</td>
        <td>${o.address || "–"}</td>
        <td><a href="${o.map_url}" target="_blank" class="btn btn-sm btn-outline-light">Mapa</a></td>
      </tr>`).join("")}
    </tbody></table></div>`;
}

function renderPriceChart(data, min, max) {
  if (priceChart) priceChart.destroy();

  // 📊 Agregacja danych: średnia cena per dzień (YYYY-MM-DD)
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
      maintainAspectRatio: false, // ✅ WYŁĄCZ automatyczne proporcje
      animation: {
        duration: 0 // 🚫 wyłącz animacje, szczególnie rozciąganie
      },
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
          min: 0, // 📌 Zaczynaj od 0
          suggestedMax: Math.ceil(max + 5), // 📌 Proponowana maksymalna wysokość
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

function updateAlertBanner(trendData, min) {
  const current = trendData[trendData.length - 1]?.price;
  if (current <= min) {
    alertBanner.innerHTML = `<div class="alert alert-success">📉 Obecna cena (${current.toFixed(2)} zł) jest najniższa w historii!</div>`;
  } else {
    alertBanner.innerHTML = '';
  }
}

async function loadPriceAlerts() {
  const res = await fetch("/api/alerts_filtered");
  const allAlerts = await res.json();
  const tbody = document.querySelector("#alertTable tbody");
  const expandBtn = document.getElementById("expandBtn");
  const shortOnly = document.getElementById("shortOnly");
  const sortBy = document.getElementById("sortBy");

  let expanded = false;

  function cleanName(name) {
    return name.replace("Cannabis", "")
               .replace("Flos", "")
               .trim();
  }

  function render(limit = 5) {
    let filtered = allAlerts.filter(a => a.price >= 10); // 🔴 pomijaj oferty < 10 zł

    if (shortOnly.checked) {
      filtered = filtered.filter(a => a.short_expiry);
    }

    filtered.sort((a, b) => {
      return sortBy.value === "asc" ? a.price - b.price : b.price - a.price;
    });

    const alertsToShow = expanded ? filtered : filtered.slice(0, limit);
    tbody.innerHTML = "";

    alertsToShow.forEach(alert => {
      const row = document.createElement("tr");
      if (alert.short_expiry && alert.price < 30) {
        row.classList.add("good-deal");
      }


      row.innerHTML = `
        <td>${cleanName(alert.product)}</td>
        <td>${alert.pharmacy}</td>
        <td>${alert.price.toFixed(2)} zł</td>
        <td>${alert.expiration || "–"}</td>
        <td>${alert.short_expiry ? "❗ Krótka ważność" : alert.fetched_at}</td>
        <td>${alert.map_url && alert.map_url.includes("google.com") ? 
              `<a href="${alert.map_url}" target="_blank" class="btn btn-sm btn-outline-light">Mapa</a>` : "–"}</td>
      `;

      tbody.appendChild(row);
    });
  }

  expandBtn.onclick = () => {
    expanded = !expanded;
    render();
    expandBtn.textContent = expanded ? "Ukryj" : "Pokaż wszystkie okazje";
  };

  shortOnly.addEventListener("change", () => render());
  sortBy.addEventListener("change", () => render());

  render();
}

document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
  new bootstrap.Tooltip(el);
});


productSelect.addEventListener("change", e => loadProductData(e.target.value));

window.addEventListener("DOMContentLoaded", async () => {
  loadProducts();
  await loadGroupedAlerts(); // <- zapewnij załadowanie danych przed kliknięciem

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



