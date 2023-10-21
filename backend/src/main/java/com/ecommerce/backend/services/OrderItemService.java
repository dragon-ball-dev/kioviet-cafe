package com.ecommerce.backend.services;

import com.ecommerce.backend.domain.payload.request.OrderItemRequest;
import com.ecommerce.backend.domain.payload.request.OrderRequest;
import com.ecommerce.backend.domain.payload.response.OrderItemResponse;
import org.springframework.http.ResponseEntity;

public interface OrderItemService {
    // mua sản phẩm order_item
    void createOrderItem(OrderItemRequest orderItemRequest);
    //sửa orderitem
    void changeOrderItem(Integer id, Integer quantity);
    // xóa đơn hàng orderitem
    void deleteOrderItem(Integer id);
    // lấy ra danh sách orderitem
    ResponseEntity<OrderItemResponse> getById(Integer id);
}
