package com.ecommerce.backend.controller;

import com.ecommerce.backend.controller.base.BaseController;
import com.ecommerce.backend.domain.payload.request.SupplyRequest;
import com.ecommerce.backend.services.SupplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/supply")
public class SupplyController extends BaseController {
    @Autowired
    SupplyService supplyService;

    @PostMapping("/create")
    public ResponseEntity<?> createSupply(@RequestBody SupplyRequest supplyRequest) {
        supplyService.createSupply(supplyRequest);
        return createSuccessResponse("create supply", "thêm nhà cung cấp thành công");
    }

    @GetMapping("/getall-supply")
    public Page<SupplyRequest> getAllSupply(@RequestParam Integer page, @RequestParam Integer pageSize) {
        return supplyService.getAll(page, pageSize);
    }

    @PatchMapping("/change-supply")
    public ResponseEntity<?> changeSupply(@RequestParam Integer id, @RequestBody SupplyRequest supplyRequest) {
        supplyService.changeSupply(id, supplyRequest);
        return createSuccessResponse("change supply", "thay đổi thành công");
    }
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteSupply(@RequestParam Integer id) {
        supplyService.deleteSupply(id);
        return createSuccessResponse("delete supply", "xóa nhà cung cấp thành công");
    }
    @GetMapping
    public ResponseEntity<SupplyRequest> findByName(@RequestParam String name) {
        return supplyService.findByName(name);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplyRequest> getById(@PathVariable Integer id) {
        return supplyService.getById(id);
    }
}
