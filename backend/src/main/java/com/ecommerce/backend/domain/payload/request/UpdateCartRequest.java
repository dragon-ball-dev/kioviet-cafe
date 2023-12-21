package com.ecommerce.backend.domain.payload.request;

import lombok.Data;


@Data
public class UpdateCartRequest {

    private Long idCart;

    private Integer quantity;

}
