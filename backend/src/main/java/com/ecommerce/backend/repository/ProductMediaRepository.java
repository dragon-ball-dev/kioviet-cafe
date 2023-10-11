package com.ecommerce.backend.repository;

import com.ecommerce.backend.domain.models.ProductMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductMediaRepository extends JpaRepository<ProductMedia, Integer> {
}
