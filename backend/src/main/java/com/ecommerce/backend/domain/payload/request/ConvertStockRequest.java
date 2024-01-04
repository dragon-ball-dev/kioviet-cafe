package com.ecommerce.backend.domain.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConvertStockRequest {
    private Integer storeSentId;
    private Integer storeReceiverId;
    private List<ProductSentRequest> productSent;
}
