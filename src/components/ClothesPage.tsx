import { Shirt } from 'lucide-react';
import { Product } from '../types/product';
import { ProductGrid } from './ProductGrid';

interface ClothesPageProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  loading: boolean;
  filter: string;
  onFilterChange: (filter: string) => void;
}

export function ClothesPage({ products, onProductClick, loading, filter, onFilterChange }: ClothesPageProps) {
  const filterOptions = [
    { id: 'all', label: 'All Clothes' },
    { id: 'men', label: "Men's Clothing" },
    { id: 'women', label: "Women's Clothing" }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-8">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Shirt className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Clothes
          </h1>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onFilterChange(option.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === option.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <p className="text-slate-600">
          {loading 
            ? 'Loading clothes...'
            : `Showing ${products.length} item${products.length === 1 ? '' : 's'}`
          }
        </p>
      </div>

      {/* Products Grid */}
      <ProductGrid
        products={products}
        onProductClick={onProductClick}
        loading={loading}
      />
    </main>
  );
}