package com.ecommerce.backend.domain.payload.request;

import lombok.Data;

@Data
public class CartRequest {
    private Long storeId;
    private Integer productId;
    private Long supplyId;
    private Long customerId;
}
