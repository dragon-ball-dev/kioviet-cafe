package com.ecommerce.backend.controller;

import com.ecommerce.backend.controller.base.BaseController;
import com.ecommerce.backend.domain.payload.request.PaymentRequest;
import com.ecommerce.backend.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController extends BaseController {
    @Autowired
    PaymentService paymentService;

    @PostMapping
    public ResponseEntity<?> createPayment(@RequestBody PaymentRequest paymentRequest) {
        paymentService.createPayment(paymentRequest);
        return createSuccessResponse("create payment", "thêm thanh toán thành công");
    }
    @GetMapping
    public ResponseEntity<PaymentRequest> findPayment(@RequestParam Integer orderId) {
        return paymentService.findPayment(orderId);
    }
}
