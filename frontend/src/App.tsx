import React, { useState, useEffect } from 'react';
import './index.css';
import { Leaf, MapPin, Clock, Users, Filter, TrendingUp, Search, ShoppingCart, Star, Info } from 'lucide-react';

interface Offer {
  id: number;
  pharmacy: string;
  address: string;
  price: number;
  price_per_unit?: number;
  price_bucket?: string;
  pharmacy_lat?: number;
  pharmacy_lon?: number;
  distance?: number;
  lab_tested?: boolean;
  premium?: boolean;
  rating?: number;
  reviews?: number;
  time_to_reach?: string;
}

interface Product {
  id: number;
  name: string;
  unit?: string;
}

interface City {
  name: string;
  count: number;
}

const App: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalOffers: 127,
    activeCities: 248,
    totalProducts: 67,
    avgResponseTime: '2 min'
  });

  useEffect(() => {
    fetchProducts();
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedProduct && selectedCity) {
      fetchOffers();
    }
  }, [selectedProduct, selectedCity]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api-backend/products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch('/api-backend/cities');
      const data = await response.json();
      setCities(data.cities || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api-backend/product-offers?product=${selectedProduct}&city=${selectedCity}`);
      const data = await response.json();
      setOffers(data.offers || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriceBucketIcon = (bucket?: string) => {
    switch(bucket) {
      case 'super_okazja':
        return '🔥';
      case 'okazja':
        return '💚';
      case 'średnia':
        return '💛';
      default:
        return '❓';
    }
  };

  const getPriceBucketClass = (bucket?: string) => {
    switch(bucket) {
      case 'super_okazja':
        return 'text-green-400';
      case 'okazja':
        return 'text-green-500';
      case 'średnia':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Leaf className="text-green-500 w-8 h-8" />
              <h1 className="text-2xl font-bold">
                <span className="text-green-500">🍃 Porównaj Ceny</span> <span className="text-blue-400">💊</span>
              </h1>
            </div>
            <div className="text-center">
              <h2 className="text-green-400 text-xl">Medycznej Marihuany 🌿</h2>
            </div>
          </div>
          <div className="text-center mt-2">
            <p className="text-gray-400">
              🚀 Najlepsze oferty w Twojej okolicy. Znajdź najlepszą "zielonkę" w kilka sekund!
            </p>
            <p className="text-gray-500 text-sm mt-1">
              ✨ Cosmic prices for earthly medicine ✨
            </p>
          </div>
        </div>
      </header>

      {/* Action Buttons */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center space-x-4">
          <button className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg flex items-center space-x-2 border border-gray-700">
            <span>🔥</span>
            <span>Najniższe ceny</span>
          </button>
          <button className="bg-purple-900 hover:bg-purple-800 px-6 py-2 rounded-lg flex items-center space-x-2 border border-purple-700">
            <span>🏪</span>
            <span>Lokalne dispensary</span>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg flex items-center space-x-2 border border-gray-700">
            <span>⚡</span>
            <span>Szybka dostawa</span>
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-400">
                <span>🌱</span> Wybierz produkt
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
              >
                <option value="">Wszystkie produkty...</option>
                {products.map((product) => (
                  <option key={product.id} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-400">
                <span>🏙️</span> Miasto
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
              >
                <option value="">Wszystkie miasta...</option>
                {cities.map((city, index) => (
                  <option key={index} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={fetchOffers}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <Search className="w-5 h-5" />
            <span>🚀 Znajdź najlepsze oferty</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Średnia oszczędność</p>
                <p className="text-2xl font-bold text-green-400">{stats.totalOffers} zł</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
            <div className="mt-2 text-green-500 text-sm">+15%</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Aktywne dispensary</p>
                <p className="text-2xl font-bold">{stats.activeCities}</p>
              </div>
              <div className="text-3xl">🏪</div>
            </div>
            <div className="mt-2 text-gray-500 text-sm">+2</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Miasta</p>
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
              </div>
              <div className="text-3xl">🏙️</div>
            </div>
            <div className="mt-2 text-gray-500 text-sm">+3</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Ostatnia aktualizacja</p>
                <p className="text-2xl font-bold">{stats.avgResponseTime}</p>
              </div>
              <div className="text-3xl">⏱️</div>
            </div>
            <div className="mt-2 text-gray-500 text-sm">temu</div>
          </div>
        </div>
      </div>

      {/* Offers Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <span className="mr-2">🚀</span> Najlepsze oferty z galaktyki
          </h2>
          <button className="text-green-400 hover:text-green-300 text-sm">
            3 kosmicznych wyników 👽
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin text-4xl">🌿</div>
            <p className="mt-2 text-gray-400">Szukam najlepszych ofert...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Example offers - these would be populated from API */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-green-600 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🍃</span>
                    <div>
                      <h3 className="font-bold text-lg">Green Galaxy Dispensary</h3>
                      <p className="text-gray-400 text-sm">Olej CBD 10% 🌿 Premium 💎</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Warszawa, Mokotów • 2.3 km
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      4.8 (121 ⭐)
                    </span>
                  </div>
                  <div className="mt-2 flex items-center space-x-3">
                    <span className="bg-green-900 text-green-400 px-2 py-1 rounded text-xs">
                      ✅ Dostępny
                    </span>
                    <span className="bg-gray-800 px-2 py-1 rounded text-xs">
                      ⏱️ 5 min temu
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-green-900 text-green-400 px-3 py-1 rounded-lg inline-block mb-2">
                    🔥 Najlepsza oferta
                  </div>
                  <div className="text-3xl font-bold">189.99 zł</div>
                  <div className="text-gray-400 line-through text-sm">249.99 zł</div>
                  <div className="text-green-400 text-sm">Oszczędzasz 60.00 zł</div>
                  <button className="mt-3 bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg w-full transition-colors">
                    🚀 Teleportuj się
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-purple-600 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌌</span>
                    <div>
                      <h3 className="font-bold text-lg">Cosmic Cannabis Co.</h3>
                      <p className="text-gray-400 text-sm">Olej CBD 10% 🌿 Organic 🌱</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Warszawa, Śródmieście • 4.1 km
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      4.6 (89 ⭐)
                    </span>
                  </div>
                  <div className="mt-2 flex items-center space-x-3">
                    <span className="bg-red-900 text-red-400 px-2 py-1 rounded text-xs">
                      🔴 Ostatnie sztuki
                    </span>
                    <span className="bg-gray-800 px-2 py-1 rounded text-xs">
                      ⏱️ 12 min temu
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-gray-800 px-3 py-1 rounded-lg inline-block mb-2">
                    +3%
                  </div>
                  <div className="text-3xl font-bold">199.99 zł</div>
                  <div className="text-gray-400 line-through text-sm">259.99 zł</div>
                  <div className="text-green-400 text-sm">Oszczędzasz 60.00 zł</div>
                  <button className="mt-3 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg w-full transition-colors">
                    🚀 Teleportuj się
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-blue-600 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <h3 className="font-bold text-lg">Space Herb Station</h3>
                      <p className="text-gray-400 text-sm">Olej CBD 10% 🌿 Lab Tested 🔬</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Warszawa, Wola • 6.8 km
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      4.9 (201 ⭐)
                    </span>
                  </div>
                  <div className="mt-2 flex items-center space-x-3">
                    <span className="bg-green-900 text-green-400 px-2 py-1 rounded text-xs">
                      ✅ Dostępny
                    </span>
                    <span className="bg-gray-800 px-2 py-1 rounded text-xs">
                      ⏱️ 5 min temu
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-gray-800 px-3 py-1 rounded-lg inline-block mb-2">
                    +1%
                  </div>
                  <div className="text-3xl font-bold">219.99 zł</div>
                  <div className="text-gray-400 line-through text-sm">279.99 zł</div>
                  <div className="text-green-400 text-sm">Oszczędzasz 60.00 zł</div>
                  <button className="mt-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg w-full transition-colors">
                    🚀 Teleportuj się
                  </button>
                </div>
              </div>
            </div>

            {offers.map((offer, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-green-600 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getPriceBucketIcon(offer.price_bucket)}</span>
                      <div>
                        <h3 className="font-bold text-lg">{offer.pharmacy}</h3>
                        <p className="text-gray-400 text-sm">{offer.address}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center space-x-4 text-sm text-gray-400">
                      {offer.distance && (
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {offer.distance.toFixed(1)} km
                        </span>
                      )}
                      {offer.rating && (
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          {offer.rating} ({offer.reviews || 0} ⭐)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {offer.price_bucket && (
                      <div className={`px-3 py-1 rounded-lg inline-block mb-2 ${getPriceBucketClass(offer.price_bucket)}`}>
                        {offer.price_bucket === 'super_okazja' ? '🔥 Najlepsza oferta' : offer.price_bucket}
                      </div>
                    )}
                    <div className="text-3xl font-bold">{offer.price.toFixed(2)} zł</div>
                    {offer.price_per_unit && (
                      <div className="text-gray-400 text-sm">
                        {offer.price_per_unit.toFixed(2)} zł/g
                      </div>
                    )}
                    <button className="mt-3 bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg w-full transition-colors">
                      🚀 Teleportuj się
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12 py-8 bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <button className="bg-purple-900 hover:bg-purple-800 text-white px-8 py-3 rounded-lg inline-flex items-center space-x-2 transition-colors">
            <span>🚀</span>
            <span>Załaduj więcej kosmicznych ofert</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
