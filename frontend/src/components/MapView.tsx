import { useEffect, useRef, useState } from 'react'
import type { Map } from 'leaflet'
import L from 'leaflet'

// Fix for default markers in Leaflet with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Fix the default icon issue with Leaflet and Vite
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

interface Offer {
  pharmacy_lat?: number
  pharmacy_lon?: number
  pharmacy?: string
  address?: string
  price?: number
}

interface MapViewProps {
  offers: Offer[]
  center?: [number, number]
}

const MapView: React.FC<MapViewProps> = ({ offers, center }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<Map | null>(null)
  const [mapId] = useState(`map-${Math.random().toString(36).substr(2, 9)}`)

  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') return
    
    // Filter offers with valid coordinates
    const validOffers = offers.filter(o => o.pharmacy_lat && o.pharmacy_lon)
    console.log('MapView: Valid offers with GPS:', validOffers.length, validOffers)
    if (validOffers.length === 0) return

    // Clean up previous map instance if it exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    // Calculate center - use first offer with coords or provided center
    const mapCenter: [number, number] = center || 
      (validOffers[0] ? [validOffers[0].pharmacy_lat!, validOffers[0].pharmacy_lon!] : [52.2297, 21.0122])

    // Create map instance
    const map = L.map(mapRef.current).setView(mapCenter, 13)
    mapInstanceRef.current = map

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    // Create custom icon
    const customIcon = L.icon({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIcon2x,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })

    // Add markers for each pharmacy
    validOffers.forEach((offer, index) => {
      const marker = L.marker(
        [offer.pharmacy_lat!, offer.pharmacy_lon!],
        { icon: customIcon }
      )
      
      // Add popup with pharmacy info
      const popupContent = `
        <div style="min-width: 150px;">
          <strong>${offer.pharmacy || 'Apteka'}</strong><br/>
          ${offer.address || ''}<br/>
          ${offer.price ? `<strong>Cena: ${offer.price.toFixed(2)} zł</strong>` : ''}
        </div>
      `
      marker.bindPopup(popupContent)
      
      // Open first popup by default
      if (index === 0) {
        marker.on('add', () => {
          setTimeout(() => marker.openPopup(), 100)
        })
      }
      
      marker.addTo(map)
    })

    // If multiple markers, fit bounds to show all
    if (validOffers.length > 1) {
      const bounds = L.latLngBounds(
        validOffers.map(o => [o.pharmacy_lat!, o.pharmacy_lon!] as [number, number])
      )
      map.fitBounds(bounds, { padding: [50, 50] })
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove()
          mapInstanceRef.current = null
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    }
  }, [offers, center, mapId])

  // Don't render if no valid offers
  const hasValidCoords = offers.some(o => o.pharmacy_lat && o.pharmacy_lon)
  
  if (!hasValidCoords) {
    return (
      <div className="alert alert-info">
        <i className="bi bi-info-circle"></i> Brak danych lokalizacji dla wybranych aptek.
      </div>
    )
  }

  return (
    <div 
      id={mapId} 
      ref={mapRef} 
      style={{ 
        height: '400px', 
        width: '100%',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }} 
    />
  )
}

export default MapView
