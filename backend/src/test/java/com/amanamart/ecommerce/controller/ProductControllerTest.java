package com.amanamart.ecommerce.controller;

import com.amanamart.ecommerce.model.Product;
import com.amanamart.ecommerce.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProductController.class)
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductRepository productRepository;

    @Test
    public void getAllProducts_shouldReturnListOfProducts() throws Exception {
        Product product1 = new Product(1L, "Laptop", 999.99, 1200.00, "laptop.jpg", "Electronics");
        Product product2 = new Product(2L, "Phone", 499.99, 600.00, "phone.jpg", "Electronics");
        List<Product> products = Arrays.asList(product1, product2);

        given(productRepository.findAll()).willReturn(products);

        mockMvc.perform(get("/api/products")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name", is(product1.getName())))
                .andExpect(jsonPath("$[1].name", is(product2.getName())));
    }
}
