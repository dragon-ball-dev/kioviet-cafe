package com.ecommerce.backend.controller;

import com.ecommerce.backend.controller.base.BaseController;
import com.ecommerce.backend.domain.payload.request.OrderDTO;
import com.ecommerce.backend.domain.payload.request.OrderRequest;
import com.ecommerce.backend.domain.payload.response.OrderResponse;
import com.ecommerce.backend.domain.payload.response.TotalStoreResponse;
import com.ecommerce.backend.services.OrderService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class OrderController extends BaseController {
    @Autowired
    OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderResponse orderRequest) {
        orderService.createOrder(orderRequest);
        return createSuccessResponse("create Order", "thêm giỏ hàng thành công");
    }
    @GetMapping
    private Page<OrderDTO> getAll(@RequestParam Integer page, @RequestParam Integer pageSize) {
        return orderService.getAll(page, pageSize);
    }
    @GetMapping("pricemonth")
    public Integer totalPriceMonth(@RequestParam Integer year, @RequestParam Integer month) {
        return orderService.totalPriceInMonth(year, month);
    }

    @GetMapping("/price-store")
    public Page<TotalStoreResponse> getTotalPriceStore(@RequestParam Integer page,
                                                       @RequestParam Integer pageSize) {
        return orderService.calculateTotalPriceStore(page, pageSize);
    }
}

