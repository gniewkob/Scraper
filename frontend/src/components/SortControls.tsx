interface Props {
  sort: string
  order: string
  onSortChange: (s: string) => void
  onOrderChange: (o: string) => void
}

export default function SortControls({
  sort,
  order,
  onSortChange,
  onOrderChange,
}: Props) {
  return (
    <div className="d-flex gap-2 my-2">
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="form-select form-select-sm"
      >
        <option value="price">Cena</option>
        <option value="expiration">Ważność</option>
        <option value="fetched_at">Data pobrania</option>
      </select>
      <select
        value={order}
        onChange={(e) => onOrderChange(e.target.value)}
        className="form-select form-select-sm"
      >
        <option value="asc">Rosnąco</option>
        <option value="desc">Malejąco</option>
      </select>
    </div>
  )
}
