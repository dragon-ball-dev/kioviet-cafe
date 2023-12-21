package com.ecommerce.backend.repository;

import com.ecommerce.backend.domain.enums.RoleName;
import com.ecommerce.backend.domain.models.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderRepositoryCustom {
    Page<Order> searchingByUserId(Long userId, Integer storeId, Integer supplyId, Pageable pageable);
}
