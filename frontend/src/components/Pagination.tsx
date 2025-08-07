interface Props {
  total: number;
  limit: number;
  offset: number;
  onChange: (offset: number) => void;
}

export default function Pagination({ total, limit, offset, onChange }: Props) {
  const totalPages = Math.ceil(total / limit);
  const current = Math.floor(offset / limit) + 1;
  if (totalPages <= 1) return null;
  return (
    <div className="my-3" id="pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          className="btn btn-outline-light btn-sm mx-1"
          disabled={p === current}
          onClick={() => onChange((p - 1) * limit)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
