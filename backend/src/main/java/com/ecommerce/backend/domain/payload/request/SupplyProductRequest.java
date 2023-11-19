package com.ecommerce.backend.domain.payload.request;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class SupplyProductRequest {
    private Integer productId;
    private Integer supplyId;
    private Integer quantity;
    private LocalDate time = LocalDate.now();
}
