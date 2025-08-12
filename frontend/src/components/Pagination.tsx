import { getPages } from '../utils/pagination'

interface Props {
  total: number
  limit: number
  offset: number
  onChange: (offset: number) => void
}

export default function Pagination({ total, limit, offset, onChange }: Props) {
  const totalPages = Math.ceil(total / limit)
  const current = Math.floor(offset / limit) + 1
  if (totalPages <= 1) return null

  const pages = getPages(totalPages, current)

  return (
    <div className="my-3" id="pagination">
      <button
        className="btn btn-outline-light btn-sm mx-1"
        disabled={current === 1}
        onClick={() => onChange((current - 2) * limit)}
      >
        «
      </button>
      {pages.map((p, i) =>
        typeof p === 'number' ? (
          <button
            key={p}
            className="btn btn-outline-light btn-sm mx-1"
            disabled={p === current}
            onClick={() => onChange((p - 1) * limit)}
          >
            {p}
          </button>
        ) : (
          <span key={`ellipsis-${i}`} className="mx-1">
            ...
          </span>
        ),
      )}
      <button
        className="btn btn-outline-light btn-sm mx-1"
        disabled={current === totalPages}
        onClick={() => onChange(current * limit)}
      >
        »
      </button>
    </div>
  )
}
