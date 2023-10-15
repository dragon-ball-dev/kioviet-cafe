package com.ecommerce.backend.domain.payload.request;

import lombok.Data;

@Data
public class InventoryRequest {
    private Integer quantity;
    private Integer productId;
    private Integer storeId;
}
