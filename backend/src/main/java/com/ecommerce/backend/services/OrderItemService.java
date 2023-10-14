package com.ecommerce.backend.services;

import com.ecommerce.backend.domain.payload.request.OrderItemRequest;
import com.ecommerce.backend.domain.payload.request.OrderRequest;

public interface OrderItemService {
    // mua sản phẩm order_item
    void createOrderItem(OrderItemRequest orderItemRequest);
    //sửa orderitem
    void changeOrderItem(Integer id, Integer quantity);
    // xóa đơn hàng orderitem
    void deleteOrderItem(Integer id);
    // lấy ra danh sách orderitem

}
