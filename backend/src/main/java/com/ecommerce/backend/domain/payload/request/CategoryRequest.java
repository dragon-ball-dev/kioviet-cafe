package com.ecommerce.backend.domain.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryRequest {
    private Integer id;
    private String name;
}
