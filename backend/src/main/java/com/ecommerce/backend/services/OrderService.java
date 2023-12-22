package com.ecommerce.backend.services;

import com.ecommerce.backend.domain.enums.RoleName;
import com.ecommerce.backend.domain.models.Order;
import com.ecommerce.backend.domain.payload.request.OrderDTO;
import com.ecommerce.backend.domain.payload.request.OrderRequest;
import com.ecommerce.backend.domain.payload.response.OrderResponse;
import com.ecommerce.backend.domain.payload.response.TotalStoreResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

public interface OrderService {

    void createOrder(OrderRequest orderRequest);

    Page<OrderResponse> getAllOrderByUserId(Long userId, Integer storeId, Integer supplyId,  Integer pageNo,  Integer pageSize);

    Page<OrderResponse> getAllOrderNotYetPrinter(Long userId, Boolean isPrinter, Integer pageNo, Integer pageSize);

    void updateStatusPrinter();
}
