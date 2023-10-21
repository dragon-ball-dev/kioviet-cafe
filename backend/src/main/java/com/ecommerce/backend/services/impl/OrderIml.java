package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.models.Order;
import com.ecommerce.backend.domain.models.Store;
import com.ecommerce.backend.domain.models.User;
import com.ecommerce.backend.domain.payload.request.OrderDTO;
import com.ecommerce.backend.domain.payload.request.OrderRequest;
import com.ecommerce.backend.domain.payload.response.OrderResponse;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.repository.StoreRepository;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.services.OrderService;
import com.ecommerce.backend.utils.MapperUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderIml implements OrderService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    StoreRepository storeRepository;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    MapperUtils mapperUtils;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public void createOrder(OrderResponse orderRequest) {
//        User user = userRepository.findById(orderRequest.getUserId()).get();
//        User employee = userRepository.findById(orderRequest.getEmployeeId()).get();
//        Store store = storeRepository.findById(orderRequest.getStoreId()).get();
//        if (user != null && employee != null && store != null) {
            Order order = new Order();
//            order.setOrderDate(orderRequest.getOrderDate());
            order.setTotalPrice(0);
//            order.setUser(user);
//            order.setUser_employees(employee);
        Store store = storeRepository.findById(orderRequest.getStoreId()).get();
        if (store == null) {
            throw new BadRequestException("Error");
        }
            order.setStore(store);
            orderRepository.save(order);
//        } else {
//            throw new BadRequestException("không tìm thấy tên khách hàng, nhân viên, cửa hàng");
//        }
    }

    @Override
    public Page<OrderDTO> getAll(Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Order> orderPage = orderRepository.findAll(pageable);
        List<OrderDTO> orderDTOList = orderPage.getContent().stream().map(this::convertToOrderDTO).collect(Collectors.toList());
        return new PageImpl<>(orderDTOList, pageable, orderPage.getTotalElements());
    }

    @Override
    public Integer totalPriceInMonth(Integer year, Integer month) {
        Integer total = orderRepository.totalPriceInMonth(year, month);
        System.out.println(total);
        return total;
    }

    private OrderDTO convertToOrderDTO(Order order) {
        OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);
        orderDTO.setStoreName(order.getStore().getName());
        return orderDTO;
    }
}


