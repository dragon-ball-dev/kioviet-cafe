package com.ecommerce.backend.domain.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemResponse {
    private Integer id;
    private Integer quantity;
    private ProductResponse product;
    private Boolean isEnable;
    private Long userId;
    private Long storeId;
}
