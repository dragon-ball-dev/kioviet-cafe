package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.enums.RoleName;
import com.ecommerce.backend.domain.models.*;
import com.ecommerce.backend.domain.payload.request.OrderDTO;
import com.ecommerce.backend.domain.payload.request.OrderRequest;
import com.ecommerce.backend.domain.payload.response.CartResponse;
import com.ecommerce.backend.domain.payload.response.OrderResponse;
import com.ecommerce.backend.domain.payload.response.ProductResponse;
import com.ecommerce.backend.domain.payload.response.TotalStoreResponse;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.repository.*;
import com.ecommerce.backend.services.BaseService;
import com.ecommerce.backend.services.OrderService;
import com.ecommerce.backend.utils.MapperUtils;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderIml extends BaseService implements OrderService {

    private final UserRepository userRepository;

    private final CartRepository cartRepository;

    private final ProductRepository productRepository;

    private final CustomerRepository customerRepository;

    private final SupplyRepository supplyRepository;

    private final StockRepository stockRepository;

    private final StoreRepository storeRepository;

    private final OrderRepository orderRepository;

    private final OrderItemRepository orderItemRepository;

    private final MapperUtils mapperUtils;

    @Override
    @Transactional
    public void createOrder(OrderRequest orderRequest) {
        Customer customer = customerRepository.findById(orderRequest.getCustomerId()).orElseThrow(() -> new BadRequestException("Khách hàng không tồn tại"));
        Store store = storeRepository.findById(orderRequest.getStoreId()).orElseThrow(() -> new BadRequestException("Không tồn tại cửa hàng"));
        Order order = new Order(LocalDateTime.now(),orderRequest.getTotalPrice(), store, getUser(), customer, orderRequest.getPaymentId());
        orderRepository.save(order);

        for (CartResponse cart : orderRequest.getCartResponses()) {
            Product product = productRepository.findById(cart.getProduct().getId()).orElseThrow(() -> new BadRequestException("Sản phẩm không tồn tại"));
            Supply supply = supplyRepository.findById(cart.getSupply().getId()).orElseThrow(() -> new BadRequestException("Nhà cung cấp không tồn tại"));
            OrderItem orderItem = new OrderItem(cart.getQuantity(), product, order, supply);
            orderItemRepository.save(orderItem);

            Stock stock = stockRepository.findByProductAndSupply(product, supply);
            if (stock.getQuantity() < product.getTotalQuantity()) {
                throw new BadRequestException("Số lượng sản phẩm trong kho đang sắp hết");
            } else {
                stock.setQuantity(stock.getQuantity() - cart.getQuantity());
                stockRepository.save(stock);
            }
        }

        cartRepository.deleteByUser(getUser());
    }

    @Override
    public Page<OrderResponse> getAllOrderByUserId(Long userId, Integer storeId, Integer supplyId,  Integer pageNo,  Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapperUtils.convertToResponsePage(orderRepository.searchingByUserId(userId, storeId, supplyId, pageable), OrderResponse.class, pageable);
    }

    @Override
    public Page<OrderResponse> getAllOrderNotYetPrinter(Long userId, Boolean isPrinter, Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapperUtils.convertToResponsePage(orderRepository.searchingByUserId(getUserId(), false, pageable), OrderResponse.class, pageable);
    }

    @Override
    public void updateStatusPrinter() {
        Order order = orderRepository.findByUserAndIsPrinter(getUserId()).orElseThrow(() -> new BadRequestException("Không tồn tại đơn hàng"));
        order.setIsPrinter(true);
        orderRepository.save(order);
    }


    private User getUser(){
        return userRepository.findById(getUserId()).orElseThrow(() -> new BadRequestException("Người dùng không tồn tại."));
    }
}


