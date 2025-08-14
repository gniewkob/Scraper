// API configuration
const API = import.meta.env.DEV 
  ? '/api-backend' 
  : 'https://backend.bodora.pl'

// Debug logging
if (import.meta.env.DEV) {
  console.log('API URL configured:', API)
}

export default API
