import React from 'react';
import NavBar from './components/NavBar';
import ProductGrid from './components/ProductGrid';

function App() {
  return (
    <div className="min-h-screen bg-white text-secondary">
      <NavBar />
      
      {/* Hero Banner Section */}
      <section className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-r from-pink-200 to-red-100 flex items-center justify-center overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-pink-300 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-[-50px] right-[-50px] w-80 h-80 bg-red-300 rounded-full opacity-50 blur-3xl"></div>

        <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-md mb-4 animate-fade-in-up">
                End-Of-Year SALE
            </h1>
            <p className="text-xl text-white/90 mb-8 font-light">Up to 80% OFF on Top Styles</p>
            <button className="bg-white text-primary px-8 py-3 rounded-none font-bold text-lg uppercase tracking-wider hover:scale-105 transition-transform shadow-lg">
                Shop Now
            </button>
        </div>
      </section>

      {/* Main Content */}
      <main>
          <ProductGrid />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 text-center text-gray-500 text-sm mt-10">
          <p>© 2024 AmanaMart. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
