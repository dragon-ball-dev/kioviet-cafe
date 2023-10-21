package com.ecommerce.backend.services;

import com.ecommerce.backend.domain.models.Order;
import com.ecommerce.backend.domain.payload.request.OrderDTO;
import com.ecommerce.backend.domain.payload.request.OrderRequest;
import com.ecommerce.backend.domain.payload.response.OrderResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

public interface OrderService {
    void createOrder(OrderResponse orderRequest);
    //lấy danh sách giỏ hàng
    Page<OrderDTO> getAll(Integer page, Integer pageSize);
    //tính tổng tiền trong tháng
    Integer totalPriceInMonth(Integer year, Integer month);

}
