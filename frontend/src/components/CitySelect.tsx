import { useEffect, useState } from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function CitySelect({ value, onChange }: Props) {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/cities')
      .then((r) => r.json())
      .then((data) => {
        setCities(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error('cities error', e);
        setError('Błąd ładowania miast');
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
        <>
          <option value="">Wszystkie miasta...</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </>
      )}
    </select>
  );
}
