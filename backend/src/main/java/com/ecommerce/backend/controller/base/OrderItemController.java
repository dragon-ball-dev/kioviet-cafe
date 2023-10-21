package com.ecommerce.backend.controller.base;

import com.ecommerce.backend.domain.payload.request.OrderDTO;
import com.ecommerce.backend.domain.payload.request.OrderItemRequest;
import com.ecommerce.backend.domain.payload.response.OrderItemResponse;
import com.ecommerce.backend.services.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PatchMapping
    public ResponseEntity<?> changeOrderItem(@RequestParam Integer id, @RequestParam Integer quantity) {
        orderItemService.changeOrderItem(id, quantity);
        return createSuccessResponse("change OrderItem", "thay đổi thành công");
    }

    @DeleteMapping
    public ResponseEntity<?> deleteOrderItem(@RequestParam Integer id) {
        orderItemService.deleteOrderItem(id);
        return createSuccessResponse("delete orderitem", "xóa thành công");
    }
    @GetMapping("/{id}")
    public ResponseEntity<OrderItemResponse> getById(@PathVariable Integer id) {
        return orderItemService.getById(id);
    }
}
