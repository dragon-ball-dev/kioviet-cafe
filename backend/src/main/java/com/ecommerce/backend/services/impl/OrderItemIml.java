package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.models.*;
import com.ecommerce.backend.domain.payload.request.OrderItemRequest;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.repository.*;
import com.ecommerce.backend.services.FileStorageService;
import com.ecommerce.backend.services.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemIml implements OrderItemService {
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ProductMediaRepository productMediaRepository;
    @Autowired
    FileStorageService fileStorageService;
    @Autowired
    SupplyRepository supplyRepository;
    @Autowired
    SupplyProductRepository supplyProductRepository;
    @Autowired
    StoreRepository storeRepository;

    @Autowired
    InventoryRepository inventoryRepository;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderItemRepository orderItemRepository;
    @Override
    public void createOrderItem(OrderItemRequest orderItemRequest) {
        Order order = orderRepository.findById(orderItemRequest.getOrderId()).get();
        Product product = productRepository.findById(orderItemRequest.getProductId()).get();
        Store store = storeRepository.findById(orderItemRequest.getStoreId()).get();
        if (order != null && product != null && store != null)  {
            Inventory inventory = inventoryRepository.findByProductAndStore(product, store);
            if (orderItemRequest.getQuantity() <= inventory.getQuantity()) {
                OrderItem orderItem = new OrderItem();
                orderItem.setQuantity(orderItemRequest.getQuantity());
                orderItem.setOrder(order);
                orderItem.setProduct(product);
                orderItem.setStore(store);
                orderItemRepository.save(orderItem);

                product.setTotalQuantity(product.getTotalQuantity() - orderItemRequest.getQuantity());
                inventory.setQuantity(inventory.getQuantity() - orderItemRequest.getQuantity());
                int totalPrice = totalPrice(order);
                order.setTotalPrice(totalPrice);

                productRepository.save(product);
                inventoryRepository.save(inventory);
                orderRepository.save(order);
            } else {
                throw new BadRequestException("số lượng sản phầm trong kho không đủ để bán");
            }
        } else {
            throw new BadRequestException("không tìm thấy sản phẩm, giỏ hàng hoặc cửa hàng");
        }
    }

    public Integer totalPrice(Order order) {
        List<OrderItem> orderItemList = order.getOrderItem();
        int total = 0;
        for (OrderItem orderItem : orderItemList) {
            total += orderItem.getQuantity()*orderItem.getProduct().getPrice();
        }
        return total;
    }

}
