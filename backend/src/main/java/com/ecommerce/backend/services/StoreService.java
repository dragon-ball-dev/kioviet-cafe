package com.ecommerce.backend.services;

import com.ecommerce.backend.domain.payload.request.StoreRequest;
import org.springframework.data.domain.Page;

public interface StoreService {
    void createStore(StoreRequest storeRequest);
    Page<StoreRequest> getAll(Integer page, Integer pageSize);
    void deleteStore(Integer id);
}