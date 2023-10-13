package com.ecommerce.backend.services;

import com.ecommerce.backend.controller.base.BaseController;
import com.ecommerce.backend.domain.models.Product;
import com.ecommerce.backend.domain.payload.request.InventoryRequest;
import com.ecommerce.backend.domain.payload.request.OrderItemRequest;
import com.ecommerce.backend.domain.payload.request.ProductRequest;
import com.ecommerce.backend.domain.payload.request.SupplyProductRequest;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductService {
    void createProduct(String name, Integer price, String description,Integer categoryId,
                                    Integer totalQuantity, MultipartFile multipartFile) throws IOException;

    //thêm ảnh cho product
    void createImgProduct(Integer id, MultipartFile file);
    //sửa thông tin sản phẩm
    void changeProduct(Integer id, ProductRequest productRequest);
//    void deleteProduct(Integer id);
    //lấy hình ảnh
    ResponseEntity<Resource> getImageProductMedia(Integer id);
    //nhập thêm số lượng sản phẩm
    void importProduct(SupplyProductRequest supplyProductRequest);
    // thêm kho hàng
    void importInventory(InventoryRequest inventoryRequest);
    //tạo kho hàng cho store
    void createInventory(Integer productId, Integer storeId, Integer quantity);
    //thêm số lượng sản phẩm cho store
    void importQuantityStore(InventoryRequest inventoryRequest);

}
