const API =
  (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_API_URL) ||
  process.env.VITE_API_URL ||
  ''

export default API
