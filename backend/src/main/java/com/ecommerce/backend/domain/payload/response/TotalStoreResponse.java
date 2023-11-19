package com.ecommerce.backend.domain.payload.response;

import lombok.Data;

@Data
public class TotalStoreResponse {
    private Integer storeId;
    private String storeName;
    private Integer totalPrice;

    public TotalStoreResponse(Integer storeId, String storeName, Integer totalPrice) {
        this.storeId = storeId;
        this.storeName = storeName;
        this.totalPrice = totalPrice;
    }
}
