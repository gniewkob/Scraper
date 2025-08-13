// API configuration
const API = 'https://backend.bodora.pl'

// Debug logging
if (import.meta.env.DEV) {
  console.log('API URL configured:', API)
}

export default API
