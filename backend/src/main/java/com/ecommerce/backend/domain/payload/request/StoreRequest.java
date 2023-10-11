package com.ecommerce.backend.domain.payload.request;

import lombok.Data;

@Data
public class StoreRequest {
    private String name;
    private String address;
    private String phone;
    private String email;
}
