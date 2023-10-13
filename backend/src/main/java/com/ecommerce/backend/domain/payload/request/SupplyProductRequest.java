package com.ecommerce.backend.domain.payload.request;

import lombok.Data;

@Data
public class SupplyProductRequest {
    private Integer productId;
    private Integer supplyId;
    private Integer quantity;
}
