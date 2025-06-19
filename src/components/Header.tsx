import { ShoppingCart, Search, Menu, X, Home, Smartphone, Gem, Shirt, Package } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
  categories: string[];
  onPageChange: (page: string) => void;
  currentPage: string;
  selectedCategory: string;
}

export function Header({ onSearch, onCategorySelect, categories, onPageChange, currentPage, selectedCategory }: HeaderProps) {
  const { state, dispatch } = useCart();
  const { state: ordersState, dispatch: ordersDispatch } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'electronics':
        return <Smartphone className="h-4 w-4" />;
      case 'jewelery':
        return <Gem className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const categoryDisplayNames: Record<string, string> = {
    electronics: 'Electronics',
    jewelery: 'Jewelry'
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => onPageChange('home')}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img src="/assets/Shopnik.png" alt="Shopnik Logo" className="h-8 w-auto mr-2" />
              <span className="text-xl font-bold text-emerald-600">Shopnik</span>
            </button>
          </div>
          
          {/* Mobile Header - Simple Logo + Actions */}
          <div className="md:hidden flex items-center justify-end w-full">
            <div className="flex items-center gap-2">
              <button
                onClick={() => ordersDispatch({ type: 'TOGGLE_ORDERS' })}
                className="relative p-2 text-slate-700 hover:text-emerald-600 transition-colors"
              >
                <Package className="h-6 w-6" />
                {ordersState.orders.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {ordersState.orders.length > 99 ? '99+' : ordersState.orders.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                className="relative p-2 text-slate-700 hover:text-emerald-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Header - Full Navigation */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Desktop Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => onPageChange('home')}
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <img src="/assets/Shopnik.png" alt="Shopnik Logo" className="h-8 w-auto mr-2" />
                <span className="text-xl font-bold text-emerald-600">Shopnik</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10 ml-8">
              <button
                onClick={() => onPageChange('home')}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === 'home' 
                    ? 'text-emerald-600' 
                    : 'text-slate-700 hover:text-emerald-600'
                }`}
              >
                <Home className="h-4 w-4" />
                Home
              </button>
              
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategorySelect(category)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                    currentPage === 'category' && selectedCategory === category
                      ? 'text-emerald-600'
                      : 'text-slate-700 hover:text-emerald-600'
                  }`}
                >
                  {getCategoryIcon(category)}
                  {categoryDisplayNames[category] || category}
                </button>
              ))}
              
              <button
                onClick={() => onPageChange('clothes')}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === 'clothes'
                    ? 'text-emerald-600'
                    : 'text-slate-700 hover:text-emerald-600'
                }`}
              >
                <Shirt className="h-4 w-4" />
                Clothes
              </button>
            </nav>

            {/* Desktop Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </form>

            {/* Desktop Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => ordersDispatch({ type: 'TOGGLE_ORDERS' })}
                className="relative p-2 text-slate-700 hover:text-emerald-600 transition-colors"
              >
                <Package className="h-6 w-6" />
                {ordersState.orders.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {ordersState.orders.length > 99 ? '99+' : ordersState.orders.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                className="relative p-2 text-slate-700 hover:text-emerald-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button for tablet */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden lg:hidden p-2 text-slate-700 ml-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Tablet menu (md to lg) */}
        {isMobileMenuOpen && (
          <div className="md:block lg:hidden pb-4 border-t border-gray-100 mt-4 pt-4">
            <nav className="space-y-1">
              <button
                onClick={() => {
                  onPageChange('home');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-left px-3 py-3 text-slate-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md font-medium"
              >
                <Home className="h-5 w-5" />
                Home
              </button>
              
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onCategorySelect(category);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-3 py-3 text-slate-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md font-medium"
                >
                  {getCategoryIcon(category)}
                  {categoryDisplayNames[category] || category}
                </button>
              ))}
              
              <button
                onClick={() => {
                  onPageChange('clothes');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-left px-3 py-3 text-slate-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md font-medium"
              >
                <Shirt className="h-5 w-5" />
                Clothes
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}