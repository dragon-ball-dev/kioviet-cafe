package com.ecommerce.backend.domain.payload.request;

import lombok.Data;

import java.util.Date;
@Data
public class OrderRequest {
    private Date orderDate;
    private Integer totalPrice;
    private Integer storeId;
    private Long userId;
    private Long employeeId;
}
