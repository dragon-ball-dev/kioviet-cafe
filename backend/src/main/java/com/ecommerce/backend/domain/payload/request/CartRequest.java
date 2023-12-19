package com.ecommerce.backend.domain.payload.request;

import lombok.Data;

@Data
public class CartRequest {
    private Integer storeId;
    private Integer productId;
    private Integer supplyId;
    private Long customerId;
    private Integer quantity;
}
