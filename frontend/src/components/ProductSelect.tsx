import { useEffect, useState } from 'react';

interface Product {
  name: string;
  label: string;
}

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function ProductSelect({ value, onChange }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error('products error', e);
        setError('Błąd ładowania produktów');
        setLoading(false);
      });
  }, []);

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="form-select">
      {loading ? (
        <option>Ładowanie...</option>
      ) : error ? (
        <option>{error}</option>
      ) : (
        products.map((p) => (
          <option key={p.name} value={p.name}>
            {p.label}
          </option>
        ))
      )}
    </select>
  );
}
