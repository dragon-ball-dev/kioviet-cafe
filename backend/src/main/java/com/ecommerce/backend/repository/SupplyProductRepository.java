package com.ecommerce.backend.repository;

import com.ecommerce.backend.domain.models.SupplyProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplyProductRepository extends JpaRepository<SupplyProduct, Integer> {
}
