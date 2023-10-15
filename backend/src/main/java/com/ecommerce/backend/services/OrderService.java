package com.ecommerce.backend.services;

import com.ecommerce.backend.domain.models.Order;
import com.ecommerce.backend.domain.payload.request.OrderDTO;
import com.ecommerce.backend.domain.payload.request.OrderRequest;
import org.springframework.data.domain.Page;

public interface OrderService {
    void createOrder(OrderRequest orderRequest);
    //lấy danh sách giỏ hàng
    Page<OrderDTO> getAll(Integer page, Integer pageSize);
}
