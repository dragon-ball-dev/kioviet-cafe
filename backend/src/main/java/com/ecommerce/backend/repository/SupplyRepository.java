package com.ecommerce.backend.repository;

import com.ecommerce.backend.domain.models.Supply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplyRepository extends JpaRepository<Supply, Integer> {
    Supply findByName(String name);
}
