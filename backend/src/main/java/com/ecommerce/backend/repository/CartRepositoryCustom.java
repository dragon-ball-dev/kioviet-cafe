package com.ecommerce.backend.repository;

import com.ecommerce.backend.domain.models.Cart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CartRepositoryCustom {
    Page<Cart> findAllByUser(Long userId, Pageable pageable);
}
