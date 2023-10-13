package com.ecommerce.backend.controller.base;

import com.ecommerce.backend.domain.payload.request.OrderItemRequest;
import com.ecommerce.backend.services.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("orderitem")
public class OrderItemController extends BaseController{
    @Autowired
    OrderItemService orderItemService;
    @PostMapping
    public ResponseEntity<?> createOrderItem(@RequestBody OrderItemRequest orderItemRequest) {
        orderItemService.createOrderItem(orderItemRequest);
        return createSuccessResponse("create OrderItem", "thêm giỏ hàng thành công");
    }
}
