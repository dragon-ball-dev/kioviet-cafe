package com.ecommerce.backend.domain.payload.request;

import lombok.Data;

import java.util.List;

@Data
public class UpdateCartRequest {

    private List<Long> idCart;

    private List<Integer> quantity;

}
