package com.ecommerce.backend.services;

import com.ecommerce.backend.domain.payload.request.PaymentRequest;
import org.springframework.http.ResponseEntity;

public interface PaymentService {
    void createPayment(PaymentRequest paymentRequest);
    ResponseEntity<PaymentRequest> findPayment(Integer orderId);
}
