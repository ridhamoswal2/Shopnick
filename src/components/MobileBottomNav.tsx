import { Home, Smartphone, Gem, Shirt, Search } from 'lucide-react';

interface MobileBottomNavProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  categories: string[];
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

export function MobileBottomNav({ currentPage, onPageChange, categories, onCategorySelect, selectedCategory }: MobileBottomNavProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'electronics':
        return <Smartphone className="h-5 w-5" />;
      case 'jewelery':
        return <Gem className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="h-5 w-5" />,
      action: () => onPageChange('home')
    },
    ...categories.map(category => ({
      id: category,
      label: category === 'electronics' ? 'Electronics' : 'Jewelry',
      icon: getCategoryIcon(category),
      action: () => onCategorySelect(category)
    })),
    {
      id: 'clothes',
      label: 'Clothes',
      icon: <Shirt className="h-5 w-5" />,
      action: () => onPageChange('clothes')
    },
    {
      id: 'search',
      label: 'Search',
      icon: <Search className="h-5 w-5" />,
      action: () => onPageChange('search')
    }
  ];

  const isActive = (itemId: string) => {
    if (itemId === 'home') return currentPage === 'home';
    if (itemId === 'search') return currentPage === 'search';
    if (itemId === 'clothes') return currentPage === 'clothes';
    return currentPage === 'category' && selectedCategory === itemId;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 z-50 shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 transform ${
              isActive(item.id)
                ? 'text-emerald-600 bg-emerald-50/80 scale-105'
                : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50/50 active:scale-95'
            }`}
          >
            <div className={`transition-all duration-300 ${
              isActive(item.id) ? 'transform -translate-y-0.5' : ''
            }`}>
              {item.icon}
            </div>
            <span className={`text-xs font-medium transition-all duration-300 ${
              isActive(item.id) ? 'font-semibold' : ''
            }`}>
              {item.label}
            </span>
            {isActive(item.id) && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-emerald-600 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}