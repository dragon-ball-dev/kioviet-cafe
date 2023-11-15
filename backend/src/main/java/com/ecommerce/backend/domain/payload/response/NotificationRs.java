package com.ecommerce.backend.domain.payload.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class NotificationRs {
    private String notification;
    private LocalDate dateTransfer;
}
