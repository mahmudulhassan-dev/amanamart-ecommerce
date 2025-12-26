package com.amanamart.ecommerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;
    private double originalPrice;
    
    @Column(length = 1000)
    private String imageUrl;
    
    private String category;
    
    // Virtual getter for Discount (Not saved in DB)
    @Transient
    public int getDiscount() {
        if (originalPrice <= 0) return 0;
        return (int) Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    
    // Constructor for Seeder
    public Product(String name, double price, double originalPrice, String imageUrl, String category) {
        this.name = name;
        this.price = price;
        this.originalPrice = originalPrice;
        this.imageUrl = imageUrl;
        this.category = category;
    }
}
