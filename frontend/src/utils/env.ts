// Prefer Vite env; fallback to same-origin (relative URLs)
const API = (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_API_URL) || ''

export default API
