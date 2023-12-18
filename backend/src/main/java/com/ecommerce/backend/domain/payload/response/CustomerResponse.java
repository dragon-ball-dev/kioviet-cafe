package com.ecommerce.backend.domain.payload.response;

import lombok.Data;

@Data
public class CustomerResponse {
    private Long id;
    private String name;
    private String phone;
    private String address;
    private Integer discount;
}
