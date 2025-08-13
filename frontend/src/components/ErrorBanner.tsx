interface Props {
  message: string | null
}

export default function ErrorBanner({ message }: Props) {
  if (!message) return null
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  )
}
