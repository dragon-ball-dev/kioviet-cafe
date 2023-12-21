package com.ecommerce.backend.controller.base;

import com.ecommerce.backend.services.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("order-item")
public class OrderItemController extends BaseController{
    @Autowired
    OrderItemService orderItemService;

}
