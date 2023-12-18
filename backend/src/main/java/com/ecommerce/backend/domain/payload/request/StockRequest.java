package com.ecommerce.backend.domain.payload.request;

import lombok.Data;


@Data
public class StockRequest {

    private String name;

    private Integer supplyId;

    private Integer storeId;

    private String address;

    private Integer productId;

    private Double quantity;
}
