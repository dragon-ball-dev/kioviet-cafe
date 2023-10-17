package com.ecommerce.backend.controller;

import com.ecommerce.backend.controller.base.BaseController;
import com.ecommerce.backend.domain.payload.request.StoreRequest;
import com.ecommerce.backend.services.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("store")
public class StoreController extends BaseController {
    @Autowired
    StoreService storeService;

    @PostMapping("create-store")
    public ResponseEntity<?> createStore(@RequestBody StoreRequest storeRequest) {
        storeService.createStore(storeRequest);
        return createSuccessResponse("create store", "thêm thành công cửa hàng");
    }
    @GetMapping("get-all")
    public Page<StoreRequest> getAll(@RequestParam Integer page, @RequestParam Integer pageSize) {
        return storeService.getAll(page, pageSize);
    }
    @DeleteMapping("delete-store")
    public ResponseEntity<?> deleteStore(@RequestParam Integer id) {
        storeService.deleteStore(id);
        return createSuccessResponse("delete store", null);
    }

    @GetMapping
    public ResponseEntity<StoreRequest> findByName(@RequestParam String name) {
        return storeService.findByName(name);
    }
}
