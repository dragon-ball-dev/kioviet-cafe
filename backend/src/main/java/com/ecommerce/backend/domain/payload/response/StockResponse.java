package com.ecommerce.backend.domain.payload.response;

import com.ecommerce.backend.domain.models.Product;
import com.ecommerce.backend.domain.models.Store;
import com.ecommerce.backend.domain.models.Supply;
import lombok.Data;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
public class StockResponse {
    private Long id;

    private String name;

    private SupplyResponse supply;


    private StoreResponse store;

    private String address;


    private ProductResponse product;

    private Double quantity;
}
