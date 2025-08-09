import { useEffect, useState } from 'react';
import ProductSelect from './components/ProductSelect';
import CitySelect from './components/CitySelect';
import SortControls from './components/SortControls';
import OffersTable from './components/OffersTable';
import Pagination from './components/Pagination';
import PriceTrendChart from './components/PriceTrendChart';
import './index.css';

interface Offer {
  price: number;
  price_per_g?: number;
  pharmacy?: string;
  address?: string;
  map_url?: string;
  pharmacy_lat?: number;
  pharmacy_lon?: number;
}

interface TrendPoint {
  fetched_at: string;
  price: string;
}

function App() {
  const [product, setProduct] = useState('');
  const [city, setCity] = useState('');
  const [offers, setOffers] = useState<Offer[]>([]);
  const [trend, setTrend] = useState<TrendPoint[]>([]);
  const [sort, setSort] = useState('price');
  const [order, setOrder] = useState('asc');
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const limit = 50;

  useEffect(() => {
    document.body.classList.add(localStorage.getItem('theme') || 'dark');
  }, []);

  useEffect(() => {
    if (!product) return;
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
      sort,
      order,
    });
    if (city) params.append('city', city);
    fetch(`/api/product/${encodeURIComponent(product)}?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setOffers(data.offers || []);
        setTrend(data.trend || []);
        setTotal(data.total || 0);
      })
      .catch((e) => console.error('product error', e));
  }, [product, city, sort, order, offset]);

  return (
    <div className="container py-4">
      <div className="text-end"><button id="themeToggle" className="btn btn-outline-light btn-sm">Zmień motyw</button></div>
      <h1 className="text-center mb-4">🌿 Dashboard cen medycznej marihuany</h1>
      <div className="row mb-3">
        <div className="col-md-6 mb-2 mb-md-0">
          <label className="form-label">Wybierz produkt:</label>
          <ProductSelect
            value={product}
            onChange={(v) => {
              setProduct(v);
              setOffset(0);
            }}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Miasto:</label>
          <CitySelect
            value={city}
            onChange={(v) => {
              setCity(v);
              setOffset(0);
            }}
          />
        </div>
      </div>
      <SortControls
        sort={sort}
        order={order}
        onSortChange={(s) => {
          setSort(s);
          setOffset(0);
        }}
        onOrderChange={(o) => {
          setOrder(o);
          setOffset(0);
        }}
      />
      <div className="card p-3 mb-4">
        <h2 className="card-title">💎 Najtańsze oferty</h2>
        <OffersTable offers={offers} />
        <Pagination total={total} limit={limit} offset={offset} onChange={setOffset} />
        <div id="countInfo" className="mb-2 text-muted">
          Wyświetlasz {offset + 1}–{Math.min(offset + limit, total)} z {total} ofert
        </div>
      </div>
      <div className="card p-3 mb-4">
        <h2 className="card-title">📈 Trend cen wg daty</h2>
        <PriceTrendChart data={trend} />
      </div>
    </div>
  );
}

export default App;
