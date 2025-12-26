import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch products from Spring Boot API
        fetch('http://localhost:8080/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch products", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-20">Loading amazing deals...</div>;

    return (
        <div className="px-8 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">Daily Drops</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {products.map(product => (
                    <div key={product.id} className="group relative cursor-pointer">
                        {/* Image Container */}
                        <div className="relative overflow-hidden aspect-[3/4] mb-3">
                            <div className="absolute top-2 left-0 bg-yellow-400 text-black text-xs font-bold px-2 py-1 z-10">
                                -{product.discount}%
                            </div>
                            <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Hover Add Button */}
                            <button className="absolute bottom-3 right-3 bg-white w-9 h-9 rounded-full shadow-md flex items-center justify-center translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white">
                                <FaPlus />
                            </button>
                        </div>

                        {/* Info */}
                        <div>
                            <h3 className="text-sm text-gray-600 truncate mb-1">{product.name}</h3>
                            <div className="flex items-baseline space-x-2">
                                <span className="text-primary font-bold text-lg">${product.price.toFixed(2)}</span>
                                <span className="text-gray-400 text-xs line-through">${product.originalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
