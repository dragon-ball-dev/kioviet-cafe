package com.ecommerce.backend.controller;

import com.ecommerce.backend.controller.base.BaseController;

import com.ecommerce.backend.domain.enums.RoleName;
import com.ecommerce.backend.domain.payload.request.OrderRequest;
import com.ecommerce.backend.services.OrderService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class OrderController extends BaseController {
    @Autowired
    OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        orderService.createOrder(orderRequest);
        return createSuccessResponse("Create order", orderRequest);
    }

    @GetMapping
    public ResponseEntity<?> getAllOrderByUserId(@RequestParam(required = false) Long userId,
                                                 @RequestParam(required = false) Integer storeId,
                                                 @RequestParam(required = false) Integer supplyId,
                                                 @RequestParam Integer pageNo,
                                                 @RequestParam Integer pageSize) {
        return createSuccessResponse("Get all order", orderService.getAllOrderByUserId(userId, storeId, supplyId, pageNo, pageSize));
    }
}

