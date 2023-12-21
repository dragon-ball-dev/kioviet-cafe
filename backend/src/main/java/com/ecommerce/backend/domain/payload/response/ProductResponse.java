package com.ecommerce.backend.domain.payload.response;

import com.ecommerce.backend.domain.models.ProductMedia;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductResponse {
    private Integer id;
    private String name;
    private Integer price;
    private String description;
    private Integer totalQuantity;
    private CategoryResponse category;
    private ProductMedia productMedia;
    private SupplyResponse supplyResponse;
    private List<StoreResponse> storeResponses;
}
