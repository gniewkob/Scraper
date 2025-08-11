import { useEffect, useState } from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function CitySelect({ value, onChange }: Props) {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/cities')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setCities)
      .catch((e) => console.error('cities error', e));
  }, []);

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="form-select">
      <option value="">Wszystkie miasta...</option>
      {cities.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
