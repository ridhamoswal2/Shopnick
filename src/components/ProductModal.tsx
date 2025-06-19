import { X, Star, Plus, Minus } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { state, dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const cartItem = state.items.find(item => item.id === product.id);
  const cartQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    // Add the specified quantity to cart
    dispatch({ 
      type: 'ADD_MULTIPLE_ITEMS', 
      payload: { product, quantity } 
    });
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-2 sm:p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto mx-2 sm:mx-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 p-4 sm:p-6 md:p-8">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gray-50 rounded-xl p-4 sm:p-6 md:p-8">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-full max-h-64 sm:max-h-80 md:max-h-96 object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-4 md:space-y-6">
              <div>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-medium rounded-full mb-3 md:mb-4 capitalize">
                  {product.category}
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4 leading-tight">
                  {product.title}
                </h1>
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          index < Math.floor(product.rating.rate)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm sm:text-base text-slate-600">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
              </div>

              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600">
                ${product.price.toFixed(2)}
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">Description</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="text-sm font-medium text-slate-700">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {cartQuantity > 0 && (
                  <div className="text-sm text-emerald-600 font-medium bg-emerald-50 p-3 rounded-lg">
                    {cartQuantity} item(s) currently in cart
                  </div>
                )}

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 sm:py-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  Add {quantity > 1 ? `${quantity} items` : 'to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}