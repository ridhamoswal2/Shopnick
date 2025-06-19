import { ShoppingBag, Truck, Shield, Star } from 'lucide-react';

export function Hero() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Your One-Stop
              <span className="block text-emerald-200">Shopping Destination</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl text-emerald-100 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
              Discover premium products at unbeatable prices. From electronics to fashion, we've got everything you need.
            </p>
            
            {/* CTA Button - Centered */}
            <div className="flex justify-center px-4 mb-12 sm:mb-16">
              <button 
                onClick={scrollToProducts}
                className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Shop Now
              </button>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center p-4">
                <div className="p-3 bg-emerald-500 bg-opacity-20 rounded-full mb-3">
                  <Truck className="h-6 w-6 text-emerald-200" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
                <p className="text-emerald-200 text-sm">On orders over $50</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="p-3 bg-emerald-500 bg-opacity-20 rounded-full mb-3">
                  <Shield className="h-6 w-6 text-emerald-200" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
                <p className="text-emerald-200 text-sm">100% protected checkout</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="p-3 bg-emerald-500 bg-opacity-20 rounded-full mb-3">
                  <Star className="h-6 w-6 text-emerald-200" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Top Quality</h3>
                <p className="text-emerald-200 text-sm">Premium products only</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 sm:h-16">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="rgb(249 250 251)"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="rgb(249 250 251)"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="rgb(249 250 251)"></path>
        </svg>
      </div>
    </div>
  );
}