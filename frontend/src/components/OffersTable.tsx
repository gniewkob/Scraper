interface Offer {
  price: number;
  price_per_g?: number;
  pharmacy?: string;
  address?: string;
  map_url?: string;
  price_bucket: string;
  is_historical_low: boolean;
}

interface Props {
  offers: Offer[];
}

export default function OffersTable({ offers }: Props) {
  const bucketIcons: Record<string, string> = {
    super_okazja: "🔥",
    okazja: "💰",
    normalna: "😐",
    drogo: "💸",
    unknown: "❓",
  };
  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Cena (za 1 g)</th>
            <th>Apteka</th>
            <th>Adres</th>
            <th>Mapa</th>
          </tr>
        </thead>
        <tbody>
          {offers.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-muted">
                Brak ofert
              </td>
            </tr>
          ) : (
            offers.map((o) => (
              <tr key={`${o.pharmacy}-${o.price}`}>
                <td>
                  {(o.price_per_g ?? o.price).toFixed(2)} zł{" "}
                  <span data-testid="price-badge">
                    {bucketIcons[o.price_bucket] ?? bucketIcons.unknown}
                  </span>
                  {o.is_historical_low && <span className="ms-1">⭐</span>}
                </td>
                <td>{o.pharmacy ?? "–"}</td>
                <td>{o.address ?? "–"}</td>
                <td>
                  {o.map_url ? (
                    <a
                      href={o.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-light"
                    >
                      Mapa
                    </a>
                  ) : (
                    "–"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
