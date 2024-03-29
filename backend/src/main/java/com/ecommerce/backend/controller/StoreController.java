package com.ecommerce.backend.controller;

import com.ecommerce.backend.controller.base.BaseController;
import com.ecommerce.backend.domain.payload.request.CountEmployee;
import com.ecommerce.backend.domain.payload.request.StoreRequest;
import com.ecommerce.backend.domain.payload.response.StoreProductRatio;
import com.ecommerce.backend.domain.payload.response.StoreWithEmployeesRes;
import com.ecommerce.backend.domain.payload.response.TimeWorkResponse;
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

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateStore(@PathVariable Integer id ,@RequestBody StoreRequest storeRequest) {
        storeService.updateStore(id, storeRequest);
        return createSuccessResponse("Update store", "Cập nhật cửa hàng thành công");
    }

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

    @GetMapping("/{id}")
    public ResponseEntity<StoreRequest> getById(@PathVariable Integer id) {
        return storeService.getById(id);
    }
    @GetMapping("/count")
    public ResponseEntity<CountEmployee> countStore() {
        return storeService.countStore();
    }

    @GetMapping("/count-employees")
    public Page<StoreWithEmployeesRes> getEmployeesWithStore(@RequestParam Integer page,
                                                                       @RequestParam Integer pageSize) {
        return storeService.getALlEmployeesStore(page, pageSize);
    }
    @GetMapping("/ratio-product")
    public Page<StoreProductRatio> getRatioProductStore(@RequestParam Integer page,
                                                        @RequestParam Integer pageSize) {
        return storeService.getStoreProductRatio(page, pageSize);
    }

    @GetMapping("/work-time")
    public ResponseEntity<Page<TimeWorkResponse>> getTimeToWork(@RequestParam Integer page,
                                                                @RequestParam Integer pageSize) {
        return storeService.getTimeWorkEmployees(page, pageSize);
    }
}
