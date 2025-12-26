import React from 'react';
import { FaSearch, FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';

const NavBar = () => {
    return (
        <div className="w-full font-sans">
            {/* Top Bar */}
            <div className="bg-black text-white text-center py-2 text-xs font-bold tracking-wide">
                FREE SHIPPING ON ORDERS OVER $99 | FREE RETURNS
            </div>

            {/* Main Header */}
            <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm border-b">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <h1 className="text-3xl font-bold font-serif tracking-tighter">SHEIN</h1>
                    {/* Placeholder for Logo Image if requested */}
                </div>

                {/* Search Bar */}
                <div className="flex-1 mx-12 hidden md:flex">
                    <div className="relative w-full max-w-xl">
                        <input 
                            type="text" 
                            placeholder="Search for items, brands and inspiration..." 
                            className="w-full border-2 border-black px-4 py-2 rounded-l-md focus:outline-none"
                        />
                        <button className="absolute right-0 top-0 h-full bg-black text-white px-6 rounded-r-md">
                            <FaSearch />
                        </button>
                    </div>
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-6 text-xl text-gray-800">
                    <FaUser className="cursor-pointer hover:text-black" />
                    <FaHeart className="cursor-pointer hover:text-black" />
                    <div className="relative cursor-pointer hover:text-black">
                        <FaShoppingBag />
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
                    </div>
                </div>
            </header>

            {/* Navigation Categories */}
            <nav className="bg-black text-white px-8 py-3 overflow-x-auto">
                <ul className="flex space-x-8 text-sm font-semibold uppercase whitespace-nowrap">
                    {['Women', 'Curve + Plus', 'Kids', 'Men', 'Beauty', 'Home', 'Electronics'].map((cat) => (
                        <li key={cat}>
                            <a href="#" className="hover:text-gray-300 transition-colors">{cat}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
