package com.ecommerce.backend.repository;

import com.ecommerce.backend.domain.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long>, CartRepositoryCustom {
    Optional<Cart> findByCustomerAndStoreAndUserAndSupply(Customer customer, Store store, User user, Supply supply);
}
