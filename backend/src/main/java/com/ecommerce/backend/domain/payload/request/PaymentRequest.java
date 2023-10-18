package com.ecommerce.backend.domain.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequest {
    private Date date;
    private String method;
    private Integer amount;
    private Integer orderId;
    private Boolean isLock;
}
