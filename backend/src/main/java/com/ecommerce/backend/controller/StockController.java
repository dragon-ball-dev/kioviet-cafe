package com.ecommerce.backend.controller;

import com.ecommerce.backend.controller.base.BaseController;
import com.ecommerce.backend.domain.payload.request.ConvertStockRequest;
import com.ecommerce.backend.domain.payload.request.StockRequest;
import com.ecommerce.backend.services.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stock")
@RequiredArgsConstructor
public class StockController extends BaseController {

    private final StockService stockService;

    @PostMapping
    private ResponseEntity<?> addProductInStock(@RequestBody StockRequest stockRequest) {
        return ResponseEntity.ok(stockService.addProductInStore(stockRequest));
    }

    @PutMapping("/{id}")
    private ResponseEntity<?> editStock(@PathVariable Long id, @RequestBody StockRequest stockRequest){
        return createSuccessResponse(stockService.editStock(id, stockRequest));
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteStock(@PathVariable Long id) {
        return createSuccessResponse(stockService.deleteStock(id));
    }

    @GetMapping
    private ResponseEntity<?> getAllStock(@RequestParam Integer pageNo, @RequestParam Integer pageSize, @RequestParam String keyword){
        return createSuccessResponse(stockService.getAllStock(pageNo, pageSize, keyword));
    }

    @GetMapping("/search-product-by-store")
    private ResponseEntity<?> getAllStockByStoreName(@RequestParam Integer pageNo, @RequestParam Integer pageSize, Long storeId){
        return createSuccessResponse(stockService.getAllStockByStore(pageNo, pageSize, storeId));
    }

    @PostMapping("/convert-stock")
    private ResponseEntity<?> convertToStock(@RequestBody ConvertStockRequest convertStockRequest){
        return createSuccessResponse(stockService.convertToStock(convertStockRequest));
    }

}
