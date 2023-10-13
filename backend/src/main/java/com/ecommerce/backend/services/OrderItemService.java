package com.ecommerce.backend.services;

import com.ecommerce.backend.domain.payload.request.OrderItemRequest;

public interface OrderItemService {
    // mua sản phẩm order_item
    void createOrderItem(OrderItemRequest orderItemRequest);
}
