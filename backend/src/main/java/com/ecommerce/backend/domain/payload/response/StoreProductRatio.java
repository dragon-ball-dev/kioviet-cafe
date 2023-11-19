package com.ecommerce.backend.domain.payload.response;

import lombok.Data;

import java.util.Map;
@Data
public class StoreProductRatio {
    private String storeName;
    private Map<String, Double> productRatio;
}
