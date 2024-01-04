package com.ecommerce.backend.services;

import com.ecommerce.backend.domain.payload.request.ConvertStockRequest;
import com.ecommerce.backend.domain.payload.request.StockRequest;
import com.ecommerce.backend.domain.payload.response.StockResponse;
import org.springframework.data.domain.Page;

public interface StockService {
    StockRequest addProductInStore(StockRequest stockRequest);

    StockRequest editStock(Long id, StockRequest stockRequest);

    String deleteStock(Long id);

    Page<StockResponse> getAllStock(Integer pageNo, Integer pageSize, String keyword);

    Page<StockResponse> getAllStockByStore(Integer pageNo, Integer pageSize, Long storeId);

    String convertToStock(ConvertStockRequest convertStockRequest);
}
