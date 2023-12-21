package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.models.*;
import com.ecommerce.backend.domain.payload.request.CountEmployee;
import com.ecommerce.backend.domain.payload.request.StoreRequest;
import com.ecommerce.backend.domain.payload.response.EmployeesResponse;
import com.ecommerce.backend.domain.payload.response.StoreProductRatio;
import com.ecommerce.backend.domain.payload.response.StoreWithEmployeesRes;
import com.ecommerce.backend.domain.payload.response.TimeWorkResponse;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.exception.MyFileNotFoundException;
import com.ecommerce.backend.repository.InventoryRepository;
import com.ecommerce.backend.repository.OrderItemRepository;
import com.ecommerce.backend.repository.StoreRepository;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.services.StoreService;
import com.ecommerce.backend.utils.MapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StoreIml implements StoreService {
    @Autowired
    StoreRepository storeRepository;
    @Autowired
    InventoryRepository inventoryRepository;
    @Autowired
    OrderItemRepository orderItemRepository;
    @Autowired
    UserRepository userRepository;
    private final MapperUtils mapperUtils;

    public StoreIml(MapperUtils mapperUtils) {
        this.mapperUtils = mapperUtils;
    }

    @Override
    public void createStore(StoreRequest storeRequest) {
        List<Store> storeList = storeRepository.findAll();
        for (Store store : storeList) {
            if (store.getEmail().equals(storeRequest.getEmail())) {
                throw new BadRequestException("Địa chỉ email cửa hàng đã tồn tài");
            }
        }
        Store store = new Store();
        store.setName(storeRequest.getName());
        store.setEmail(storeRequest.getEmail());
        store.setPhone(storeRequest.getPhone());
        store.setAddress(storeRequest.getAddress());
        storeRepository.save(store);
    }

    @Override
    public Page<StoreRequest> getAll(Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Store> storePage = storeRepository.findAll(pageable);
        return mapperUtils.convertToResponsePage(storePage, StoreRequest.class, pageable);
    }

    @Override
    public void deleteStore(Integer id) {
        Optional<Store> storeOptional = storeRepository.findById(id);
        if (storeOptional.isPresent()) {
            Store store = storeOptional.get();
            List<Inventory> inventoryList = store.getInventory();
            for (Inventory inventory : inventoryList) {
                inventoryRepository.delete(inventory);
            }
            storeRepository.delete(store);
        } else {
            throw new BadRequestException("Không tìm thấy cửa hàng");
        }
    }

    @Override
    public ResponseEntity<StoreRequest> findByName(String name) {
        Store store = storeRepository.findByName(name);
        if (store == null) {
            throw new BadRequestException("không tìm thấy cửa hàng");
        }
        return new ResponseEntity<>(mapperUtils.convertToResponse(store, StoreRequest.class), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<StoreRequest> getById(Integer id) {
        Store store = storeRepository.findById(id).get();
        if (store == null) {
            throw new BadRequestException("không tìm thấy cửa hàng");
        }
        StoreRequest storeRequest = mapperUtils.convertToResponse(store, StoreRequest.class);
        return new ResponseEntity<>(storeRequest, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CountEmployee> countStore() {
        List<Store> storeList = storeRepository.findAll();
        int total = storeList.size();
        CountEmployee countEmployee = new CountEmployee();
        countEmployee.setCount(total);
        return new ResponseEntity<>(countEmployee, HttpStatus.OK);
    }

    @Override
    public Page<StoreWithEmployeesRes> getALlEmployeesStore(Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);

        Page<Store> stores = storeRepository.findAll(pageable);

        List<StoreWithEmployeesRes> result = stores.stream()
                .map(store -> {
                    List<User> userList = store.getUser();
                    List<EmployeesResponse> employeesResponseList = userList.stream()
                            .map(user -> new EmployeesResponse(user.getName(), user.getEmail(), user.getAddress()))
                            .collect(Collectors.toList());

                    return new StoreWithEmployeesRes(store.getId(), store.getName(), employeesResponseList);
                }).collect(Collectors.toList());
        return new PageImpl<>(result, pageable, stores.getTotalElements());
    }

    @Override
    public Page<StoreProductRatio> getStoreProductRatio(Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);

        Page<Store> storePage = storeRepository.findAll(pageable);
        return storePage.map(store -> {
            StoreProductRatio storeProductRatio = new StoreProductRatio();
            storeProductRatio.setStoreName(store.getName());


            return storeProductRatio;
        });
    }

    @Override
    public ResponseEntity<Page<TimeWorkResponse>> getTimeWorkEmployees(Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<User> userPage = userRepository.findAllByStoreIsNotNull(pageable);

        if (userPage.hasContent()) {
            List<TimeWorkResponse> timeWorkResponses = userPage.map(user ->
                    new TimeWorkResponse(user.getId(), user.getName(), user.getTimeWorkStart())).getContent();
            return new ResponseEntity<>(new PageImpl<>(timeWorkResponses, pageable, userPage.getTotalElements()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public void updateStore(Integer id, StoreRequest storeRequest) {
        Store store = storeRepository.findById(id).orElseThrow(() -> new BadRequestException("Cửa hàng không tồn tại"));
        store.setAddress(storeRequest.getAddress());
        store.setEmail(storeRequest.getEmail());
        store.setPhone(storeRequest.getPhone());
        store.setName(storeRequest.getName());
        storeRepository.save(store);
    }

    public Map<String, Double> calculateProductRatios(List<OrderItem> orderItems) {
        Map<String, Integer> productQuantities = new HashMap<>();
        int totalProducts = 0;

        for (OrderItem orderItem : orderItems) {
            Product product = orderItem.getProduct();
            int quantity = orderItem.getQuantity();

            productQuantities.put(product.getName(), productQuantities.getOrDefault(product.getName(), 0) + quantity);
            totalProducts += quantity;
        }
        Map<String, Double> productRatios = new HashMap<>();
        for (Map.Entry<String, Integer> entry : productQuantities.entrySet()) {
            double ratio = (double) entry.getValue() / totalProducts;
            double ratioPercent = ratio * 100;
            productRatios.put(entry.getKey(), ratioPercent);
        }

        return productRatios;

    }
}
