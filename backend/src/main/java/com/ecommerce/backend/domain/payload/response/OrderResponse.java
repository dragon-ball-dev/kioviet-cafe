package com.ecommerce.backend.domain.payload.response;

import com.ecommerce.backend.domain.models.Store;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private Integer productId;
    private Integer quantity;
    private Integer storeId;
}
