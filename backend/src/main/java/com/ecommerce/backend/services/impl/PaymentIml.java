package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.models.Order;
import com.ecommerce.backend.domain.models.Payment;
import com.ecommerce.backend.domain.payload.request.PaymentRequest;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.repository.PaymentRepository;
import com.ecommerce.backend.services.PaymentService;
import com.ecommerce.backend.utils.MapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentIml implements PaymentService {
    @Autowired
    PaymentRepository paymentRepository;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    MapperUtils mapperUtils;
    @Override
    public void createPayment(PaymentRequest paymentRequest) {
        Order order = orderRepository.findById(paymentRequest.getOrderId()).get();
        if (order == null) {
            throw new BadRequestException("khoong tìm thấy đơn hàng");
        }
        Payment payment = new Payment();
        payment.setDate(paymentRequest.getDate());
        payment.setMethod(paymentRequest.getMethod());
        payment.setAmount(order.getTotalPrice());
        payment.setOrder(order);
        paymentRepository.save(payment);
    }

    @Override
    public ResponseEntity<PaymentRequest> findPayment(Integer orderId) {
        Order order = orderRepository.findById(orderId).get();
        if (order == null) {
            throw new BadRequestException("khoomg tìm thấy đơn hàng");
        }
        List<Payment> paymentList = order.getPayment();
        for (Payment payment : paymentList) {
            if (payment.getIsLock() == false) {
                PaymentRequest paymentRequest = mapperUtils.convertToResponse(payment, PaymentRequest.class);
                payment.setIsLock(true);
                paymentRepository.save(payment);
                return new ResponseEntity<>(paymentRequest, HttpStatus.OK);
            }
        }
        throw new BadRequestException("không tìm thấy");
    }
}
