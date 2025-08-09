interface Offer {
  price: number;
  price_per_g?: number;
  pharmacy?: string;
  address?: string;
  map_url?: string;
  price_bucket?: string;
  is_historical_low?: boolean;
}

interface Props {
  offers: Offer[];
}

export default function OffersTable({ offers }: Props) {
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
          {offers.map((o, i) => (
            <tr key={i}>
              <td>{((o.price_per_g ?? o.price)).toFixed(2)} zł</td>
              <td>{o.pharmacy ?? '–'}</td>
              <td>{o.address ?? '–'}</td>
              <td>
                {o.map_url ? (
                  <a href={o.map_url} target="_blank" className="btn btn-sm btn-outline-light">
                    Mapa
                  </a>
                ) : (
                  '–'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
