package com.ecommerce.backend.domain.payload.request;

import lombok.Data;

@Data
public class OrderItemRequest {
    private Integer quantity;
    private Integer productId;
    private Integer orderId;
    private Integer storeId;
}
