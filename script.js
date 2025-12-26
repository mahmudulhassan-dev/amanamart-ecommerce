// Sample products data
const products = [
    {
        id: 1,
        name: 'স্মার্টফোন',
        price: 25000,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        description: 'সর্বশেষ প্রযুক্তির স্মার্টফোন'
    },
    {
        id: 2,
        name: 'ল্যাপটপ',
        price: 55000,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        description: 'হাই পারফরম্যান্স ল্যাপটপ'
    },
    {
        id: 3,
        name: 'হেডফোন',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        description: 'প্রিমিয়াম সাউন্ড কোয়ালিটি'
    },
    {
        id: 4,
        name: 'স্মার্ট ওয়াচ',
        price: 8000,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        description: 'ফিটনেস ট্র্যাকার সহ'
    },
    {
        id: 5,
        name: 'ক্যামেরা',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
        description: 'পেশাদার ক্যামেরা'
    },
    {
        id: 6,
        name: 'ট্যাবলেট',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400',
        description: 'পোর্টেবল এবং শক্তিশালী'
    }
];

let cart = [];

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();
});

// Load products into grid
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">৳${product.price.toLocaleString()}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    কার্টে যোগ করুন
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();

    // Show confirmation
    alert(`${product.name} কার্টে যোগ করা হয়েছে!`);
}

// Update cart count
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}