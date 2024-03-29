package com.ecommerce.backend.services;

import com.ecommerce.backend.controller.base.BaseController;
import com.ecommerce.backend.domain.models.Product;
import com.ecommerce.backend.domain.payload.request.*;
import com.ecommerce.backend.domain.payload.response.InventoryResponse;
import com.ecommerce.backend.domain.payload.response.NotificationRs;
import com.ecommerce.backend.domain.payload.response.ProductResponse;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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
    //nhập thêm số lượng sản phẩm và thơi gian nhập xuất sản phẩm
    void importProduct(SupplyProductRequest supplyProductRequest);
    // thêm kho hàng
    void importInventory(InventoryRequest inventoryRequest);
    //tạo kho hàng cho store
    void createInventory(Integer productId, Integer storeId, Integer quantity);
    //thêm số lượng sản phẩm cho store
    void importQuantityStore(InventoryRequest inventoryRequest);
    // lấy ra danh sách đơn nhập hàng
    Page<InventoryResponse> getAllInventory(Integer page, Integer pageSize);
    //tìm kiếm tên sản phẩm
    ResponseEntity<ProductRequest> findProductByName(String name);
    // sản phẩm bán chạy nhất
    ResponseEntity<BestSeller> findBestSellerProduct();

    //đếm số nhân viên
    ResponseEntity<CountEmployee> countEmployee();
    //đếm số ản phẩm
    ResponseEntity<CountEmployee> countProduct();
    ResponseEntity<ProductRequest> getById(Integer id);
    Page<ProductResponse> getAll(Integer page, Integer pageSize);
    //chuyển sản phẩm
    ResponseEntity<NotificationRs> transferProduct(Integer productId, Integer quantity, Integer sourceStoreId, Integer destinationStoreId);
}
