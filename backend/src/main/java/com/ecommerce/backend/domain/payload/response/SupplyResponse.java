package com.ecommerce.backend.domain.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SupplyResponse {
    private Integer id;
    private String name;
    private String phone;
    private String email;
    private String address;
}
