package com.ecommerce.backend.domain.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BestSeller {
    private Integer quantity;
    private String name;
}
