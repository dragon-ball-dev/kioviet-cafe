package com.ecommerce.backend.domain.payload.request;

import com.ecommerce.backend.domain.models.Store;
import lombok.Data;

import java.util.Date;
@Data
public class OrderDTO {
    private Integer totalPrice;
    private String storeName;
}
