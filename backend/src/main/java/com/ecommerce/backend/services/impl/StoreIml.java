package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.models.Inventory;
import com.ecommerce.backend.domain.models.Store;
import com.ecommerce.backend.domain.payload.request.StoreRequest;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.repository.InventoryRepository;
import com.ecommerce.backend.repository.StoreRepository;
import com.ecommerce.backend.services.StoreService;
import com.ecommerce.backend.utils.MapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoreIml implements StoreService {
    @Autowired
    StoreRepository storeRepository;
    @Autowired
    InventoryRepository inventoryRepository;
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
}