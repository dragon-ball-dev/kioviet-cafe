package com.ecommerce.backend.domain.payload.response;

import lombok.Data;

@Data
public class EmployeesResponse {
    private String name;
    private String email;
    private String address;

    public EmployeesResponse(String name, String email, String address) {
        this.name = name;
        this.email = email;
        this.address = address;
    }
}
