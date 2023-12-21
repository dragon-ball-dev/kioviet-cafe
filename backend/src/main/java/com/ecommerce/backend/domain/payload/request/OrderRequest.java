package com.ecommerce.backend.domain.payload.request;

import com.ecommerce.backend.domain.payload.response.CartResponse;
import com.ecommerce.backend.domain.payload.response.ProductResponse;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderRequest {
    private Long customerId;
    private Integer supplyId;
    private Long paymentId;
    private List<CartResponse> cartResponses;
    private Integer totalPrice;
    private Integer storeId;
    private Long userId;
}
