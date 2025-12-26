package com.amanamart.ecommerce.repository;

import com.amanamart.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Custom queries can be added here, e.g., findByCategory(String category)
}
