package com.ecommerce.backend.domain.payload.response;

import com.ecommerce.backend.domain.models.Customer;
import com.ecommerce.backend.domain.models.OrderItem;
import com.ecommerce.backend.domain.models.Store;
import com.ecommerce.backend.domain.models.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {

    private Integer id;

    private LocalDateTime orderDate;

    private Integer totalPrice;

    private List<OrderItemResponse> orderItem;

    private StoreResponse store;

    private UserResponse user;

    private CustomerResponse customer;

    private Long paymentId;
}
