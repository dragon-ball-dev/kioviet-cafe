package com.ecommerce.backend.domain.payload.response;

import com.ecommerce.backend.domain.models.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;




@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {

    private Long id;

    private StoreResponse store;

    private ProductResponse product;

    private SupplyResponse supply;

    private CustomerResponse customer;

    private UserResponse user;

    private Integer quantity;
}
