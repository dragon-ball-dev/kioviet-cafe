package com.ecommerce.backend.repository;

import com.ecommerce.backend.domain.models.Stock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StockRepositoryCustom {
    Page<Stock> searchingStock(String keyword, Pageable pageable);

    Page<Stock> searchingStockByStoreId(Long storeId, Pageable pageable);
}
