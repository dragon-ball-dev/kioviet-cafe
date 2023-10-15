package com.ecommerce.backend.domain.payload.request;

import lombok.Data;

import java.util.Date;
@Data
public class OrderDTO {
    private Date date;
    private Integer totalPrice;
    private String storeName;
    private String employeeName;
    private String userName;
}
