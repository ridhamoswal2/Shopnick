import { Search } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../types/product';
import { ProductGrid } from './ProductGrid';

interface SearchPageProps {
  onSearch: (query: string) => void;
  products: Product[];
  onProductClick: (product: Product) => void;
  loading: boolean;
  searchQuery: string;
}

export function SearchPage({ onSearch, products, onProductClick, loading, searchQuery }: SearchPageProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-8">
      {/* Search Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          Search Products
        </h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
              autoFocus
            />
            <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Search Results for "{searchQuery}"
            </h2>
            <p className="text-slate-600">
              {loading 
                ? 'Searching...'
                : `Found ${products.length} product${products.length === 1 ? '' : 's'}`
              }
            </p>
          </div>
        )}
      </div>

      {/* Search Results */}
      {searchQuery ? (
        <ProductGrid
          products={products}
          onProductClick={onProductClick}
          loading={loading}
        />
      ) : (
        <div className="text-center py-16">
          <Search className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start searching</h3>
          <p className="text-gray-500">Enter a product name or description to find what you're looking for</p>
        </div>
      )}
    </main>
  );
}