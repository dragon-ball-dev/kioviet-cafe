package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.models.Product;
import com.ecommerce.backend.domain.models.Stock;
import com.ecommerce.backend.domain.payload.request.StockRequest;
import com.ecommerce.backend.domain.payload.response.StockResponse;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.StockRepository;
import com.ecommerce.backend.repository.StoreRepository;
import com.ecommerce.backend.repository.SupplyRepository;
import com.ecommerce.backend.services.StockService;
import com.ecommerce.backend.utils.MapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {
    private final StockRepository stockRepository;
    private final MapperUtils mapperUtils;
    private final SupplyRepository supplyRepository;
    private final StoreRepository storeRepository;
    private final ProductRepository productRepository;

    @Override
    public StockRequest addProductInStore(StockRequest stockRequest) {
        if(stockRepository.findByProduct(productRepository.findById(stockRequest.getProductId()).orElseThrow()) != null){
            Stock stock = stockRepository.findByProduct(productRepository.findById(stockRequest.getProductId()).orElseThrow());
            if(Objects.equals(stock.getStore().getId(), stockRequest.getStoreId()) && Objects.equals(stock.getSupply().getId(), stockRequest.getSupplyId())) {
                stock.setQuantity(stock.getQuantity() + stockRequest.getQuantity());
                stockRepository.save(stock);
                return stockRequest;
            }
        }
        Stock stock = new Stock(stockRequest.getName(), supplyRepository.findById(stockRequest.getSupplyId()).orElseThrow(() -> new BadRequestException("")),storeRepository.findById(stockRequest.getStoreId()).orElseThrow(), stockRequest.getAddress(), productRepository.findById(stockRequest.getProductId()).orElseThrow(),  stockRequest.getQuantity() );
        stockRepository.save(stock);
        return stockRequest;
    }

    @Override
    public StockRequest editStock(Long id, StockRequest stockRequest) {
        Stock stock = stockRepository.findById(id).orElseThrow(() -> new BadRequestException("Kho hàng không tồn tại"));
        stock.setStore(storeRepository.findById(stockRequest.getStoreId()).orElseThrow());
        stock.setName(stockRequest.getName());
        stock.setAddress(stockRequest.getAddress());
        stock.setQuantity(stockRequest.getQuantity());
        stock.setSupply(supplyRepository.findById(stockRequest.getSupplyId()).orElseThrow(() -> new BadRequestException("")));
        stock.setProduct(productRepository.findById(stockRequest.getProductId()).orElseThrow());
        stockRepository.save(stock);
        return stockRequest;
    }

    @Override
    public String deleteStock(Long id) {
        stockRepository.deleteById(id);
        return "Xóa kho hàng có id là " + id;
    }

    @Override
    public Page<StockResponse> getAllStock(Integer pageNo, Integer pageSize, String keyword) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapperUtils.convertToResponsePage(stockRepository.searchingStock(keyword, pageable), StockResponse.class, pageable);
    }

    @Override
    public Page<StockResponse> getAllStockByStore(Integer pageNo, Integer pageSize, Long storeId) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapperUtils.convertToResponsePage(stockRepository.searchingStockByStoreId(storeId, pageable), StockResponse.class, pageable);
    }


}
