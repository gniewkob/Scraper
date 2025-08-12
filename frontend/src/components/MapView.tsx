import { useEffect, useRef } from 'react'
import type { Map } from 'leaflet'

interface Offer {
  pharmacy_lat?: number
  pharmacy_lon?: number
}

interface MapViewProps {
  offers: Offer[]
  center?: [number, number]
}

const MapView: React.FC<MapViewProps> = ({ offers, center }) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') return
    if (!offers.some((o) => o.pharmacy_lat && o.pharmacy_lon)) return

    let map: Map | undefined
    ;(async () => {
      const L = await import('leaflet')
      const icon = (await import('leaflet/dist/images/marker-icon.png')).default
      const icon2x = (await import('leaflet/dist/images/marker-icon-2x.png'))
        .default
      const shadow = (await import('leaflet/dist/images/marker-shadow.png'))
        .default
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: icon2x,
        iconUrl: icon,
        shadowUrl: shadow,
      })

      const mapCenter: [number, number] = center || [52.2297, 21.0122]
      map = L.map(mapRef.current!).setView(mapCenter, 13)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      offers
        .filter((o) => o.pharmacy_lat && o.pharmacy_lon)
        .forEach((o) =>
          L.marker([o.pharmacy_lat!, o.pharmacy_lon!]).addTo(map!),
        )
    })()

    return () => {
      if (map) map.remove()
    }
  }, [offers, center])

  return (
    <div id="map" ref={mapRef} style={{ height: '400px', width: '100%' }} />
  )
}

export default MapView
