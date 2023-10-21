package com.ecommerce.backend.domain.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemResponse {
    private Integer quantity;
    private ProductResponse productResponse;
    private boolean flag = true;
}
