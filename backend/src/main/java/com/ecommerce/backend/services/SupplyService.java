package com.ecommerce.backend.services;

import com.ecommerce.backend.domain.payload.request.SupplyRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

public interface SupplyService {
    void createSupply(SupplyRequest supplyRequest);
    Page<SupplyRequest> getAll(Integer page, Integer pageSize);
    void changeSupply(Integer id, SupplyRequest supplyRequest);
    void deleteSupply(Integer id);
    ResponseEntity<SupplyRequest> findByName(String name);
}
