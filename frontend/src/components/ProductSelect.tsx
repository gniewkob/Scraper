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

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then(setProducts)
      .catch((e) => console.error('products error', e));
  }, []);

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="form-select">
      {products.map((p) => (
        <option key={p.name} value={p.name}>
          {p.label}
        </option>
      ))}
    </select>
  );
}
