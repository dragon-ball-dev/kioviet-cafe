package com.ecommerce.backend.repository;

import com.ecommerce.backend.domain.models.Inventory;
import com.ecommerce.backend.domain.models.Product;
import com.ecommerce.backend.domain.models.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    Inventory findByProductAndStore(Product product, Store store);
}
