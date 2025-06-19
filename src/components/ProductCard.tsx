import { Star, Plus } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <div
      onClick={() => onClick(product)}
      className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-200"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-32 xs:h-36 sm:h-40 md:h-48 lg:h-56 xl:h-64 object-contain p-2 sm:p-3 md:p-4 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-3 sm:p-4 md:p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-slate-900 line-clamp-2 flex-1 mr-2 leading-tight">
            {product.title}
          </h3>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-emerald-600 flex-shrink-0">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-slate-600 text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs sm:text-sm text-slate-600">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 sm:p-2 rounded-lg transition-all duration-200 group-hover:scale-110 hover:shadow-md"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}