package com.ecommerce.backend.domain.payload.request;

import com.ecommerce.backend.domain.models.Category;
import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private Integer price;
    private String description;
    private Integer totalQuantity;
    private Integer categoryId;
}
