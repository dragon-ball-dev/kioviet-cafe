package com.ecommerce.backend.domain.payload.request;

import lombok.Data;

@Data
public class SupplyRequest {
    private String name;
    private String phone;
    private String email;
    private String address;
}
