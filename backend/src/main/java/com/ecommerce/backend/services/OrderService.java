package com.ecommerce.backend.services;

import com.ecommerce.backend.domain.payload.request.OrderRequest;

public interface OrderService {
    void createOrder(OrderRequest orderRequest);
}
