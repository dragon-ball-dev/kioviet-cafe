package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.models.*;
import com.ecommerce.backend.domain.payload.request.OrderItemRequest;
import com.ecommerce.backend.domain.payload.request.OrderRequest;
import com.ecommerce.backend.domain.payload.response.OrderItemResponse;
import com.ecommerce.backend.domain.payload.response.ProductResponse;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.repository.*;
import com.ecommerce.backend.services.FileStorageService;
import com.ecommerce.backend.services.OrderItemService;
import com.ecommerce.backend.utils.MapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @Autowired
    MapperUtils mapperUtils;
    @Override
    public void createOrderItem(OrderItemRequest orderItemRequest) {
//        Order order = orderRepository.findById(orderItemRequest.getOrderId()).get();
        Product product = productRepository.findById(orderItemRequest.getProductId()).get();
        Store store = storeRepository.findById(orderItemRequest.getStoreId()).get();
        if (product != null && store != null)  {
            Inventory inventory = inventoryRepository.findByProductAndStore(product, store);
            if (orderItemRequest.getQuantity() <= inventory.getQuantity()) {
                OrderItem orderItem = new OrderItem();
                orderItem.setQuantity(orderItemRequest.getQuantity());
                orderItem.setOrder(null);
                orderItem.setProduct(product);
                orderItem.setStore(store);
                orderItemRepository.save(orderItem);

                product.setTotalQuantity(product.getTotalQuantity() - orderItemRequest.getQuantity());
                inventory.setQuantity(inventory.getQuantity() - orderItemRequest.getQuantity());
//                int totalPrice = totalPrice(order);
//                order.setTotalPrice(totalPrice);

                productRepository.save(product);
                inventoryRepository.save(inventory);
//                orderRepository.save(order);
            } else {
                throw new BadRequestException("số lượng sản phầm trong kho không đủ để bán");
            }
        } else {
            throw new BadRequestException("không tìm thấy sản phẩm, giỏ hàng hoặc cửa hàng");
        }
    }

    @Override
    public void changeOrderItem(Integer id, Integer quantity) {
        OrderItem orderItem = orderItemRepository.findById(id).get();
        if (orderItem == null) {
            throw new BadRequestException("không tìm thấy sản phẩm");
        }
        if (orderItem.getQuantity() > quantity) {
            int totalProduct = orderItem.getQuantity() - quantity;//số lượng chênh lệch
            orderItem.setQuantity(quantity);
            orderItemRepository.save(orderItem);

            Product product = orderItem.getProduct();
            product.setTotalQuantity(product.getTotalQuantity() + totalProduct);
            Store store = orderItem.getStore();

           Inventory inventory = inventoryRepository.findByProductAndStore(product, store);
           inventory.setQuantity(inventory.getQuantity() + totalProduct);

           Order order = orderItem.getOrder();
           int totalOrder = orderItem.getQuantity() * product.getPrice();
           order.setTotalPrice(totalOrder);

           productRepository.save(product);
           inventoryRepository.save(inventory);
           orderRepository.save(order);
        } else {
            int totalProduct = quantity - orderItem.getQuantity();//số lượng chênh lệch
            orderItem.setQuantity(quantity);
            orderItemRepository.save(orderItem);

            Product product = orderItem.getProduct();
            product.setTotalQuantity(product.getTotalQuantity() - totalProduct);
            Store store = orderItem.getStore();

            Inventory inventory = inventoryRepository.findByProductAndStore(product, store);
            inventory.setQuantity(inventory.getQuantity() - totalProduct);

            Order order = orderItem.getOrder();
            int totalOrder = orderItem.getQuantity() * product.getPrice();
            order.setTotalPrice(totalOrder);

            productRepository.save(product);
            inventoryRepository.save(inventory);
            orderRepository.save(order);
        }
     }

    @Override
    public void deleteOrderItem(Integer id) {
        OrderItem orderItem = orderItemRepository.findById(id).get();
        if (orderItem == null) {
            throw new BadRequestException("không tìm thấy đơn hàng");
        }

        Product product = orderItem.getProduct();
        Store store = orderItem.getStore();

        product.setTotalQuantity(product.getTotalQuantity() + orderItem.getQuantity());
        Inventory inventory = inventoryRepository.findByProductAndStore(product, store);
        inventory.setQuantity(inventory.getQuantity() + orderItem.getQuantity());

        Order order = orderItem.getOrder();
        int totalPrice = totalPrice(order);
        order.setTotalPrice(totalPrice - orderItem.getQuantity()*product.getPrice());

        productRepository.save(product);
        inventoryRepository.save(inventory);
        orderRepository.save(order);
        orderItemRepository.delete(orderItem);
    }

    @Override
    public ResponseEntity<OrderItemResponse> getById(Integer id) {
        OrderItem orderItem = orderItemRepository.findById(id).get();
        if (orderItem == null) {
            throw new BadRequestException("không tìm thấy giỏ hàng");
        }
        OrderItemResponse orderItemRequest = mapperUtils.convertToResponse(orderItem, OrderItemResponse.class);
        ProductResponse productResponse = mapperUtils.convertToResponse(orderItem.getProduct(), ProductResponse.class);
        orderItemRequest.setProductResponse(productResponse);
        return new ResponseEntity<>(orderItemRequest, HttpStatus.OK);
    }

    public Integer totalPrice(Order order) {
        List<OrderItem> orderItemList = order.getOrderItem();
        int total = 0;
        for (OrderItem orderItem : orderItemList) {
            total += orderItem.getQuantity()*orderItem.getProduct().getPrice();
        }
        if (orderItemList.size() == 0) {
            total = 0;
            return total;
        }
        return total;
    }

}
