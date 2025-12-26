package com.amanamart.ecommerce.config;

import com.amanamart.ecommerce.model.Product;
import com.amanamart.ecommerce.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(ProductRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                System.out.println("Seeding Database with Professional Products...");
                repository.saveAll(List.of(
                    new Product("Elegant Floral Summer Dress", 25.50, 45.00, "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80", "Women"),
                    new Product("Slim Fit Men's Cotton Shirt", 19.99, 35.00, "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80", "Men"),
                    new Product("Casual Denim Jacket", 42.00, 60.00, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", "Women"),
                    new Product("Smart Watch Series 7", 199.00, 250.00, "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80", "Electronics"),
                    new Product("Running Sneakers Air", 85.00, 120.00, "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "Shoes"),
                    new Product("Modern Leather Handbag", 55.00, 95.00, "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80", "Accessories"),
                    new Product("Minimalist Gold Necklace", 15.00, 30.00, "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80", "Jewelry"),
                    new Product("Kids Cotton T-Shirt", 12.00, 20.00, "https://images.unsplash.com/photo-1519238807195-4e3b9f84db6d?w=500&q=80", "Kids")
                ));
            }
        };
    }
}
