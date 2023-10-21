package com.ecommerce.backend.repository;

import com.ecommerce.backend.domain.models.ProductMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductMediaRepository extends JpaRepository<ProductMedia, Integer> {

    @Query(value = "SELECT * FROM kiotviet.product_media p where product_id = :id", nativeQuery = true)
    Optional<ProductMedia> findMediaById(Integer id);
}
