import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { ProductModal } from './components/ProductModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SearchPage } from './components/SearchPage';
import { ClothesPage } from './components/ClothesPage';
import { MyOrders } from './components/MyOrders';
import { CartProvider } from './hooks/useCart';
import { OrdersProvider } from './hooks/useOrders';
import { api } from './utils/api';
import { Product } from './types/product';

function AppContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [clothesFilter, setClothesFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        // Filter out men's and women's clothing from main categories
        const filteredCategories = categoriesData.filter(
          cat => cat !== "men's clothing" && cat !== "women's clothing"
        );
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Handle clothes page filtering
    if (currentPage === 'clothes') {
      if (clothesFilter === 'men') {
        filtered = filtered.filter(product => product.category === "men's clothing");
      } else if (clothesFilter === 'women') {
        filtered = filtered.filter(product => product.category === "women's clothing");
      } else {
        // Show both men's and women's clothing
        filtered = filtered.filter(product => 
          product.category === "men's clothing" || product.category === "women's clothing"
        );
      }
    } else {
      // Filter by category for other pages
      if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
    }

    // Filter by search query
    if (searchQuery && currentPage === 'search') {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery, currentPage, clothesFilter]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setCurrentPage('category');
    setClothesFilter('all');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('');
    setCurrentPage('search');
    setClothesFilter('all');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    if (page === 'home') {
      setSelectedCategory('');
      setSearchQuery('');
      setClothesFilter('all');
    }
  };

  const handleClothesFilterChange = (filter: string) => {
    setClothesFilter(filter);
  };

  const getCategoryDisplayName = (category: string) => {
    const displayNames: Record<string, string> = {
      electronics: 'Electronics',
      jewelery: 'Jewelry',
      "men's clothing": "Men's Clothing",
      "women's clothing": "Women's Clothing"
    };
    return displayNames[category] || category;
  };

  const getPageTitle = () => {
    if (currentPage === 'clothes') {
      return 'Clothes';
    }
    if (currentPage === 'search') {
      return searchQuery ? `Search Results for "${searchQuery}"` : 'Search Products';
    }
    if (selectedCategory) {
      return getCategoryDisplayName(selectedCategory);
    }
    return 'Featured Products';
  };

  const renderContent = () => {
    if (currentPage === 'search') {
      return (
        <SearchPage
          onSearch={handleSearch}
          products={filteredProducts}
          onProductClick={handleProductClick}
          loading={loading}
          searchQuery={searchQuery}
        />
      );
    }

    if (currentPage === 'clothes') {
      return (
        <ClothesPage
          products={filteredProducts}
          onProductClick={handleProductClick}
          loading={loading}
          filter={clothesFilter}
          onFilterChange={handleClothesFilterChange}
        />
      );
    }

    return (
      <main>
        {currentPage === 'home' && <Hero />}
        
        <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 pb-20 md:pb-8">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
              {getPageTitle()}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {loading 
                ? 'Loading amazing products...'
                : `Showing ${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'}`
              }
            </p>
          </div>
          
          <ProductGrid
            products={filteredProducts}
            onProductClick={handleProductClick}
            loading={loading}
          />
        </section>
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
        categories={categories}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        selectedCategory={selectedCategory}
      />
      
      {renderContent()}

      <MobileBottomNav
        currentPage={currentPage}
        onPageChange={handlePageChange}
        categories={categories}
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />

      <Cart />
      <MyOrders />
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
}

function App() {
  return (
    <OrdersProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </OrdersProvider>
  );
}

export default App;