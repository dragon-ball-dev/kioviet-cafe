package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.models.Order;
import com.ecommerce.backend.domain.models.Store;
import com.ecommerce.backend.domain.models.User;
import com.ecommerce.backend.domain.payload.request.OrderRequest;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.repository.StoreRepository;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderIml implements OrderService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    StoreRepository storeRepository;
    @Autowired
    OrderRepository orderRepository;
    @Override
    public void createOrder(OrderRequest orderRequest) {
        User user = userRepository.findById(orderRequest.getUserId()).get();
        User employee = userRepository.findById(orderRequest.getEmployeeId()).get();
        Store store = storeRepository.findById(orderRequest.getStoreId()).get();
        if (user != null && employee != null && store != null) {
            Order order = new Order();
            order.setOrderDate(orderRequest.getOrderDate());
            order.setTotalPrice(0);
            order.setUser(user);
            order.setUser_employees(employee);
            order.setStore(store);
            orderRepository.save(order);
        } else {
            throw new BadRequestException("không tìm thấy tên khách hàng, nhân viên, cửa hàng");
        }
    }
}
