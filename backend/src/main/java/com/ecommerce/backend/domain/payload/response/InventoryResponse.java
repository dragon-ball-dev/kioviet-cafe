package com.ecommerce.backend.domain.payload.response;

import com.ecommerce.backend.domain.models.Product;
import com.ecommerce.backend.domain.models.Store;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryResponse {
    private Integer id;
    private Integer quantity;
    private LocalDate timeToStart;
    private LocalDate timeToEnd;
    private String productName;
    private String storeName;
}
